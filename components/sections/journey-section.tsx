import { journeyMilestones } from "@/data/journey";

const foundation = journeyMilestones.slice(0, 2);
const fullStack = journeyMilestones.find((milestone) => milestone.id === "fullstack-react");
const platform = journeyMilestones.find((milestone) => milestone.id === "platform-apps");
const leadership = journeyMilestones.find((milestone) => milestone.id === "technical-lead");
const founder = journeyMilestones.find((milestone) => milestone.id === "founder-building");

export function JourneySection() {
  if (!fullStack || !platform || !leadership || !founder) return null;

  return (
    <section
      id="journey"
      className="scroll-mt-24 border-b border-border-subtle bg-surface-card"
    >
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <header className="grid gap-8 border-b-2 border-text-primary pb-10 lg:grid-cols-12 lg:gap-12 lg:pb-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-accent-sky">Capability built through practice</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-text-primary sm:text-5xl lg:text-6xl">
              Builder Journey
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pt-1">
            <p className="max-w-3xl text-xl leading-8 text-text-primary sm:text-2xl sm:leading-9">
              A decade of moving closer to the whole product: from interface craft, to platform systems, to end-to-end ownership.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary">
              The titles changed as the scope expanded. The throughline stayed the same: understand the problem, build the system, and stay accountable for what ships.
            </p>
          </div>
        </header>

        <div className="border-b border-border-subtle py-10 sm:py-12 lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <p className="font-mono text-xs text-accent-sky">01 / 03</p>
            <p className="mt-3 text-sm font-semibold uppercase text-text-primary">Craft</p>
            <p className="mt-1 font-mono text-xs text-text-muted">2015 – 2019</p>
          </div>

          <div className="mt-6 lg:col-span-9 lg:mt-0">
            <h3 className="max-w-3xl text-2xl font-semibold leading-tight text-text-primary sm:text-3xl">
              Web foundations became working software.
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
              Responsive themes led into WordPress and WooCommerce plugin systems, where visual decisions met business logic, data, and transactional reliability.
            </p>
            <p className="mt-6 font-mono text-xs leading-6 text-text-muted">
              {foundation.map((milestone) => milestone.roleTitle).join("  →  ")}
            </p>
          </div>
        </div>

        <div className="border-b border-border-subtle py-10 sm:py-12 lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="border-l-2 border-accent-sky pl-5 lg:col-span-3">
            <p className="font-mono text-xs text-accent-sky">02 / 03</p>
            <p className="mt-3 text-sm font-semibold uppercase text-text-primary">Systems</p>
            <p className="mt-1 font-mono text-xs text-text-muted">2019 – 2023</p>
          </div>

          <div className="mt-7 lg:col-span-9 lg:mt-0">
            <p className="text-sm font-semibold text-accent-sky">{fullStack.roleTitle}</p>
            <h3 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight text-text-primary sm:text-4xl lg:text-5xl">
              Platform &amp; Product Engineer
            </h3>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-text-primary">
              The work expanded from decoupled applications into commercial software across Shopify, Webflow, and WordPress.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
              Full-stack delivery became platform judgment: working within third-party runtimes, authentication models, webhooks, embedded interfaces, and marketplace constraints without losing sight of the product.
            </p>
            <p className="mt-6 font-mono text-xs leading-6 text-text-muted">
              {platform.roleTitle}  ·  React  ·  Node.js  ·  OAuth 2.0  ·  Platform APIs
            </p>
          </div>
        </div>

        <div className="py-10 sm:py-12 lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <p className="font-mono text-xs text-accent-sky">03 / 03</p>
            <p className="mt-3 text-sm font-semibold uppercase text-text-primary">Ownership</p>
            <p className="mt-1 font-mono text-xs text-text-muted">2023 – 2026</p>
          </div>

          <div className="mt-6 lg:col-span-9 lg:mt-0">
            <h3 className="max-w-3xl text-2xl font-semibold leading-tight text-text-primary sm:text-3xl">
              Product responsibility widened into technical leadership and venture building.
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
              At Themefic, the role expanded into architecture, product R&amp;D, engineering standards, platform delivery, and production infrastructure ownership across a commercial product portfolio. Building Social AI extends that product-engineering discipline into founder-level ownership.
            </p>

            <div className="mt-8 grid gap-6 border-y border-border-subtle py-6 sm:grid-cols-2 sm:gap-8">
              <div>
                <p className="font-mono text-xs text-text-muted">Themefic</p>
                <p className="mt-2 text-base font-semibold leading-7 text-text-primary">{leadership.roleTitle}</p>
              </div>
              <div className="border-t border-border-subtle pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                <p className="font-mono text-xs text-text-muted">Social AI</p>
                <p className="mt-2 text-base font-semibold leading-7 text-text-primary">{founder.roleTitle}</p>
                <p className="mt-1 text-sm leading-6 text-text-secondary">An evolution of the product engineer, not a departure from it.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-text-primary pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-accent-sky">The identity beneath the titles</p>
          <p className="text-xl font-semibold text-text-primary sm:text-2xl">
            Product Engineer <span className="text-accent-sky">→</span> Builder <span className="text-accent-sky">→</span> Founder
          </p>
        </div>
      </div>
    </section>
  );
}
