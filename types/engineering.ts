export interface CapabilityItem {
  title: string;
  description: string;
  technologies: string[];
}

export interface SystemDomain {
  id: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: CapabilityItem[];
}
