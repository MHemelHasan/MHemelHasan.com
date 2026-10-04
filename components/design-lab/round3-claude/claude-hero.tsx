"use client";

import { useState } from "react";
import Image from "next/image";
import { personalProfile } from "@/data/profile";
import { initialPromptSuggestions } from "@/data/prompts";
import { useConversation } from "@/components/conversation/conversation-context";
import { PromptSuggestion } from "@/types/conversation";
import {
  ArrowRight,
  Sparkles,
  MapPin,
  User,
  Bot,
  Layers,
  GitFork,
  Compass,
  Send,
  Briefcase,
} from "lucide-react";

/**
 * HERO — Round 3 Claude Experiment
 *
 * Composition concept: "Editorial Split"
 *
 * The hero is structured as an asymmetric two-column composition on desktop:
 *   LEFT (≈60%): Identity column — name at large editorial scale, role line,
 *     tagline, and a single quiet metadata line. This column breathes.
 *   RIGHT (≈40%): Conversation column — the portrait anchors the top of this
 *     column, then the conversation input + prompt chips live beneath it,
 *     creating a "here's who I am / here's how to talk to me" left-right read.
 *
 * The portrait is treated editorially: a generous crop with rounded corners
 * that feels personal, not corporate. It sits at the top of the right column,
 * above the conversation gateway, reinforcing "human presence → interaction."
 *
 * On mobile, the composition collapses to a vertical flow:
 *   Portrait (compact) + Name + Role
 *   Tagline
 *   Conversation input + chips
 *
 * The entire hero sits within the first viewport (~100svh minus header).
 * There is no decorative animation blocking content access.
 */
export function ClaudeHero() {
  const [inputValue, setInputValue] = useState("");
  const { openConversation } = useConversation();

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;
    openConversation(query);
    setInputValue("");
  };

  const handleSelectPrompt = (prompt: PromptSuggestion) => {
    openConversation(prompt.sampleQuery, prompt.targetIntent);
  };

  const getIcon = (iconName: PromptSuggestion["iconName"]) => {
    switch (iconName) {
      case "User":
        return <User className="h-3.5 w-3.5 text-accent-sky" />;
      case "Bot":
        return <Bot className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />;
      case "Layers":
        return <Layers className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />;
      case "GitFork":
        return <GitFork className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />;
      case "Compass":
        return <Compass className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />;
      case "Sparkles":
        return <Sparkles className="h-3.5 w-3.5 text-accent-sky" />;
      case "Send":
        return <Send className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />;
      default:
        return <Briefcase className="h-3.5 w-3.5 text-text-secondary" />;
    }
  };

  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1200px] flex-col justify-center px-5 py-10 sm:px-8 sm:py-14 lg:py-16"
    >
      {/* ─── Desktop: Asymmetric two-column editorial split ─── */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-16 xl:gap-20 items-start">
        {/* LEFT: Identity column — name, role, positioning */}
        <div className="lg:col-span-7 flex flex-col justify-center pt-4">
          {/* Name — editorial display scale */}
          <h1 className="text-[3.25rem] xl:text-[3.75rem] font-extrabold leading-[1.08] tracking-tight text-text-primary">
            {personalProfile.name}
          </h1>

          {/* Role line — cobalt accent, restrained */}
          <p className="mt-4 text-lg xl:text-xl font-semibold tracking-wide text-accent-sky">
            {personalProfile.titles.join(" · ")}
          </p>

          {/* Core positioning statement */}
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-secondary">
            {personalProfile.tagline}
          </p>

          {/* Quiet metadata line */}
          <div className="mt-8 flex items-center gap-5 text-sm text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-accent-sky" />
              {personalProfile.location}
            </span>
            <span className="h-3.5 w-px bg-border-subtle" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-beta opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-status-beta" />
              </span>
              <span className="font-medium text-text-secondary">
                Building{" "}
                <span className="text-text-primary font-semibold">Social AI</span>
              </span>
              <span className="rounded bg-status-beta/15 px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-status-beta">
                Private Beta
              </span>
            </span>
          </div>
        </div>

        {/* RIGHT: Portrait + Conversation column */}
        <div className="lg:col-span-5 flex flex-col items-start gap-8">
          {/* Portrait — editorial treatment */}
          <div className="relative w-44 h-52 xl:w-48 xl:h-56 rounded-2xl overflow-hidden border border-border-subtle shadow-lg shadow-slate-900/8 dark:shadow-2xl dark:shadow-black/40 self-center">
            <Image
              src="/assets/avatar.jpg"
              alt={personalProfile.name}
              fill
              sizes="(max-width: 1280px) 176px, 192px"
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Conversation gateway — embedded product interaction */}
          <div className="w-full max-w-sm">
            {/* Input bar */}
            <form
              onSubmit={handleTextSubmit}
              className="group relative flex w-full items-center rounded-2xl border border-border-interactive bg-surface-card p-1.5 shadow-md shadow-slate-900/5 dark:shadow-xl dark:shadow-black/40 backdrop-blur-xl transition-all duration-200 hover:border-accent-sky/40 focus-within:border-accent-sky focus-within:shadow-lg"
            >
              <div className="pl-3 text-text-muted transition-colors group-focus-within:text-accent-sky">
                <Sparkles className="h-4 w-4" />
              </div>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything…"
                aria-label="Ask a question about M Hemel Hasan's work"
                className="w-full bg-transparent px-3 py-2 text-sm font-medium text-text-primary placeholder:text-text-muted/80 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 border-none outline-none shadow-none"
              />

              <button
                type="submit"
                disabled={!inputValue.trim()}
                aria-label="Submit query and enter conversation"
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-accent-sky text-canvas font-bold shadow-md transition-all hover:opacity-90 disabled:opacity-35 disabled:cursor-not-allowed active:scale-95"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Prompt suggestions — intimate scale beneath portrait */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {initialPromptSuggestions.map((prompt) => (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => handleSelectPrompt(prompt)}
                  className="group inline-flex min-h-[36px] cursor-pointer items-center gap-2 rounded-full border border-border-interactive bg-surface-card px-3 py-1.5 text-xs font-medium text-text-secondary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-sky/50 hover:bg-surface-nested hover:text-text-primary hover:shadow-md active:scale-95"
                >
                  <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                    {getIcon(prompt.iconName)}
                  </span>
                  <span className="tracking-tight">{prompt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Tablet (md, not lg): Stacked with horizontal identity row ─── */}
      <div className="hidden md:flex md:flex-col lg:hidden gap-8">
        {/* Identity row: portrait + text side by side */}
        <div className="flex items-start gap-7">
          <div className="relative h-32 w-28 shrink-0 rounded-2xl overflow-hidden border border-border-subtle shadow-lg shadow-slate-900/8 dark:shadow-xl dark:shadow-black/30">
            <Image
              src="/assets/avatar.jpg"
              alt={personalProfile.name}
              fill
              sizes="112px"
              className="object-cover object-top"
              priority
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold tracking-tight text-text-primary">
              {personalProfile.name}
            </h1>
            <p className="mt-2 text-base font-semibold tracking-wide text-accent-sky">
              {personalProfile.titles.join(" · ")}
            </p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
              {personalProfile.tagline}
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-accent-sky" />
                {personalProfile.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-status-beta" />
                <span className="font-medium text-text-secondary">
                  Building Social AI
                </span>
                <span className="rounded bg-status-beta/15 px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-status-beta">
                  Beta
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Conversation gateway — full width on tablet */}
        <div className="w-full max-w-2xl mx-auto">
          <form
            onSubmit={handleTextSubmit}
            className="group relative flex w-full items-center rounded-full border border-border-interactive bg-surface-card p-2 shadow-md shadow-slate-900/5 dark:shadow-xl dark:shadow-black/40 backdrop-blur-xl transition-all duration-200 hover:border-accent-sky/40 focus-within:border-accent-sky focus-within:shadow-lg"
          >
            <div className="pl-4 text-text-muted transition-colors group-focus-within:text-accent-sky">
              <Sparkles className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me about what I build, architecture, ventures…"
              aria-label="Ask a question about M Hemel Hasan's work"
              className="w-full bg-transparent px-3 py-2 text-base font-medium text-text-primary placeholder:text-text-muted/80 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 border-none outline-none shadow-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Submit query and enter conversation"
              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-accent-sky text-canvas font-bold shadow-md transition-all hover:opacity-90 disabled:opacity-35 disabled:cursor-not-allowed active:scale-95"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-3.5 flex flex-wrap justify-center gap-2">
            {initialPromptSuggestions.map((prompt) => (
              <button
                key={prompt.id}
                type="button"
                onClick={() => handleSelectPrompt(prompt)}
                className="group inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-full border border-border-interactive bg-surface-card px-3.5 py-1.5 text-sm font-medium text-text-secondary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-sky/50 hover:bg-surface-nested hover:text-text-primary hover:shadow-md active:scale-95"
              >
                <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                  {getIcon(prompt.iconName)}
                </span>
                <span className="tracking-tight">{prompt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Mobile (<md): Compact vertical flow ─── */}
      <div className="flex flex-col md:hidden gap-6">
        {/* Compact identity: portrait + name inline */}
        <div className="flex items-center gap-4">
          <div className="relative h-[72px] w-[72px] shrink-0 rounded-2xl overflow-hidden border border-border-subtle shadow-md shadow-slate-900/5 dark:shadow-lg">
            <Image
              src="/assets/avatar.jpg"
              alt={personalProfile.name}
              fill
              sizes="72px"
              className="object-cover object-top"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-text-primary">
              {personalProfile.name}
            </h1>
            <p className="mt-0.5 text-xs font-semibold tracking-wide text-accent-sky">
              {personalProfile.titles.join(" · ")}
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm leading-relaxed text-text-secondary">
          {personalProfile.tagline}
        </p>

        {/* Metadata row */}
        <div className="flex flex-col gap-1.5 text-xs text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-accent-sky shrink-0" />
            {personalProfile.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-status-beta shrink-0" />
            <span className="font-medium text-text-secondary">
              Building Social AI
            </span>
            <span className="rounded bg-status-beta/15 px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-status-beta">
              Beta
            </span>
          </span>
        </div>

        {/* Conversation gateway — mobile */}
        <div className="w-full">
          <form
            onSubmit={handleTextSubmit}
            className="group relative flex w-full items-center rounded-2xl border border-border-interactive bg-surface-card p-1.5 shadow-md shadow-slate-900/5 dark:shadow-xl dark:shadow-black/40 backdrop-blur-xl transition-all duration-200 hover:border-accent-sky/40 focus-within:border-accent-sky focus-within:shadow-lg"
          >
            <div className="pl-3 text-text-muted transition-colors group-focus-within:text-accent-sky">
              <Sparkles className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything…"
              aria-label="Ask a question about M Hemel Hasan's work"
              className="w-full bg-transparent px-3 py-2 text-sm font-medium text-text-primary placeholder:text-text-muted/80 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 border-none outline-none shadow-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Submit query and enter conversation"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-accent-sky text-canvas font-bold shadow-md transition-all hover:opacity-90 disabled:opacity-35 disabled:cursor-not-allowed active:scale-95"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {initialPromptSuggestions.map((prompt) => (
              <button
                key={prompt.id}
                type="button"
                onClick={() => handleSelectPrompt(prompt)}
                className="group inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-border-interactive bg-surface-card px-3 py-1.5 text-xs font-medium text-text-secondary shadow-sm transition-all duration-200 hover:border-accent-sky/50 hover:bg-surface-nested hover:text-text-primary active:scale-95"
              >
                <span className="shrink-0">
                  {getIcon(prompt.iconName)}
                </span>
                <span className="tracking-tight">{prompt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
