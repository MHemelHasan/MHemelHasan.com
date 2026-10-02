"use client";

import { MessageSquareText, ArrowRight } from "lucide-react";

interface ConceptProps {
  onAskInConversation?: (query: string) => void;
}

export function ConceptCRound2({ onAskInConversation }: ConceptProps) {
  const handleAsk = (query: string) => {
    if (onAskInConversation) {
      onAskInConversation(query);
    } else {
      const el = document.getElementById("conversation");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const workflowSteps = [
    {
      number: "01",
      name: "Research",
      detail: "Topic brainstorming, RSS ingestion & public LinkedIn competitor content tracking",
    },
    {
      number: "02",
      name: "Brand Voice",
      detail: "Style configuration, tone constraints & custom brand rules",
    },
    {
      number: "03",
      name: "Creation",
      detail: "Platform-tailored draft generation with image workflow",
    },
    {
      number: "04",
      name: "Scheduling",
      detail: "Calendar management & time-window queuing",
    },
    {
      number: "05",
      name: "Publishing",
      detail: "Direct automated publishing to LinkedIn, Facebook Page & X",
    },
  ];

  return (
    <div className="w-full font-sans transition-colors duration-300">
      {/* 
        DIRECTION C — QUIET SYSTEMS / ENGINEERING CLARITY
        Crafted via design-director & ux-engineer:
        - Design Brief: Precise, architectural, minimal, intelligent, restrained.
        - Typography: Swiss tabular sans typography with high-contrast numerals (01-05).
        - Canvas: Architectural Slate #F8FAFC (light) / Carbon Technical #090D14 (dark).
        - Visual Anchor: Continuous 5-Stage Connected Workflow Flowband.
        - Structure: Structural divider rules; disciplined 4-column ledger; zero dashboard cosplay.
      */}
      <div className="rounded-3xl bg-[#f8fafc] dark:bg-[#090d14] p-8 sm:p-12 lg:p-16 text-[#0f172a] dark:text-[#f8fafc] border border-[#e2e8f0] dark:border-[#1e293b] transition-colors duration-300">
        
        {/* Quiet Architectural Header: 2-Column Split */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-10 border-b border-[#cbd5e1] dark:border-[#1e293b]">
          {/* Left Column: Scope & Title (6 cols) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-3 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8]">
              <span className="uppercase tracking-wider">Ventures I’m Building</span>
              <span>/</span>
              <span>Architectural Systems</span>
            </div>
            
            <div className="flex flex-wrap items-baseline gap-4">
              <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0f172a] dark:text-[#f8fafc]">
                Social AI
              </h3>
              <span className="inline-flex items-center rounded-md bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 px-2.5 py-0.5 text-xs font-mono font-semibold text-teal-700 dark:text-teal-300">
                Private Beta
              </span>
            </div>

            <p className="text-sm font-medium text-[#64748b] dark:text-[#94a3b8]">
              M Hemel Hasan · Founder / Lead Architect
            </p>
          </div>

          {/* Right Column: Statement of Purpose & Platforms (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <p className="text-base sm:text-lg text-[#334155] dark:text-[#cbd5e1] leading-relaxed">
              A product for researching, creating, scheduling and publishing platform-tailored social content from one workflow.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="text-[#64748b] dark:text-[#94a3b8] font-mono">SUPPORTED PLATFORMS:</span>
              <span className="rounded-sm bg-white dark:bg-[#161d2d] border border-[#e2e8f0] dark:border-[#1e293b] px-2.5 py-1 font-medium text-[#0f172a] dark:text-[#f8fafc]">
                LinkedIn
              </span>
              <span className="rounded-sm bg-white dark:bg-[#161d2d] border border-[#e2e8f0] dark:border-[#1e293b] px-2.5 py-1 font-medium text-[#0f172a] dark:text-[#f8fafc]">
                Facebook Page
              </span>
              <span className="rounded-sm bg-white dark:bg-[#161d2d] border border-[#e2e8f0] dark:border-[#1e293b] px-2.5 py-1 font-medium text-[#0f172a] dark:text-[#f8fafc]">
                X / Twitter
              </span>
            </div>
          </div>
        </header>

        {/* VISUAL ANCHOR: 5-Stage Continuous Connected Workflow Graphic */}
        <div className="mt-10 pb-12 border-b border-[#cbd5e1] dark:border-[#1e293b]">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8]">
              Operating Pipeline
            </span>
            <span className="text-xs text-[#64748b] dark:text-[#94a3b8]">
              Continuous End-to-End Execution
            </span>
          </div>

          {/* Connected Flow Node Rail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {workflowSteps.map((step, idx) => (
              <div 
                key={step.number}
                className="relative rounded-xl bg-white dark:bg-[#101726] border border-[#e2e8f0] dark:border-[#1e293b] p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400">
                      {step.number}
                    </span>
                    {idx < workflowSteps.length - 1 && (
                      <span className="hidden lg:inline text-xs text-[#94a3b8] dark:text-[#64748b]">
                        →
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">
                    {step.name}
                  </h4>
                  <p className="mt-1 text-xs text-[#64748b] dark:text-[#94a3b8] leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Column Structured Ledger of Verified Capabilities */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Capability 1 */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider block border-b border-[#e2e8f0] dark:border-[#1e293b] pb-2">
              01 // INGESTION
            </span>
            <h5 className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">
              Research & ideation
            </h5>
            <ul className="text-xs text-[#475569] dark:text-[#94a3b8] space-y-1.5 leading-relaxed">
              <li>• Brainstorming / topic research</li>
              <li>• RSS-feed based research</li>
              <li>• Competitor monitoring using public LinkedIn content</li>
            </ul>
          </div>

          {/* Capability 2 */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider block border-b border-[#e2e8f0] dark:border-[#1e293b] pb-2">
              02 // ADAPTATION
            </span>
            <h5 className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">
              Brand & creation
            </h5>
            <ul className="text-xs text-[#475569] dark:text-[#94a3b8] space-y-1.5 leading-relaxed">
              <li>• Brand voice configuration</li>
              <li>• Platform-tailored post generation</li>
            </ul>
          </div>

          {/* Capability 3 */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider block border-b border-[#e2e8f0] dark:border-[#1e293b] pb-2">
              03 // DISPATCH
            </span>
            <h5 className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">
              Planning & publishing
            </h5>
            <ul className="text-xs text-[#475569] dark:text-[#94a3b8] space-y-1.5 leading-relaxed">
              <li>• Image + schedule workflow</li>
              <li>• Scheduling calendar</li>
              <li>• Auto-publishing triggers</li>
            </ul>
          </div>

          {/* Capability 4 */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider block border-b border-[#e2e8f0] dark:border-[#1e293b] pb-2">
              04 // INTEGRATION
            </span>
            <h5 className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">
              Model configuration
            </h5>
            <ul className="text-xs text-[#475569] dark:text-[#94a3b8] space-y-1.5 leading-relaxed">
              <li>• Custom provider setup</li>
              <li>• OpenAI-compatible model configuration</li>
            </ul>
          </div>
        </div>

        {/* Secondary Venture: Support AI (Architectural Horizontal Ledger Row) */}
        <footer className="mt-12 pt-6 border-t border-[#cbd5e1] dark:border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-baseline gap-3 text-xs">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8]">
              NEXT IN PIPELINE:
            </span>
            <span className="font-bold text-[#0f172a] dark:text-[#f8fafc]">
              Support AI
            </span>
            <span className="rounded-sm bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 px-2 py-0.5 font-mono text-teal-700 dark:text-teal-300">
              Coming Next / Currently Exploring
            </span>
            <span className="text-[#475569] dark:text-[#94a3b8]">
              Knowledge-grounded customer support across WhatsApp, Facebook Messenger, and website live chat.
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleAsk("Explain the engineering plan for Support AI")}
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer shrink-0 self-start sm:self-auto min-h-[44px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm"
          >
            <span>Inquire in conversation</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </footer>

      </div>
    </div>
  );
}
