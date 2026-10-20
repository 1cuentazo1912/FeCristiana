import React from 'react';
import { Testimony } from '../types';
import { Sparkles } from 'lucide-react';

interface StoriesRowProps {
  testimonies: Testimony[];
  onSelectTestimony: (t: Testimony) => void;
}

export const StoriesRow: React.FC<StoriesRowProps> = ({ testimonies, onSelectTestimony }) => {
  return (
    <div className="py-2">
      <div className="flex items-center justify-between px-1 mb-2">
        <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-amber-800" />
          <span>Voces de Fe · Cápsulas Vivas</span>
        </span>
        <span className="text-[11px] text-stone-500">Toca para escuchar</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {testimonies.map((testimony) => {
          return (
            <button
              key={testimony.id}
              onClick={() => onSelectTestimony(testimony)}
              className="flex flex-col items-center shrink-0 w-20 group cursor-pointer focus:outline-none"
            >
              {/* Story Ring */}
              <div className={`p-0.5 rounded-full transition-transform active:scale-95 group-hover:scale-105 ${
                testimony.isHistoricalVerified
                  ? 'bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-700 ring-1 ring-amber-300/60'
                  : 'bg-gradient-to-tr from-stone-400 via-stone-300 to-amber-600'
              }`}>
                <div className="p-0.5 bg-[#FBF9F5] rounded-full">
                  <img
                    src={testimony.photoUrl}
                    alt={testimony.authorName}
                    className="w-14 h-14 rounded-full object-cover bg-amber-100/60"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="28" r="28" fill="%23f7f4ee"/><circle cx="28" cy="22" r="9" fill="%2392400e"/><path d="M14 46c0-7 6-12 14-12s14 5 14 12" fill="%2392400e"/></svg>';
                    }}
                  />
                </div>
              </div>

              {/* Author Short Name */}
              <span className="text-[11px] font-medium text-stone-800 mt-1.5 truncate w-full text-center group-hover:text-amber-900">
                {testimony.authorName.split(' ')[0]} {testimony.authorName.split(' ')[1]?.[0]}.
              </span>

              {/* Tag */}
              <span className="text-[9px] text-stone-500 truncate w-full text-center">
                {testimony.isHistoricalVerified ? 'Verídico' : 'Comunidad'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
