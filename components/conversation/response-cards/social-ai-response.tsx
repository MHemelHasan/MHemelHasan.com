"use client";

import { socialAIVenture } from "@/data/ventures";
import { Bot, CheckCircle2, ArrowRight, Sparkles, Layers, GitFork } from "lucide-react";
import { PromptSuggestion } from "@/types/conversation";

interface SocialAIResponseProps {
  onSelectPrompt?: (prompt: PromptSuggestion) => void;
  onNavigateSection?: (anchor: string) => void;
}

export function SocialAIResponse({ onSelectPrompt, onNavigateSection }: SocialAIResponseProps) {
  const steps = [
    { num: "01", name: "Research", desc: "Topic discovery via RSS feeds and competitor content monitoring" },
    { num: "02", name: "Brand Voice", desc: "Persona guidelines, tone boundaries, and editorial parameters" },
    { num: "03", name: "Generation", desc: "Draft synthesis via compatible model endpoints" },
    { num: "04", name: "Scheduling", desc: "Queue management across timezones and channel rules" },
    { num: "05", name: "Publishing", desc: "Autonomous API dispatch to LinkedIn, Facebook, and X" },
  ];

  return (
    <div className="space-y-5 text-text-primary">
      {/* Level 1: Conversational Prose Introduction */}
      <p className="text-sm sm:text-base leading-relaxed text-text-primary">
        <strong className="font-semibold text-text-primary">Social AI</strong> is the product I’m currently building as my primary personal venture (Founder & Lead Architect, Private Beta). It connects social channels to help creators and teams research topics, configure their brand voice, generate drafts via compatible model endpoints, and schedule automated publishing across supported platforms.
      </p>

      {/* Level 2: Status & Channels */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface-nested/70 border border-border-subtle p-3.5 sm:p-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400">
            <Bot className="h-4 w-4" />
          </span>
          <div>
            <span className="text-xs font-bold text-text-primary">Personal Venture</span>
            <span className="text-[11px] text-text-muted block">Founder / Lead Architect</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-status-beta/30 bg-status-beta/10 px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider text-status-beta">
            Private Beta
          </span>
        </div>
      </div>

      {/* Connected Channels */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-text-muted mr-1">Supported Channels:</span>
        {socialAIVenture.channels?.map((ch) => (
          <span
            key={ch}
            className="rounded-full border border-border-subtle bg-surface-card px-2.5 py-0.5 text-xs font-medium text-text-secondary"
          >
            {ch}
          </span>
        ))}
      </div>

      {/* Workflow Progression (Lightweight unboxed cards) */}
      <div className="space-y-2 pt-1">
        <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
          Product Workflow Pipeline:
        </span>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
          {steps.map((st) => (
            <div
              key={st.num}
              className="rounded-xl border border-border-subtle bg-surface-card p-3 space-y-1 text-left"
            >
              <span className="font-mono text-[10px] text-accent-sky font-bold block">{st.num}</span>
              <div className="text-xs font-bold text-text-primary">{st.name}</div>
              <p className="text-[11px] text-text-muted leading-tight">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Product Scope & Capabilities */}
      <div className="space-y-2 pt-1">
        <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
          Verified Product Scope & Capabilities:
        </span>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-text-secondary">
          {socialAIVenture.capabilities.map((cap, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span>{cap}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contextual Next Prompts & Deep Link */}
      <div className="pt-3 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs">
        {onSelectPrompt && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onSelectPrompt({
                  id: "ask-support-ai",
                  label: "What's next?",
                  iconName: "Sparkles",
                  targetIntent: "support_ai",
                  sampleQuery: "What are you building next?",
                })
              }
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-interactive bg-surface-card px-3 py-1 text-text-secondary hover:border-accent-sky hover:text-accent-sky transition-colors"
            >
              <Sparkles className="h-3 w-3 text-sky-500" />
              <span>What are you building next? →</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onSelectPrompt({
                  id: "ask-pipeline",
                  label: "How I build",
                  iconName: "GitFork",
                  targetIntent: "pipeline",
                  sampleQuery: "How do you build products?",
                })
              }
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-interactive bg-surface-card px-3 py-1 text-text-secondary hover:border-accent-sky hover:text-accent-sky transition-colors"
            >
              <GitFork className="h-3 w-3 text-purple-500" />
              <span>How do you build? →</span>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => onNavigateSection?.("#ventures")}
          className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-accent-sky hover:underline ml-auto"
        >
          <span>Explore full venture below</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
