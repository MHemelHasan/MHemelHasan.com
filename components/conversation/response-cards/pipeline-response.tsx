"use client";

import { pipelineStages } from "@/data/pipeline";
import { ResponseIntro, ResponseSection, ResponseSectionLink } from "./response-primitives";

interface PipelineResponseProps {
  onNavigateSection?: (anchor: string) => void;
}

export function PipelineResponse({ onNavigateSection }: PipelineResponseProps) {
  return (
    <div className="space-y-6 text-text-primary">
      <ResponseIntro>
        My process starts before code: understand the product problem, platform constraints, and source
        of truth, then carry those decisions through architecture, implementation, launch, and feedback.
      </ResponseIntro>

      <ResponseSection label="Decision-to-delivery sequence" title="Eight stages that reduce risk before it compounds">
        <ol className="grid gap-x-8 sm:grid-cols-2">
          {pipelineStages.map((stage) => (
            <li key={stage.id} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-border-subtle py-4 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
              <span className="font-mono text-xs text-accent-sky">{stage.stepNumber}</span>
              <div>
                <h4 className="text-sm font-semibold text-text-primary">{stage.title}</h4>
                <p className="mt-1 text-sm leading-6 text-text-secondary">{stage.shortDesc}</p>
                <p className="mt-2 font-mono text-[11px] leading-5 text-text-muted">{stage.deliverable}</p>
              </div>
            </li>
          ))}
        </ol>
      </ResponseSection>

      <p className="border-l-2 border-accent-sky pl-4 text-sm leading-6 text-text-secondary">
        The throughline is accountability: product decisions and engineering decisions stay connected
        from the first constraint map to the production feedback loop.
      </p>

      <ResponseSectionLink onClick={() => onNavigateSection?.("#how-i-build")}>
        Read the full building method
      </ResponseSectionLink>
    </div>
  );
}
