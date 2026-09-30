# V3 Brand Rebuild — Design System & Visual Specification

**Document ID:** `03-design-system.md`  
**Author:** Antigravity (Pair Programming with M Hemel Hasan)  
**Date:** September 2026  
**Status:** Draft — Pending Final Review

---

## 1. Visual Philosophy: Interactive, Human & Product-Oriented

The visual target for V3 is inspired by the interaction quality, fluid warmth, and tactile engagement of **`aaabadcode.com`** while establishing an original, authentic aesthetic for M Hemel Hasan.

### Foundational Tenets:
1. **Interactive Curiosity over Static Monologue:** The site invites the visitor to touch, click, ask, and explore. Every interactive element (prompt chips, tabs, cards, inputs) feels responsive and satisfying.
2. **Avoid Formulaic "Hacker" Clichés:** We explicitly avoid the trap of equating "senior engineer" with an all-black screen, neon cyan accents, ubiquitous monospace fonts, and giant empty voids. The site has visual warmth, subtle depth, and clear personality.
3. **Designed, Not Bare:** It avoids the opposite extreme of an empty white page with three lines of unstyled text. It feels considered, crafted, and complete.
4. **Provisional Palette Notice:** The token values below are a solid, cohesive starting baseline for development, but are **provisional** and will be tuned during the Phase 1A visual review.

---

## 2. Color Strategy & Palette Tokens (Provisional)

The revised color system balances deep, refined tones with accessible contrast and warm, tactile interactive states.

### 2.1 Color Tokens

| Token Name | Provisional Value | Usage & Role |
| :--- | :--- | :--- |
| `--bg-canvas` | `#0B0D13` | Deep, dark charcoal-slate canvas (warm neutral base, avoiding harsh pure black). |
| `--bg-surface-elevated` | `#131620` | Elevated container cards, chat conversation shell, and prompt bar. |
| `--bg-surface-nested` | `#1A1E2C` | Nested cards, rich response blocks, code/manifest areas, and active tabs. |
| `--bg-interactive` | `#23283B` | Interactive button fills, chip hover states, and input field backgrounds. |
| `--border-subtle` | `rgba(255, 255, 255, 0.08)` | Crisp 1px structural hairline borders on cards and dividers. |
| `--border-interactive` | `rgba(255, 255, 255, 0.16)` | Borders for prompt chips, hovered cards, and active focus boundaries. |
| `--text-primary` | `#F1F3F7` | Primary headlines, identity, active prompt text, and card titles. |
| `--text-secondary` | `#9BA3B4` | Explanatory prose, body descriptions, response text, and metadata. |
| `--text-muted` | `#636D82` | Kickers, attribution headers, timestamps, and inactive tab labels. |
| `--accent-primary` | `#3B82F6` / `#38BDF8` | Friendly, confident blue/sky accent for active indicators, submit button, and live status. |
| `--accent-subtle` | `rgba(59, 130, 246, 0.12)` | Background tint for selected chips and active badges. |
| `--status-live` | `#10B981` | Emerald green pulse for live venture status (Social AI). |

---

## 3. Typography Strategy

We pair an approachable, contemporary geometric sans-serif for display headings and body copy with a clean monospace face used strictly for code snippets and technical tags.

### 3.1 Typeface Families
- **Display & Headings:** `Plus Jakarta Sans` or `Inter` — weights: 600 (Semi-Bold), 700 (Bold), 800 (Extra-Bold).
- **Body & Prose:** `Inter` — weights: 400 (Regular), 500 (Medium). Clean letter tracking and generous line height for effortless reading.
- **Code & Micro-Tags:** `JetBrains Mono` — weights: 500 (Medium). Used selectively for file paths, tech tags, and stage numbering (not forced across the entire UI).

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
