export type ProductClassification = 
  | 'personal_venture'
  | 'future_venture'
  | 'company_product';

export type ProductStatus = 
  | 'private_beta'
  | 'in_development'
  | 'concept_exploring'
  | 'commercial_shipped';

export interface CompanyAttribution {
  companyName: string;
  companyUrl?: string;
  period?: string;
  role: string;
}

export interface ProductRecord {
  id: string; // e.g. "bundlefic-shopify", "bundlefic-webflow"
  slug: string;
  title: string;
  tagline: string;
  classification: ProductClassification;
  status: ProductStatus;
  statusLabel: string; // e.g. "Private Beta", "What I'm Building Next", "Commercial"
  attribution?: CompanyAttribution;
  ecosystem: 'shopify' | 'webflow' | 'wordpress' | 'ai_saas';
  ecosystemLabel: string;
  typeLabel: string; // e.g. "Shopify App", "WordPress Plugin", "Webflow App"
  isFeatured: boolean;
  summary: string;
  capabilities: string[];
  channels?: string[];
  publicUrl?: string | null;
  // Case Study Fields (Phase 1B Static Depth)
  problem?: string;
  contribution?: string;
  technicalScope?: string[];
  outcome?: string;
  workflowSteps?: {
    step: string;
    title: string;
    description: string;
  }[];
}

