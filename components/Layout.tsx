
import React from 'react';
import { LogOut, User, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onReset?: () => void;
  showNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, onReset, showNav = true }) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500">
      {showNav && (
        <nav className="fixed top-0 left-0 right-0 z-50 glass h-16 flex items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={18} />
            </div>
            <span className="text-xl font-bold tracking-tighter poppins text-white">COGNITO</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onReset}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70"
              title="Reset Assessment"
            >
              <LogOut size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <User size={20} className="text-indigo-400" />
            </div>
          </div>
        </nav>
      )}
      
      <main className={`flex-grow ${showNav ? 'pt-24 pb-12' : ''} px-4 max-w-7xl mx-auto w-full`}>
        {children}
      </main>
      
      <footer className="py-6 text-center text-white/30 text-sm">
        <p>© 2024 COGNITO. Deep Intelligence Profiling. For reflection only.</p>
      </footer>
    </div>
  );
};
