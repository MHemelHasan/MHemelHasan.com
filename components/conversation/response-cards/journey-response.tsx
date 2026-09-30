"use client";

import { journeyMilestones } from "@/data/journey";
import { Compass, ArrowRight, Bot, Layers, GitFork, Send } from "lucide-react";
import { PromptSuggestion } from "@/types/conversation";

interface JourneyResponseProps {
  onSelectPrompt?: (prompt: PromptSuggestion) => void;
  onNavigateSection?: (anchor: string) => void;
}

export function JourneyResponse({ onSelectPrompt, onNavigateSection }: JourneyResponseProps) {
  return (
    <div className="space-y-5 text-text-primary">
      {/* Level 1: Conversational Prose Introduction */}
      <p className="text-sm sm:text-base leading-relaxed text-text-primary">
        I started building software professionally in <strong className="font-semibold text-text-primary">2015</strong>. Over the past 9+ years, my career has been shaped by a steady evolution of capability — moving from web foundations into plugin engineering, full-stack systems, multi-platform apps, and now technical leadership and venture building.
      </p>

      {/* Level 2: Evolutionary Progression (Clean timeline, not a résumé) */}
      <div className="space-y-3 pt-1">
        <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
          Evolution of Capability (2015 — Present):
        </span>

        <div className="relative border-l-2 border-border-interactive ml-3 space-y-4 py-1">
          {journeyMilestones.map((m) => (
            <div key={m.id} className="relative pl-5 text-left">
              <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-accent-sky" />
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-xs font-bold text-accent-sky">{m.yearPeriod}</span>
                <span className="text-xs font-bold text-text-primary">{m.stageName}</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed pt-0.5">
                {m.context}
              </p>
              <div className="mt-1 text-[11px] font-mono text-text-muted">
                <span className="text-text-secondary font-semibold">Architectural shift:</span> {m.evolutionShift}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reflective Summary */}
      <div className="rounded-xl border border-border-subtle bg-surface-card p-3.5 text-xs text-text-secondary leading-relaxed">
        <strong className="text-text-primary font-semibold">Core takeaway:</strong> The biggest evolution in my work was shifting from &ldquo;writing code to meet a spec&rdquo; to designing end-to-end software architecture that respects platform boundaries, real data models, and long-term maintainability.
      </div>

      {/* Contextual Next Prompts & Deep Link */}
      <div className="pt-3 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs">
        {onSelectPrompt && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onSelectPrompt({
                  id: "ask-social-ai",
                  label: "What I'm building now",
                  iconName: "Bot",
                  targetIntent: "social_ai",
                  sampleQuery: "Tell me about Social AI",
                })
              }
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-interactive bg-surface-card px-3 py-1 text-text-secondary hover:border-accent-sky hover:text-accent-sky transition-colors"
            >
              <Bot className="h-3 w-3 text-amber-500" />
              <span>What I&apos;m building now →</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onSelectPrompt({
                  id: "ask-products",
                  label: "My products",
                  iconName: "Layers",
                  targetIntent: "products",
                  sampleQuery: "Show me products you have shipped",
                })
              }
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-interactive bg-surface-card px-3 py-1 text-text-secondary hover:border-accent-sky hover:text-accent-sky transition-colors"
            >
              <Layers className="h-3 w-3 text-emerald-500" />
              <span>My products →</span>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => onNavigateSection?.("#journey")}
          className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-accent-sky hover:underline ml-auto"
        >
          <span>View full journey section below</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
