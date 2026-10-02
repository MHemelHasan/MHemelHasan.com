# Brand Theme Token Map

Brand Kit v2.0 is the canonical identity source for MHemelHasan.com. Start with
`docs/brand/AGENT_BRAND_CONTEXT.md`; use `docs/brand/BRAND_GUIDELINES.md` for
logo and usage rules and `docs/brand/tokens/` for exact source values.

## Runtime ownership

- `app/globals.css` owns brand primitives and application semantic mappings.
- `app/layout.tsx` owns Geist font loading and site metadata.
- `public/brand/` contains only production assets consumed by the website.
- `docs/brand/` contains canonical documentation and source token references.

## Canonical primitives

| Token | Value | Purpose |
| :--- | :--- | :--- |
| `--brand-primary` | `#315CF5` | Primary cobalt |
| `--brand-primary-hover` | `#264AC9` | Hover/active cobalt |
| `--brand-primary-soft` | `#EEF2FF` | Soft cobalt surface |
| `--brand-ink` | `#111318` | Primary ink |
| `--brand-muted` | `#646A73` | Secondary text |
| `--brand-bg` | `#FAF9F6` | Warm background |
| `--brand-surface` | `#FFFFFF` | Surface |
| `--brand-border` | `#E6E2DC` | Border |

## Semantic mapping

The application keeps its existing component-facing tokens so no component
needs a parallel theme API:

| Application role | Brand source |
| :--- | :--- |
| Canvas | `--brand-bg` |
| Card surface | `--brand-surface` |
| Interactive surface | `--brand-primary-soft` |
| Primary text | `--brand-ink` |
| Secondary/muted text | `--brand-muted` |
| Primary interaction | `--brand-primary` |
| Hover/active interaction | `--brand-primary-hover` |
| Border | `--brand-border` |

The Brand Kit does not specify a complete dark palette. Existing dark neutral
surface and text values are deliberately preserved. Dark-mode interactive text
uses an accessible cobalt adaptation documented in
`docs/brand/INTEGRATION_NOTES.md`; supplied logo files remain unmodified.

## Independent semantic colors

Lifecycle status colors and third-party platform colors remain independent of
the personal brand palette. Amber still communicates beta state, green still
communicates live state, and platform-specific badges retain their recognizable
colors.

## Typography

`next/font/google` loads Geist and Geist Mono as variable fonts. They populate
the existing `--font-sans` and `--font-mono` variables, so current Tailwind
utilities continue to work without component-level font declarations.
