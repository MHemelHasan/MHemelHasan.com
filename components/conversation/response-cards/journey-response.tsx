"use client";

import { journeyMilestones } from "@/data/journey";
import { ResponseIntro, ResponseSectionLink } from "./response-primitives";

interface JourneyResponseProps {
  onNavigateSection?: (anchor: string) => void;
}

export function JourneyResponse({ onNavigateSection }: JourneyResponseProps) {
  const fullStack = journeyMilestones.find((milestone) => milestone.id === "fullstack-react");
  const platform = journeyMilestones.find((milestone) => milestone.id === "platform-apps");
  const leadership = journeyMilestones.find((milestone) => milestone.id === "technical-lead");
  const founder = journeyMilestones.find((milestone) => milestone.id === "founder-building");

  const chapters = [
    {
      number: "01 / 03",
      label: "Craft",
      period: "2015 – 2019",
      title: "Web foundations became working software.",
      body: "Responsive themes led into WordPress and WooCommerce plugin systems, where interface decisions met business logic, data, and transactional reliability.",
    },
    {
      number: "02 / 03",
      label: "Systems",
      period: "2019 – 2023",
      title: "Platform & Product Engineer",
      body: `The work expanded from ${fullStack?.roleTitle ?? "full-stack engineering"} into ${platform?.roleTitle ?? "platform applications"}, spanning Shopify, Webflow, and WordPress ecosystems.`,
      emphasized: true,
    },
    {
      number: "03 / 03",
      label: "Ownership",
      period: "2023 – Present",
      title: "Technical leadership widened into venture building.",
      body: `${leadership?.roleTitle ?? "Technical leadership"} at Themefic and ${founder?.roleTitle ?? "Founder ownership"} at Social AI extend the product-engineering discipline into broader responsibility.`,
    },
  ];

  return (
    <div className="space-y-6 text-text-primary">
      <ResponseIntro>
        I started building software professionally in <strong className="font-semibold">2015</strong>.
        The journey is best understood as a progression from craft, through systems, toward wider
        product ownership.
      </ResponseIntro>

      <div className="border-t border-border-interactive">
        {chapters.map((chapter) => (
          <section
            key={chapter.label}
            className={`grid gap-4 border-b border-border-subtle py-6 sm:grid-cols-[7rem_1fr] sm:gap-8 ${
              chapter.emphasized ? "border-l-2 border-l-accent-sky pl-4 sm:pl-5" : ""
            }`}
          >
            <div>
              <p className="font-mono text-xs text-accent-sky">{chapter.number}</p>
              <p className="mt-2 text-sm font-semibold uppercase text-text-primary">{chapter.label}</p>
              <p className="mt-1 font-mono text-[11px] text-text-muted">{chapter.period}</p>
            </div>
            <div>
              <h3 className={`${chapter.emphasized ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"} font-semibold leading-tight text-text-primary`}>
                {chapter.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">{chapter.body}</p>
            </div>
          </section>
        ))}
      </div>

      <p className="text-lg font-semibold text-text-primary">
        Product Engineer <span className="text-accent-sky">→</span> Builder{" "}
        <span className="text-accent-sky">→</span> Founder
      </p>

      <ResponseSectionLink onClick={() => onNavigateSection?.("#journey")}>
        View the complete builder journey
      </ResponseSectionLink>
    </div>
  );
}
