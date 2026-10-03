import Image from "next/image";
import { MapPin } from "lucide-react";
import { personalProfile } from "@/data/profile";
import { SynthesisConversationEntry } from "./synthesis-conversation-entry";

const buildStages = ["Research", "Architecture", "Systems", "Integrations", "Launch"];

export function SynthesisHero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-7xl px-5 pb-0 pt-8 sm:px-8 sm:pb-10 sm:pt-12 lg:px-12 lg:pb-8">
        <div className="grid grid-cols-[minmax(0,1fr)_132px] items-start gap-x-4 gap-y-6 sm:grid-cols-[minmax(0,1fr)_220px] sm:gap-x-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-7">
          <div className="min-w-0 lg:col-span-8">
            <p className="text-sm font-medium leading-5 text-brand-primary sm:text-base">{personalProfile.roleTitle}</p>
            <h1 className="mt-4 max-w-4xl text-[3rem] font-semibold leading-[0.95] tracking-normal text-text-primary sm:mt-5 sm:text-[4.7rem] lg:text-[5.7rem]">
              {personalProfile.name}
            </h1>
          </div>

          <figure className="relative col-start-2 row-start-1 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:justify-self-end">
            <div className="relative ml-auto aspect-[4/5] w-full max-w-[132px] overflow-hidden border-l-4 border-brand-primary sm:max-w-[220px] lg:max-w-[310px]">
              <Image
                src="/assets/avatar.jpg"
                alt="M Hemel Hasan"
                fill
                priority
                sizes="(max-width: 639px) 132px, (max-width: 1023px) 220px, 310px"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="ml-auto mt-4 hidden max-w-[220px] items-start justify-between gap-5 border-t border-border-subtle pt-3 text-sm sm:flex lg:max-w-[310px]">
              <span className="text-text-primary">{personalProfile.founderVenture.role}</span>
              <span className="text-right text-text-secondary">
                {personalProfile.founderVenture.name}
                <br />
                {personalProfile.founderVenture.statusLabel}
              </span>
            </figcaption>
          </figure>

          <div className="col-span-2 lg:col-span-8">
            <p className="max-w-3xl text-lg leading-7 text-text-secondary sm:text-2xl sm:leading-9">
              {personalProfile.tagline}
            </p>

            <div className="mt-6 border-y border-border-subtle py-3 sm:mt-8">
              <div className="grid grid-cols-2 gap-y-3 sm:grid-cols-5">
                {buildStages.map((stage, index) => (
                  <div key={stage} className="flex items-center gap-2 text-xs font-medium text-text-secondary">
                    <span className="font-mono text-[10px] text-brand-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm text-text-secondary sm:mt-8 lg:mt-10">
          <MapPin className="h-4 w-4 text-brand-primary" aria-hidden="true" />
          <span>{personalProfile.location}</span>
        </div>

        <div className="mt-4 lg:ml-[8.333%] lg:w-[83.333%]">
          <SynthesisConversationEntry />
        </div>
      </div>
    </section>
  );
}
