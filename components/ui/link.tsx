import * as React from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "default" | "standalone" | "subtle" | "button-primary" | "button-secondary";
  showExternalIcon?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      href,
      variant = "default",
      showExternalIcon,
      children,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const isExternal =
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:");

    const resolvedTarget = target ?? (isExternal && !href.startsWith("mailto:") ? "_blank" : undefined);
    const resolvedRel =
      rel ??
      (resolvedTarget === "_blank" ? "noopener noreferrer" : undefined);

    const isButtonLike =
      variant === "button-primary" || variant === "button-secondary";

    const content = (
      <>
        {children}
        {showExternalIcon && isExternal && !href.startsWith("mailto:") && (
          <ArrowUpRight
            className="h-3.5 w-3.5 shrink-0 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        )}
      </>
    );

    const classes = cn(
      "transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-sky",
      variant === "default" &&
        "text-text-primary underline underline-offset-4 decoration-border-interactive hover:decoration-brand-primary hover:text-brand-primary",
      variant === "standalone" &&
        "group inline-flex items-center gap-1.5 font-semibold text-brand-primary hover:text-brand-primary-hover hover:underline underline-offset-4",
      variant === "subtle" &&
        "text-text-secondary hover:text-text-primary hover:underline underline-offset-4",
      variant === "button-primary" &&
        "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary-hover active:scale-[0.98] dark:bg-accent-sky dark:text-canvas dark:hover:bg-[#859EFF]",
      variant === "button-secondary" &&
        "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-border-interactive bg-transparent px-5 py-2.5 text-sm font-semibold text-text-primary hover:bg-surface-nested active:scale-[0.98]",
      className
    );

    if (isExternal || href.startsWith("#")) {
      return (
        <a
          ref={ref}
          href={href}
          target={resolvedTarget}
          rel={resolvedRel}
          className={classes}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <NextLink
        ref={ref}
        href={href}
        className={classes}
        {...props}
      >
        {content}
      </NextLink>
    );
  }
);

Link.displayName = "Link";
