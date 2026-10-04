"use client";

import { useEffect, useRef, useState } from "react";
import { useConversation } from "./conversation-context";
import { ResponseRenderer } from "./response-renderer";
import { getContextualPrompts, initialPromptSuggestions } from "@/data/prompts";
import {
  X,
  RotateCcw,
  ArrowRight,
  MessageSquareText,
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
      className={`flex w-fit items-center gap-3 border-l-2 border-accent-sky py-1 pl-4 text-sm text-text-primary transition-all duration-200 motion-reduce:transition-none ${
        isTransitioning
          ? "opacity-0 scale-95 -translate-y-1 motion-reduce:opacity-0 motion-reduce:scale-100 motion-reduce:translate-y-0"
          : "opacity-100 scale-100 translate-y-0 animate-in fade-in-0 motion-reduce:animate-none"
      }`}
    >
      <span className="font-medium text-text-primary">{text}</span>
      <span className="flex items-center gap-1.5 pl-1" aria-hidden="true">
        <span className="conversation-thinking-dot h-1.5 w-1.5 rounded-full bg-accent-sky motion-reduce:animate-none" />
        <span className="conversation-thinking-dot h-1.5 w-1.5 rounded-full bg-accent-sky motion-reduce:animate-none" />
        <span className="conversation-thinking-dot h-1.5 w-1.5 rounded-full bg-accent-sky motion-reduce:animate-none" />
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Portfolio Conversation with M Hemel Hasan"
      className="fixed inset-0 z-50 flex h-[100dvh] w-full flex-col bg-canvas text-text-primary transition-all duration-300"
    >
      <header className="shrink-0 border-b border-border-subtle bg-canvas px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-sm bg-surface-nested">
              <Image
                src="/assets/avatar.jpg"
                alt={personalProfile.name}
                fill
                sizes="32px"
                className="object-cover object-top"
              />
            </div>
            <div>
              <span className="text-sm font-semibold text-text-primary">
                {personalProfile.name}
              </span>
              <p className="hidden font-mono text-[11px] text-text-muted sm:block">
                Portfolio conversation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={resetConversation}
              title="Reset conversation history"
              aria-label="Reset conversation"
              className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-md border border-border-subtle px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-border-interactive hover:text-text-primary"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              type="button"
              onClick={closeConversation}
              title="Close conversation (Esc)"
              aria-label="Close conversation"
              className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-md border border-border-interactive text-text-secondary transition-colors hover:border-accent-sky hover:text-text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex h-full w-full max-w-3xl lg:max-w-4xl flex-1 flex-col overflow-hidden px-4 sm:px-6">
        <div
          ref={threadContainerRef}
          aria-live="polite"
          className="flex-1 space-y-8 overflow-y-auto py-8 pr-1 scroll-smooth sm:py-10"
        >
          {messages.length === 0 ? (
            <div className="flex min-h-[48vh] flex-col justify-center py-8">
              <div className="max-w-2xl">
                <p className="font-mono text-xs text-accent-sky">Portfolio conversation</p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-text-primary sm:text-4xl">
                  Hi — what would you like to explore?
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-text-secondary">
                  You can ask about what I&apos;m building, products I&apos;ve shipped at Themefic, my engineering process, or my career background.
                </p>
              </div>

              <div className="mt-8 grid max-w-2xl border-t border-border-interactive sm:grid-cols-2">
                {initialPromptSuggestions.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => {
                      isUserScrollingRef.current = false;
                      sendMessage(prompt.sampleQuery, prompt.targetIntent);
                    }}
                    className="group flex min-h-14 cursor-pointer items-center justify-between border-b border-border-subtle px-1 pr-3 text-left text-sm font-medium text-text-secondary transition-colors hover:text-text-primary sm:odd:pr-6 sm:even:border-l sm:even:pl-6"
                  >
                    <span>{prompt.label}</span>
                    <ArrowRight className="h-4 w-4 text-text-muted transition-colors group-hover:text-accent-sky" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((msg, index) => {
                const isUser = msg.sender === "user";
                const isLatest = index === messages.length - 1;

                if (isUser) {
                  return (
                    <div key={msg.id} data-role="user-message" className="flex justify-end pt-1">
                      <div className="max-w-[88%] border-r-2 border-accent-sky py-1 pr-4 text-right sm:max-w-[72%]">
                        <span className="block font-mono text-[10px] uppercase text-accent-sky">You asked</span>
                        <span className="mt-1 block text-sm font-semibold leading-6 text-text-primary sm:text-base">{msg.queryText}</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    data-role="assistant-message"
                    ref={isLatest ? latestMessageRef : undefined}
                    className="w-full pt-1 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 motion-reduce:duration-0"
                  >
                    <div className="mb-4 flex items-center gap-3 font-mono text-[11px] text-text-muted">
                      <span className="h-px w-8 bg-accent-sky" aria-hidden="true" />
                      <span>Response</span>
                    </div>

                    <div className="w-full">
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

        <div className="shrink-0 space-y-3 border-t border-border-subtle bg-canvas pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:pb-6">
          <div className="flex items-center gap-3 overflow-x-auto py-0.5 no-scrollbar">
            <span className="hidden shrink-0 font-mono text-[11px] uppercase text-text-muted sm:inline">
              Follow-up:
            </span>
            <div className="flex shrink-0 items-center gap-4">
              {contextualPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => {
                    isUserScrollingRef.current = false;
                    sendMessage(prompt.sampleQuery, prompt.targetIntent);
                  }}
                  className="inline-flex min-h-9 cursor-pointer items-center border-b border-transparent text-xs font-medium text-text-secondary transition-colors hover:border-accent-sky hover:text-text-primary"
                >
                  <span>{prompt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="group relative flex w-full items-center rounded-lg border border-border-interactive bg-surface-card p-1.5 transition-colors hover:border-accent-sky/50 focus-within:border-accent-sky"
          >
            <div className="pl-3 text-text-muted transition-colors group-focus-within:text-accent-sky">
              <MessageSquareText className="h-4 w-4" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about my work, architecture, ventures…"
              aria-label="Type your message"
              className="w-full border-none bg-transparent px-3 py-2 text-sm font-medium text-text-primary shadow-none outline-none placeholder:text-text-muted/80 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 sm:text-base"
            />

            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md bg-accent-sky font-bold text-white transition-colors hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-35 sm:h-11 sm:w-11"
            >
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
