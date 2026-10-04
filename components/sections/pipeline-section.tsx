"use client";

import { useState } from "react";
import { ArrowDown, MessageSquareText } from "lucide-react";
import { pipelineStageHomepageCopy, pipelineStages } from "@/data/pipeline";

interface PipelineSectionProps {
  onAskInConversation?: (query: string) => void;
}

export function PipelineSection({ onAskInConversation }: PipelineSectionProps) {
  const [activeStageId, setActiveStageId] = useState(pipelineStages[0]?.id ?? "");
  const activeIndex = Math.max(0, pipelineStages.findIndex((stage) => stage.id === activeStageId));
  const activeStage = pipelineStages[activeIndex] ?? pipelineStages[0];

  if (!activeStage) return null;

  const handleAsk = (query: string) => {
    if (onAskInConversation) {
      onAskInConversation(query);
      return;
    }

    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="how-i-build" className="scroll-mt-24 border-y border-border-subtle bg-surface-card">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <header className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-accent-sky">The operating method behind the work</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-text-primary sm:text-5xl lg:text-6xl">
              How I Build
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pt-1">
            <p className="max-w-3xl text-xl leading-8 text-text-primary sm:text-2xl sm:leading-9">
              Product decisions and engineering decisions move together, from platform constraints to production feedback.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary">
              Eight stages reduce risk early, define clear boundaries, and connect launch to feedback.
            </p>
          </div>
        </header>

        <div className="mt-12 border-t-2 border-text-primary pt-8 sm:mt-16 lg:grid lg:grid-cols-12 lg:gap-14 lg:pt-10">
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <h3 className="text-lg font-semibold text-text-primary">Decision-to-delivery sequence</h3>
              <span className="font-mono text-xs text-text-muted">08 stages</span>
            </div>

            <div className="h-1 bg-surface-nested" aria-hidden="true">
              <div
                className="h-full bg-accent-sky"
                style={{ width: `${((activeIndex + 1) / pipelineStages.length) * 100}%` }}
              />
            </div>

            <div role="group" aria-label="Product engineering stages">
              {pipelineStages.map((stage) => {
                const isActive = stage.id === activeStage.id;

                return (
                  <button
                    key={stage.id}
                    id={`pipeline-stage-${stage.id}`}
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="pipeline-stage-detail"
                    onClick={() => setActiveStageId(stage.id)}
                    className={`grid min-h-14 w-full grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-border-subtle text-left transition-colors ${
                      isActive ? "bg-accent-soft px-4" : "hover:bg-surface-nested/70"
                    }`}
                  >
                    <span className="font-mono text-xs text-accent-sky">{stage.stepNumber}</span>
                    <span className="text-sm font-semibold text-text-primary sm:text-base">{stage.title}</span>
                    <span
                      className={`h-2.5 w-2.5 border border-accent-sky ${isActive ? "bg-accent-sky" : "bg-transparent"}`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <article
            id="pipeline-stage-detail"
            role="region"
            aria-labelledby={`pipeline-stage-${activeStage.id}`}
            aria-live="polite"
            className="mt-10 lg:col-span-7 lg:mt-0"
          >
            <div className="flex items-start justify-between gap-5 border-b border-border-subtle pb-6">
              <div>
                <p className="font-mono text-xs text-accent-sky">Stage {activeStage.stepNumber} of 08</p>
                <h3 className="mt-3 text-3xl font-semibold leading-tight text-text-primary sm:text-4xl">{activeStage.title}</h3>
                <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">{activeStage.shortDesc}</p>
              </div>
              <span className="hidden font-mono text-6xl font-medium leading-none text-accent-sky/15 sm:block" aria-hidden="true">
                {activeStage.stepNumber}
              </span>
            </div>

            <div className="border-b border-border-subtle py-7">
              <p className="text-sm font-semibold text-accent-sky">The question this stage answers</p>
              <p className="mt-3 max-w-3xl text-2xl font-medium leading-9 text-text-primary">
                {activeStage.questionAnswered}
              </p>
            </div>

            <div className="grid border-b border-border-subtle sm:grid-cols-2">
              <div className="py-7 sm:pr-8">
                <h4 className="text-sm font-semibold text-text-primary">Working deliverable</h4>
                <p className="mt-3 text-base font-medium leading-7 text-text-primary">{activeStage.deliverable}</p>
              </div>
              <div className="border-t border-border-subtle py-7 sm:border-l sm:border-t-0 sm:pl-8">
                <h4 className="text-sm font-semibold text-text-primary">Applied reality</h4>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {pipelineStageHomepageCopy[activeStage.id]?.appliedReality ?? activeStage.realContext}
                </p>
              </div>
            </div>

            <div className="grid gap-6 border-b border-border-subtle py-7 sm:grid-cols-[0.78fr_1.22fr] sm:gap-8">
              <div className="border-l-2 border-accent-sky pl-4">
                <h4 className="text-sm font-semibold text-text-primary">Guiding mindset</h4>
                <p className="mt-2 text-base font-medium leading-7 text-text-primary">{activeStage.keyMindset}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-primary">Risk reduced before it compounds</h4>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {pipelineStageHomepageCopy[activeStage.id]?.riskReduced ?? activeStage.commonRisksAvoided}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleAsk(`Tell me about your ${activeStage.title} process`)}
              className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-accent-sky text-sm font-semibold text-accent-sky transition-colors hover:text-text-primary"
            >
              <MessageSquareText className="h-4 w-4" aria-hidden="true" />
              Ask about this stage
            </button>
          </article>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-border-interactive pt-7 sm:flex-row sm:items-end sm:justify-between lg:mt-20">
          <div>
            <p className="text-sm font-semibold text-accent-sky">Method, then depth</p>
            <p className="mt-2 max-w-2xl text-lg leading-7 text-text-primary">
              The operating sequence is supported by the architecture, systems, and platform engineering below.
            </p>
          </div>
          <a
            href="#engineering"
            className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-text-primary transition-colors hover:text-accent-sky sm:self-auto"
          >
            Continue to Engineering Depth
            <ArrowDown className="h-4 w-4 text-accent-sky" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
