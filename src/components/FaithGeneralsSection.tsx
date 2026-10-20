import React, { useState } from 'react';
import { FaithGeneral, CategoryType } from '../types';
import { FAITH_GENERALS } from '../data/faithGenerals';
import { CATEGORY_LABELS } from '../data/guidedQuestions';
import { FaithGeneralModal } from './FaithGeneralModal';
import { 
  Search, 
  Play, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Tv, 
  ExternalLink, 
  MapPin, 
  Clock, 
  Quote,
  Flame,
  Plus
} from 'lucide-react';

interface FaithGeneralsSectionProps {
  seniorMode: boolean;
  onOpenRecorder: () => void;
}

export const FaithGeneralsSection: React.FC<FaithGeneralsSectionProps> = ({
  seniorMode,
  onOpenRecorder
}) => {
  const [selectedGeneral, setSelectedGeneral] = useState<FaithGeneral | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'Todos' },
    { key: 'sanidad', label: 'Sanidad y Milagros' },
    { key: 'llamado', label: 'Llamado y Avivamiento' },
    { key: 'provision', label: 'Provisión y Oración' },
    { key: 'perdon', label: 'Perdón Radical' },
    { key: 'fe_en_las_pruebas', label: 'Fe en Persecución' }
  ];

  const filteredGenerals = FAITH_GENERALS.filter((general) => {
    const matchesCategory = selectedCategory === 'all' || general.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      general.name.toLowerCase().includes(q) ||
      general.nickname.toLowerCase().includes(q) ||
      general.country.toLowerCase().includes(q) ||
      general.summary.toLowerCase().includes(q) ||
      general.famousQuote.toLowerCase().includes(q)
    );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-5 space-y-6 pb-28">
      
      {/* Header Banner - Editorial & Historical */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#2D1B0F] via-[#3C2415] to-[#1C120B] text-amber-50 p-6 sm:p-8 shadow-md border border-amber-900/30">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Grandes Testimonios de la Historia Cristiana</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Generales de la Fe
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
            Hombres y mujeres de carne y hueso que creyeron a Dios contra toda esperanza. Conoce sus vidas, testimonios verídicos de milagros y perdón, y mira sus documentales históricos verificados en video.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-amber-200/90">
            <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Biografías Históricamente Comprobadas</span>
            </span>
            <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-lg">
              <Tv className="w-4 h-4 text-red-400" />
              <span>Documentales en Audio Español Latino</span>
            </span>
            <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-lg">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Clips para Jóvenes en TikTok</span>
            </span>
          </div>
        </div>

        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Search and Category Filter Controls */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por general de la fe (ej. Smith Wigglesworth, Kathryn Kuhlman...)"
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-800 shadow-2xs"
          />
        </div>

        {/* Category Pills (Mobile horizontal scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium shrink-0 transition-colors cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-amber-900 text-amber-50 shadow-2xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Generals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredGenerals.map((general) => (
          <article
            key={general.id}
            className="bg-white rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
          >
            <div className="p-5 space-y-4">
              
              {/* Top Row: Portrait + Identity */}
              <div className="flex items-start gap-4">
                <img
                  src={general.photoUrl}
                  alt={general.name}
                  className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl object-cover shrink-0 border border-amber-900/20 bg-amber-50 shadow-2xs"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="%23f7f4ee"/><circle cx="40" cy="32" r="14" fill="%2392400e"/><path d="M18 70c0-11 10-18 22-18s22 7 22 18" fill="%2392400e"/></svg>';
                  }}
                />
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">
                      {CATEGORY_LABELS[general.category]}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {general.youtubeVideoId && (
                        <span className="text-[10px] font-semibold text-red-700 bg-red-50 border border-red-200/70 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Play className="w-2.5 h-2.5 fill-red-600 text-red-600" />
                          <span>Audio Español</span>
                        </span>
                      )}
                      <span className="text-[10px] text-stone-400 font-mono">
                        {general.years}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 truncate">
                    {general.name}
                  </h3>
                  
                  <span className="text-xs font-serif italic text-amber-800 font-medium block truncate">
                    «{general.nickname}»
                  </span>

                  <span className="flex items-center gap-1 text-[11px] text-stone-500 truncate">
                    <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                    <span className="truncate">{general.country}</span>
                  </span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-stone-700 line-clamp-3 leading-relaxed">
                {general.summary}
              </p>

              {/* Quote Snippet */}
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/70 relative">
                <Quote className="w-4 h-4 text-amber-800/20 absolute right-2.5 top-2.5" />
                <p className="font-serif italic text-xs text-stone-800 line-clamp-2">
                  {general.famousQuote}
                </p>
              </div>

              {/* Key Scripture */}
              <div className="text-[11px] text-stone-500 flex items-center justify-between border-t border-stone-100 pt-2">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-amber-800" />
                  <span className="font-medium text-stone-700">{general.keyVerse.reference}</span>
                </span>
                <span className="text-emerald-700 font-semibold text-[10px] flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Historia Verificada</span>
                </span>
              </div>

            </div>

            {/* Bottom Actions Row */}
            <div className="px-5 py-3 bg-[#FAF8F5] border-t border-stone-200/80 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedGeneral(general)}
                className="flex-1 py-2 px-3 bg-amber-900 hover:bg-amber-950 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Leer Testimonio Completo</span>
              </button>

              {general.youtubeVideoId && (
                <button
                  onClick={() => setSelectedGeneral(general)}
                  className="py-2 px-3 bg-red-50 hover:bg-red-100/90 text-red-900 border border-red-200/90 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Ver video documental en audio español"
                >
                  <Play className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                  <span className="hidden sm:inline">Video Español</span>
                  <span className="sm:hidden">Video</span>
                </button>
              )}

              {general.tiktokSearchUrl && (
                <a
                  href={general.tiktokSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-2.5 bg-stone-900 hover:bg-black text-white rounded-xl text-[11px] font-medium flex items-center gap-1 transition-colors"
                  title="Ver clips en TikTok"
                >
                  <span className="font-bold">TikTok</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>

          </article>
        ))}
      </div>

      {filteredGenerals.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6 space-y-2">
          <p className="font-serif text-base text-stone-800 font-medium">
            No se encontraron generales que coincidan con "{searchQuery}"
          </p>
          <p className="text-xs text-stone-500">
            Intenta buscar por otro nombre, país o categoría.
          </p>
        </div>
      )}

      {/* Community Bridge Banner: "Carga tu propio testimonio" */}
      <div className="rounded-2xl border border-dashed border-amber-900/30 bg-amber-50/50 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
            ¿Tienes un testimonio del obrar de Dios en tu vida o iglesia?
          </h3>
          <p className="text-xs text-stone-600 max-w-lg">
            Así como Dios usó a los generales de la fe, Él sigue obrando milagros, provisión y sanidades hoy en nuestras familias.
          </p>
        </div>
        <button
          onClick={onOpenRecorder}
          className="w-full sm:w-auto px-5 py-2.5 bg-amber-900 hover:bg-amber-950 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-95 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Grabar Mi Testimonio</span>
        </button>
      </div>

      {/* Modal View */}
      {selectedGeneral && (
        <FaithGeneralModal
          general={selectedGeneral}
          onClose={() => setSelectedGeneral(null)}
          seniorMode={seniorMode}
        />
      )}

    </div>
  );
};
