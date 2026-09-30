"use client";

import { useState } from "react";
import { themeficProducts } from "@/data/products";
import { ProductRecord } from "@/types/product";
import {
  Layers,
  ShoppingBag,
  Zap,
  Globe,
  CheckCircle2,
  Building2,
  ArrowUpRight,
  MessageSquareText,
  Boxes,
  Code2,
  Target,
  Sparkles,
} from "lucide-react";

interface ProductsSectionProps {
  onAskInConversation?: (query: string) => void;
}

export function ProductsSection({ onAskInConversation }: ProductsSectionProps) {
  const [activeTab, setActiveTab] = useState<Record<string, "overview" | "technical">>({
    "bundlefic-shopify": "overview",
    "instantio-wp": "overview",
    "connectfic-webflow": "overview",
  });

  const featuredProducts = themeficProducts.filter((p) => p.isFeatured);
  const compactProducts = themeficProducts.filter((p) => !p.isFeatured);

  const handleAsk = (title: string) => {
    const query = `Tell me about ${title}`;
    if (onAskInConversation) {
      onAskInConversation(query);
    } else {
      const el = document.getElementById("conversation");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getEcosystemIcon = (ecosystem: string) => {
    switch (ecosystem) {
      case "shopify":
        return ShoppingBag;
      case "wordpress":
        return Zap;
      case "webflow":
        return Globe;
      default:
        return Layers;
    }
  };

  return (
    <section id="products" className="mt-24 sm:mt-32 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col items-start md:items-center md:text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
          <Building2 className="h-3.5 w-3.5" />
          <span>Commercial Production Software</span>
        </div>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          Products Led & Shipped
        </h2>
        <p className="mt-3.5 text-base sm:text-lg text-text-secondary leading-relaxed">
          Commercial applications and ecosystem platforms engineered at Themefic — powering merchants, creators, and online stores across Shopify, WordPress, and Webflow.
        </p>

        {/* Clear Attribution Badge */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-border-interactive bg-surface-card px-4 py-2 text-xs font-medium text-text-muted shadow-sm">
          <span className="font-semibold text-text-primary">Important Note:</span>
          <span>All products below were engineered at Themefic and are not personal ventures.</span>
        </div>
      </div>

      {/* 3 Featured Case Studies */}
      <div className="mt-12 lg:mt-16 space-y-10 sm:space-y-12">
        {featuredProducts.map((product, index) => {
          const Icon = getEcosystemIcon(product.ecosystem);
          const currentTab = activeTab[product.id] || "overview";

          return (
            <article
              key={product.id}
              className="rounded-3xl border border-border-interactive bg-surface-card p-6 sm:p-8 lg:p-10 shadow-lg shadow-slate-900/5 relative overflow-hidden transition-all duration-300 hover:border-emerald-500/40"
            >
              {/* Product Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border-subtle pb-6 sm:pb-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-border-interactive bg-surface-nested text-emerald-600 dark:text-emerald-400 shadow-sm">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                        {product.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {product.statusLabel}
                      </span>
                      <span className="rounded-md border border-border-interactive bg-surface-nested px-2.5 py-0.5 text-xs font-mono font-medium text-text-muted">
                        Built at Themefic
                      </span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-text-muted font-medium">
                      <span className="text-accent-sky font-semibold">{product.typeLabel}</span>
                      <span>•</span>
                      <span>{product.ecosystemLabel}</span>
                      <span>•</span>
                      <span className="text-text-secondary">{product.attribution?.role}</span>
                    </div>
                  </div>
                </div>

                {/* Header CTA */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAsk(product.title)}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border-interactive bg-surface-nested px-3.5 py-2 text-xs sm:text-sm font-medium text-text-primary transition-all hover:border-emerald-500/50 hover:bg-surface-interactive hover:text-emerald-600 dark:hover:text-emerald-400 active:scale-95"
                  >
                    <MessageSquareText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Ask about this</span>
                  </button>
                  {product.attribution?.companyUrl && (
                    <a
                      href={product.attribution.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-border-interactive bg-surface-nested text-text-muted hover:text-text-primary hover:border-border-interactive/80 transition-all"
                      aria-label={`View Themefic`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Grid: Case Study Content + Conceptual Platform Visual */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left/Main Column: Case Study Narrative (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-text-primary">
                      {product.tagline}
                    </h4>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      {product.summary}
                    </p>
                  </div>

                  {/* Problem & Contribution Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-border-interactive bg-surface-nested p-4.5">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-accent-sky mb-2">
                        <Target className="h-3.5 w-3.5" />
                        <span>The Problem Solved</span>
                      </div>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {product.problem}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border-interactive bg-surface-nested p-4.5">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                        <Code2 className="h-3.5 w-3.5" />
                        <span>My Contribution</span>
                      </div>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {product.contribution}
                      </p>
                    </div>
                  </div>

                  {/* Technical Scope Tags */}
                  <div>
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-3">
                      Verified Technical Scope
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {product.technicalScope?.map((scopeItem) => (
                        <span
                          key={scopeItem}
                          className="rounded-lg border border-border-interactive bg-surface-nested px-2.5 py-1 text-xs text-text-secondary"
                        >
                          {scopeItem}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verified Outcome Banner */}
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Production Outcome
                      </span>
                      <p className="mt-0.5 text-xs sm:text-sm font-medium text-text-primary">
                        {product.outcome}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Refined Neutral Product Category Visual (5 cols) */}
                <div className="lg:col-span-5 rounded-2xl border border-border-interactive bg-surface-nested p-6 flex flex-col justify-between h-full min-h-[300px]">
                  <div>
                    <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-4">
                      <span className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
                        Ecosystem Blueprint
                      </span>
                      <span className="text-[11px] font-mono text-accent-sky">
                        {product.ecosystem.toUpperCase()}
                      </span>
                    </div>

                    {/* Conceptual System Diagram */}
                    {product.ecosystem === "shopify" && (
                      <div className="space-y-3 py-2">
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border-interactive bg-surface-card text-xs">
                          <span className="font-semibold text-text-primary">Merchant Storefront</span>
                          <span className="text-emerald-500 font-mono text-[11px]">Bundle Injected</span>
                        </div>
                        <div className="flex justify-center text-text-muted">
                          <span className="text-xs font-mono">↓ Dynamic Tier Calculation</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border-interactive bg-surface-card text-xs">
                          <span className="font-semibold text-text-primary">Cart & Checkout</span>
                          <span className="text-accent-sky font-mono text-[11px]">Frictionless Sync</span>
                        </div>
                        <div className="flex justify-center text-text-muted">
                          <span className="text-xs font-mono">↓ Merchant Configuration</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border-interactive bg-surface-card text-xs">
                          <span className="font-semibold text-text-primary">Shopify Admin App Bridge</span>
                          <span className="text-purple-500 font-mono text-[11px]">Rule Engine</span>
                        </div>
                      </div>
                    )}

                    {product.ecosystem === "wordpress" && (
                      <div className="space-y-3 py-2">
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border-interactive bg-surface-card text-xs">
                          <span className="font-semibold text-text-primary">Product / Shop Page</span>
                          <span className="text-emerald-500 font-mono text-[11px]">Hook Listener</span>
                        </div>
                        <div className="flex justify-center text-text-muted">
                          <span className="text-xs font-mono">↓ Instant Trigger</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border-interactive bg-surface-card text-xs">
                          <span className="font-semibold text-text-primary">Slide-in Drawer Cart</span>
                          <span className="text-accent-sky font-mono text-[11px]">Client State</span>
                        </div>
                        <div className="flex justify-center text-text-muted">
                          <span className="text-xs font-mono">↓ One-Step Transition</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border-interactive bg-surface-card text-xs">
                          <span className="font-semibold text-text-primary">WooCommerce Checkout Core</span>
                          <span className="text-purple-500 font-mono text-[11px]">High Conversion</span>
                        </div>
                      </div>
                    )}

                    {product.ecosystem === "webflow" && (
                      <div className="space-y-3 py-2">
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border-interactive bg-surface-card text-xs">
                          <span className="font-semibold text-text-primary">Webflow Designer Canvas</span>
                          <span className="text-emerald-500 font-mono text-[11px]">In-Editor App</span>
                        </div>
                        <div className="flex justify-center text-text-muted">
                          <span className="text-xs font-mono">↓ Field Mapping Engine</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border-interactive bg-surface-card text-xs">
                          <span className="font-semibold text-text-primary">External Data Connector</span>
                          <span className="text-accent-sky font-mono text-[11px]">OAuth Sync</span>
                        </div>
                        <div className="flex justify-center text-text-muted">
                          <span className="text-xs font-mono">↓ Dynamic Update</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border-interactive bg-surface-card text-xs">
                          <span className="font-semibold text-text-primary">Published Webflow Site</span>
                          <span className="text-purple-500 font-mono text-[11px]">Live Content</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Capabilities Footnote */}
                  <div className="mt-4 pt-3 border-t border-border-subtle">
                    <span className="text-[11px] font-mono text-text-muted block mb-2">
                      Key Capabilities:
                    </span>
                    <ul className="space-y-1.5">
                      {product.capabilities.slice(0, 3).map((cap) => (
                        <li key={cap} className="text-xs text-text-secondary flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Additional / Compact Products Grid */}
      <div className="mt-14 sm:mt-16">
        <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Boxes className="h-4 w-4 text-accent-sky" />
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-text-primary">
              Additional Commercial Products Built at Themefic
            </h3>
          </div>
          <span className="text-xs text-text-muted hidden sm:inline-block">
            Shopify • WordPress • Webflow
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {compactProducts.map((product) => {
            const Icon = getEcosystemIcon(product.ecosystem);
            return (
              <div
                key={product.id}
                className="group rounded-2xl border border-border-interactive bg-surface-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-surface-nested"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-interactive bg-surface-nested text-emerald-600 dark:text-emerald-400 group-hover:bg-surface-card">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="rounded-md border border-border-subtle bg-surface-nested px-2 py-0.5 text-[10px] font-mono font-medium text-text-muted">
                    Built at Themefic
                  </span>
                </div>

                <div className="mt-3.5">
                  <h4 className="text-base font-bold text-text-primary group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {product.title}
                  </h4>
                  <span className="text-xs font-semibold text-accent-sky">
                    {product.typeLabel}
                  </span>
                  <p className="mt-2 text-xs text-text-secondary leading-relaxed line-clamp-3">
                    {product.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                    Commercial Release
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAsk(product.title)}
                    className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-accent-sky hover:underline"
                  >
                    <span>Ask about this</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
