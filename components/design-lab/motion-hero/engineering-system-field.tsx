"use client";

import React from "react";
import { MOTION_TOKENS } from "./motion-tokens";

interface EngineeringSystemFieldProps {
  pointer: { x: number; y: number };
  scrollProgress: number;
  isReducedMotion: boolean;
  isPointerCapable: boolean;
  isEntered: boolean;
}

/**
 * Engineering System Field
 * A restrained, disciplined architectural representation of software systems and product topology.
 * Sparse vector conduits, 6-7 subtle nodes, and multi-plane depth in the negative space around the portrait.
 * Strictly non-blocking (pointer-events-none), respects Brand Kit v2.0 color tokens.
 *
 * Responsive behavior:
 * - Hidden on viewports < 1024px (hidden lg:block) to maintain clean typography and battery efficiency on mobile/tablet.
 * - Active on viewports >= 1024px (1024, 1280, 1366, 1440).
 */
export function EngineeringSystemField({
  pointer,
  scrollProgress,
  isReducedMotion,
  isPointerCapable,
  isEntered,
}: EngineeringSystemFieldProps) {
  // Separate animation capabilities:
  // - canAnimate: scroll-linked movement (independent of pointer type)
  // - canPointerDepth: pointer coordinates & 3D tilt (requires mouse / fine pointer)
  const canAnimate = !isReducedMotion;
  const canPointerDepth = !isReducedMotion && isPointerCapable;

  // Scroll offsets (active for any non-reduced-motion viewport)
  const farScrollY = canAnimate
    ? scrollProgress * (MOTION_TOKENS.scroll.systemFieldOffsetMaxPx * 0.4)
    : 0;
  const midScrollY = canAnimate
    ? scrollProgress * (MOTION_TOKENS.scroll.systemFieldOffsetMaxPx * 0.7)
    : 0;
  const nearScrollY = canAnimate
    ? scrollProgress * MOTION_TOKENS.scroll.systemFieldOffsetMaxPx
    : 0;

  // Pointer parallax offsets (active on desktop fine-pointer devices)
  const farX = canPointerDepth ? pointer.x * MOTION_TOKENS.parallax.systemFarPx : 0;
  const farY = (canPointerDepth ? pointer.y * MOTION_TOKENS.parallax.systemFarPx : 0) + farScrollY;

  const midX = canPointerDepth ? pointer.x * MOTION_TOKENS.parallax.systemMidPx : 0;
  const midY = (canPointerDepth ? pointer.y * MOTION_TOKENS.parallax.systemMidPx : 0) + midScrollY;

  const nearX = canPointerDepth ? pointer.x * MOTION_TOKENS.parallax.systemNearPx : 0;
  const nearY = (canPointerDepth ? pointer.y * MOTION_TOKENS.parallax.systemNearPx : 0) + nearScrollY;

  const tiltX = canPointerDepth ? -pointer.y * 0.6 : 0;
  const tiltY = canPointerDepth ? pointer.x * 0.6 : 0;

  return (
    <div
      data-testid="engineering-system-field"
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden select-none lg:block"
      aria-hidden="true"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative h-full w-full"
        style={{
          opacity: isReducedMotion || isEntered ? 1 : 0,
          transform: canPointerDepth
            ? `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`
            : "none",
          transformStyle: "preserve-3d",
          transition: isReducedMotion
            ? "none"
            : `opacity 900ms ${MOTION_TOKENS.easing.engineered} 300ms`,
        }}
      >
        {/* ========================================================
            LAYER 1 (FAR): Coordinate Guides & Topology Grid Marks
            Subtle architectural reference ticks in negative space
            ======================================================== */}
        <div
          data-system-layer="far"
          className="absolute right-0 top-0 h-[650px] w-full max-w-[620px] will-change-transform opacity-40 dark:opacity-50"
          style={{
            transform: canAnimate || canPointerDepth
              ? `translate3d(${farX.toFixed(1)}px, ${farY.toFixed(1)}px, -50px)`
              : "none",
          }}
        >
          <svg
            viewBox="0 0 600 600"
            fill="none"
            className="h-full w-full stroke-text-muted"
            strokeWidth="0.75"
          >
            {/* Coordinate reference crosses */}
            <path d="M 480 90 L 480 106 M 472 98 L 488 98" strokeDasharray="1 1" />
            <path d="M 320 60 L 320 72 M 314 66 L 326 66" />
            <path d="M 540 240 L 540 252 M 534 246 L 546 246" />
            <path d="M 380 320 L 380 330 M 375 325 L 385 325" />

            {/* Background alignment datum lines */}
            <line
              x1="220"
              y1="98"
              x2="472"
              y2="98"
              strokeDasharray="3 5"
              className="stroke-border-subtle"
            />
            <line
              x1="480"
              y1="106"
              x2="480"
              y2="280"
              strokeDasharray="2 6"
              className="stroke-border-subtle"
            />

            {/* Faint system bounding box */}
            <rect
              x="360"
              y="140"
              width="180"
              height="160"
              strokeDasharray="2 4"
              className="stroke-border-subtle/70"
            />
          </svg>
        </div>

        {/* ========================================================
            LAYER 2 (MID): System Interconnects & Structural Conduits
            Thin architectural paths connecting system nodes
            ======================================================== */}
        <div
          data-system-layer="mid"
          className="absolute right-4 top-8 h-[580px] w-full max-w-[560px] will-change-transform opacity-55 dark:opacity-70"
          style={{
            transform: canAnimate || canPointerDepth
              ? `translate3d(${midX.toFixed(1)}px, ${midY.toFixed(1)}px, -20px)`
              : "none",
          }}
        >
          <svg
            viewBox="0 0 560 580"
            fill="none"
            className="h-full w-full"
            strokeWidth="1"
          >
            {/* Structural routing paths */}
            <path
              d="M 280 120 L 390 120 L 440 170 L 440 290 L 500 350"
              className="stroke-border-interactive dark:stroke-border-accent/50"
            />
            <path
              d="M 390 120 L 390 220 L 340 270"
              className="stroke-border-subtle dark:stroke-border-interactive"
              strokeDasharray="4 3"
            />

            {/* Intermediate architectural nodes */}
            <circle
              cx="390"
              cy="120"
              r="2.5"
              className="fill-surface-card stroke-border-interactive"
            />
            <circle
              cx="440"
              cy="170"
              r="2.5"
              className="fill-surface-card stroke-border-interactive"
            />
            <circle
              cx="340"
              cy="270"
              r="2"
              className="fill-text-muted/50"
            />

            {/* Orthogonal bus tap lines */}
            <line
              x1="440"
              y1="220"
              x2="465"
              y2="220"
              className="stroke-border-interactive"
            />
            <line
              x1="465"
              y1="216"
              x2="465"
              y2="224"
              className="stroke-border-interactive"
            />
          </svg>
        </div>

        {/* ========================================================
            LAYER 3 (NEAR): Anchor Nodes with Controlled Cobalt Accents
            Direct technical anchors framing the portrait perimeter
            ======================================================== */}
        <div
          data-system-layer="near"
          className="absolute right-8 top-12 h-[520px] w-full max-w-[500px] will-change-transform opacity-75 dark:opacity-90"
          style={{
            transform: canAnimate || canPointerDepth
              ? `translate3d(${nearX.toFixed(1)}px, ${nearY.toFixed(1)}px, 10px)`
              : "none",
          }}
        >
          <svg
            viewBox="0 0 500 520"
            fill="none"
            className="h-full w-full"
            strokeWidth="1.25"
          >
            {/* Primary focal conduit */}
            <path
              d="M 230 150 L 330 150 L 380 200 L 380 320"
              className="stroke-border-interactive dark:stroke-border-accent"
            />

            {/* Primary anchor node A (Upper focal node with Brand Cobalt center) */}
            <g transform="translate(330, 150)">
              <circle
                r="5"
                className="fill-surface-card stroke-brand-primary dark:stroke-accent-sky"
                strokeWidth="1.5"
              />
              <circle
                r="2"
                className="fill-brand-primary dark:fill-accent-sky"
              />
            </g>

            {/* Primary anchor node B (Branching node with micro coordinate tag) */}
            <g transform="translate(380, 200)">
              <rect
                x="-3.5"
                y="-3.5"
                width="7"
                height="7"
                className="fill-surface-card stroke-brand-primary dark:stroke-accent-sky"
                strokeWidth="1.2"
              />
            </g>

            {/* Node C (Perimeter anchor framing portrait top-left boundary) */}
            <g transform="translate(230, 150)">
              <circle
                r="3"
                className="fill-surface-card stroke-text-secondary"
                strokeWidth="1.2"
              />
            </g>

            {/* Minimal architectural bracket near top-right edge */}
            <path
              d="M 460 70 L 480 70 L 480 90"
              className="stroke-brand-primary/60 dark:stroke-accent-sky/60"
              strokeWidth="1.2"
            />
            <path
              d="M 480 380 L 480 400 L 460 400"
              className="stroke-border-interactive"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
