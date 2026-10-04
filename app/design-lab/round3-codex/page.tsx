import type { Metadata } from "next";
import { Round3Experiment } from "@/components/design-lab/round3-codex/round3-experiment";

export const metadata: Metadata = {
  title: "Round 3 Design Experiment | M Hemel Hasan",
  description: "An isolated Hero and Ventures design experiment.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Round3CodexPage() {
  return <Round3Experiment />;
}
