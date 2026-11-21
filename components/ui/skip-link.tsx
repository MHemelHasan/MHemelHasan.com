import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkipLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  targetId?: string;
}

export function SkipLink({
  targetId = "#main-content",
  className,
  children = "Skip to main content",
  ...props
}: SkipLinkProps) {
  return (
    <a
      href={targetId}
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50",
        "focus:inline-flex focus:items-center focus:rounded-lg focus:bg-brand-primary focus:px-4 focus:py-2.5",
        "focus:text-sm focus:font-semibold focus:text-white dark:focus:text-canvas dark:focus:bg-accent-sky",
        "focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-accent-sky focus:ring-2 focus:ring-accent-sky focus:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
