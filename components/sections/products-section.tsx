"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { themeficProducts } from "@/data/products";
import { ProductEvidence } from "@/components/sections/product-evidence";

interface ProductsSectionProps {
  onAskInConversation?: (query: string) => void;
}

export function ProductsSection({ onAskInConversation }: ProductsSectionProps) {
  const featuredProducts = themeficProducts.filter((product) => product.isFeatured);
  const [activeProductId, setActiveProductId] = useState(featuredProducts[0]?.id ?? "");
  const activeProduct = featuredProducts.find((product) => product.id === activeProductId) ?? featuredProducts[0];

  if (!activeProduct) return null;

  const handleAsk = (query: string) => {
    if (onAskInConversation) {
      onAskInConversation(query);
      return;
    }

    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="products" className="scroll-mt-24 border-t-2 border-text-primary bg-canvas">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-28">
        <header className="grid gap-8 border-b border-border-interactive pb-10 lg:grid-cols-12 lg:gap-12 lg:pb-12">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold text-accent-sky">Commercial production software</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-text-primary sm:text-5xl lg:text-6xl">
              Products Led &amp; Shipped
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-1">
            <p className="max-w-xl text-xl leading-8 text-text-primary">
              Product engineering across Shopify, WordPress, and Webflow.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-text-secondary">
              Commercial applications engineered in company roles at Themefic, distinct from the personal ventures above.
            </p>
            <a
              href="https://themefic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-text-primary transition-colors hover:text-accent-sky"
            >
              Engineered at Themefic
              <ArrowUpRight className="h-4 w-4 text-accent-sky" aria-hidden="true" />
            </a>
          </div>
        </header>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="flex items-end justify-between border-b border-text-primary pb-4">
              <h3 className="text-lg font-semibold text-text-primary">Selected product stories</h3>
              <span className="font-mono text-xs text-text-muted">03 / 06</span>
            </div>

            <div role="group" aria-label="Selected Themefic products">
              {featuredProducts.map((product, index) => {
                const isActive = activeProduct.id === product.id;

                return (
                  <button
                    key={product.id}
                    id={`product-tab-${product.id}`}
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="featured-product-detail"
                    onClick={() => setActiveProductId(product.id)}
                    className={`grid min-h-24 w-full grid-cols-[2rem_minmax(0,1fr)_auto] items-start gap-3 border-b border-border-subtle py-5 text-left transition-colors ${
                      isActive ? "bg-accent-soft px-4 text-text-primary" : "text-text-secondary hover:bg-surface-nested/60"
                    }`}
                  >
                    <span className="pt-1 font-mono text-xs text-accent-sky">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-lg font-semibold text-text-primary">{product.title}</span>
                      <span className="mt-1 block text-sm leading-5">{product.typeLabel}</span>
                    </span>
                    <span
                      className={`mt-2 h-2.5 w-2.5 border border-accent-sky ${isActive ? "bg-accent-sky" : "bg-transparent"}`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-text-muted">
              Each story connects a product problem to the engineering responsibility behind its commercial release.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ProductEvidence product={activeProduct} onAsk={handleAsk} />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-border-interactive pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-text-secondary">
            The complete Themefic product portfolio includes six verified commercial releases.
          </p>
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center gap-2 self-start border-b border-accent-sky text-sm font-semibold text-text-primary transition-colors hover:text-accent-sky sm:self-auto"
          >
            Explore all shipped products
            <ArrowRight className="h-4 w-4 text-accent-sky" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
