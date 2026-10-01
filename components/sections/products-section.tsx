"use client";

import { themeficProducts } from "@/data/products";
import {
  ArrowUpRight,
  MessageSquareText,
  ChevronDown,
  Building2,
  CheckCircle2,
} from "lucide-react";

interface ProductsSectionProps {
  onAskInConversation?: (query: string) => void;
}

export function ProductsSection({ onAskInConversation }: ProductsSectionProps) {
  const featuredProducts = themeficProducts.filter((p) => p.isFeatured);
  const secondaryProducts = themeficProducts.filter((p) => !p.isFeatured);

  const product1 = featuredProducts[0]; // Bundlefic Shopify
  const product2 = featuredProducts[1]; // Instantio WordPress
  const product3 = featuredProducts[2]; // Connectfic Webflow

  const handleAsk = (title: string) => {
    const query = `Tell me about ${title}`;
    if (onAskInConversation) {
      onAskInConversation(query);
    } else {
      const el = document.getElementById("conversation");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="products" className="mt-24 sm:mt-32 scroll-mt-24">
      {/* Section Header / Masthead */}
      <div className="border-b border-border-subtle pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              Commercial Production Software
            </span>
          </div>
          <span className="text-xs font-mono text-text-muted">
            Engineered at Themefic
          </span>
        </div>

        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          Products Led & Shipped
        </h2>

        <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl">
          Commercial applications and ecosystem platforms engineered at Themefic — powering merchants, creators, and online stores across Shopify, WordPress, and Webflow.
        </p>

        {/* Quiet Editorial Attribution Note */}
        <p className="mt-3 text-xs text-text-muted font-mono leading-relaxed">
          <span className="font-semibold text-text-secondary">Attribution Notice:</span> All products below were engineered during company roles at Themefic as commercial client and ecosystem software. Distinct from independent founder ventures.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* CHAPTER 01 — BUNDLEFIC (SHOPIFY APP)                                      */}
      {/* Composition: Deep Architectural Narrative & Storefront Cart Mechanics    */}
      {/* ========================================================================= */}
      {product1 && (
        <article className="pt-10 sm:pt-14">
          {/* Chapter Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                01 / Shopify App
              </span>
              <span className="text-border-interactive">•</span>
              <span className="text-text-muted">{product1.attribution?.role}</span>
              <span className="text-border-interactive">•</span>
              <span className="text-text-secondary font-medium">Built at Themefic</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-text-muted">
                {product1.statusLabel}
              </span>
              {product1.attribution?.companyUrl && (
                <a
                  href={product1.attribution.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-text-muted hover:text-text-primary transition-colors"
                  aria-label="View Themefic website"
                >
                  <span>themefic.com</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          {/* Product Headline & Tagline */}
          <div className="mt-2">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              {product1.title}
            </h3>
            <p className="mt-1 text-base sm:text-lg font-medium text-text-secondary">
              {product1.tagline}
            </p>
          </div>

          {/* Two-Column Editorial Narrative */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Commercial Context & The Friction */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                  Commercial Context & The Problem
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {product1.problem}
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {product1.summary}
                </p>
              </div>

              {/* Quiet Production Outcome */}
              <div className="pt-2 flex items-start gap-2 text-xs text-text-secondary">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-mono text-text-primary">
                  {product1.outcome}
                </span>
              </div>
            </div>

            {/* Right: Engineering Architecture & Mechanics */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                  Engineering Architecture & Contribution
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed font-medium">
                  {product1.contribution}
                </p>
              </div>

              {/* Core Capabilities Breakdown */}
              <ul className="space-y-2 pt-1 text-xs text-text-secondary">
                {product1.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Scope Specification Row */}
          <div className="mt-6 pt-5 border-t border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-text-muted font-mono">
              <span className="font-semibold text-text-secondary uppercase tracking-wider text-[11px]">
                Technical Scope:
              </span>
              {product1.technicalScope?.map((scope, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  {idx > 0 && <span className="text-border-interactive hidden sm:inline">•</span>}
                  <span>{scope}</span>
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleAsk(product1.title)}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-accent-sky hover:underline shrink-0"
            >
              <MessageSquareText className="h-3.5 w-3.5 text-accent-sky" />
              <span>Ask about Bundlefic in conversation</span>
            </button>
          </div>
        </article>
      )}

      {/* Hairline Divider between Case Studies */}
      <div className="border-t border-border-subtle my-10 sm:my-14" />

      {/* ========================================================================= */}
      {/* CHAPTER 02 — INSTANTIO (WORDPRESS / WOOCOMMERCE PLUGIN)                    */}
      {/* Composition: Alternate Cadence — 3-Column Horizontal Engineering Matrix   */}
      {/* ========================================================================= */}
      {product2 && (
        <article>
          {/* Chapter Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
              <span className="font-bold text-accent-sky uppercase tracking-wider">
                02 / WordPress Plugin
              </span>
              <span className="text-border-interactive">•</span>
              <span className="text-text-muted">{product2.attribution?.role}</span>
              <span className="text-border-interactive">•</span>
              <span className="text-text-secondary font-medium">Built at Themefic</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-text-muted">
                {product2.statusLabel}
              </span>
              {product2.attribution?.companyUrl && (
                <a
                  href={product2.attribution.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-text-muted hover:text-text-primary transition-colors"
                  aria-label="View Themefic website"
                >
                  <span>themefic.com</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          {/* Product Headline & Tagline */}
          <div className="mt-2">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              {product2.title}
            </h3>
            <p className="mt-1 text-base sm:text-lg font-medium text-text-secondary">
              {product2.tagline}
            </p>
          </div>

          {/* 3-Column Engineering Matrix (Varied Rhythm) */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* Column 1: Friction Analysis */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                Friction Analysis
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {product2.problem}
              </p>
              <p className="text-xs text-text-muted leading-relaxed pt-1">
                {product2.summary}
              </p>
            </div>

            {/* Column 2: Engineering Execution */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                Plugin Engineering Execution
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed font-medium">
                {product2.contribution}
              </p>
              <div className="pt-2 flex items-start gap-2 text-xs text-text-secondary">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-mono text-text-primary">
                  {product2.outcome}
                </span>
              </div>
            </div>

            {/* Column 3: System Characteristics */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                Architectural Characteristics
              </h4>
              <ul className="space-y-2 text-xs text-text-secondary">
                {product2.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-sky shrink-0 mt-1.5" />
                    <span className="leading-snug">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Scope Strip */}
          <div className="mt-6 pt-5 border-t border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-text-muted font-mono">
              <span className="font-semibold text-text-secondary uppercase tracking-wider text-[11px]">
                Technical Scope:
              </span>
              {product2.technicalScope?.map((scope, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  {idx > 0 && <span className="text-border-interactive hidden sm:inline">•</span>}
                  <span>{scope}</span>
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleAsk(product2.title)}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-accent-sky hover:underline shrink-0"
            >
              <MessageSquareText className="h-3.5 w-3.5 text-accent-sky" />
              <span>Ask about Instantio in conversation</span>
            </button>
          </div>
        </article>
      )}

      {/* Hairline Divider between Case Studies */}
      <div className="border-t border-border-subtle my-10 sm:my-14" />

      {/* ========================================================================= */}
      {/* CHAPTER 03 — CONNECTFIC (WEBFLOW APP)                                     */}
      {/* Composition: High-Density Split — In-Designer Sync & External Bridge       */}
      {/* ========================================================================= */}
      {product3 && (
        <article>
          {/* Chapter Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
              <span className="font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                03 / Webflow App
              </span>
              <span className="text-border-interactive">•</span>
              <span className="text-text-muted">{product3.attribution?.role}</span>
              <span className="text-border-interactive">•</span>
              <span className="text-text-secondary font-medium">Built at Themefic</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-text-muted">
                {product3.statusLabel}
              </span>
              {product3.attribution?.companyUrl && (
                <a
                  href={product3.attribution.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-text-muted hover:text-text-primary transition-colors"
                  aria-label="View Themefic website"
                >
                  <span>themefic.com</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          {/* Product Headline & Tagline */}
          <div className="mt-2">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              {product3.title}
            </h3>
            <p className="mt-1 text-base sm:text-lg font-medium text-text-secondary">
              {product3.tagline}
            </p>
          </div>

          {/* High-Density Split */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (5 cols): Creator Context & Outcome */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                  Creator Context & Feed Friction
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {product3.problem}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {product3.summary}
              </p>

              <div className="pt-1 flex items-start gap-2 text-xs text-text-secondary">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-mono text-text-primary">
                  {product3.outcome}
                </span>
              </div>
            </div>

            {/* Right Column (7 cols): Engineering Scope & Bridge */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                  Engineering Scope & Integration Mechanics
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed font-medium">
                  {product3.contribution}
                </p>
              </div>

              {/* 2x2 Quiet Definition Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {product3.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border border-border-subtle bg-surface-card/60 text-xs text-text-secondary flex items-start gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                    <span className="leading-snug">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Scope Strip */}
          <div className="mt-6 pt-5 border-t border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-text-muted font-mono">
              <span className="font-semibold text-text-secondary uppercase tracking-wider text-[11px]">
                Technical Scope:
              </span>
              {product3.technicalScope?.map((scope, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  {idx > 0 && <span className="text-border-interactive hidden sm:inline">•</span>}
                  <span>{scope}</span>
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleAsk(product3.title)}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-accent-sky hover:underline shrink-0"
            >
              <MessageSquareText className="h-3.5 w-3.5 text-accent-sky" />
              <span>Ask about Connectfic in conversation</span>
            </button>
          </div>
        </article>
      )}

      {/* ========================================================================= */}
      {/* SECONDARY PRODUCTS — COMPACT EDITORIAL INDEX                              */}
      {/* Composition: Structured Rows with Accessible Progressive Disclosure       */}
      {/* ========================================================================= */}
      <div className="mt-14 sm:mt-20 pt-8 border-t border-border-subtle">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-text-primary">
              Additional Commercial Product Work
            </h3>
            <p className="mt-1 text-xs text-text-muted">
              Commercial plugins and platform applications engineered at Themefic across Shopify, WordPress, and Webflow.
            </p>
          </div>
          <span className="text-xs font-mono text-text-muted shrink-0">
            3 Shipped Products
          </span>
        </div>

        {/* Structured Editorial Rows */}
        <div className="divide-y divide-border-subtle border-y border-border-subtle">
          {secondaryProducts.map((product) => {
            const isWebflowBundlefic = product.id === "bundlefic-webflow";
            const platformBadgeColor =
              product.ecosystem === "shopify"
                ? "text-emerald-600 dark:text-emerald-400"
                : product.ecosystem === "wordpress"
                ? "text-accent-sky"
                : "text-purple-600 dark:text-purple-400";

            return (
              <div
                key={product.id}
                className="py-5 transition-colors hover:bg-surface-nested/20"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left Column: Identity & Description */}
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className={`font-bold uppercase tracking-wider text-[11px] ${platformBadgeColor}`}>
                        {product.typeLabel}
                      </span>
                      <span className="text-border-interactive">•</span>
                      <span className="text-text-muted">{product.attribution?.role}</span>
                      <span className="text-border-interactive">•</span>
                      <span className="text-text-secondary">Built at Themefic</span>
                      {isWebflowBundlefic && (
                        <>
                          <span className="text-border-interactive">•</span>
                          <span className="rounded bg-surface-nested px-1.5 py-0.2 text-[10px] font-mono text-purple-600 dark:text-purple-400 border border-border-subtle">
                            Webflow Edition
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-baseline gap-2.5">
                      <h4 className="text-base sm:text-lg font-bold text-text-primary">
                        {product.title}
                      </h4>
                      <span className="text-xs text-text-muted font-normal hidden sm:inline">
                        — {product.tagline}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {product.summary}
                    </p>

                    {/* Accessible Progressive Disclosure for Verified Capabilities */}
                    {product.capabilities && product.capabilities.length > 0 && (
                      <details className="group pt-1 text-xs">
                        <summary className="cursor-pointer select-none font-mono text-[11px] text-accent-sky hover:underline list-none flex items-center gap-1.5 py-1">
                          <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-open:rotate-180 text-accent-sky" />
                          <span>View verified capabilities ({product.capabilities.length})</span>
                        </summary>
                        <ul className="mt-2.5 space-y-1.5 pl-4 border-l border-border-subtle text-text-muted">
                          {product.capabilities.map((cap, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="h-1 w-1 rounded-full bg-text-muted shrink-0 mt-1.5" />
                              <span className="leading-snug">{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>

                  {/* Right Column: Inline Action Bridge */}
                  <div className="flex items-center gap-3 shrink-0 pt-1 md:pt-0">
                    <button
                      type="button"
                      onClick={() => handleAsk(product.title)}
                      className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-accent-sky hover:underline py-1"
                    >
                      <MessageSquareText className="h-3.5 w-3.5" />
                      <span>Ask about this</span>
                    </button>

                    {product.attribution?.companyUrl && (
                      <a
                        href={product.attribution.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-border-subtle bg-surface-card text-text-muted hover:text-text-primary hover:border-border-interactive transition-colors"
                        aria-label={`View Themefic website for ${product.title}`}
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
