"use client";

import { engineeringDomains } from "@/data/engineering";
import {
  Cpu,
  Layers,
  ShoppingBag,
  Server,
  Bot,
  Terminal,
  Palette,
  CheckCircle2,
  Workflow,
  ArrowRight,
} from "lucide-react";

interface EngineeringSectionProps {
  onAskInConversation?: (query: string) => void;
}

export function EngineeringSection({ onAskInConversation }: EngineeringSectionProps) {
  const getDomainIcon = (id: string) => {
    switch (id) {
      case "product-architecture":
        return Cpu;
      case "platform-ecosystems":
        return Layers;
      case "backend-apis":
        return Server;
      case "ai-integration":
        return Bot;
      case "commerce-systems":
        return ShoppingBag;
      case "infrastructure-tooling":
        return Terminal;
      case "interface-engineering":
        return Palette;
      default:
        return Workflow;
    }
  };

  const handleAsk = (title: string) => {
    const query = `What is your experience with ${title}?`;
    if (onAskInConversation) {
      onAskInConversation(query);
    } else {
      const el = document.getElementById("conversation");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="engineering" className="mt-24 sm:mt-32 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col items-start md:items-center md:text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-sky/30 bg-accent-soft px-3.5 py-1 text-xs font-mono font-medium text-accent-sky">
          <Cpu className="h-3.5 w-3.5" />
          <span>Technical Depth & Architecture</span>
        </div>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          Engineering Depth
        </h2>
        <p className="mt-3.5 text-base sm:text-lg text-text-secondary leading-relaxed">
          Competence organized around system context rather than arbitrary tool checklists — from high-level domain boundaries down to Linux servers and runtime iframes.
        </p>
      </div>

      {/* Domain Cards Grid */}
      <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {engineeringDomains.map((domain) => {
          const Icon = getDomainIcon(domain.id);
          return (
            <div
              key={domain.id}
              className="rounded-3xl border border-border-interactive bg-surface-card p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-accent-sky/50 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Domain Header */}
                <div className="flex items-start justify-between gap-3 border-b border-border-subtle pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-interactive bg-surface-nested text-accent-sky shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-text-primary">
                        {domain.title}
                      </h3>
                      <p className="text-xs text-text-muted mt-0.5 line-clamp-1">
                        {domain.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {domain.description}
                </p>

                {/* Capabilities list */}
                <div className="mt-5 space-y-3.5">
                  {domain.capabilities.map((cap) => (
                    <div
                      key={cap.title}
                      className="rounded-xl border border-border-subtle bg-surface-nested p-3.5"
                    >
                      <h4 className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent-sky shrink-0" />
                        <span>{cap.title}</span>
                      </h4>
                      <p className="mt-1 text-xs text-text-secondary leading-relaxed">
                        {cap.description}
                      </p>

                      {/* Verified Technologies in Context */}
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {cap.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-border-subtle bg-surface-card px-2 py-0.5 text-[11px] font-mono text-text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Quick Ask */}
              <div className="mt-5 pt-3 border-t border-border-subtle flex justify-end">
                <button
                  type="button"
                  onClick={() => handleAsk(domain.title)}
                  className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-accent-sky hover:underline"
                >
                  <span>Ask about this domain</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
