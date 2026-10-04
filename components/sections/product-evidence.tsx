import { CheckCircle2, MessageSquareText } from "lucide-react";
import type { ProductRecord } from "@/types/product";

interface ProductEvidenceProps {
  product: ProductRecord;
  onAsk: (query: string) => void;
}

export function ProductEvidence({ product, onAsk }: ProductEvidenceProps) {
  return (
    <article
      id="featured-product-detail"
      role="region"
      aria-labelledby={`product-tab-${product.id}`}
      aria-live="polite"
      className="border-t-2 border-text-primary pt-6 lg:border-t-0 lg:pt-0"
    >
      <div className="flex flex-col gap-5 border-b border-border-subtle pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-accent-sky">
            {product.typeLabel} / {product.ecosystemLabel}
          </p>
          <h3 className="mt-3 text-4xl font-semibold leading-none tracking-normal text-text-primary sm:text-5xl">
            {product.title}
          </h3>
          <p className="mt-4 max-w-2xl text-lg leading-7 text-text-secondary sm:text-xl sm:leading-8">
            {product.tagline}
          </p>
        </div>

        <div className="shrink-0 text-left sm:text-right">
          <p className="text-sm font-semibold text-text-primary">{product.statusLabel}</p>
          <p className="mt-1 text-sm text-text-secondary">Engineered at {product.attribution?.companyName}</p>
        </div>
      </div>

      <div className="grid border-b border-border-subtle lg:grid-cols-2">
        <div className="py-6 lg:pr-10">
          <h4 className="text-sm font-semibold text-text-primary">Product context</h4>
          <p className="mt-3 text-base leading-7 text-text-secondary">{product.problem}</p>
        </div>

        <div className="border-t border-border-subtle py-6 lg:border-l lg:border-t-0 lg:pl-10">
          <h4 className="text-sm font-semibold text-text-primary">My engineering contribution</h4>
          <p className="mt-3 text-lg font-medium leading-7 text-text-primary">{product.contribution}</p>
        </div>
      </div>

      <div className="grid gap-4 border-b border-border-subtle py-5 sm:grid-cols-[0.7fr_1.3fr] sm:items-start sm:gap-8">
        <div>
          <p className="text-xs font-medium text-text-muted">Role</p>
          <p className="mt-1 text-sm font-semibold text-text-primary">{product.attribution?.role}</p>
        </div>
        <div className="flex items-start gap-2.5 text-sm leading-6 text-text-secondary">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-status-live" aria-hidden="true" />
          <span>{product.outcome}</span>
        </div>
      </div>

      <div className="pt-5">
        <button
          type="button"
          onClick={() => onAsk(`Tell me about ${product.title}`)}
          className="inline-flex min-h-11 items-center gap-2 self-start border-b border-accent-sky text-sm font-semibold text-accent-sky transition-colors hover:text-text-primary"
        >
          <MessageSquareText className="h-4 w-4" aria-hidden="true" />
          Ask about {product.title}
        </button>
      </div>
    </article>
  );
}
