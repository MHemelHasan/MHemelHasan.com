"use client";

import { useState } from "react";
import { pipelineStages } from "@/data/pipeline";
import { GitFork, ArrowRight, Layers, Bot, Compass, Check } from "lucide-react";
import { PromptSuggestion } from "@/types/conversation";

interface PipelineResponseProps {
  onSelectPrompt?: (prompt: PromptSuggestion) => void;
  onNavigateSection?: (anchor: string) => void;
}

export function PipelineResponse({ onSelectPrompt, onNavigateSection }: PipelineResponseProps) {
  const [activeStageId, setActiveStageId] = useState(pipelineStages[0].id);

  const activeStage =
    pipelineStages.find((s) => s.id === activeStageId) || pipelineStages[0];

  return (
    <div className="space-y-5 text-text-primary">
      {/* Level 1: Conversational Prose Introduction */}
      <p className="text-sm sm:text-base leading-relaxed text-text-primary">
        My process usually starts well before code. I first try to deeply understand the product problem, platform boundaries, and data model before committing to system architecture or writing backend services.
      </p>

      {/* Level 2: Interactive 8-Stage Methodology Scrubber */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span className="font-mono uppercase tracking-wider text-[11px]">
            8-Stage Production Engineering Lifecycle:
          </span>
          <span className="font-mono text-[11px] text-accent-sky font-semibold">
            Stage {activeStage.stepNumber} of 8
          </span>
        </div>

        {/* Horizontal Scrubber */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
          {pipelineStages.map((stage) => {
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStageId(stage.id)}
                className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "border-accent-sky/70 bg-surface-interactive text-text-primary shadow-sm ring-1 ring-accent-sky/40"
                    : "border-border-subtle bg-surface-card text-text-secondary hover:border-border-interactive hover:text-text-primary"
                }`}
              >
                <span className="font-mono text-[10px] text-accent-sky font-bold">
                  {stage.stepNumber}
                </span>
                <span>{stage.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Highlight Card */}
        <div className="rounded-2xl border border-border-interactive bg-surface-card p-4 sm:p-5 space-y-3 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-accent-sky uppercase">
                Stage {activeStage.stepNumber}
              </span>
              <h4 className="text-base font-bold text-text-primary">{activeStage.title}</h4>
            </div>
            <span className="rounded-full border border-border-subtle bg-surface-nested px-2.5 py-0.5 text-xs text-text-secondary">
              Active Focus
            </span>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted block">
              Core Technical Question:
            </span>
            <p className="text-xs sm:text-sm text-text-primary font-medium leading-relaxed italic">
              &ldquo;{activeStage.questionAnswered}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 pt-1 border-t border-border-subtle text-xs">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted block">
                Deliverable:
              </span>
              <span className="text-text-secondary font-mono">{activeStage.deliverable}</span>
            </div>

            {activeStage.commonRisksAvoided && activeStage.commonRisksAvoided[0] && (
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted block">
                  Risk Prevented:
                </span>
                <span className="text-text-secondary">{activeStage.commonRisksAvoided[0]}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contextual Next Prompts & Deep Link */}
      <div className="pt-3 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs">
        {onSelectPrompt && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onSelectPrompt({
                  id: "ask-products",
                  label: "Show me products",
                  iconName: "Layers",
                  targetIntent: "products",
                  sampleQuery: "Show me products you have shipped",
                })
              }
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-interactive bg-surface-card px-3 py-1 text-text-secondary hover:border-accent-sky hover:text-accent-sky transition-colors"
            >
              <Layers className="h-3 w-3 text-emerald-500" />
              <span>Show me products →</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onSelectPrompt({
                  id: "ask-social-ai",
                  label: "Social AI architecture",
                  iconName: "Bot",
                  targetIntent: "social_ai",
                  sampleQuery: "Tell me about Social AI",
                })
              }
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-interactive bg-surface-card px-3 py-1 text-text-secondary hover:border-accent-sky hover:text-accent-sky transition-colors"
            >
              <Bot className="h-3 w-3 text-amber-500" />
              <span>Social AI architecture →</span>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => onNavigateSection?.("#how-i-build")}
          className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-accent-sky hover:underline ml-auto"
        >
          <span>View full methodology section below</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
