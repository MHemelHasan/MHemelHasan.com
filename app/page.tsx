"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PortfolioHero } from "@/components/hero/portfolio-hero";
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
        <PortfolioHero />

        <VenturesSection onAsk={openConversation} />

        <ProductsSection onAskInConversation={handleAskInConversation} />

        <PipelineSection onAskInConversation={handleAskInConversation} />

        <EngineeringSection onAskInConversation={handleAskInConversation} />

        <div className="mx-auto max-w-6xl space-y-20 px-4 pb-20 sm:space-y-24 sm:px-6 lg:space-y-28">
          <JourneySection onAskInConversation={handleAskInConversation} />
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
