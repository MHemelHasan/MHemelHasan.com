import Image from "next/image";
import { personalProfile } from "@/data/profile";
import { MapPin, Layers } from "lucide-react";

export function HeroIdentity() {
  return (
    <section className="relative w-full">
      {/* Desktop / Tablet Layout: Balanced Asymmetric Horizontal Flow */}
      <div className="hidden md:flex md:items-start md:gap-7 lg:gap-9">
        {/* Editorial Portrait Column */}
        <div className="shrink-0 flex flex-col items-center">
          <div className="relative h-32 w-32 lg:h-36 lg:w-36 rounded-3xl p-1 bg-surface-card border border-border-interactive shadow-xl shadow-slate-900/5 dark:shadow-2xl dark:shadow-sky-950/40">
            <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-surface-nested">
              <Image
                src="/assets/avatar.jpg"
                alt={personalProfile.name}
                fill
                sizes="(max-width: 1024px) 128px, 144px"
                className="object-cover object-top transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Unified Founder Signal */}
          <div className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-status-beta/30 bg-status-beta/10 px-3 py-1 text-xs font-semibold text-status-beta shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-beta opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-status-beta" />
            </span>
            <span>Founder @ Social AI</span>
            <span className="rounded bg-status-beta/20 px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-status-beta">
              Private Beta
            </span>
          </div>
        </div>

        {/* Identity & Statement Column */}
        <div className="flex-1 text-left">
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-text-primary lg:text-5xl">
              {personalProfile.name}
            </h1>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-base font-semibold tracking-wide text-accent-sky sm:text-lg">
            <span>Product Engineer</span>
            <span className="text-text-muted">•</span>
            <span>Builder</span>
            <span className="text-text-muted">•</span>
            <span>Founder</span>
          </div>

          {/* Core Positioning Statement */}
          <p className="mt-3.5 max-w-2xl text-base leading-relaxed text-text-secondary lg:text-lg">
            {personalProfile.tagline}
          </p>

          {/* Clean Context & Proof Row */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-text-muted sm:text-sm">
            <div className="inline-flex items-center gap-1.5 text-text-secondary">
              <MapPin className="h-4 w-4 text-accent-sky" />
              <span>{personalProfile.location}</span>
            </div>
            <span className="text-border-interactive">•</span>
            <div className="inline-flex items-center gap-1.5 text-text-secondary">
              <Layers className="h-4 w-4 text-accent-sky" />
              <span>Platform products across commerce & SaaS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout: Compact, High-Density First Viewport (< md) */}
      <div className="flex flex-col text-left md:hidden">
        {/* Compact Portrait + Name & Roles in one row */}
        <div className="flex items-center gap-4">
          <div className="relative h-18 w-18 shrink-0 rounded-2xl p-1 bg-surface-card border border-border-interactive shadow-md shadow-slate-900/5 dark:shadow-lg">
            <div className="relative h-full w-full overflow-hidden rounded-[12px] bg-surface-nested">
              <Image
                src="/assets/avatar.jpg"
                alt={personalProfile.name}
                fill
                sizes="72px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-text-primary">
              {personalProfile.name}
            </h1>
            <div className="mt-0.5 text-xs font-semibold text-accent-sky">
              Product Engineer • Builder • Founder
            </div>
            <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-status-beta/30 bg-status-beta/10 px-2.5 py-0.5 text-[11px] font-semibold text-status-beta">
              <span className="h-1.5 w-1.5 rounded-full bg-status-beta" />
              <span>Founder @ Social AI</span>
              <span className="font-mono text-[9px] uppercase font-bold text-status-beta">Beta</span>
            </div>
          </div>
        </div>

        {/* Concise positioning */}
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {personalProfile.tagline}
        </p>

        {/* Minimal metadata: Stack vertically to prevent awkward wrapping on narrow screens */}
        <div className="mt-3 flex flex-col gap-1.5 text-xs text-text-secondary">
          <div className="inline-flex items-center gap-1.5 font-medium">
            <MapPin className="h-3.5 w-3.5 text-accent-sky shrink-0" />
            <span>{personalProfile.location}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-[11.5px] text-text-muted">
            <Layers className="h-3.5 w-3.5 text-accent-sky shrink-0" />
            <span>Platform products across commerce & SaaS</span>
          </div>
        </div>
      </div>
    </section>

  );
}

