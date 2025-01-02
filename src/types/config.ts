export interface TestConfig {
  name: string;
  duration: number;
  useCustomParagraph: boolean;
  customParagraph: string;
  customParagraphTitle: string;
  allowBackspace: boolean;
  enableFeedback: boolean;
  examMode: boolean;
  fontSize: number;
  selectedParagraphIndex: number;
}

// Define the Exercise type
export interface Exercise {
  lesson: number;
  keys: string[];
  description: string;
  exercise: string;
}
