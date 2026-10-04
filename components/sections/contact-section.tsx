import { personalProfile } from "@/data/profile";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, MessageSquareText } from "lucide-react";

interface ContactSectionProps {
  onStartConversation: () => void;
}

export function ContactSection({ onStartConversation }: ContactSectionProps) {
  const github = personalProfile.socialLinks.find((link) => link.platform === "GitHub");
  const linkedIn = personalProfile.socialLinks.find((link) => link.platform === "LinkedIn");

  return (
    <section id="contact" className="scroll-mt-24 bg-canvas">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="max-w-5xl">
          <p className="text-sm font-semibold text-accent-sky">A useful problem is a good place to start</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-text-primary sm:text-5xl lg:text-6xl">
            Start a Conversation
          </h2>
          <p className="mt-7 max-w-4xl text-2xl leading-9 text-text-primary sm:text-3xl sm:leading-10 lg:text-4xl lg:leading-[1.2]">
            Building a product, navigating a platform constraint, or turning an early idea into production software?
          </p>
          <p className="mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
            I’m interested in thoughtful product problems, complex systems, and conversations with people who care about building things well.
          </p>

          <button
            type="button"
            onClick={onStartConversation}
            className="mt-9 inline-flex min-h-12 items-center gap-3 border-b-2 border-accent-sky text-base font-semibold text-text-primary transition-colors hover:text-accent-sky"
          >
            <MessageSquareText className="h-5 w-5 text-accent-sky" aria-hidden="true" />
            Open the conversation
            <ArrowUpRight className="h-4 w-4 text-accent-sky" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border-interactive pt-6 lg:grid-cols-[minmax(18rem,1.8fr)_minmax(7rem,0.65fr)_minmax(7rem,0.65fr)_minmax(12rem,1fr)] lg:gap-x-10">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-mono text-xs text-text-muted">Direct email</p>
            <a
              href={`mailto:${personalProfile.email}`}
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-text-primary transition-colors hover:text-accent-sky"
            >
              <Mail className="h-4 w-4 text-accent-sky" aria-hidden="true" />
              {personalProfile.email}
            </a>
          </div>

          {linkedIn && (
            <div>
              <p className="font-mono text-xs text-text-muted">Professional</p>
              <a
                href={linkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
            </div>
          )}

          {github && (
            <div>
              <p className="font-mono text-xs text-text-muted">Code</p>
              <a
                href={github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
            </div>
          )}

          <div className="col-span-2 sm:col-span-1">
            <p className="font-mono text-xs text-text-muted">Based in</p>
            <p className="mt-2 inline-flex items-center gap-2 whitespace-nowrap text-sm text-text-secondary">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {personalProfile.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
