
import React from 'react';
import { 
  ShieldCheck, 
  BrainCircuit, 
  Activity, 
  Target, 
  Users, 
  Compass, 
  Gavel,
  Landmark
} from 'lucide-react';

export const INITIAL_QUESTIONS = [
  {
    id: 'q1',
    category: 'Conflict',
    text: "You're leading a team on a critical project with a tight deadline. A key member keeps making mistakes due to stress. How do you handle it?",
    options: [
      "I prioritize the project: I take over their tasks or reassign them immediately to ensure we don't fail.",
      "I prioritize the person: I sit them down, listen to their struggles, and try to find a way to support them while working together.",
      "I prioritize the system: I analyze why the mistakes are happening and implement a stricter review process for everyone.",
      "I wait and see: I hope they recognize their own mistakes and course-correct out of professional pride."
    ]
  },
  {
    id: 'q2',
    category: 'Values',
    text: "If you could only be remembered for one of these, which would you choose?",
    options: [
      "The immense impact and tangible success I achieved.",
      "The kindness and emotional support I offered to those around me.",
      "The unique, innovative ideas I introduced to the world.",
      "The unwavering integrity and principles I stood for, even when it was hard."
    ]
  },
  {
    id: 'q3',
    category: 'Stress',
    text: "You are given 24 hours of complete, forced isolation in a beautiful, well-equipped room. How do you feel after the first 12 hours?",
    options: [
      "Energized and peaceful; I finally have time to dive deep into my own thoughts and projects.",
      "A bit restless; I miss the stimulation of external input or conversation.",
      "Highly anxious; I start overthinking every mistake I've ever made.",
      "Bored; I feel like I'm wasting valuable time that could be spent doing something productive."
    ]
  }
];

export const HIGH_STAKES_QUESTIONS = [
  {
    id: 'hs1',
    category: 'Crisis Negotiation',
    text: "You are the primary negotiator in a high-stakes hostage situation. The perpetrator demands safe passage in exchange for half the hostages. Intel suggests they might kill everyone if you don't agree. What is your strategy?",
    options: [
      "Strategic Concession: I agree to the demand to save as many lives as possible immediately, accepting the risk of the perpetrator escaping.",
      "Hardline Stance: I refuse to negotiate with criminals as it sets a dangerous precedent, even if it risks immediate casualties.",
      "Deceptive Maneuver: I agree to the demands but prepare an elite tactical team to neutralize the threat the moment the transition begins.",
      "Information Gathering: I delay the decision indefinitely, asking for more proof of life and background on the perpetrator's motives to find a non-violent leverage point."
    ]
  },
  {
    id: 'hs2',
    category: 'Utilitarian Ethics',
    text: "A autonomous public transit system under your command faces an unavoidable crash. It must choose between hitting a group of 10 elderly people or swerving into a barrier that will definitely kill the 2 young passengers inside. What should the system do?",
    options: [
      "Minimize loss: Swerve to kill the 2 passengers to save the 10 people outside.",
      "Protect the duty: Maintain course; the vehicle's primary moral obligation is to the safety of its passengers.",
      "Randomized outcome: Program a coin-flip; life value shouldn't be calculated by numbers or age.",
      "Inaction: The system should not make a 'choice' to kill anyone; it should simply brake as hard as possible and let physics decide."
    ]
  },
  {
    id: 'hs3',
    category: 'National Security',
    text: "You have intelligence on a potential threat that could save hundreds of lives, but obtaining it requires using extreme coercive methods on a suspect that are against international laws. What is your call?",
    options: [
      "Utilitarian necessity: I authorize the methods. The moral burden of saving hundreds outweighs the law.",
      "Absolute integrity: I refuse. If we break our laws to save our lives, we have already lost our civilization.",
      "Plausible deniability: I allow a third party to handle it without my explicit written order, keeping my hands clean while getting the result.",
      "Innovative bypass: I demand my team finds a psychological or technological alternative, even if it takes more time we don't have."
    ]
  }
];

export const DOSSIER_SECTIONS = [
  { id: 'overview', label: 'Subject Overview', icon: <ShieldCheck size={20} /> },
  { id: 'architecture', label: 'Architecture', icon: <BrainCircuit size={20} /> },
  { id: 'behavior', label: 'Behavioral Patterns', icon: <Activity size={20} /> },
  { id: 'strengths', label: 'Strengths & Risks', icon: <Target size={20} /> },
  { id: 'ethics', label: 'Moral Reasoning', icon: <Gavel size={20} /> },
  { id: 'government', label: 'Govt. Suitability', icon: <Landmark size={20} /> },
  { id: 'personalities', label: 'Similar Figures', icon: <Users size={20} /> },
  { id: 'growth', label: 'Growth & Career', icon: <Compass size={20} /> }
];
