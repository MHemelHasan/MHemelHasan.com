"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { ChatMessage, IntentKey, PromptSuggestion } from "@/types/conversation";
import { resolveIntent } from "@/lib/conversation-engine";

interface ConversationContextType {
  isOpen: boolean;
  messages: ChatMessage[];
  isResponding: boolean;
  isThinkingTransitioning: boolean;
  thinkingText: string;
  thinkingCycleId: string | null;
  activeIntent: IntentKey | null;
  openConversation: (initialQuery?: string, directIntent?: IntentKey) => void;
  closeConversation: () => void;
  resetConversation: () => void;
  sendMessage: (query: string, directIntent?: IntentKey) => void;
  notifyThinkingPainted: (mountTs: number, paintTs: number) => void;
  navigateToSection: (anchor: string) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(
  undefined
);

const STORAGE_KEY = "mhemelhasan_chat_history_v2";

function getHumanThinkingText(intent: IntentKey): string {
  switch (intent) {
    case "about_me":
      return "Pulling that together…";
    case "social_ai":
    case "ventures":
      return "Looking through my work on Social AI…";
    case "support_ai":
      return "Pulling up exploratory notes…";
    case "products":
      return "Looking through my product work…";
    case "pipeline":
      return "Connecting the relevant parts…";
    case "journey":
      return "Looking through my background…";
    case "contact":
      return "Checking collaboration details…";
    default:
      return "Thinking about that…";
  }
}

/**
 * Detects whether reduced-motion preference is active.
 *
 * In production, checks `window.matchMedia("(prefers-reduced-motion: reduce)").matches`.
 * For automated QA and test suites (where OS-level media queries cannot always be dispatched),
 * `window.__forceReducedMotion` and `document.documentElement.classList.contains("reduce-motion")`
 * are supported as explicit test hooks.
 *
 * CRITICAL (Phase 1B.2c): Reduced motion only disables visual animations/transitions.
 * It NEVER bypasses or shortens the visible thinking hold duration.
 */
function isReducedMotionActive(): boolean {
  if (typeof window === "undefined") return false;

  const mediaMatches =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const testHookForced =
    (window as unknown as { __forceReducedMotion?: boolean }).__forceReducedMotion === true;
  const testHookClass =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("reduce-motion");

  return Boolean(mediaMatches || testHookForced || testHookClass);
}

function getDeterministicVisibleDuration(intent: IntentKey): number {
  switch (intent) {
    case "about_me":
      return 2400; // 2400ms minimum visible on-screen duration
    case "social_ai":
    case "ventures":
      return 2500; // 2500ms minimum visible on-screen duration
    case "support_ai":
      return 2400; // 2400ms minimum visible on-screen duration
    case "products":
      return 2600; // 2600ms minimum visible on-screen duration
    case "pipeline":
      return 2600; // 2600ms minimum visible on-screen duration
    case "journey":
      return 2400; // 2400ms minimum visible on-screen duration
    case "contact":
      return 2200; // 2200ms minimum visible on-screen duration
    default:
      return 2400; // 2400ms default visible duration
  }
}

export function ConversationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isResponding, setIsResponding] = useState(false);
  const [isThinkingTransitioning, setIsThinkingTransitioning] = useState(false);
  const [thinkingText, setThinkingText] = useState("Thinking…");
  const [thinkingCycleId, setThinkingCycleId] = useState<string | null>(null);
  const [activeIntent, setActiveIntent] = useState<IntentKey | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  const pendingQueryRef = useRef<{
    intent: IntentKey;
    submitTs: number;
    userNow: number;
    started: boolean;
    cycleId: string;
    usedWatchdogFallback: boolean;
  } | null>(null);
  const activeTimersRef = useRef<NodeJS.Timeout[]>([]);
  const watchdogTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearActiveTimers = useCallback(() => {
    if (watchdogTimerRef.current) {
      clearTimeout(watchdogTimerRef.current);
      watchdogTimerRef.current = null;
    }
    activeTimersRef.current.forEach(clearTimeout);
    activeTimersRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearActiveTimers();
    };
  }, [clearActiveTimers]);

  // Restore session history safely on client mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          const last = parsed[parsed.length - 1];
          if (last?.intent) {
            setActiveIntent(last.intent);
          }
        }
      }
    } catch {
      // Ignore sessionStorage access errors
    }
  }, []);

  // Save session history whenever messages change
  useEffect(() => {
    try {
      if (messages.length > 0) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, [messages]);

  // Lock body scroll when conversation is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close conversation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closeConversation();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Paint notification handler: starts the visible timer ONLY after browser paints the thinking UI
  const notifyThinkingPainted = useCallback((mountTs: number, paintTs: number) => {
    const pending = pendingQueryRef.current;
    if (!pending || pending.started) return;
    pending.started = true;

    // Normal paint notification fired — cancel watchdog fallback timer immediately
    if (watchdogTimerRef.current) {
      clearTimeout(watchdogTimerRef.current);
      watchdogTimerRef.current = null;
    }

    const prefersReducedMotion = isReducedMotionActive();
    const visibleDuration = getDeterministicVisibleDuration(pending.intent);

    const completeAssistantResponse = (thinkingHiddenTs: number, responseStartTs: number) => {
      const assistantNow = Date.now();
      const assistantMessage: ChatMessage = {
        id: `ast-${assistantNow}-${Math.random().toString(36).slice(2, 7)}`,
        sender: "system",
        intent: pending.intent,
        timestamp: assistantNow,
      };

      const visibleDurationMeasured = thinkingHiddenTs - paintTs;
      const totalElapsed = responseStartTs - pending.submitTs;

      const timingData = {
        intent: pending.intent,
        reducedMotionEnabled: prefersReducedMotion,
        thinkingMountedTs: mountTs,
        thinkingFirstPaintTs: paintTs,
        thinkingHiddenTs,
        responseStartTs,
        configuredVisibleDuration: visibleDuration,
        visibleThinkingDuration: visibleDurationMeasured,
        usedWatchdogFallback: Boolean(pending.usedWatchdogFallback),
        totalElapsed,
        actualDuration: visibleDurationMeasured,
      };

      if (typeof window !== "undefined") {
        const win = window as unknown as {
          __lastConversationTiming?: typeof timingData;
          __conversationTimingHistory?: (typeof timingData)[];
        };
        win.__lastConversationTiming = timingData;
        if (!win.__conversationTimingHistory) {
          win.__conversationTimingHistory = [];
        }
        win.__conversationTimingHistory.push(timingData);

        console.log(
          `[ConversationTiming] intent: ${timingData.intent} | reducedMotionEnabled: ${timingData.reducedMotionEnabled} | thinkingMountedTs: ${timingData.thinkingMountedTs.toFixed(1)} | thinkingFirstPaintTs: ${timingData.thinkingFirstPaintTs.toFixed(1)} | thinkingHiddenTs: ${timingData.thinkingHiddenTs.toFixed(1)} | visibleThinkingDuration: ${timingData.visibleThinkingDuration.toFixed(1)}ms | usedWatchdogFallback: ${timingData.usedWatchdogFallback}`
        );
      }

      setMessages((prev) => [...prev, assistantMessage]);
      setIsResponding(false);
      setIsThinkingTransitioning(false);
      pendingQueryRef.current = null;
    };

    // Hold visibly for the full deterministic duration starting from first paint
    const holdTimer = setTimeout(() => {
      const thinkingHiddenTs = performance.now();

      if (prefersReducedMotion) {
        // Reduced motion: directly mount response without animated transition
        const responseStartTs = performance.now();
        completeAssistantResponse(thinkingHiddenTs, responseStartTs);
      } else {
        // Normal motion: softly transition thinking indicator out over 180ms
        setIsThinkingTransitioning(true);
        const transitionTimer = setTimeout(() => {
          const responseStartTs = performance.now();
          completeAssistantResponse(thinkingHiddenTs, responseStartTs);
        }, 180);
        activeTimersRef.current.push(transitionTimer);
      }
    }, visibleDuration);

    activeTimersRef.current.push(holdTimer);
  }, []);

  // Send message implementation with paint-guaranteed presentation timing
  const sendMessage = useCallback(
    (query: string, directIntent?: IntentKey) => {
      const clean = query.trim();
      if (!clean) return;

      const intent = resolveIntent(clean, directIntent);
      setActiveIntent(intent);

      clearActiveTimers();

      const userNow = Date.now();
      const submitTs = performance.now();
      const cycleId = `cycle-${userNow}-${Math.random().toString(36).slice(2, 7)}`;
      const userMessage: ChatMessage = {
        id: `usr-${userNow}-${Math.random().toString(36).slice(2, 7)}`,
        sender: "user",
        queryText: clean,
        intent,
        timestamp: userNow,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsResponding(true);
      setIsThinkingTransitioning(false);
      setThinkingCycleId(cycleId);

      const phrase = getHumanThinkingText(intent);
      setThinkingText(phrase);

      pendingQueryRef.current = {
        intent,
        submitTs,
        userNow,
        started: false,
        cycleId,
        usedWatchdogFallback: false,
      };

      // Watchdog fallback: if for any reason paint notification has not fired within 600ms, start fallback
      const watchdog = setTimeout(() => {
        if (pendingQueryRef.current && !pendingQueryRef.current.started) {
          if (process.env.NODE_ENV !== "production") {
            console.warn(
              "[Conversation] Watchdog fallback triggered: paint notification did not fire within 600ms."
            );
          }
          pendingQueryRef.current.usedWatchdogFallback = true;
          notifyThinkingPainted(performance.now(), performance.now());
        }
      }, 600);
      watchdogTimerRef.current = watchdog;
      activeTimersRef.current.push(watchdog);
    },
    [clearActiveTimers, notifyThinkingPainted]
  );

  const openConversation = useCallback(
    (initialQuery?: string, directIntent?: IntentKey) => {
      if (typeof document !== "undefined") {
        lastActiveElementRef.current = document.activeElement as HTMLElement | null;
      }
      setIsOpen(true);

      if (initialQuery) {
        sendMessage(initialQuery, directIntent);
      }
    },
    [sendMessage]
  );

  const closeConversation = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      lastActiveElementRef.current?.focus();
    }, 50);
  }, []);

  const resetConversation = useCallback(() => {
    clearActiveTimers();
    pendingQueryRef.current = null;
    setMessages([]);
    setActiveIntent(null);
    setIsResponding(false);
    setIsThinkingTransitioning(false);
    setThinkingCycleId(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, [clearActiveTimers]);

  const navigateToSection = useCallback(
    (anchor: string) => {
      closeConversation();
      setTimeout(() => {
        const el = document.querySelector(anchor);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    },
    [closeConversation]
  );

  // Listen to custom global events from static sections or buttons
  useEffect(() => {
    const handleExternalAsk = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const query = customEvent.detail;
      if (query) {
        openConversation(query);
      } else {
        openConversation();
      }
    };

    const handleFocusInput = () => {
      openConversation();
    };

    window.addEventListener("portfolio:ask", handleExternalAsk);
    window.addEventListener("portfolio:focus-input", handleFocusInput);

    return () => {
      window.removeEventListener("portfolio:ask", handleExternalAsk);
      window.removeEventListener("portfolio:focus-input", handleFocusInput);
    };
  }, [openConversation]);

  return (
    <ConversationContext.Provider
      value={{
        isOpen,
        messages,
        isResponding,
        isThinkingTransitioning,
        thinkingText,
        thinkingCycleId,
        activeIntent,
        openConversation,
        closeConversation,
        resetConversation,
        sendMessage,
        notifyThinkingPainted,
        navigateToSection,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversation must be used within a ConversationProvider"
    );
  }
  return context;
}
