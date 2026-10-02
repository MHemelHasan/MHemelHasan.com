"use client";

import { useState } from "react";
import { Sparkles, Check, Sliders, Calendar, Cpu, ArrowRight, MessageSquareText } from "lucide-react";

interface ConceptProps {
  onAskInConversation?: (query: string) => void;
}

export function ConceptBRound2({ onAskInConversation }: ConceptProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<"linkedin" | "facebook" | "x">("linkedin");

  const platformContent = {
    linkedin: {
      name: "LinkedIn",
      role: "Professional Network",
      samplePost:
        "Building software products requires more than good prompts — it demands tight integration between topic research, custom brand voice guardrails, and deterministic publishing pipelines.",
      meta: "1,240 chars · Brand Voice: Analytical & Founder-Led",
      schedule: "Scheduled for Tuesday at 09:30 AM",
      badgeColor: "text-[#0a66c2] bg-[#0a66c2]/10 border-[#0a66c2]/20",
    },
    facebook: {
      name: "Facebook Page",
      role: "Community & Audience",
      samplePost:
        "Behind the scenes on our latest release: We've connected real-time RSS discovery with tailored draft generation to simplify weekly product updates.",
      meta: "420 chars · Brand Voice: Conversational & Direct",
      schedule: "Scheduled for Wednesday at 02:00 PM",
      badgeColor: "text-[#1877f2] bg-[#1877f2]/10 border-[#1877f2]/20",
    },
    x: {
      name: "X / Twitter",
      role: "Shortform & Real-Time",
      samplePost:
        "Most social publishing tools separate research from scheduling. Social AI merges research, brand voice alignment, and direct API model connectivity into one workflow.",
      meta: "198 chars · Brand Voice: Concise & Engineering-Focused",
      schedule: "Scheduled for Thursday at 06:15 PM",
      badgeColor: "text-neutral-900 dark:text-neutral-100 bg-neutral-200/50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700",
    },
  };

  const current = platformContent[selectedPlatform];

  const handleAsk = (query: string) => {
    if (onAskInConversation) {
      onAskInConversation(query);
    } else {
      const el = document.getElementById("conversation");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full font-sans transition-colors duration-300">
      {/* 
        DIRECTION B — PRODUCT STUDIO / VISUAL-FIRST
        Crafted via design-director & ux-engineer:
        - Design Brief: Contemporary product studio, tangible software, proof-led, spacious.
        - Typography: Modern Product Neo-Grotesque, tight geometric headers, 16px body, 13px pill badges.
        - Canvas: Gallery Gray #F4F5F8 (light) / Obsidian Navy #0B0F17 (dark).
        - Surface: Elevated white card (#FFFFFF / #111726) with soft shadow elevation.
        - Visual Anchor: Interactive Platform Post Composer Specimen with 44px tap targets.
        - Accent: High-confidence Electric Cobalt #2563EB / Sky #38BDF8.
      */}
      <div className="rounded-3xl bg-[#f4f5f8] dark:bg-[#0b0f17] p-6 sm:p-10 lg:p-14 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
        
        {/* Studio Product Intro */}
        <header className="max-w-3xl mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400">
              Product Studio Showcase
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Ventures I’m Building
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-4">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Social AI
            </h3>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              Private Beta
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              M Hemel Hasan · Founder / Lead Architect
            </span>
          </div>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            A product for researching, creating, scheduling and publishing platform-tailored social content from one workflow.
          </p>
        </header>

        {/* HERO ARTIFACT: Interactive Multi-Platform Post Composer Specimen */}
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#111726] border border-slate-200/80 dark:border-slate-800/90 shadow-md sm:shadow-xl p-6 sm:p-8 transition-all">
          
          {/* Specimen Header & Platform Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/70">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                Unified Workflow Specimen
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Platform-Tailored Content Generation
              </h4>
            </div>

            {/* Platform Selector Segmented Control (Ergonomic 44px tap targets) */}
            <div 
              role="tablist" 
              aria-label="Supported Platforms"
              className="inline-flex items-center rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200/60 dark:border-slate-800"
            >
              {(["linkedin", "facebook", "x"] as const).map((platform) => {
                const isSelected = selectedPlatform === platform;
                return (
                  <button
                    key={platform}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      isSelected
                        ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {platformContent[platform].name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Specimen Live Display */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Post Preview (8 cols) */}
            <div className="lg:col-span-8 rounded-xl bg-slate-50 dark:bg-[#0b101b] border border-slate-200/60 dark:border-slate-800/60 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-bold ${current.badgeColor}`}>
                    {current.name}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {current.role}
                  </span>
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> Platform Tailored
                </span>
              </div>

              {/* Sample Post Content */}
              <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                {current.samplePost}
              </p>

              {/* Specimen Metadata Footer */}
              <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{current.meta}</span>
                <span className="font-medium text-blue-600 dark:text-sky-400">
                  {current.schedule}
                </span>
              </div>
            </div>

            {/* Right Workflow Controls (4 cols) */}
            <div className="lg:col-span-4 space-y-4 text-xs">
              <div className="rounded-xl bg-slate-50 dark:bg-[#0b101b] border border-slate-200/60 dark:border-slate-800/60 p-4 space-y-3">
                <span className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Workflow State
                </span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-1 border-b border-slate-200/40 dark:border-slate-800/40">
                    <span className="text-slate-600 dark:text-slate-400">Brand Voice</span>
                    <span className="font-semibold text-slate-900 dark:text-white">Active</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-200/40 dark:border-slate-800/40">
                    <span className="text-slate-600 dark:text-slate-400">Model Provider</span>
                    <span className="font-semibold text-slate-900 dark:text-white">OpenAI Compatible</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-600 dark:text-slate-400">Auto-Publish</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Enabled</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleAsk("Tell me about the Social AI product workflow")}
                className="w-full flex items-center justify-center gap-2 min-h-[44px] rounded-xl bg-slate-900 dark:bg-blue-600 text-white font-medium hover:bg-slate-800 dark:hover:bg-blue-500 transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <MessageSquareText className="h-4 w-4" />
                <span>Discuss Social AI Workflow</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Focused Capability Pillars Below Specimen */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="rounded-2xl bg-white dark:bg-[#111726] border border-slate-200/60 dark:border-slate-800/80 p-5 space-y-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <h5 className="text-sm font-bold text-slate-900 dark:text-white">
              Research & ideation
            </h5>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed">
              <li>• Brainstorming / topic research</li>
              <li>• RSS-feed based research</li>
              <li>• Competitor monitoring via public LinkedIn content</li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-2xl bg-white dark:bg-[#111726] border border-slate-200/60 dark:border-slate-800/80 p-5 space-y-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center">
              <Sliders className="h-4 w-4" />
            </div>
            <h5 className="text-sm font-bold text-slate-900 dark:text-white">
              Brand & creation
            </h5>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed">
              <li>• Brand voice configuration</li>
              <li>• Platform-tailored post generation</li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-2xl bg-white dark:bg-[#111726] border border-slate-200/60 dark:border-slate-800/80 p-5 space-y-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center">
              <Calendar className="h-4 w-4" />
            </div>
            <h5 className="text-sm font-bold text-slate-900 dark:text-white">
              Planning & publishing
            </h5>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed">
              <li>• Image + schedule workflow</li>
              <li>• Calendar scheduling</li>
              <li>• Automated publishing</li>
            </ul>
          </div>

          {/* Pillar 4 */}
          <div className="rounded-2xl bg-white dark:bg-[#111726] border border-slate-200/60 dark:border-slate-800/80 p-5 space-y-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center">
              <Cpu className="h-4 w-4" />
            </div>
            <h5 className="text-sm font-bold text-slate-900 dark:text-white">
              Model configuration
            </h5>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed">
              <li>• Custom provider setup</li>
              <li>• OpenAI-compatible model configuration</li>
            </ul>
          </div>
        </div>

        {/* Support AI Secondary Venture */}
        <footer className="mt-8 rounded-2xl bg-white/70 dark:bg-[#111726]/70 border border-slate-200/60 dark:border-slate-800/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Secondary Venture
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              Support AI
            </span>
            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-medium text-slate-600 dark:text-slate-400">
              Coming Next / Currently Exploring
            </span>
            <span className="text-slate-600 dark:text-slate-400">
              Knowledge-grounded customer support across WhatsApp, Facebook Messenger, and website live chat.
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleAsk("What is planned for Support AI?")}
            className="text-xs font-semibold text-blue-600 dark:text-sky-400 hover:underline cursor-pointer shrink-0 self-start sm:self-auto min-h-[44px] flex items-center"
          >
            Explore Support AI →
          </button>
        </footer>

      </div>
    </div>
  );
}
