"use client";

import { useConversation } from "@/components/conversation/conversation-context";
import { ImmersiveConversation } from "@/components/conversation/immersive-conversation";
import { ClaudeHero } from "./claude-hero";
import { ClaudeVentures } from "./claude-ventures";
import { ClaudeExperimentHeader } from "./claude-header";

export function Round3ClaudeExperiment() {
  const { openConversation } = useConversation();

  const handleStartConversation = () => {
    openConversation();
  };

  const handleAskInConversation = (query: string) => {
    openConversation(query);
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-text-primary selection:bg-accent-soft selection:text-accent-sky">
      <ClaudeExperimentHeader onStartConversation={handleStartConversation} />

      <main id="top" className="flex-1">
        {/* Hero: identity + conversation gateway — owns the initial viewport */}
        <ClaudeHero />

        {/* Ventures: continuous visual flow from Hero */}
        <ClaudeVentures onAskInConversation={handleAskInConversation} />
      </main>

      {/* Experiment footer: minimal, does not duplicate production footer */}
      <footer className="border-t border-border-subtle py-8">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 flex items-center justify-between">
          <p className="text-xs text-text-muted">
            Round 3 — Claude Experiment · Design-lab only
          </p>
          <a
            href="/"
            className="text-xs font-medium text-accent-sky hover:underline"
          >
            ← Back to production
          </a>
        </div>
      </footer>

      {/* Immersive conversation overlay — reuses full production conversation */}
      <ImmersiveConversation />
    </div>
  );
}
