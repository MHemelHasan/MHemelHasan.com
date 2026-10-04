"use client";

import { socialAIVenture, supportAIVenture } from "@/data/ventures";
import { ResponseIntro, ResponseSectionLink } from "./response-primitives";

interface VentureResponseProps {
  onNavigateSection?: (anchor: string) => void;
}

export function VentureResponse({ onNavigateSection }: VentureResponseProps) {
  const ventures = [
    {
      number: "01",
      eyebrow: "Current personal venture",
      venture: socialAIVenture,
      role: "Founder / Lead Architect",
    },
    {
      number: "02",
      eyebrow: "Next direction",
      venture: supportAIVenture,
      role: supportAIVenture.typeLabel,
    },
  ];

  return (
    <div className="space-y-6 text-text-primary">
      <ResponseIntro>
        My venture work extends the same product-engineering discipline into founder-level ownership:
        one product in private beta, followed by an exploratory direction for knowledge-grounded support.
      </ResponseIntro>

      <div className="border-t border-border-interactive">
        {ventures.map(({ number, eyebrow, venture, role }) => (
          <section key={venture.id} className="grid gap-4 border-b border-border-subtle py-6 sm:grid-cols-[7rem_1fr] sm:gap-8">
            <div>
              <p className="font-mono text-xs text-accent-sky">{number}</p>
              <p className="mt-2 font-mono text-[11px] text-text-muted">{eyebrow}</p>
            </div>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-semibold text-text-primary sm:text-2xl">{venture.title}</h3>
                <span className="font-mono text-[11px] text-accent-sky">{venture.statusLabel}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-text-primary">{role}</p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">{venture.summary}</p>
              <p className="mt-4 font-mono text-[11px] leading-5 text-text-muted">
                {venture.channels?.join(" · ")}
              </p>
            </div>
          </section>
        ))}
      </div>

      <ResponseSectionLink onClick={() => onNavigateSection?.("#ventures")}>
        View the full venture section
      </ResponseSectionLink>
    </div>
  );
}
