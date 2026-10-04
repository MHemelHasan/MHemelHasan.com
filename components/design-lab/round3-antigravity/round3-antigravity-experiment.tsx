"use client";

import {
  ConversationProvider,
  useConversation,
} from "@/components/conversation/conversation-context";
import { ImmersiveConversation } from "@/components/conversation/immersive-conversation";
import { AntigravityHeader } from "./antigravity-header";
import { AntigravityHero } from "./antigravity-hero";
import { AntigravityVentures } from "./antigravity-ventures";

function ExperimentContent() {
  const { openConversation } = useConversation();

  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas text-text-primary selection:bg-accent-soft selection:text-accent-sky">
      {/* Experiment Header */}
      <AntigravityHeader onStartConversation={() => openConversation()} />

      {/* Main Experience: Continuous Hero -> Ventures Opening */}
      <main id="top" className="flex-1">
        <AntigravityHero />
        <AntigravityVentures onAsk={(query) => openConversation(query)} />
      </main>

      {/* Embedded Conversation Engine Drawer / Modal */}
      <ImmersiveConversation />
    </div>
  );
}

export function Round3AntigravityExperiment() {
  return (
    <ConversationProvider>
      <ExperimentContent />
    </ConversationProvider>
  );
}
