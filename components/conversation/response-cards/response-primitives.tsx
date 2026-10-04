import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

export function ResponseIntro({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-3xl text-base leading-7 text-text-primary sm:text-lg sm:leading-8">
      {children}
    </p>
  );
}

export function ResponseSection({
  label,
  title,
  children,
}: {
  label: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-border-subtle pt-5">
      <p className="font-mono text-[11px] uppercase text-text-muted">{label}</p>
      {title && (
        <h3 className="mt-2 text-lg font-semibold leading-7 text-text-primary sm:text-xl">
          {title}
        </h3>
      )}
      <div className={title ? "mt-4" : "mt-3"}>{children}</div>
    </section>
  );
}

export function ResponseSectionLink({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-10 cursor-pointer items-center gap-2 border-b border-accent-sky text-sm font-semibold text-text-primary transition-colors hover:text-accent-sky"
    >
      {children}
      <ArrowRight className="h-4 w-4 text-accent-sky" aria-hidden="true" />
    </button>
  );
}
