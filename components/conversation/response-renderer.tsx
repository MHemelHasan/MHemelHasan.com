"use client";

import { IntentKey, PromptSuggestion } from "@/types/conversation";
import { AboutResponse } from "./response-cards/about-response";
import { SocialAIResponse } from "./response-cards/social-ai-response";
import { SupportAIResponse } from "./response-cards/support-ai-response";
import { ProductResponse } from "./response-cards/product-response";
import { PipelineResponse } from "./response-cards/pipeline-response";
import { JourneyResponse } from "./response-cards/journey-response";
import { ContactResponse } from "./response-cards/contact-response";
import { UnknownResponse } from "./response-cards/unknown-response";
import { VentureResponse } from "./response-cards/venture-response";

interface ResponseRendererProps {
  intent: IntentKey;
  onSelectPrompt: (prompt: PromptSuggestion) => void;
  onNavigateSection?: (anchor: string) => void;
}

export function ResponseRenderer({
  intent,
  onSelectPrompt,
  onNavigateSection,
}: ResponseRendererProps) {
  switch (intent) {
    case "about_me":
      return <AboutResponse onNavigateSection={onNavigateSection} />;
    case "social_ai":
      return <SocialAIResponse onNavigateSection={onNavigateSection} />;
    case "ventures":
      return <VentureResponse onNavigateSection={onNavigateSection} />;
    case "support_ai":
      return <SupportAIResponse onNavigateSection={onNavigateSection} />;
    case "products":
      return <ProductResponse onNavigateSection={onNavigateSection} />;
    case "pipeline":
      return <PipelineResponse onNavigateSection={onNavigateSection} />;
    case "journey":
      return <JourneyResponse onNavigateSection={onNavigateSection} />;
    case "contact":
      return <ContactResponse onNavigateSection={onNavigateSection} />;
    case "unknown":
    default:
      return <UnknownResponse onSelectPrompt={onSelectPrompt} />;
  }
}
