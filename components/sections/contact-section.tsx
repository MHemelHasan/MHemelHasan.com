"use client";

import { useState } from "react";
import { personalProfile } from "@/data/profile";
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  Copy,
  Check,
  MessageSquareText,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

interface ContactSectionProps {
  onStartConversation?: () => void;
}

export function ContactSection({ onStartConversation }: ContactSectionProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalProfile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleJumpToConversation = () => {
    if (onStartConversation) {
      onStartConversation();
    } else {
      const el = document.getElementById("conversation");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="contact" className="mt-24 sm:mt-32 mb-16 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col items-start md:items-center md:text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-sky/30 bg-accent-soft px-3.5 py-1 text-xs font-mono font-medium text-accent-sky">
          <MessageSquareText className="h-3.5 w-3.5" />
          <span>Connect & Collaborate</span>
        </div>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          Start a Conversation
        </h2>
        <p className="mt-3.5 text-base sm:text-lg text-text-secondary leading-relaxed">
          I&apos;m open to thoughtful product work, technical collaborations, and conversations around software products, platform ecosystems, and AI architecture.
        </p>
      </div>

      {/* Main Contact Card */}
      <div className="mt-12 lg:mt-16 max-w-3xl mx-auto rounded-3xl border border-border-interactive bg-surface-card p-6 sm:p-10 shadow-xl shadow-slate-900/5 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-accent-sky/5 blur-3xl pointer-events-none" />

        <div className="space-y-8">
          {/* Direct Email Showcase */}
          <div className="rounded-2xl border border-border-interactive bg-surface-nested p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-sky shadow-sm">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                  Direct Email
                </span>
                <a
                  href={`mailto:${personalProfile.email}`}
                  className="block text-lg sm:text-xl font-bold text-text-primary hover:text-accent-sky transition-colors"
                >
                  {personalProfile.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border-interactive bg-surface-card px-3.5 py-2 text-xs font-medium text-text-primary hover:border-accent-sky/50 hover:bg-surface-interactive transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-text-muted" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <a
                href={`mailto:${personalProfile.email}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-accent-sky px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-sky-400 transition-all active:scale-95"
              >
                <span>Compose</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Location & Social Connections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Location */}
            <div className="rounded-2xl border border-border-interactive bg-surface-nested p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-card border border-border-interactive text-accent-sky">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-medium text-text-muted block">
                  Location
                </span>
                <span className="text-xs sm:text-sm font-bold text-text-primary">
                  {personalProfile.location}
                </span>
              </div>
            </div>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/MHemelHasan"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border-interactive bg-surface-nested p-4 flex items-center justify-between transition-all hover:border-blue-500/40 hover:bg-surface-card"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-card border border-border-interactive text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/10">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-medium text-text-muted block">
                    Network
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-text-primary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    LinkedIn
                  </span>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-text-muted group-hover:text-text-primary transition-colors" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/MHemelHasan"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border-interactive bg-surface-nested p-4 flex items-center justify-between transition-all hover:border-accent-sky/40 hover:bg-surface-card"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-card border border-border-interactive text-text-primary group-hover:bg-accent-soft">
                  <Github className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-medium text-text-muted block">
                    Repositories
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-text-primary group-hover:text-accent-sky transition-colors">
                    GitHub
                  </span>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-text-muted group-hover:text-text-primary transition-colors" />
            </a>
          </div>

          {/* Jump to Interactive Assistant Callout */}
          <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-text-muted text-center sm:text-left">
              <Sparkles className="h-4 w-4 text-accent-sky shrink-0" />
              <span>
                Prefer structured discovery? Try the local conversational interface above.
              </span>
            </div>

            <button
              type="button"
              onClick={handleJumpToConversation}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border-interactive bg-surface-nested px-4 py-2 text-xs font-semibold text-text-primary hover:border-accent-sky/50 hover:bg-surface-interactive hover:text-accent-sky transition-all active:scale-95"
            >
              <MessageSquareText className="h-3.5 w-3.5 text-accent-sky" />
              <span>Jump to Conversational Input</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
