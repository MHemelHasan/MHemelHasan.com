import { PipelineStage } from "@/types/pipeline";

export const pipelineStages: PipelineStage[] = [
  {
    id: "research",
    stepNumber: "01",
    title: "Research & Constraints",
    shortDesc: "Uncovering platform limits, API boundaries, and user workflows before writing code.",
    questionAnswered: "What are the hard platform limits, rate ceilings, and real user friction points?",
    deliverable: "Constraint Analysis & Requirements Map",
    keyMindset: "Understand the environment before building the foundation.",
    commonRisksAvoided: "Building features that violate marketplace policies, hit unalterable rate limits, or conflict with host platform lifecycle events.",
    realContext: "Crucial when engineering for platform app stores (Shopify, Webflow, WordPress) where undocumented constraints dictate architecture.",
  },
  {
    id: "product-rd",
    stepNumber: "02",
    title: "Product R&D",
    shortDesc: "Validating core mechanics through rapid feasibility spikes.",
    questionAnswered: "Can this idea execute reliably under actual production conditions?",
    deliverable: "Feasibility Prototypes & Interaction Flows",
    keyMindset: "Test the riskiest assumptions early.",
    commonRisksAvoided: "Committing weeks of team engineering to an approach that breaks under concurrent load or requires unsupported partner APIs.",
    realContext: "Spiking authentication handshakes, webhook payloads, and iframe isolation before committing to a full product build.",
  },
  {
    id: "architecture",
    stepNumber: "03",
    title: "System Architecture",
    shortDesc: "Defining modular boundaries, event flows, and reliable service structures.",
    questionAnswered: "How will data move securely, scale smoothly, and remain maintainable?",
    deliverable: "System Topology & Interface Contracts",
    keyMindset: "Clarity in boundaries prevents chaos at scale.",
    commonRisksAvoided: "Tightly coupled spaghetti architectures that collapse when any single external integration changes its data structure.",
    realContext: "Establishing clear separation between core business logic, third-party platform connectors, and client-facing interfaces.",
  },
  {
    id: "data-model",
    stepNumber: "04",
    title: "Data Modeling",
    shortDesc: "Structuring clean entity relationships, indexing strategies, and state transitions.",
    questionAnswered: "What is the source of truth, and how do states transition safely?",
    deliverable: "Schema Definitions & Migration Strategy",
    keyMindset: "Bad data models ruin good UI.",
    commonRisksAvoided: "Data corruption, orphaned records, race conditions during rapid state updates, and painful unmigratable database schemas.",
    realContext: "Designing state machine models where records transition strictly through explicit, auditable states.",
  },
  {
    id: "backend",
    stepNumber: "05",
    title: "Backend Engineering",
    shortDesc: "Building resilient APIs, background workers, secure auth layers, and peer code reviews.",
    questionAnswered: "Are endpoints predictable, idempotent, and secure under load?",
    deliverable: "Production API Endpoints, Auth Services & Review Standards",
    keyMindset: "Reliability is the truest feature.",
    commonRisksAvoided: "Duplicate background job executions, unreviewed regressions, timing attacks, and memory leaks under continuous processing.",
    realContext: "Implementing idempotent transaction handlers, rate limiters, token expiration refreshes, peer code review checks, and structured error logs.",
  },
  {
    id: "integrations",
    stepNumber: "06",
    title: "Ecosystem Integrations",
    shortDesc: "Handling webhooks, rate limits, OAuth flows, and client/server access security.",
    questionAnswered: "How do we handle partner downtime, webhook retries, and token refresh?",
    deliverable: "Idempotent Webhook Handlers, OAuth Connectors & Security Boundaries",
    keyMindset: "Assume external APIs will occasionally fail.",
    commonRisksAvoided: "Dropped transactions during partner downtime, cascading failure loops, and unverified webhook payloads exposing system internals.",
    realContext: "Validating HMAC signatures, managing secrets and token refresh securely, queuing incoming webhooks in fault-tolerant buffers, and gracefully backing off on HTTP 429s.",
  },
  {
    id: "interface",
    stepNumber: "07",
    title: "Interface Craft",
    shortDesc: "Crafting accessible, responsive UI with tactile micro-interactions and polish.",
    questionAnswered: "Does this feel fast, responsive, human, and immediately understandable?",
    deliverable: "Polished Component System & Responsive Views",
    keyMindset: "Great software feels alive and respectful of user attention.",
    commonRisksAvoided: "Clunky layout shifts, inaccessible color contrasts, slow rendering loops, and confusing user mental models.",
    realContext: "Building design-token driven components, full keyboard navigability, zero-flash theme persistence, and crisp visual feedback.",
  },
  {
    id: "launch",
    stepNumber: "08",
    title: "Launch & Iterate",
    shortDesc: "CI/CD release readiness, production deployment, telemetry, and operational troubleshooting.",
    questionAnswered: "How does the system perform in production, and how do we monitor, troubleshoot, and iterate?",
    deliverable: "CI/CD Deployment, Production Release & Observability Loop",
    keyMindset: "Production ownership continues long after deployment.",
    commonRisksAvoided: "Deployment regressions, unmonitored production outages, missing rollback plans, and slow operational recovery.",
    realContext: "Automating CI/CD pipelines, configuring environment secrets, monitoring health signals, troubleshooting production anomalies, and driving iterative patches.",
  },
];

interface PipelineStageHomepageCopy {
  appliedReality: string;
  riskReduced: string;
}

export const pipelineStageHomepageCopy: Record<string, PipelineStageHomepageCopy> = {
  research: {
    appliedReality: "Platform app constraints shape the architecture before implementation.",
    riskReduced: "Unsupported APIs, marketplace conflicts, and immovable rate limits.",
  },
  "product-rd": {
    appliedReality: "Authentication, webhook, and iframe spikes test feasibility early.",
    riskReduced: "Weeks committed to mechanics that fail under production conditions.",
  },
  architecture: {
    appliedReality: "Core logic stays separate from platform connectors and interfaces.",
    riskReduced: "Coupling that turns one external API change into a system-wide failure.",
  },
  "data-model": {
    appliedReality: "Explicit state transitions keep records auditable and migrations manageable.",
    riskReduced: "Corrupt data, race conditions, orphaned records, and rigid schemas.",
  },
  backend: {
    appliedReality: "Idempotent handlers, peer code reviews, rate limits, token refresh, and structured error boundaries.",
    riskReduced: "Duplicate jobs, security gaps, unreviewed regressions, and failures that surface only under load.",
  },
  integrations: {
    appliedReality: "Signed webhooks, secure OAuth token management, backoff, and queues protect access boundaries and absorb partner failures.",
    riskReduced: "Dropped events, retry loops, security boundary leaks, and unverified external payloads.",
  },
  interface: {
    appliedReality: "Tokens, keyboard access, responsive behavior, and clear feedback ship together.",
    riskReduced: "Layout shifts, inaccessible states, and interfaces users cannot trust.",
  },
  launch: {
    appliedReality: "CI/CD automation, production configuration, and telemetry turn live signals and operational troubleshooting into focused iteration.",
    riskReduced: "Deployment regressions, unmonitored production outages, and slow operational recovery.",
  },
};
