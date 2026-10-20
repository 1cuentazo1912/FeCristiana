import React, { useState } from 'react';
import { Testimony } from '../types';
import { CATEGORY_LABELS } from '../data/guidedQuestions';
import { StoriesRow } from './StoriesRow';
import { 
  Play, 
  Heart, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  SlidersHorizontal,
  Flame,
  ChevronRight,
  Tv
} from 'lucide-react';
import { FAITH_GENERALS } from '../data/faithGenerals';

interface TestimoniesFeedProps {
  testimonies: Testimony[];
  onSelectTestimony: (testimony: Testimony) => void;
  onPlayTestimony?: (testimony: Testimony) => void;
  onOpenRecorder: () => void;
  onOpenGenerals?: () => void;
  onQuickPray?: (testimonyId: string) => void;
  seniorMode: boolean;
}

export const TestimoniesFeed: React.FC<TestimoniesFeedProps> = ({
  testimonies,
  onSelectTestimony,
  onPlayTestimony,
  onOpenRecorder,
  onOpenGenerals,
  onQuickPray,
  seniorMode
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'historical' | 'community'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recent' | 'yearsInFaith' | 'prayers'>('recent');

  const categories = [
    { key: 'all', label: 'Todos' },
    { key: 'fe_en_las_pruebas', label: 'Fe en las Pruebas' },
    { key: 'familia', label: 'Familia' },
    { key: 'perdon', label: 'Perdón' },
    { key: 'llamado', label: 'Llamado' },
    { key: 'sanidad', label: 'Sanidad' },
    { key: 'provision', label: 'Provisión' }
  ];

  // Filter approved testimonies
  const visibleTestimonies = testimonies.filter(t => t.status === 'approved');

  const filteredTestimonies = visibleTestimonies
    .filter(t => {
      const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
      const matchesSource = 
        sourceFilter === 'all' ||
        (sourceFilter === 'historical' && t.isHistoricalVerified) ||
        (sourceFilter === 'community' && !t.isHistoricalVerified);

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        t.title.toLowerCase().includes(q) ||
        t.authorName.toLowerCase().includes(q) ||
        t.transcript.toLowerCase().includes(q) ||
        t.churchName.toLowerCase().includes(q) ||
        (t.countryOrCity && t.countryOrCity.toLowerCase().includes(q))
      );
      return matchesCategory && matchesSource && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'yearsInFaith') return b.yearsInFaith - a.yearsInFaith;
      if (sortBy === 'prayers') return b.prayersCount - a.prayersCount;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-5 pb-28">
      
      {/* 1. Mobile Top Carousel: Stories / Cápsulas de Fe */}
      <StoriesRow 
        testimonies={visibleTestimonies} 
        onSelectTestimony={onSelectTestimony} 
      />

      {/* 2. Compact Mobile Inspiration Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 text-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-widest block">
              Salmo 71:18 · Transmisión Generacional
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-white mt-0.5 leading-snug">
              Voces que sostienen la fe de los jóvenes
            </h2>
            <p className="text-xs text-stone-300 mt-1 line-clamp-2">
              Casos históricos comprobados y memorias vivas de nuestra congregación.
            </p>
          </div>

          <button
            onClick={onOpenRecorder}
            className="w-11 h-11 rounded-full bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md transition-transform active:scale-95 cursor-pointer"
            aria-label="Cargar mi testimonio"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2.5 Spotlight: Generales de la Fe (Historias y Videos) */}
      <div className="bg-[#2B1810] rounded-2xl p-4 text-white shadow-sm border border-amber-900/40">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-600/30 text-amber-300 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-amber-100 leading-tight">
                Los Generales de la Fe
              </h3>
              <p className="text-[10px] text-amber-200/70">
                8 Héroes cristianos · Biografías y documentales en audio español
              </p>
            </div>
          </div>
          {onOpenGenerals && (
            <button
              onClick={onOpenGenerals}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            >
              <span>Ver todos</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Horizontal Mini-avatars row */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {FAITH_GENERALS.map((gen) => (
            <button
              key={gen.id}
              onClick={onOpenGenerals}
              className="flex flex-col items-center shrink-0 w-15 group cursor-pointer text-left focus:outline-none"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-500/40 group-hover:border-amber-400 transition-all group-hover:scale-105 bg-stone-800 shadow-2xs">
                <img
                  src={gen.photoUrl}
                  alt={gen.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" fill="%232b1810"/><circle cx="24" cy="18" r="8" fill="%23d97706"/><path d="M12 40c0-6 6-10 12-10s12 4 12 10" fill="%23d97706"/></svg>';
                  }}
                />
              </div>
              <span className="text-[9px] text-stone-300 font-medium truncate w-full text-center mt-1 group-hover:text-amber-300">
                {gen.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Search and Quick Source Segmented Filter */}
      <div className="space-y-3">
        {/* Search Input (Mobile Thumb Friendly) */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, país, enfermedad o prueba..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-800 shadow-2xs"
          />
        </div>

        {/* Source Switcher: Todos vs Casos Históricos vs Comunidad */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 rounded-xl text-xs font-medium">
          <button
            onClick={() => setSourceFilter('all')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer text-[11px] sm:text-xs ${
              sourceFilter === 'all'
                ? 'bg-white text-stone-900 font-bold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Todos ({visibleTestimonies.length})
          </button>
          <button
            onClick={() => setSourceFilter('historical')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer text-[11px] sm:text-xs flex items-center justify-center gap-1 ${
              sourceFilter === 'historical'
                ? 'bg-amber-900 text-amber-50 font-bold shadow-xs'
                : 'text-amber-950 hover:text-amber-900'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Casos Verídicos</span>
          </button>
          <button
            onClick={() => setSourceFilter('community')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer text-[11px] sm:text-xs ${
              sourceFilter === 'community'
                ? 'bg-white text-stone-900 font-bold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Comunidad ({visibleTestimonies.filter(t => !t.isHistoricalVerified).length})
          </button>
        </div>

        {/* Horizontal Swipeable Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors shrink-0 cursor-pointer min-h-[36px] flex items-center ${
                selectedCategory === cat.key
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Streamlined Mobile Testimonies List */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <span>{filteredTestimonies.length} testimonios disponibles</span>
          <div className="flex items-center gap-1">
            <span className="text-[11px]">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-medium text-stone-800 text-xs focus:outline-none cursor-pointer"
            >
              <option value="recent">Recientes</option>
              <option value="yearsInFaith">Más años de fe</option>
              <option value="prayers">Más oraciones</option>
            </select>
          </div>
        </div>

        {filteredTestimonies.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-stone-500 space-y-2">
            <p className="text-base font-serif text-stone-800">No se encontraron testimonios.</p>
            <p className="text-xs text-stone-500">Prueba con otra palabra clave o categoría.</p>
          </div>
        ) : (
          filteredTestimonies.map((testimony) => (
            <div
              key={testimony.id}
              onClick={() => onSelectTestimony(testimony)}
              className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 transition-all shadow-xs active:scale-[0.99] hover:border-amber-900/40 cursor-pointer group"
            >
              {/* Top metadata line */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-amber-900 text-[11px] uppercase tracking-wider">
                    {CATEGORY_LABELS[testimony.category] || testimony.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-[11px]">{Math.round(testimony.durationSeconds / 60)} min</span>
                </div>

                {testimony.isHistoricalVerified ? (
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-amber-800" />
                    <span>Verídico</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                    Comunidad
                  </span>
                )}
              </div>

              {/* Title & Author row */}
              <div className="flex items-start gap-3">
                <img
                  src={testimony.photoUrl}
                  alt={testimony.authorName}
                  className="w-12 h-12 rounded-xl object-cover border border-stone-200 bg-amber-50 shrink-0 mt-0.5"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="%23f7f4ee"/><circle cx="24" cy="18" r="7" fill="%2392400e"/><path d="M12 38c0-6 5-10 12-10s12 4 12 10" fill="%2392400e"/></svg>';
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h3 className={`font-serif font-semibold text-stone-900 leading-snug group-hover:text-amber-900 transition-colors ${
                    seniorMode ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                  }`}>
                    {testimony.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-1">
                    <span className="font-semibold text-stone-800 truncate">{testimony.authorName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[11px] text-stone-500 shrink-0">
                      {testimony.biographicalYears || `${testimony.authorAge} años`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Short snippet */}
              <p className="text-xs sm:text-sm text-stone-600 font-serif line-clamp-2 mt-2.5 leading-relaxed pl-1">
                "{testimony.transcript.slice(0, 130)}..."
              </p>

              {/* Card Footer with quick action touch targets */}
              <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onQuickPray) onQuickPray(testimony.id);
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-amber-900 min-h-[36px] px-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                    title="Orar por este testimonio"
                  >
                    <Heart className="w-3.5 h-3.5 text-red-700 fill-red-100" />
                    <span>{testimony.prayersCount}</span>
                  </button>

                  <span className="text-[11px] text-stone-400">
                    {testimony.responses.length} respuestas
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onPlayTestimony) {
                        onPlayTestimony(testimony);
                      } else {
                        onSelectTestimony(testimony);
                      }
                    }}
                    className="px-3 py-1.5 rounded-full bg-amber-900 text-amber-50 hover:bg-amber-800 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs active:scale-95 cursor-pointer min-h-[36px]"
                  >
                    <Play className="w-3.5 h-3.5 fill-amber-50 ml-0.5" />
                    <span>Escuchar</span>
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
