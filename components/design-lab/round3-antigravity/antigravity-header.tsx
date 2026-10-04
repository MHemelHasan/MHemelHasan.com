"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageSquareText, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface AntigravityHeaderProps {
  onStartConversation: () => void;
}

export function AntigravityHeader({ onStartConversation }: AntigravityHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-canvas/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand identity lockup */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex h-8 items-center transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-sky"
            aria-label="M Hemel Hasan home"
          >
            <Image
              src="/brand/logo/m-hemel-hasan-logo-horizontal.svg"
              alt="M Hemel Hasan"
              width={650}
              height={120}
              priority
              className="brand-logo-light h-7 w-auto sm:h-8"
            />
            <Image
              src="/brand/logo/m-hemel-hasan-logo-horizontal-on-dark.svg"
              alt="M Hemel Hasan"
              width={650}
              height={120}
              priority
              className="brand-logo-dark h-7 w-auto sm:h-8"
            />
          </Link>

          <span className="hidden items-center gap-1.5 rounded-full border border-border-interactive bg-surface-card px-2.5 py-0.5 text-[11px] font-mono font-medium text-text-muted sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-sky" />
            Round 3 Lab
          </span>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onStartConversation}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-accent-sky/30 bg-accent-soft/80 px-3.5 text-xs font-semibold text-accent-sky shadow-sm transition-all duration-200 hover:border-accent-sky hover:bg-accent-sky hover:text-white active:scale-95 sm:text-sm"
            aria-label="Start interactive conversation"
          >
            <MessageSquareText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Ask in Conversation</span>
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
