
import React, { useState, useEffect, useRef } from 'react';
import { AppState, UserInfo, AssessmentResponse, PsychologicalDossier } from './types';
import { Onboarding } from './views/Onboarding';
import { Assessment } from './views/Assessment';
import { Dossier } from './views/Dossier';
import { WellnessHub } from './views/WellnessHub';
import { Layout } from './components/Layout';
import { analyzePsychProfile } from './services/gemini';
import { storage } from './services/storage';
import { Sparkles, BrainCircuit, Activity, Save, CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.ONBOARDING);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [dossier, setDossier] = useState<PsychologicalDossier | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('Decoding neural pathways...');
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const isFirstRun = useRef(true);

  // Load state on mount
  useEffect(() => {
    const loadSaved = async () => {
      try {
        const saved = await storage.load();
        if (saved) {
          setUserInfo(saved.userInfo);
          setResponses(saved.responses);
          setDossier(saved.dossier);
          
          if (saved.dossier) {
            setState(AppState.DOSSIER);
          } else if (saved.responses.length > 0) {
            // Determine phase based on responses
            const phase1Count = 3; // From INITIAL_QUESTIONS
            if (saved.responses.length < phase1Count) {
              setState(AppState.ASSESSMENT_PHASE_1);
            } else {
              setState(AppState.ASSESSMENT_PHASE_2);
            }
          } else if (saved.userInfo) {
            setState(AppState.ASSESSMENT_PHASE_1);
          }
        }
      } catch (e) {
        console.error("Storage load failed", e);
      }
    };
    loadSaved();
  }, []);

  // Auto-save whenever critical data changes
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    
    const save = async () => {
      setIsSaving(true);
      await storage.save({
        userInfo,
        responses,
        dossier,
        lastUpdated: Date.now()
      });
      setIsSaving(false);
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 2000);
    };

    const timer = setTimeout(save, 500); // Debounce
    return () => clearTimeout(timer);
  }, [userInfo, responses, dossier]);

  const handleOnboardingComplete = (info: UserInfo) => {
    setUserInfo(info);
    setState(AppState.ASSESSMENT_PHASE_1);
  };

  const handlePhase1Complete = (resp: AssessmentResponse[]) => {
    setResponses(prev => [...prev, ...resp]);
    setState(AppState.ASSESSMENT_PHASE_2);
  };

  const handlePhase2Complete = async (phase2Resp: AssessmentResponse[]) => {
    const combinedResponses = [...responses, ...phase2Resp];
    setResponses(combinedResponses);
    setState(AppState.ANALYZING);

    const messages = [
      "Identifying dominant cognitive functions...",
      "Mapping Big Five trait variances...",
      "Synthesizing high-stakes scenarios...",
      "Calculating moral reasoning framework...",
      "Evaluating government service suitability...",
      "Finalizing subject dossier..."
    ];

    let i = 0;
    const interval = setInterval(() => {
      setLoadingMessage(messages[i % messages.length]);
      i++;
    }, 2500);

    try {
      if (userInfo) {
        const result = await analyzePsychProfile(userInfo, combinedResponses);
        setDossier(result);
        setState(AppState.DOSSIER);
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("The cognitive engine encountered an error. Please check your API key.");
      setState(AppState.ASSESSMENT_PHASE_1);
    } finally {
      clearInterval(interval);
    }
  };

  const handleReset = async () => {
    if (window.confirm("Reset intelligence dossier? All local data will be erased.")) {
      await storage.clear();
      setUserInfo(null);
      setResponses([]);
      setDossier(null);
      setState(AppState.ONBOARDING);
    }
  };

  const renderContent = () => {
    switch (state) {
      case AppState.ONBOARDING:
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case AppState.ASSESSMENT_PHASE_1:
        return <Assessment phase={1} onPhaseComplete={handlePhase1Complete} />;
      case AppState.ASSESSMENT_PHASE_2:
        return <Assessment phase={2} onPhaseComplete={handlePhase2Complete} />;
      case AppState.ANALYZING:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-12 animate-in fade-in duration-700">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-indigo-500/20 flex items-center justify-center">
                <BrainCircuit size={48} className="text-indigo-500 animate-pulse" />
              </div>
              <div className="absolute inset-0 w-32 h-32 rounded-full border-t-4 border-indigo-500 animate-spin"></div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold poppins tracking-tight">{loadingMessage}</h2>
              <p className="text-white/40 max-w-sm mx-auto italic">
                "Strategy without empathy is cold; empathy without strategy is blind."
              </p>
            </div>
          </div>
        );
      case AppState.DOSSIER:
        return dossier ? (
          <>
            <div className="flex justify-center mb-8">
              <div className="inline-flex glass p-1 rounded-2xl">
                <button 
                  onClick={() => setState(AppState.DOSSIER)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${state === AppState.DOSSIER ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-white/40 hover:text-white'}`}
                >
                  <Sparkles size={16} /> Intelligence
                </button>
                <button 
                  onClick={() => setState(AppState.WELLNESS)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${state === AppState.WELLNESS ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-white/40 hover:text-white'}`}
                >
                  <Activity size={16} /> Mentorship
                </button>
              </div>
            </div>
            <Dossier dossier={dossier} />
          </>
        ) : null;
      case AppState.WELLNESS:
        return dossier ? (
          <>
            <div className="flex justify-center mb-8">
              <div className="inline-flex glass p-1 rounded-2xl">
                <button 
                  onClick={() => setState(AppState.DOSSIER)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${state === AppState.DOSSIER ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-white/40 hover:text-white'}`}
                >
                  <Sparkles size={16} /> Intelligence
                </button>
                <button 
                  onClick={() => setState(AppState.WELLNESS)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${state === AppState.WELLNESS ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-white/40 hover:text-white'}`}
                >
                  <Activity size={16} /> Mentorship
                </button>
              </div>
            </div>
            <WellnessHub dossier={dossier} />
          </>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <Layout onReset={handleReset} showNav={state !== AppState.ONBOARDING && state !== AppState.ANALYZING}>
      {/* Save indicator */}
      <div className={`fixed bottom-6 right-6 z-[60] flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 transition-all duration-500 ${showSavedToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <CheckCircle size={14} className="text-emerald-400" />
        <span className="text-[10px] font-bold text-white/60 tracking-wider">PROGRESS SAVED</span>
      </div>
      
      {renderContent()}
    </Layout>
  );
};

export default App;
