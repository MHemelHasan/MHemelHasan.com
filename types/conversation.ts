export type IntentKey = 
  | 'about_me'
  | 'social_ai'
  | 'support_ai'
  | 'ventures'
  | 'products'
  | 'pipeline'
  | 'journey'
  | 'contact'
  | 'unknown';

export interface PromptSuggestion {
  id: string;
  label: string;
  iconName: 'Sparkles' | 'Layers' | 'GitFork' | 'Send' | 'Bot' | 'Briefcase' | 'User' | 'Compass' | 'HelpCircle';
  targetIntent: IntentKey;
  sampleQuery: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'system';
  queryText?: string;
  intent: IntentKey;
  timestamp: number;
}
