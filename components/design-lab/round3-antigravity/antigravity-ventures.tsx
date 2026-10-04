"use client";

import { socialAIVenture, supportAIVenture } from "@/data/ventures";
import { AntigravityWorkflow } from "./antigravity-workflow";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Linkedin,
  Facebook,
  Twitter,
  MessageSquareText,
  Boxes,
  HelpCircle,
} from "lucide-react";

interface AntigravityVenturesProps {
  onAsk: (query: string) => void;
}

export function AntigravityVentures({ onAsk }: AntigravityVenturesProps) {
  return (
    <section
      id="ventures"
      aria-label="Ventures and Proprietary Products"
      className="relative mx-auto max-w-6xl px-4 pt-4 pb-20 sm:px-6 sm:pb-28 lg:pb-32"
    >
      {/* Section Transition & Header */}
      <div className="border-t border-border-subtle pt-12 sm:pt-16">
        <div className="flex flex-col items-start max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-status-beta/30 bg-status-beta/10 px-3 py-0.5 text-xs font-mono font-medium text-status-beta">
            <Sparkles className="h-3 w-3 text-status-beta" />
            <span>Independent Software Products</span>
          </div>

          <h2 className="mt-3.5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
            What I&apos;m Building
          </h2>

          <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
            Proprietary software conceived, architected, and engineered from the ground up — clearly distinguished from commercial company and client systems.
          </p>
        </div>
      </div>

      {/* FLAGSHIP VENTURE: Social AI */}
      <div className="mt-10 sm:mt-12 rounded-3xl border border-border-interactive/80 bg-surface-card p-6 sm:p-8 lg:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Venture Story, Capabilities & Signals (6 cols) */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Venture Metadata Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-status-beta/15 border border-status-beta/30 px-2.5 py-0.5 text-xs font-mono font-bold text-status-beta">
                {socialAIVenture.statusLabel}
              </span>
              <span className="text-xs font-medium text-text-muted">•</span>
              <span className="text-xs font-mono font-medium text-text-muted">
                {socialAIVenture.ecosystemLabel}
              </span>
              <span className="text-xs font-medium text-text-muted">•</span>
              <span className="text-xs font-semibold text-accent-sky">
                Founder & Lead Architect
              </span>
            </div>

            {/* Title & Tagline */}
            <h3 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
              {socialAIVenture.title}
            </h3>

            <p className="mt-2 text-base sm:text-lg font-medium text-text-secondary">
              {socialAIVenture.tagline}
            </p>

            {/* Narrative Summary */}
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-text-secondary/90">
              {socialAIVenture.summary}
            </p>

            {/* Connected Multi-Channel Ecosystem */}
            <div className="mt-6 border-t border-border-subtle pt-5">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-muted block mb-3">
                Connected Social Channels
              </span>
              <div className="flex flex-wrap gap-2.5">
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-border-interactive bg-surface-nested px-3 py-1.5 text-xs font-medium text-text-primary">
                  <Linkedin className="h-3.5 w-3.5 text-[#0A66C2]" />
                  <span>LinkedIn</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-border-interactive bg-surface-nested px-3 py-1.5 text-xs font-medium text-text-primary">
                  <Facebook className="h-3.5 w-3.5 text-[#1877F2]" />
                  <span>Facebook Pages</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-border-interactive bg-surface-nested px-3 py-1.5 text-xs font-medium text-text-primary">
                  <Twitter className="h-3.5 w-3.5 text-text-primary" />
                  <span>X / Twitter</span>
                </div>
              </div>
            </div>

            {/* Verified Capabilities Checklist */}
            <div className="mt-6 border-t border-border-subtle pt-5">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-muted block mb-3">
                Verified Platform Capabilities
              </span>
              <ul className="space-y-2.5">
                {(socialAIVenture.capabilities || []).map((cap) => (
                  <li key={cap} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
                    <CheckCircle2 className="h-4 w-4 text-accent-sky shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conversational Action Trigger */}
            <div className="mt-8 pt-4">
              <button
                type="button"
                onClick={() => onAsk("Tell me about the technical architecture and features of Social AI")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent-sky hover:text-brand-primary-hover transition-colors group cursor-pointer"
              >
                <MessageSquareText className="h-4 w-4" />
                <span>Ask how Social AI was architected</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Conceptual Workflow (6 cols) */}
          <div className="lg:col-span-6 w-full">
            <AntigravityWorkflow />
          </div>
        </div>
      </div>

      {/* SECONDARY VENTURE: Support AI (Slim Continuation) */}
      <div className="mt-8 rounded-2xl border border-border-subtle bg-surface-card p-5 sm:p-7 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-sky">
              <Boxes className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-sky">
                  {supportAIVenture.statusLabel}
                </span>
                <span className="text-border-interactive">•</span>
                <span className="text-xs font-mono text-text-muted">
                  {supportAIVenture.ecosystemLabel}
                </span>
              </div>
              <h3 className="text-xl font-bold text-text-primary">
                {supportAIVenture.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onAsk("What is the concept and vision behind Support AI?")}
            className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full border border-border-interactive px-3 py-1.5 text-xs font-medium text-text-secondary hover:border-accent-sky/60 hover:text-accent-sky transition-colors cursor-pointer"
          >
            <HelpCircle className="h-3.5 w-3.5 text-accent-sky" />
            <span>Ask about Support AI</span>
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7">
            <p className="text-sm text-text-secondary leading-relaxed">
              {supportAIVenture.summary}
            </p>
          </div>

          <div className="md:col-span-5 flex flex-wrap items-center gap-2 md:justify-end">
            <span className="text-xs font-mono text-text-muted">Channels:</span>
            {(supportAIVenture.channels || []).map((ch) => (
              <span
                key={ch}
                className="rounded-md border border-border-interactive bg-surface-nested px-2.5 py-1 text-xs font-medium text-text-secondary"
              >
                {ch}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
