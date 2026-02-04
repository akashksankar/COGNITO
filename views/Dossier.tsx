
import React, { useState } from 'react';
import { PsychologicalDossier } from '../types';
import { DOSSIER_SECTIONS } from '../constants';
import { exportReport } from '../services/export';
import { storage } from '../services/storage';
import { 
  Download, 
  ChevronRight, 
  BarChart, 
  PieChart, 
  Info,
  Zap,
  EyeOff,
  AlertTriangle,
  Gavel,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Code
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

interface DossierProps {
  dossier: PsychologicalDossier;
}

export const Dossier: React.FC<DossierProps> = ({ dossier }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

  const traitColors = ['#6366f1', '#a78bfa', '#f43f5e', '#10b981', '#f59e0b'];

  const handleExportTxt = async () => {
    const saved = await storage.load();
    const content = exportReport.generateTxt(dossier, saved?.userInfo);
    exportReport.download(content, `Cognito_Dossier_${dossier.subjectOverview.codename}.txt`, 'text/plain');
  };

  const handleExportLaTeX = async () => {
    const saved = await storage.load();
    const content = exportReport.generateLaTeX(dossier, saved?.userInfo);
    exportReport.download(content, `Cognito_Dossier_${dossier.subjectOverview.codename}.tex`, 'text/x-tex');
  };

  const renderSection = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="glass p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 bg-indigo-600/10 border-l border-b border-indigo-500/20 rounded-bl-3xl">
                <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-400 uppercase">Classified Persona</span>
              </div>
              <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-1">Subject Codename</h2>
              <h3 className="text-4xl font-black text-gradient mb-6 poppins">{dossier.subjectOverview.codename}</h3>
              <p className="text-xl text-white/80 leading-relaxed font-light italic">
                "{dossier.subjectOverview.summary}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-3xl">
                <div className="flex items-center gap-2 mb-4 text-indigo-400">
                  <PieChart size={20} />
                  <h4 className="font-bold">MBTI Core</h4>
                </div>
                <div className="text-4xl font-bold mb-2 tracking-tighter text-white">{dossier.architecture.mbtiType}</div>
                <p className="text-white/60 text-sm leading-relaxed">{dossier.architecture.mbtiDescription}</p>
              </div>
              <div className="glass p-6 rounded-3xl">
                <div className="flex items-center gap-2 mb-4 text-emerald-400">
                  <BarChart size={20} />
                  <h4 className="font-bold">Emotional Intelligence</h4>
                </div>
                <p className="text-white/80 italic">{dossier.architecture.emotionalIntelligence}</p>
              </div>
            </div>
          </div>
        );
      
      case 'architecture':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-3xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Info className="text-indigo-400" size={18} />
                  Cognitive Function Stack
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={dossier.architecture.cognitiveFunctions}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="function" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={0.5}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass p-8 rounded-3xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <BarChart className="text-purple-400" size={18} />
                  Big Five Traits
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart data={dossier.architecture.bigFive} layout="vertical">
                      <XAxis type="number" hide domain={[0, 100]} />
                      <YAxis dataKey="trait" type="category" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} width={100} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} 
                        itemStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                        {dossier.architecture.bigFive.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={traitColors[index % traitColors.length]} />
                        ))}
                      </Bar>
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
             </div>
          </div>
        );

      case 'ethics':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="glass p-8 rounded-3xl border-l-8 border-rose-500/50">
              <div className="flex items-center gap-3 mb-6">
                <Gavel className="text-rose-400" size={28} />
                <h3 className="text-2xl font-bold poppins">Moral Reasoning Profile</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-black uppercase text-rose-400 tracking-widest mb-2">Dominant Framework</h4>
                  <div className="text-3xl font-black mb-4 text-white">{dossier.moralReasoning.framework}</div>
                  <p className="text-white/70 leading-relaxed italic border-l-2 border-white/10 pl-4">
                    {dossier.moralReasoning.analysis}
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="bg-white/5 p-4 rounded-2xl">
                    <h4 className="text-xs font-black uppercase text-white/40 tracking-widest mb-1">Risk Appetite</h4>
                    <p className="text-sm text-white/80">{dossier.moralReasoning.riskAppetite}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl">
                    <h4 className="text-xs font-black uppercase text-white/40 tracking-widest mb-1">Emotional Detachment</h4>
                    <p className="text-sm text-white/80">{dossier.moralReasoning.emotionalControl}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'government':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="glass p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-8">
                <Landmark className="text-emerald-400" size={28} />
                <h3 className="text-2xl font-bold poppins">Indian Public Service Suitability</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dossier.publicServiceSuitability.map((service, i) => (
                  <div key={i} className="glass-dark p-6 rounded-2xl border border-white/5 group hover:border-emerald-500/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{service.department}</h4>
                      <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-full border border-emerald-500/20">MATCH</div>
                    </div>
                    <p className="text-sm text-white/60 mb-4">{service.why}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'personalities':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {dossier.similarPersonalities.map((p, i) => (
              <div key={i} className="glass rounded-3xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 border border-white/5">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={p.imageUrl || `https://picsum.photos/400/500?random=${i}`} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {p.category}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-lg mb-2">{p.name}</h4>
                  <p className="text-[11px] text-white/50 leading-relaxed italic">
                    "{p.alignmentReason}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'growth':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6 text-gradient poppins">Growth Architecture</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-black uppercase text-indigo-400 mb-4 tracking-widest">Ideal Career Path</h4>
                  <div className="space-y-2 mb-6">
                    {dossier.careerGuidance.idealRoles.map((role, i) => (
                      <div key={i} className="flex items-center gap-2 text-white/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <h4 className="text-xs font-black uppercase text-indigo-400 mb-4 tracking-widest">Development Path</h4>
                  <p className="text-sm text-white/70 leading-relaxed mb-6">{dossier.growthPath.generalAdvice}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 glass p-4 rounded-3xl sticky top-24">
          <div className="space-y-2">
            {DOSSIER_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === section.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                {section.icon}
                <span className="text-xs font-semibold">{section.label}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5 space-y-2 px-2">
            <div className="relative">
              <button 
                className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black text-white/60 tracking-widest transition-all"
                onClick={() => setExportMenuOpen(!exportMenuOpen)}
              >
                <Download size={14} />
                GENERATE REPORT
              </button>
              
              {exportMenuOpen && (
                <div className="absolute bottom-full left-0 w-full mb-2 glass-dark rounded-xl border border-white/10 p-2 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 z-50">
                  <button 
                    onClick={() => { window.print(); setExportMenuOpen(false); }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg text-[10px] font-bold text-white/80 transition-all mb-1"
                  >
                    <Download size={14} className="text-indigo-400" />
                    PRINT AS PDF
                  </button>
                  <button 
                    onClick={() => { handleExportTxt(); setExportMenuOpen(false); }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg text-[10px] font-bold text-white/80 transition-all mb-1"
                  >
                    <FileText size={14} className="text-emerald-400" />
                    SAVE AS TXT
                  </button>
                  <button 
                    onClick={() => { handleExportLaTeX(); setExportMenuOpen(false); }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg text-[10px] font-bold text-white/80 transition-all"
                  >
                    <Code size={14} className="text-purple-400" />
                    LATEX SOURCE (.TEX)
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 w-full min-h-[70vh]">
          {renderSection()}
        </div>
      </div>
      
      {/* Print Styles */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .glass, .glass-dark { background: white !important; border: 1px solid #ddd !important; backdrop-filter: none !important; color: black !important; box-shadow: none !important; }
          nav, aside, footer, .no-print, button, .save-indicator { display: none !important; }
          main { padding-top: 0 !important; }
          .text-gradient { -webkit-text-fill-color: black !important; background: none !important; }
          .text-white, .text-white\/80, .text-white\/60 { color: black !important; }
          .bg-indigo-600, .bg-rose-600 { background: #eee !important; color: black !important; border: 1px solid #ccc !important; }
          .max-w-7xl { max-width: 100% !important; }
          .flex-col.md\\:flex-row { flex-direction: column !important; }
          .flex-1 { width: 100% !important; }
          h3, h4 { color: black !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>
    </div>
  );
};
