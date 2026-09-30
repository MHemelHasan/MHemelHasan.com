import { PromptSuggestion, IntentKey } from "@/types/conversation";

export const initialPromptSuggestions: PromptSuggestion[] = [
  {
    id: "about-me",
    label: "About me",
    iconName: "User",
    targetIntent: "about_me",
    sampleQuery: "Tell me about yourself",
  },
  {
    id: "social-ai",
    label: "Social AI",
    iconName: "Bot",
    targetIntent: "social_ai",
    sampleQuery: "Tell me about your Social AI venture",
  },
  {
    id: "show-products",
    label: "Show me your products",
    iconName: "Layers",
    targetIntent: "products",
    sampleQuery: "Show me products you have shipped",
  },
  {
    id: "how-build",
    label: "How do you build?",
    iconName: "GitFork",
    targetIntent: "pipeline",
    sampleQuery: "How do you take an idea to production?",
  },
  {
    id: "journey",
    label: "Career journey",
    iconName: "Compass",
    targetIntent: "journey",
    sampleQuery: "Tell me about your journey",
  },
  {
    id: "support-ai",
    label: "What's next?",
    iconName: "Sparkles",
    targetIntent: "support_ai",
    sampleQuery: "What are you building next?",
  },
  {
    id: "lets-talk",
    label: "Let's talk",
    iconName: "Send",
    targetIntent: "contact",
    sampleQuery: "How can we work together?",
  },
];

export function getContextualPrompts(currentIntent?: IntentKey | null): PromptSuggestion[] {
  switch (currentIntent) {
    case "about_me":
      return [
        {
          id: "ctx-social-ai",
          label: "Social AI",
          iconName: "Bot",
          targetIntent: "social_ai",
          sampleQuery: "Tell me about Social AI",
        },
        {
          id: "ctx-journey",
          label: "My journey",
          iconName: "Compass",
          targetIntent: "journey",
          sampleQuery: "Tell me about your career journey",
        },
        {
          id: "ctx-products",
          label: "What I build",
          iconName: "Layers",
          targetIntent: "products",
          sampleQuery: "Show me your products",
        },
        {
          id: "ctx-contact",
          label: "Let's talk",
          iconName: "Send",
          targetIntent: "contact",
          sampleQuery: "How can we work together?",
        },
      ];

    case "social_ai":
    case "ventures":
      return [
        {
          id: "ctx-next",
          label: "What are you building next?",
          iconName: "Sparkles",
          targetIntent: "support_ai",
          sampleQuery: "What are you building next?",
        },
        {
          id: "ctx-pipeline",
          label: "How do you build?",
          iconName: "GitFork",
          targetIntent: "pipeline",
          sampleQuery: "How do you approach product architecture?",
        },
        {
          id: "ctx-products",
          label: "My products",
          iconName: "Layers",
          targetIntent: "products",
          sampleQuery: "Show me products you have shipped",
        },
      ];

    case "support_ai":
      return [
        {
          id: "ctx-social-ai",
          label: "Social AI",
          iconName: "Bot",
          targetIntent: "social_ai",
          sampleQuery: "Tell me about Social AI",
        },
        {
          id: "ctx-products",
          label: "My products",
          iconName: "Layers",
          targetIntent: "products",
          sampleQuery: "Show me products you have shipped",
        },
        {
          id: "ctx-pipeline",
          label: "Architecture process",
          iconName: "GitFork",
          targetIntent: "pipeline",
          sampleQuery: "How do you take an idea to production?",
        },
      ];

    case "products":
      return [
        {
          id: "ctx-pipeline",
          label: "How I build products",
          iconName: "GitFork",
          targetIntent: "pipeline",
          sampleQuery: "How do you build?",
        },
        {
          id: "ctx-social-ai",
          label: "What are you building now?",
          iconName: "Bot",
          targetIntent: "social_ai",
          sampleQuery: "Tell me about Social AI",
        },
        {
          id: "ctx-journey",
          label: "Career journey",
          iconName: "Compass",
          targetIntent: "journey",
          sampleQuery: "Tell me about your career evolution",
        },
        {
          id: "ctx-contact",
          label: "Let's talk",
          iconName: "Send",
          targetIntent: "contact",
          sampleQuery: "How can we work together?",
        },
      ];

    case "pipeline":
      return [
        {
          id: "ctx-products",
          label: "My products",
          iconName: "Layers",
          targetIntent: "products",
          sampleQuery: "Show me your products",
        },
        {
          id: "ctx-social-ai",
          label: "Social AI architecture",
          iconName: "Bot",
          targetIntent: "social_ai",
          sampleQuery: "Tell me about Social AI",
        },
        {
          id: "ctx-journey",
          label: "Background",
          iconName: "Compass",
          targetIntent: "journey",
          sampleQuery: "Tell me about your journey",
        },
      ];

    case "journey":
      return [
        {
          id: "ctx-social-ai",
          label: "What are you building now?",
          iconName: "Bot",
          targetIntent: "social_ai",
          sampleQuery: "Tell me about Social AI",
        },
        {
          id: "ctx-products",
          label: "My products",
          iconName: "Layers",
          targetIntent: "products",
          sampleQuery: "Show me your products",
        },
        {
          id: "ctx-pipeline",
          label: "How do you build?",
          iconName: "GitFork",
          targetIntent: "pipeline",
          sampleQuery: "How do you build?",
        },
        {
          id: "ctx-contact",
          label: "Let's talk",
          iconName: "Send",
          targetIntent: "contact",
          sampleQuery: "How can we work together?",
        },
      ];

    case "contact":
      return [
        {
          id: "ctx-about",
          label: "About me",
          iconName: "User",
          targetIntent: "about_me",
          sampleQuery: "Tell me about yourself",
        },
        {
          id: "ctx-social-ai",
          label: "Social AI",
          iconName: "Bot",
          targetIntent: "social_ai",
          sampleQuery: "Tell me about Social AI",
        },
        {
          id: "ctx-products",
          label: "Products",
          iconName: "Layers",
          targetIntent: "products",
          sampleQuery: "Show me your products",
        },
      ];

    case "unknown":
    default:
      return [
        {
          id: "ctx-about",
          label: "About me",
          iconName: "User",
          targetIntent: "about_me",
          sampleQuery: "Tell me about yourself",
        },
        {
          id: "ctx-social-ai",
          label: "Social AI",
          iconName: "Bot",
          targetIntent: "social_ai",
          sampleQuery: "Tell me about Social AI",
        },
        {
          id: "ctx-products",
          label: "Products",
          iconName: "Layers",
          targetIntent: "products",
          sampleQuery: "Show me your products",
        },
        {
          id: "ctx-pipeline",
          label: "How I build",
          iconName: "GitFork",
          targetIntent: "pipeline",
          sampleQuery: "How do you build?",
        },
      ];
  }
}
