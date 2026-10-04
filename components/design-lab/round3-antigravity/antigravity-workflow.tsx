"use client";

import { useState } from "react";
import { socialAIVenture } from "@/data/ventures";
import {
  Compass,
  Sliders,
  Sparkles,
  Calendar,
  Send,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

const stepIcons = [Compass, Sliders, Sparkles, Calendar, Send];

const technicalTags = [
  ["RSS Aggregation", "Competitor Monitoring", "Topic Discovery"],
  ["Tone Guardrails", "Writing Persona", "Vocabulary Rules"],
  ["AI Model Connectivity", "Prompt Orchestration", "Platform Formatting"],
  ["Draft Queuing", "Pacing Logic", "Visual Calendar"],
  ["LinkedIn API", "Facebook Pages API", "X / Twitter API"],
];

export function AntigravityWorkflow() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const steps = socialAIVenture.workflowSteps || [];
  const currentStep = steps[activeStepIndex] || steps[0];
  const StepIcon = stepIcons[activeStepIndex] || Compass;

  return (
    <div className="rounded-2xl border border-border-interactive/80 bg-surface-card p-5 sm:p-6 shadow-sm transition-colors">
      {/* Header with conceptual note */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-4">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-sky">
            Software Architecture
          </span>
          <h4 className="text-base sm:text-lg font-bold text-text-primary">
            End-to-End Content Pipeline
          </h4>
        </div>
        <span className="rounded-full border border-border-interactive bg-surface-nested px-2.5 py-1 text-[11px] font-mono text-text-muted">
          Conceptual Architecture
        </span>
      </div>

      {/* Stepper Tabs */}
      <div
        role="tablist"
        aria-label="Social AI Product Workflow Steps"
        className="mt-4 grid grid-cols-5 gap-1.5 sm:gap-2"
      >
        {steps.map((s, idx) => {
          const isActive = idx === activeStepIndex;
          const Icon = stepIcons[idx];
          return (
            <button
              key={s.step}
              type="button"
              role="tab"
              id={`workflow-tab-${idx}`}
              aria-controls={`workflow-panel-${idx}`}
              aria-selected={isActive}
              onClick={() => setActiveStepIndex(idx)}
              className={`group flex flex-col items-center justify-center rounded-xl p-2 sm:p-2.5 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-sky ${
                isActive
                  ? "bg-accent-sky text-white shadow-md shadow-accent-sky/20"
                  : "bg-surface-nested text-text-secondary hover:bg-surface-interactive hover:text-text-primary"
              }`}
            >
              <span className={`text-[10px] sm:text-xs font-mono font-bold ${isActive ? "text-white/80" : "text-text-muted"}`}>
                {s.step}
              </span>
              <Icon className="mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-transform group-hover:scale-110" />
              <span className="mt-1 hidden text-[11px] font-medium sm:block truncate max-w-full px-1">
                {s.title.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Surface */}
      <div
        id={`workflow-panel-${activeStepIndex}`}
        role="tabpanel"
        aria-labelledby={`workflow-tab-${activeStepIndex}`}
        className="mt-5 rounded-xl border border-border-subtle bg-surface-nested/70 p-4 sm:p-5"
      >
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-sky">
            <StepIcon className="h-5 w-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-semibold text-accent-sky">
                Phase {currentStep.step}
              </span>
              <span className="text-border-interactive">•</span>
              <h5 className="text-base font-bold text-text-primary">
                {currentStep.title}
              </h5>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {currentStep.description}
            </p>

            {/* Technical mechanics tags */}
            <div className="mt-3.5 flex flex-wrap items-center gap-1.5 pt-2 border-t border-border-subtle">
              <span className="text-[11px] font-mono text-text-muted">Mechanisms:</span>
              {(technicalTags[activeStepIndex] || []).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border-interactive/80 bg-surface-card px-2 py-0.5 text-[11px] font-medium text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Verified Data Integrity Footnote */}
      <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
        <div className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-accent-sky" />
          <span>Grounded in verified product capabilities</span>
        </div>
        <span className="font-mono text-[11px]">Private Beta v0.9</span>
      </div>
    </div>
  );
}
