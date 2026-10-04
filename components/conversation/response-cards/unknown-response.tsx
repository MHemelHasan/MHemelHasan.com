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
        I couldn&apos;t match that phrase to a portfolio topic. Try one of these paths into the work.
      </ResponseIntro>

      <ResponseSection label="Suggested topics">
        <div className="border-t border-border-subtle">
          {suggestions.map((prompt) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => onSelectPrompt(prompt)}
              className="group flex min-h-12 w-full cursor-pointer items-center justify-between border-b border-border-subtle text-left text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {prompt.label}
              <ArrowRight className="h-4 w-4 text-text-muted transition-colors group-hover:text-accent-sky" aria-hidden="true" />
            </button>
          ))}
        </div>
      </ResponseSection>
    </div>
  );
}
