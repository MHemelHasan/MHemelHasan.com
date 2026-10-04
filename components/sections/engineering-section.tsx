"use client";

import { useState } from "react";
import { ArrowDown, MessageSquareText } from "lucide-react";
import { engineeringDomains } from "@/data/engineering";

interface EngineeringSectionProps {
  onAskInConversation?: (query: string) => void;
}

export function EngineeringSection({ onAskInConversation }: EngineeringSectionProps) {
  const [activeDomainId, setActiveDomainId] = useState(engineeringDomains[0]?.id ?? "");
  const activeIndex = Math.max(
    0,
    engineeringDomains.findIndex((domain) => domain.id === activeDomainId),
  );
  const activeDomain = engineeringDomains[activeIndex] ?? engineeringDomains[0];

  if (!activeDomain) return null;

  const handleAsk = (query: string) => {
    if (onAskInConversation) {
      onAskInConversation(query);
      return;
    }

    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="engineering" className="scroll-mt-24 border-b border-border-subtle bg-canvas">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <header className="grid gap-8 border-b-2 border-text-primary pb-10 min-[1100px]:grid-cols-12 min-[1100px]:gap-14 min-[1100px]:pb-12">
          <div className="min-[1100px]:col-span-5">
            <p className="text-sm font-semibold text-accent-sky">Systems, platforms, and infrastructure</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-text-primary sm:text-5xl lg:text-6xl">
              Engineering Depth
            </h2>
          </div>

          <div className="min-[1100px]:col-span-7 min-[1100px]:pt-1">
            <p className="max-w-3xl text-xl leading-8 text-text-primary sm:text-2xl sm:leading-9">
              The technical decisions beneath reliable product software.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary">
              Engineering capability organized by system context, with tools shown as supporting evidence rather than the story itself.
            </p>
          </div>
        </header>

        <div className="mt-10 grid items-start gap-10 sm:mt-12 min-[1100px]:grid-cols-12 min-[1100px]:gap-14">
          <nav
            aria-label="Engineering domains"
            className="order-1 min-[1100px]:order-2 min-[1100px]:col-span-4 min-[1100px]:col-start-9 min-[1100px]:row-start-1"
          >
            <div className="flex items-end justify-between border-b border-text-primary pb-4">
              <h3 className="text-lg font-semibold text-text-primary">Engineering domains</h3>
              <span className="font-mono text-xs text-text-muted">07 areas</span>
            </div>

            <div
              role="group"
              aria-label="Select an engineering domain"
              className="grid grid-cols-2 min-[640px]:grid-cols-3 min-[1100px]:!grid-cols-1"
            >
              {engineeringDomains.map((domain, index) => {
                const isActive = domain.id === activeDomain.id;

                return (
                  <button
                    key={domain.id}
                    id={`engineering-domain-${domain.id}`}
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="engineering-domain-detail"
                    onClick={() => setActiveDomainId(domain.id)}
                    className={`grid min-h-20 grid-cols-[1.75rem_minmax(0,1fr)] items-center gap-2 border-b border-border-subtle py-3 pr-2 text-left transition-colors sm:pr-3 min-[1100px]:min-h-16 min-[1100px]:pr-0 ${
                      isActive
                        ? "border-l-2 border-l-accent-sky bg-accent-soft pl-3"
                        : "border-l-2 border-l-transparent pl-3 hover:bg-surface-nested/70"
                    }`}
                  >
                    <span className="font-mono text-xs text-accent-sky">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] font-semibold leading-5 text-text-primary sm:text-sm">
                      {domain.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          <article
            id="engineering-domain-detail"
            role="region"
            aria-labelledby={`engineering-domain-${activeDomain.id}`}
            aria-live="polite"
            className="order-2 border-t-2 border-text-primary pt-7 min-[1100px]:order-1 min-[1100px]:col-span-8 min-[1100px]:col-start-1 min-[1100px]:row-start-1 min-[1100px]:border-t-0 min-[1100px]:pt-0"
          >
            <div className="border-b border-border-subtle pb-7">
              <p className="font-mono text-xs text-accent-sky">
                Domain {String(activeIndex + 1).padStart(2, "0")} / {String(engineeringDomains.length).padStart(2, "0")}
              </p>
              <h3 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight text-text-primary sm:text-4xl lg:text-5xl">
                {activeDomain.title}
              </h3>
              <p className="mt-4 max-w-3xl text-xl font-medium leading-8 text-text-primary">
                {activeDomain.tagline}
              </p>
              <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">
                {activeDomain.description}
              </p>
            </div>

            <div>
              <div className="flex items-end justify-between border-b border-border-subtle py-5">
                <h4 className="text-sm font-semibold text-text-primary">Engineering focus</h4>
                <span className="font-mono text-xs text-text-muted">
                  {String(activeDomain.capabilities.length).padStart(2, "0")} decision areas
                </span>
              </div>

              {activeDomain.capabilities.map((capability, index) => (
                <section
                  key={capability.title}
                  className="grid gap-4 border-b border-border-subtle py-6 sm:grid-cols-[minmax(0,1.15fr)_minmax(14rem,0.85fr)] sm:gap-8"
                >
                  <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                    <span className="pt-1 font-mono text-xs text-accent-sky">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h5 className="text-base font-semibold text-text-primary">{capability.title}</h5>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">{capability.description}</p>
                    </div>
                  </div>

                  <div className="sm:border-l sm:border-border-subtle sm:pl-8">
                    <p className="text-xs font-medium text-text-muted">Patterns &amp; technical evidence</p>
                    <p className="mt-2 font-mono text-xs leading-6 text-text-secondary">
                      {capability.technologies.join(" · ")}
                    </p>
                  </div>
                </section>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleAsk(`What is your experience with ${activeDomain.title}?`)}
              className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-accent-sky text-sm font-semibold text-accent-sky transition-colors hover:text-text-primary"
            >
              <MessageSquareText className="h-4 w-4" aria-hidden="true" />
              Ask about this domain
            </button>
          </article>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-border-interactive pt-7 sm:flex-row sm:items-end sm:justify-between lg:mt-20">
          <div>
            <p className="text-sm font-semibold text-accent-sky">Systems, then trajectory</p>
            <p className="mt-2 max-w-2xl text-lg leading-7 text-text-primary">
              The journey below traces how this technical responsibility developed over time.
            </p>
          </div>
          <a
            href="#journey"
            className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-text-primary transition-colors hover:text-accent-sky sm:self-auto"
          >
            Continue to Builder Journey
            <ArrowDown className="h-4 w-4 text-accent-sky" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
