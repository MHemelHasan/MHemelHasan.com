"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ConceptA } from "@/components/design-lab/ventures/concept-a";
import { ConceptB } from "@/components/design-lab/ventures/concept-b";
import { ConceptC } from "@/components/design-lab/ventures/concept-c";
import { Sparkles, Layers, FileText, Cpu, ArrowLeft, Eye, Sun, Moon } from "lucide-react";

type ConceptKey = "a" | "b" | "c" | "all";

function DesignLabContent() {
  const searchParams = useSearchParams();
  const initialConcept = (searchParams.get("concept") as ConceptKey) || "a";
  const urlTheme = searchParams.get("theme");

  const [activeConcept, setActiveConcept] = useState<ConceptKey>(
    ["a", "b", "c", "all"].includes(initialConcept) ? initialConcept : "a"
  );
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check initial theme from html or URL
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

  const conceptMetadata = {
    a: {
      id: "a",
      name: "Concept A",
      tagline: "Product Studio / Proof First",
      icon: Layers,
      summary:
        "Product specimen frame as primary visual anchor, surrounded by architectural provenance and verified functional capabilities. Confident, tangible, visual-proof first.",
    },
    b: {
      id: "b",
      name: "Concept B",
      tagline: "Founder Editorial Story",
      icon: FileText,
      summary:
        "High typographic authority, asymmetric 4-chapter narrative (Problem Space -> Architecture -> Behavior -> Horizon). Capabilities woven as narrative proof.",
    },
    c: {
      id: "c",
      name: "Concept C",
      tagline: "Systems Showcase / Product Engineering",
      icon: Cpu,
      summary:
        "Interactive 5-stage Conceptual Product Pipeline workbench with keyboard-navigable operational inspector and layered systems architecture.",
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-text-primary selection:bg-accent-soft selection:text-accent-sky">
      {/* Header */}
      <Header />

      {/* Main Exploration Workbench */}
      <main className="flex-1 pb-24">
        {/* Design Lab Control Bar */}
        <div className="sticky top-[57px] z-30 border-b border-border-interactive bg-surface-card/95 backdrop-blur-md px-4 py-3 shadow-xs">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-secondary hover:text-accent-sky transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Return to Live Portfolio</span>
              </Link>
              <span className="text-border-interactive">/</span>
              <span className="font-mono text-xs font-bold text-accent-sky">
                DESIGN LAB // PHASE 1C EXPLORATION
              </span>
            </div>

            {/* Concept Switcher Controls & Quick Theme Toggle */}
            <div className="flex items-center gap-3">
              <div
                role="tablist"
                aria-label="Ventures Design Concepts"
                className="flex items-center gap-1 rounded-lg border border-border-interactive bg-surface-nested p-1"
              >
                <button
                  type="button"
                  role="tab"
                  id="tab-concept-a"
                  aria-selected={activeConcept === "a"}
                  onClick={() => setConcept("a")}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    activeConcept === "a"
                      ? "bg-surface-card text-text-primary font-semibold shadow-xs border border-border-subtle"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Layers className="h-3.5 w-3.5 text-accent-sky" />
                  <span>Concept A</span>
                  <span className="hidden sm:inline text-text-muted font-normal">(Studio)</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-concept-b"
                  aria-selected={activeConcept === "b"}
                  onClick={() => setConcept("b")}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    activeConcept === "b"
                      ? "bg-surface-card text-text-primary font-semibold shadow-xs border border-border-subtle"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <FileText className="h-3.5 w-3.5 text-accent-sky" />
                  <span>Concept B</span>
                  <span className="hidden sm:inline text-text-muted font-normal">(Editorial)</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-concept-c"
                  aria-selected={activeConcept === "c"}
                  onClick={() => setConcept("c")}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    activeConcept === "c"
                      ? "bg-surface-card text-text-primary font-semibold shadow-xs border border-border-subtle"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Cpu className="h-3.5 w-3.5 text-accent-sky" />
                  <span>Concept C</span>
                  <span className="hidden sm:inline text-text-muted font-normal">(Systems)</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-concept-all"
                  aria-selected={activeConcept === "all"}
                  onClick={() => setConcept("all")}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    activeConcept === "all"
                      ? "bg-surface-card text-text-primary font-semibold shadow-xs border border-border-subtle"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Eye className="h-3.5 w-3.5 text-accent-sky" />
                  <span>Compare All</span>
                </button>
              </div>

              {/* Dedicated Lab Theme Toggle */}
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

        {/* Exploration Canvas */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-14 space-y-12">
          {/* Shared Standard Section Header (Ensures 100% fair baseline comparison) */}
          <div className="flex flex-col items-start md:items-center md:text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-status-beta/30 bg-status-beta/10 px-3 py-0.5 text-xs font-mono font-medium text-status-beta">
              <Sparkles className="h-3 w-3 text-status-beta" />
              <span>Independent Software Products</span>
            </div>
            <h2 className="mt-3.5 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Ventures I&apos;m Building
            </h2>
            <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl">
              Proprietary software conceived, architected, and engineered from the ground up — clearly distinguished from commercial client and company products.
            </p>
          </div>

          {/* Active Concept Explanation Banner */}
          {activeConcept !== "all" && (
            <div className="rounded-xl border border-border-subtle bg-surface-nested/50 p-4 sm:p-5 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 font-mono font-bold text-accent-sky mb-1">
                <span>{conceptMetadata[activeConcept].name}:</span>
                <span className="text-text-primary">
                  {conceptMetadata[activeConcept].tagline}
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {conceptMetadata[activeConcept].summary}
              </p>
            </div>
          )}

          {/* Concept Render Surface */}
          <div className="mt-8">
            {activeConcept === "a" && <ConceptA />}
            {activeConcept === "b" && <ConceptB />}
            {activeConcept === "c" && <ConceptC />}

            {/* Compare All View (Stacked for holistic multi-concept audit) */}
            {activeConcept === "all" && (
              <div className="space-y-24">
                <section className="space-y-6">
                  <div className="border-b border-border-interactive pb-3">
                    <span className="font-mono text-xs font-bold text-accent-sky uppercase tracking-wider">
                      CONCEPT DIRECTION A // PRODUCT STUDIO / PROOF FIRST
                    </span>
                    <h3 className="text-xl font-bold text-text-primary mt-1">
                      Specimen-Centric Product Architecture
                    </h3>
                  </div>
                  <ConceptA />
                </section>

                <section className="space-y-6 pt-12 border-t-2 border-border-interactive">
                  <div className="border-b border-border-interactive pb-3">
                    <span className="font-mono text-xs font-bold text-accent-sky uppercase tracking-wider">
                      CONCEPT DIRECTION B // FOUNDER EDITORIAL STORY
                    </span>
                    <h3 className="text-xl font-bold text-text-primary mt-1">
                      Asymmetric Typographic Narrative & Conviction
                    </h3>
                  </div>
                  <ConceptB />
                </section>

                <section className="space-y-6 pt-12 border-t-2 border-border-interactive">
                  <div className="border-b border-border-interactive pb-3">
                    <span className="font-mono text-xs font-bold text-accent-sky uppercase tracking-wider">
                      CONCEPT DIRECTION C // SYSTEMS SHOWCASE / PRODUCT ENGINEERING
                    </span>
                    <h3 className="text-xl font-bold text-text-primary mt-1">
                      Interactive 5-Stage Conceptual Pipeline Workbench
                    </h3>
                  </div>
                  <ConceptC />
                </section>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function DesignLabVenturesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-canvas flex items-center justify-center font-mono text-xs text-text-muted">
          Loading Design Lab...
        </div>
      }
    >
      <DesignLabContent />
    </Suspense>
  );
}
