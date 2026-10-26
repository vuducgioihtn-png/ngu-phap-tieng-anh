export type CategoryId = 
  | 'tenses'
  | 'passive'
  | 'reported'
  | 'conditionals_wish'
  | 'comparison'
  | 'pronouns_nouns'
  | 'verb_forms'
  | 'clauses_phrases'
  | 'advanced_prepositions';

export interface Category {
  id: CategoryId;
  name: string;
  englishName: string;
  icon: string;
  description: string;
  color: string;
  badgeBg: string;
}

export interface ExerciseItem {
  id: string;
  type: 'fill' | 'choice' | 'rewrite';
  prompt: string;
  contextHint?: string;
  options?: string[]; // for 'choice'
  correctAnswer: string | string[]; // can accept alternate valid forms (e.g. didn't vs did not)
  explanation: string;
  ruleCitation?: string;
}

export interface VisualComponentType {
  type: 'timeline' | 'passive_transformer' | 'speech_shift' | 'conditionals_slider' | 'preposition_map' | 'comparison_scale' | 'mnemonic_card' | 'pronouns_visualizer' | 'this_that_lab' | 'nouns_visualizer' | 'present_simple_lab' | 'present_continuous_lab' | 'present_perfect_lab' | 'present_perfect_continuous_lab' | 'past_simple_lab' | 'past_continuous_lab' | 'past_perfect_lab';
  data?: Record<string, any>;
}

export interface GrammarTopic {
  id: number;
  slug: string;
  title: string;
  englishTitle: string;
  category: CategoryId;
  pageNumber: number; // page in the Lê Công Đức PDF
  difficulty: 'Cơ bản' | 'Trung cấp' | 'Nâng cao';
  summary: string;
  mnemonics?: string[]; // "Mẹo nhớ siêu tốc"
  formulas: {
    label: string;
    structure: string;
    notes?: string;
    example: {
      en: string;
      vi: string;
      breakdown?: { label: string; text: string; color: string }[];
    };
  }[];
  detailedTheory: {
    heading: string;
    content: string[];
    tips?: string;
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  visualType?: VisualComponentType['type'];
  exercises: ExerciseItem[];
}

export interface UserProgress {
  completedTopics: number[];
  topicScores: Record<number, { correct: number; total: number; percentage: number }>;
  bookmarkedTopics: number[];
  streakDays: number;
  lastStudyDate: string;
}
