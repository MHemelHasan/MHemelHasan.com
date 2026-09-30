"use client";

import { useState } from "react";
import { initialPromptSuggestions } from "@/data/prompts";
import { QuickPrompts } from "@/components/hero/quick-prompts";
import { useConversation } from "./conversation-context";
import { ArrowRight, Sparkles } from "lucide-react";
import { PromptSuggestion } from "@/types/conversation";

export function ConversationGateway() {
  const [inputValue, setInputValue] = useState("");
  const { openConversation } = useConversation();

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    openConversation(query);
    setInputValue("");
  };

  const handleSelectPrompt = (prompt: PromptSuggestion) => {
    openConversation(prompt.sampleQuery, prompt.targetIntent);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Primary Input Bar */}
      <form
        onSubmit={handleTextSubmit}
        className="group relative flex w-full items-center rounded-2xl sm:rounded-full border border-border-interactive bg-surface-card p-1.5 sm:p-2 shadow-md shadow-slate-900/5 dark:shadow-xl dark:shadow-black/40 backdrop-blur-xl transition-all duration-200 hover:border-accent-sky/40 focus-within:border-accent-sky focus-within:bg-surface-card focus-within:shadow-lg focus-within:shadow-slate-900/10 dark:focus-within:shadow-black/60"
      >
        <div className="pl-3 sm:pl-4 text-text-muted transition-colors group-focus-within:text-accent-sky">
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask me about what I build, architecture, ventures…"
          aria-label="Ask a question about M Hemel Hasan's work"
          className="w-full bg-transparent px-3 py-2 text-sm sm:text-base font-medium text-text-primary placeholder:text-text-muted/80 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 border-none outline-none shadow-none"
        />

        <button
          type="submit"
          disabled={!inputValue.trim()}
          aria-label="Submit query and enter conversation"
          className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl sm:rounded-full bg-accent-sky text-canvas font-bold shadow-md transition-all hover:opacity-90 disabled:opacity-35 disabled:cursor-not-allowed active:scale-95"
        >
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </form>

      {/* Tactile Discovery Prompt Chips */}
      <div className="mt-3.5 sm:mt-4">
        <QuickPrompts
          prompts={initialPromptSuggestions}
          onSelectPrompt={handleSelectPrompt}
        />
      </div>
    </div>
  );
}
