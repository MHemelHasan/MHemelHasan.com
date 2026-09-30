"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroIdentity } from "@/components/hero/hero-identity";
import { ConversationGateway } from "@/components/conversation/conversation-gateway";
import { ImmersiveConversation } from "@/components/conversation/immersive-conversation";
import {
  ConversationProvider,
  useConversation,
} from "@/components/conversation/conversation-context";
import { VenturesSection } from "@/components/sections/ventures-section";
import { ProductsSection } from "@/components/sections/products-section";
import { PipelineSection } from "@/components/sections/pipeline-section";
import { EngineeringSection } from "@/components/sections/engineering-section";
import { JourneySection } from "@/components/sections/journey-section";
import { ContactSection } from "@/components/sections/contact-section";

function HomeContent() {
  const { openConversation } = useConversation();

  const handleStartConversation = () => {
    openConversation();
  };

  const handleAskInConversation = (query: string) => {
    openConversation(query);
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-text-primary selection:bg-accent-soft selection:text-accent-sky">
      {/* Persistent Navigation */}
      <Header onStartConversation={handleStartConversation} />

      {/* Main Experience */}
      <main id="top" className="flex-1">
        {/* Dedicated Hero Section: Owns the full initial viewport cleanly */}
        <section
          id="hero"
          className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-center px-4 py-6 sm:px-6 sm:py-10 lg:py-12"
        >
          <div className="w-full space-y-6 sm:space-y-8 lg:space-y-9">
            {/* Hero Identity: Asymmetric & Editorial */}
            <HeroIdentity />

            {/* Conversational Gateway: Input Bar + Quick Prompts */}
            <ConversationGateway />
          </div>
        </section>

        {/* Full Static Portfolio Experience (Path B: Complete Portfolio Proof) */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 space-y-20 sm:space-y-24 lg:space-y-28">
          {/* 1. Ventures I'm Building */}
          <VenturesSection onAskInConversation={handleAskInConversation} />

          {/* 2. Products Led & Shipped */}
          <ProductsSection onAskInConversation={handleAskInConversation} />

          {/* 3. How I Build */}
          <PipelineSection onAskInConversation={handleAskInConversation} />

          {/* 4. Engineering Depth */}
          <EngineeringSection onAskInConversation={handleAskInConversation} />

          {/* 5. Builder Journey */}
          <JourneySection onAskInConversation={handleAskInConversation} />

          {/* 6. Start a Conversation / Contact */}
          <ContactSection onStartConversation={handleStartConversation} />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Full-Viewport Immersive Conversational Mode (Path A: Dedicated Workspace) */}
      <ImmersiveConversation />
    </div>
  );
}

export default function Home() {
  return (
    <ConversationProvider>
      <HomeContent />
    </ConversationProvider>
  );
}
