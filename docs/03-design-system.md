# V3 Brand Rebuild — Design System & Visual Specification

**Document ID:** `03-design-system.md`  
**Author:** Antigravity (Pair Programming with M Hemel Hasan)  
**Date:** September 2026  
**Status:** Baseline interaction specification — brand identity finalized in Brand Kit v2.0

---

> **Canonical brand source:** `docs/brand/AGENT_BRAND_CONTEXT.md` and
> `docs/brand/BRAND_GUIDELINES.md` supersede earlier provisional logo, color,
> and typography decisions in this document.

## 1. Visual Philosophy: Interactive, Human & Product-Oriented

The visual target for V3 is inspired by the interaction quality, fluid warmth, and tactile engagement of **`aaabadcode.com`** while establishing an original, authentic aesthetic for M Hemel Hasan.

### Foundational Tenets:
1. **Interactive Curiosity over Static Monologue:** The site invites the visitor to touch, click, ask, and explore. Every interactive element (prompt chips, tabs, cards, inputs) feels responsive and satisfying.
2. **Avoid Formulaic "Hacker" Clichés:** We explicitly avoid the trap of equating "senior engineer" with an all-black screen, neon cyan accents, ubiquitous monospace fonts, and giant empty voids. The site has visual warmth, subtle depth, and clear personality.
3. **Designed, Not Bare:** It avoids the opposite extreme of an empty white page with three lines of unstyled text. It feels considered, crafted, and complete.
4. **Canonical Brand Foundation:** Brand Kit v2.0 defines the approved Concept C identity, warm-neutral palette, deep cobalt accent, Geist Sans, and Geist Mono.

---

## 2. Color Strategy & Palette Tokens

The finalized brand system uses warm neutrals as the foundation and cobalt as a controlled identity and interaction color. Runtime mappings live in `app/globals.css`; canonical source values live in `docs/brand/tokens/`.

### 2.1 Color Tokens

| Brand Token | Final Value | Usage & Role |
| :--- | :--- | :--- |
| `--brand-primary` | `#315CF5` | Primary cobalt identity and action color. |
| `--brand-primary-hover` | `#264AC9` | Cobalt hover and active state. |
| `--brand-primary-soft` | `#EEF2FF` | Soft brand-tinted interaction surface. |
| `--brand-ink` | `#111318` | Primary light-theme text and logo ink. |
| `--brand-muted` | `#646A73` | Secondary and muted text. |
| `--brand-bg` | `#FAF9F6` | Warm light-theme canvas. |
| `--brand-surface` | `#FFFFFF` | Elevated light-theme surface. |
| `--brand-border` | `#E6E2DC` | Warm neutral border. |

The Brand Kit does not define a complete dark palette. Existing dark neutral
surfaces remain as an application-level theme, while branded assets and
interactions stay anchored to the cobalt identity. See
`docs/brand/INTEGRATION_NOTES.md` for the accessibility mapping.

---

## 3. Typography Strategy

We pair Geist Sans for display headings and body copy with Geist Mono used strictly for code snippets, technical metadata, IDs, and system values.

### 3.1 Typeface Families
- **Display & Headings:** `Geist Sans` — weights: 600 (Semi-Bold), 700 (Bold), 800 (Extra-Bold).
- **Body & Prose:** `Geist Sans` — weights: 400 (Regular), 500 (Medium).
- **Code & Micro-Tags:** `Geist Mono` — weights: 500 (Medium). Used selectively for file paths, technical metadata, IDs, and stage numbering.

### 3.2 Typographic Hierarchy Scale

| Element | Size (Desktop) | Size (Mobile) | Weight / Font |
| :--- | :--- | :--- | :--- |
| **Hero Name** | `44px` – `52px` | `32px` – `36px` | 800 / Sans |
| **Hero Title / Positioning** | `22px` – `26px` | `18px` – `20px` | 600 / Sans |
| **Section Title H2** | `32px` – `38px` | `24px` – `28px` | 700 / Sans |
| **Card Heading H3** | `20px` – `24px` | `18px` – `20px` | 600 / Sans |
| **Standard Body** | `15px` – `16px` | `15px` | 400 / Sans |
| **Prompt Chip Text** | `14px` | `13px` | 500 / Sans |
| **Metadata / Badge** | `12px` – `13px` | `12px` | 600 / Sans or Mono |

---

## 4. Tactile UI Components: Prompt Chips & Conversational Shell

Inspired by the tactile interaction quality of `aaabadcode.com`, prompt chips and inputs are core design-system primitives:

### 4.1 Suggested Prompt Chips
- **Geometry:** Pill or rounded squircle (`rounded-full` or `rounded-xl`), padding `8px 16px`.
- **States:**
  - *Default:* Subtle border (`1px solid var(--border-subtle)`), background `var(--bg-surface-nested)`, text `var(--text-secondary)`.
  - *Hover:* Background `var(--bg-interactive)`, border `var(--border-interactive)`, text `var(--text-primary)`, slight vertical lift (`translateY(-1px)`).
  - *Active / Pressed:* Scale `0.98` for tactile feedback.
- **Icons:** Small, friendly line icon on the left (16px) with a short, inviting label.

### 4.2 Conversational Input Field
- **Geometry:** Full-width rounded container (`rounded-full` or `rounded-2xl`), height `52px` – `56px`.
- **Atmosphere:** Subtle frosted glass effect (`backdrop-blur-md`), background `var(--bg-surface-elevated)`, border `1px solid var(--border-interactive)`.
- **Action Button:** Circular submit button on the right with a clean arrow icon, highlighting smoothly when text is entered.

---

## 5. Surfaces, Cards & Progressive Disclosure

### 5.1 Card Hierarchy
1. **Base Surface:** Flat background for content groups.
2. **Elevated Card:** Standard card surface for ventures and products (`12px` – `16px` border-radius, 1px border).
3. **Rich Response Surface:** Conversational responses render as self-contained cards with clear headers, tags, challenge/solution points, and action links.

### 5.2 Progressive Disclosure
To keep the page from feeling like an overwhelming text wall:
- Cards highlight primary points upfront with expandable toggles (`View Architecture Details`, `Explore Pipeline Stage`).
- Conversational interactions allow users to pull specific information on demand.

---

## 6. Motion & Interaction Principles

### 6.1 Purposeful Motion
- **Speed & Snappiness:** Micro-interactions (chip hovers, button clicks, tab switches) execute quickly (`150ms` – `200ms` ease-out).
- **Smooth Page Transitions:** Conversational card expansions and section reveals use fluid easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Avoid:**
  - Constant floating background blobs or infinite rotation.
  - Distracting custom cursor trails.
  - Heavy particle systems that cause laptop fans to spin.
  - Slow introductory animations that make visitors wait before seeing content.

### 6.2 Reduced Motion Compliance (`prefers-reduced-motion: reduce`)
- All animations, transitions, and slide-in transforms are disabled or set to `0ms`.
- Conversational responses appear immediately with zero delay.
- The interface remains fully functional and visually complete.

---

## 7. Mobile-First Ergonomics

- **Touch Friendly:** All chips, buttons, and input targets adhere to a minimum `44px` touch height.
- **Prompt Wrap:** Prompt chips wrap smoothly on mobile screens or scroll horizontally with a subtle fade mask.
- **Zero Horizontal Overflow:** Strict containment prevents horizontal jitter.
- **Keyboard Handling:** Virtual keyboard appearance on mobile does not obscure the active conversation thread.
