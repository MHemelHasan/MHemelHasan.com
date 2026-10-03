"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useConversation } from "@/components/conversation/conversation-context";
import { initialPromptSuggestions } from "@/data/prompts";

const featuredPromptIds = new Set(["about-me", "social-ai", "show-products", "how-build"]);

export function SynthesisConversationEntry() {
  const [query, setQuery] = useState("");
  const { openConversation } = useConversation();
  const prompts = initialPromptSuggestions.filter((prompt) => featuredPromptIds.has(prompt.id));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    openConversation(trimmedQuery);
    setQuery("");
  };

  return (
    <div className="relative border border-border-interactive bg-surface-card">
      <div className="grid gap-3 p-4 sm:gap-5 sm:p-6 lg:grid-cols-[minmax(170px,0.65fr)_minmax(0,1.8fr)] lg:gap-8 lg:p-7">
        <div>
          <p className="text-base font-semibold text-text-primary sm:text-lg">Ask about the work</p>
          <p className="mt-1 hidden max-w-xs text-sm leading-6 text-text-secondary sm:block">
            Explore the products, process, and decisions through a guided conversation.
          </p>
        </div>

        <div className="min-w-0">
          <form onSubmit={handleSubmit} className="flex min-h-12 items-end border-b border-text-primary">
            <label htmlFor="synthesis-conversation-query" className="sr-only">
              Ask M Hemel Hasan a question
            </label>
            <input
              id="synthesis-conversation-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="What would you like to know?"
              className="min-w-0 flex-1 bg-transparent py-3 pr-4 text-base text-text-primary outline-none placeholder:text-text-muted"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="mb-1 inline-flex h-11 w-11 shrink-0 items-center justify-center bg-brand-primary text-white transition-colors hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send question"
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>

          <div className="mt-2 grid grid-cols-2 border-t border-border-subtle sm:mt-3 sm:grid-cols-4">
            {prompts.map((prompt, index) => (
              <button
                key={prompt.id}
                type="button"
                onClick={() => openConversation(prompt.sampleQuery, prompt.targetIntent)}
                className={`min-h-11 px-2 text-left text-xs font-medium text-text-secondary transition-colors hover:bg-surface-interactive hover:text-brand-primary sm:text-center ${
                  index > 0 ? "border-l border-border-subtle" : ""
                } ${index === 2 ? "max-sm:border-l-0" : ""} ${index > 1 ? "max-sm:border-t max-sm:border-border-subtle" : ""}`}
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <span
        className="absolute -bottom-6 left-8 h-6 w-px bg-brand-primary sm:-bottom-12 sm:left-12 sm:h-12 lg:left-[34%]"
        aria-hidden="true"
      />
    </div>
  );
}
