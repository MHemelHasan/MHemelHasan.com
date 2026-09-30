"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.style.colorScheme = "dark";
      try {
        localStorage.setItem("theme", "dark");
      } catch (e) {}
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.style.colorScheme = "light";
      try {
        localStorage.setItem("theme", "light");
      } catch (e) {}
    }
  };

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 sm:h-9 sm:w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border-interactive bg-surface-card text-text-secondary shadow-sm transition-all duration-200 hover:border-accent-sky/60 hover:bg-surface-interactive hover:text-text-primary active:scale-95"
    >
      {/* Icon transition */}
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
        ) : (
          <Moon className="h-4 w-4 text-slate-700 dark:text-slate-200 transition-transform duration-200 hover:-rotate-12" />
        )
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  );
}
