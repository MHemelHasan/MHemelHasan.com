"use client";

import { useState } from "react";
import { personalProfile } from "@/data/profile";
import { Mail, MapPin, ExternalLink, ArrowRight, Check, Copy, Bot, Layers, User } from "lucide-react";
import { PromptSuggestion } from "@/types/conversation";

interface ContactResponseProps {
  onSelectPrompt?: (prompt: PromptSuggestion) => void;
  onNavigateSection?: (anchor: string) => void;
}

export function ContactResponse({ onSelectPrompt, onNavigateSection }: ContactResponseProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 text-text-primary">
      {/* Level 1: Conversational Prose Introduction */}
      <p className="text-sm sm:text-base leading-relaxed text-text-primary">
        Yes — I’m open to thoughtful product engineering work, technical collaborations, and discussions around platform applications, architecture, and venture building.
      </p>

      {/* Level 2: Direct Contact Channels */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-1">
        {/* Email Box */}
        <div className="rounded-2xl border border-border-interactive bg-surface-card p-4 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-mono uppercase tracking-wider text-[11px]">Direct Email</span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex cursor-pointer items-center gap-1 text-[11px] text-accent-sky hover:underline"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <a
            href={`mailto:${personalProfile.email}`}
            className="block text-sm sm:text-base font-mono font-bold text-text-primary hover:text-accent-sky transition-colors"
          >
            {personalProfile.email}
          </a>
          <p className="text-xs text-text-secondary leading-snug">
            Feel free to email directly with product ideas, technical questions, or collaboration proposals.
          </p>
        </div>

        {/* Location & Timezone Box */}
        <div className="rounded-2xl border border-border-subtle bg-surface-nested/70 p-4 space-y-2">
          <span className="font-mono uppercase tracking-wider text-[11px] text-text-muted block">
            Base & Working Zone
          </span>
          <div className="flex items-center gap-2 text-sm font-bold text-text-primary">
            <MapPin className="h-4 w-4 text-accent-sky" />
            <span>{personalProfile.location}</span>
          </div>
          <p className="text-xs text-text-secondary leading-snug">
            Available for remote collaboration and engineering leadership across global timezones.
          </p>
        </div>
      </div>

      {/* Verified Professional Profiles */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-mono text-text-muted mr-1">Verified Profiles:</span>
        {personalProfile.socialLinks.map((social) => (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-card px-3 py-1 text-xs font-medium text-text-secondary hover:border-accent-sky hover:text-text-primary transition-colors shadow-sm"
          >
            <span>{social.platform}</span>
            <ExternalLink className="h-3 w-3 text-text-muted" />
          </a>
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
                  id: "ask-about",
                  label: "About me",
                  iconName: "User",
                  targetIntent: "about_me",
                  sampleQuery: "Tell me about yourself",
                })
              }
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-interactive bg-surface-card px-3 py-1 text-text-secondary hover:border-accent-sky hover:text-accent-sky transition-colors"
            >
              <User className="h-3 w-3 text-sky-500" />
              <span>About me →</span>
            </button>

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
              <span>Social AI →</span>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => onNavigateSection?.("#contact")}
          className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-accent-sky hover:underline ml-auto"
        >
          <span>View contact section below</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
