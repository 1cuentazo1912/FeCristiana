import React from 'react';
import { BookOpen, HelpCircle, Mic, ShieldCheck, Flame } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'archive' | 'generales' | 'record' | 'questions' | 'pastoral' | 'dossier';
  setActiveTab: (tab: 'archive' | 'generales' | 'record' | 'questions' | 'pastoral' | 'dossier') => void;
  pendingCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  pendingCount
}) => {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-t border-stone-200 shadow-lg pb-safe"
      aria-label="Navegación principal inferior"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center h-16 px-1">
        
        {/* Tab 1: Archivo / Inicio */}
        <button
          onClick={() => setActiveTab('archive')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'archive' ? 'text-amber-900 font-semibold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <BookOpen className={`w-5 h-5 ${activeTab === 'archive' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight mt-1">Inicio</span>
        </button>

        {/* Tab 2: Generales de la Fe */}
        <button
          onClick={() => setActiveTab('generales')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'generales' ? 'text-amber-900 font-semibold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Flame className={`w-5 h-5 ${activeTab === 'generales' ? 'stroke-[2.5] text-amber-700' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight mt-1">Generales</span>
        </button>

        {/* Tab 3: Center Elevated Record Button */}
        <div className="flex items-center justify-center -mt-5">
          <button
            onClick={() => setActiveTab('record')}
            className={`w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer ${
              activeTab === 'record'
                ? 'bg-amber-950 text-amber-50 ring-4 ring-amber-200'
                : 'bg-amber-800 hover:bg-amber-900 text-white ring-4 ring-[#FBF9F5]'
            }`}
            aria-label="Grabar o Cargar Testimonio"
          >
            <Mic className="w-6 h-6" />
          </button>
        </div>

        {/* Tab 4: 15 Preguntas */}
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'questions' ? 'text-amber-900 font-semibold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <HelpCircle className={`w-5 h-5 ${activeTab === 'questions' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight mt-1">Preguntas</span>
        </button>

        {/* Tab 5: Cuidado Pastoral */}
        <button
          onClick={() => setActiveTab('pastoral')}
          className={`relative flex flex-col items-center justify-center h-full min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'pastoral' ? 'text-amber-900 font-semibold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className="relative">
            <ShieldCheck className={`w-5 h-5 ${activeTab === 'pastoral' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-amber-800 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {pendingCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Pastoral</span>
        </button>

      </div>
    </nav>
  );
};
