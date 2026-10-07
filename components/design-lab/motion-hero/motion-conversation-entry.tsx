"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useConversation } from "@/components/conversation/conversation-context";
import { initialPromptSuggestions } from "@/data/prompts";
import { MOTION_TOKENS } from "./motion-tokens";

const featuredPromptIds = new Set(["about-me", "social-ai", "show-products", "how-build"]);

interface MotionConversationEntryProps {
  isEntered: boolean;
  isReducedMotion: boolean;
  onFocusChange?: (focused: boolean) => void;
}

export function MotionConversationEntry({
  isEntered,
  isReducedMotion,
  onFocusChange,
}: MotionConversationEntryProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { openConversation } = useConversation();
  const prompts = initialPromptSuggestions.filter((prompt) => featuredPromptIds.has(prompt.id));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    openConversation(trimmedQuery);
    setQuery("");
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocusChange?.(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onFocusChange?.(false);
  };

  return (
    <div
      className="relative border bg-surface-card transition-all"
      style={{
        borderColor: isFocused
          ? "var(--color-border-accent)"
          : "var(--color-border-interactive)",
        transitionDuration: `${MOTION_TOKENS.duration.standard}ms`,
        transitionTimingFunction: MOTION_TOKENS.easing.engineered,
      }}
    >
      <div className="grid gap-3 p-4 sm:gap-5 sm:p-6 lg:grid-cols-[minmax(170px,0.65fr)_minmax(0,1.8fr)] lg:gap-8 lg:p-7">
        <div>
          <p className="text-base font-semibold text-text-primary sm:text-lg">
            Ask about the work
          </p>
          <p className="mt-1 hidden max-w-xs text-sm leading-6 text-text-secondary sm:block">
            Explore the products, process, and decisions through a guided conversation.
          </p>
        </div>

        <div className="min-w-0">
          <form
            onSubmit={handleSubmit}
            className="group relative flex min-h-12 items-end border-b border-text-primary"
          >
            <label htmlFor="portfolio-conversation-query" className="sr-only">
              Ask M Hemel Hasan a question
            </label>
            <input
              id="portfolio-conversation-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="What would you like to know?"
              className="min-w-0 flex-1 bg-transparent py-3 pr-4 text-base text-text-primary outline-none placeholder:text-text-muted"
            />

            {/* Subtle engineered active underline indicator on focus */}
            <span
              className="pointer-events-none absolute -bottom-px left-0 right-0 h-0.5 bg-brand-primary dark:bg-accent-sky"
              style={{
                transform: isFocused ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left center",
                transition: isReducedMotion
                  ? "none"
                  : `transform ${MOTION_TOKENS.duration.standard}ms ${MOTION_TOKENS.easing.engineered}`,
              }}
              aria-hidden="true"
            />

            <button
              type="submit"
              disabled={!query.trim()}
              className="group/send mb-1 inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center bg-brand-primary text-white transition-all hover:bg-brand-primary-hover active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
              aria-label="Send question"
            >
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 ease-out group-hover/send:-translate-y-0.5 group-hover/send:translate-x-0.5 group-disabled/send:transform-none"
                aria-hidden="true"
              />
            </button>
          </form>

          {/* Prompt suggestions grid with refined tactile micro-interactions */}
          <div className="mt-2 grid grid-cols-2 border-t border-border-subtle sm:mt-3 sm:grid-cols-4">
            {prompts.map((prompt, index) => (
              <button
                key={prompt.id}
                type="button"
                onClick={() => openConversation(prompt.sampleQuery, prompt.targetIntent)}
                className={`min-h-11 px-2 text-left text-xs font-medium text-text-secondary transition-all hover:-translate-y-[1.5px] hover:bg-surface-interactive hover:text-brand-primary active:translate-y-0 active:scale-[0.99] sm:text-center ${
                  index > 0 ? "border-l border-border-subtle" : ""
                } ${index === 2 ? "max-sm:border-l-0" : ""} ${
                  index > 1 ? "max-sm:border-t max-sm:border-border-subtle" : ""
                }`}
                style={{
                  opacity: isEntered || isReducedMotion ? 1 : 0,
                  transform: isEntered || isReducedMotion ? "none" : "translate3d(0, 4px, 0)",
                  transition: isReducedMotion || !isEntered
                    ? "none"
                    : `opacity 450ms ${MOTION_TOKENS.easing.engineered} ${560 + index * MOTION_TOKENS.stagger.promptButtonsMs}ms, transform 450ms ${MOTION_TOKENS.easing.engineered} ${560 + index * MOTION_TOKENS.stagger.promptButtonsMs}ms, background-color ${MOTION_TOKENS.duration.micro}ms ${MOTION_TOKENS.easing.engineered}, color ${MOTION_TOKENS.duration.micro}ms ${MOTION_TOKENS.easing.engineered}`,
                }}
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile adaptive continuation cue */}
      <span
        className="absolute -bottom-6 left-8 h-6 w-px bg-brand-primary sm:-bottom-12 sm:left-12 sm:h-12 md:hidden"
        style={{
          transformOrigin: "top center",
          transform: isEntered || isReducedMotion ? "scaleY(1)" : "scaleY(0)",
          transition: isReducedMotion || !isEntered
            ? "none"
            : `transform ${MOTION_TOKENS.duration.lineDraw}ms ${MOTION_TOKENS.easing.engineered} 680ms`,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
