"use client";

import { personalProfile } from "@/data/profile";
import { themeficProducts } from "@/data/products";
import { ResponseIntro, ResponseSection, ResponseSectionLink } from "./response-primitives";

interface ProductResponseProps {
  onNavigateSection?: (anchor: string) => void;
}

export function ProductResponse({ onNavigateSection }: ProductResponseProps) {
  const themeficRole = personalProfile.themeficRole;
  const featured = themeficProducts.filter((product) => product.isFeatured);
  const additional = themeficProducts.filter((product) => !product.isFeatured);

  if (!themeficRole) return null;

  return (
    <div className="space-y-6 text-text-primary">
      <ResponseIntro>
        At <strong className="font-semibold">Themefic</strong>, my role is{" "}
        <strong className="font-semibold">{themeficRole.title}</strong>. The portfolio
        includes six commercial products across Shopify, WordPress, and Webflow.
      </ResponseIntro>

      <ResponseSection label="Selected product stories" title="Three ecosystems, one product-engineering practice">
        <div className="divide-y divide-border-subtle border-y border-border-subtle">
          {featured.map((product, index) => (
            <article key={product.id} className="grid gap-3 py-5 sm:grid-cols-[2.5rem_1fr_9rem] sm:gap-5">
              <span className="font-mono text-xs text-accent-sky">0{index + 1}</span>
              <div>
                <h4 className="text-base font-semibold text-text-primary">{product.title}</h4>
                <p className="mt-1 text-sm leading-6 text-text-secondary">{product.tagline}</p>
                {product.contribution && (
                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    <span className="font-semibold text-text-primary">Contribution: </span>
                    {product.contribution}
                  </p>
                )}
              </div>
              <p className="font-mono text-[11px] text-text-muted sm:text-right">{product.typeLabel}</p>
            </article>
          ))}
        </div>
      </ResponseSection>

      <ResponseSection label="Also shipped">
        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-6">
          {additional.map((product) => (
            <li key={product.id}>
              <p className="text-sm font-semibold text-text-primary">{product.title}</p>
              <p className="mt-1 font-mono text-[11px] text-text-muted">{product.typeLabel}</p>
            </li>
          ))}
        </ul>
      </ResponseSection>

      <ResponseSectionLink onClick={() => onNavigateSection?.("#products")}>
        Explore all shipped products
      </ResponseSectionLink>
    </div>
  );
}
