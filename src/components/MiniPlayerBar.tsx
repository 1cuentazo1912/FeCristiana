import React from 'react';
import { Testimony } from '../types';
import { Play, Pause, X, ChevronUp, Sparkles } from 'lucide-react';

interface MiniPlayerBarProps {
  testimony: Testimony;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onExpand: () => void;
  onClose: () => void;
}

export const MiniPlayerBar: React.FC<MiniPlayerBarProps> = ({
  testimony,
  isPlaying,
  onTogglePlay,
  onExpand,
  onClose
}) => {
  return (
    <div className="fixed bottom-16 left-0 right-0 z-30 px-3 pb-1">
      <div className="max-w-md mx-auto bg-stone-900 text-stone-100 rounded-2xl p-2.5 shadow-2xl flex items-center justify-between gap-3 border border-stone-800 backdrop-blur-md animate-in slide-in-from-bottom-3 duration-200">
        
        {/* Left: Avatar + Title (tappable to expand) */}
        <div 
          onClick={onExpand}
          className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer"
        >
          <img
            src={testimony.photoUrl}
            alt={testimony.authorName}
            className="w-10 h-10 rounded-xl object-cover border border-stone-700 shrink-0 bg-stone-800"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%23292524"/><circle cx="20" cy="16" r="6" fill="%23d6cebe"/><path d="M10 32c0-5.5 4.5-9 10-9s10 3.5 10 9" fill="%23d6cebe"/></svg>';
            }}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-semibold tracking-wide uppercase">
              {testimony.isHistoricalVerified ? (
                <>
                  <Sparkles className="w-2.5 h-2.5" />
                  <span className="truncate">Caso Verídico</span>
                </>
              ) : (
                <span className="truncate">Testimonio de Fe</span>
              )}
            </div>
            <div className="text-xs font-semibold text-white truncate">
              {testimony.title}
            </div>
            <div className="text-[11px] text-stone-400 truncate">
              {testimony.authorName}
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onTogglePlay}
            className="w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-sm"
            aria-label={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-stone-950" />
            ) : (
              <Play className="w-4 h-4 fill-stone-950 ml-0.5" />
            )}
          </button>

          <button
            onClick={onExpand}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Expandir para ver transcripción y versículos"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-300 rounded-lg transition-colors cursor-pointer"
            title="Cerrar reproductor"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
