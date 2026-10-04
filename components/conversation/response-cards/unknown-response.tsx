"use client";

import { initialPromptSuggestions } from "@/data/prompts";
import { PromptSuggestion } from "@/types/conversation";
import { ArrowRight } from "lucide-react";
import { ResponseIntro, ResponseSection } from "./response-primitives";

interface UnknownResponseProps {
  onSelectPrompt: (prompt: PromptSuggestion) => void;
}

export function UnknownResponse({ onSelectPrompt }: UnknownResponseProps) {
  const suggestions = initialPromptSuggestions.filter((prompt) =>
    ["about-me", "social-ai", "show-products", "how-build", "lets-talk"].includes(prompt.id)
  );

  return (
    <div className="space-y-6 text-text-primary">
      <ResponseIntro>
        That question sits outside the portfolio topics I can answer reliably. You can still ask
        about my work, ventures, process, journey, or how to get in touch.
      </ResponseIntro>

      <ResponseSection label="Try asking">
        <div className="grid gap-2 sm:grid-cols-2">
          {suggestions.map((prompt) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => onSelectPrompt(prompt)}
              className="group flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-border-subtle bg-surface-card px-3.5 py-2.5 text-left text-sm font-medium leading-5 text-text-secondary transition-[border-color,background-color,color] hover:border-accent-sky/50 hover:bg-accent-soft hover:text-text-primary"
            >
              <span>{prompt.sampleQuery}</span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-text-muted transition-colors group-hover:text-accent-sky"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </ResponseSection>
    </div>
  );
}
