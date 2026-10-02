"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ConceptARound2 } from "@/components/design-lab/ventures-round2/concept-a";
import { ConceptBRound2 } from "@/components/design-lab/ventures-round2/concept-b";
import { ConceptCRound2 } from "@/components/design-lab/ventures-round2/concept-c";
import { ConceptA as Round1ConceptA } from "@/components/design-lab/ventures/concept-a";
import { ArrowLeft, Sun, Moon, Feather, Sparkles, Binary, Columns, SplitSquareVertical } from "lucide-react";

type ConceptKey = "a" | "b" | "c" | "all" | "compare-r1-r2";

function DesignLabRound2Content() {
  const searchParams = useSearchParams();
  const initialConcept = (searchParams.get("concept") as ConceptKey) || "a";
  const urlTheme = searchParams.get("theme");

  const [activeConcept, setActiveConcept] = useState<ConceptKey>(
    ["a", "b", "c", "all", "compare-r1-r2"].includes(initialConcept) ? initialConcept : "a"
  );
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (urlTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      setCurrentTheme("dark");
    } else if (urlTheme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      setCurrentTheme("light");
    } else {
      const isDark = document.documentElement.classList.contains("dark");
      setCurrentTheme(isDark ? "dark" : "light");
    }
  }, [urlTheme]);

  const toggleTheme = () => {
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
    setCurrentTheme(nextTheme);
  };

  const setConcept = (key: ConceptKey) => {
    setActiveConcept(key);
    const url = new URL(window.location.href);
    url.searchParams.set("concept", key);
    window.history.replaceState({}, "", url.toString());
  };

  const directions = {
    a: {
      name: "Direction A",
      tagline: "Human Editorial Founder",
      archetype: "Storytelling-Driven / Literary Human Editorial",
      summary:
        "Warm paper canvas, serif display typography, asymmetrical whitespace, and unboxed narrative chapters. Centers on authorial voice and product thesis rather than component chrome.",
    },
    b: {
      name: "Direction B",
      tagline: "Product Studio / Visual-First",
      archetype: "Hero-Centric / Product Studio Showcase",
      summary:
        "Contemporary product studio aesthetic with gallery gray canvas, pure white elevated hero card, and an interactive multi-platform post composer specimen demonstrating unified workflow execution.",
    },
    c: {
      name: "Direction C",
      tagline: "Quiet Systems / Engineering Clarity",
      archetype: "Swiss International Typographic Grid / Tabular Architecture",
      summary:
        "Disciplined architectural slate canvas, continuous 5-stage connected workflow flowband, and a structural 4-column ledger. High engineering density without dashboard cosplay.",
    },
  };

  return (
    <div className="min-h-screen bg-surface-canvas text-text-primary flex flex-col font-sans transition-colors duration-200">
      {/* Global Navigation Header (Read-only reference) */}
      <Header />

      {/* Main Exploration Sandbox */}
      <main className="flex-1 pb-24">
        {/* Lab Navigation Banner */}
        <div className="border-b border-border-subtle bg-surface-card/60 backdrop-blur-md sticky top-16 z-30 py-3 px-4 sm:px-6">
          <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link
                href="/design-lab/ventures"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Round 1 Lab</span>
              </Link>
              <span className="text-border-interactive">/</span>
              <span className="text-xs font-mono font-bold text-accent-sky">
                Round 2 Exploration (design-director & ux-engineer)
              </span>
            </div>

            {/* Direction Selector Tabs */}
            <div className="flex items-center gap-2">
              <div
                role="tablist"
                aria-label="Ventures Round 2 Art Directions"
                className="flex items-center gap-1 rounded-lg border border-border-interactive bg-surface-nested p-1"
              >
                <button
                  type="button"
                  role="tab"
                  id="tab-dir-a"
                  aria-selected={activeConcept === "a"}
                  onClick={() => setConcept("a")}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    activeConcept === "a"
                      ? "bg-surface-card text-text-primary font-semibold shadow-xs border border-border-subtle"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Feather className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Direction A</span>
                  <span className="hidden sm:inline text-text-muted font-normal">(Editorial)</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-dir-b"
                  aria-selected={activeConcept === "b"}
                  onClick={() => setConcept("b")}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    activeConcept === "b"
                      ? "bg-surface-card text-text-primary font-semibold shadow-xs border border-border-subtle"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400" />
                  <span>Direction B</span>
                  <span className="hidden sm:inline text-text-muted font-normal">(Studio)</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-dir-c"
                  aria-selected={activeConcept === "c"}
                  onClick={() => setConcept("c")}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    activeConcept === "c"
                      ? "bg-surface-card text-text-primary font-semibold shadow-xs border border-border-subtle"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Binary className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                  <span>Direction C</span>
                  <span className="hidden sm:inline text-text-muted font-normal">(Systems)</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-dir-all"
                  aria-selected={activeConcept === "all"}
                  onClick={() => setConcept("all")}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    activeConcept === "all"
                      ? "bg-surface-card text-text-primary font-semibold shadow-xs border border-border-subtle"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Columns className="h-3.5 w-3.5 text-accent-sky" />
                  <span>All Round 2</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-dir-compare"
                  aria-selected={activeConcept === "compare-r1-r2"}
                  onClick={() => setConcept("compare-r1-r2")}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    activeConcept === "compare-r1-r2"
                      ? "bg-surface-card text-text-primary font-semibold shadow-xs border border-border-subtle"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <SplitSquareVertical className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                  <span>R1 vs R2</span>
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
                className="flex items-center gap-1.5 rounded-lg border border-border-interactive bg-surface-nested px-2.5 py-1.5 text-xs font-mono font-medium text-text-secondary hover:text-text-primary hover:bg-surface-card transition-colors cursor-pointer"
              >
                {currentTheme === "dark" ? (
                  <>
                    <Sun className="h-3.5 w-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5 text-indigo-500" />
                    <span className="hidden sm:inline">Dark</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Exploration Canvas Area */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-8 sm:pt-12">
          {/* Active Direction Metadata Card */}
          {["a", "b", "c"].includes(activeConcept) && (
            <div className="mb-8 rounded-2xl border border-border-subtle bg-surface-nested/40 p-4 sm:p-5 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <span className="font-mono font-bold text-accent-sky">
                  {directions[activeConcept as "a" | "b" | "c"].name}:
                </span>
                <span className="font-bold text-text-primary">
                  {directions[activeConcept as "a" | "b" | "c"].tagline}
                </span>
                <span className="rounded-full bg-surface-card border border-border-subtle px-2 py-0.5 text-xs text-text-muted">
                  {directions[activeConcept as "a" | "b" | "c"].archetype}
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed max-w-3xl">
                {directions[activeConcept as "a" | "b" | "c"].summary}
              </p>
            </div>
          )}

          {/* Direction Render Surface */}
          <div className="mt-4">
            {activeConcept === "a" && <ConceptARound2 />}
            {activeConcept === "b" && <ConceptBRound2 />}
            {activeConcept === "c" && <ConceptCRound2 />}

            {/* Compare All Round 2 */}
            {activeConcept === "all" && (
              <div className="space-y-24">
                <section className="space-y-4">
                  <div className="border-b border-border-interactive pb-2">
                    <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      DIRECTION A · HUMAN EDITORIAL FOUNDER
                    </span>
                  </div>
                  <ConceptARound2 />
                </section>

                <section className="space-y-4 pt-12 border-t-2 border-border-interactive">
                  <div className="border-b border-border-interactive pb-2">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-wider">
                      DIRECTION B · PRODUCT STUDIO / VISUAL-FIRST
                    </span>
                  </div>
                  <ConceptBRound2 />
                </section>

                <section className="space-y-4 pt-12 border-t-2 border-border-interactive">
                  <div className="border-b border-border-interactive pb-2">
                    <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                      DIRECTION C · QUIET SYSTEMS / ENGINEERING CLARITY
                    </span>
                  </div>
                  <ConceptCRound2 />
                </section>
              </div>
            )}

            {/* Round 1 vs Round 2 Comparison Mode */}
            {activeConcept === "compare-r1-r2" && (
              <div className="space-y-20">
                <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4 text-xs font-mono text-text-secondary">
                  <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">
                    VISUAL SYSTEM SHIFT AUDIT:
                  </span>
                  Comparing Round 1 Concept A (hairlines, fake-tech labels, neutral template look) against the three distinct Round 2 Visual Systems below.
                </div>

                <section className="space-y-4">
                  <div className="border-b border-border-interactive pb-2">
                    <span className="font-mono text-xs font-bold text-text-muted uppercase tracking-wider">
                      ROUND 1 (REFERENCE BASELINE) · CONCEPT A
                    </span>
                  </div>
                  <div className="opacity-90 grayscale-[20%]">
                    <Round1ConceptA />
                  </div>
                </section>

                <section className="space-y-4 pt-12 border-t-2 border-border-interactive">
                  <div className="border-b border-border-interactive pb-2">
                    <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      ROUND 2 · DIRECTION A (HUMAN EDITORIAL FOUNDER)
                    </span>
                  </div>
                  <ConceptARound2 />
                </section>

                <section className="space-y-4 pt-12 border-t-2 border-border-interactive">
                  <div className="border-b border-border-interactive pb-2">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-wider">
                      ROUND 2 · DIRECTION B (PRODUCT STUDIO / VISUAL-FIRST)
                    </span>
                  </div>
                  <ConceptBRound2 />
                </section>

                <section className="space-y-4 pt-12 border-t-2 border-border-interactive">
                  <div className="border-b border-border-interactive pb-2">
                    <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                      ROUND 2 · DIRECTION C (QUIET SYSTEMS / ENGINEERING CLARITY)
                    </span>
                  </div>
                  <ConceptCRound2 />
                </section>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default function DesignLabRound2Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-canvas p-8 text-center text-xs font-mono">Loading Design Lab...</div>}>
      <DesignLabRound2Content />
    </Suspense>
  );
}
