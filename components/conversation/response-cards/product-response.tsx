"use client";

import { useState } from "react";
import { themeficProducts } from "@/data/products";
import { Layers, ChevronDown, ChevronUp, ShoppingBag, Globe, LayoutGrid, ArrowRight, GitFork, Bot, Compass } from "lucide-react";
import { PromptSuggestion } from "@/types/conversation";

interface ProductResponseProps {
  onSelectPrompt?: (prompt: PromptSuggestion) => void;
  onNavigateSection?: (anchor: string) => void;
}

export function ProductResponse({ onSelectPrompt, onNavigateSection }: ProductResponseProps) {
  const [showAll, setShowAll] = useState(false);

  const featured = themeficProducts.filter((p) => p.isFeatured);
  const additional = themeficProducts.filter((p) => !p.isFeatured);

  const getEcosystemMeta = (ecosystem: string) => {
    switch (ecosystem) {
      case "shopify":
        return {
          badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
          icon: <ShoppingBag className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />,
        };
      case "wordpress":
        return {
          badge: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-400",
          icon: <Globe className="h-3 w-3 text-sky-600 dark:text-sky-400" />,
        };
      case "webflow":
      default:
        return {
          badge: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400",
          icon: <LayoutGrid className="h-3 w-3 text-blue-600 dark:text-blue-400" />,
        };
    }
  };

  return (
    <div className="space-y-5 text-text-primary">
      {/* Level 1: Conversational Prose Introduction */}
      <p className="text-sm sm:text-base leading-relaxed text-text-primary">
        At <strong className="font-semibold text-text-primary">Themefic</strong>, I serve as Technical Lead for Platform Apps & Product Engineering. I&apos;ve led architecture, API integrations, and engineering delivery across six commercial products spanning the Shopify, WordPress, and Webflow ecosystems.
      </p>

      {/* Attribution & Context */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-text-muted border-b border-border-subtle pb-2.5">
        <span className="font-mono uppercase tracking-wider text-[11px]">
          Company Work · All Products Engineered at Themefic
        </span>
        <span className="font-mono text-[11px]">3 Featured / 6 Total</span>
      </div>

      {/* Level 2: Three Featured Highlights (Clean, unboxed flow) */}
      <div className="space-y-3">
        {featured.map((product) => {
          const meta = getEcosystemMeta(product.ecosystem);
          return (
            <div
              key={product.id}
              className="rounded-2xl border border-border-interactive bg-surface-card p-4 space-y-2 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-text-primary">
                      {product.title}
                    </h4>
                    <span className="text-[11px] font-mono text-text-muted">• Built at Themefic</span>
                  </div>
                  <p className="text-xs font-medium text-text-secondary mt-0.5">
                    {product.tagline}
                  </p>
                </div>

                <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize ${meta.badge}`}>
                  {meta.icon}
                  <span>{product.ecosystem}</span>
                </div>
              </div>

              {product.problem && (
                <div className="text-xs text-text-secondary pt-1">
                  <span className="font-semibold text-text-primary">Problem solved: </span>
                  {product.problem}
                </div>
              )}

              {product.contribution && (
                <div className="text-xs text-text-muted">
                  <span className="font-semibold text-text-secondary">My role: </span>
                  {product.contribution}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progressive Disclosure Toggle for Additional 3 */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="w-full inline-flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-border-interactive bg-surface-nested/60 px-4 py-2.5 text-xs font-semibold text-text-secondary hover:border-accent-sky/60 hover:text-text-primary transition-all active:scale-[0.99]"
        >
          <span>
            {showAll
              ? "Hide additional 3 products"
              : "Want to see the other 3 products? (Quotezic, Ultimate Addons, Bundlefic Webflow)"}
          </span>
          {showAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showAll && (
          <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {additional.map((product) => {
              const meta = getEcosystemMeta(product.ecosystem);
              return (
                <div
                  key={product.id}
                  className="rounded-xl border border-border-subtle bg-surface-card p-3 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-text-primary">{product.title}</span>
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize ${meta.badge}`}>
                      {product.ecosystem}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-tight line-clamp-2">
                    {product.tagline}
                  </p>
                  <span className="block text-[10px] font-mono text-text-muted">Built at Themefic</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Contextual Next Prompts & Deep Link */}
      <div className="pt-3 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs">
        {onSelectPrompt && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onSelectPrompt({
                  id: "ask-pipeline",
                  label: "How I build products",
                  iconName: "GitFork",
                  targetIntent: "pipeline",
                  sampleQuery: "How do you build?",
                })
              }
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-interactive bg-surface-card px-3 py-1 text-text-secondary hover:border-accent-sky hover:text-accent-sky transition-colors"
            >
              <GitFork className="h-3 w-3 text-purple-500" />
              <span>How I build products →</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onSelectPrompt({
                  id: "ask-social-ai",
                  label: "What are you building now?",
                  iconName: "Bot",
                  targetIntent: "social_ai",
                  sampleQuery: "Tell me about Social AI",
                })
              }
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-interactive bg-surface-card px-3 py-1 text-text-secondary hover:border-accent-sky hover:text-accent-sky transition-colors"
            >
              <Bot className="h-3 w-3 text-amber-500" />
              <span>What I&apos;m building now →</span>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => onNavigateSection?.("#products")}
          className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-accent-sky hover:underline ml-auto"
        >
          <span>View full case studies below</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
