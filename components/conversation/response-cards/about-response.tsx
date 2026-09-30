"use client";

import Image from "next/image";
import { personalProfile } from "@/data/profile";
import { MapPin, Bot, Layers, ArrowRight, Compass, Sparkles } from "lucide-react";
import { PromptSuggestion } from "@/types/conversation";

interface AboutResponseProps {
  onSelectPrompt?: (prompt: PromptSuggestion) => void;
  onNavigateSection?: (anchor: string) => void;
}

export function AboutResponse({ onSelectPrompt, onNavigateSection }: AboutResponseProps) {
  const capabilityTags = [
    "Product Engineering",
    "Platform Apps (Shopify, Webflow, WP)",
    "Backend & Distributed Queues",
    "Commerce & Checkout Systems",
    "Technical Leadership",
  ];

  return (
    <div className="space-y-5 text-text-primary">
      {/* Level 1: Conversational Prose Introduction */}
      <p className="text-sm sm:text-base leading-relaxed text-text-primary">
        I’m <strong className="font-semibold text-text-primary">M Hemel Hasan</strong> — a Product Engineer, Builder, and Founder based in Dhaka, Bangladesh. I work at the intersection of product thinking, system architecture, and platform engineering.
      </p>

      {/* Level 2: Supporting Authentic Identity Group */}
      <div className="flex flex-col sm:flex-row items-start gap-4 rounded-2xl bg-surface-nested/70 border border-border-subtle p-4">
        <div className="relative h-20 w-20 shrink-0 rounded-2xl overflow-hidden border border-border-interactive bg-surface-card shadow-sm">
          <Image
            src="/assets/avatar.jpg"
            alt={personalProfile.name}
            fill
            sizes="80px"
            className="object-cover object-top"
            priority
          />
        </div>

        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-text-primary">{personalProfile.name}</span>
            <span className="text-xs text-text-muted">•</span>
            <span className="text-xs font-semibold text-accent-sky">Product Engineer · Builder · Founder</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
            <MapPin className="h-3 w-3 text-accent-sky shrink-0" />
            <span>Dhaka, Bangladesh (UTC+6)</span>
          </div>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pt-0.5">
            Since 2015, I’ve been taking product ideas from technical research and data modeling into production software, APIs, and commercial platform applications.
          </p>
        </div>
      </div>

      {/* Current Dual Focus (Unboxed, clean flow) */}
      <div className="space-y-2.5 pt-1">
        <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
          Current Primary Focus:
        </span>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <div className="rounded-xl border border-status-beta/25 bg-status-beta/5 p-3.5 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-status-beta uppercase">
              <span>Personal Venture</span>
              <span className="rounded bg-status-beta/20 px-1.5 py-0.5 text-[9px]">Private Beta</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-text-primary">
              Founder & Lead Architect @ Social AI
            </div>
            <p className="text-xs text-text-secondary leading-snug">
              Autonomous content research, generation, scheduling, and multi-channel publishing.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3.5 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              <span>Technical Leadership</span>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] text-emerald-700 dark:text-emerald-300">Commercial</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-text-primary">
              Technical Lead @ Themefic
            </div>
            <p className="text-xs text-text-secondary leading-snug">
              Directing architecture and engineering across 6 commercial products on Shopify, Webflow, and WordPress.
            </p>
          </div>
        </div>
      </div>

      {/* Compact Capability Cues */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-xs font-mono text-text-muted mr-1">Capability:</span>
        {capabilityTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border-subtle bg-surface-card px-2.5 py-0.5 text-xs text-text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Contextual Next Prompts & Deep Link */}
      <div className="pt-3 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs">
        {onSelectPrompt && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onSelectPrompt({
                  id: "ask-social-ai",
                  label: "Social AI",
                  iconName: "Bot",
                  targetIntent: "social_ai",
                  sampleQuery: "Tell me about Social AI",
                })
              }
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-interactive bg-surface-card px-3 py-1 text-text-secondary hover:border-accent-sky hover:text-accent-sky transition-colors"
            >
              <Bot className="h-3 w-3 text-amber-500" />
              <span>Tell me about Social AI →</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onSelectPrompt({
                  id: "ask-journey",
                  label: "My journey",
                  iconName: "Compass",
                  targetIntent: "journey",
                  sampleQuery: "Tell me about your career journey",
                })
              }
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-interactive bg-surface-card px-3 py-1 text-text-secondary hover:border-accent-sky hover:text-accent-sky transition-colors"
            >
              <Compass className="h-3 w-3 text-indigo-500" />
              <span>Career journey →</span>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => onNavigateSection?.("#journey")}
          className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-accent-sky hover:underline ml-auto"
        >
          <span>View career timeline below</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
