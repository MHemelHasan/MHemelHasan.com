import { ProductRecord } from "@/types/product";

export const themeficProducts: ProductRecord[] = [
  // 3 Featured Products (Cross-Platform Breadth: Shopify, WordPress, Webflow)
  {
    id: "bundlefic-shopify",
    slug: "bundlefic-shopify",
    title: "Bundlefic",
    tagline: "Dynamic product bundling and smart cart merchandising for Shopify merchants.",
    classification: "company_product",
    status: "commercial_shipped",
    statusLabel: "Commercial Release",
    attribution: {
      companyName: "Themefic",
      companyUrl: "https://themefic.com",
      role: "Product Engineering",
    },
    ecosystem: "shopify",
    ecosystemLabel: "Shopify Ecosystem",
    typeLabel: "Shopify App",
    isFeatured: true,
    summary:
      "A merchant-focused Shopify app designed to drive higher average order value through customizable bundle offers, tier discounts, and frictionless checkout integration.",
    capabilities: [
      "Custom bundle offer creation and volume tier discounts",
      "Merchant configuration dashboard and rule management",
      "Seamless theme cart and checkout integration",
      "Performance-conscious script delivery for storefront speed",
    ],
    problem:
      "Merchants need to increase average order value without complex discounting setups or invasive theme modifications that slow down storefront loading speeds.",
    contribution:
      "Engineered the core product bundle mechanics, merchant configuration controls, and theme-independent storefront cart integration.",
    technicalScope: [
      "Shopify ecosystem application architecture",
      "Merchant administration and discount rule engines",
      "Storefront cart integration and cross-theme compatibility",
      "High-performance client asset delivery",
    ],
    outcome: "Commercial product shipped at Themefic for Shopify merchants.",
  },
  {
    id: "instantio-wp",
    slug: "instantio-wp",
    title: "Instantio",
    tagline: "High-converting multi-step and quick checkout system for WooCommerce.",
    classification: "company_product",
    status: "commercial_shipped",
    statusLabel: "Commercial Release",
    attribution: {
      companyName: "Themefic",
      companyUrl: "https://themefic.com",
      role: "WordPress Plugin Engineer",
    },
    ecosystem: "wordpress",
    ecosystemLabel: "WordPress Ecosystem",
    typeLabel: "WordPress Plugin",
    isFeatured: true,
    summary:
      "A fast, conversion-optimized checkout plugin for WooCommerce that eliminates cart abandonment through a streamlined slide-in cart and one-page checkout.",
    capabilities: [
      "Slide-in floating cart and multi-step popup checkout",
      "WooCommerce integration and standard hook events",
      "Modular front-end asset loading for speed optimization",
      "Extensive WooCommerce theme compatibility",
    ],
    problem:
      "Default WooCommerce multi-page checkout flows introduce high friction and cart abandonment, especially for mobile and impulse buyers.",
    contribution:
      "Led core plugin engineering, interactive cart flow development, modular asset bundling for performance, and WooCommerce compatibility.",
    technicalScope: [
      "WordPress plugin and WooCommerce hook architecture",
      "Modular CSS/JS loading to minimize page weight",
      "Interactive slide-in cart and multi-step checkout state management",
      "Cross-theme styling resilience and accessibility",
    ],
    outcome: "Commercial WordPress plugin shipped and maintained at Themefic.",
  },
  {
    id: "connectfic-webflow",
    slug: "connectfic-webflow",
    title: "Connectfic",
    tagline: "Connecting Webflow sites with external product feeds and workflow automations.",
    classification: "company_product",
    status: "commercial_shipped",
    statusLabel: "Commercial Release",
    attribution: {
      companyName: "Themefic",
      companyUrl: "https://themefic.com",
      role: "Platform Product Engineer",
    },
    ecosystem: "webflow",
    ecosystemLabel: "Webflow Ecosystem",
    typeLabel: "Webflow App",
    isFeatured: true,
    summary:
      "A dedicated Webflow application enabling creators and marketing teams to connect their Webflow Designer projects directly with dynamic external workflows and data feeds.",
    capabilities: [
      "In-designer app interface for Webflow creators",
      "External data feed connection and content synchronization",
      "Intuitive visual mapping controls within Webflow",
      "Lightweight execution inside the Webflow Designer",
    ],
    problem:
      "Webflow creators needed a frictionless way to synchronize dynamic external product data and content into their visual designer projects.",
    contribution:
      "Engineered the Webflow app integration, designer user interface, and external data synchronization mechanisms.",
    technicalScope: [
      "Webflow platform app development",
      "External data source connection and synchronization",
      "In-designer creator experience and responsive feedback",
      "Clean configuration state persistence",
    ],
    outcome: "Commercial Webflow app shipped at Themefic.",
  },

  // 3 Additional / Compact Products
  {
    id: "quotezic-shopify",
    slug: "quotezic-shopify",
    title: "Quotezic",
    tagline: "Custom B2B quotation, hide price, and price-on-request workflow engine.",
    classification: "company_product",
    status: "commercial_shipped",
    statusLabel: "Commercial Release",
    attribution: {
      companyName: "Themefic",
      companyUrl: "https://themefic.com",
      role: "Product Engineering",
    },
    ecosystem: "shopify",
    ecosystemLabel: "Shopify Ecosystem",
    typeLabel: "Shopify App",
    isFeatured: false,
    summary:
      "Empowers merchants to offer flexible Request-a-Quote workflows, custom pricing proposals, and automated email quote communications.",
    capabilities: [
      "Request-a-Quote button injection across collections and product pages",
      "Backend quote manager with PDF generation and custom pricing",
      "Automated email notifications for buyers and merchants",
    ],
    outcome: "Commercial product shipped at Themefic.",
  },
  {
    id: "ultimate-addons-wp",
    slug: "ultimate-addons-wp",
    title: "Ultimate Addons",
    tagline: "Performance-focused extensible visual block library for WordPress creators.",
    classification: "company_product",
    status: "commercial_shipped",
    statusLabel: "Commercial Release",
    attribution: {
      companyName: "Themefic",
      companyUrl: "https://themefic.com",
      role: "WordPress Plugin Engineer",
    },
    ecosystem: "wordpress",
    ecosystemLabel: "WordPress Ecosystem",
    typeLabel: "WordPress Plugin",
    isFeatured: false,
    summary:
      "A suite of modular, lightweight custom blocks and widgets engineered for WordPress site builders prioritizing loading speed and visual flexibility.",
    capabilities: [
      "Modular asset loading (loads CSS/JS strictly for blocks in use)",
      "Accessible block markup conforming to modern HTML5 standards",
      "Customizable controls with instant visual preview",
    ],
    outcome: "Commercial product shipped at Themefic.",
  },
  {
    id: "bundlefic-webflow",
    slug: "bundlefic-webflow",
    title: "Bundlefic (Webflow)",
    tagline: "Product bundling and merchandising tool built specifically for Webflow E-commerce.",
    classification: "company_product",
    status: "commercial_shipped",
    statusLabel: "Commercial Release",
    attribution: {
      companyName: "Themefic",
      companyUrl: "https://themefic.com",
      role: "Platform Product Engineer",
    },
    ecosystem: "webflow",
    ecosystemLabel: "Webflow Ecosystem",
    typeLabel: "Webflow App",
    isFeatured: false,
    summary:
      "A distinct Webflow-native product enabling e-commerce stores on Webflow to implement bundle deals, cross-sells, and tailored collection sets.",
    capabilities: [
      "Native Webflow e-commerce integration",
      "Custom bundle layouts and dynamic pricing calculators",
      "Zero-dependency front-end script for maximum performance",
    ],
    outcome: "Commercial product shipped at Themefic.",
  },
];
