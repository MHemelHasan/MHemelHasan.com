# V3 Brand Rebuild — Technical Implementation Plan & Data Model

**Document ID:** `04-implementation-plan.md`  
**Author:** Antigravity (Pair Programming with M Hemel Hasan)  
**Date:** September 2026  
**Status:** Draft — Pending Final Review

---

## 1. Technical Stack & Architecture

- **Framework:** Next.js (App Router, current stable release).
- **Language:** TypeScript (strict mode enabled).
- **Styling:** Tailwind CSS v4 utilizing CSS-first `@theme` configuration (zero legacy `tailwind.config.ts` overhead).
- **Icons:** `lucide-react` (clean, accessible, 1.5px stroke weight).
- **Deployment:** Netlify with the modern Netlify Next.js platform integration (OpenNext-compatible).
- **Conversational Architecture (First Visual Phase):** **Local Intent-Driven UI Engine**.
  - No external LLM API dependency, cost, or latency in Phase 1.
  - Decoupled state machine mapping prompt intents directly to rich UI components.
  - Architected so a server-side LLM route can be slotted in seamlessly in the future without altering UI response components.

---

## 2. Directory & Component Architecture

```
v3-brand/
├── app/
│   ├── layout.tsx              # Root HTML shell, fonts, SEO metadata, theme
│   ├── page.tsx                # Hybrid homepage (Hero + Conversation + Static Sections)
│   ├── globals.css             # Tailwind v4 directives, @theme tokens, utilities
│   ├── robots.ts               # Automated search indexing rules
│   └── sitemap.ts              # Dynamic XML sitemap generator
├── components/
│   ├── layout/
│   │   ├── header.tsx          # Minimal fixed navigation + chat jump button
│   │   ├── footer.tsx          # Minimal footer with direct contact & copyright
│   │   └── container.tsx       # Standardized responsive max-width wrapper
│   ├── hero/
│   │   ├── hero-identity.tsx   # Name, title, positioning statement, venture badge
│   │   └── quick-prompts.tsx   # Tactile prompt suggestion chips
│   ├── conversation/
│   │   ├── conversation-shell.tsx   # Chat container, history feed, scroll manager
│   │   ├── prompt-input.tsx         # Tactile input field with submit button
│   │   ├── message-bubble.tsx       # User & system message wrappers
│   │   ├── response-renderer.tsx    # Dynamic dispatcher for rich UI response cards
│   │   └── response-cards/          # Modular rich card components:
│   │       ├── venture-response.tsx   # Social AI / Support AI rich card
│   │       ├── product-response.tsx   # Themefic products rich card
│   │       ├── pipeline-response.tsx  # "How I Build" interactive snippet
│   │       └── contact-response.tsx   # Direct dialogue and email trigger
│   ├── ventures/
│   │   ├── social-ai-card.tsx  # Detailed Social AI flagship showcase
│   │   └── support-ai-card.tsx # Forward-looking Support AI preview
│   ├── products/
│   │   ├── product-matrix.tsx  # 3 Featured Themefic case studies + 3 compact cards
│   │   └── product-card.tsx    # Individual card with mandatory company attribution
│   ├── pipeline/
│   │   ├── pipeline-stepper.tsx # Interactive 8-stage "How I Build" explorer
│   │   └── stage-detail.tsx     # Stage deliverables, challenges, and tools
│   ├── journey/
│   │   └── journey-timeline.tsx # Chronological milestones (verified data only)
│   └── contact/
│       └── contact-section.tsx  # "Start a Conversation" gateway & direct channels
├── data/
│   ├── profile.ts              # Centralized profile (name, title, location: Dhaka, Bangladesh, email)
│   ├── ventures.ts             # Typed data for Social AI (private_beta) and Support AI
│   ├── products.ts             # Typed data for 6 Themefic products (3 featured + 3 compact)
│   ├── pipeline.ts             # 8-stage "How I Build" lifecycle records
│   ├── journey.ts              # Verified career milestones (unverified marked TBD)
│   └── prompts.ts              # Suggested prompt chips and intent routing map
├── lib/
│   ├── utils.ts                # Tailwind clsx / twMerge helper (`cn`)
│   └── conversation-engine.ts  # Local intent matching and response state manager
├── types/
│   ├── product.ts              # Product, venture, and attribution schema definitions
│   └── conversation.ts         # Message, intent, and prompt type definitions
└── public/
    ├── assets/                 # Verified screenshots and avatar
    └── favicons/               # Favicon assets
```

---

## 3. Typed Data Models

### 3.1 Venture & Product Schema

```typescript
// types/product.ts

export type ProductClassification = 
  | 'personal_venture'   // Owned and founded by M Hemel Hasan (Social AI)
  | 'future_venture'     // What I'm Building Next / Exploring (Support AI)
  | 'company_product';   // Engineered inside a company (Themefic)

export type ProductStatus = 
  | 'private_beta'       // Active private beta (Current real-world status for Social AI)
  | 'active_production'  // Deployed and live
  | 'in_development'    // Active engineering in progress
  | 'concept_exploring'  // Research / forward-looking vision (Support AI)
  | 'commercial_shipped';// Released commercial product (Themefic products)

export interface CompanyAttribution {
  companyName: string;   // e.g. "Themefic"
  companyUrl?: string;   // e.g. "https://themefic.com"
  period?: string;       // e.g. "Jun 2022 - Present"
  role: string;          // e.g. "Senior WordPress Plugin Engineer"
}

export interface ProductRecord {
  id: string;            // Unique identifier (e.g. "bundlefic-shopify", "bundlefic-webflow")
  slug: string;
  title: string;
  tagline: string;
  classification: ProductClassification;
  status: ProductStatus;
  
  // Mandatory for company_product
  attribution?: CompanyAttribution;
  
  // Ecosystem category
  ecosystem: 'shopify' | 'webflow' | 'wordpress' | 'ai_saas' | 'general';
  
  // Feature Tier (for Themefic products: 3 featured, 3 compact)
  isFeatured: boolean; 
  
  // Capabilities / Problem & Solution
  summary: string;
  capabilities: string[];
  technicalHighlights: string[];
  
  // Real links only (no dead '#' placeholders)
  links?: {
    website?: string;
    docs?: string;
  };
}
```

### 3.2 Conversational State Schema

```typescript
// types/conversation.ts

export type IntentKey = 
  | 'ventures'       // Social AI & Support AI
  | 'products'       // Themefic products
  | 'pipeline'       // How I Build
  | 'journey'        // Career timeline
  | 'contact'        // Start a conversation
  | 'general';

export interface PromptSuggestion {
  id: string;
  label: string;
  iconName: string;
  targetIntent: IntentKey;
  sampleQuery: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'system';
  text?: string;
  intent?: IntentKey;
  timestamp: number;
}
```

---

## 4. Phased Implementation Roadmap

To maintain rigorous quality control and enable timely review, implementation is organized into structured milestones:

```
[PHASE 0: Scaffold & Tokens]
     ├── Next.js App Router + Tailwind v4 CSS setup
     └── Asset migration (portrait, favicons, vector SVGs)
          ↓
[PHASE 1A: First Visual & Interactive Checkpoint]  <-- STOP FOR USER REVIEW
     ├── Header + Hero Identity + Prompt Chips
     ├── Conversational Shell + Local Intent Engine
     ├── 2–3 Working Rich Response States (Social AI, Products, Pipeline)
     └── Responsive Verification (Desktop + Mobile)
          ↓
[PHASE 1B: Complete Static Sections & Dual Access]
     ├── Static Ventures section (Social AI + Support AI)
     ├── Static Themefic Products (3 Featured + 2 Compact)
     ├── Interactive "How I Build" section
     └── Journey timeline & Contact section
          ↓
[PHASE 2: Polishing, Performance & Netlify Deploy]
     ├── Micro-interactions and smooth transitions
     ├── WCAG AA accessibility & responsive polish
     ├── SEO, Open Graph, and JSON-LD schema
     └── Netlify production build verification
```

---

## 5. Scope of Phase 1A (Immediate Next Implementation Step)

When authorized to begin coding, **Phase 1A** will focus exclusively on:
1. Setting up Next.js App Router with TypeScript and Tailwind CSS v4.
2. Building the **Header** with brand mark, navigation anchors, and status indicator.
3. Implementing the **Hero Section** with clear identity, positioning statement, and founder badge.
4. Implementing the **Conversational Shell & Prompt Chips** (`Ask me about what I build…`, with clickable suggestion pills).
5. Implementing **2–3 rich mock response cards** (Social AI venture card, Themefic products preview card, and How-I-Build pipeline teaser) powered by the local intent engine.
6. Ensuring fluid, responsive behavior on mobile and desktop.

**At the end of Phase 1A, we will stop and review the live UI/UX together before continuing.**
