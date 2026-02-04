
import React, { useState } from 'react';
import { UserInfo } from '../types';
import { ChevronRight, Shield, ShieldAlert } from 'lucide-react';

interface OnboardingProps {
  onComplete: (info: UserInfo) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<UserInfo>({
    fullName: '',
    nickname: '',
    ageRange: '25-34',
    country: 'India',
    language: 'English'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.country) {
      onComplete(formData);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-xl w-full glass p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-600/20 rounded-full blur-3xl"></div>

        <div className="text-center mb-8 relative">
          <h2 className="text-3xl font-bold mb-2 poppins">Welcome to Cognito</h2>
          <p className="text-white/60">Initialize your strategic psychological architecture.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">Full Name</label>
              <input
                required
                type="text"
                placeholder="John Doe"
                className="w-full glass-dark rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all border border-white/10"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">Codename (Optional)</label>
              <input
                type="text"
                placeholder="Strategist"
                className="w-full glass-dark rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all border border-white/10"
                value={formData.nickname}
                onChange={(e) => setFormData({...formData, nickname: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">Age Range</label>
              <select
                className="w-full glass-dark rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none border border-white/10"
                value={formData.ageRange}
                onChange={(e) => setFormData({...formData, ageRange: e.target.value})}
              >
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55+">55+</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">Country</label>
              <input
                required
                type="text"
                className="w-full glass-dark rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all border border-white/10"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl flex gap-3 items-start">
              <Shield className="text-yellow-500 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-[10px] text-yellow-200/70 leading-relaxed">
                <strong>Disclaimer:</strong> Not a medical diagnosis. Cognito analyzes cognitive patterns for strategic self-reflection.
              </p>
            </div>
            <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-2xl flex gap-3 items-start">
              <ShieldAlert className="text-rose-500 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-[10px] text-rose-200/70 leading-relaxed">
                <strong>Warning:</strong> High-stakes simulations in Phase 2 involve moral dilemmas. You may skip Phase 2 at any time.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 group transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-indigo-500/20"
          >
            Start Assessment
            <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};
