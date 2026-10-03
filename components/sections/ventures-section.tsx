"use client";

import { ArrowUpRight, Facebook, Linkedin, MessageSquareText } from "lucide-react";
import type { IntentKey } from "@/types/conversation";
import {
  socialAICapabilityGroups,
  socialAIVenture,
  supportAIVenture,
} from "@/data/ventures";
import { personalProfile } from "@/data/profile";
import { SocialAIWorkflow } from "./social-ai-workflow";

interface VenturesSectionProps {
  onAsk: (initialQuery?: string, directIntent?: IntentKey) => void;
}

const socialChannelIcons = [Linkedin, Facebook];

export function VenturesSection({ onAsk }: VenturesSectionProps) {
  return (
    <section id="ventures" className="scroll-mt-24 border-t border-border-subtle bg-surface-card">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-16 lg:px-12 lg:pb-24">
        <header className="grid gap-5 lg:grid-cols-12">
          <h2 className="text-4xl font-semibold leading-tight tracking-normal text-text-primary sm:text-5xl lg:col-span-7">
            What I&apos;m building
          </h2>
          <p className="max-w-lg text-base leading-7 text-text-secondary lg:col-span-5 lg:pt-2">
            A current personal venture, followed by the next product direction being explored.
          </p>
        </header>

        <article className="mt-12 sm:mt-16" aria-labelledby="social-ai-title">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex min-h-7 items-center rounded-full border border-status-beta/35 bg-status-beta/10 px-3 text-xs font-semibold text-status-beta">
                  {socialAIVenture.statusLabel}
                </span>
                <span className="text-sm text-text-secondary">{socialAIVenture.typeLabel}</span>
              </div>
              <h3 id="social-ai-title" className="mt-6 text-5xl font-semibold leading-none tracking-normal text-text-primary sm:text-6xl">
                {socialAIVenture.title}
              </h3>
              <p className="mt-5 text-sm font-medium text-brand-primary">{personalProfile.founderVenture.role}</p>
            </div>

            <div className="lg:col-span-7 lg:pt-1">
              <p className="max-w-2xl text-xl leading-8 text-text-primary sm:text-2xl sm:leading-9">
                {socialAIVenture.tagline}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary">{socialAIVenture.summary}</p>

              <div className="mt-7 border-t border-border-subtle pt-5">
                <p className="text-sm font-semibold text-text-primary">Connected platforms</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-secondary">
                  {(socialAIVenture.channels ?? []).map((channel, index) => {
                    const Icon = socialChannelIcons[index];
                    return (
                      <span key={channel} className="inline-flex items-center gap-2">
                        {Icon ? <Icon className="h-4 w-4 text-brand-primary" aria-hidden="true" /> : null}
                        {channel}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 sm:mt-12">
            <SocialAIWorkflow />
          </div>

          <div className="mt-12 sm:mt-14">
            <div className="grid gap-3 border-b border-border-interactive pb-4 sm:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)] sm:items-end sm:gap-8">
              <h4 className="text-2xl font-semibold text-text-primary">Product capabilities</h4>
              <p className="max-w-xl text-sm leading-6 text-text-secondary sm:justify-self-end">
                A compact view of the product functions brought together inside Social AI.
              </p>
            </div>
            <dl className="grid md:grid-cols-2">
              {socialAICapabilityGroups.map((capability, index) => (
                <div
                  key={capability.title}
                  className={`grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 gap-y-1 border-b border-border-subtle py-5 ${
                    index % 2 === 0 ? "md:pr-8" : "md:border-l md:pl-8"
                  }`}
                >
                  <dt className="contents">
                    <span className="pt-0.5 font-mono text-xs text-brand-primary" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-text-primary">{capability.title}</span>
                  </dt>
                  <dd className="col-start-2 text-sm leading-6 text-text-secondary">{capability.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 flex flex-col justify-between gap-6 border-y border-border-interactive py-7 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-text-primary">Social AI / {socialAIVenture.statusLabel}</p>
              <p className="mt-1 max-w-xl text-sm leading-6 text-text-secondary">
                {personalProfile.founderVenture.role}. The product is not presented as a public demo.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onAsk("Tell me about your Social AI venture", "social_ai")}
              className="inline-flex min-h-11 items-center gap-2 self-start border-b border-brand-primary text-sm font-semibold text-brand-primary transition-colors hover:text-brand-primary-hover"
            >
              Explore Social AI in conversation
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </article>

        <article className="mt-16 border-t-2 border-text-primary pt-7 sm:mt-20 sm:pt-9" aria-labelledby="support-ai-title">
          <p className="text-lg font-semibold text-brand-primary">{supportAIVenture.statusLabel}</p>

          <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:gap-12 sm:mt-8">
            <div className="lg:col-span-4">
              <h3 id="support-ai-title" className="text-4xl font-semibold leading-none text-text-primary sm:text-5xl">
                {supportAIVenture.title}
              </h3>
              <p className="mt-4 text-sm font-medium text-text-secondary">Currently exploring</p>
            </div>

            <div className="lg:col-span-8">
              <p className="max-w-3xl text-xl leading-8 text-text-primary">{supportAIVenture.tagline}</p>
              <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">{supportAIVenture.summary}</p>

              <div className="mt-7 grid gap-x-8 border-t border-border-subtle sm:grid-cols-2">
                {supportAIVenture.capabilities.map((capability) => (
                  <p key={capability} className="border-b border-border-subtle py-3 text-sm leading-6 text-text-secondary">
                    {capability}
                  </p>
                ))}
              </div>

              <div className="mt-7 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-semibold text-text-primary">Planned conversation channels</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{(supportAIVenture.channels ?? []).join(" · ")}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onAsk("What are you building next?", "support_ai")}
                  className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-text-primary transition-colors hover:text-brand-primary sm:self-auto"
                >
                  <MessageSquareText className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                  Ask what&apos;s next
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
