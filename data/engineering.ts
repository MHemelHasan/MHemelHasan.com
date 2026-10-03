import { SystemDomain } from "@/types/engineering";

export const engineeringDomains: SystemDomain[] = [
  {
    id: "product-architecture",
    title: "Product Architecture & Systems Design",
    tagline: "Designing maintainable system boundaries, domain contracts, and deterministic state flows.",
    description:
      "Transforming complex product requirements into resilient service boundaries, clean state transitions, and auditable event flows.",
    capabilities: [
      {
        title: "Domain Decomposition & Service Boundaries",
        description: "Decoupling business logic from host runtime environments and third-party quirks.",
        technologies: ["System Topology", "Bounded Contexts", "Modular Monoliths"],
      },
      {
        title: "State Machine & Lifecycle Modeling",
        description: "Enforcing deterministic state transitions for orders, publications, and external syncs.",
        technologies: ["Finite State Machines", "Event Streams", "Audit Logs"],
      },
    ],
  },
  {
    id: "platform-ecosystems",
    title: "Platform Ecosystems & App Engineering",
    tagline: "Building native applications deeply integrated into major commercial platforms.",
    description:
      "Hands-on experience across platform app stores, embedded runtime iframes, authentication handshakes, and marketplace requirements.",
    capabilities: [
      {
        title: "Shopify App Development",
        description: "Embedded merchant admin interfaces, app bridges, webhooks, and commerce extensions.",
        technologies: ["Shopify App Bridge", "Shopify REST / GraphQL", "Webhooks"],
      },
      {
        title: "Webflow App Development",
        description: "Native Webflow Apps integrating visual canvas properties with cloud-based workflows.",
        technologies: ["Webflow Apps API", "Designer Extensions", "OAuth 2.0"],
      },
      {
        title: "WordPress & WooCommerce Engineering",
        description: "High-performance modular plugins, custom post types, hook/filter architectures, and checkout engines.",
        technologies: ["WordPress Plugin API", "WooCommerce Core", "Action & Filter Hooks"],
      },
    ],
  },
  {
    id: "backend-apis",
    title: "Backend Systems, APIs & Queues",
    tagline: "Resilient server-side services, idempotent webhook processors, and secure auth layers.",
    description:
      "Engineering predictable backends that handle partner outages, retry loops, and concurrent traffic safely.",
    capabilities: [
      {
        title: "RESTful API Engineering",
        description: "Structured, predictable endpoints with strict payload validation and clean status contracts.",
        technologies: ["Node.js", "Express", "PHP", "TypeScript"],
      },
      {
        title: "Webhook Ingestion & Idempotency",
        description: "Signature verification (HMAC), deduplication locks, and fault-tolerant ingestion pipelines.",
        technologies: ["HMAC Validation", "Idempotent Consumers", "Retry Backoffs"],
      },
    ],
  },
  {
    id: "ai-integration",
    title: "AI Product Integration & Orchestration",
    tagline: "Connecting foundation models with real-world research feeds and multi-channel publishing.",
    description:
      "Practical AI product engineering — grounding model responses, enforcing structured schemas, and orchestrating generation pipelines.",
    capabilities: [
      {
        title: "Multi-Model API Orchestration",
        description: "Integrating compatible AI model APIs with prompt templating, token budgeting, and fallback logic.",
        technologies: ["Model API Integrations", "System Prompts", "Structured JSON Schemas"],
      },
      {
        title: "Content Discovery & Research Feeds",
        description: "Aggregating RSS sources, monitoring competitor topics, and contextualizing research for generation.",
        technologies: ["RSS Parsing", "Content Scraping", "Topic Clustering"],
      },
    ],
  },
  {
    id: "commerce-systems",
    title: "Commerce Systems & Conversion Engineering",
    tagline: "Conversion-focused shopping carts, bundle builders, and merchant monetization tools.",
    description:
      "Building checkout and cart systems with attention to latency and UX friction across critical checkout and purchase flows.",
    capabilities: [
      {
        title: "Streamlined Checkout Flows",
        description: "Floating cart drawers, one-click checkout flows, and multi-step customer journeys.",
        technologies: ["WooCommerce Checkout", "Cart State Engines", "Drawer UI"],
      },
      {
        title: "Bundling & Tiered Discount Logic",
        description: "Dynamic pricing calculations, tiered quantity bundles, and cross-sell rules.",
        technologies: ["Dynamic Discount Algorithms", "Cart Recalculation", "Volume Tiers"],
      },
    ],
  },
  {
    id: "infrastructure-tooling",
    title: "Infrastructure, Deployment & Tooling",
    tagline: "Linux servers, reverse proxies, deployment workflows, and AI-assisted tooling.",
    description:
      "Hands-on server provisioning, environment configuration, SSL management, and development pipelines.",
    capabilities: [
      {
        title: "Linux VPS & Server Management",
        description: "Linux server configuration, Nginx reverse proxy setup, process supervision, and SSL management.",
        technologies: ["Ubuntu / Debian", "Nginx", "Systemd / PM2", "SSH & Firewall"],
      },
      {
        title: "Cloud & Deployment Workflows",
        description: "Git-based deployment pipelines, cloud-hosted service configuration, environment setup, and production monitoring.",
        technologies: ["Git / GitHub Actions", "Cloud-hosted Services", "Production Monitoring", "AI Coding Agents"],
      },
    ],
  },
  {
    id: "interface-engineering",
    title: "Interface Craft & Modern Web",
    tagline: "Accessible, responsive web applications built with semantic tokens and persistent theme behavior.",
    description:
      "Pairing aesthetic polish with technical precision: fluid responsiveness, keyboard navigation, and theme persistence.",
    capabilities: [
      {
        title: "Modern React & Next.js",
        description: "Next.js App Router, React Server / Client Components, and performance-conscious rendering.",
        technologies: ["Next.js App Router", "React 19", "TypeScript", "Tailwind CSS v4"],
      },
      {
        title: "Design Systems & Accessibility",
        description: "Semantic token architecture, dual-mode color systems, accessibility-aware implementation, and tactile micro-interactions.",
        technologies: ["Semantic CSS Tokens", "WCAG Guidance", "Accessible Landmarks", "Focus States"],
      },
    ],
  },
];
