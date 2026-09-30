import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Database,
  FolderDown,
  Youtube,
  Baby,
  FileClock,
  Mail,
  FileText,
  CheckCircle2,
  HardDrive,
  ExternalLink,
  Lock,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Folder,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { PolicyActions } from "@/components/shortsaver/policy-actions";

export const metadata: Metadata = {
  title: "Privacy Policy — Short Saver",
  description:
    "Official Privacy Policy for Short Saver. Short Saver values your privacy with zero personal data collection, no account logins, and safe local-only storage.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ShortSaverPrivacyPolicy() {
  const effectiveDate = "October 1, 2026";

  const keyHighlights = [
    {
      icon: Lock,
      title: "Zero Data Collection",
      description: "No logins, no account creation, and zero personal tracking.",
    },
    {
      icon: HardDrive,
      title: "100% Local Storage",
      description: "Videos are saved strictly on your local device in Downloads.",
    },
    {
      icon: ShieldCheck,
      title: "No 3rd-Party Trackers",
      description: "No advertising networks, cookies, or profiling mechanisms.",
    },
  ];

  const sections = [
    {
      id: "data-collection",
      number: "01",
      title: "1. Data Collection",
      icon: Database,
      accentColor: "from-sky-500/10 via-sky-500/5 to-transparent",
      iconColor: "text-sky-500 dark:text-sky-400",
      iconBg: "bg-sky-500/10 dark:bg-sky-500/20 border-sky-500/20",
      content:
        "We do NOT collect, store, use, or share any personal data. The app does not require any form of account login, personal identification, or third-party tracking.",
      pills: ["No Login Required", "No Personal Telemetry", "No Ad Profiling"],
    },
    {
      id: "permissions",
      number: "02",
      title: "2. Permissions",
      icon: FolderDown,
      accentColor: "from-blue-500/10 via-blue-500/5 to-transparent",
      iconColor: "text-blue-500 dark:text-blue-400",
      iconBg: "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/20",
      content:
        'The app requests access to your device storage solely to save videos. These videos are stored locally in a folder named "Short Saver" inside your Downloads directory.',
      pills: ["Storage Permission Solely for Video Saving"],
      folderCallout: {
        label: "Local Storage Location",
        path: "Downloads / Short Saver",
      },
    },
    {
      id: "third-party-content",
      number: "03",
      title: "3. Third-Party Content",
      icon: Youtube,
      accentColor: "from-rose-500/10 via-rose-500/5 to-transparent",
      iconColor: "text-rose-500 dark:text-rose-400",
      iconBg: "bg-rose-500/10 dark:bg-rose-500/20 border-rose-500/20",
      content:
        "Short Saver interacts with publicly accessible video platforms (e.g., YouTube) to allow users to save videos for offline, personal use. We do not control or own any of the content, and all copyrights belong to the original creators.",
      pills: ["Personal Offline Use", "Respects Original Creator Rights"],
    },
    {
      id: "childrens-privacy",
      number: "04",
      title: "4. Children’s Privacy",
      icon: Baby,
      accentColor: "from-amber-500/10 via-amber-500/5 to-transparent",
      iconColor: "text-amber-500 dark:text-amber-400",
      iconBg: "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20",
      content:
        "We do not knowingly collect any personal information from children under the age of 13. If you believe we may have inadvertently collected such information, please contact us immediately, and we will take necessary action.",
      pills: ["COPPA Compliant", "Under 13 Protection"],
    },
    {
      id: "changes-to-policy",
      number: "05",
      title: "5. Changes to This Policy",
      icon: FileClock,
      accentColor: "from-indigo-500/10 via-indigo-500/5 to-transparent",
      iconColor: "text-indigo-500 dark:text-indigo-400",
      iconBg: "bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/20",
      content:
        "We may update this Privacy Policy in the future. Any changes will be reflected on this page. Continued use of the app indicates your agreement to the latest policy.",
      pills: ["Transparent Updates", "Real-Time Online Availability"],
    },
    {
      id: "contact",
      number: "06",
      title: "6. Contact",
      icon: Mail,
      accentColor: "from-emerald-500/10 via-emerald-500/5 to-transparent",
      iconColor: "text-emerald-500 dark:text-emerald-400",
      iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20",
      content:
        "If you have any questions or concerns regarding this Privacy Policy, please contact us via our developer email listed on the Google Play Store.",
      pills: ["Official Google Play Store Developer Channel"],
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-text-primary selection:bg-accent-soft selection:text-accent-sky">
      {/* Top Header / Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-canvas/85 backdrop-blur-md transition-colors">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          {/* App Branding */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-md shadow-sky-500/20">
              <FolderDown className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-text-primary">
                  Short Saver
                </span>
                <span className="hidden rounded-full border border-accent-sky/30 bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent-sky sm:inline-block">
                  Android App
                </span>
              </div>
              <p className="text-xs text-text-muted">Privacy Policy</p>
            </div>
          </div>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>Official & Active</span>
            </div>

            <PolicyActions />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Document Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-text-muted">
          <span>Apps</span>
          <ChevronRight className="h-3 w-3 text-text-muted/60" />
          <span className="text-text-secondary font-medium">Short Saver</span>
          <ChevronRight className="h-3 w-3 text-text-muted/60" />
          <span className="text-accent-sky font-semibold">Privacy Policy</span>
        </nav>

        {/* Hero Section */}
        <div className="relative mb-10 overflow-hidden rounded-2xl border border-border-interactive bg-surface-card p-6 sm:p-8 shadow-sm">
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-sky/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-accent-sky/30 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-sky mb-4">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Official Transparency Document</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-2 text-sm font-medium text-text-muted">
              Applicable to: <strong className="text-text-secondary">Short Saver for Android</strong>
            </p>

            {/* Document Metadata Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-4 border-t border-border-subtle pt-4 text-xs text-text-secondary">
              <div className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-text-muted" />
                <span>Effective Date: <strong>{effectiveDate}</strong></span>
              </div>
              <span className="hidden sm:inline text-text-muted">•</span>
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-text-muted" />
                <span>Data Collection: <strong>Zero (None)</strong></span>
              </div>
              <span className="hidden sm:inline text-text-muted">•</span>
              <div className="flex items-center gap-1.5">
                <HardDrive className="h-3.5 w-3.5 text-text-muted" />
                <span>Storage: <strong>Device-Only</strong></span>
              </div>
            </div>

            {/* Policy Mission Statement Card */}
            <div className="mt-6 rounded-xl border border-accent-sky/20 bg-accent-soft/60 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-sky/15 text-accent-sky">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-medium leading-relaxed text-text-primary">
                    Short Saver values your privacy. This Privacy Policy outlines how the app handles user information and permissions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Summary Strip */}
        <section aria-label="Privacy Summary" className="mb-10">
          <h2 className="sr-only">Key Privacy Principles</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {keyHighlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-border-subtle bg-surface-card p-4 transition-all hover:border-border-interactive hover:shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-nested text-accent-sky">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">
                      {highlight.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                    {highlight.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Numbered Policy Sections */}
        <section aria-label="Detailed Policy Sections" className="space-y-5">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <article
                key={section.id}
                id={section.id}
                className="group relative overflow-hidden rounded-xl border border-border-subtle bg-surface-card p-5 sm:p-6 transition-all duration-200 hover:border-border-interactive hover:shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Icon & Section Number */}
                  <div className="flex items-center sm:flex-col sm:items-center gap-3 sm:gap-2 shrink-0">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border ${section.iconBg} ${section.iconColor} shadow-sm transition-transform duration-200 group-hover:scale-105`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-text-muted">
                      {section.number}
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
                        {section.title}
                      </h2>
                    </div>

                    {/* Exact Verbatim Body Text */}
                    <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
                      {section.content}
                    </p>

                    {/* Section 2 Folder Callout Box */}
                    {section.folderCallout && (
                      <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-border-interactive bg-surface-nested p-3 text-xs">
                        <Folder className="h-4 w-4 text-accent-sky shrink-0" />
                        <span className="text-text-muted">{section.folderCallout.label}:</span>
                        <code className="rounded bg-surface-interactive px-1.5 py-0.5 font-mono font-semibold text-text-primary">
                          {section.folderCallout.path}
                        </code>
                      </div>
                    )}

                    {/* Badges / Micro-tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {section.pills.map((pill, pIdx) => (
                        <span
                          key={pIdx}
                          className="inline-flex items-center gap-1 rounded-md border border-border-subtle bg-surface-nested px-2 py-0.5 text-[11px] font-medium text-text-muted"
                        >
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          <span>{pill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* Agreement / Acceptance Notice Card */}
        <div className="mt-10 overflow-hidden rounded-2xl border-2 border-accent-sky/30 bg-gradient-to-r from-accent-soft via-surface-card to-accent-soft p-6 sm:p-8 text-center shadow-md">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-sky/15 text-accent-sky mb-4">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-text-primary">
            Acceptance of Terms
          </h3>
          <p className="mt-2 text-base sm:text-lg font-semibold text-accent-sky dark:text-accent-sky">
            By using Short Saver, you agree to this Privacy Policy.
          </p>
          <p className="mt-2 text-xs sm:text-sm text-text-muted max-w-xl mx-auto">
            This agreement applies to all installs, updates, and offline usage of the Short Saver application for Android.
          </p>
        </div>

        {/* Support & Store Notice */}
        <div className="mt-8 rounded-xl border border-border-subtle bg-surface-card p-5 text-center text-xs text-text-muted">
          <p>
            Short Saver is distributed via the Google Play Store. For any developer inquiries, bug reports, or legal questions, reach out via the official developer contact address on our Google Play Store store listing.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border-subtle bg-canvas-subtle py-8 text-center text-xs text-text-muted">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 text-white font-mono text-[10px] font-bold">
                SS
              </span>
              <span className="font-semibold text-text-primary">Short Saver</span>
              <span className="text-text-muted">— Mobile Video Utility</span>
            </div>
            <p>© {new Date().getFullYear()} Short Saver. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
