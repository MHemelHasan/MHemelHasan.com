"use client";

import { supportAIVenture } from "@/data/ventures";
import { Sparkles, MessageSquare, Bot, ArrowRight, Layers, GitFork } from "lucide-react";
import { PromptSuggestion } from "@/types/conversation";

interface SupportAIResponseProps {
  onSelectPrompt?: (prompt: PromptSuggestion) => void;
  onNavigateSection?: (anchor: string) => void;
}

export function SupportAIResponse({ onSelectPrompt, onNavigateSection }: SupportAIResponseProps) {
  return (
    <div className="space-y-5 text-text-primary">
      {/* Level 1: Conversational Prose Introduction */}
      <p className="text-sm sm:text-base leading-relaxed text-text-primary">
        <strong className="font-semibold text-text-primary">Support AI</strong> is what I’m exploring next. It’s an exploratory concept for knowledge-grounded AI customer support — designed to help businesses answer customer questions accurately by grounding responses in verified internal documentation, catalogs, and policies.
      </p>

      {/* Level 2: Exploratory Posture & Integrity Notice */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface-nested/70 border border-border-subtle p-3.5 sm:p-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/15 border border-sky-500/30 text-accent-sky">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <span className="text-xs font-bold text-text-primary">Forward-Looking Concept</span>
            <span className="text-[11px] text-text-muted block">In technical R&D / exploration</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-border-subtle bg-surface-card px-2.5 py-0.5 text-xs font-mono font-medium text-text-secondary">
            Coming Next · Currently Exploring
          </span>
        </div>
      </div>

      {/* Concept Architecture & Channels */}
      <div className="space-y-2.5 pt-1">
        <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
          Channels Under Exploration:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {supportAIVenture.channels?.map((ch) => (
            <span
              key={ch}
              className="rounded-full border border-border-subtle bg-surface-card px-3 py-1 text-xs font-medium text-text-secondary"
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border-subtle bg-surface-card p-4 space-y-2">
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent-sky block">
          Core Architectural Vision
        </span>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          The concept focuses on connecting company knowledge repositories (documentation, FAQs, order status) with multi-channel adapters (WhatsApp, Messenger, Web Chat) to provide trustworthy support with verified business context.
        </p>
        <p className="text-[11px] text-text-muted italic pt-1 border-t border-border-subtle">
          Note: This project is in early conceptual R&D. No launch date, pricing, or customer metrics are established.
        </p>
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
                  label: "Social AI",
                  iconName: "Bot",
                  targetIntent: "social_ai",
                  sampleQuery: "Tell me about Social AI",
                })
              }
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-interactive bg-surface-card px-3 py-1 text-text-secondary hover:border-accent-sky hover:text-accent-sky transition-colors"
            >
              <Bot className="h-3 w-3 text-amber-500" />
              <span>Tell me about Social AI →</span>
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
          onClick={() => onNavigateSection?.("#ventures")}
          className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-accent-sky hover:underline ml-auto"
        >
          <span>View ventures section below</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
