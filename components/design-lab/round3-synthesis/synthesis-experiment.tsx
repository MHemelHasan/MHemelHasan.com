"use client";

import { ConversationProvider, useConversation } from "@/components/conversation/conversation-context";
import { ImmersiveConversation } from "@/components/conversation/immersive-conversation";
import { PortfolioHero } from "@/components/hero/portfolio-hero";
import { VenturesSection } from "@/components/sections/ventures-section";
import { SynthesisHeader } from "./synthesis-header";

function SynthesisContent() {
  const { openConversation } = useConversation();

  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas text-text-primary">
      <SynthesisHeader onStartConversation={() => openConversation()} />
      <main id="top">
        <PortfolioHero />
        <VenturesSection onAsk={openConversation} />
      </main>
      <ImmersiveConversation />
    </div>
  );
}

export function SynthesisExperiment() {
  return (
    <ConversationProvider>
      <SynthesisContent />
    </ConversationProvider>
  );
}
