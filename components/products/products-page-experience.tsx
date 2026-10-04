"use client";

import {
  ConversationProvider,
  useConversation,
} from "@/components/conversation/conversation-context";
import { ImmersiveConversation } from "@/components/conversation/immersive-conversation";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProductsPortfolio } from "@/components/products/products-portfolio";

function ProductsPageContent() {
  const { openConversation } = useConversation();

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-text-primary selection:bg-accent-soft selection:text-accent-sky">
      <Header
        homeHref="/"
        navigationBasePath="/"
        onStartConversation={() => openConversation()}
      />
      <main id="top" className="flex-1">
        <ProductsPortfolio onAsk={openConversation} />
      </main>
      <Footer />
      <ImmersiveConversation />
    </div>
  );
}

export function ProductsPageExperience() {
  return (
    <ConversationProvider>
      <ProductsPageContent />
    </ConversationProvider>
  );
}
