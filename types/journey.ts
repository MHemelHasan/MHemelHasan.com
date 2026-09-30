export interface JourneyMilestone {
  id: string;
  yearPeriod: string;
  stageName: string;
  roleTitle: string;
  organization?: string;
  context: string;
  evolutionShift: string;
  technologies: string[];
}
