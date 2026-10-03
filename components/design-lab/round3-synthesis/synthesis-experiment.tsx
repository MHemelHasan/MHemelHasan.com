"use client";

import { ConversationProvider, useConversation } from "@/components/conversation/conversation-context";
import { ImmersiveConversation } from "@/components/conversation/immersive-conversation";
import { SynthesisHeader } from "./synthesis-header";
import { SynthesisHero } from "./synthesis-hero";
import { SynthesisVentures } from "./synthesis-ventures";

function SynthesisContent() {
  const { openConversation } = useConversation();

  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas text-text-primary">
      <SynthesisHeader onStartConversation={() => openConversation()} />
      <main>
        <SynthesisHero />
        <SynthesisVentures onAsk={openConversation} />
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
