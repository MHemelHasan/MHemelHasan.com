"use client";

import { ArrowUpRight, Facebook, Linkedin, MessageSquareText } from "lucide-react";
import type { IntentKey } from "@/types/conversation";
import { socialAIVenture, supportAIVenture } from "@/data/ventures";
import { WorkflowSequence } from "./workflow-sequence";

interface VenturesProofProps {
  onAsk: (initialQuery?: string, directIntent?: IntentKey) => void;
}

const socialChannelIcons = [Linkedin, Facebook];

export function VenturesProof({ onAsk }: VenturesProofProps) {
  return (
    <section id="ventures" className="border-t border-border-subtle bg-surface-card">
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-3 sm:px-8 sm:pb-20 sm:pt-16 lg:px-12 lg:pb-24 lg:pt-16">
        <div className="grid gap-5 lg:grid-cols-12">
          <h2 className="text-4xl font-semibold leading-tight tracking-normal text-text-primary sm:text-5xl lg:col-span-7">
            What I&apos;m building
          </h2>
          <p className="max-w-xl text-base leading-7 text-text-secondary lg:col-span-5 lg:pt-2">
            A private-beta venture today, with the next AI product direction taking shape behind it.
          </p>
        </div>

        <div className="mt-12 grid items-stretch lg:grid-cols-12">
          <article className="border border-border-interactive p-6 sm:p-8 lg:col-span-6 lg:border-r-0 lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-medium text-brand-primary">{socialAIVenture.typeLabel}</p>
              <p className="font-mono text-xs text-text-secondary">{socialAIVenture.statusLabel}</p>
            </div>

            <h3 className="mt-12 text-5xl font-semibold tracking-normal text-text-primary sm:text-6xl">
              {socialAIVenture.title}
            </h3>
            <p className="mt-5 max-w-xl text-xl leading-8 text-text-primary">{socialAIVenture.tagline}</p>
            <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary">{socialAIVenture.summary}</p>

            <div className="mt-10 border-t border-border-subtle pt-5">
              <p className="text-sm font-semibold text-text-primary">Connected channels</p>
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

            <button
              type="button"
              onClick={() => onAsk("Tell me about your Social AI venture", "social_ai")}
              className="mt-10 inline-flex min-h-11 items-center gap-2 border-b border-brand-primary text-sm font-semibold text-brand-primary transition-colors hover:text-brand-primary-hover"
            >
              Explore Social AI in conversation
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </article>

          <div className="lg:col-span-6">
            <WorkflowSequence />
          </div>
        </div>

        <div className="mt-14">
          <div className="flex items-end justify-between gap-6 border-b border-border-interactive pb-4">
            <h3 className="text-2xl font-semibold text-text-primary">What it brings together</h3>
            <span className="hidden font-mono text-xs text-text-muted sm:block">Social AI / capability set</span>
          </div>
          <ul className="grid md:grid-cols-2">
            {socialAIVenture.capabilities.map((capability, index) => (
              <li
                key={capability}
                className={`grid min-h-20 grid-cols-[32px_1fr] items-start gap-3 border-b border-border-subtle py-5 text-sm leading-6 text-text-secondary ${
                  index % 2 === 0 ? "md:pr-8" : "md:border-l md:pl-8"
                }`}
              >
                <span className="font-mono text-xs text-brand-primary">{String(index + 1).padStart(2, "0")}</span>
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </div>

        <article className="mt-16 grid gap-7 border-y border-border-interactive py-8 md:grid-cols-[1fr_1.7fr_auto] md:items-center md:gap-10">
          <div>
            <p className="text-sm font-medium text-brand-primary">{supportAIVenture.statusLabel}</p>
            <h3 className="mt-2 text-3xl font-semibold text-text-primary">{supportAIVenture.title}</h3>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-7 text-text-secondary">{supportAIVenture.summary}</p>
            <p className="mt-3 text-sm text-text-muted">{(supportAIVenture.channels ?? []).join(" · ")}</p>
          </div>
          <button
            type="button"
            onClick={() => onAsk("What are you building next?", "support_ai")}
            className="inline-flex min-h-11 items-center gap-2 justify-self-start text-sm font-semibold text-text-primary transition-colors hover:text-brand-primary md:justify-self-end"
          >
            <MessageSquareText className="h-4 w-4 text-brand-primary" aria-hidden="true" />
            Ask what&apos;s next
          </button>
        </article>
      </div>
    </section>
  );
}

