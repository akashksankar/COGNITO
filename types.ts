
export interface UserInfo {
  fullName: string;
  nickname?: string;
  ageRange: string;
  country: string;
  language: string;
}

export interface AssessmentResponse {
  questionId: string;
  question: string;
  answer: string;
  category: string;
}

export interface CognitiveFunction {
  function: string;
  score: number;
  description: string;
}

export interface BigFiveTrait {
  trait: string;
  score: number;
  description: string;
}

export interface SimilarPersonality {
  name: string;
  category: 'Historical' | 'World Leader' | 'Indian' | 'Thinker';
  alignmentReason: string;
  imageUrl: string;
}

export interface MoralReasoning {
  framework: 'Utilitarian' | 'Deontological' | 'Virtue-based' | 'Hybrid';
  analysis: string;
  riskAppetite: string;
  emotionalControl: string;
}

export interface ServiceSuitability {
  department: string;
  why: string;
  challenges: string;
  suggestedExams: string[];
  roleInclination: string;
}

export interface PsychologicalDossier {
  subjectOverview: {
    codename: string;
    summary: string;
  };
  architecture: {
    mbtiType: string;
    mbtiDescription: string;
    cognitiveFunctions: CognitiveFunction[];
    bigFive: BigFiveTrait[];
    emotionalIntelligence: string;
  };
  behavioralPatterns: {
    underPressure: string;
    inRelationships: string;
    atWork: string;
    duringConflict: string;
    duringIsolation: string;
  };
  strengths: string[];
  blindSpots: string[];
  stressTriggers: string[];
  recoveryPatterns: string;
  similarPersonalities: SimilarPersonality[];
  moralReasoning: MoralReasoning;
  publicServiceSuitability: ServiceSuitability[];
  growthPath: {
    generalAdvice: string;
    mbtiSpecificPath: string;
    maturityMilestones: string[];
  };
  careerGuidance: {
    idealRoles: string[];
    avoidRoles: string[];
    thrivingEnvironment: string;
  };
}

export enum AppState {
  ONBOARDING = 'ONBOARDING',
  ASSESSMENT_PHASE_1 = 'ASSESSMENT_PHASE_1',
  ASSESSMENT_PHASE_2 = 'ASSESSMENT_PHASE_2',
  ANALYZING = 'ANALYZING',
  DOSSIER = 'DOSSIER',
  WELLNESS = 'WELLNESS'
}
