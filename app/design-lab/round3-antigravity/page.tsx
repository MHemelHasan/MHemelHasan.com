import type { Metadata } from "next";
import { Round3AntigravityExperiment } from "@/components/design-lab/round3-antigravity/round3-antigravity-experiment";

export const metadata: Metadata = {
  title: "Round 3: Editorial Product Architect — M Hemel Hasan",
  description:
    "Round 3 Hero + Ventures opening design experiment demonstrating Product Engineer, Builder, and Founder positioning.",
};

export default function Round3AntigravityPage() {
  return <Round3AntigravityExperiment />;
}
