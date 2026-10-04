"use client";

import Image from "next/image";
import { personalProfile } from "@/data/profile";
import { MessageSquareText } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface ClaudeExperimentHeaderProps {
  onStartConversation?: () => void;
}

export function ClaudeExperimentHeader({
  onStartConversation,
}: ClaudeExperimentHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3.5 sm:px-8">
        {/* Brand identity — horizontal logo lockup */}
        <a
          href="#top"
          className="flex h-8 items-center transition-opacity hover:opacity-80"
          aria-label={`${personalProfile.name} home`}
        >
          <Image
            src="/brand/logo/m-hemel-hasan-logo-horizontal.svg"
            alt=""
            aria-hidden="true"
            width={650}
            height={120}
            priority
            className="brand-logo-light h-7 w-auto sm:h-8"
          />
          <Image
            src="/brand/logo/m-hemel-hasan-logo-horizontal-on-dark.svg"
            alt=""
            aria-hidden="true"
            width={650}
            height={120}
            priority
            className="brand-logo-dark h-7 w-auto sm:h-8"
          />
        </a>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={onStartConversation}
            className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-full border border-border-interactive bg-surface-card/90 px-3.5 py-1.5 text-xs font-medium text-text-primary shadow-sm backdrop-blur-sm transition-all hover:border-accent-sky/60 hover:bg-surface-interactive hover:text-accent-sky active:scale-95 sm:text-sm"
          >
            <MessageSquareText className="h-3.5 w-3.5 text-accent-sky" />
            <span>Start a Conversation</span>
          </button>
        </div>
      </div>
    </header>
  );
}
