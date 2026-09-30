"use client";

import { useState } from "react";
import { pipelineStages } from "@/data/pipeline";
import {
  GitFork,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  PackageCheck,
  ShieldAlert,
  Lightbulb,
  MessageSquareText,
  Workflow,
} from "lucide-react";

interface PipelineSectionProps {
  onAskInConversation?: (query: string) => void;
}

export function PipelineSection({ onAskInConversation }: PipelineSectionProps) {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const currentStage = pipelineStages[activeStageIndex];

  const handleNext = () => {
    setActiveStageIndex((prev) => (prev + 1) % pipelineStages.length);
  };

  const handlePrev = () => {
    setActiveStageIndex((prev) => (prev - 1 + pipelineStages.length) % pipelineStages.length);
  };

  const handleAsk = (stageTitle: string) => {
    const query = `Tell me about your ${stageTitle} process`;
    if (onAskInConversation) {
      onAskInConversation(query);
    } else {
      const el = document.getElementById("conversation");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="how-i-build" className="mt-24 sm:mt-32 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col items-start md:items-center md:text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-mono font-medium text-purple-600 dark:text-purple-400">
          <GitFork className="h-3.5 w-3.5" />
          <span>Product Engineering Pipeline</span>
        </div>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          How I Build
        </h2>
        <p className="mt-3.5 text-base sm:text-lg text-text-secondary leading-relaxed">
          Turning ideas into resilient software through a disciplined 8-stage engineering process — reducing risk early, modeling clean boundaries, and executing with craft.
        </p>
      </div>

      {/* Interactive Desktop Stage Navigator (8 Stages) */}
      <div className="mt-12 lg:mt-16 rounded-3xl border border-border-interactive bg-surface-card p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5">
        {/* Horizontal Stepper (Desktop/Tablet) */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-8 gap-2 border-b border-border-subtle pb-6">
          {pipelineStages.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStageIndex(idx)}
                className={`group flex flex-col items-start p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? "border-purple-500/60 bg-purple-500/10 shadow-sm ring-1 ring-purple-500/30"
                    : "border-border-interactive bg-surface-nested hover:border-purple-500/40 hover:bg-surface-card"
                }`}
              >
                <span
                  className={`text-xs font-mono font-bold transition-colors ${
                    isActive ? "text-purple-600 dark:text-purple-400" : "text-text-muted group-hover:text-purple-500"
                  }`}
                >
                  {stage.stepNumber}
                </span>
                <span
                  className={`mt-1.5 text-xs font-bold leading-tight line-clamp-2 transition-colors ${
                    isActive ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"
                  }`}
                >
                  {stage.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile Horizontal Scrollable Segmented Track */}
        <div className="flex md:hidden items-center justify-between gap-3 border-b border-border-subtle pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
              Stage {currentStage.stepNumber} of 08
            </span>
            <span className="text-border-subtle">•</span>
            <span className="text-xs font-bold text-text-primary truncate max-w-[170px]">
              {currentStage.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Stage"
              className="p-1.5 rounded-lg border border-border-interactive bg-surface-nested text-text-secondary hover:text-text-primary active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Stage"
              className="p-1.5 rounded-lg border border-border-interactive bg-surface-nested text-text-secondary hover:text-text-primary active:scale-95"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Active Stage Detail Showcase */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-sm font-bold border border-purple-500/30">
                  {currentStage.stepNumber}
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                    {currentStage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                    {currentStage.shortDesc}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleAsk(currentStage.title)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border-interactive bg-surface-nested px-3.5 py-1.5 text-xs font-medium text-text-primary transition-all hover:border-purple-500/50 hover:bg-surface-interactive hover:text-purple-600 dark:hover:text-purple-400 active:scale-95"
              >
                <MessageSquareText className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                <span>Ask about this stage</span>
              </button>
            </div>

            {/* Questions, Deliverables, & Risk Avoidance Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Question Answered */}
              <div className="rounded-2xl border border-border-interactive bg-surface-nested p-4.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-accent-sky mb-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>Core Question</span>
                </div>
                <p className="text-sm font-medium text-text-primary leading-relaxed">
                  &ldquo;{currentStage.questionAnswered}&rdquo;
                </p>
              </div>

              {/* Deliverable */}
              <div className="rounded-2xl border border-border-interactive bg-surface-nested p-4.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                  <PackageCheck className="h-4 w-4" />
                  <span>Key Deliverable</span>
                </div>
                <p className="text-sm font-medium text-text-primary leading-relaxed">
                  {currentStage.deliverable}
                </p>
              </div>
            </div>

            {/* Common Risks Avoided */}
            {currentStage.commonRisksAvoided && (
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1.5">
                  <ShieldAlert className="h-4 w-4" />
                  <span>Mistakes & Pitfalls Prevented</span>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {currentStage.commonRisksAvoided}
                </p>
              </div>
            )}
          </div>

          {/* Side Context & Engineering Philosophy (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-border-interactive bg-surface-nested p-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
                <Lightbulb className="h-4 w-4" />
                <span>Guiding Mindset</span>
              </div>
              <p className="text-xs sm:text-sm font-medium italic text-text-primary leading-relaxed">
                &ldquo;{currentStage.keyMindset}&rdquo;
              </p>
            </div>

            {currentStage.realContext && (
              <div className="rounded-2xl border border-border-interactive bg-surface-nested p-5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-accent-sky mb-2">
                  <Workflow className="h-4 w-4" />
                  <span>Applied Reality</span>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {currentStage.realContext}
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border-interactive bg-surface-card py-2 text-xs font-medium text-text-secondary hover:text-text-primary hover:border-border-interactive/80 transition-all cursor-pointer active:scale-95"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-purple-500/40 bg-purple-500/10 py-2 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 transition-all cursor-pointer active:scale-95"
              >
                <span>Next Stage</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
