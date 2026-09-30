"use client";

import { PromptSuggestion } from "@/types/conversation";
import { initialPromptSuggestions } from "@/data/prompts";
import { Sparkles } from "lucide-react";

interface UnknownResponseProps {
  onSelectPrompt: (prompt: PromptSuggestion) => void;
}

export function UnknownResponse({ onSelectPrompt }: UnknownResponseProps) {
  return (
    <div className="space-y-4 text-text-primary">
      <p className="text-sm sm:text-base leading-relaxed text-text-primary">
        I didn&apos;t quite match that exact phrase, but I can share details about my active venture (Social AI), commercial products shipped at Themefic, engineering process, or career journey.
      </p>

      <div className="space-y-2">
        <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
          Suggested topics:
        </span>
        <div className="flex flex-wrap gap-2">
          {initialPromptSuggestions.map((prompt) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => onSelectPrompt(prompt)}
              className="cursor-pointer rounded-full border border-border-interactive bg-surface-card px-3.5 py-1.5 text-xs font-medium text-text-secondary transition-all hover:border-accent-sky hover:bg-surface-nested hover:text-text-primary active:scale-95 shadow-sm"
            >
              {prompt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
