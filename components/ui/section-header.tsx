import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  headingLevel?: "h1" | "h2" | "h3";
}

export const SectionHeader = React.forwardRef<
  HTMLDivElement,
  SectionHeaderProps
>(
  (
    {
      className,
      title,
      description,
      action,
      headingLevel = "h2",
      ...props
    },
    ref
  ) => {
    const Heading = headingLevel;

    return (
      <header
        ref={ref}
        className={cn(
          "grid gap-6 border-b border-border-subtle pb-8 lg:grid-cols-12 lg:gap-10 lg:pb-10",
          className
        )}
        {...props}
      >
        <div className="lg:col-span-7">
          <Heading className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.15] tracking-tight text-text-primary">
            {title}
          </Heading>
        </div>

        <div className="flex flex-col justify-between gap-4 lg:col-span-5 lg:pt-1">
          {description && (
            <p className="text-base sm:text-lg leading-relaxed text-text-secondary">
              {description}
            </p>
          )}
          {action && <div className="pt-1">{action}</div>}
        </div>
      </header>
    );
  }
);

SectionHeader.displayName = "SectionHeader";
