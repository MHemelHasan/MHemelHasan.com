"use client";

import { useState } from "react";
import { socialAIVenture } from "@/data/ventures";

export function SocialAIWorkflow() {
  const steps = socialAIVenture.workflowSteps ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = steps[activeIndex];

  if (!activeStep) return null;

  return (
    <div className="grid rounded-xl border border-border-subtle bg-[#264AC9] text-white dark:bg-surface-card dark:text-text-primary lg:grid-cols-[0.72fr_2fr]">
      <div className="border-b border-white/20 p-5 sm:p-7 dark:border-border-subtle lg:border-b-0 lg:border-r">
        <p className="text-sm font-medium text-white/95 dark:text-accent-sky">Product workflow</p>
        <h4 className="mt-2 max-w-xs text-2xl font-semibold leading-tight text-white dark:text-text-primary">From research to publishing</h4>
        <p className="mt-3 max-w-sm text-sm leading-6 text-white/90 dark:text-text-secondary">
          A conceptual view of how the product moves from source material to coordinated publishing.
        </p>
      </div>

      <div className="p-5 sm:p-7">
        <div className="grid sm:grid-cols-5" role="group" aria-label="Social AI product workflow">
          {steps.map((step, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={step.step}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveIndex(index)}
                className={`grid min-h-12 grid-cols-[32px_1fr_auto] items-center gap-2 border-b border-white/20 text-left transition-colors hover:bg-white/10 dark:border-border-subtle dark:hover:bg-surface-nested sm:min-h-20 sm:grid-cols-1 sm:content-between sm:border-b-0 sm:border-l sm:px-4 sm:first:border-l-0 ${
                  isActive ? "text-white font-semibold dark:text-text-primary" : "text-white/90 dark:text-text-secondary"
                }`}
              >
                <span className="font-mono text-xs text-white/90 dark:text-accent-sky">{step.step}</span>
                <span className="text-sm font-medium leading-5">{step.title}</span>
                <span className={`h-2 w-2 border border-white dark:border-accent-sky ${isActive ? "bg-white dark:bg-accent-sky" : "bg-transparent"}`} aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <div className="mt-6 border-t border-white/25 pt-5 dark:border-border-subtle" aria-live="polite">
          <p className="text-lg font-semibold text-white dark:text-text-primary">{activeStep.title}</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/95 dark:text-text-secondary">{activeStep.description}</p>
        </div>
      </div>
    </div>
  );
}
