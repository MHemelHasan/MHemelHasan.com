import type { Metadata } from "next";
import { ProductsPageExperience } from "@/components/products/products-page-experience";

export const metadata: Metadata = {
  title: "Products Led & Shipped | M Hemel Hasan",
  description:
    "Commercial Shopify, WordPress, and Webflow products engineered by M Hemel Hasan in company roles at Themefic.",
};

export default function ProductsPage() {
  return <ProductsPageExperience />;
}
