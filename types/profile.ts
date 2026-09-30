export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface PersonalProfile {
  name: string;
  titles: string[];
  roleTitle: string;
  tagline: string;
  location: string;
  email: string;
  socialLinks: SocialLink[];
  founderVenture: {
    name: string;
    role: string;
    statusLabel: string;
  };
  themeficRole?: {
    title: string;
    organization: string;
    summary: string;
  };
}

