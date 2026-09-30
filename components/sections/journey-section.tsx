"use client";

import { journeyMilestones } from "@/data/journey";
import {
  Milestone,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Building2,
  Rocket,
  Compass,
} from "lucide-react";

interface JourneySectionProps {
  onAskInConversation?: (query: string) => void;
}

export function JourneySection({ onAskInConversation }: JourneySectionProps) {
  const handleAsk = (milestoneTitle: string) => {
    const query = `Tell me about your transition into ${milestoneTitle}`;
    if (onAskInConversation) {
      onAskInConversation(query);
    } else {
      const el = document.getElementById("conversation");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="journey" className="mt-24 sm:mt-32 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col items-start md:items-center md:text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-sky/30 bg-accent-soft px-3.5 py-1 text-xs font-mono font-medium text-accent-sky">
          <Milestone className="h-3.5 w-3.5" />
          <span>Capability Evolution (2015 – Present)</span>
        </div>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          Builder Journey
        </h2>
        <p className="mt-3.5 text-base sm:text-lg text-text-secondary leading-relaxed">
          Not a static résumé, but a clear evolution of technical responsibility — progressing from web foundations to plugin systems, platform ecosystems, leadership, and venture building.
        </p>
      </div>

      {/* Timeline Flow */}
      <div className="mt-12 lg:mt-16 max-w-4xl mx-auto relative">
        {/* Continuous Center-Left Line */}
        <div className="absolute left-4 sm:left-6 top-3 bottom-3 w-0.5 bg-border-interactive -z-0" />

        <div className="space-y-8 sm:space-y-10">
          {journeyMilestones.map((milestone, idx) => {
            const isCurrent = idx >= journeyMilestones.length - 2;

            return (
              <div
                key={milestone.id}
                className="relative flex items-start gap-4 sm:gap-6 group"
              >
                {/* Timeline Node Bullet */}
                <div
                  className={`relative z-10 flex h-8 w-8 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${
                    isCurrent
                      ? "border-accent-sky bg-accent-soft text-accent-sky shadow-md ring-2 ring-accent-sky/20"
                      : "border-border-interactive bg-surface-card text-text-muted group-hover:border-accent-sky/50 group-hover:text-text-primary"
                  }`}
                >
                  {idx === journeyMilestones.length - 1 ? (
                    <Rocket className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : idx === journeyMilestones.length - 2 ? (
                    <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  )}
                </div>

                {/* Milestone Content Card */}
                <div className="flex-1 rounded-3xl border border-border-interactive bg-surface-card p-5 sm:p-7 shadow-sm transition-all duration-300 hover:border-accent-sky/40 hover:shadow-md">
                  {/* Era Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-3.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-accent-sky">
                        {milestone.yearPeriod}
                      </span>
                      <span className="text-border-subtle">•</span>
                      <span className="text-xs font-mono font-medium text-text-muted">
                        {milestone.stageName}
                      </span>
                    </div>

                    {milestone.organization && (
                      <span className="rounded-md border border-border-interactive bg-surface-nested px-2.5 py-0.5 text-xs font-mono font-semibold text-text-primary">
                        {milestone.organization}
                      </span>
                    )}
                  </div>

                  {/* Title & Context */}
                  <div className="mt-3.5">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-text-primary">
                      {milestone.roleTitle}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {milestone.context}
                    </p>
                  </div>

                  {/* Evolution Shift Highlight */}
                  <div className="mt-4 rounded-xl border border-accent-sky/20 bg-accent-soft/40 p-3 sm:p-3.5 flex items-start gap-2.5">
                    <Sparkles className="h-4 w-4 text-accent-sky shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent-sky">
                        Key Architectural Shift:
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-text-primary mt-0.5">
                        {milestone.evolutionShift}
                      </p>
                    </div>
                  </div>

                  {/* Tech stack row */}
                  <div className="mt-4 pt-3.5 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {milestone.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border-subtle bg-surface-nested px-2 py-0.5 text-[11px] font-mono text-text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAsk(milestone.stageName)}
                      className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-accent-sky hover:underline"
                    >
                      <span>Ask about this period</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
