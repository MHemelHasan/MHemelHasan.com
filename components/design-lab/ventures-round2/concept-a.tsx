"use client";

import { ArrowRight, MessageSquareText } from "lucide-react";

interface ConceptProps {
  onAskInConversation?: (query: string) => void;
}

export function ConceptARound2({ onAskInConversation }: ConceptProps) {
  const handleAsk = (query: string) => {
    if (onAskInConversation) {
      onAskInConversation(query);
    } else {
      const el = document.getElementById("conversation");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full transition-colors duration-300">
      {/* 
        DIRECTION A — HUMAN EDITORIAL FOUNDER
        Crafted via design-director & ux-engineer:
        - Design Brief: Literary, human, confident, warm, intentional, minimal interface chrome.
        - Typography: Serif display headings (Georgia/Merriweather stack), humanist body (~65ch line length).
        - Canvas: Warm Paper #FAF9F5 (light) / Espresso Carbon #141312 (dark).
        - Color Roles: Rich charcoal text, stone secondary, terracotta/amber accent (#C2410C / #F59E0B).
        - Ergonomics: Zero box containment; unboxed narrative pacing with 44px touch targets.
      */}
      <div className="rounded-3xl bg-[#faf9f5] dark:bg-[#141312] p-8 sm:p-12 lg:p-16 text-[#1c1917] dark:text-[#f5f4f0] shadow-xs border border-[#e7e5e0] dark:border-[#292524] transition-colors duration-300">
        
        {/* Editorial Section Masthead: Edge-aligned & deliberate */}
        <header className="border-b border-[#e7e5e0] dark:border-[#292524] pb-8 sm:pb-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-[#78716c] dark:text-[#a8a29e]">
              Ventures I’m Building
            </span>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#78716c] dark:text-[#a8a29e]">
              <span className="font-semibold text-[#1c1917] dark:text-[#f5f4f0]">M Hemel Hasan</span>
              <span>—</span>
              <span>Founder / Lead Architect</span>
            </div>
          </div>

          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3.5 mb-3">
              <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1c1917] dark:text-[#f5f4f0]">
                Social AI
              </h3>
              <span className="inline-flex items-center rounded-full bg-[#fef3c7] dark:bg-[#2e2617] px-3 py-1 text-xs font-semibold text-[#b45309] dark:text-[#fbbf24]">
                Private Beta
              </span>
            </div>

            <p className="mt-4 font-serif text-xl sm:text-2xl text-[#44403c] dark:text-[#d6d3cd] leading-relaxed">
              A product for researching, creating, scheduling and publishing platform-tailored social content from one workflow.
            </p>
          </div>
        </header>

        {/* Narrative Grid: Asymmetric whitespace, zero nested cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Narrative Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#78716c] dark:text-[#a8a29e]">
                01 / The Operating Thesis
              </h4>
              <p className="text-base text-[#44403c] dark:text-[#d6d3cd] leading-relaxed">
                Rather than treating social media as disconnected queue management, Social AI unifies live topic research, brand voice configuration, and model connectivity into a single cohesive publishing pipeline.
              </p>
            </div>

            {/* Current Platforms */}
            <div className="space-y-3 pt-6 border-t border-[#e7e5e0] dark:border-[#292524]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#78716c] dark:text-[#a8a29e]">
                02 / Current Platforms
              </h4>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="rounded-md bg-[#f5f4f0] dark:bg-[#1c1917] border border-[#e7e5e0] dark:border-[#292524] px-3.5 py-1.5 font-medium text-[#1c1917] dark:text-[#f5f4f0]">
                  LinkedIn
                </span>
                <span className="rounded-md bg-[#f5f4f0] dark:bg-[#1c1917] border border-[#e7e5e0] dark:border-[#292524] px-3.5 py-1.5 font-medium text-[#1c1917] dark:text-[#f5f4f0]">
                  Facebook Page
                </span>
                <span className="rounded-md bg-[#f5f4f0] dark:bg-[#1c1917] border border-[#e7e5e0] dark:border-[#292524] px-3.5 py-1.5 font-medium text-[#1c1917] dark:text-[#f5f4f0]">
                  X / Twitter
                </span>
              </div>
            </div>

            {/* Inquire Action (44px touch target) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleAsk("What is the architecture and capability scope of Social AI?")}
                className="group inline-flex items-center gap-2 min-h-[44px] px-1 text-sm font-semibold text-[#c2410c] dark:text-[#f59e0b] hover:underline cursor-pointer transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#c2410c] rounded-md"
              >
                <span>Discuss Social AI architecture in conversation</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Narrative Column: 4 Open Capability Groups (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#78716c] dark:text-[#a8a29e] mb-6">
                03 / Capability Groups
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                {/* Capability 1 */}
                <div className="space-y-2">
                  <h5 className="text-base font-bold text-[#1c1917] dark:text-[#f5f4f0]">
                    Research & ideation
                  </h5>
                  <ul className="space-y-2 text-sm text-[#44403c] dark:text-[#a8a29e] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c2410c] dark:text-[#f59e0b] font-serif">•</span>
                      <span>Brainstorming / topic research</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c2410c] dark:text-[#f59e0b] font-serif">•</span>
                      <span>RSS-feed based research</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c2410c] dark:text-[#f59e0b] font-serif">•</span>
                      <span>Competitor monitoring using public LinkedIn content</span>
                    </li>
                  </ul>
                </div>

                {/* Capability 2 */}
                <div className="space-y-2">
                  <h5 className="text-base font-bold text-[#1c1917] dark:text-[#f5f4f0]">
                    Brand & creation
                  </h5>
                  <ul className="space-y-2 text-sm text-[#44403c] dark:text-[#a8a29e] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c2410c] dark:text-[#f59e0b] font-serif">•</span>
                      <span>Brand voice configuration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c2410c] dark:text-[#f59e0b] font-serif">•</span>
                      <span>Platform-tailored post generation</span>
                    </li>
                  </ul>
                </div>

                {/* Capability 3 */}
                <div className="space-y-2">
                  <h5 className="text-base font-bold text-[#1c1917] dark:text-[#f5f4f0]">
                    Planning & publishing
                  </h5>
                  <ul className="space-y-2 text-sm text-[#44403c] dark:text-[#a8a29e] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c2410c] dark:text-[#f59e0b] font-serif">•</span>
                      <span>Image + schedule workflow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c2410c] dark:text-[#f59e0b] font-serif">•</span>
                      <span>Scheduling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c2410c] dark:text-[#f59e0b] font-serif">•</span>
                      <span>Auto-publishing</span>
                    </li>
                  </ul>
                </div>

                {/* Capability 4 */}
                <div className="space-y-2">
                  <h5 className="text-base font-bold text-[#1c1917] dark:text-[#f5f4f0]">
                    Model configuration
                  </h5>
                  <ul className="space-y-2 text-sm text-[#44403c] dark:text-[#a8a29e] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c2410c] dark:text-[#f59e0b] font-serif">•</span>
                      <span>Custom / OpenAI-compatible provider and model configuration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Venture: Support AI (Quiet Editorial Postscript) */}
        <footer className="mt-14 pt-8 border-t border-[#e7e5e0] dark:border-[#292524]">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#78716c] dark:text-[#a8a29e]">
                  04 / Coming Next
                </span>
                <span className="text-sm font-bold text-[#1c1917] dark:text-[#f5f4f0]">
                  Support AI
                </span>
                <span className="rounded-full bg-[#f5f4f0] dark:bg-[#1c1917] border border-[#e7e5e0] dark:border-[#292524] px-2.5 py-0.5 text-xs text-[#78716c] dark:text-[#a8a29e]">
                  Currently Exploring
                </span>
              </div>
              <p className="text-sm text-[#44403c] dark:text-[#a8a29e]">
                Exploring knowledge-grounded AI customer support across WhatsApp, Facebook Messenger, and website live chat.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleAsk("What is the roadmap for Support AI?")}
              className="text-xs font-semibold text-[#78716c] dark:text-[#a8a29e] hover:text-[#1c1917] dark:hover:text-[#f5f4f0] transition-colors cursor-pointer self-start sm:self-auto shrink-0 min-h-[44px] flex items-center"
            >
              Learn more →
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
