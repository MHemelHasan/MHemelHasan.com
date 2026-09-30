"use client";

import { PromptSuggestion } from "@/types/conversation";
import { Sparkles, Layers, GitFork, Send, Bot, Briefcase, User, Compass, HelpCircle } from "lucide-react";

interface QuickPromptsProps {
  prompts: PromptSuggestion[];
  onSelectPrompt: (prompt: PromptSuggestion) => void;
  activePromptId?: string | null;
}

export function QuickPrompts({
  prompts,
  onSelectPrompt,
  activePromptId,
}: QuickPromptsProps) {
  const getIcon = (iconName: PromptSuggestion["iconName"]) => {
    switch (iconName) {
      case "User":
        return <User className="h-4 w-4 text-sky-600 dark:text-sky-400" />;
      case "Bot":
        return <Bot className="h-4 w-4 text-amber-500 dark:text-amber-400" />;
      case "Layers":
        return <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case "GitFork":
        return <GitFork className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      case "Compass":
        return <Compass className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />;
      case "Sparkles":
        return <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-400" />;
      case "Send":
        return <Send className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      default:
        return <Briefcase className="h-4 w-4 text-text-secondary" />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2 sm:gap-2.5">
        {prompts.map((prompt) => {
          const isActive = activePromptId === prompt.id;
          return (
            <button
              key={prompt.id}
              type="button"
              onClick={() => onSelectPrompt(prompt)}
              className={`group inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 ${
                isActive
                  ? "border-accent-sky/70 bg-surface-interactive text-text-primary shadow-[0_0_20px_-3px_rgba(2,132,199,0.2)] dark:shadow-[0_0_20px_-3px_rgba(56,189,248,0.25)] ring-1 ring-accent-sky/40"
                  : "border-border-interactive bg-surface-card text-text-secondary shadow-sm hover:-translate-y-0.5 hover:border-accent-sky/50 hover:bg-surface-nested hover:text-text-primary hover:shadow-md"
              }`}
            >
              <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                {getIcon(prompt.iconName)}
              </span>
              <span className="tracking-tight">{prompt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

