"use client";

import { personalProfile } from "@/data/profile";
import { ResponseIntro, ResponseSection, ResponseSectionLink } from "./response-primitives";

interface AboutResponseProps {
  onNavigateSection?: (anchor: string) => void;
}

export function AboutResponse({ onNavigateSection }: AboutResponseProps) {
  const themeficRole = personalProfile.themeficRole;
  if (!themeficRole) return null;

  return (
    <div className="space-y-6 text-text-primary">
      <ResponseIntro>
        I&apos;m <strong className="font-semibold">{personalProfile.name}</strong>, a{" "}
        <strong className="font-semibold">Product Engineer</strong>, Builder, and Founder based in{" "}
        {personalProfile.location}. I turn product ideas into production software, from research and
        architecture through backend systems, integrations, and launch.
      </ResponseIntro>

      <ResponseSection label="Current work" title="Product engineering with widening ownership">
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-8">
          <div>
            <p className="font-mono text-xs text-accent-sky">Themefic</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-text-primary">
              {themeficRole.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {themeficRole.summary}
            </p>
          </div>
          <div className="border-t border-border-subtle pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
            <p className="font-mono text-xs text-accent-sky">{personalProfile.founderVenture.name}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-text-primary">
              {personalProfile.founderVenture.role}
            </p>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Building a private-beta product for research, brand-aware creation, scheduling, and
              multi-channel publishing.
            </p>
          </div>
        </div>
      </ResponseSection>

      <ResponseSection label="Throughline">
        <p className="text-sm leading-6 text-text-secondary">
          Since 2015, the work has moved from interface craft to platform systems and end-to-end
          product ownership. Founder is an expansion of the product-engineering role, not a replacement
          for it.
        </p>
      </ResponseSection>

      <ResponseSectionLink onClick={() => onNavigateSection?.("#journey")}>
        Read the builder journey
      </ResponseSectionLink>
    </div>
  );
}
