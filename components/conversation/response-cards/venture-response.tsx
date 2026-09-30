"use client";

import { socialAIVenture, supportAIVenture } from "@/data/ventures";
import { Bot, Sparkles, CheckCircle2, Share2, Radio } from "lucide-react";

interface VentureResponseProps {
  onNavigateSection?: (anchor: string) => void;
}

export function VentureResponse({ onNavigateSection }: VentureResponseProps) {
  return (
    <div className="space-y-6">
      {/* Flagship Venture: Social AI */}
      <div className="relative overflow-hidden rounded-2xl border border-border-interactive bg-surface-card p-6 sm:p-7 shadow-md shadow-slate-900/5 dark:shadow-xl dark:shadow-black/40">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border-subtle pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 shadow-inner">
              <Bot className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-text-primary">
                  {socialAIVenture.title}
                </h3>
              </div>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-text-muted">
                {socialAIVenture.typeLabel} • Founder / Lead Architect
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-status-beta/40 bg-status-beta/10 px-3.5 py-1 text-xs font-semibold text-status-beta shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-beta opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-status-beta" />
            </span>
            <span>{socialAIVenture.statusLabel}</span>
          </div>
        </div>

        {/* Value Proposition */}
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-text-primary/95 font-medium">
          {socialAIVenture.summary}
        </p>

        {/* Connected Channels */}
        {socialAIVenture.channels && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-text-muted mr-1">
              <Share2 className="h-3.5 w-3.5 text-accent-sky" />
              Connected Platforms:
            </span>
            {socialAIVenture.channels.map((ch) => (
              <span
                key={ch}
                className="rounded-full border border-border-subtle bg-surface-nested px-3 py-1 text-xs font-medium text-text-secondary shadow-sm"
              >
                {ch}
              </span>
            ))}
          </div>
        )}

        {/* Core Capabilities Built */}
        <div className="mt-6 border-t border-border-subtle pt-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
            Engine & System Architecture
          </span>
          <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs sm:text-sm text-text-secondary">
            {socialAIVenture.capabilities.map((cap, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <span className="leading-snug">{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Static Section Deep Link */}
        <div className="mt-6 border-t border-border-subtle pt-4 flex justify-end">
          <a
            href="#ventures"
            onClick={(e) => {
              if (onNavigateSection) {
                e.preventDefault();
                onNavigateSection("#ventures");
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-sky hover:underline"
          >
            <span>Explore full venture details below</span>
            <span aria-hidden="true">&darr;</span>
          </a>
        </div>
      </div>


      {/* Secondary Preview: Support AI */}
      <div className="rounded-2xl border border-border-interactive bg-surface-nested p-5 sm:p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-600 dark:text-purple-400">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base sm:text-lg font-bold text-text-primary">
                  {supportAIVenture.title}
                </h4>
                <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-mono font-medium text-purple-700 dark:text-purple-300">
                  Concept & R&D
                </span>
              </div>
              <p className="text-xs text-text-muted">What I&apos;m Building Next</p>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-text-secondary">
          {supportAIVenture.summary}
        </p>

        {supportAIVenture.channels && (
          <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs text-text-muted">
            <span className="font-mono text-[11px]">Channels explored:</span>
            {supportAIVenture.channels.map((ch) => (
              <span
                key={ch}
                className="rounded-md border border-border-subtle bg-surface-card px-2.5 py-0.5 text-xs text-text-secondary"
              >
                {ch}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

