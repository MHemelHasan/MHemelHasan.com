"use client";

import { socialAIVenture, supportAIVenture } from "@/data/ventures";
import { ArrowRight, MessageSquareText } from "lucide-react";

interface ConceptProps {
  onAskInConversation?: (query: string) => void;
}

export function ConceptB({ onAskInConversation }: ConceptProps) {
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
        CONCEPT B: FOUNDER EDITORIAL STORY
        High-typographic authority, asymmetric editorial flow, proof woven into conviction narrative
      */}
      <article className="relative">
        {/* Editorial Masthead / Header Bar */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border-interactive pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-text-muted">
              Chapter 01 // Flagship Venture
            </span>
            <span className="text-border-interactive">•</span>
            <span className="font-mono text-xs font-semibold text-status-beta">
              Status: Private Beta
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-text-muted">
            <span>Written & Built by M Hemel Hasan</span>
            <span className="text-border-interactive">•</span>
            <span className="text-text-primary font-medium">Founder & Lead Architect</span>
          </div>
        </div>

        {/* Lead Editorial Thesis Statement */}
        <div className="mt-8 max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-sky font-bold block mb-2">
            The Product Thesis
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
            Most social tools are automated queues. I am building a closed-loop intelligence system.
          </h3>
          <p className="mt-4 text-lg sm:text-xl text-text-secondary leading-relaxed font-normal">
            {socialAIVenture.tagline}
          </p>
        </div>

        {/* Asymmetrical 4-Chapter Editorial Composition */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Chapters I & II (6 cols) */}
          <div className="lg:col-span-6 space-y-10">
            {/* Chapter I: The Problem Space */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                <span className="text-accent-sky">I.</span>
                <span>The Problem Space</span>
              </div>
              <h4 className="text-xl font-bold text-text-primary tracking-tight">
                Scattered research and fragmented distribution.
              </h4>
              <p className="text-base text-text-secondary leading-relaxed">
                Founders and content teams suffer from broken context. Research happens in RSS feeds and social feeds; brainstorming happens in disconnected scratchpads; drafting happens in LLM playgrounds; scheduling happens in rigid third-party queues.
              </p>
              <p className="text-base text-text-secondary leading-relaxed">
                Every hop loses context and degrades brand voice. Social AI unifies the intelligence loop into a single coherent system.
              </p>
            </section>

            {/* Chapter II: What I Am Building */}
            <section className="space-y-3 pt-6 border-t border-border-subtle">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                <span className="text-accent-sky">II.</span>
                <span>The Architecture</span>
              </div>
              <h4 className="text-xl font-bold text-text-primary tracking-tight">
                {socialAIVenture.title} — Autonomous Content Intelligence
              </h4>
              <p className="text-base text-text-secondary leading-relaxed">
                {socialAIVenture.summary}
              </p>
              <div className="pt-2">
                <div className="rounded-lg border-l-2 border-accent-sky bg-surface-nested/60 px-4 py-3 text-sm text-text-primary">
                  <span className="font-semibold block mb-0.5">Direct Model Connectivity:</span>
                  <span className="text-text-secondary text-xs sm:text-sm">
                    Rather than relying on locked-down third-party wrappers, the engine features direct connectivity with compatible AI model APIs, giving operators full control over inference and style calibration.
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Chapters III & IV + Verified Scope (6 cols) */}
          <div className="lg:col-span-6 space-y-10">
            {/* Chapter III: How It Behaves (Verified Capabilities as Narrative Evidence) */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                <span className="text-accent-sky">III.</span>
                <span>System Behavior & Operational Proof</span>
              </div>
              <h4 className="text-xl font-bold text-text-primary tracking-tight">
                Verified System Capabilities
              </h4>

              <div className="space-y-3.5 divide-y divide-border-subtle">
                <div className="pt-3 first:pt-0">
                  <div className="flex items-baseline justify-between text-xs font-mono mb-1">
                    <span className="font-bold text-text-primary">01 / INTELLIGENCE & RESEARCH</span>
                    <span className="text-text-muted">FEED INGESTION</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Topic brainstorming supported by RSS-based research sources and public competitor content monitoring to identify proven thematic resonance.
                  </p>
                </div>

                <div className="pt-3">
                  <div className="flex items-baseline justify-between text-xs font-mono mb-1">
                    <span className="font-bold text-text-primary">02 / BRAND VOICE ENGINE</span>
                    <span className="text-text-muted">PERSONA SYNTHESIS</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Custom brand voice and writing style configuration with tone calibration, guardrails, and platform-tailored post variation.
                  </p>
                </div>

                <div className="pt-3">
                  <div className="flex items-baseline justify-between text-xs font-mono mb-1">
                    <span className="font-bold text-text-primary">03 / ORCHESTRATION & DISPATCH</span>
                    <span className="text-text-muted">MULTI-CHANNEL</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Post drafting, visual scheduling, and automated publishing directly into verified endpoints:{" "}
                    <strong className="text-text-primary font-semibold">LinkedIn</strong>,{" "}
                    <strong className="text-text-primary font-semibold">Facebook Pages</strong>, and{" "}
                    <strong className="text-text-primary font-semibold">X / Twitter</strong>.
                  </p>
                </div>
              </div>
            </section>

            {/* Chapter IV: Current State & Access */}
            <section className="space-y-3 pt-6 border-t border-border-subtle">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                <span className="text-accent-sky">IV.</span>
                <span>Current Horizon</span>
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-text-primary">
                  Private Beta Validation
                </h4>
                <span className="text-xs font-mono text-status-beta font-semibold">
                  Invite-Only Cohort
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Operating in a private beta cohort to rigorously stress-test cross-platform publishing reliability and brand-voice fidelity before general availability.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleAsk("Why did you build Social AI and what are its core capabilities?")}
                  className="inline-flex cursor-pointer items-center gap-2 text-xs sm:text-sm font-semibold text-accent-sky hover:underline"
                >
                  <MessageSquareText className="h-4 w-4" />
                  <span>Discuss founder thesis & architecture in conversation</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* 
          SUPPORT AI: Quiet Editorial Postscript
          Not an equal card, but a calm closing chapter
        */}
        <div className="mt-14 pt-8 border-t border-border-interactive">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
                Postscript // What I&apos;m Exploring Next
              </span>
              <span className="text-border-interactive">•</span>
              <span className="rounded-full border border-purple-500/25 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                {supportAIVenture.statusLabel}
              </span>
            </div>

            <h4 className="text-xl font-bold text-text-primary">
              {supportAIVenture.title} — {supportAIVenture.tagline}
            </h4>

            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              {supportAIVenture.summary}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-text-muted">
              <span>Target Channels:</span>
              <span className="text-text-primary font-medium">WhatsApp</span>
              <span>•</span>
              <span className="text-text-primary font-medium">Facebook Messenger</span>
              <span>•</span>
              <span className="text-text-primary font-medium">Website Live Chat Widget</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
