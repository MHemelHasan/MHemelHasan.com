"use client";

import { useState } from "react";
import { socialAIVenture, supportAIVenture } from "@/data/ventures";
import {
  Sparkles,
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
  Clock,
  Check,
  Compass,
} from "lucide-react";

interface VenturesSectionProps {
  onAskInConversation?: (query: string) => void;
}

export function VenturesSection({ onAskInConversation }: VenturesSectionProps) {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);

  const workflowIcons = [Search, Sliders, PenTool, Calendar, Send];

  const handleAsk = (query: string) => {
    if (onAskInConversation) {
      onAskInConversation(query);
    } else {
      const el = document.getElementById("conversation");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="ventures" className="mt-20 sm:mt-28 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col items-start md:items-center md:text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-status-beta/30 bg-status-beta/10 px-3 py-0.5 text-xs font-mono font-medium text-status-beta">
          <Sparkles className="h-3 w-3 text-status-beta" />
          <span>Independent Software Products</span>
        </div>
        <h2 className="mt-3.5 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          Ventures I&apos;m Building
        </h2>
        <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl">
          Proprietary software conceived, architected, and engineered from the ground up — clearly distinguished from commercial client and company products.
        </p>
      </div>

      {/* Flagship Venture: Social AI (Dominant Visual Anchor) */}
      <div className="mt-10 sm:mt-14 rounded-2xl border border-border-interactive/70 bg-surface-card p-6 sm:p-8 lg:p-10 shadow-sm relative transition-colors">
        {/* Editorial 2-Column Grid: Left Story Narrative / Right Conceptual Workflow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Founder Narrative & Verified Capabilities (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Meta & Status Row */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-status-beta/30 bg-status-beta/10 px-2.5 py-0.5 text-xs font-semibold text-status-beta font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-status-beta" />
                  <span>{socialAIVenture.statusLabel}</span>
                </span>
                <span className="text-xs font-mono font-medium text-text-muted">
                  Personal Venture
                </span>
                <span className="text-border-interactive hidden sm:inline">•</span>
                <span className="text-xs font-semibold text-accent-sky">
                  Founder & Lead Architect
                </span>
              </div>

              {/* Title & Core Value Proposition */}
              <h3 className="mt-3.5 text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
                {socialAIVenture.title}
              </h3>
              <p className="mt-2 text-base sm:text-lg font-medium text-text-primary/90 leading-snug">
                {socialAIVenture.tagline}
              </p>
              <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                {socialAIVenture.summary}
              </p>

              {/* Verified Channel Scope (Quiet, unboxed inline indicators) */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
                  Verified Platform Scope:
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs text-text-secondary">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-nested px-2.5 py-1 font-medium text-text-primary">
                    <Linkedin className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    <span>LinkedIn</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-nested px-2.5 py-1 font-medium text-text-primary">
                    <Facebook className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                    <span>Facebook Pages</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-nested px-2.5 py-1 font-medium text-text-primary">
                    <Twitter className="h-3.5 w-3.5 text-slate-700 dark:text-slate-300" />
                    <span>X / Twitter</span>
                  </span>
                </div>
              </div>

              {/* Verified Capabilities (Open 2-Column List - NO mini-box cards) */}
              <div className="mt-7 pt-6 border-t border-border-subtle">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-3.5">
                  Verified Capabilities & Systems Scope
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {socialAIVenture.capabilities.map((cap) => (
                    <div
                      key={cap}
                      className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0 text-status-beta mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions & Cohort Note */}
            <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
                <Clock className="h-3.5 w-3.5 text-status-beta" />
                <span>Private Beta • Invite-only access cohort</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleAsk("Tell me about Social AI")}
                  className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-accent-sky hover:underline"
                >
                  <MessageSquareText className="h-3.5 w-3.5" />
                  <span>Explore in conversation</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Conceptual Product Workflow Workbench (5 Cols) */}
          <div className="lg:col-span-5 rounded-xl border border-border-interactive/80 bg-surface-nested/70 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Studio Header */}
              <div className="flex items-center justify-between border-b border-border-subtle pb-3.5">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent-sky">
                    Product Workflow
                  </span>
                  <h4 className="text-sm font-bold text-text-primary mt-0.5">
                    5-Stage Content Pipeline
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-text-muted bg-surface-card px-2 py-0.5 rounded border border-border-subtle">
                  Conceptual Workflow
                </span>
              </div>

              {/* Vertical Step Selector */}
              <div className="mt-4 space-y-1.5" role="tablist" aria-label="Social AI workflow stages">
                {socialAIVenture.workflowSteps?.map((step, idx) => {
                  const Icon = workflowIcons[idx] || Search;
                  const isActive = activeWorkflowStep === idx;
                  return (
                    <button
                      key={step.step}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveWorkflowStep(idx)}
                      className={`group w-full flex items-center justify-between p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        isActive
                          ? "border-accent-sky/70 bg-surface-card text-text-primary shadow-xs ring-1 ring-accent-sky/30"
                          : "border-transparent bg-transparent text-text-secondary hover:bg-surface-interactive/50 hover:text-text-primary"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`text-xs font-mono font-bold ${isActive ? "text-accent-sky" : "text-text-muted"}`}>
                          {step.step}
                        </span>
                        <span className="text-xs font-medium leading-none">
                          {step.title}
                        </span>
                      </div>
                      <Icon className={`h-3.5 w-3.5 transition-colors ${isActive ? "text-accent-sky" : "text-text-muted group-hover:text-text-primary"}`} />
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Inspector Panel */}
              {socialAIVenture.workflowSteps && (
                <div className="mt-4 rounded-lg border border-border-subtle bg-surface-card p-3.5 sm:p-4 min-h-[68px] flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent-sky">
                    <span>Stage {socialAIVenture.workflowSteps[activeWorkflowStep].step}:</span>
                    <span className="text-text-primary">
                      {socialAIVenture.workflowSteps[activeWorkflowStep].title}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">
                    {socialAIVenture.workflowSteps[activeWorkflowStep].description}
                  </p>
                </div>
              )}
            </div>

            <p className="mt-4 text-[11px] text-text-muted leading-tight text-center">
              Click a stage to inspect its operational role in the content lifecycle.
            </p>
          </div>
        </div>
      </div>

      {/* Secondary Venture: Support AI (Compact Future Exploration - NOT an equal card) */}
      <div className="mt-6 sm:mt-8 rounded-xl border border-border-subtle bg-surface-nested/40 p-5 sm:p-6 lg:p-7 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-text-muted" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                What I&apos;m Exploring Next
              </span>
            </div>
            <span className="text-border-interactive hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-text-primary">
                {supportAIVenture.title}
              </h3>
              <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2 py-0.2 text-[10px] font-mono font-semibold text-purple-600 dark:text-purple-400">
                {supportAIVenture.statusLabel}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleAsk("Tell me about what you're building next with Support AI")}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-accent-sky hover:underline"
          >
            <span>Ask in conversation</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Narrative & Capabilities Split */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold text-text-primary">
              {supportAIVenture.tagline}
            </p>
            <p className="mt-1.5 text-xs sm:text-sm text-text-secondary leading-relaxed">
              {supportAIVenture.summary}
            </p>

            <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono text-text-muted text-[11px]">Planned Channels:</span>
              {supportAIVenture.channels?.map((ch) => (
                <span
                  key={ch}
                  className="rounded bg-surface-card px-2 py-0.5 text-[11px] font-medium text-text-secondary border border-border-subtle"
                >
                  {ch}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary">
            {supportAIVenture.capabilities.map((cap) => (
              <div key={cap} className="flex items-start gap-1.5">
                <span className="h-1 w-1 rounded-full bg-accent-sky mt-1.5 shrink-0" />
                <span className="leading-snug">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
