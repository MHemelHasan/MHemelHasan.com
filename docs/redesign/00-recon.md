# Phase 0: Reconnaissance & Baseline Audit Report

**Project:** M Hemel Hasan Portfolio Redesign  
**Date:** November 22, 2026  
**Environment:** Next.js 15.2.0 (App Router), React 19.0.0, TypeScript 5.7.3, Tailwind CSS v4.0.9  
**Status:** Phase 0 Complete — Read-only analysis & baseline audits. No application code modified.

---

## 1. Executive Summary & Mission Alignment

The goal of this redesign is to transition the portfolio from a dense, template-feeling structure to an intentionally crafted, calm, and authoritative product-engineer portfolio.

### Core Targets:
1. **Reduce total page height by 35–45%**: Current homepage desktop height is **9,252px** (and mobile is **14,638px**). Target desktop height is **5,100px – 6,000px**.
2. **WCAG 2.1 AA Compliance & Lighthouse Accessibility ≥ 95**: Baseline audits achieved 96 on home and 100 on products, but uncovered critical contrast and accessible naming issues (`label-content-name-mismatch`, dark-mode cobalt contrast, and small badges).
3. **Honest Attribution & Zero Fabricated Facts**: Strict boundary maintained between company products engineered at Themefic (Bundlefic, Instantio, Connectfic, Quotezic, Ultimate Addons, Bundlefic for Webflow) and personal founder ventures (Social AI, Support AI).
4. **Preserve Canonical Brand Kit v2.0**: Concept C interlocking MH monogram, approved wordmarks, and token geometries remain unaltered per `docs/brand/AGENT_BRAND_CONTEXT.md`.

---

## 2. File Map & Architecture Analysis

### 2.1 Configuration & Design Tokens
- `package.json`: Minimal dependency tree (Next 15.2, React 19, Lucide React, clsx, tailwind-merge, Tailwind v4).
- `app/globals.css`: Tailwind v4 `@theme` definitions and `:root` / `.dark` CSS custom properties.
- `docs/brand/tokens/`: Canonical Brand Kit v2 tokens (`brand.tokens.json`, `brand.css`, `tailwind-v4-theme.css`).
- `app/layout.tsx`: Root HTML shell loading `Geist` and `Geist_Mono` via `next/font/google` and establishing metadata.

### 2.2 Page Hierarchy & Client/Server Boundaries
- `app/page.tsx`: Entire homepage is wrapped in `"use client"` and `<ConversationProvider>` due to interactive conversation state and client-rendered sections.
- `app/products/page.tsx`: Server Component rendering `<ProductsPageExperience />` (client component).
- `app/ShortSaver/privacy-policy/page.tsx`: Isolated utility policy page.
- `app/design-lab/`: Archived visual experiments (Round 3 Antigravity/Claude/Codex/Synthesis and Round 4 products build).

### 2.3 Section Components
| Section | Component File | Client/Server | Interactive Mechanism | Known UX Defect |
|---|---|---|---|---|
| **Header** | `components/layout/header.tsx` | Client | Mobile menu state, theme toggle, conversation trigger | Logo link accessible name, "Ventures" nav label mismatch with section title |
| **Hero** | `components/hero/portfolio-hero.tsx`<br>`components/hero/portfolio-conversation-entry.tsx` | Client | Embedded AI input and suggested prompt pills | Competing focus, dual DOM representation in previous audit, 10px sub-labels |
| **Ventures** | `components/sections/ventures-section.tsx`<br>`components/sections/social-ai-workflow.tsx` | Client | Channel links, capability list, workflow accordion | Duplicate PostgreSQL/Prisma copy, duplicate workflow + capabilities display, missing product visual |
| **Products** | `components/sections/products-section.tsx`<br>`components/sections/product-evidence.tsx` | Client | Active product selector tab | Only active product details rendered in SSR DOM; generic themefic.com links |
| **How I Build** | `components/sections/pipeline-section.tsx` | Client | 8-stage selector with progress bar | 8 vertical tabs feel heavy; only active stage rendered in initial HTML |
| **Engineering** | `components/sections/engineering-section.tsx` | Client | 7-domain tab selector | 7 cards with nested sub-lists; DOM excludes inactive domains |
| **Journey** | `components/sections/journey-section.tsx` | Server/Static | Chronological milestone timeline | Hardcoded "2023 - 2026" instead of "Present"; all eras have equal visual weight |
| **Contact** | `components/sections/contact-section.tsx` | Client | Direct mail link and conversation button | Secondary email action; could be cleaner and full-width |
| **Footer** | `components/layout/footer.tsx` | Server/Static | Direct email, social links, back-to-top | `aria-label="Direct Email"` causes WCAG 2.5.3 label mismatch |

### 2.4 Data Layer (`data/`)
- `data/profile.ts`: Canonical personal details (M Hemel Hasan, Product Engineer, Dhaka, hello@mhemelhasan.com).
- `data/ventures.ts`: Social AI (Private Beta) and Support AI specifications.
- `data/products.ts`: 6 Themefic commercial products (3 featured, 3 compact).
- `data/pipeline.ts`: 8 product-engineering delivery stages.
- `data/engineering.ts`: 7 technical domains.
- `data/journey.ts`: Career milestones from 2015 to Present.

---

## 3. Baseline Audit Results (Tool Output)

### 3.1 Page Heights (Measured in Headless Chromium)
| Page / Viewport | 390px (Mobile) | 768px (Tablet) | 1440px (Desktop) | Target Height (Desktop) |
|---|---|---|---|---|
| **Homepage** (`/`) | **14,638 px** | **12,015 px** | **9,252 px** | **~5,100 – 6,000 px** (-35% to -45%) |
| **Products Page** (`/products`) | **8,025 px** | **5,768 px** | **4,442 px** | **~2,800 – 3,200 px** |

### 3.2 Lighthouse Audit Baseline (v12)
| Page & Device | Performance | Accessibility | Best Practices | SEO | Agentic Browsing |
|---|---|---|---|---|---|
| **Homepage (Mobile)** | **92** | **96** | **100** | **100** | **100** |
| **Homepage (Desktop)** | **100** | **96** | **100** | **100** | **100** |
| **Products (Mobile)** | **98** | **100** | **100** | **100** | **100** |
| **Products (Desktop)** | **100** | **100** | **100** | **100** | **100** |

### 3.3 Axe-Core Violations Baseline (WCAG 2.1 AA)
Axe-core run across all viewports and themes uncovered **2 primary violation categories**:

1. **`color-contrast` (Serious)**:
   - **Status Beta Chip**: `<span class="inline-flex min-h-7 ... border-status-beta/35 bg-status-beta/10 text-status-beta">` uses `#b45309` on `#FAF9F6` (~3.9:1 contrast, failing 4.5:1 requirement).
   - **Dark Cards / Overlays**: `.text-white/75` against muted translucent card backgrounds fails 4.5:1.
   - **Dark Mode Primary Cobalt**: In dark mode, components applying `.text-brand-primary` (`#315CF5`) against canvas (`#090b11`) achieve only **3.2:1** contrast. Dark mode must use `--accent-sky` (`#6685FF`) which achieves **7.4:1**.
   - **Dark Mode Muted Text**: `.text-text-muted` (`#64748b` in dark mode) achieves **3.8:1**, failing 4.5:1.

2. **`label-content-name-mismatch` (Serious - WCAG 2.5.3)**:
   - **Footer Email Link**:
     ```html
     <a href="mailto:hello@mhemelhasan.com" aria-label="Direct Email">
       hello@mhemelhasan.com
     </a>
     ```
     The visible text `hello@mhemelhasan.com` does not match the `aria-label="Direct Email"`, breaking speech navigation and assistive technology expectations.

### 3.4 Typography Audit
- **Current Font Sizes Detected**: `10px`, `12px`, `14px`, `16px`, `18px`, `20px`, `24px`, `30px`, `36px`, `48px`, `60px`, `91.2px`.
- **Violations against Design System (Guide Section 3)**:
  - `10px` (`.font-mono.text-[10px]`): Stage numbers in hero (`01` through `05`) — banned under "meta never below 13px".
  - `12px` (`text-xs`): Used heavily in metadata badges, category indicators, and timestamps — violates the 13px minimum rule.
  - Scale needs harmonization to: `72 / 48 / 32 / 24 / 18 / 16 / 14` (Desktop) with body ≥ 16px and meta ≥ 13px.

---

## 4. Verification of Known Backlog Issues

| # | Known Issue | Live / Repo Verification Status | Target Remediation Phase |
|---|---|---|---|
| **1** | No product visuals anywhere | Verified: Only `public/assets/avatar.jpg` exists. Zero screenshots in repo. | Phase 3 (Ventures) & Phase 4 (Products) |
| **2** | Tabbed/step content missing from initial HTML (SSR) | Verified: Server-rendered HTML only contains active tab content. Inactive tabs are not rendered in DOM. | Phase 4 (Products) & Phase 5 (How I Build / Engineering) |
| **3** | Nav says "Ventures"; section title says "What I'm building" | Verified: Header nav link is `"Ventures"`, section H2 is `"What I'm building"`. | Phase 2 (Header) & Phase 3 (Ventures) |
| **4** | Leaked internal copy ("verified commercial releases", "verified scope", etc.) | Verified: Located in `products-portfolio.tsx:161`, `products-section.tsx:134`, and `support-ai-response.tsx:41`. | Phase 3, Phase 4, Phase 5 |
| **5** | PostgreSQL/Prisma sentence appears twice in Social AI | Verified: Appears in `data/ventures.ts:21` (summary) and `data/ventures.ts:77` (capabilities). | Phase 3 (Ventures) |
| **6** | Social AI has duplicate workflow + capability list | Verified: Section renders both `<SocialAIWorkflow />` and a 6-item `<dl>` of capabilities. | Phase 3 (Ventures) |
| **7** | "Ask Hemel" reads as human; no direct email CTA in hero | Verified: Header button says "Ask Hemel"; hero entry says "Ask about the work"; no primary mailto CTA. | Phase 2 (Header & Hero) |
| **8** | Product links all point to generic `themefic.com` | Verified: Every product in `data/products.ts` uses `companyUrl: "https://themefic.com"`. | Phase 4 (Products) |
| **9** | `/products` meta og:title and description repeat homepage | Verified: `app/products/page.tsx` lacks `openGraph` and `twitter` overrides, inheriting homepage values. | Phase 4 (/products) |
| **10** | Header logo images have empty alt | Verified: Header logo SVGs have `alt="" aria-hidden="true"`; link relies solely on `aria-label`. | Phase 2 (Header) |
| **11** | Accessibility omissions: visible focus, 44px targets, ARIA tabs, skip link | Verified: No skip link in `app/page.tsx`; tabs use button groups with `aria-pressed` instead of ARIA tablist/tabpanel pattern. | Phase 1, Phase 2, Phase 5, Phase 7 |

---

## 5. Architectural Risks & Guardrails

1. **Brand Identity Non-Negotiable**:
   - `public/brand/logo/` and `public/brand/monogram/` (Concept C) cannot be redrawn or replaced. Layout must flex around the logo geometry.
2. **Tailwind v4 Token Compatibility**:
   - The project uses Tailwind v4 `@theme` in `app/globals.css`. New tokens must be declared in both `@theme` and as CSS variables for light/dark mode without introducing conflicting utility classes.
3. **Immersive AI Chat Behaviour**:
   - The AI conversation context and drawer (`components/conversation/`) must remain functional and decoupled from visual section refactoring.
4. **Content & SEO Integrity**:
   - URLs, canonical structure, metadata base, and factual attributions must remain stable.

---

## 6. Proposed Phase Implementation Plan

- **Phase 1: Tokens and Base Components**
  - Define unified tokens (typography scale, light/dark neutral ramp, single accent, 8px spacing, radius, focus outline).
  - Create reusable, accessible base primitives: `Button` (primary filled, secondary outline, text link; min 44px), `Link`, `Chip` (neutral, ≥ 13px), `Card` (single radius/border, no nested cards), `SectionHeader` (left-aligned H2 + description), and a unified skip link.
- **Phase 2: Header and Hero**
  - Add Skip Link to top of page.
  - Fix header navigation ("Ventures" aligned, accessible logo name, clear AI assistant indicator, primary `mailto:` CTA).
  - Redesign Hero: Big name, one-sentence positioning, 2 clear CTAs (View work, Email me), collapsed secondary AI entry, single consistent Founder line, eliminate 10px text.
- **Phase 3: Ventures (Social AI + Support AI)**
  - Align section heading with navigation.
  - Social AI: Merge workflow and capability lists into ONE horizontal 5-step row (Research, Brand Voice, Creation, Scheduling, Publishing). Add visual preview slot. Remove duplicate PostgreSQL/Prisma copy.
  - Support AI: Slim secondary row with 3 planned channels.
- **Phase 4: Products and `/products`**
  - Transform product section into case-study cards (visual preview slot, problem, contribution, max 4 neutral chips, specific story link).
  - Render all products in DOM for SSR crawlability while cleanly structuring the active view.
  - Add specific product URLs where available or replace generic links with clear case-study storytelling.
  - Fix `/products` page metadata (`openGraph` and `twitter`).
- **Phase 5: How I Build and Engineering Depth**
  - How I Build: Compress 8 vertical tabs into an accessible horizontal strip or numbered process with expandable details. Full ARIA tabs/accordion pattern.
  - Engineering Depth: Replace 7 nested cards with a compact, scannable capabilities list (one line each, no card-in-card).
  - Ensure all items render in SSR HTML for search indexing.
- **Phase 6: Journey, Contact, Footer**
  - Journey: Slim timeline. Replace "2023 - 2026" with "Present". Visually emphasize the two active roles.
  - Contact: Full-width calm layout, prominent email link, secondary channels.
  - Footer: Clean layout, fix `label-content-name-mismatch` on email link.
- **Phase 7: Quality Pass & Acceptance Verification**
  - Full suite re-run: Lighthouse (all viewports), Axe-core (0 serious/critical), keyboard-only tab navigation, 200% zoom, 320px responsive check, prefers-reduced-motion validation.
  - Page height verification (measuring against 9,252px baseline for 35-45% reduction).

---

## 7. Questions & Decisions for the Owner (Inputs Block)

To ensure the redesign matches your exact preferences, please confirm the following:

1. **Design Direction**: Guide recommends **Direction C with A's restraint** (Product-studio clarity with editorial whitespace and typography). Please confirm if you approve this default.
2. **Reference Sites**: Are there 2–3 specific portfolio or product websites you want to borrow layout cues from (e.g. Linear, Stripe, aaabadcode.com, Paco Coursey)?
3. **Primary Visitor Goal**: Is the primary intended visitor action **"Send a project inquiry by email"** (linking to `mailto:hello@mhemelhasan.com`)?
4. **Product Visuals**: Since no product screenshots currently exist in `public/assets/`, do you prefer that we design crisp, high-fidelity SVG/code illustrations for Social AI and the featured Themefic products (labeled "Illustrative preview"), or will you supply PNG screenshots?
5. **Product URLs**: Currently, all 6 products link to `https://themefic.com`. Do direct product pages exist on themefic.com (e.g. `https://themefic.com/instantio`), or should we remove the external links and focus the cards on portfolio storytelling?

---

*Phase 0 Reconnaissance completed. Awaiting owner review and approval to begin Phase 1.*
