# Brand Theme Token Map & Centralized Rebranding Architecture

This document defines the semantic design token architecture for **MHemelHasan.com** (`v3-brand/`). It guarantees that when the final personal brand logo and color palette are chosen, the entire site can be rebranded centrally from a single configuration file without hunting through individual components.

---

## 1. Where Theme Colors Are Defined

All theme colors, semantic variables, and surface layers are centralized in a single file:
- **File**: `v3-brand/app/globals.css`
- **Tailwind v4 Integration**: `@theme` directive (lines 3–27) registers CSS variables directly into the Tailwind utility engine (`bg-canvas`, `text-text-primary`, `bg-accent-sky`, `bg-brand-primary`, etc.).

### Light Theme (Default)
Defined inside `:root` block (lines 28–59 of `globals.css`):
```css
:root {
  color-scheme: light;

  --bg-canvas: #f8f9fb;
  --bg-canvas-subtle: #f1f3f7;
  --bg-surface-card: #ffffff;
  --bg-surface-nested: #f1f4f8;
  --bg-surface-interactive: #e5eaf2;

  --border-subtle: rgba(15, 23, 42, 0.08);
  --border-interactive: rgba(15, 23, 42, 0.14);
  --border-accent: rgba(2, 132, 199, 0.35);

  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #64748b;

  --accent-sky: #0284c7;
  --accent-blue: #2563eb;
  --accent-indigo: #4f46e5;
  --accent-soft: rgba(2, 132, 199, 0.08);

  --brand-primary: var(--accent-sky);
  --brand-secondary: var(--accent-blue);
  --brand-soft: var(--accent-soft);

  --status-beta: #b45309;
  --status-live: #059669;

  --bg-radial-1: rgba(2, 132, 199, 0.06);
  --bg-radial-2: rgba(79, 70, 229, 0.03);
  --bg-dots: rgba(15, 23, 42, 0.035);
  --shadow-ambient: 0 4px 20px -2px rgba(15, 23, 42, 0.06);
}
```

### Dark Theme
Defined inside the `.dark` class block (lines 62–94 of `globals.css`):
```css
.dark {
  color-scheme: dark;

  --bg-canvas: #090b11;
  --bg-canvas-subtle: #0d1017;
  --bg-surface-card: #111520;
  --bg-surface-nested: #161c2b;
  --bg-surface-interactive: #1f273d;

  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-interactive: rgba(255, 255, 255, 0.16);
  --border-accent: rgba(56, 189, 248, 0.35);

  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;

  --accent-sky: #38bdf8;
  --accent-blue: #3b82f6;
  --accent-indigo: #6366f1;
  --accent-soft: rgba(56, 189, 248, 0.12);

  --brand-primary: var(--accent-sky);
  --brand-secondary: var(--accent-blue);
  --brand-soft: var(--accent-soft);

  --status-beta: #f59e0b;
  --status-live: #10b981;

  --bg-radial-1: rgba(56, 189, 248, 0.09);
  --bg-radial-2: rgba(99, 102, 241, 0.05);
  --bg-dots: rgba(255, 255, 255, 0.04);
  --shadow-ambient: 0 4px 20px -2px rgba(0, 0, 0, 0.5);
}
```

---

## 2. Token Categories & Role Mapping

### A. Primary Brand / Accent Tokens
These tokens control Hemel's personal identity, active navigation highlights, focus rings, primary interactive icons, and conversational badges:
- `--brand-primary` / `--accent-sky`: Primary brand color (`#0284c7` in light, `#38bdf8` in dark). Used for hero accent titles, active state indicators, primary action icons, interactive links, focus rings, selection color, and assistant identity badges.
- `--brand-secondary` / `--accent-blue`: Secondary brand accent (`#2563eb` in light, `#3b82f6` in dark). Used for gradient endpoints and secondary interactive states.
- `--brand-soft` / `--accent-soft`: Brand tinted surface/glow (`rgba(2, 132, 199, 0.08)` in light, `rgba(56, 189, 248, 0.12)` in dark). Used for badge pill backgrounds, active prompt pill fills, assistant avatar background, and selection background.
- `--border-accent`: High-contrast accent border (`rgba(2, 132, 199, 0.35)` in light, `rgba(56, 189, 248, 0.35)` in dark). Used for focused cards, active conversation query bubbles, and highlighted venture borders.
- `--bg-radial-1`: Brand ambient glow for the root page background mesh.

### B. Canvas & Surface Tokens
These tokens create depth, card elevation, and visual hierarchy without hardcoded neutrals:
- `--bg-canvas`: The deepest viewport background (`#f8f9fb` light / `#090b11` dark).
- `--bg-canvas-subtle`: Secondary canvas backdrop for sunken areas or sticky header (`#f1f3f7` light / `#0d1017` dark).
- `--bg-surface-card`: Primary elevated surface for portfolio cards, conversation modal, and major sections (`#ffffff` light / `#111520` dark).
- `--bg-surface-nested`: Nested container surface inside cards for specs, metrics, code snippets, and inner modules (`#f1f4f8` light / `#161c2b` dark).
- `--bg-surface-interactive`: Hover state fill for buttons, prompt chips, and interactive list items (`#e5eaf2` light / `#1f273d` dark).

### C. Typography Tokens
All text colors reference semantic contrast tokens to maintain WCAG AA compliance across both modes:
- `--text-primary`: Primary headings, titles, active labels, body copy (`#0f172a` light / `#f8fafc` dark).
- `--text-secondary`: Supporting sentences, product descriptions, secondary meta info (`#475569` light / `#94a3b8` dark).
- `--text-muted`: Footnotes, micro-labels, timestamps, inactive icons (`#64748b` in both modes).

### D. Border Tokens
- `--border-subtle`: Subtle separation borders between list items or sub-elements (`rgba(15, 23, 42, 0.08)` light / `rgba(255, 255, 255, 0.08)` dark).
- `--border-interactive`: Standard component perimeter borders for cards, buttons, inputs (`rgba(15, 23, 42, 0.14)` light / `rgba(255, 255, 255, 0.16)` dark).

---

## 3. Semantic Colors That Must NOT Automatically Follow the Brand Palette

The following colors are semantically independent from M Hemel Hasan's personal brand color and **must remain untouched** during a rebrand:

1. **Venture & Status Indicators**:
   - `--status-beta` (`#b45309` light / `#f59e0b` dark): Communicates lifecycle state ("Private Beta" for Social AI). Amber conveys early access, non-public status.
   - `--status-live` (`#059669` light / `#10b981` dark): Communicates production commercial status ("Live in Production", "Active Commercial", active server status).
2. **Third-Party Platform Brand Colors**:
   - LinkedIn: `border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400`
   - Facebook Page: `border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400`
   - X / Twitter: `border-slate-500/20 bg-slate-500/10 text-slate-700 dark:text-slate-300`
   - Shopify: `border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400`
   - Webflow: `border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400`
   - WordPress: `border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400`
3. **Product Section Archetype Accents**:
   - The Commerce/ThemeFIC section uses emerald (`text-emerald-600`, etc.) as an intentional product domain color representing revenue, store commerce, and live customer installs.
   - The Pipeline/Support AI section uses purple/violet as an intentional exploration domain color representing next-generation AI agents.
4. **Theme Toggle Icons**:
   - Sun icon: Amber-400 (`#fbbf24`)
   - Moon icon: Slate-700 / Slate-200

---

## 4. Hardcoded Color Inventory & Classification

All 18 TSX component files were scanned and classified into four buckets:

| Classification | Examples in Codebase | Purpose & Rebrand Behavior |
| :--- | :--- | :--- |
| **A. Personal Brand / Accent** | `var(--accent-sky)`, `var(--brand-primary)`, `var(--accent-soft)` | **Centralized**. Defined in `globals.css`. Automatically updates 100% of brand accents. |
| **B. Semantic Status** | `var(--status-beta)`, `var(--status-live)` | **Independent**. Defined in `globals.css`. Stays amber/green to preserve meaning. |
| **C. Neutral Surfaces & Text** | `var(--bg-canvas)`, `var(--text-primary)`, etc. | **Centralized**. Defined in `globals.css`. Adjust only if background warmth/coolness changes. |
| **D. One-off Platform / Domain** | LinkedIn, Facebook, X, Shopify, Webflow badges | **Intentional**. Preserves recognizable 3rd-party platform identities. |

---

## 5. Can Future Brand Colors Be Changed Centrally?

### Verdict: **YES**

Because:
1. All core accents, interactive hover rings, focus outlines, selection colors, assistant badges, and category highlights inherit from `var(--accent-sky)` / `var(--brand-primary)`.
2. All surfaces (`bg-canvas`, `bg-surface-card`, `bg-surface-nested`, `bg-surface-interactive`) inherit from centralized CSS variables.
3. No personal brand colors remain hardcoded in component files (the single stray `hover:bg-sky-400` in `ventures-section.tsx` and badge classes in `engineering-section.tsx` have been normalized to semantic tokens).

---

## 6. Exact Future Rebrand Procedure

When M Hemel Hasan's final personal-brand logo and color palette are finalized, perform this exact 4-step procedure:

### Step 1: Open `v3-brand/app/globals.css`
Navigate to the `:root` block (line 44) and replace the brand accent values:
```css
/* Replace these with the new Light Theme brand palette */
--accent-sky:    <NEW_PRIMARY_HEX>;        /* e.g. #0d9488 for teal or #7c3aed for violet */
--accent-blue:   <NEW_SECONDARY_HEX>;      /* e.g. #0284c7 */
--accent-soft:   rgba(<NEW_RGB>, 0.08);   /* Matching 8% opacity tint */
--border-accent: rgba(<NEW_RGB>, 0.35);   /* Matching 35% opacity border */
--bg-radial-1:   rgba(<NEW_RGB>, 0.06);   /* Matching 6% ambient glow */
```

### Step 2: Update Dark Theme in `v3-brand/app/globals.css`
Navigate to the `.dark` block (line 78) and replace the corresponding high-contrast dark values:
```css
/* Replace these with the new Dark Theme brand palette (higher luminance) */
--accent-sky:    <NEW_PRIMARY_DARK_HEX>;   /* e.g. #2dd4bf for teal or #a78bfa for violet */
--accent-blue:   <NEW_SECONDARY_DARK_HEX>; /* e.g. #38bdf8 */
--accent-soft:   rgba(<NEW_RGB_DARK>, 0.12); /* Matching 12% opacity tint */
--border-accent: rgba(<NEW_RGB_DARK>, 0.35); /* Matching 35% opacity border */
--bg-radial-1:   rgba(<NEW_RGB_DARK>, 0.09); /* Matching 9% ambient glow */
```

### Step 3: Verify Contrast & Run QA
```bash
cd v3-brand
npm run build
npx tsc --noEmit
```
Open in browser, toggle light and dark modes, and verify WCAG AA compliance on text over `--bg-canvas` and `--bg-surface-card`.

### Step 4: Done
**No component-by-component recoloring is required.** Every interactive button, link, active prompt, selection highlight, focus ring, assistant badge, and modal border updates across the entire site instantly.
