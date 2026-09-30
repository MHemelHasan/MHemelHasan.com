"use client";

import { useState } from "react";
import { Printer, Copy, Check, Share2 } from "lucide-react";

export function PolicyActions() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="flex items-center gap-2 no-print">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border-interactive bg-surface-card px-3 text-xs font-medium text-text-secondary transition-all hover:border-accent-sky/50 hover:bg-surface-interactive hover:text-text-primary active:scale-95 cursor-pointer"
        title="Copy policy URL to clipboard"
        aria-label="Copy policy link"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-emerald-500 font-semibold">Link Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Copy Link</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border-interactive bg-surface-card px-3 text-xs font-medium text-text-secondary transition-all hover:border-accent-sky/50 hover:bg-surface-interactive hover:text-text-primary active:scale-95 cursor-pointer"
        title="Print or save as PDF"
        aria-label="Print policy document"
      >
        <Printer className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Print / PDF</span>
      </button>
    </div>
  );
}
