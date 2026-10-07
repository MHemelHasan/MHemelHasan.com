"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MotionPortfolioHero } from "./motion-portfolio-hero";
import { VenturesSection } from "@/components/sections/ventures-section";
import { ImmersiveConversation } from "@/components/conversation/immersive-conversation";
import {
  ConversationProvider,
  useConversation,
} from "@/components/conversation/conversation-context";
import { RotateCcw, Sliders, EyeOff } from "lucide-react";

function MotionHeroLabContent() {
  const { openConversation } = useConversation();
  const [systemReducedMotion, setSystemReducedMotion] = useState(false);
  const [manualReducedMotion, setManualReducedMotion] = useState(false);
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);
  const [replayTrigger, setReplayTrigger] = useState(0);

  // Monitor both system OS media query and manual DOM class hook
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSystemReducedMotion(mediaQuery.matches);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setSystemReducedMotion(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    const checkManual = () => {
      setManualReducedMotion(
        document.documentElement.classList.contains("reduce-motion")
      );
    };
    checkManual();

    const observer = new MutationObserver(checkManual);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      observer.disconnect();
    };
  }, []);

  const isEffectiveReducedMotion = systemReducedMotion || manualReducedMotion;
  const reducedMotionSource: "System" | "Manual" | "None" = systemReducedMotion
    ? "System"
    : manualReducedMotion
    ? "Manual"
    : "None";

  const toggleManualReducedMotion = useCallback(() => {
    if (manualReducedMotion) {
      document.documentElement.classList.remove("reduce-motion");
      setManualReducedMotion(false);
    } else {
      document.documentElement.classList.add("reduce-motion");
      setManualReducedMotion(true);
    }
  }, [manualReducedMotion]);

  const handleReplay = useCallback(() => {
    setReplayTrigger((prev) => prev + 1);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-text-primary selection:bg-accent-soft selection:text-accent-sky">
      {/* Persistent Navigation */}
      <Header onStartConversation={() => openConversation()} />

      {/* Main Experience */}
      <main id="top" className="flex-1">
        {/* Isolated Motion Hero: triggers clean internal replay lifecycle without remounting */}
        <MotionPortfolioHero replayTrigger={replayTrigger} />

        {/* Ventures Section: Provides the immediate scroll transition context */}
        <VenturesSection onAsk={openConversation} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Immersive Conversation Modal */}
      <ImmersiveConversation />

      {/* Discreet Experiment Quality HUD (Collapsible) */}
      <aside
        aria-label="Motion Lab Controls"
        className="fixed bottom-4 right-4 z-50 select-none text-xs font-mono"
      >
        {isPanelMinimized ? (
          <button
            type="button"
            onClick={() => setIsPanelMinimized(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-interactive bg-surface-card text-text-secondary shadow-md transition-all hover:bg-surface-interactive hover:text-text-primary"
            title="Expand Motion Controls"
          >
            <Sliders className="h-4 w-4" />
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-lg border border-border-interactive bg-surface-card/95 px-3 py-2 shadow-lg backdrop-blur-md">
            <span className="font-sans font-semibold text-text-primary">
              Motion Lab
            </span>
            <span className="text-border-interactive">|</span>

            <button
              id="hud-replay-button"
              type="button"
              onClick={handleReplay}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded px-2 py-1 text-text-secondary transition-colors hover:bg-surface-interactive hover:text-text-primary active:scale-95"
              title="Replay Entrance Animation"
            >
              <RotateCcw className="h-3 w-3 text-brand-primary" />
              <span>Replay</span>
            </button>

            <button
              id="hud-reduced-motion-button"
              type="button"
              onClick={toggleManualReducedMotion}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded px-2 py-1 transition-colors ${
                isEffectiveReducedMotion
                  ? "bg-accent-soft font-semibold text-brand-primary"
                  : "text-text-secondary hover:bg-surface-interactive hover:text-text-primary"
              }`}
              title={
                systemReducedMotion
                  ? "OS reduced-motion preference active (System)"
                  : "Toggle Manual Reduced Motion Test Override"
              }
            >
              <span>
                Reduced Motion: {isEffectiveReducedMotion ? "ON" : "OFF"}
                <span className="ml-1 text-[10px] font-normal opacity-75">
                  ({reducedMotionSource})
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsPanelMinimized(true)}
              className="ml-1 text-text-muted hover:text-text-primary"
              title="Minimize panel"
            >
              <EyeOff className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

export function MotionHeroExperiment() {
  return (
    <ConversationProvider>
      <MotionHeroLabContent />
    </ConversationProvider>
  );
}
