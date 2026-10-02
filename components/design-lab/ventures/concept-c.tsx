"use client";

import { useState } from "react";
import { socialAIVenture, supportAIVenture } from "@/data/ventures";
import {
  ArrowRight,
  MessageSquareText,
  Workflow,
  Radio,
  SlidersHorizontal,
  Layers,
  Sparkles,
  Send,
  Calendar,
  Search,
  CheckCircle2,
} from "lucide-react";

interface ConceptProps {
  onAskInConversation?: (query: string) => void;
}

export function ConceptC({ onAskInConversation }: ConceptProps) {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = socialAIVenture.workflowSteps || [
    {
      step: "01",
      title: "Research & Discovery",
      description:
        "Discover trending industry topics, monitor public competitor content, and aggregate RSS streams.",
    },
    {
      step: "02",
      title: "Brand Voice Engine",
      description:
        "Configure custom tone, writing style, vocabulary guardrails, and persona perspective.",
    },
    {
      step: "03",
      title: "Generation & Drafting",
      description:
        "Generate platform-tailored post variants utilizing direct connectivity with compatible AI model APIs.",
    },
    {
      step: "04",
      title: "Visual Scheduling",
      description:
        "Queue and coordinate upcoming drafts across calendar timelines with automated pacing.",
    },
    {
      step: "05",
      title: "Multi-Channel Publishing",
      description:
        "Automate direct publishing across connected channels: LinkedIn, Facebook Pages, and X / Twitter.",
    },
  ];

  const stageIcons = [Search, SlidersHorizontal, Sparkles, Calendar, Send];

  const handleAsk = (query: string) => {
    if (onAskInConversation) {
      onAskInConversation(query);
    } else {
      const el = document.getElementById("conversation");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveStage((index + 1) % stages.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveStage((index - 1 + stages.length) % stages.length);
    }
  };

  return (
    <div className="w-full space-y-16">
      {/* 
        CONCEPT C: SYSTEMS SHOWCASE / PRODUCT ENGINEERING
        Structured systems canvas, interactive conceptual pipeline, clear technical hierarchy
      */}
      <div className="relative space-y-10">
        {/* Systems Header & Provenance Banner */}
        <div className="rounded-xl border border-border-interactive/80 bg-surface-card p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border-subtle">
            <div>
              <div className="flex items-center gap-2.5 font-mono text-xs text-text-muted mb-2">
                <span className="font-bold text-accent-sky uppercase tracking-wider">
                  SYSTEM SPECIFICATION
                </span>
                <span className="text-border-interactive">•</span>
                <span className="text-status-beta font-semibold">
                  STATUS: {socialAIVenture.statusLabel}
                </span>
                <span className="text-border-interactive hidden sm:inline">•</span>
                <span className="text-text-secondary hidden sm:inline">
                  ROLE: FOUNDER & LEAD ARCHITECT
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
                {socialAIVenture.title}
              </h3>
              <p className="mt-2 text-base sm:text-lg font-medium text-text-primary/90 max-w-3xl leading-snug">
                {socialAIVenture.tagline}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleAsk("Explain the 5-stage content pipeline in Social AI")}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-accent-sky/30 bg-accent-soft px-4 py-2.5 text-xs font-semibold text-accent-sky hover:bg-accent-sky/15 transition-all active:scale-95"
              >
                <MessageSquareText className="h-4 w-4" />
                <span>Inspect System in Conversation</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Systems Telemetry Ribbon */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 rounded-lg bg-surface-nested/60 border border-border-subtle">
              <span className="text-text-muted block mb-1">INFERENCE CONNECTIVITY</span>
              <span className="font-bold text-text-primary">Direct Compatible Model APIs</span>
            </div>
            <div className="p-3 rounded-lg bg-surface-nested/60 border border-border-subtle">
              <span className="text-text-muted block mb-1">NETWORK ENDPOINTS</span>
              <span className="font-bold text-text-primary">LinkedIn • FB Pages • X / Twitter</span>
            </div>
            <div className="p-3 rounded-lg bg-surface-nested/60 border border-border-subtle">
              <span className="text-text-muted block mb-1">OPERATIONAL SCOPE</span>
              <span className="font-bold text-text-primary">Full Autonomous Pipeline</span>
            </div>
          </div>
        </div>

        {/* 
          Conceptual Product Workflow Workbench
          Clearly labeled, interactive, authentic engineering representation
        */}
        <div className="rounded-xl border border-border-interactive/80 bg-surface-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
            <div className="flex items-center gap-2.5">
              <Workflow className="h-5 w-5 text-accent-sky" />
              <div>
                <h4 className="text-base font-bold text-text-primary">
                  5-Stage Content Pipeline
                </h4>
                <p className="text-xs text-text-secondary">
                  Architectural progression from research ingestion to multi-channel dispatch
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-nested px-3 py-1 font-mono text-[11px] font-semibold text-text-muted border border-border-subtle self-start sm:self-auto">
              <Radio className="h-3 w-3 text-status-beta" />
              Conceptual Product Workflow
            </span>
          </div>

          {/* Interactive Pipeline Stepper Ribbon */}
          <div
            role="tablist"
            aria-label="Social AI 5-Stage Content Pipeline"
            className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-3"
          >
            {stages.map((stage, idx) => {
              const Icon = stageIcons[idx] || Search;
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.step}
                  role="tab"
                  id={`stage-tab-${idx}`}
                  aria-selected={isActive}
                  aria-controls={`stage-panel-${idx}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveStage(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`group relative flex flex-col p-3.5 rounded-lg border text-left transition-all cursor-pointer min-h-[44px] ${
                    isActive
                      ? "border-accent-sky/70 bg-accent-soft/30 text-text-primary shadow-xs ring-1 ring-accent-sky/40"
                      : "border-border-subtle bg-surface-nested/40 text-text-secondary hover:border-border-interactive hover:bg-surface-nested"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isActive ? "text-accent-sky" : "text-text-muted"
                      }`}
                    >
                      {stage.step}
                    </span>
                    <Icon
                      className={`h-4 w-4 transition-colors ${
                        isActive ? "text-accent-sky" : "text-text-muted group-hover:text-text-primary"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-bold text-text-primary leading-snug">
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Inspector Panel */}
          <div
            id={`stage-panel-${activeStage}`}
            role="tabpanel"
            aria-labelledby={`stage-tab-${activeStage}`}
            className="rounded-lg border border-border-interactive/60 bg-surface-nested/70 p-5 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border-subtle pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-accent-sky">
                  STAGE {stages[activeStage].step}
                </span>
                <span className="text-text-muted">•</span>
                <h5 className="text-sm sm:text-base font-bold text-text-primary">
                  {stages[activeStage].title}
                </h5>
              </div>
              <span className="text-xs font-mono text-text-muted">
                Active Operational Node
              </span>
            </div>

            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              {stages[activeStage].description}
            </p>

            {/* Stage Technical Role Context */}
            <div className="mt-4 pt-4 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-text-muted">
              <span>Verified Capability Integration</span>
              <span className="text-text-primary font-medium">
                Stage {stages[activeStage].step} / 05 in Autonomous Lifecycle
              </span>
            </div>
          </div>
        </div>

        {/* 
          Verified Capabilities Matrix: Layered Systems Breakdown
        */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-border-subtle pb-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              Complete Architectural Capability Scope
            </h4>
            <span className="text-xs font-mono text-text-muted">6 Core Systems Verified</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Layer 1 */}
            <div className="rounded-xl border border-border-subtle bg-surface-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent-sky">
                <Layers className="h-4 w-4" />
                <span>01 / RESEARCH LAYER</span>
              </div>
              <ul className="space-y-2 text-xs text-text-secondary leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent-sky shrink-0 mt-0.5" />
                  <span>Topic brainstorming and RSS-based research sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent-sky shrink-0 mt-0.5" />
                  <span>Public competitor content monitoring</span>
                </li>
              </ul>
            </div>

            {/* Layer 2 */}
            <div className="rounded-xl border border-border-subtle bg-surface-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent-sky">
                <SlidersHorizontal className="h-4 w-4" />
                <span>02 / SYNTHESIS LAYER</span>
              </div>
              <ul className="space-y-2 text-xs text-text-secondary leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent-sky shrink-0 mt-0.5" />
                  <span>Custom brand voice & writing style configuration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent-sky shrink-0 mt-0.5" />
                  <span>Direct connectivity with compatible AI model APIs</span>
                </li>
              </ul>
            </div>

            {/* Layer 3 */}
            <div className="rounded-xl border border-border-subtle bg-surface-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent-sky">
                <Send className="h-4 w-4" />
                <span>03 / DISPATCH LAYER</span>
              </div>
              <ul className="space-y-2 text-xs text-text-secondary leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent-sky shrink-0 mt-0.5" />
                  <span>Post drafting, visual scheduling, and automated publishing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent-sky shrink-0 mt-0.5" />
                  <span>Multi-channel connection (LinkedIn, Facebook Pages, X / Twitter)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 
          SUPPORT AI: Secondary Systems Exploration Node
        */}
        <div className="border-t border-border-subtle pt-8">
          <div className="rounded-xl border border-dashed border-border-interactive/80 bg-surface-nested/40 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5 font-mono text-xs">
                <span className="text-text-muted uppercase font-bold tracking-wider">
                  UPCOMING SYSTEM HORIZON
                </span>
                <span className="text-border-interactive">•</span>
                <h5 className="font-bold text-text-primary text-sm">
                  {supportAIVenture.title}
                </h5>
                <span className="rounded-full border border-purple-500/25 bg-purple-500/10 px-2 py-0.5 text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                  {supportAIVenture.statusLabel}
                </span>
              </div>

              <span className="text-xs font-mono text-text-muted">
                System Status: Exploratory Design
              </span>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-3xl">
              {supportAIVenture.summary}
            </p>

            <div className="mt-4 pt-3 border-t border-border-subtle flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-text-muted">
              <span>Target Gateways:</span>
              <span className="text-text-primary font-medium">WhatsApp</span>
              <span className="text-text-primary font-medium">Facebook Messenger</span>
              <span className="text-text-primary font-medium">Website Live Chat Widget</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
