# V3 Brand Rebuild — Reference Audit (V0, V1, V2)

**Document ID:** `00-reference-audit.md`  
**Author:** Antigravity (Pair Programming with M Hemel Hasan)  
**Date:** September 2026  
**Status:** Draft — Pending Final Review

---

## Executive Summary

This document audits the three previous iterations of `mhemelhasan.com`:
- **V0:** The current/live Gatsby v5 React website (forked from Brittany Chiang's template).
- **V1:** An initial single-page Vanilla HTML/CSS/JS prototype with a theme toggle and particle background.
- **V2:** An expanded Vanilla HTML/CSS/JS prototype introducing an 8-section narrative, "Product OS," and interactive terminal consoles.

All three repositories serve strictly as **read-only visual and technical references**. The purpose of this audit is to identify patterns to **KEEP**, patterns that can be **ADAPTED** to support the revised positioning (*Product Engineer. Builder. Founder.*) within a **hybrid conversational portfolio**, and elements that must be **DISCARDED** because they reinforce freelancer, job-seeker, or agency stereotypes.

---

## 1. Audit: Version 0 (V0) — Current Gatsby / React Implementation

### 1.1 Technical Stack
- **Framework:** Gatsby v5.13.4, React 18, React Helmet.
- **Styling:** Styled Components (`babel-plugin-styled-components`, `gatsby-plugin-styled-components`).
- **Motion & Interactions:** GSAP v3.12.4, Anime.js v3.1.0, React Transition Group v4.3.0.
- **Data / Content:** GraphQL, Markdown Remark (`gatsby-transformer-remark`, `gatsby-source-filesystem`), PrismJS syntax highlighting.
- **Asset Pipeline:** Gatsby Plugin Image, Gatsby Sharp, Gatsby Plugin Manifest.
- **Deployment:** Netlify configuration (`gatsby-plugin-netlify`).

### 1.2 Major Layout Patterns
- **Fixed Overhead Navigation:** Glassmorphic bar featuring brand mark, numbered navigation links (`01. About`, `02. Experience`, `03. Work`, `04. Contact`), and a prominent "Resume" button.
- **Fixed Vertical Side Rails:**
  - Left: Fixed column with GitHub, LinkedIn, Upwork, and Codepen SVGs linked to a bottom vertical line rule.
  - Right: Fixed column with email link oriented vertically.
- **Hero Section:** Left-aligned text hierarchy: kicker ("Hi, my name is"), display name, punchline ("I build things for the web"), brief bio, and a primary CTA button.
- **Tabbed Experience Interface:** Vertical tab list of employers/clients on the left; tab panel displaying role title, employer link, date range, and bullet points on the right.
- **Alternating Featured Projects:** Asymmetrical 12-column grid layout with project screenshot on one side and floating text card overlapping it.
- **Project Grid ("Other Noteworthy Projects"):** Card grid showcasing secondary projects with folder and external link icons.

### 1.3 Visual Strengths
- **Cohesive Dark Palette:** Deep navy (`#0a192f`), dark navy (`#020c1b`), muted slate typography (`#8892b0`, `#ccd6f6`), and teal accent (`#64ffda`).
- **Typographic Discipline:** Clean pairing of standard sans-serif with monospace for kicker labels, numbers, and code tokens.
- **Icon Quality:** Semantic SVG icons for GitHub, LinkedIn, external links, and folders in `src/components/icons/`.
- **Image Assets:** Contains real, production-ready assets:
  - Personal portrait: `src/images/mhemelhasan.jpg` (500x695 px).
  - High-res project previews: `content/projects/images/v3-og.png` (2400x1260 px) and `src/images/demo.png` (2880x1800 px).
  - Comprehensive favicon suite: `src/images/favicons/` (16x16 up to 310x310 px).

### 1.4 UX Weaknesses
- **Template Boilerplate Remnants:** Several job markdown files (`content/jobs/`) still contain placeholder copy from the original template author (e.g., mentions of Northeastern University, JetBlue, and MullenLowe).
- **Tabbed UI Interaction Barrier:** Hides career depth behind tabs. Visitors must click repeatedly to understand career progression rather than scanning an integrated timeline.
- **Heavy Gatsby Runtime:** Unnecessary JavaScript bundle size and GraphQL abstraction overhead for a personal site.

### 1.5 Elements Conflicting with Target Positioning
- **"Resume" Button in Header:** Immediately frames the author as an active job applicant seeking employment.
- **"Hi, my name is ... I build things for the web":** Generic junior/mid web developer cliché.
- **Tabbed Jobs Architecture:** Mimics an employee resume rather than highlighting product ownership, platform systems, and technical leadership.
- **"Get In Touch" Framing:** "My inbox is always open..." positions the author passively rather than as a focused builder.

### 1.6 Audit Verdict & Recommendations
- **KEEP:** Real asset files (`mhemelhasan.jpg`, `v3-og.png`, favicon suite, curated SVGs).
- **ADAPT:** Clean dark substrate and quiet utility links.
- **DISCARD:** The Gatsby/GraphQL framework, resume download CTA, tabbed employment layout, and generic developer copy.

---

## 2. Audit: Version 1 (V1) — Experimental Vanilla Prototype

### 2.1 Technical Stack
- **Structure:** Semantic HTML5 (`index.html`, 501 lines).
- **Styling:** Vanilla CSS3 (`styles.css`, 37.5 KB) utilizing CSS custom properties, grid, and flexbox.
- **Scripting:** Vanilla JavaScript (`script.js`, 9 KB) utilizing native browser APIs (`IntersectionObserver`, `CanvasRenderingContext2D`, `matchMedia`, `localStorage`).
- **Fonts:** Google Fonts CDN (Inter, JetBrains Mono, Space Grotesk).
- **Zero Runtime Dependencies:** No external libraries or build tooling required.

### 2.2 Major Layout Patterns
- **Header with Theme Switcher:** Floating top navigation containing brand mark, anchor links, theme toggle button, and "Hire Me" button.
- **Full-Screen Hero with Ambient Canvas:** Canvas background running an interactive particle animation beneath a two-column hero layout with animated orbit rings and dual signal tags.
- **Horizontal Proof Strip:** Four-card grid showcasing numerical proof points (`15+ Years`, `100+ Projects`, etc.).
- **Split About Section:** Left-hand narrative copy paired with a right-hand visual card.
- **Skills Grid with Category Filter:** Filter buttons (`All`, `Core`, `Motion`, `Platform`, `Web3`) that dynamically toggle card visibility.
- **Vertical Journey Timeline:** Chronological card layout showing career milestones.
- **Agency-Style Services Grid:** Eight numbered service cards outlining development capabilities.
- **Contact Form with Live Counter:** Real-time character counter (`0/500`) for the message input.

### 2.3 Visual Strengths
- **Modern Typography Hierarchy:** Distinct pairing of Space Grotesk for headings, Inter for high-legibility body, and JetBrains Mono for technical metadata.
- **Light/Dark Theme Implementation:** Full CSS custom property token system supporting both modes with smooth transitions.
- **Scroll Progress Indicator:** Sleek horizontal progress bar fixed at the viewport top.

### 2.4 UX Weaknesses
- **Broken Image Asset:** Line 210 attempts to load `asset/M-Hemel-Hasan-Portfolio v2.png`, which does not exist.
- **Placeholder Hyperlinks:** Social links and anchor tags point to `#`.
- **Visual Clutter in Hero:** Decorative orbital rings and dual status tags create visual noise that distracts from the core identity.
- **Inconsistent Theme Contrast:** Light mode borders and subtle tags suffer from low contrast.

### 2.5 Elements Conflicting with Target Positioning
- **"Hire Me" Header Button:** Explicitly positions the author as a transactional gig worker or freelancer.
- **Skill Percentage Meters:** Skill cards use progress indicators (`--level: 98%`), an outdated visual trope that undermines senior technical credibility.
- **Agency Services Menu:** Presents services like an agency catalog ("01 Full-Stack Development", "02 Front-End Engineering", "03 WordPress Plugin Development").
- **"Available for work" Badge:** Reinforces immediate, unvetted availability rather than selective engagement.

### 2.6 Audit Verdict & Recommendations
- **KEEP:** Tokenized CSS mindset, scroll progress bar pattern, and typography pairing.
- **ADAPT:** Category filtering pattern (repurpose to filter deep engineering case studies or products rather than isolated skills).
- **DISCARD:** "Hire Me" CTA, skill percentage bars, agency service cards, and broken asset references.

---

## 3. Audit: Version 2 (V2) — Expanded Experimental Prototype

### 3.1 Technical Stack
- **Structure:** Semantic HTML5 (`index.html`, 738 lines).
- **Styling:** Vanilla CSS3 (`styles.css`, 63.3 KB, 3,436 lines), responsive across five breakpoints.
- **Scripting:** Vanilla JavaScript (`script.js`, 10.6 KB) with cubic-eased count-up animations, 3D pointer-depth card tilting, ambient canvas grid, and form character counting.
- **Fonts:** Google Fonts (Inter, JetBrains Mono, Space Grotesk).

### 3.2 Major Layout Patterns
V2 establishes an 8-section narrative structure:
1. **Hero with Product Console:** Split layout featuring headline, subtext, proof signals, credibility bar, and an interactive terminal console (`mhh/product-builder`).
2. **Credibility Strip:** Proof cards with animated numerical count-up (`data-count-up="15"`, `data-count-up="1000"`).
3. **01 - Product OS:** Architectural framework showcasing four pillars (Product Architecture, Interface Craft, Systems Thinking, Platform Depth) and a `delivery-system.json` code window.
4. **02 - About Me:** Career narrative accompanied by a career path pill and visual card.
5. **03 - Core Expertise:** Live scrolling marquee of technologies, 3-column capability board, and filterable skill grid.
6. **04 - The Journey:** Experience dashboard with career metrics and alternating chronological milestone cards.
7. **05 - Featured Work:** Web3 NFT Marketplace case study with Challenge/Solution/Outcome structure, followed by platform app cards (Shopify, Webflow, WordPress, Framer).
8. **06 - Why Work With Me:** Four value-proposition cards and a 3-step working methodology.
9. **07 - Services & Trust:** Expanded 8-card capability matrix and agency/client trust strip.
10. **08 - Contact:** Direct contact information paired with an inquiry form.

### 3.3 Visual Strengths
- **Product OS Concept:** The "Product OS" framing is a standout narrative asset. It immediately elevates the author from a coder to a systems builder.
- **Challenge / Solution / Outcome Structure:** Case studies articulate business challenges, architectural solutions, and outcomes.
- **Micro-Interactions & Physics:**
  - Interactive 3D tilt on cards calculated dynamically from cursor offsets.
  - Cubic eased number animation (`1 - Math.pow(1 - progress, 3)`).
- **Terminal Consoles:** The code windows provide tactile technical feel.

### 3.4 UX Weaknesses
- **Monolithic CSS Architecture:** Single 3,400+ line CSS file with duplicate media queries.
- **Navigation Disconnect:** Header navigation links omit `Product OS` and `Services`, causing scrolling discrepancies.
- **Unverified Metrics:** Phrases like "1000+ product surfaces shipped" lack specific context and risk reading as ungrounded hyperbole.
- **Inherited V1 Bugs:** Unresolved 404 image reference on line 306 and empty placeholder `#` links.

### 3.5 Elements Conflicting with Target Positioning
- **Persistent "Hire Me" Button:** Retained in header navigation.
- **Agency Service Selling:** Retains the 8-card service catalog ("What I can build").
- **Skill Percentage Meters:** Retained in the skills grid (`style="--level: 98%"`).
- **Absence of Social AI:** The primary venture—**Social AI**—is completely missing. The site highlights client and agency contracts rather than founder-level venture ownership.
- **Company Attribution Ambiguity:** Needs clear separation between personal SaaS ventures and products built within employers (Themefic, Ahom Technology).

### 3.6 Audit Verdict & Recommendations
- **KEEP:** The "Product OS" concept and `delivery-system.json` framing; Challenge / Solution / Outcome case study presentation format; 3D card tilt and eased count-up interaction math.
- **ADAPT:** Product OS evolves into the interactive "How I Build" pipeline (both as an interactive page section and as a rich conversational response).
- **DISCARD:** "Hire Me" CTA, skill percentage bars, agency service grid, cluttered hero decorations, and ungrounded metrics.

---

## 4. Synthesis: Evolution Toward V3 Hybrid Experience

The following matrix connects the lessons from V0, V1, and V2 to the new **hybrid conversational portfolio** model (inspired by `aaabadcode.com`):

| Feature / Element | Prior Iterations (V0/V1/V2) | V3 Hybrid Direction | Rationale |
| :--- | :--- | :--- | :--- |
| **First Viewport** | Static headline + CTA (V0/V1) or busy terminal console (V2) | **Identity + Tactile Conversational Entry Point** | Instantly answers who M Hemel Hasan is, while providing immediate suggested prompt chips to explore interactively. |
| **Information Delivery** | Giant long-scroll with everything dumped onto one page | **Progressive Disclosure + Crawlable Static Backing** | Conversational UI surfaces tailored, rich UI responses while all core content remains statically accessible below or via deep links. |
| **Personal Ventures** | Completely absent | **Social AI front and center** (Hero Venture) + Support AI (Coming Next) | Proves founder capability, product thinking, and skin in the game. |
| **Company Products** | Mixed with template placeholders or unattributed | **5 Themefic Products (3 Featured + 2 Compact)** with strict company attribution | Proves real commercial shipping inside product companies with complete integrity. |
| **Skills / Technology** | Percentage bars (V1/V2) or generic icon lists (V0) | **Contextual Tech within Products & Pipeline** | Demonstrates technical depth through working systems rather than logo walls. |
| **Methodology** | "Product OS" static band (V2) | **Interactive "How I Build" Pipeline** | Clickable, progressive 8-stage engineering process (Research → Launch → Iterate). |
| **Contact / CTA** | "Hire Me" button / passive "Get In Touch" | **"Start a Conversation"** | Welcoming, peer-level, approachable, and product-focused. |
