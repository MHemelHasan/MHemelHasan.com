import type { Metadata } from "next";
import { SynthesisExperiment } from "@/components/design-lab/round3-synthesis/synthesis-experiment";

export const metadata: Metadata = {
  title: "Round 3 Synthesis | M Hemel Hasan",
  description: "An isolated Hero and Ventures synthesis candidate.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Round3SynthesisPage() {
  return <SynthesisExperiment />;
}
