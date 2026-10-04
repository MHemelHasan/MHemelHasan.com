# Brand Kit v2.0 Integration Notes

## Runtime mapping

Brand Kit values are defined as primitives in `app/globals.css` and feed the
portfolio's existing semantic tokens. This keeps current component contracts
such as `bg-canvas`, `text-text-primary`, and `text-accent-sky` intact.

The light theme uses the finalized warm-neutral and cobalt palette directly.
The Brand Kit does not define a complete dark palette, so the existing dark
neutral surfaces and text colors remain in place. Dark-mode interactive text
uses `#6685FF`, an accessibility adaptation of cobalt that reaches WCAG AA on
the existing dark surfaces. The canonical logo still uses the supplied,
unaltered production colors.

## Asset policy

Only Concept C production SVGs, essential browser icons, and the supplied Open
Graph image are shipped from `public/brand/`. Brand boards, verification
screenshots, PNG logo duplicates, and source references are intentionally not
deployed.
