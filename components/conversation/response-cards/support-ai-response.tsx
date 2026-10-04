"use client";

import { supportAIVenture } from "@/data/ventures";
import { ResponseIntro, ResponseSection, ResponseSectionLink } from "./response-primitives";

interface SupportAIResponseProps {
  onNavigateSection?: (anchor: string) => void;
}

export function SupportAIResponse({ onNavigateSection }: SupportAIResponseProps) {
  return (
    <div className="space-y-6 text-text-primary">
      <ResponseIntro>
        <strong className="font-semibold">{supportAIVenture.title}</strong> is the next product
        direction I&apos;m exploring. {supportAIVenture.summary}
      </ResponseIntro>

      <dl className="grid gap-4 border-y border-border-subtle py-4 sm:grid-cols-2 sm:gap-8">
        <div>
          <dt className="font-mono text-[11px] text-text-muted">Stage</dt>
          <dd className="mt-1 text-sm font-semibold text-accent-sky">{supportAIVenture.typeLabel}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] text-text-muted">Channels being explored</dt>
          <dd className="mt-1 text-sm leading-6 text-text-secondary">
            {supportAIVenture.channels?.join(" · ")}
          </dd>
        </div>
      </dl>

      <ResponseSection label="Product direction" title="Knowledge-grounded support across conversation channels">
        <ol className="grid gap-x-8 sm:grid-cols-2">
          {supportAIVenture.capabilities.map((capability, index) => (
            <li key={capability} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-border-subtle py-4 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
              <span className="font-mono text-xs text-accent-sky">0{index + 1}</span>
              <span className="text-sm leading-6 text-text-secondary">{capability}</span>
            </li>
          ))}
        </ol>
        <p className="mt-2 border-l-2 border-accent-sky pl-4 text-sm leading-6 text-text-secondary">
          This is an exploratory direction, not a launched product. The focus is verified business
          context, explicit rules, and clear escalation paths.
        </p>
      </ResponseSection>

      <ResponseSectionLink onClick={() => onNavigateSection?.("#ventures")}>
        View what I&apos;m building
      </ResponseSectionLink>
    </div>
  );
}
