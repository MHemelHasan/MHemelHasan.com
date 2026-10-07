import { PersonalProfile } from "@/types/profile";

export const personalProfile: PersonalProfile = {
  name: "M Hemel Hasan",
  titles: ["Product Engineer", "Builder", "Founder"],
  roleTitle: "Product Engineer. Builder. Founder.",
  tagline: "I turn product ideas into production software — from research and architecture to backend systems, integrations, launch, and production operations.",
  location: "Dhaka, Bangladesh",
  email: "hello@mhemelhasan.com",
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/MHemelHasan",
      label: "github.com/MHemelHasan",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/MHemelHasan",
      label: "linkedin.com/in/MHemelHasan",
    },
  ],
  founderVenture: {
    name: "Social AI",
    role: "Founder / Lead Architect",
    statusLabel: "Private Beta",
  },
  themeficRole: {
    title: "Technical Lead – Platform Apps & Product Engineering",
    organization: "Themefic",
    summary:
      "Led technical architecture, product R&D, engineering delivery, and production infrastructure ownership across commercial platform products for Shopify, Webflow, and WordPress.",
  },
};

