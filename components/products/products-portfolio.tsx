import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, MessageSquareText } from "lucide-react";
import { themeficProducts } from "@/data/products";

interface ProductsPortfolioProps {
  onAsk: (query: string) => void;
}

export function ProductsPortfolio({ onAsk }: ProductsPortfolioProps) {
  const featuredProducts = themeficProducts.filter((product) => product.isFeatured);
  const additionalProducts = themeficProducts.filter((product) => !product.isFeatured);

  return (
    <>
      <section className="border-b border-border-interactive bg-canvas">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
          <Link
            href="/#products"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-accent-sky"
          >
            <ArrowLeft className="h-4 w-4 text-accent-sky" aria-hidden="true" />
            Back to the homepage story
          </Link>

          <div className="mt-10 grid gap-10 border-t-2 border-text-primary pt-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-accent-sky">Commercial production software</p>
              <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-normal text-text-primary sm:text-6xl lg:text-7xl">
                Products Led &amp; Shipped
              </h1>
            </div>

            <div className="lg:col-span-5 lg:pt-1">
              <p className="max-w-xl text-xl leading-8 text-text-primary sm:text-2xl sm:leading-9">
                Six commercial products across Shopify, WordPress, and Webflow.
              </p>
              <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary">
                This is company product work engineered in roles at Themefic. It is separate from Social AI and Support AI, my personal ventures.
              </p>
              <a
                href="https://themefic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-accent-sky text-sm font-semibold text-text-primary transition-colors hover:text-accent-sky"
              >
                Visit Themefic
                <ArrowUpRight className="h-4 w-4 text-accent-sky" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="featured-products-heading" className="bg-canvas">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <header className="grid gap-5 border-b border-border-interactive pb-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="text-sm font-semibold text-accent-sky">Selected product stories</p>
              <h2 id="featured-products-heading" className="mt-3 text-3xl font-semibold text-text-primary sm:text-4xl">
                Product context and engineering responsibility
              </h2>
            </div>
            <p className="font-mono text-xs text-text-muted">03 featured / 06 total</p>
          </header>

          <div>
            {featuredProducts.map((product, index) => (
              <article
                key={product.id}
                className="grid gap-8 border-b border-border-subtle py-12 lg:grid-cols-12 lg:gap-14 lg:py-16"
              >
                <div className="lg:col-span-4">
                  <p className="font-mono text-xs text-accent-sky">
                    {String(index + 1).padStart(2, "0")} / {product.typeLabel}
                  </p>
                  <h3 className="mt-4 text-4xl font-semibold leading-none text-text-primary sm:text-5xl">
                    {product.title}
                  </h3>
                  <p className="mt-4 text-lg leading-7 text-text-secondary">{product.tagline}</p>
                  <dl className="mt-7 grid gap-4 border-t border-border-subtle pt-5 text-sm">
                    <div>
                      <dt className="text-xs text-text-muted">Ecosystem</dt>
                      <dd className="mt-1 font-semibold text-text-primary">{product.ecosystemLabel}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-text-muted">Role</dt>
                      <dd className="mt-1 font-semibold text-text-primary">{product.attribution?.role}</dd>
                    </div>
                  </dl>
                </div>

                <div className="lg:col-span-8">
                  <div className="grid border-t-2 border-text-primary md:grid-cols-2">
                    <div className="py-6 md:pr-8">
                      <h4 className="text-sm font-semibold text-text-primary">Product context</h4>
                      <p className="mt-3 text-base leading-7 text-text-secondary">{product.problem}</p>
                    </div>
                    <div className="border-t border-border-subtle py-6 md:border-l md:border-t-0 md:pl-8">
                      <h4 className="text-sm font-semibold text-text-primary">My engineering contribution</h4>
                      <p className="mt-3 text-lg font-medium leading-7 text-text-primary">{product.contribution}</p>
                    </div>
                  </div>

                  <div className="grid gap-8 border-t border-border-subtle py-6 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">Product capabilities</h4>
                      <ul className="mt-4 space-y-3">
                        {product.capabilities.map((capability) => (
                          <li key={capability} className="flex items-start gap-2.5 text-sm leading-6 text-text-secondary">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent-sky" aria-hidden="true" />
                            <span>{capability}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">Technical scope</h4>
                      <ul className="mt-4 space-y-3">
                        {product.technicalScope?.map((scope) => (
                          <li key={scope} className="flex items-start gap-2.5 text-sm leading-6 text-text-secondary">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 border border-accent-sky" aria-hidden="true" />
                            <span>{scope}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 border-t border-border-subtle pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex items-start gap-2.5 text-sm leading-6 text-text-secondary">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-status-live" aria-hidden="true" />
                      <span>{product.outcome}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => onAsk(`Tell me about ${product.title}`)}
                      className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start border-b border-accent-sky text-sm font-semibold text-accent-sky transition-colors hover:text-text-primary sm:self-auto"
                    >
                      <MessageSquareText className="h-4 w-4" aria-hidden="true" />
                      Ask about {product.title}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="complete-portfolio-heading" className="border-y border-border-subtle bg-surface-card">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <header className="grid gap-5 border-b-2 border-text-primary pb-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-accent-sky">Complete commercial portfolio</p>
              <h2 id="complete-portfolio-heading" className="mt-3 text-3xl font-semibold text-text-primary sm:text-4xl">
                Additional shipped products
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-text-secondary lg:col-span-5">
              Three more Themefic releases, represented with the verified scope available in the portfolio data.
            </p>
          </header>

          <div>
            {additionalProducts.map((product, index) => (
              <article
                key={product.id}
                className="grid gap-6 border-b border-border-subtle py-9 md:grid-cols-12 md:gap-8 lg:py-10"
              >
                <div className="md:col-span-4">
                  <p className="font-mono text-xs text-accent-sky">
                    {String(index + featuredProducts.length + 1).padStart(2, "0")} / {product.typeLabel}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-text-primary sm:text-3xl">{product.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{product.tagline}</p>
                </div>

                <div className="md:col-span-5">
                  <h4 className="text-sm font-semibold text-text-primary">Product context</h4>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">{product.summary}</p>
                  <p className="mt-4 text-sm font-medium text-text-primary">{product.outcome}</p>
                </div>

                <div className="md:col-span-3">
                  <p className="text-xs text-text-muted">Engineering role</p>
                  <p className="mt-1 text-sm font-semibold text-text-primary">{product.attribution?.role}</p>
                  <ul className="mt-4 space-y-2">
                    {product.capabilities.map((capability) => (
                      <li key={capability} className="text-sm leading-5 text-text-secondary">
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-6 text-text-secondary">
              Across three ecosystems, the work connects commercial product goals to dependable platform engineering.
            </p>
            <button
              type="button"
              onClick={() => onAsk("Tell me about your commercial product engineering work at Themefic")}
              className="inline-flex min-h-11 items-center gap-2 self-start border-b border-accent-sky text-sm font-semibold text-accent-sky transition-colors hover:text-text-primary sm:self-auto"
            >
              <MessageSquareText className="h-4 w-4" aria-hidden="true" />
              Ask about this product work
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
