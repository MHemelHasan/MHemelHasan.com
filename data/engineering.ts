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
      "Deep expertise across platform app stores, embedded runtime iframes, authentication handshakes, and marketplace requirements.",
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
    tagline: "High-converting shopping carts, bundle builders, and merchant monetization tools.",
    description:
      "Building checkout and cart systems where every millisecond of latency and UX friction directly affects merchant revenue.",
    capabilities: [
      {
        title: "Frictionless Checkout Engines",
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
    tagline: "Reliable Linux servers, reverse proxies, automated deployments, and AI-accelerated workflows.",
    description:
      "Hands-on server provisioning, environment configuration, SSL management, and high-velocity development pipelines.",
    capabilities: [
      {
        title: "Linux VPS & Server Management",
        description: "Operating system hardening, Nginx reverse proxy configuration, process supervisors, and SSL.",
        technologies: ["Ubuntu / Debian", "Nginx", "Systemd / PM2", "SSH & Firewall"],
      },
      {
        title: "Cloud & Deployment Workflows",
        description: "Automated Git deployment pipelines, AWS / Google Cloud infrastructure basics, and observability.",
        technologies: ["AWS", "Google Cloud", "Git / GitHub Actions", "AI Coding Agents"],
      },
    ],
  },
  {
    id: "interface-engineering",
    title: "Interface Craft & Modern Web",
    tagline: "Accessible, responsive web applications built with semantic tokens and zero-flash performance.",
    description:
      "Pairing aesthetic polish with technical precision: fluid responsiveness, keyboard navigation, and theme persistence.",
    capabilities: [
      {
        title: "Modern React & Next.js",
        description: "Next.js App Router, React Server / Client Components, and performance-optimized rendering.",
        technologies: ["Next.js App Router", "React 19", "TypeScript", "Tailwind CSS v4"],
      },
      {
        title: "Design Systems & Accessibility",
        description: "Semantic token architecture, dual-mode color systems, WCAG AA compliance, and tactile micro-interactions.",
        technologies: ["Semantic CSS Tokens", "WCAG AA", "Accessible Landmarks", "Focus States"],
      },
    ],
  },
];
