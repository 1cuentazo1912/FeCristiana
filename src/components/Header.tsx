import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'archive' | 'generales' | 'record' | 'questions' | 'pastoral' | 'dossier';
  setActiveTab: (tab: 'archive' | 'generales' | 'record' | 'questions' | 'pastoral' | 'dossier') => void;
  pendingCount: number;
  seniorMode: boolean;
  setSeniorMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  pendingCount,
  seniorMode,
  setSeniorMode
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand Wordmark & Church Tag */}
          <button
            onClick={() => setActiveTab('archive')}
            className="flex items-center gap-2 cursor-pointer focus:outline-none text-left"
          >
            <div className="w-8 h-8 rounded-full bg-amber-900 text-amber-50 flex items-center justify-center font-serif font-bold text-sm shadow-xs">
              LF
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-stone-900 tracking-tight leading-none block">
                Legado de Fe
              </span>
              <span className="text-[10px] text-stone-500 font-medium leading-none block mt-0.5">
                Archivo Intergeneracional
              </span>
            </div>
          </button>

          {/* Desktop nav links (hidden on mobile, handled by bottom nav) */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-stone-600">
            <button
              onClick={() => setActiveTab('archive')}
              className={`hover:text-stone-900 transition-colors pb-0.5 ${
                activeTab === 'archive' ? 'text-amber-900 font-bold border-b-2 border-amber-900' : ''
              }`}
            >
              Archivo Vivo
            </button>
            <button
              onClick={() => setActiveTab('generales')}
              className={`hover:text-stone-900 transition-colors pb-0.5 flex items-center gap-1.5 ${
                activeTab === 'generales' ? 'text-amber-900 font-bold border-b-2 border-amber-900' : ''
              }`}
            >
              <span>Generales de la Fe</span>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 rounded-full">
                8
              </span>
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`hover:text-stone-900 transition-colors pb-0.5 ${
                activeTab === 'questions' ? 'text-amber-900 font-bold border-b-2 border-amber-900' : ''
              }`}
            >
              15 Preguntas
            </button>
            <button
              onClick={() => setActiveTab('pastoral')}
              className={`hover:text-stone-900 transition-colors pb-0.5 flex items-center gap-1 ${
                activeTab === 'pastoral' ? 'text-amber-900 font-bold border-b-2 border-amber-900' : ''
              }`}
            >
              <span>Pastoral</span>
              {pendingCount > 0 && (
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('dossier')}
              className={`hover:text-stone-900 transition-colors pb-0.5 ${
                activeTab === 'dossier' ? 'text-amber-900 font-bold border-b-2 border-amber-900' : ''
              }`}
            >
              Dossier
            </button>
          </nav>

          {/* Senior Accessibility Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSeniorMode(!seniorMode)}
              title="Aumentar tamaño de letra para personas mayores"
              className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-colors cursor-pointer min-h-[36px] flex items-center gap-1 ${
                seniorMode
                  ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
              }`}
            >
              <span className="font-bold text-sm">Aa+</span>
              <span className="hidden sm:inline">{seniorMode ? 'Grande' : 'Normal'}</span>
            </button>

            <button
              onClick={() => setActiveTab('record')}
              className="px-3 py-1.5 text-xs font-semibold bg-amber-900 hover:bg-amber-800 text-white rounded-lg shadow-xs transition-colors hidden sm:flex items-center gap-1 cursor-pointer"
            >
              <span>+ Cargar</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
