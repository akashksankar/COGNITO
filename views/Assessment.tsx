
import React, { useState } from 'react';
import { INITIAL_QUESTIONS, HIGH_STAKES_QUESTIONS } from '../constants';
import { AssessmentResponse } from '../types';
import { ChevronRight, ArrowLeft, AlertCircle, ShieldAlert } from 'lucide-react';

interface AssessmentProps {
  phase: 1 | 2;
  onPhaseComplete: (responses: AssessmentResponse[]) => void;
}

export const Assessment: React.FC<AssessmentProps> = ({ phase, onPhaseComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(phase === 2);

  const currentQuestions = phase === 1 ? INITIAL_QUESTIONS : HIGH_STAKES_QUESTIONS;
  const currentQuestion = currentQuestions[currentIndex];
  const progress = ((currentIndex + 1) / currentQuestions.length) * 100;

  const handleNext = () => {
    if (!selectedOption) return;

    const newResponse = {
      questionId: currentQuestion.id,
      question: currentQuestion.text,
      answer: selectedOption,
      category: currentQuestion.category
    };

    const newResponses = [...responses, newResponse];
    
    if (currentIndex < currentQuestions.length - 1) {
      setResponses(newResponses);
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      onPhaseComplete(newResponses);
    }
  };

  if (showWarning && phase === 2) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in duration-500">
        <div className="w-full max-w-2xl glass p-10 rounded-3xl border border-rose-500/30 text-center">
          <div className="w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="text-rose-500" size={40} />
          </div>
          <h2 className="text-3xl font-bold poppins mb-4">High-Pressure Simulation</h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Phase 2 involves high-stakes decision-making and ethical reasoning scenarios. These simulations involve crisis leadership, negotiations, and moral trade-offs. 
            <br/><br/>
            <strong>Note:</strong> These are hypothetical exercises designed to analyze your strategic detachment and moral framework. You may skip this phase if you feel uncomfortable.
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => onPhaseComplete([])}
              className="px-8 py-4 glass hover:bg-white/10 rounded-2xl font-bold text-white/50 transition-all"
            >
              Skip Phase 2
            </button>
            <button 
              onClick={() => setShowWarning(false)}
              className="px-8 py-4 bg-rose-600 hover:bg-rose-500 rounded-2xl font-bold text-white shadow-lg shadow-rose-500/20 transition-all"
            >
              Enter Simulation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-3xl glass p-8 md:p-12 rounded-3xl shadow-2xl animate-in fade-in duration-500 relative overflow-hidden">
        {phase === 2 && (
          <div className="absolute top-0 right-0 px-6 py-2 bg-rose-600/20 border-l border-b border-rose-500/30 rounded-bl-2xl">
            <span className="text-[10px] font-black tracking-widest text-rose-400 uppercase">Strategic Simulation</span>
          </div>
        )}
        
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/5 rounded-full mb-12 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out ${phase === 1 ? 'bg-indigo-500' : 'bg-rose-500'}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="mb-10">
          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full border mb-4 inline-block ${
            phase === 1 ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
          }`}>
            {currentQuestion.category}
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold leading-snug poppins">
            {currentQuestion.text}
          </h2>
        </div>

        <div className="space-y-4 mb-10">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOption(option)}
              className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                selectedOption === option 
                ? (phase === 1 ? 'bg-indigo-600/20 border-indigo-500 shadow-indigo-500/10' : 'bg-rose-600/20 border-rose-500 shadow-rose-500/10') + ' text-white shadow-lg scale-[1.01]' 
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex gap-4 items-center">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  selectedOption === option ? (phase === 1 ? 'bg-indigo-500' : 'bg-rose-500') : 'bg-white/10 text-white/40'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 text-sm md:text-base">{option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
              currentIndex === 0 ? 'opacity-0' : 'hover:bg-white/5 text-white/50'
            }`}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
              !selectedOption ? 'opacity-50 cursor-not-allowed' : (phase === 1 ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20' : 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/20')
            } shadow-lg`}
          >
            {currentIndex === currentQuestions.length - 1 ? (phase === 1 ? 'Next Phase' : 'Final Analysis') : 'Confirm Decision'}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="mt-8 text-white/30 text-sm flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full animate-pulse ${phase === 1 ? 'bg-indigo-500' : 'bg-rose-500'}`}></div>
        {phase === 1 ? 'Analyzing Cognitive Anchors' : 'Recording Ethical Response Vector'}
      </div>
    </div>
  );
};
