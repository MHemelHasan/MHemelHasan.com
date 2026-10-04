"use client";

import { socialAICapabilityGroups, socialAIVenture } from "@/data/ventures";
import { ResponseIntro, ResponseSection, ResponseSectionLink } from "./response-primitives";

interface SocialAIResponseProps {
  onNavigateSection?: (anchor: string) => void;
}

export function SocialAIResponse({ onNavigateSection }: SocialAIResponseProps) {
  return (
    <div className="space-y-6 text-text-primary">
      <ResponseIntro>
        <strong className="font-semibold">{socialAIVenture.title}</strong> is my primary personal
        venture. {socialAIVenture.summary}
      </ResponseIntro>

      <dl className="grid gap-4 border-y border-border-subtle py-4 sm:grid-cols-3 sm:gap-6">
        <div>
          <dt className="font-mono text-[11px] text-text-muted">Role</dt>
          <dd className="mt-1 text-sm font-semibold text-text-primary">Founder / Lead Architect</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] text-text-muted">Status</dt>
          <dd className="mt-1 text-sm font-semibold text-accent-sky">{socialAIVenture.statusLabel}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] text-text-muted">Connected platforms</dt>
          <dd className="mt-1 text-sm leading-6 text-text-secondary">
            {socialAIVenture.channels?.join(" · ")}
          </dd>
        </div>
      </dl>

      <ResponseSection label="Product workflow" title="From source material to coordinated publishing">
        <ol className="grid gap-x-8 sm:grid-cols-2">
          {socialAIVenture.workflowSteps?.map((step) => (
            <li key={step.step} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-border-subtle py-4 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
              <span className="font-mono text-xs text-accent-sky">{step.step}</span>
              <div>
                <h4 className="text-sm font-semibold text-text-primary">{step.title}</h4>
                <p className="mt-1 text-sm leading-6 text-text-secondary">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </ResponseSection>

      <ResponseSection label="System scope">
        <div className="grid gap-x-8 sm:grid-cols-2">
          {socialAICapabilityGroups.map((group, index) => (
            <div key={group.title} className="border-t border-border-subtle py-4 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
              <p className="font-mono text-[11px] text-accent-sky">0{index + 1}</p>
              <h4 className="mt-2 text-sm font-semibold text-text-primary">{group.title}</h4>
              <p className="mt-1 text-sm leading-6 text-text-secondary">{group.description}</p>
            </div>
          ))}
        </div>
      </ResponseSection>

      <ResponseSectionLink onClick={() => onNavigateSection?.("#ventures")}>
        Explore the venture overview
      </ResponseSectionLink>
    </div>
  );
}
