"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { personalProfile } from "@/data/profile";
import { MotionConversationEntry } from "./motion-conversation-entry";
import { EngineeringSystemField } from "./engineering-system-field";
import { useHeroMotion } from "./use-hero-motion";
import { MOTION_TOKENS } from "./motion-tokens";

const buildStages = ["Research", "Architecture", "Systems", "Integrations", "Launch"];

interface MotionPortfolioHeroProps {
  replayTrigger?: number;
}

export function MotionPortfolioHero({ replayTrigger }: MotionPortfolioHeroProps = {}) {
  const {
    containerRef,
    phase,
    isEntered,
    isReducedMotion,
    isPointerCapable,
    pointer,
    scrollProgress,
    setIsInputFocused,
  } = useHeroMotion(replayTrigger);

  // Scroll parallax calculations
  const textScrollY = !isReducedMotion
    ? scrollProgress * MOTION_TOKENS.scroll.textOffsetMaxPx
    : 0;

  const portraitScrollY = !isReducedMotion
    ? scrollProgress * MOTION_TOKENS.scroll.portraitOffsetMaxPx
    : 0;

  // Portrait pointer depth calculation (desktop hover only)
  const portraitPointerX =
    !isReducedMotion && isPointerCapable
      ? pointer.x * MOTION_TOKENS.parallax.portraitMaxPx
      : 0;
  const portraitPointerY =
    !isReducedMotion && isPointerCapable
      ? pointer.y * MOTION_TOKENS.parallax.portraitMaxPx
      : 0;
  const portraitTiltX =
    !isReducedMotion && isPointerCapable
      ? -pointer.y * MOTION_TOKENS.parallax.portraitTiltDeg
      : 0;
  const portraitTiltY =
    !isReducedMotion && isPointerCapable
      ? pointer.x * MOTION_TOKENS.parallax.portraitTiltDeg
      : 0;

  // Gentle exit opacity as hero departs the viewport
  const heroOpacity = !isReducedMotion
    ? 1 - scrollProgress * (1 - MOTION_TOKENS.scroll.minOpacity)
    : 1;

  // Blue vertical cue stretch response on scroll
  const blueLineScrollScale = !isReducedMotion
    ? 1 + scrollProgress * 0.15
    : 1;

  // Helper for transition strings: disabled during primed state (for instant reset) or if reduced motion
  const getTransition = (
    duration: number,
    delayMs: number = 0,
    properties: string = "opacity, transform"
  ) => {
    if (isReducedMotion || phase === "primed") return "none";
    const delayStr = delayMs > 0 ? ` ${delayMs}ms` : "";
    return properties
      .split(",")
      .map((prop) => `${prop.trim()} ${duration}ms ${MOTION_TOKENS.easing.engineered}${delayStr}`)
      .join(", ");
  };

  const isVisible = isReducedMotion || isEntered;

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative overflow-hidden md:grid md:min-h-[calc(100svh-4rem)] md:grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)]"
      style={{
        opacity: heroOpacity,
      }}
    >
      <noscript>
        <style>{`
          [data-hero-motion] {
            opacity: 1 !important;
            transform: none !important;
          }
        `}</style>
      </noscript>

      {/* Level 4: Engineering System Field (Selective 3D Depth) */}
      <EngineeringSystemField
        pointer={pointer}
        scrollProgress={scrollProgress}
        isReducedMotion={isReducedMotion}
        isPointerCapable={isPointerCapable}
        isEntered={isEntered || isReducedMotion}
      />

      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-0 pt-8 sm:px-8 sm:pb-10 sm:pt-12 md:row-start-2 lg:px-12 lg:pb-8"
        style={{
          transform: textScrollY !== 0 ? `translate3d(0, ${textScrollY.toFixed(1)}px, 0)` : undefined,
          willChange: scrollProgress > 0 ? "transform" : "auto",
        }}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_132px] items-start gap-x-4 gap-y-6 sm:grid-cols-[minmax(0,1fr)_220px] sm:gap-x-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-7">
          {/* Identity: Role & Name */}
          <div className="min-w-0 lg:col-span-8">
            <p
              data-hero-motion="role"
              className="text-sm font-medium leading-5 text-brand-primary sm:text-base"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "translate3d(0, 8px, 0)",
                transition: getTransition(550, 0),
              }}
            >
              {personalProfile.roleTitle}
            </p>

            <h1
              data-hero-motion="name"
              className="mt-4 max-w-4xl text-[3rem] font-semibold leading-[0.95] tracking-normal text-text-primary sm:mt-5 sm:text-[4.7rem] lg:text-[5.7rem]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "translate3d(0, 12px, 0)",
                transition: getTransition(650, 100),
              }}
            >
              {personalProfile.name}
            </h1>
          </div>

          {/* Portrait: Clean Separation of Outer Entrance Wrapper and Inner Continuous Transform Wrapper */}
          <figure
            data-hero-motion="portrait"
            className="relative col-start-2 row-start-1 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:justify-self-end"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : "translate3d(0, 10px, 0) scale(0.985)",
              transition: getTransition(750, 200),
            }}
          >
            {/* Inner Wrapper: Handles continuous pointer optical tilt & scroll translation */}
            <div
              style={{
                transform:
                  !isReducedMotion && isPointerCapable
                    ? `translate3d(${portraitPointerX.toFixed(1)}px, ${(portraitPointerY + portraitScrollY).toFixed(1)}px, 0) rotateX(${portraitTiltX.toFixed(2)}deg) rotateY(${portraitTiltY.toFixed(2)}deg)`
                    : !isReducedMotion && portraitScrollY !== 0
                    ? `translate3d(0, ${portraitScrollY.toFixed(1)}px, 0)`
                    : "none",
                transformStyle: "preserve-3d",
                willChange: !isReducedMotion && (isPointerCapable || scrollProgress > 0) ? "transform" : "auto",
              }}
            >
              <div className="relative ml-auto aspect-[4/5] w-full max-w-[132px] overflow-hidden border-l-4 border-brand-primary shadow-sm sm:max-w-[220px] lg:max-w-[310px]">
                <Image
                  src="/assets/avatar.jpg"
                  alt="M Hemel Hasan"
                  fill
                  priority
                  sizes="(max-width: 639px) 132px, (max-width: 1023px) 220px, 310px"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="ml-auto mt-4 hidden max-w-[220px] items-start justify-between gap-5 border-t border-border-subtle pt-3 text-sm sm:flex lg:max-w-[310px]">
                <span className="text-text-primary">{personalProfile.founderVenture.role}</span>
                <span className="text-right text-text-secondary">
                  {personalProfile.founderVenture.name}
                  <br />
                  {personalProfile.founderVenture.statusLabel}
                </span>
              </figcaption>
            </div>
          </figure>

          {/* Tagline & Build Stages */}
          <div className="col-span-2 lg:col-span-8">
            <p
              data-hero-motion="tagline"
              className="max-w-3xl text-lg leading-7 text-text-secondary sm:text-2xl sm:leading-9"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "translate3d(0, 8px, 0)",
                transition: getTransition(650, 260),
              }}
            >
              {personalProfile.tagline}
            </p>

            {/* Build stages with subtle stagger and tactile hover micro-interaction */}
            <div
              data-hero-motion="stages"
              className="mt-6 border-y border-border-subtle py-3 sm:mt-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: getTransition(650, 340, "opacity"),
              }}
            >
              <div className="grid grid-cols-2 gap-y-3 sm:grid-cols-5">
                {buildStages.map((stage, index) => (
                  <div
                    key={stage}
                    data-hero-motion={`stage-${index}`}
                    className="group flex cursor-default items-center gap-2 text-xs font-medium text-text-secondary transition-all hover:text-text-primary"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "none" : "translate3d(0, 4px, 0)",
                      transition: getTransition(
                        500,
                        360 + index * MOTION_TOKENS.stagger.buildStagesMs
                      ),
                    }}
                  >
                    <span className="font-mono text-[10px] text-brand-primary transition-colors group-hover:text-brand-primary-hover">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      {stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Location badge */}
        <div
          data-hero-motion="location"
          className="mt-5 flex items-center gap-2 text-sm text-text-secondary sm:mt-8 lg:mt-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: getTransition(550, 440, "opacity"),
          }}
        >
          <MapPin className="h-4 w-4 text-brand-primary" aria-hidden="true" />
          <span>{personalProfile.location}</span>
        </div>

        {/* Embedded Conversation Entry */}
        <div
          data-hero-motion="conversation"
          className="mt-4 lg:ml-[8.333%] lg:w-[83.333%]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translate3d(0, 8px, 0)",
            transition: getTransition(700, 500),
          }}
        >
          <MotionConversationEntry
            isEntered={isVisible}
            isReducedMotion={isReducedMotion}
            onFocusChange={setIsInputFocused}
          />
        </div>
      </div>

      {/* Desktop/Tablet Adaptive Vertical Scroll Line Cue */}
      <div
        className="relative mx-auto hidden h-full w-full max-w-7xl px-5 sm:px-8 md:row-start-3 md:block lg:px-12"
        aria-hidden="true"
      >
        <div className="relative h-full lg:ml-[8.333%] lg:w-[83.333%]">
          <span
            data-hero-motion="blue-line"
            className="absolute -top-10 bottom-0 left-12 w-px bg-brand-primary lg:-top-8 lg:left-[34%]"
            style={{
              transformOrigin: "top center",
              transform: isReducedMotion
                ? "none"
                : scrollProgress > 0
                ? `scaleY(${blueLineScrollScale.toFixed(2)})`
                : isEntered
                ? "scaleY(1)"
                : "scaleY(0)",
              transition:
                isReducedMotion || phase === "primed"
                  ? "none"
                  : scrollProgress > 0
                  ? "none"
                  : `transform ${MOTION_TOKENS.duration.lineDraw}ms ${MOTION_TOKENS.easing.engineered} 680ms`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
