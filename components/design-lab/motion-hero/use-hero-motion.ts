"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MOTION_TOKENS } from "./motion-tokens";

export type EntrancePhase = "primed" | "entered";

export interface HeroMotionState {
  containerRef: React.RefObject<HTMLElement | null>;
  phase: EntrancePhase;
  isEntered: boolean;
  isReducedMotion: boolean;
  isPointerCapable: boolean;
  pointer: { x: number; y: number };
  scrollProgress: number;
  isInputFocused: boolean;
  setIsInputFocused: (focused: boolean) => void;
  replayEntrance: () => void;
}

export function useHeroMotion(replayTrigger?: number): HeroMotionState {
  const containerRef = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<EntrancePhase>("primed");
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isPointerCapable, setIsPointerCapable] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mutable refs for RAF loop to prevent constant React re-renders during high-frequency pointer moves
  const targetPointerRef = useRef({ x: 0, y: 0 });
  const currentPointerRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);
  const entranceRafRef = useRef<number | null>(null);
  const isRafActiveRef = useRef(false);
  const isVisibleRef = useRef(true);
  const lastReplayTriggerRef = useRef(replayTrigger);

  // Check reduced motion state (including test hook `html.reduce-motion`)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkReduced = () => {
      const hasClass = document.documentElement.classList.contains("reduce-motion");
      const reduced = mediaQuery.matches || hasClass;
      setIsReducedMotion(reduced);
      if (reduced) {
        setPhase("entered");
      }
    };

    checkReduced();
    mediaQuery.addEventListener("change", checkReduced);

    const observer = new MutationObserver(() => checkReduced());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      mediaQuery.removeEventListener("change", checkReduced);
      observer.disconnect();
    };
  }, []);

  // Check pointer device capability (desktop mouse vs touch)
  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const checkCapability = () => {
      const isFinePointer = pointerQuery.matches;
      const isTouchDevice =
        typeof navigator !== "undefined" &&
        navigator.maxTouchPoints > 1 &&
        window.matchMedia("(pointer: coarse)").matches;
      const isDesktopNonTouch =
        window.innerWidth >= 1024 &&
        typeof navigator !== "undefined" &&
        navigator.maxTouchPoints === 0;

      setIsPointerCapable(
        window.innerWidth >= 1024 && !isTouchDevice && (isFinePointer || isDesktopNonTouch)
      );
    };

    checkCapability();
    pointerQuery.addEventListener("change", checkCapability);
    window.addEventListener("resize", checkCapability);

    return () => {
      pointerQuery.removeEventListener("change", checkCapability);
      window.removeEventListener("resize", checkCapability);
    };
  }, []);

  // Replay entrance function: resets to primed, lets browser paint primed state, then triggers entered
  const replayEntrance = useCallback(() => {
    const isReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("reduce-motion");

    if (isReduced) {
      setPhase("entered");
      return;
    }

    // 1. Reset entrance phase to primed
    setPhase("primed");

    // 2. Reset pointer refs to center
    targetPointerRef.current = { x: 0, y: 0 };
    currentPointerRef.current = { x: 0, y: 0 };
    setPointer({ x: 0, y: 0 });

    // 3. Double-RAF boundary ensures browser actually paints the primed (hidden) state before transitions begin
    if (entranceRafRef.current) {
      cancelAnimationFrame(entranceRafRef.current);
    }

    entranceRafRef.current = requestAnimationFrame(() => {
      entranceRafRef.current = requestAnimationFrame(() => {
        setPhase("entered");
        entranceRafRef.current = null;
      });
    });
  }, []);

  // Initial entrance sequence on mount
  useEffect(() => {
    const isReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("reduce-motion");

    if (isReduced) {
      setPhase("entered");
      return;
    }

    // Double-RAF paint boundary: ensures initial primed state is painted before entering
    entranceRafRef.current = requestAnimationFrame(() => {
      entranceRafRef.current = requestAnimationFrame(() => {
        setPhase("entered");
        entranceRafRef.current = null;
      });
    });

    return () => {
      if (entranceRafRef.current) {
        cancelAnimationFrame(entranceRafRef.current);
      }
    };
  }, []);

  // Respond to replayTrigger prop changes (without unmounting component)
  useEffect(() => {
    if (
      replayTrigger !== undefined &&
      lastReplayTriggerRef.current !== undefined &&
      replayTrigger !== lastReplayTriggerRef.current
    ) {
      replayEntrance();
    }
    lastReplayTriggerRef.current = replayTrigger;
  }, [replayTrigger, replayEntrance]);

  // IntersectionObserver to pause processing when hero is not visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (!entry.isIntersecting) {
            // Stop RAF when out of view
            if (rafIdRef.current) {
              cancelAnimationFrame(rafIdRef.current);
              rafIdRef.current = null;
              isRafActiveRef.current = false;
            }
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // RAF smoothing loop for pointer coordinates (silky lerp with zero jank)
  const startRafIfNeeded = useCallback(() => {
    if (isRafActiveRef.current || !isVisibleRef.current) return;

    isRafActiveRef.current = true;

    const tick = () => {
      if (!isVisibleRef.current) {
        isRafActiveRef.current = false;
        return;
      }

      const damping = MOTION_TOKENS.easing.lerpDamping;
      const targetX = targetPointerRef.current.x;
      const targetY = targetPointerRef.current.y;

      const currentX = currentPointerRef.current.x;
      const currentY = currentPointerRef.current.y;

      const nextX = currentX + (targetX - currentX) * damping;
      const nextY = currentY + (targetY - currentY) * damping;

      currentPointerRef.current = { x: nextX, y: nextY };

      // Apply focus damping if active to reduce disturbance
      const focusMultiplier = isInputFocused
        ? MOTION_TOKENS.easing.focusDampingMultiplier
        : 1;

      setPointer({
        x: nextX * focusMultiplier,
        y: nextY * focusMultiplier,
      });

      const deltaX = Math.abs(targetX - nextX);
      const deltaY = Math.abs(targetY - nextY);

      // Keep running if there is still momentum
      if (deltaX > 0.0005 || deltaY > 0.0005) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        // Settled completely at rest
        currentPointerRef.current = { x: targetX, y: targetY };
        setPointer({
          x: targetX * focusMultiplier,
          y: targetY * focusMultiplier,
        });
        isRafActiveRef.current = false;
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [isInputFocused]);

  // Pointer event listeners on Hero section
  useEffect(() => {
    if (isReducedMotion || !isPointerCapable) {
      targetPointerRef.current = { x: 0, y: 0 };
      currentPointerRef.current = { x: 0, y: 0 };
      setPointer({ x: 0, y: 0 });
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // Calculate normalized offset from container center [-1, 1]
      const relativeX = event.clientX - rect.left;
      const relativeY = event.clientY - rect.top;

      const normX = Math.max(-1, Math.min(1, (relativeX / rect.width) * 2 - 1));
      const normY = Math.max(-1, Math.min(1, (relativeY / rect.height) * 2 - 1));

      targetPointerRef.current = { x: normX, y: normY };
      startRafIfNeeded();
    };

    const handleMouseLeave = () => {
      // Gently return to origin when pointer exits hero
      targetPointerRef.current = { x: 0, y: 0 };
      startRafIfNeeded();
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
        isRafActiveRef.current = false;
      }
    };
  }, [isReducedMotion, isPointerCapable, startRafIfNeeded]);

  // Passive scroll progress tracking for hero scroll-out
  useEffect(() => {
    if (isReducedMotion) {
      setScrollProgress(0);
      return;
    }

    let scrollRaf: number | null = null;

    const handleScroll = () => {
      if (scrollRaf) return;

      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null;
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const heroHeight = rect.height;
        if (heroHeight <= 0) return;

        // Progress goes from 0 (top of hero at top of viewport) to 1 (hero scrolled out)
        const scrolled = Math.max(0, -rect.top);
        const progress = Math.min(1, Math.max(0, scrolled / heroHeight));
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
    };
  }, [isReducedMotion]);

  const isEntered = phase === "entered";


  return {
    containerRef,
    phase,
    isEntered,
    isReducedMotion,
    isPointerCapable,
    pointer,
    scrollProgress,
    isInputFocused,
    setIsInputFocused,
    replayEntrance,
  };
}

