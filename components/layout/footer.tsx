import { personalProfile } from "@/data/profile";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border-subtle bg-canvas/90 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
        <div>
          <p className="text-sm font-bold text-text-primary">
            {personalProfile.name}
          </p>
          <p className="text-xs text-text-muted mt-0.5">
            {personalProfile.roleTitle} • {personalProfile.location}
          </p>
        </div>

        {/* Social / Direct Channels */}
        <div className="flex items-center gap-4 text-xs text-text-secondary">
          <a
            href={`mailto:${personalProfile.email}`}
            className="flex items-center gap-1.5 transition-colors hover:text-text-primary"
            aria-label="Direct Email"
          >
            <Mail className="h-3.5 w-3.5 text-accent-sky" />
            <span>{personalProfile.email}</span>
          </a>
          <a
            href="https://github.com/MHemelHasan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-colors hover:text-text-primary"
            aria-label="GitHub Profile"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/MHemelHasan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-colors hover:text-text-primary"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-3.5 w-3.5" />
            <span>LinkedIn</span>
          </a>
        </div>

        <div>
          <a
            href="#top"
            className="inline-flex items-center gap-1 text-xs text-text-muted transition-colors hover:text-text-primary"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
