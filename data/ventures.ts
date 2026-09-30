import { ProductRecord } from "@/types/product";

export const socialAIVenture: ProductRecord = {
  id: "social-ai",
  slug: "social-ai",
  title: "Social AI",
  tagline: "AI-powered social intelligence for research, creation, and multi-channel publishing.",
  classification: "personal_venture",
  status: "private_beta",
  statusLabel: "Private Beta",
  ecosystem: "ai_saas",
  ecosystemLabel: "AI SaaS Platform",
  typeLabel: "Personal Venture",
  isFeatured: true,
  summary:
    "Social AI connects social channels to help users research trending topics, brainstorm ideas, generate content in custom brand voices, schedule, and automate publishing across platforms.",
  channels: ["LinkedIn", "Facebook Pages", "X / Twitter"],
  capabilities: [
    "Multi-channel connection (LinkedIn, Facebook Pages, X / Twitter)",
    "Topic brainstorming and RSS-based research sources",
    "Public competitor content monitoring",
    "Custom brand voice & writing style configuration",
    "Post drafting, visual scheduling, and automated publishing",
    "Direct connectivity with compatible AI model APIs",
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Research & Discovery",
      description: "Discover trending industry topics, monitor public competitor content, and aggregate RSS streams.",
    },
    {
      step: "02",
      title: "Brand Voice Engine",
      description: "Configure custom tone, writing style, vocabulary guardrails, and persona perspective.",
    },
    {
      step: "03",
      title: "Generation & Drafting",
      description: "Generate platform-tailored post variants utilizing direct connectivity with compatible AI model APIs.",
    },
    {
      step: "04",
      title: "Visual Scheduling",
      description: "Queue and coordinate upcoming drafts across calendar timelines with automated pacing.",
    },
    {
      step: "05",
      title: "Multi-Channel Publishing",
      description: "Automate direct publishing across connected channels: LinkedIn, Facebook Pages, and X / Twitter.",
    },
  ],
  publicUrl: null, // Private Beta: URL provided upon public launch
};


export const supportAIVenture: ProductRecord = {
  id: "support-ai",
  slug: "support-ai",
  title: "Support AI",
  tagline: "Context-aware customer support powered by your product knowledge base.",
  classification: "future_venture",
  status: "concept_exploring",
  statusLabel: "What I'm Building Next",
  ecosystem: "ai_saas",
  ecosystemLabel: "AI Knowledge Platform",
  typeLabel: "Exploring / In Development",
  isFeatured: false,
  summary:
    "An AI customer support system that allows companies to supply a structured product knowledge base and deliver accurate answers across multiple conversation channels.",
  channels: ["WhatsApp", "Facebook Messenger", "Website Live Chat Widget"],
  capabilities: [
    "Company & product documentation ingestion",
    "Accurate context-grounded AI responses",
    "Cross-channel routing (WhatsApp, Messenger, Live Chat)",
    "Custom business rules and escalation pathways",
  ],
  publicUrl: null,
};
