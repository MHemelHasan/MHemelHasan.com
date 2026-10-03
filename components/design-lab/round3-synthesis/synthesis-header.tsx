"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageSquareText } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { personalProfile } from "@/data/profile";

interface SynthesisHeaderProps {
  onStartConversation: () => void;
}

export function SynthesisHeader({ onStartConversation }: SynthesisHeaderProps) {
  return (
    <header className="relative z-30 border-b border-border-subtle bg-canvas/95 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" className="flex h-11 items-center" aria-label={`${personalProfile.name} synthesis home`}>
          <Image
            src="/brand/logo/m-hemel-hasan-logo-horizontal.svg"
            alt=""
            aria-hidden="true"
            width={650}
            height={120}
            priority
            className="brand-logo-light h-7 w-auto"
          />
          <Image
            src="/brand/logo/m-hemel-hasan-logo-horizontal-on-dark.svg"
            alt=""
            aria-hidden="true"
            width={650}
            height={120}
            priority
            className="brand-logo-dark h-7 w-auto"
          />
        </a>

        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            href="/"
            className="inline-flex h-11 w-11 items-center justify-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary sm:w-auto sm:px-3"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>
          <div className="[&>button]:!h-11 [&>button]:!w-11">
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={onStartConversation}
            className="inline-flex h-11 w-11 items-center justify-center text-text-secondary transition-colors hover:text-brand-primary sm:w-auto sm:gap-2 sm:px-3"
            aria-label="Start a conversation"
            title="Start a conversation"
          >
            <MessageSquareText className="h-4 w-4" aria-hidden="true" />
            <span className="hidden text-sm font-medium sm:inline">Ask Hemel</span>
          </button>
        </div>
      </div>
    </header>
  );
}
