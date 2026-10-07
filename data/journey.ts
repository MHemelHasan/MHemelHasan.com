import { JourneyMilestone } from "@/types/journey";

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "theme-development",
    yearPeriod: "2015 – 2017",
    stageName: "Foundation & Web Standards",
    roleTitle: "WordPress Theme & Frontend Developer",
    context:
      "Started professional engineering journey mastering semantic HTML, CSS layout systems, responsive design, and WordPress theme architecture.",
    evolutionShift: "From styling templates to architecting custom, responsive theme frameworks from scratch.",
    technologies: ["PHP", "WordPress Theme API", "JavaScript", "CSS3 / Sass", "Responsive Design"],
  },
  {
    id: "plugin-engineering",
    yearPeriod: "2017 – 2019",
    stageName: "System Logic & E-Commerce",
    roleTitle: "WordPress Plugin Engineer",
    context:
      "Transitioned deep into backend plugin architecture, custom database schemas, hook/filter ecosystems, and WooCommerce checkout customizations.",
    evolutionShift: "Moving from visual presentation to complex business logic, database migrations, and transactional reliability.",
    technologies: ["WordPress Plugin API", "WooCommerce Core", "MySQL", "Action & Filter Hooks", "REST API"],
  },
  {
    id: "fullstack-react",
    yearPeriod: "2019 – 2021",
    stageName: "Modern JavaScript & Full-Stack",
    roleTitle: "Full-Stack Software Engineer",
    context:
      "Expanded capability into modern decoupled applications, building with React, Node.js, Express, and structured RESTful services.",
    evolutionShift: "Bridging CMS backend foundations with high-velocity, component-driven reactive web applications.",
    technologies: ["React", "Node.js", "Express", "RESTful Architecture", "Modern JavaScript (ES6+)"],
  },
  {
    id: "platform-apps",
    yearPeriod: "2021 – 2023",
    stageName: "Platform Ecosystem Expansion",
    roleTitle: "Platform Applications Engineer",
    context:
      "Engineered multi-platform applications across Shopify App Store, Webflow Marketplace, and cloud service integrations.",
    evolutionShift: "Mastering third-party platform runtimes, OAuth 2.0 auth flows, embedded iframes, and webhook resilience.",
    technologies: ["Shopify App Bridge", "Webflow Apps API", "OAuth 2.0", "Webhooks", "Embedded UI"],
  },
  {
    id: "technical-lead",
    yearPeriod: "Jun 2022 – Oct 2026",
    stageName: "Technical Leadership & Product R&D",
    roleTitle: "Technical Lead – Platform Apps & Product Engineering",
    organization: "Themefic",
    context:
      "Led technical architecture, product R&D, engineering standards, and platform delivery across Themefic's commercial product portfolio (Shopify, Webflow, WordPress), taking release and production infrastructure ownership.",
    evolutionShift: "Expanding from product engineering into architecture, code quality standards, team guidance, and production infrastructure ownership across commercial products.",
    technologies: ["Product R&D", "Cross-Platform Architecture", "Code Reviews", "Docker / Kubernetes", "CI/CD & VPS"],
  },
  {
    id: "founder-building",
    yearPeriod: "Present & Forward",
    stageName: "Venture Conception & AI Architecture",
    roleTitle: "Founder & Lead Architect",
    organization: "Social AI",
    context:
      "Designing and building proprietary AI software platforms — focusing on research automation, multi-channel social publishing, and brand voice intelligence in Private Beta.",
    evolutionShift: "Full-cycle venture building: from product vision and data flow architecture to multi-model AI orchestration and deployment.",
    technologies: ["PostgreSQL / Prisma", "AI Model APIs", "Next.js", "TypeScript", "Venture Architecture"],
  },
];
