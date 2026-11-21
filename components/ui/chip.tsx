import * as React from "react";
import { cn } from "@/lib/utils";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "status-beta" | "status-live" | "interactive";
  size?: "default" | "sm";
  selected?: boolean;
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      className,
      variant = "neutral",
      size = "default",
      selected = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          // Base layout: minimum font size is 13px (text-xs token)
          "inline-flex items-center gap-1.5 rounded-full border text-xs transition-colors duration-150 select-none",
          // Sizing
          size === "default" && "px-3 py-1 font-medium leading-tight",
          size === "sm" && "px-2.5 py-0.5 text-xs font-medium leading-tight",
          // Variants
          variant === "neutral" &&
            "border-border-subtle bg-surface-nested text-text-secondary",
          variant === "status-beta" &&
            "border-status-beta/30 bg-status-beta/10 text-status-beta font-semibold",
          variant === "status-live" &&
            "border-status-live/30 bg-status-live/10 text-status-live font-semibold",
          variant === "interactive" &&
            "cursor-pointer border-border-interactive bg-surface-card text-text-secondary hover:bg-surface-nested hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-sky",
          selected &&
            variant === "interactive" &&
            "border-brand-primary bg-brand-soft text-brand-primary font-semibold dark:border-accent-sky dark:bg-accent-soft dark:text-accent-sky",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Chip.displayName = "Chip";
