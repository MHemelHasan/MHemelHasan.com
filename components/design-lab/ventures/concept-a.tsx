"use client";

import { useState } from "react";
import { socialAIVenture, supportAIVenture } from "@/data/ventures";
import {
  ArrowRight,
  MessageSquareText,
  Compass,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Radio,
  Share2,
} from "lucide-react";

interface ConceptProps {
  onAskInConversation?: (query: string) => void;
}

export function ConceptA({ onAskInConversation }: ConceptProps) {
  const [supportExpanded, setSupportExpanded] = useState(false);

  const handleAsk = (query: string) => {
    if (onAskInConversation) {
      onAskInConversation(query);
    } else {
      const el = document.getElementById("conversation");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full space-y-16">
      {/* 
        CONCEPT A: PRODUCT STUDIO / PROOF FIRST
        Heroic Product Specimen Anchor with Integrated Capabilities & Provenance
      */}
      <div className="relative">
        {/* Studio Specimen Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold tracking-widest text-accent-sky uppercase">
              STUDIO SPECIMEN 01 // AUTONOMOUS AI SAAS
            </span>
            <span className="text-border-interactive hidden sm:inline">|</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-status-beta/30 bg-status-beta/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-status-beta">
              <span className="h-1.5 w-1.5 rounded-full bg-status-beta animate-pulse" />
              {socialAIVenture.statusLabel}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-text-muted font-mono">
            <span>Invite-Only Access Cohort</span>
            <span className="text-border-interactive">•</span>
            <span>No Public Endpoint</span>
          </div>
        </div>

        {/* 12-Column Studio Composition */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Product Statement & Architectural Provenance (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono font-medium text-text-muted">
                  Personal Venture • Flagship
                </span>
                <h3 className="mt-1 text-4xl sm:text-5xl font-black tracking-tight text-text-primary">
                  {socialAIVenture.title}
                </h3>
              </div>

              <p className="text-lg sm:text-xl font-medium text-text-primary/90 leading-snug">
                {socialAIVenture.tagline}
              </p>

              <p className="text-base text-text-secondary leading-relaxed">
                {socialAIVenture.summary}
              </p>
            </div>

            {/* Founder Architectural Provenance */}
            <div className="rounded-xl border border-border-interactive/60 bg-surface-nested/50 p-4 sm:p-5">
              <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-2">
                <span>FOUNDER PROVENANCE</span>
                <span className="text-accent-sky font-semibold">100% INDEPENDENT</span>
              </div>
              <p className="text-sm text-text-primary font-medium">
                Conceived, architected, and engineered by{" "}
                <span className="font-semibold text-text-primary">M Hemel Hasan</span> as
                Founder & Lead Architect.
              </p>
              <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">
                Engineered independently outside commercial client engagements to advance multi-channel intelligence systems.
              </p>
            </div>

            {/* Verified Network Endpoints */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                  Verified Dispatch Conduits:
                </span>
                <span className="text-xs font-mono text-status-live flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-status-live" />
                  3 Active Integrations
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["LinkedIn", "Facebook Pages", "X / Twitter"].map((platform) => (
                  <div
                    key={platform}
                    className="flex flex-col items-center justify-center p-3 rounded-lg border border-border-subtle bg-surface-card text-center"
                  >
                    <span className="text-xs font-semibold text-text-primary">{platform}</span>
                    <span className="text-[11px] font-mono text-text-muted mt-0.5">Direct Conduits</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Trigger */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleAsk("Tell me about your architectural decisions for Social AI")}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-accent-sky/30 bg-accent-soft px-4 py-2.5 text-xs sm:text-sm font-semibold text-accent-sky transition-all hover:bg-accent-sky/15 hover:border-accent-sky/50 active:scale-95"
              >
                <MessageSquareText className="h-4 w-4" />
                <span>Discuss Social AI Architecture in Conversation</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Product Specimen Canvas (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* The Specimen Frame */}
            <div className="relative rounded-2xl border border-border-interactive/80 bg-surface-card shadow-sm overflow-hidden">
              {/* Studio Canvas Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border-subtle bg-surface-nested/40 font-mono text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-border-interactive" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border-interactive" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border-interactive" />
                  </div>
                  <span className="text-text-secondary font-semibold ml-1">
                    SPECIMEN: SOCIAL_AI_CORE_V1
                  </span>
                </div>
                <div className="flex items-center gap-2 text-text-muted">
                  <Radio className="h-3.5 w-3.5 text-status-beta" />
                  <span>RUNTIME: PRIVATE_BETA</span>
                </div>
              </div>

              {/* Specimen Visual Canvas Area */}
              <div className="p-6 sm:p-8 space-y-6 bg-radial-pattern">
                {/* Architectural Blueprint Specimen (Honest Asset Reservation & Telemetry Zone) */}
                <div className="relative rounded-xl border border-dashed border-border-interactive bg-surface-nested/70 p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[260px]">
                  {/* Precision Corner Markings */}
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-text-muted/60">┌ 00.1</div>
                  <div className="absolute top-2 right-2 text-[10px] font-mono text-text-muted/60">00.2 ┐</div>
                  <div className="absolute bottom-2 left-2 text-[10px] font-mono text-text-muted/60">└ 00.3</div>
                  <div className="absolute bottom-2 right-2 text-[10px] font-mono text-text-muted/60">00.4 ┘</div>

                  <div className="h-12 w-12 rounded-xl bg-surface-card border border-border-interactive flex items-center justify-center mb-3 text-accent-sky shadow-xs">
                    <Share2 className="h-6 w-6" />
                  </div>

                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-sky">
                    Production Interface Specimen
                  </span>
                  <h4 className="mt-1 text-base sm:text-lg font-bold text-text-primary">
                    Multi-Channel Intelligence & Scheduling Studio
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-text-secondary max-w-md leading-relaxed">
                    Live production interface capture will be published upon conclusion of the invite-only beta cohort. Real system state currently operates in closed private validation.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] text-text-muted">
                    <span className="rounded bg-surface-card px-2 py-0.5 border border-border-subtle">
                      API-Compatible LLM Ingestion
                    </span>
                    <span className="text-border-interactive">•</span>
                    <span className="rounded bg-surface-card px-2 py-0.5 border border-border-subtle">
                      RSS & Competitor Telemetry
                    </span>
                    <span className="text-border-interactive">•</span>
                    <span className="rounded bg-surface-card px-2 py-0.5 border border-border-subtle">
                      Direct OAuth Publishing
                    </span>
                  </div>
                </div>

                {/* Sub-specimen: Capability Matrix Pillars */}
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-text-muted border-b border-border-subtle pb-2">
                    <span className="font-bold uppercase tracking-wider">
                      Verified Functional Architecture
                    </span>
                    <span>6 CORE SYSTEMS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {socialAIVenture.capabilities.map((cap, idx) => (
                      <div
                        key={cap}
                        className="flex items-start gap-2.5 p-2.5 rounded-lg border border-border-subtle bg-surface-card/60 text-xs text-text-secondary"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-sky mt-0.5" />
                        <span className="leading-snug">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specimen Frame Footer */}
              <div className="px-5 py-3 border-t border-border-subtle bg-surface-nested/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-text-muted">
                <span>SYSTEM ID: SA-PRV-2026</span>
                <span className="flex items-center gap-1.5 text-text-secondary">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent-sky" />
                  Verified Production Scope
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        SUPPORT AI: Compact Studio R&D Horizon
        Clearly Secondary, Quiet Continuation
      */}
      <div className="border-t border-border-subtle pt-8">
        <div className="rounded-xl border border-border-subtle bg-surface-nested/40 p-5 sm:p-6 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-bold tracking-wider text-text-muted uppercase">
                STUDIO R&D HORIZON
              </span>
              <span className="text-border-interactive hidden sm:inline">•</span>
              <h4 className="text-base font-bold text-text-primary">
                {supportAIVenture.title}
              </h4>
              <span className="rounded-full border border-purple-500/25 bg-purple-500/10 px-2.5 py-0.5 text-xs font-mono font-medium text-purple-600 dark:text-purple-400">
                {supportAIVenture.statusLabel}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSupportExpanded(!supportExpanded)}
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-mono font-semibold text-text-secondary hover:text-text-primary"
              >
                <span>{supportExpanded ? "Collapse Brief" : "Inspect Brief"}</span>
                <ChevronRight
                  className={`h-3.5 w-3.5 transition-transform ${
                    supportExpanded ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          <p className="mt-2 text-sm text-text-secondary max-w-3xl leading-relaxed">
            {supportAIVenture.summary}
          </p>

          {/* Expandable Horizon Details */}
          {supportExpanded && (
            <div className="mt-4 pt-4 border-t border-border-subtle grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-mono font-bold text-text-muted uppercase tracking-wider block mb-2">
                  Target Conversation Gateways
                </span>
                <div className="flex flex-wrap gap-2">
                  {supportAIVenture.channels?.map((ch) => (
                    <span
                      key={ch}
                      className="px-2.5 py-1 rounded bg-surface-card border border-border-subtle text-text-primary font-medium"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono font-bold text-text-muted uppercase tracking-wider block mb-2">
                  Core Architectural Hypotheses
                </span>
                <ul className="space-y-1.5 text-text-secondary">
                  {supportAIVenture.capabilities.map((cap) => (
                    <li key={cap} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-accent-sky" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
