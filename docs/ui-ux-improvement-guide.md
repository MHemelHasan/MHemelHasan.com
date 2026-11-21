# UI/UX Improvement Guide: M Hemel Hasan Portfolio

Goal: move the site from "generated template" to "designed product." Same content and facts, a clearer hierarchy, real proof, and fewer visual devices.

---

## 1. Design Direction (decide before any code)

**Positioning:** a senior product engineer who ships real products. The design should feel calm, precise and confident, like an engineer with taste, not a SaaS landing page.

**Three principles**
1. **One idea per screen.** Each section answers a single question ("what do you build?", "how do you work?", "can I trust you?").
2. **Proof over description.** Every product shows a screenshot, a number or a live link before any paragraph.
3. **Restraint.** One accent colour, two font families, one card style. Cut anything decorative that carries no information.

**Pick one personality and stick to it** (choose and tell the agent):
- A. Editorial / quiet: large serif or grotesk headings, lots of whitespace, black/white plus one accent.
- B. Technical / precise: mono accents, grid lines, dense but ordered, dark or light.
- C. Product-studio: big product visuals, soft neutral background, bold headings.

Recommendation: **A or C**. B risks looking like another dev-template.

---

## 2. Page Structure (restructure, then restyle)

| Current | Problem | Proposed |
|---|---|---|
| Hero with tiny avatar, AI search box, 7 chips | No clear primary action, chips compete | Big name + one-sentence value line + 2 CTAs (View work, Contact). AI box becomes a secondary, collapsed "Ask my portfolio" element |
| Ventures (Social AI, Support AI) | Dense text, no visuals | 2 large feature rows: screenshot/product visual on one side, 3-line summary, 1 metric, 1 link |
| Products Led & Shipped (3 long cards + list) | Walls of text, repeated micro-sections | Case-study cards: image, one-line problem, one-line result, stack chips (max 4), "Read case study" |
| How I Build (8 tabs) | Tiny tabs, heavy for a skim reader | Horizontal 4–5 step strip or simple numbered list. Details only on expand |
| Engineering Depth (7 cards, nested sub-cards) | Redundant with products, card-in-card | Merge into a compact "Capabilities" list (7 rows, 1 line each) or cut to a skills strip |
| Builder Journey (6 cards) | Same weight for every role | Slim timeline: year, role, company, one line. Highlight only the 2 current roles |
| Contact card | Fine, but cramped | Large email link, 2 secondary links, full-width section |

Target: reduce total page length by **35–45%**.

---

## 3. Visual System (hand these tokens to the agent)

### Typography
- Max **2 families** (e.g. one display or grotesk + one mono for labels only).
- Scale (desktop): 72 / 48 / 32 / 24 / 18 / 16 / 14. **Body never below 16px, meta never below 13px.**
- Line height: body 1.6, headings 1.1–1.2. Line length 60–75 characters.
- Remove the all-caps tracked 9–10px eyebrow labels from every section. Keep at most one style, used sparingly.

### Colour
- Neutral ramp (background, surface, border, text-muted, text) plus **one accent**.
- Replace the rainbow of badge colours with neutral chips. Use colour only for status (live, in progress).
- Text contrast: body ≥ 7:1 where possible (minimum 4.5:1), muted text ≥ 4.5:1, borders/icons ≥ 3:1.
- Define light and dark tokens together if both are supported.

### Spacing and layout
- 8px base scale: 4, 8, 16, 24, 32, 48, 64, 96, 128.
- Section vertical padding: 96–128px desktop, 64px mobile.
- Container: 1120–1200px max. Content currently feels squeezed into a narrow column, so use the width with a 12-column grid.
- Alternate layouts between sections (split, full-width, list). Do not repeat centered-heading-then-cards six times.

### Components (one definition each)
- **Card:** one radius, one border, no shadow or a single soft shadow. No cards inside cards.
- **Chip/tag:** neutral, 13px, max 4 per card.
- **Button:** primary (filled), secondary (outline), text link. Min height 44px.
- **Link:** underline or clear colour change, visible focus ring.
- **Section header:** left-aligned H2 plus a one-line description. Drop the pill eyebrow.

### Motion
- 150–250ms ease-out for hover/expand only. Respect `prefers-reduced-motion`. No decorative animation.

---

## 4. Content Fixes (UX writing)

- Replace vague phrases ("Proprietary software conceived, architected, and engineered from the ground up") with specifics: *what it does, for whom, result*.
- Each product: **Problem → What I built → Outcome**, maximum 3 short lines.
- Add numbers wherever true (merchants, installs, load time, revenue, team size).
- Make CTAs specific: "View Bundlefic case study", not "See how it works".
- Cut repeated words ("architected", "engineered", "production") to once per section.

---

## 5. Accessibility Requirements (must-pass)

- Contrast: all text ≥ 4.5:1, UI components ≥ 3:1.
- Touch/click targets ≥ 44×44px (tabs, chips-as-buttons, social icons, nav).
- Visible focus indicator on every interactive element (2px outline + offset).
- Keyboard: skip link, logical tab order, tabs follow the ARIA tabs pattern (arrow keys), no focus traps.
- Landmarks: `header`, `nav`, `main`, `section` with headings, `footer`. One `h1`, no skipped heading levels.
- Images: meaningful alt text; decorative icons `aria-hidden`.
- The floating round icon at the left edge needs an accessible name, a clear purpose, and a visible focus state, or should be removed.
- AI search input: visible label (not placeholder only), `aria-live` for results, clear error and empty states.
- Zoom to 200% and 320px width with no horizontal scroll or clipped content.
- Don't rely on colour alone to show state.

---

## 6. What to Give the Coding Agent

### A. Inputs (the agent cannot guess these)
1. **Live URL and repo path**, plus the framework and styling approach (React/Next, Tailwind, CSS modules...).
2. **This guide** plus the chosen direction (A, B or C).
3. **2–4 reference sites** you admire and one sentence on what to borrow from each (e.g. "spacing from X, product cards from Y").
4. **Real assets:** product screenshots (2–3 per product, 2x resolution), logos, a good profile photo, favicon, OG image.
5. **Real proof:** metrics, testimonials, client or company names you are allowed to show, and links to live products or repos.
6. **Brand constraints:** colours, fonts, or words you must keep or avoid.
7. **Content priority:** the one action visitors should take (hire you? contact for a project? view products?).
8. **Non-negotiables:** what must not change (copy, URLs, SEO tags, analytics, AI search behaviour).
9. **Target devices/browsers** and the breakpoints (suggest 360, 768, 1024, 1440).
10. **Before screenshots** at 360, 768 and 1440 for comparison.

### B. Deliverable rules for the agent
- Work **one section at a time**; show a screenshot after each.
- Create **design tokens first** (CSS variables or Tailwind config), then components, then sections. No hard-coded colours or sizes.
- Do not change the copy meaning; flag any copy changes in a list.
- Do not add libraries without asking.
- Keep Lighthouse (Performance, Accessibility, SEO) ≥ 90 and run axe-core on each section.
- Provide before/after screenshots at the three widths.

### C. Suggested order of work
1. Tokens (type, colour, spacing, radius).
2. Base components (button, link, chip, card, section header).
3. Hero + nav.
4. Ventures and Products (case-study cards).
5. How I Build and Capabilities (condensed).
6. Journey (slim timeline).
7. Contact + footer.
8. Accessibility pass, responsive pass, performance pass.

### D. Starter prompt to paste

```
You are a senior product designer and front-end engineer. Redesign this
portfolio for polish and clarity without changing the facts.

Context: [URL / repo], stack: [framework + styling].
Direction: [A/B/C], references: [links + what to borrow].
Primary goal: [e.g. get project inquiries].

Rules:
- Read docs/ui-ux-improvement-guide.md first and follow it.
- Start by creating design tokens, then shared components, then sections.
- One accent colour, two font families, one card style, 8px spacing scale.
- Body text min 16px, meta min 13px, targets min 44px, WCAG 2.1 AA.
- Cut page length by ~40%; no cards inside cards; left-aligned headings.
- Use the real assets in /public/assets; do not invent metrics or logos.
- After each section: screenshot at 360/768/1440, run axe, list what changed.
- Ask before adding dependencies or rewriting copy.
```

---

## 7. Acceptance Checklist

- [ ] Visitor can state in 5 seconds what you do and how to contact you.
- [ ] Every product has a visual and one proof point.
- [ ] No text below 13px; body 16px+.
- [ ] One accent colour; neutral chips.
- [ ] No nested cards; consistent radius and spacing.
- [ ] Page height reduced ~40%.
- [ ] Keyboard-only walkthrough completes without traps; focus always visible.
- [ ] axe-core: 0 critical/serious; Lighthouse accessibility ≥ 95.
- [ ] Works at 320px and 200% zoom.
- [ ] Reduced-motion respected.

---

## 8. Verified Findings from the Live Site (mhemelhasan.com)

Checked against the page text and structure. CSS values, contrast and focus behaviour were **not** measurable this way and still need a tool run (see 8.3).

### 8.1 Confirmed
- **Heading structure is good:** one `h1`, `h2` per section, `h3` per card, `h4` for sub-items. Keep it.
- **Only one image on the whole page** (the avatar). No product screenshots anywhere.
- **Hero content is duplicated in the DOM** (avatar, name, role line, tagline and location appear twice, with "Private Beta" in one and "Beta" in the other). Screen readers will read it twice. Use one source of truth, or hide the duplicate with `aria-hidden` and `inert`, and make the label consistent.
- **21 near-identical links** ("Ask about this", "Ask about this domain", "Ask about this period", "Ask in conversation"). Without distinct accessible names, a screen-reader links list is unusable (WCAG 2.4.4). Add context, e.g. `aria-label="Ask about Instantio"`, and cut the number of repeats.
- **All 6 product links go to the generic `themefic.com`** homepage, not to the product. Link each to its own page, or remove the link.
- **No `og:image`** and `twitter:card` is `summary`, so shared links show no preview. Add a 1200×630 image and use `summary_large_image`.
- **Avatar is requested at `w=3840`** through `next/image`. Add a proper `sizes` attribute and a sensible source size.
- **The page itself claims "WCAG AA compliance", "Focus States" and "Accessible Landmarks"** in Engineering Depth. Any accessibility failure directly contradicts the pitch, which raises the priority of the accessibility work.
- **"Verified" is overused** ("Verified Platform Scope", "Verified Capabilities", "View verified capabilities"). Verified by whom? It reads as filler and weakens trust. Remove the word or replace it with real evidence (live link, install count).
- **Attribution notice is a full paragraph.** Keep the honesty, but shrink it to a small "Built at Themefic" label per product plus one line under the section heading.
- **Stack (self-reported on the page):** Next.js App Router, React 19, TypeScript, Tailwind CSS v4. Tell the agent to work within it.

### 8.2 Corrections to the first-pass audit
- Product names are **Bundlefic**, **Instantio**, **Connectfic**, **Quotezic**.
- Engineering Depth has **7** cards, Builder Journey has **6**.
- Heading order and the hero-chip count (7) are confirmed. Heading order is not an issue.

### 8.3 Still needs a tool run (5 minutes)
1. Chrome DevTools → Lighthouse (mobile + desktop), save the report.
2. axe DevTools extension on the page, plus on each tab/state of "How I Build" and each expanded card.
3. Tab through the whole page with the keyboard only. Note anything you can't see, reach or activate.
4. DevTools → Inspect the smallest text. Record its `font-size` and colour/background hex values.
5. Zoom to 200% and resize to 320px. Note clipping or horizontal scroll.
6. Turn on VoiceOver or NVDA and open the links list (VO+U / NVDA+F7).

Give the agent the output of 1 and 2 as its baseline.
