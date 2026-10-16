export type SubjectType = 'Vật lí' | 'Toán học' | 'Hóa học' | 'Sinh học' | 'STEM';
export type GradeType = 'Lớp 10' | 'Lớp 11' | 'Lớp 12';
export type EnglishLevel = 'A1' | 'A2' | 'B1' | 'B2';

export interface GlossaryItem {
  id: string;
  term: string;
  vietnamese: string;
  englishDefinition: string;
  ipa: string;
  partOfSpeech: string;
  exampleSentence: string;
  collocations: string[];
  commonMistakes: string;
  verified: boolean; // Teacher verification approval
  notes?: string;
}

export interface TeacherLanguageBank {
  instructionalPhrases: {
    category: string;
    vietnamesePurpose: string;
    englishPhrase: string;
    notes?: string;
  }[];
  questioningPrompts: {
    cognitiveLevel: 'Nhận biết' | 'Diễn giải' | 'Vận dụng';
    vietnamesePrompt: string;
    englishPrompt: string;
    followUp?: string;
  }[];
  activityInstructions: {
    activityType: string;
    vietnameseInstruction: string;
    englishInstruction: string;
  }[];
  studentScaffoldingFrames: {
    purpose: string;
    starterFrame: string;
    exampleCompletion: string;
  }[];
}

export type MatrixDimension = 'Language of Learning' | 'Language for Learning' | 'Language through Learning';
export type CognitiveLevel = 'Nhận biết' | 'Diễn giải' | 'Vận dụng';

export interface MatrixCell {
  dimension: MatrixDimension;
  cognitiveLevel: CognitiveLevel;
  dimensionLabelVi: string;
  cognitiveLabelVi: string;
  focusDescription: string;
  sampleItems: string[];
  emergingLanguage: string[]; // Teacher can append during/after class
}

export interface MatchingPair {
  id: string;
  term: string;
  definition: string;
  vietnameseHint: string;
}

export interface FillBlankItem {
  id: string;
  sentenceWithBlank: string;
  missingTerm: string;
  vietnameseHint: string;
  explanation: string;
}

export interface PairDiscussionActivity {
  knowledgeGoal: string;
  languageGoal: string;
  scenario: string;
  roleA: string;
  roleB: string;
  guidingQuestions: string[];
  suggestedVocabulary: string[];
  scaffoldingModelDialogue: {
    speaker: string;
    line: string;
  }[];
}

export interface ActivityGenerator {
  matching: {
    knowledgeGoal: string;
    languageGoal: string;
    instructions: string;
    pairs: MatchingPair[];
    answersSummary: string;
  };
  fillInBlank: {
    knowledgeGoal: string;
    languageGoal: string;
    instructions: string;
    items: FillBlankItem[];
    wordBank: string[];
  };
  pairDiscussion: PairDiscussionActivity;
}

export interface ClilProjectData {
  id: string;
  title: string;
  subject: SubjectType;
  grade: GradeType;
  topic: string;
  contentKnowledge: string;
  englishLevel: EnglishLevel;
  termCount: number;
  knowledgeGoal: string;
  languageGoal: string;
  isDemo: boolean;
  createdAt: string;
  lastModifiedAt: string;
  
  // 5 Modules
  glossary: GlossaryItem[];
  teacherLanguageBank: TeacherLanguageBank;
  clilMatrix: MatrixCell[];
  activities: ActivityGenerator;
}
