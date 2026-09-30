export interface PipelineStage {
  id: string;
  stepNumber: string;
  title: string;
  shortDesc: string;
  questionAnswered: string;
  deliverable: string;
  keyMindset: string;
  commonRisksAvoided?: string;
  realContext?: string;
}

