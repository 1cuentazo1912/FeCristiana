import React, { useState } from 'react';
import { Testimony } from '../types';
import { CATEGORY_LABELS } from '../data/guidedQuestions';
import { AudioPlayerCustom } from './AudioPlayerCustom';
import { 
  ShieldCheck, 
  Check, 
  RotateCcw, 
  Volume2, 
  UserCheck, 
  Clock, 
  Lock, 
  Globe, 
  Church, 
  BookOpen,
  Filter
} from 'lucide-react';

interface PastoralModerationProps {
  testimonies: Testimony[];
  onApproveTestimony: (id: string, notes?: string) => void;
  onRejectOrReturnTestimony: (id: string, notes: string) => void;
  seniorMode: boolean;
}

export const PastoralModeration: React.FC<PastoralModerationProps> = ({
  testimonies,
  onApproveTestimony,
  onRejectOrReturnTestimony,
  seniorMode
}) => {
  const [filterStatus, setFilterStatus] = useState<'pending' | 'approved' | 'all'>('pending');
  const [selectedForReview, setSelectedForReview] = useState<Testimony | null>(
    testimonies.find(t => t.status === 'pending_moderation') || testimonies[0] || null
  );
  const [pastorNote, setPastorNote] = useState<string>('Testimonio bíblicamente sano y de gran edificación para la juventud.');

  const pendingList = testimonies.filter(t => t.status === 'pending_moderation');
  const approvedList = testimonies.filter(t => t.status === 'approved');

  const displayedList = filterStatus === 'pending'
    ? pendingList
    : filterStatus === 'approved'
    ? approvedList
    : testimonies;

  const handleApprove = (testimony: Testimony) => {
    onApproveTestimony(testimony.id, pastorNote);
  };

  const handleReturn = (testimony: Testimony) => {
    onRejectOrReturnTestimony(testimony.id, pastorNote || 'Por favor revisar mención de nombres privados antes de publicar.');
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      
      {/* Header bar */}
      <div className="bg-[#F7F4EE] border border-stone-300 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Mesa de Cuidado Pastoral y Moderación</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
            Aprobación Pastoral de Testimonios
          </h1>
          <p className="text-xs text-stone-600 mt-1 max-w-2xl">
            Cada testimonio es una herencia de fe. Como líderes pastorales, revisamos la edificación doctrinal, 
            el cuidado de la honra de las personas mencionadas y el respeto a la privacidad escogida por el autor.
          </p>
        </div>

        {/* Counter badge */}
        <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-stone-200 shadow-xs">
          <div className="text-center">
            <div className="font-mono text-2xl font-bold text-amber-900 tabular-nums">
              {pendingList.length}
            </div>
            <div className="text-[10px] uppercase font-semibold text-stone-500">
              Pendientes
            </div>
          </div>
          <div className="h-8 w-px bg-stone-200" />
          <div className="text-center">
            <div className="font-mono text-2xl font-bold text-emerald-800 tabular-nums">
              {approvedList.length}
            </div>
            <div className="text-[10px] uppercase font-semibold text-stone-500">
              Publicados
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left List / Right Review Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: List of submissions */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Segmented Filter */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/60 rounded-lg text-xs">
            <button
              onClick={() => setFilterStatus('pending')}
              className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                filterStatus === 'pending'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Pendientes ({pendingList.length})
            </button>
            <button
              onClick={() => setFilterStatus('approved')}
              className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                filterStatus === 'approved'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Publicados ({approvedList.length})
            </button>
            <button
              onClick={() => setFilterStatus('all')}
              className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Todos ({testimonies.length})
            </button>
          </div>

          {/* List Cards */}
          <div className="space-y-3">
            {displayedList.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-stone-200 text-stone-500 text-sm">
                No hay testimonios en esta bandeja.
              </div>
            ) : (
              displayedList.map((testimony) => {
                const isSelected = selectedForReview?.id === testimony.id;
                const isPending = testimony.status === 'pending_moderation';

                return (
                  <div
                    key={testimony.id}
                    onClick={() => setSelectedForReview(testimony)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-amber-900 shadow-sm ring-1 ring-amber-900/10'
                        : 'bg-white/80 hover:bg-white border-stone-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="text-xs text-stone-500">
                        <span>{CATEGORY_LABELS[testimony.category]}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{Math.round(testimony.durationSeconds / 60)} min</span>
                      </div>

                      {isPending ? (
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                          Pendiente
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Aprobado
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-semibold text-stone-900 text-sm line-clamp-2">
                      {testimony.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-stone-600 mt-2">
                      <span className="font-medium text-stone-800">{testimony.authorName}</span>
                      <span>({testimony.authorAge} años)</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-900">{testimony.yearsInFaith} años de fe</span>
                    </div>

                    {testimony.recordedWithHelper && (
                      <div className="text-[11px] text-stone-500 mt-1">
                        Grabado con: {testimony.helperName}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Right column: Detailed Review View */}
        <div className="lg:col-span-7">
          {selectedForReview ? (
            <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <div className="text-xs text-stone-500 mb-1">
                    <span>{CATEGORY_LABELS[selectedForReview.category]}</span>
                    <span aria-hidden="true"> · </span>
                    <span>Enviado el {selectedForReview.createdAt}</span>
                    <span aria-hidden="true"> · </span>
                    <span>Permiso: {
                      selectedForReview.privacy === 'public' ? 'Público general' :
                      selectedForReview.privacy === 'church' ? 'Solo esta iglesia' : 'Privado familiar'
                    }</span>
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-stone-900">
                    {selectedForReview.title}
                  </h2>
                  <div className="text-sm text-stone-700 mt-1">
                    <strong>{selectedForReview.authorName}</strong> ({selectedForReview.authorAge} años) · {selectedForReview.churchName}
                  </div>
                </div>

                <div className="shrink-0">
                  <img
                    src={selectedForReview.photoUrl}
                    alt={selectedForReview.authorName}
                    className="w-16 h-16 rounded-full object-cover border border-stone-300 bg-amber-50"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="%23f7f4ee"/><circle cx="32" cy="26" r="10" fill="%2392400e"/><path d="M15 54c0-9.5 8-15 17-15s17 5.5 17 15" fill="%2392400e"/></svg>';
                    }}
                  />
                </div>
              </div>

              {/* Guided question */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
                <span className="text-[11px] font-semibold text-amber-900 uppercase tracking-wider block mb-0.5">
                  Pregunta Guía
                </span>
                <p className="font-serif text-base text-stone-900 italic">
                  "{selectedForReview.guidedQuestion}"
                </p>
              </div>

              {/* Audio Review Player */}
              <div>
                <span className="text-xs font-semibold text-stone-700 block mb-2">
                  Audición Pastoral del Registro
                </span>
                <AudioPlayerCustom
                  id={selectedForReview.id}
                  title={selectedForReview.title}
                  author={selectedForReview.authorName}
                  durationSeconds={selectedForReview.durationSeconds}
                  textToSpeak={selectedForReview.transcript}
                  audioUrl={selectedForReview.audioUrl}
                  seniorMode={seniorMode}
                />
              </div>

              {/* Transcript Verification */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-700">
                    Transcripción del Audio
                  </span>
                  <span className="text-xs text-emerald-800 flex items-center gap-1 font-medium">
                    <Check className="w-3.5 h-3.5" />
                    Transcripción generada
                  </span>
                </div>
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs leading-relaxed text-stone-800 font-serif max-h-48 overflow-y-auto">
                  {selectedForReview.transcript}
                </div>
              </div>

              {/* Pastor verification actions */}
              <div className="pt-4 border-t border-stone-200 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Nota Pastoral / Comentario de Aprobación:
                  </label>
                  <input
                    type="text"
                    value={pastorNote}
                    onChange={(e) => setPastorNote(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-stone-50 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleReturn(selectedForReview)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg border border-stone-300 transition-colors"
                  >
                    Devolver para Ajustes de Privacidad
                  </button>

                  {selectedForReview.status === 'pending_moderation' ? (
                    <button
                      type="button"
                      onClick={() => handleApprove(selectedForReview)}
                      className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Aprobar y Publicar en la Iglesia</span>
                    </button>
                  ) : (
                    <div className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                      <Check className="w-4 h-4 text-emerald-700" />
                      <span>Publicado bajo cuidado pastoral</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-stone-500">
              Selecciona un testimonio a la izquierda para escuchar y revisar.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
