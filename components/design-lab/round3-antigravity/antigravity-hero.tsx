"use client";

import { useState } from "react";
import Image from "next/image";
import { personalProfile } from "@/data/profile";
import { initialPromptSuggestions } from "@/data/prompts";
import { useConversation } from "@/components/conversation/conversation-context";
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Layers,
  ArrowUpRight,
  Terminal,
} from "lucide-react";
import { PromptSuggestion } from "@/types/conversation";

const buildStages = [
  { step: "01", name: "Research" },
  { step: "02", name: "Architecture" },
  { step: "03", name: "Systems" },
  { step: "04", name: "Integrations" },
  { step: "05", name: "Launch" },
];

export function AntigravityHero() {
  const [inputValue, setInputValue] = useState("");
  const { openConversation } = useConversation();

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;
    openConversation(query);
    setInputValue("");
  };

  const handlePromptClick = (prompt: PromptSuggestion) => {
    openConversation(prompt.sampleQuery, prompt.targetIntent);
  };

  return (
    <section
      id="hero"
      aria-label="Introduction and Identity"
      className="relative mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-20 lg:pt-18 lg:pb-24"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-start">
        {/* Left Column: Authoritative Editorial Statement & Interactive Gateway (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Eyebrow / Professional Positioning */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-sky/30 bg-accent-soft/70 px-3 py-1 text-xs font-semibold text-accent-sky">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-sky animate-pulse" />
              Product Engineer • Builder • Founder
            </span>
          </div>

          {/* Primary Display Name */}
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
            {personalProfile.name}
          </h1>

          {/* Core Positioning Statement */}
          <p className="mt-4 sm:mt-5 text-lg sm:text-xl text-text-secondary leading-relaxed font-normal max-w-2xl">
            {personalProfile.tagline}
          </p>

          {/* Concrete Context Signals */}
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-medium text-text-muted">
            <div className="inline-flex items-center gap-1.5 text-text-secondary">
              <MapPin className="h-4 w-4 text-accent-sky shrink-0" />
              <span>{personalProfile.location}</span>
            </div>
            <span className="text-border-interactive hidden sm:inline">•</span>
            <div className="inline-flex items-center gap-1.5 text-text-secondary">
              <Layers className="h-4 w-4 text-accent-sky shrink-0" />
              <span>Platform systems across commerce & SaaS</span>
            </div>
          </div>

          {/* Build Pipeline Rhythm Strip */}
          <div className="mt-7 sm:mt-8 border-y border-border-subtle py-3.5">
            <div className="flex items-center justify-between gap-1 overflow-x-auto text-[11px] sm:text-xs font-mono text-text-muted">
              {buildStages.map((stage, idx) => (
                <div key={stage.step} className="flex items-center gap-1.5 shrink-0">
                  <span className="font-semibold text-accent-sky">{stage.step}</span>
                  <span className="text-text-secondary font-medium">{stage.name}</span>
                  {idx < buildStages.length - 1 && (
                    <span className="text-border-interactive mx-1">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Conversational Gateway Surface */}
          <div className="mt-7 sm:mt-8">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent-sky" />
                Ask My Portfolio Assistant
              </span>
              <span className="text-[11px] font-mono text-text-muted">Interactive AI</span>
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleTextSubmit}
              className="group relative flex w-full items-center rounded-2xl border border-border-interactive bg-surface-card p-1.5 sm:p-2 shadow-sm transition-all duration-200 hover:border-accent-sky/50 focus-within:border-accent-sky focus-within:shadow-md focus-within:shadow-accent-sky/5"
            >
              <div className="pl-3 sm:pl-4 text-text-muted group-focus-within:text-accent-sky transition-colors">
                <Terminal className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about what I build, architecture, ventures…"
                aria-label="Ask a question about M Hemel Hasan's work"
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base font-medium text-text-primary placeholder:text-text-muted/70 focus:outline-none border-none outline-none"
              />

              <button
                type="submit"
                disabled={!inputValue.trim()}
                aria-label="Submit query and enter conversation"
                className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-accent-sky text-white font-bold shadow-sm transition-all hover:bg-brand-primary-hover disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
              >
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </form>

            {/* Curated Prompt Chips */}
            <div className="mt-3.5 flex flex-wrap gap-2">
              {initialPromptSuggestions.slice(0, 4).map((prompt) => (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => handlePromptClick(prompt)}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border-interactive/90 bg-surface-card px-3 py-1.5 text-xs font-medium text-text-secondary transition-all hover:border-accent-sky/60 hover:bg-surface-interactive hover:text-text-primary active:scale-95"
                >
                  <Sparkles className="h-3 w-3 text-accent-sky transition-transform group-hover:scale-125" />
                  <span>{prompt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Portrait & Founder Anchor (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
            {/* Portrait Frame with subtle cobalt accent border */}
            <div className="relative overflow-hidden rounded-3xl border border-border-interactive bg-surface-card p-2 sm:p-2.5 shadow-xl shadow-slate-900/5">
              <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-[20px] bg-surface-nested">
                <Image
                  src="/assets/avatar.jpg"
                  alt="M Hemel Hasan - Product Engineer, Builder, Founder"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 420px"
                  priority
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Founder Pill */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-canvas/80 backdrop-blur-md border border-border-subtle/80 px-3 py-2 text-xs shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-beta opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-status-beta" />
                    </span>
                    <span className="font-semibold text-text-primary">Founder @ Social AI</span>
                  </div>
                  <span className="rounded bg-status-beta/15 px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-status-beta">
                    Private Beta
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial Caption Box */}
            <div className="mt-4 rounded-2xl border border-border-subtle bg-surface-card p-4 text-xs text-text-secondary shadow-sm">
              <div className="flex items-center justify-between font-mono text-[11px] text-text-muted mb-1.5">
                <span>IDENTITY & STATUS</span>
                <span>2026</span>
              </div>
              <p className="leading-relaxed">
                <strong className="text-text-primary">M Hemel Hasan</strong> is currently leading architecture and product delivery on proprietary AI systems and commercial enterprise apps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
