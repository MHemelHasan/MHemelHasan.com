"use client";

import { useState } from "react";
import { socialAIVenture, supportAIVenture } from "@/data/ventures";
import {
  Search,
  Sliders,
  PenTool,
  Calendar,
  Send,
  Linkedin,
  Facebook,
  Twitter,
  ArrowRight,
  MessageSquareText,
  Check,
  Compass,
} from "lucide-react";

interface ClaudeVenturesProps {
  onAskInConversation?: (query: string) => void;
}

/**
 * VENTURES — Round 3 Claude Experiment
 *
 * Composition concept: "Open Canvas with Product Evidence"
 *
 * Key design decisions:
 *
 * 1. NO section-level container card. The page canvas itself carries the
 *    composition. This avoids the "one giant card" problem from previous rounds.
 *
 * 2. Social AI section uses an intentionally different layout from the Hero:
 *    - Left-aligned section title with generous top margin
 *    - The venture content uses a 7/5 asymmetric grid mirroring the Hero's
 *      proportions but with DIFFERENT internal structure
 *    - Left column: founder narrative, status, tagline, summary, capabilities
 *    - Right column: compact conceptual workflow selector (interactive product
 *      evidence without fake UI)
 *
 * 3. Hero → Ventures transition uses generous whitespace (~120–160px) and
 *    a subtle left-aligned text anchor ("What I'm building") to shift context
 *    from identity to proof. No decorative dividers.
 *
 * 4. Support AI is intentionally slim: a single-row element at the bottom,
 *    visually lighter, communicating "exploring next" without competing
 *    with Social AI for attention.
 *
 * 5. Workflow visualization is interactive (click-to-inspect) but presented
 *    as a simple explanatory product flow, NOT a fake dashboard.
 *    The "Conceptual Workflow" label is kept to maintain honesty.
 */
export function ClaudeVentures({
  onAskInConversation,
}: ClaudeVenturesProps) {
  const [activeStep, setActiveStep] = useState(0);

  const workflowIcons = [Search, Sliders, PenTool, Calendar, Send];

  const handleAsk = (query: string) => {
    if (onAskInConversation) {
      onAskInConversation(query);
    }
  };

  return (
    <section
      id="ventures"
      className="scroll-mt-24 mx-auto max-w-[1200px] px-5 sm:px-8 pb-20"
    >
      {/* ─── Section anchor: left-aligned, editorial ─── */}
      <div className="pt-24 sm:pt-28 lg:pt-32">
        <p className="text-sm font-semibold tracking-wide text-accent-sky">
          What I&apos;m Building
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
          Ventures
        </h2>
        <p className="mt-3 max-w-2xl text-base text-text-secondary leading-relaxed">
          Proprietary software conceived, architected, and engineered from the
          ground up — clearly distinguished from commercial client and company
          products.
        </p>
      </div>

      {/* ═══ SOCIAL AI — Flagship venture ═══ */}
      <div className="mt-12 sm:mt-16">
        {/* Status + role line */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-status-beta/30 bg-status-beta/10 px-2.5 py-1 text-xs font-semibold text-status-beta">
            <span className="h-1.5 w-1.5 rounded-full bg-status-beta" />
            {socialAIVenture.statusLabel}
          </span>
          <span className="text-xs font-medium text-text-muted">
            Personal Venture
          </span>
          <span className="h-3 w-px bg-border-subtle hidden sm:inline-block" aria-hidden="true" />
          <span className="text-xs font-semibold text-accent-sky">
            Founder &amp; Lead Architect
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
          {socialAIVenture.title}
        </h3>

        {/* Tagline */}
        <p className="mt-2 text-base sm:text-lg font-medium text-text-primary/90 leading-snug max-w-2xl">
          {socialAIVenture.tagline}
        </p>

        {/* ─── Two-column: Narrative + Workflow ─── */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT: Narrative column */}
          <div className="lg:col-span-7">
            {/* Summary */}
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              {socialAIVenture.summary}
            </p>

            {/* Channel scope — quiet inline indicators */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-medium text-text-muted">
                Connected platforms:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-nested px-2.5 py-1 text-xs font-medium text-text-primary border border-border-subtle">
                  <Linkedin className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  LinkedIn
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-nested px-2.5 py-1 text-xs font-medium text-text-primary border border-border-subtle">
                  <Facebook className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                  Facebook Pages
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-nested px-2.5 py-1 text-xs font-medium text-text-primary border border-border-subtle">
                  <Twitter className="h-3.5 w-3.5 text-slate-700 dark:text-slate-300" />
                  X / Twitter
                </span>
              </div>
            </div>

            {/* Verified capabilities — open two-column list */}
            <div className="mt-8 pt-6 border-t border-border-subtle">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3.5">
                Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {socialAIVenture.capabilities.map((cap) => (
                  <div
                    key={cap}
                    className="flex items-start gap-2 text-sm text-text-secondary leading-relaxed"
                  >
                    <Check className="h-4 w-4 shrink-0 text-accent-sky mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversation link */}
            <div className="mt-8">
              <button
                type="button"
                onClick={() => handleAsk("Tell me about Social AI")}
                className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-accent-sky hover:underline transition-colors"
              >
                <MessageSquareText className="h-4 w-4" />
                Explore in conversation
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT: Conceptual Product Workflow */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-border-interactive/80 bg-surface-card p-5 sm:p-6">
              {/* Workflow header */}
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-sky">
                    Product Workflow
                  </span>
                  <h4 className="text-sm font-bold text-text-primary mt-0.5">
                    Content Pipeline
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-text-muted bg-surface-nested px-2 py-0.5 rounded border border-border-subtle">
                  Conceptual
                </span>
              </div>

              {/* Step selector */}
              <div
                className="mt-4 space-y-1"
                role="tablist"
                aria-label="Social AI workflow stages"
              >
                {socialAIVenture.workflowSteps?.map((step, idx) => {
                  const Icon = workflowIcons[idx] || Search;
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={step.step}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveStep(idx)}
                      className={`group w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                        isActive
                          ? "bg-surface-interactive text-text-primary"
                          : "text-text-secondary hover:bg-surface-nested hover:text-text-primary"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`text-xs font-mono font-bold ${
                            isActive ? "text-accent-sky" : "text-text-muted"
                          }`}
                        >
                          {step.step}
                        </span>
                        <span className="text-sm font-medium leading-none">
                          {step.title}
                        </span>
                      </div>
                      <Icon
                        className={`h-3.5 w-3.5 transition-colors ${
                          isActive
                            ? "text-accent-sky"
                            : "text-text-muted group-hover:text-text-primary"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Active step detail */}
              {socialAIVenture.workflowSteps && (
                <div className="mt-4 rounded-lg bg-surface-nested p-4 min-h-[68px]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-accent-sky">
                    <span>
                      Stage{" "}
                      {socialAIVenture.workflowSteps[activeStep].step}
                    </span>
                    <span className="text-text-primary">
                      {socialAIVenture.workflowSteps[activeStep].title}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                    {socialAIVenture.workflowSteps[activeStep].description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ SUPPORT AI — Slim continuation ═══ */}
      <div className="mt-16 sm:mt-20 pt-8 border-t border-border-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-text-muted" />
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Exploring Next
              </span>
            </div>
            <span className="h-4 w-px bg-border-subtle hidden sm:inline-block" aria-hidden="true" />
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg font-bold text-text-primary">
                {supportAIVenture.title}
              </h3>
              <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-purple-600 dark:text-purple-400">
                {supportAIVenture.statusLabel}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              handleAsk(
                "Tell me about what you're building next with Support AI"
              )
            }
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-accent-sky hover:underline"
          >
            Ask in conversation
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-text-primary">
              {supportAIVenture.tagline}
            </p>
            <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
              {supportAIVenture.summary}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-text-muted font-medium">
                Planned channels:
              </span>
              {supportAIVenture.channels?.map((ch) => (
                <span
                  key={ch}
                  className="rounded bg-surface-nested px-2.5 py-1 text-xs font-medium text-text-secondary border border-border-subtle"
                >
                  {ch}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
