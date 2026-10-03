"use client";

import { ContactSection } from "@/components/sections/contact-section";
import {
  ConversationProvider,
  useConversation,
} from "@/components/conversation/conversation-context";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ImmersiveConversation } from "@/components/conversation/immersive-conversation";
import { JourneySection } from "@/components/sections/journey-section";
import { PipelineSection } from "@/components/sections/pipeline-section";
import { EngineeringSection } from "@/components/sections/engineering-section";
import { PortfolioHero } from "@/components/hero/portfolio-hero";
import { ProductsSection } from "@/components/sections/products-section";
import { VenturesSection } from "@/components/sections/ventures-section";

function Round4ProductsBuildContent() {
  const { openConversation } = useConversation();

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-text-primary selection:bg-accent-soft selection:text-accent-sky">
      <Header onStartConversation={() => openConversation()} />

      <main id="top" className="flex-1">
        <PortfolioHero />
        <VenturesSection onAsk={openConversation} />

        <ProductsSection onAskInConversation={(query) => openConversation(query)} />
        <PipelineSection onAskInConversation={(query) => openConversation(query)} />

        <EngineeringSection onAskInConversation={(query) => openConversation(query)} />

        <div className="mx-auto max-w-6xl space-y-20 px-4 pb-20 sm:space-y-24 sm:px-6 lg:space-y-28">
          <JourneySection onAskInConversation={(query) => openConversation(query)} />
          <ContactSection onStartConversation={() => openConversation()} />
        </div>
      </main>

      <Footer />
      <ImmersiveConversation />
    </div>
  );
}

export function Round4ProductsBuildExperiment() {
  return (
    <ConversationProvider>
      <Round4ProductsBuildContent />
    </ConversationProvider>
  );
}
