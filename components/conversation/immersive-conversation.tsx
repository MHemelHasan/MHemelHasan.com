"use client";

import { useEffect, useRef, useState } from "react";
import { useConversation } from "./conversation-context";
import { ResponseRenderer } from "./response-renderer";
import { getContextualPrompts, initialPromptSuggestions } from "@/data/prompts";
import {
  X,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Send,
  Compass,
  Bot,
  Layers,
  GitFork,
  User,
} from "lucide-react";
import Image from "next/image";
import { personalProfile } from "@/data/profile";
import { ThemeToggle } from "@/components/theme/theme-toggle";

function ThinkingIndicator({
  text,
  isTransitioning,
  onPainted,
}: {
  text: string;
  isTransitioning: boolean;
  onPainted: (mountTs: number, paintTs: number) => void;
}) {
  const paintedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let raf1 = 0;
    let raf2 = 0;

    const mountTs = performance.now();

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (cancelled) return;
        if (paintedRef.current) return;

        paintedRef.current = true;

        const paintTs = performance.now();
        onPainted(mountTs, paintTs);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [onPainted]);

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-border-interactive/80 bg-surface-card px-4 py-3 text-xs sm:text-sm text-text-primary w-fit shadow-md shadow-slate-900/5 transition-all duration-200 motion-reduce:transition-none ${
        isTransitioning
          ? "opacity-0 scale-95 -translate-y-1 motion-reduce:opacity-0 motion-reduce:scale-100 motion-reduce:translate-y-0"
          : "opacity-100 scale-100 translate-y-0 animate-in fade-in-0 motion-reduce:animate-none"
      }`}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent-soft text-accent-sky">
        <Sparkles className="h-3.5 w-3.5 animate-pulse motion-reduce:animate-none" />
      </div>
      <span className="font-medium text-text-primary">{text}</span>
      <span className="flex items-center gap-1 pl-1">
        <span
          className="h-1.5 w-1.5 rounded-full bg-accent-sky animate-bounce motion-reduce:animate-none"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="h-1.5 w-1.5 rounded-full bg-accent-sky animate-bounce motion-reduce:animate-none"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="h-1.5 w-1.5 rounded-full bg-accent-sky animate-bounce motion-reduce:animate-none"
          style={{ animationDelay: "300ms" }}
        />
      </span>
    </div>
  );
}

export function ImmersiveConversation() {
  const {
    isOpen,
    messages,
    isResponding,
    isThinkingTransitioning,
    thinkingText,
    thinkingCycleId,
    activeIntent,
    closeConversation,
    resetConversation,
    sendMessage,
    notifyThinkingPainted,
    navigateToSection,
  } = useConversation();

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const threadContainerRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const thinkingRef = useRef<HTMLDivElement>(null);
  const isUserScrollingRef = useRef(false);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Track if user is scrolling up manually
  useEffect(() => {
    const container = threadContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 120;
      isUserScrollingRef.current = !isNearBottom;
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Scroll to thinking indicator when responding begins
  useEffect(() => {
    if (isResponding && !isUserScrollingRef.current) {
      thinkingRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isResponding]);

  // When a new assistant response arrives, scroll to the BEGINNING of that response
  useEffect(() => {
    if (!isResponding && messages.length > 0 && !isUserScrollingRef.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.sender === "system") {
        latestMessageRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [messages, isResponding]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    isUserScrollingRef.current = false;
    sendMessage(query);
    setInputValue("");
  };

  const lastIntent = activeIntent || (messages[messages.length - 1]?.intent ?? null);
  const contextualPrompts = getContextualPrompts(lastIntent);

  const getContextualIcon = (iconName: string) => {
    switch (iconName) {
      case "User":
        return <User className="h-3 w-3 text-sky-500" />;
      case "Bot":
        return <Bot className="h-3 w-3 text-amber-500" />;
      case "Layers":
        return <Layers className="h-3 w-3 text-emerald-500" />;
      case "GitFork":
        return <GitFork className="h-3 w-3 text-purple-500" />;
      case "Compass":
        return <Compass className="h-3 w-3 text-indigo-500" />;
      case "Send":
        return <Send className="h-3 w-3 text-blue-500" />;
      default:
        return <Sparkles className="h-3 w-3 text-accent-sky" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Portfolio Conversation with M Hemel Hasan"
      className="fixed inset-0 z-50 flex h-[100dvh] w-full flex-col bg-canvas/98 text-text-primary backdrop-blur-2xl transition-all duration-300"
    >
      {/* Top Application Bar */}
      <header className="shrink-0 border-b border-border-subtle bg-surface-card/60 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          {/* Identity & Status */}
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-xl border border-border-interactive bg-surface-nested">
              <Image
                src="/assets/avatar.jpg"
                alt={personalProfile.name}
                fill
                sizes="32px"
                className="object-cover object-top"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-text-primary">
                  {personalProfile.name}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-accent-sky/30 bg-accent-soft px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-accent-sky">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-sky animate-pulse" />
                  <span>Conversational Mode</span>
                </span>
              </div>
              <p className="text-[11px] text-text-muted hidden sm:block">
                Local deterministic engine · Portfolio proof & systems
              </p>
            </div>
          </div>

          {/* Action Controls: Theme Toggle, Reset & Close */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={resetConversation}
              title="Reset conversation history"
              aria-label="Reset conversation"
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-xl border border-border-subtle bg-surface-nested px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-border-interactive hover:bg-surface-interactive hover:text-text-primary active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              type="button"
              onClick={closeConversation}
              title="Close conversation (Esc)"
              aria-label="Close conversation"
              className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-xl border border-border-interactive bg-surface-card text-text-secondary transition-all hover:border-accent-sky/60 hover:bg-surface-interactive hover:text-text-primary active:scale-95 shadow-sm"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Conversation Canvas (Centered Readable Column) */}
      <main className="mx-auto flex h-full w-full max-w-3xl lg:max-w-4xl flex-1 flex-col overflow-hidden px-4 sm:px-6">
        {/* Scrollable Thread Region */}
        <div
          ref={threadContainerRef}
          aria-live="polite"
          className="flex-1 overflow-y-auto py-6 space-y-6 scroll-smooth pr-1"
        >
          {messages.length === 0 ? (
            /* Requirement R: Compact Welcoming Initial State */
            <div className="flex flex-col items-center justify-center min-h-[45vh] text-center space-y-4 px-4 py-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft border border-accent-sky/30 text-accent-sky shadow-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="space-y-1 max-w-md">
                <h3 className="text-base sm:text-lg font-bold text-text-primary">
                  Hi — what would you like to explore?
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  You can ask about what I&apos;m building, products I&apos;ve shipped at Themefic, my engineering process, or my career background.
                </p>
              </div>

              {/* Starter Prompt Chips */}
              <div className="flex flex-wrap justify-center gap-2 pt-2 max-w-xl">
                {initialPromptSuggestions.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => {
                      isUserScrollingRef.current = false;
                      sendMessage(prompt.sampleQuery, prompt.targetIntent);
                    }}
                    className="inline-flex min-h-[38px] cursor-pointer items-center gap-2 rounded-full border border-border-interactive bg-surface-card px-3.5 py-1.5 text-xs font-medium text-text-secondary transition-all hover:border-accent-sky hover:bg-surface-nested hover:text-text-primary shadow-sm active:scale-95"
                  >
                    {getContextualIcon(prompt.iconName)}
                    <span>{prompt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Multi-Turn Thread History */
            <div className="space-y-6">
              {messages.map((msg, index) => {
                const isUser = msg.sender === "user";
                const isLatest = index === messages.length - 1;

                if (isUser) {
                  return (
                    <div key={msg.id} data-role="user-message" className="flex justify-end pt-1">
                      <div className="inline-flex max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-xs border border-accent-sky/30 bg-surface-interactive px-4 py-2.5 text-xs sm:text-sm font-semibold text-text-primary shadow-sm">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-accent-sky mr-2 font-bold shrink-0 pt-0.5">
                          You:
                        </span>
                        <span>{msg.queryText}</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    data-role="assistant-message"
                    ref={isLatest ? latestMessageRef : undefined}
                    className="w-full space-y-2.5 pt-1 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 motion-reduce:duration-0"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono font-medium text-text-muted pl-1">
                      <Sparkles className="h-3.5 w-3.5 text-accent-sky" />
                      <span>M Hemel Hasan · Answer</span>
                    </div>

                    {/* Open, unboxed conversational response container */}
                    <div className="w-full rounded-2xl sm:rounded-3xl border border-border-subtle/80 bg-surface-card/70 p-4 sm:p-6 shadow-sm backdrop-blur-sm">
                      <ResponseRenderer
                        intent={msg.intent}
                        onSelectPrompt={(p) => {
                          isUserScrollingRef.current = false;
                          sendMessage(p.sampleQuery, p.targetIntent);
                        }}
                        onNavigateSection={navigateToSection}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Requirement C: Noticeable Human Thinking State with Paint Guarantee */}
              {isResponding && (
                <div ref={thinkingRef}>
                  <ThinkingIndicator
                    key={thinkingCycleId || "thinking-active"}
                    text={thinkingText}
                    isTransitioning={isThinkingTransitioning}
                    onPainted={notifyThinkingPainted}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Conversation Composer & Contextual Controls */}
        <div className="shrink-0 border-t border-border-subtle bg-canvas/80 backdrop-blur-md pt-3 pb-4 sm:pb-6 space-y-3">
          {/* Requirement J: Contextual Quick Suggestions based on active topic */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted shrink-0 hidden sm:inline">
              Follow-up:
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {contextualPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => {
                    isUserScrollingRef.current = false;
                    sendMessage(prompt.sampleQuery, prompt.targetIntent);
                  }}
                  className="inline-flex min-h-[36px] cursor-pointer items-center gap-1.5 rounded-full border border-border-subtle bg-surface-nested px-3 py-1 text-xs font-medium text-text-secondary transition-colors hover:border-accent-sky/50 hover:bg-surface-interactive hover:text-text-primary active:scale-95"
                >
                  {getContextualIcon(prompt.iconName)}
                  <span>{prompt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Form with Subtle Accessible Focus */}
          <form
            onSubmit={handleSubmit}
            className="group relative flex w-full items-center rounded-2xl sm:rounded-full border border-border-interactive bg-surface-card p-1.5 sm:p-2 shadow-md shadow-slate-900/5 dark:shadow-xl dark:shadow-black/40 backdrop-blur-xl transition-all duration-200 hover:border-accent-sky/40 focus-within:border-accent-sky focus-within:bg-surface-card focus-within:shadow-lg focus-within:shadow-slate-900/10 dark:focus-within:shadow-black/60"
          >
            <div className="pl-3 sm:pl-4 text-text-muted transition-colors group-focus-within:text-accent-sky">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about my work, architecture, ventures…"
              aria-label="Type your message"
              className="w-full bg-transparent px-3 py-2 text-sm sm:text-base font-medium text-text-primary placeholder:text-text-muted/80 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 border-none outline-none shadow-none"
            />

            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl sm:rounded-full bg-accent-sky text-canvas font-bold shadow-md transition-all hover:opacity-90 disabled:opacity-35 disabled:cursor-not-allowed active:scale-95"
            >
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
