
import { GoogleGenAI, Type } from "@google/genai";
import { UserInfo, AssessmentResponse, PsychologicalDossier } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const DOSSIER_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    subjectOverview: {
      type: Type.OBJECT,
      properties: {
        codename: { type: Type.STRING },
        summary: { type: Type.STRING }
      },
      required: ["codename", "summary"]
    },
    architecture: {
      type: Type.OBJECT,
      properties: {
        mbtiType: { type: Type.STRING },
        mbtiDescription: { type: Type.STRING },
        cognitiveFunctions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              function: { type: Type.STRING },
              score: { type: Type.NUMBER },
              description: { type: Type.STRING }
            },
            required: ["function", "score", "description"]
          }
        },
        bigFive: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              trait: { type: Type.STRING },
              score: { type: Type.NUMBER },
              description: { type: Type.STRING }
            },
            required: ["trait", "score", "description"]
          }
        },
        emotionalIntelligence: { type: Type.STRING }
      },
      required: ["mbtiType", "mbtiDescription", "cognitiveFunctions", "bigFive", "emotionalIntelligence"]
    },
    behavioralPatterns: {
      type: Type.OBJECT,
      properties: {
        underPressure: { type: Type.STRING },
        inRelationships: { type: Type.STRING },
        atWork: { type: Type.STRING },
        duringConflict: { type: Type.STRING },
        duringIsolation: { type: Type.STRING }
      },
      required: ["underPressure", "inRelationships", "atWork", "duringConflict", "duringIsolation"]
    },
    moralReasoning: {
      type: Type.OBJECT,
      properties: {
        framework: { type: Type.STRING },
        analysis: { type: Type.STRING },
        riskAppetite: { type: Type.STRING },
        emotionalControl: { type: Type.STRING }
      },
      required: ["framework", "analysis", "riskAppetite", "emotionalControl"]
    },
    publicServiceSuitability: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          department: { type: Type.STRING },
          why: { type: Type.STRING },
          challenges: { type: Type.STRING },
          suggestedExams: { type: Type.ARRAY, items: { type: Type.STRING } },
          roleInclination: { type: Type.STRING }
        },
        required: ["department", "why", "challenges", "suggestedExams", "roleInclination"]
      }
    },
    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
    blindSpots: { type: Type.ARRAY, items: { type: Type.STRING } },
    stressTriggers: { type: Type.ARRAY, items: { type: Type.STRING } },
    recoveryPatterns: { type: Type.STRING },
    similarPersonalities: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          category: { type: Type.STRING },
          alignmentReason: { type: Type.STRING },
          imageUrl: { type: Type.STRING }
        },
        required: ["name", "category", "alignmentReason", "imageUrl"]
      }
    },
    growthPath: {
      type: Type.OBJECT,
      properties: {
        generalAdvice: { type: Type.STRING },
        mbtiSpecificPath: { type: Type.STRING },
        maturityMilestones: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["generalAdvice", "mbtiSpecificPath", "maturityMilestones"]
    },
    careerGuidance: {
      type: Type.OBJECT,
      properties: {
        idealRoles: { type: Type.ARRAY, items: { type: Type.STRING } },
        avoidRoles: { type: Type.ARRAY, items: { type: Type.STRING } },
        thrivingEnvironment: { type: Type.STRING }
      },
      required: ["idealRoles", "avoidRoles", "thrivingEnvironment"]
    }
  },
  required: [
    "subjectOverview", "architecture", "behavioralPatterns", "moralReasoning", 
    "publicServiceSuitability", "strengths", "blindSpots", "stressTriggers", 
    "recoveryPatterns", "similarPersonalities", "growthPath", "careerGuidance"
  ]
};

export async function analyzePsychProfile(
  userInfo: UserInfo,
  responses: AssessmentResponse[]
): Promise<PsychologicalDossier> {
  const prompt = `
    Analyze the following psychological profile of a person. 
    User Info: ${JSON.stringify(userInfo)}
    Combined Responses (including Phase 1 Personality and Phase 2 High-Stakes scenarios): ${JSON.stringify(responses)}

    Task: Create a deep, clinical yet empathetic psychological dossier.
    
    1. MBTI analysis (Cognitive functions Ni, Te, etc.).
    2. Big Five analysis.
    3. Moral Reasoning Profile: Determine if Utilitarian, Deontological, etc., based on high-stakes responses.
    4. Indian Government/Public Service Suitability: 
       Specifically map them to roles like IAS, IPS, IFS, IB/R&AW (conceptual), Regulatory (RBI/SEBI), etc.
       Include suggested exams (UPSC CSE, SSC, etc.) and role level (Field vs Policy).
    
    For "similarPersonalities":
    - Provide at least 4 figures (1 Historical, 1 World Leader, 1 Indian Personality, 1 Artist/Thinker).
    - Use "Shares notable psychological traits with..." framing.
    - IMPORTANT: Retrieve/Provide ONLY Wikipedia image URLs or Wikimedia Commons URLs. If you don't know the direct URL, generate a logical Wikimedia link format like: https://commons.wikimedia.org/wiki/Special:FilePath/[Filename]
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: DOSSIER_SCHEMA,
    },
  });

  return JSON.parse(response.text);
}

export async function chatWithCounselor(
  dossier: PsychologicalDossier,
  chatHistory: { role: 'user' | 'model'; parts: { text: string }[] }[],
  userMessage: string
) {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `You are Cognito AI, a professional empathetic counselor and strategic analyst. 
      You have the user's psychological profile, including their moral reasoning (${dossier.moralReasoning.framework}) 
      and public service suitability. 
      Your goal is to provide non-medical emotional support and strategic mentorship. 
      Do not provide medical diagnoses. Frame your guidance through their specific cognitive architecture.`
    }
  });

  const result = await chat.sendMessage({ message: userMessage });
  return result.text;
}
