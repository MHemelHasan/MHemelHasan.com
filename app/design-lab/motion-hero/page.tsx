import type { Metadata } from "next";
import { MotionHeroExperiment } from "@/components/design-lab/motion-hero/motion-hero-experiment";

export const metadata: Metadata = {
  title: "Hero Motion System Experiment | M Hemel Hasan",
  description:
    "An isolated Hero motion experiment exploring micro-interactions, entrance choreography, scroll response, and selective 3D depth.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MotionHeroPage() {
  return <MotionHeroExperiment />;
}
