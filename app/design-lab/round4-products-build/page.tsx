import type { Metadata } from "next";
import { Round4ProductsBuildExperiment } from "@/components/design-lab/round4-products-build/round4-products-build-experiment";

export const metadata: Metadata = {
  title: "Round 4 Products + Build | M Hemel Hasan",
  description: "An isolated Products Led & Shipped and How I Build design experiment.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Round4ProductsBuildPage() {
  return <Round4ProductsBuildExperiment />;
}
