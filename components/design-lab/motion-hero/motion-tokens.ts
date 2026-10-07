/**
 * Hero Motion Tokens — Engineered Calm
 * Restrained motion constants ensuring strict consistency across micro-interactions,
 * entrance choreography, pointer depth, and scroll response.
 */

export const MOTION_TOKENS = {
  duration: {
    micro: 180, // Micro-interactions (hover, focus shift, arrow nudge)
    standard: 260, // UI state transitions (press, underline expand)
    settle: 380, // Pointer release and momentum settling
    entrance: 650, // Individual entrance element reveal
    lineDraw: 750, // Blue scroll cue expansion
  },
  easing: {
    // Precise deceleration curve: immediate initial velocity, gentle, zero-overshoot settling
    engineered: "cubic-bezier(0.16, 1, 0.3, 1)",
    // Balanced gentle ease for non-focal background transitions
    subtle: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    // Linear interpolation factor for RAF smoothing (lerp dampening)
    lerpDamping: 0.08,
    // When composer is focused, reduce pointer parallax intensity
    focusDampingMultiplier: 0.2,
  },
  parallax: {
    // Desktop pointer displacement limits (px / deg)
    portraitMaxPx: 5,
    portraitTiltDeg: 0.8,
    systemNearPx: 9,
    systemMidPx: 5,
    systemFarPx: 2,
  },
  scroll: {
    // Subtle scroll-out displacement limits
    textOffsetMaxPx: -12,
    portraitOffsetMaxPx: -6,
    systemFieldOffsetMaxPx: -18,
    minOpacity: 0.88,
  },
  stagger: {
    buildStagesMs: 40,
    promptButtonsMs: 35,
  },
} as const;
