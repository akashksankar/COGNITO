
import React, { useState, useRef, useEffect } from 'react';
import { PsychologicalDossier } from '../types';
import { chatWithCounselor } from '../services/gemini';
import { Send, MessageCircle, Gamepad2, Wind, Sparkles, Brain } from 'lucide-react';

interface WellnessHubProps {
  dossier: PsychologicalDossier;
}

export const WellnessHub: React.FC<WellnessHubProps> = ({ dossier }) => {
  const [activeTab, setActiveTab] = useState<'counselor' | 'meditation' | 'games'>('counselor');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: `Hello. I've analyzed your profile as '${dossier.subjectOverview.codename}'. How are you feeling today? We can discuss your growth path or any stress you're feeling.` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await chatWithCounselor(dossier, [], userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response || "I'm processing that. Let's try reflecting on it further." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Forgive me, my connection to the cognitive engine was momentarily interrupted." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold poppins text-gradient">Cognitive Wellness Hub</h2>
        <div className="flex p-1 glass rounded-2xl">
          <button 
            onClick={() => setActiveTab('counselor')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'counselor' ? 'bg-indigo-600 text-white' : 'text-white/40 hover:text-white'}`}
          >
            Counselor
          </button>
          <button 
            onClick={() => setActiveTab('meditation')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'meditation' ? 'bg-indigo-600 text-white' : 'text-white/40 hover:text-white'}`}
          >
            Meditation
          </button>
          <button 
            onClick={() => setActiveTab('games')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'games' ? 'bg-indigo-600 text-white' : 'text-white/40 hover:text-white'}`}
          >
            Focus
          </button>
        </div>
      </div>

      <div className="glass min-h-[65vh] rounded-[2rem] overflow-hidden flex flex-col">
        {activeTab === 'counselor' && (
          <div className="flex flex-col h-full flex-1">
            <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-white/5">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                <Brain size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Cognito Mentor</h3>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Empathetic Analysis Active</p>
              </div>
            </div>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[50vh]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg' 
                    : 'glass-dark text-white/80 rounded-tl-none border border-white/10'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="glass-dark p-4 rounded-2xl rounded-tl-none flex gap-1">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-white/5 border-t border-white/10">
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={`Chat with your mentor, ${dossier.subjectOverview.codename}...`}
                  className="flex-1 glass-dark rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 border border-white/10"
                />
                <button 
                  onClick={handleSend}
                  className="bg-indigo-600 hover:bg-indigo-500 p-3 rounded-xl transition-all shadow-lg"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'meditation' && (
          <div className="p-12 flex flex-col items-center justify-center text-center h-full space-y-8">
            <div className="w-48 h-48 rounded-full border-4 border-indigo-500/30 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin [animation-duration:8s]"></div>
              <Wind size={64} className="text-indigo-400 animate-pulse" />
            </div>
            <div className="space-y-4 max-w-lg">
              <h3 className="text-2xl font-bold">Resonance Meditation</h3>
              <p className="text-white/60">
                Based on your profile, your ideal relaxation focus is <strong>{dossier.recoveryPatterns}</strong>.
              </p>
              <div className="glass p-6 rounded-2xl italic text-indigo-200/80">
                "Inhale for 4 seconds, feeling the expansion of your potential. Hold for 4. Exhale for 6, releasing the pressure of ${dossier.stressTriggers[0] || 'expectations'}."
              </div>
              <button className="px-8 py-3 bg-indigo-600 rounded-full font-bold shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform">
                Start Guided Session
              </button>
            </div>
          </div>
        )}

        {activeTab === 'games' && (
          <div className="p-12 flex flex-col items-center justify-center text-center h-full space-y-8">
             <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                <div className="glass p-8 rounded-3xl flex flex-col items-center gap-4 group cursor-pointer hover:bg-indigo-600/10 transition-colors">
                  <Gamepad2 size={48} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold">Pattern Sync</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Cognitive Agility</p>
                </div>
                <div className="glass p-8 rounded-3xl flex flex-col items-center gap-4 group cursor-pointer hover:bg-emerald-600/10 transition-colors">
                  <Sparkles size={48} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold">Breath Flow</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Emotional Control</p>
                </div>
             </div>
             <p className="text-white/40 text-sm">Adaptive games designed for the {dossier.architecture.mbtiType} mind.</p>
          </div>
        )}
      </div>
    </div>
  );
};
