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
        description: "Decoupling business logic from host runtime environments, third-party quirks, and defining clear failure handling.",
        technologies: ["System Topology", "Bounded Contexts", "Failure Handling", "Modular Monoliths"],
      },
      {
        title: "State Machine & Lifecycle Modeling",
        description: "Enforcing deterministic state transitions and pragmatic architectural contracts for orders, publications, and external syncs.",
        technologies: ["Finite State Machines", "Event Streams", "Audit Logs", "Pragmatic Architecture"],
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
        description: "Embedded merchant admin interfaces, OAuth 2.0 authentication flows, app bridges, webhooks, and commerce extensions.",
        technologies: ["Shopify App Bridge", "Shopify REST / GraphQL", "OAuth 2.0", "Webhooks"],
      },
      {
        title: "Webflow App Development",
        description: "Native Webflow Apps integrating visual canvas properties with cloud-based workflows, OAuth authorization, and platform constraints.",
        technologies: ["Webflow Apps API", "Designer Extensions", "OAuth 2.0", "Data Synchronization"],
      },
      {
        title: "WordPress & WooCommerce Engineering",
        description: "Modular plugins, custom post types, hook/filter architectures, REST API integrations, and checkout engines.",
        technologies: ["WordPress Plugin API", "WooCommerce Core", "Action & Filter Hooks", "REST APIs"],
      },
    ],
  },
  {
    id: "backend-apis",
    title: "Backend Systems, APIs & Queues",
    tagline: "Relational data modeling, PostgreSQL, resilient server-side services, and idempotent webhook processors.",
    description:
      "Engineering predictable backends with PostgreSQL, Prisma ORM, and resilient APIs that handle partner outages, retry loops, and concurrent traffic safely.",
    capabilities: [
      {
        title: "Relational Data Modeling & PostgreSQL",
        description: "Relational schema design with Prisma ORM, entity relationships, index strategy, complex query optimization, and full-text search.",
        technologies: ["PostgreSQL", "Prisma ORM", "Relational Schemas", "Indexing", "Full-Text Search", "Query Optimization"],
      },
      {
        title: "REST & GraphQL API Engineering",
        description: "Structured, predictable endpoints with strict payload validation, clean status contracts, and resilient failure handling.",
        technologies: ["Node.js", "TypeScript", "REST APIs", "GraphQL", "Payload Validation"],
      },
      {
        title: "Webhook Ingestion & Idempotent Processing",
        description: "Signature verification (HMAC), deduplication locks, retry backoffs, and fault-tolerant ingestion pipelines.",
        technologies: ["HMAC Validation", "Idempotent Consumers", "Retry Backoffs", "Error Boundaries"],
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
        technologies: ["Model API Integrations", "System Prompts", "Structured JSON Schemas", "Model Fallbacks"],
      },
      {
        title: "AI-Assisted Engineering Workflow",
        description: "Uses AI-assisted engineering workflows for research, implementation support, debugging, review, and faster iteration while retaining responsibility for architecture, validation, security, and production decisions.",
        technologies: ["AI-Assisted Workflows", "Agentic Iteration", "Implementation Verification", "Code Review"],
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
    tagline: "Production infrastructure ownership, container workflows, cloud deployments, and practical access controls.",
    description:
      "Hands-on server provisioning, CI/CD automation, containerized deployments on Kubernetes, and practical cloud networking when the product requires production ownership.",
    capabilities: [
      {
        title: "Linux, VPS & Cloud Server Environments",
        description: "Server configuration, Nginx reverse proxy setup, process supervision, DNS records, SSL/TLS, and production troubleshooting across AWS, Google Cloud, and Linux VPS hosts.",
        technologies: ["Linux / Ubuntu", "Nginx", "Systemd / PM2", "DNS & SSL", "AWS", "Google Cloud"],
      },
      {
        title: "CI/CD, Containers & Kubernetes Deployment",
        description: "Automated delivery pipelines with GitHub Actions, Docker containerization, secrets management, and hands-on application deployment on hosted Kubernetes environments.",
        technologies: ["GitHub Actions", "Docker", "Kubernetes", "Secrets Management", "Release Ownership"],
      },
      {
        title: "Practical Cloud Networking & Access Controls",
        description: "Foundational VPC concepts, subnets, firewall rules, IP/port restrictions, and client-to-server trust boundaries to secure production access.",
        technologies: ["VPC & Subnets", "Firewall Rules", "Port Restrictions", "Access Controls", "Production Hardening"],
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
