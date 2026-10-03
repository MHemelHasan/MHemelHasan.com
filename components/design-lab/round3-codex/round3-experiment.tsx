"use client";

import { ConversationProvider, useConversation } from "@/components/conversation/conversation-context";
import { ImmersiveConversation } from "@/components/conversation/immersive-conversation";
import { EditorialHero } from "./editorial-hero";
import { ExperimentHeader } from "./experiment-header";
import { VenturesProof } from "./ventures-proof";

function ExperimentContent() {
  const { openConversation } = useConversation();

  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas text-text-primary">
      <ExperimentHeader onStartConversation={() => openConversation()} />
      <main>
        <EditorialHero />
        <VenturesProof onAsk={openConversation} />
      </main>
      <ImmersiveConversation />
    </div>
  );
}

export function Round3Experiment() {
  return (
    <ConversationProvider>
      <ExperimentContent />
    </ConversationProvider>
  );
}
