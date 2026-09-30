"use client";

import { useState } from "react";
import { socialAIVenture, supportAIVenture } from "@/data/ventures";
import {
  Sparkles,
  Bot,
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
  CheckCircle2,
  Workflow,
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
    <section id="ventures" className="mt-24 sm:mt-32 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col items-start md:items-center md:text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-status-beta/30 bg-status-beta/10 px-3.5 py-1 text-xs font-mono font-medium text-status-beta">
          <Sparkles className="h-3.5 w-3.5 text-status-beta" />
          <span>Independent Software Products</span>
        </div>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          Ventures I&apos;m Building
        </h2>
        <p className="mt-3.5 text-base sm:text-lg text-text-secondary leading-relaxed">
          Proprietary software conceived, architected, and engineered from the ground up — clearly distinguished from commercial client and company products.
        </p>
      </div>

      {/* Flagship Venture: Social AI */}
      <div className="mt-12 lg:mt-16 rounded-3xl border border-border-interactive bg-surface-card p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5 relative overflow-hidden transition-all duration-300 hover:border-accent-sky/40">
        {/* Subtle decorative gradient backdrop */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-72 w-72 rounded-full bg-accent-sky/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-72 w-72 rounded-full bg-status-beta/5 blur-3xl pointer-events-none" />

        {/* Top Header: Badge, Role, Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-6 sm:pb-8">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-border-interactive bg-surface-nested text-status-beta shadow-sm">
              <Bot className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                  {socialAIVenture.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-status-beta/30 bg-status-beta/10 px-2.5 py-0.5 text-xs font-semibold text-status-beta">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-beta opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-status-beta" />
                  </span>
                  <span>{socialAIVenture.statusLabel}</span>
                </span>
                <span className="rounded-md border border-border-subtle bg-surface-nested px-2 py-0.5 text-xs font-mono font-medium text-text-muted">
                  Personal Venture
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm font-medium text-accent-sky">
                Founder & Lead Architect
              </p>
            </div>
          </div>

          {/* Quick Ask CTA */}
          <button
            type="button"
            onClick={() => handleAsk("What is Social AI?")}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border-interactive bg-surface-nested px-4 py-2 text-xs sm:text-sm font-medium text-text-primary transition-all hover:border-accent-sky/50 hover:bg-surface-interactive hover:text-accent-sky active:scale-95"
          >
            <MessageSquareText className="h-4 w-4 text-accent-sky" />
            <span>Ask in conversation</span>
          </button>
        </div>

        {/* Core Value Proposition */}
        <div className="mt-6 sm:mt-8">
          <p className="text-lg sm:text-xl font-semibold text-text-primary leading-snug">
            {socialAIVenture.tagline}
          </p>
          <p className="mt-2.5 max-w-3xl text-sm sm:text-base text-text-secondary leading-relaxed">
            {socialAIVenture.summary}
          </p>
        </div>

        {/* Connected Channels Row */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
            Connected Channels:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
              <Linkedin className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/20 bg-sky-500/10 px-2.5 py-1 text-xs font-medium text-sky-600 dark:text-sky-400">
              <Facebook className="h-3.5 w-3.5" />
              <span>Facebook Pages</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-500/20 bg-slate-500/10 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
              <Twitter className="h-3.5 w-3.5" />
              <span>X / Twitter</span>
            </span>
          </div>
        </div>

        {/* Conceptual Product Workflow Architecture (No fake mockups) */}
        <div className="mt-8 pt-8 border-t border-border-subtle">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Workflow className="h-4 w-4 text-accent-sky" />
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-text-primary">
                Product Workflow Architecture
              </h4>
            </div>
            <span className="text-xs text-text-muted hidden sm:inline-block">
              Interactive 5-stage pipeline
            </span>
          </div>

          {/* Workflow Step Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {socialAIVenture.workflowSteps?.map((step, idx) => {
              const Icon = workflowIcons[idx] || Workflow;
              const isActive = activeWorkflowStep === idx;
              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setActiveWorkflowStep(idx)}
                  className={`group relative flex flex-col text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? "border-accent-sky bg-accent-soft text-text-primary shadow-sm ring-1 ring-accent-sky/30"
                      : "border-border-interactive bg-surface-nested text-text-muted hover:border-border-interactive/80 hover:text-text-primary"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-accent-sky">
                      {step.step}
                    </span>
                    <Icon className={`h-4 w-4 transition-colors ${isActive ? "text-accent-sky" : "text-text-muted group-hover:text-text-primary"}`} />
                  </div>
                  <span className="mt-2 text-xs font-bold leading-tight line-clamp-1">
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Step Detail Callout */}
          {socialAIVenture.workflowSteps && (
            <div className="mt-3.5 rounded-2xl border border-border-interactive bg-surface-nested p-4 sm:p-5 flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-sky">
                {(() => {
                  const ActiveIcon = workflowIcons[activeWorkflowStep] || Workflow;
                  return <ActiveIcon className="h-4 w-4" />;
                })()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-accent-sky">
                    Stage {socialAIVenture.workflowSteps[activeWorkflowStep].step}
                  </span>
                  <span className="text-border-interactive">•</span>
                  <h5 className="text-sm font-bold text-text-primary">
                    {socialAIVenture.workflowSteps[activeWorkflowStep].title}
                  </h5>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {socialAIVenture.workflowSteps[activeWorkflowStep].description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Capabilities Grid */}
        <div className="mt-8 pt-8 border-t border-border-subtle">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-4">
            Core Architecture & Capabilities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {socialAIVenture.capabilities.map((cap) => (
              <div
                key={cap}
                className="flex items-start gap-2.5 rounded-xl border border-border-subtle bg-surface-nested p-3 text-xs leading-relaxed text-text-secondary"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-status-beta mt-0.5" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Status & Public Launch Handling (Single Source of Truth) */}
        <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Clock className="h-3.5 w-3.5 text-status-beta" />
            <span>
              Private Beta access cohort active. Public access links will be enabled upon general availability.
            </span>
          </div>

          {socialAIVenture.publicUrl ? (
            <a
              href={socialAIVenture.publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent-sky px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm transition-all hover:opacity-90 active:scale-95"
            >
              <span>Launch Social AI</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-muted">
              <span>cohort: invite-only</span>
            </span>
          )}
        </div>
      </div>

      {/* Secondary Venture: Support AI (What I'm Building Next) */}
      <div className="mt-8 rounded-3xl border border-border-interactive bg-surface-card p-6 sm:p-8 shadow-sm transition-all duration-300 hover:border-border-interactive/80">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-interactive bg-surface-nested text-accent-sky shadow-sm">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl font-bold tracking-tight text-text-primary">
                  {supportAIVenture.title}
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                  <span>{supportAIVenture.statusLabel}</span>
                </span>
              </div>
              <span className="text-xs text-text-muted">Forward-looking venture exploration</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleAsk("Tell me about what you're building next")}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-accent-sky hover:underline"
          >
            <span>Ask in conversation</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="mt-4">
          <p className="text-base font-semibold text-text-primary">
            {supportAIVenture.tagline}
          </p>
          <p className="mt-1.5 text-sm text-text-secondary leading-relaxed max-w-3xl">
            {supportAIVenture.summary}
          </p>
        </div>

        {/* Potential Channels */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-medium text-text-muted">
            Planned Channels:
          </span>
          {supportAIVenture.channels?.map((ch) => (
            <span
              key={ch}
              className="rounded-lg border border-border-subtle bg-surface-nested px-2.5 py-1 text-xs text-text-secondary"
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Capabilities */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {supportAIVenture.capabilities.map((cap) => (
            <div
              key={cap}
              className="flex items-center gap-2 text-xs text-text-secondary"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-accent-sky" />
              <span>{cap}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
