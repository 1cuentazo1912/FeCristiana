import React, { useState } from 'react';
import { FaithGeneral } from '../types';
import { CATEGORY_LABELS } from '../data/guidedQuestions';
import { 
  X, 
  Play, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  MapPin, 
  Clock, 
  Share2, 
  Check, 
  Quote,
  Flame,
  Tv
} from 'lucide-react';

interface FaithGeneralModalProps {
  general: FaithGeneral;
  onClose: () => void;
  seniorMode: boolean;
}

export const FaithGeneralModal: React.FC<FaithGeneralModalProps> = ({
  general,
  onClose,
  seniorMode
}) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `${general.name} (${general.nickname}) - Generales de la Fe\n${general.famousQuote}\nEnlace: ${window.location.href}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-xs p-0 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="general-modal-title"
    >
      <div 
        className="bg-[#FBF9F5] w-full max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-amber-900/10 max-h-[92vh] flex flex-col my-auto"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 bg-[#F5F2EA] sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-[11px] font-bold text-amber-950 uppercase tracking-wider">
              Generales de la Fe · Historia Cristiana
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-200/60 transition-colors cursor-pointer"
              title="Compartir o copiar"
              aria-label="Compartir testimonio"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-200/60 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* Hero Portrait & Biographical Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs">
            <div className="relative shrink-0">
              <img
                src={general.photoUrl}
                alt={general.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-amber-800/30 shadow-md bg-amber-100"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f7f4ee"/><circle cx="50" cy="40" r="18" fill="%2392400e"/><path d="M22 86c0-14 12-24 28-24s28 10 28 24" fill="%2392400e"/></svg>';
                }}
              />
              <span className="absolute -bottom-2 -right-2 bg-amber-900 text-amber-50 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                {CATEGORY_LABELS[general.category]}
              </span>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <span className="text-xs font-serif italic text-amber-800 font-medium">
                {general.nickname}
              </span>
              <h2 id="general-modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {general.name}
              </h2>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-stone-600 pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  {general.years}
                </span>
                <span className="text-stone-300">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  {general.country}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 pt-2 font-medium">
                {general.summary}
              </p>
            </div>
          </div>

          {/* Video Documentary Section (Verified YouTube Embed with Spanish Audio) */}
          {general.youtubeVideoId && (
            <div className="bg-stone-900 text-stone-100 rounded-2xl overflow-hidden shadow-md">
              <div className="px-4 py-2.5 bg-stone-950/80 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-300 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <Tv className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="font-semibold text-white">Documental en Audio Español</span>
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-600/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {general.videoLanguage || 'Audio Español Latino'}
                  </span>
                </div>
                <a
                  href={general.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-stone-200 flex items-center gap-1 text-[11px] underline ml-auto"
                >
                  <span>Abrir en YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {isPlayingVideo ? (
                <div className="relative aspect-video w-full bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${general.youtubeVideoId}?autoplay=1&rel=0`}
                    title={general.videoTitle || `Documental sobre ${general.name}`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div 
                  className="relative aspect-video w-full bg-stone-950 flex flex-col items-center justify-center p-6 text-center group cursor-pointer overflow-hidden"
                  onClick={() => setIsPlayingVideo(true)}
                >
                  {/* Subtle background glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col items-center max-w-md">
                    <div className="w-16 h-16 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 mb-3">
                      <Play className="w-7 h-7 fill-white ml-1" />
                    </div>
                    <span className="font-semibold text-white text-sm sm:text-base leading-snug">
                      {general.videoTitle || `Reproducir Documental Histórico de ${general.name}`}
                    </span>
                    {general.videoChannel && (
                      <span className="text-xs text-amber-400/90 mt-1 font-medium">
                        Canal: {general.videoChannel} · Audio Español
                      </span>
                    )}
                    <span className="text-[11px] text-stone-400 mt-2 bg-stone-900/80 px-3 py-1 rounded-full border border-stone-800">
                      Toca para reproducir directamente en la app
                    </span>
                  </div>
                </div>
              )}

              {/* Video Title Bar below iframe when playing */}
              {isPlayingVideo && general.videoTitle && (
                <div className="px-4 py-2 bg-stone-950 border-t border-stone-800/80 text-[11px] text-stone-300 flex items-center justify-between">
                  <span className="truncate font-medium text-stone-200">
                    {general.videoTitle}
                  </span>
                  {general.videoChannel && (
                    <span className="text-stone-400 shrink-0 ml-2">
                      ({general.videoChannel})
                    </span>
                  )}
                </div>
              )}

              {/* TikTok Short Clips Link */}
              {general.tiktokSearchUrl && (
                <div className="px-4 py-2.5 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-400 flex items-center gap-1.5">
                    <span className="font-bold text-stone-200">TikTok:</span> ¿Prefieres clips cortos para jóvenes?
                  </span>
                  <a
                    href={general.tiktokSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-[11px] font-medium transition-colors"
                  >
                    <span>Ver en TikTok</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Famous Quote Card */}
          <div className="p-5 bg-amber-50/70 border border-amber-200/70 rounded-2xl relative">
            <Quote className="w-7 h-7 text-amber-800/20 absolute right-4 top-4" />
            <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest block mb-1">
              Frase Célebre de Fe
            </span>
            <p className="font-serif italic text-base sm:text-lg text-stone-900 leading-snug">
              {general.famousQuote}
            </p>
          </div>

          {/* Christian Life Testimony */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-serif font-semibold text-lg border-b border-stone-200 pb-2">
              <BookOpen className="w-5 h-5 text-amber-800" />
              <h3>Testimonio de su Vida Cristiana y Llamado</h3>
            </div>
            <div className={`space-y-3 text-stone-800 leading-relaxed ${
              seniorMode ? 'text-lg leading-loose' : 'text-sm sm:text-base'
            }`}>
              {general.christianLifeTestimony.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-justify font-normal">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Miracles & Legacy */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-stone-900 font-serif font-semibold text-base">
              <Flame className="w-4 h-4 text-amber-800" />
              <h4>Hitos y Legado Espiritual</h4>
            </div>
            <ul className="space-y-2">
              {general.keyMiraclesOrLegacy.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 bg-white p-3 rounded-xl border border-stone-200">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Scripture */}
          <div className="bg-[#FAF7EE] border border-stone-300 rounded-xl p-4 space-y-1">
            <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
              Versículo Ancla de su Ministerio
            </span>
            <p className="font-serif italic text-sm text-stone-900">
              «{general.keyVerse.text}»
            </p>
            <span className="text-xs font-semibold text-amber-900 block text-right">
              — {general.keyVerse.reference}
            </span>
          </div>

        </div>

        {/* Footer Close Button */}
        <div className="p-4 bg-[#F5F2EA] border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
