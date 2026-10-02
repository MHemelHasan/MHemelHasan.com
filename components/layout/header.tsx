"use client";

import { useState } from "react";
import Image from "next/image";
import { personalProfile } from "@/data/profile";
import { MessageSquareText, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface HeaderProps {
  onStartConversation?: () => void;
}

export function Header({ onStartConversation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Ventures", href: "#ventures" },
    { label: "Products", href: "#products" },
    { label: "How I Build", href: "#how-i-build" },
    { label: "Engineering", href: "#engineering" },
    { label: "Journey", href: "#journey" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const handleStartConversation = () => {
    setMobileMenuOpen(false);
    if (onStartConversation) {
      onStartConversation();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand identity */}
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

        {/* Desktop Static Section Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs lg:text-sm font-medium text-text-secondary transition-colors hover:text-accent-sky"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls: Theme Toggle + Conversation CTA + Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={handleStartConversation}
            className="hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-full border border-border-interactive bg-surface-card/90 px-3.5 py-1.5 text-xs font-medium text-text-primary shadow-sm backdrop-blur-sm transition-all hover:border-accent-sky/60 hover:bg-surface-interactive hover:text-accent-sky active:scale-95 sm:text-sm"
          >
            <MessageSquareText className="h-3.5 w-3.5 text-accent-sky" />
            <span>Start a Conversation</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex md:hidden p-2 rounded-xl border border-border-interactive bg-surface-card text-text-secondary hover:text-text-primary active:scale-95"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border-subtle bg-canvas/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2 rounded-xl text-sm font-medium text-text-secondary hover:text-accent-sky hover:bg-surface-nested transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="px-3 py-2 rounded-xl text-sm font-medium text-text-secondary hover:text-accent-sky hover:bg-surface-nested transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="pt-2 border-t border-border-subtle">
            <button
              type="button"
              onClick={handleStartConversation}
              className="w-full inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-accent-sky/40 bg-accent-soft px-4 py-2.5 text-xs font-semibold text-accent-sky shadow-sm transition-all active:scale-95"
            >
              <MessageSquareText className="h-3.5 w-3.5" />
              <span>Start a Conversation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
