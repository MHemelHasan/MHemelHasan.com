"use client";

import { useState } from "react";
import { personalProfile } from "@/data/profile";
import { Check, Copy, ExternalLink, Mail, MapPin } from "lucide-react";
import { ResponseIntro, ResponseSectionLink } from "./response-primitives";

interface ContactResponseProps {
  onNavigateSection?: (anchor: string) => void;
}

export function ContactResponse({ onNavigateSection }: ContactResponseProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(personalProfile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-text-primary">
      <ResponseIntro>
        I&apos;m interested in thoughtful product problems, complex systems, and conversations with
        people who care about building things well.
      </ResponseIntro>

      <div className="border-y border-border-subtle">
        <div className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr_auto] sm:items-center">
          <p className="font-mono text-[11px] text-text-muted">Direct email</p>
          <a
            href={`mailto:${personalProfile.email}`}
            className="min-w-0 break-all text-base font-semibold text-text-primary transition-colors hover:text-accent-sky sm:break-normal"
          >
            <Mail className="mr-2 inline h-4 w-4 text-accent-sky" aria-hidden="true" />
            {personalProfile.email}
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            aria-label="Copy email address"
            className="inline-flex min-h-10 w-fit cursor-pointer items-center gap-2 text-xs font-semibold text-accent-sky"
          >
            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="grid gap-3 border-t border-border-subtle py-5 sm:grid-cols-[9rem_1fr] sm:items-center">
          <p className="font-mono text-[11px] text-text-muted">Based in</p>
          <p className="text-sm text-text-secondary">
            <MapPin className="mr-2 inline h-4 w-4" aria-hidden="true" />
            {personalProfile.location}
          </p>
        </div>

        <div className="grid gap-3 border-t border-border-subtle py-5 sm:grid-cols-[9rem_1fr] sm:items-center">
          <p className="font-mono text-[11px] text-text-muted">Professional links</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {personalProfile.socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 border-b border-transparent text-sm font-medium text-text-secondary transition-colors hover:border-accent-sky hover:text-text-primary"
              >
                {social.platform}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <ResponseSectionLink onClick={() => onNavigateSection?.("#contact")}>
        View the full contact section
      </ResponseSectionLink>
    </div>
  );
}
