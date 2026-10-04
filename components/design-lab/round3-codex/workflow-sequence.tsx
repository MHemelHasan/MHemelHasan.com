"use client";

import { useState } from "react";
import { socialAIVenture } from "@/data/ventures";

export function WorkflowSequence() {
  const steps = socialAIVenture.workflowSteps ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = steps[activeIndex];

  if (!activeStep) return null;

  return (
    <div className="flex h-full min-h-[470px] flex-col bg-brand-primary p-6 text-white sm:p-8">
      <div className="flex items-baseline justify-between gap-6 border-b border-white/30 pb-5">
        <h3 className="text-xl font-semibold">Conceptual product workflow</h3>
        <span className="font-mono text-xs text-white/70">{activeStep.step} / 05</span>
      </div>

      <div className="mt-4 flex-1" role="group" aria-label="Social AI workflow steps">
        {steps.map((step, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={step.step}
              id={`workflow-tab-${step.step}`}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveIndex(index)}
              className="group grid min-h-14 w-full grid-cols-[36px_1fr_auto] items-center gap-2 border-b border-white/25 text-left transition-colors hover:bg-white/10 focus-visible:bg-white/10"
            >
              <span className="font-mono text-xs text-white/65">{step.step}</span>
              <span className={`text-sm font-medium ${isActive ? "text-white" : "text-white/75"}`}>
                {step.title}
              </span>
              <span
                className={`h-2 w-2 border border-white transition-colors ${isActive ? "bg-white" : "bg-transparent"}`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      <div
        id={`workflow-panel-${activeStep.step}`}
        aria-live="polite"
        className="mt-8 border-l border-white pl-5"
      >
        <p className="text-lg font-semibold">{activeStep.title}</p>
        <p className="mt-2 max-w-lg text-sm leading-6 text-white/80">{activeStep.description}</p>
      </div>
    </div>
  );
}

