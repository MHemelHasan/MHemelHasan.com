import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      type = "button",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          // Base layout and minimum touch-target size (min 44px)
          "inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-150 ease-out select-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-sky",
          "disabled:pointer-events-none disabled:opacity-40",
          // Variants
          variant === "primary" &&
            "bg-brand-primary text-white shadow-sm hover:bg-brand-primary-hover active:scale-[0.98] dark:bg-accent-sky dark:text-canvas dark:hover:bg-[#859EFF]",
          variant === "secondary" &&
            "border border-border-interactive bg-transparent text-text-primary hover:bg-surface-nested active:scale-[0.98]",
          variant === "ghost" &&
            "bg-transparent text-text-secondary hover:bg-surface-nested hover:text-text-primary active:scale-[0.98]",
          variant === "link" &&
            "min-h-0 p-0 text-brand-primary underline-offset-4 hover:underline hover:text-brand-primary-hover",
          // Sizes
          size === "default" && "px-5 py-2.5",
          size === "sm" && "px-3.5 py-2 text-xs",
          size === "lg" && "px-6 py-3 text-base",
          size === "icon" && "h-11 w-11 p-0",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
