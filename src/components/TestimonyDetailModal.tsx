import React, { useState } from 'react';
import { Testimony, YouthResponse } from '../types';
import { CATEGORY_LABELS } from '../data/guidedQuestions';
import { AudioPlayerCustom } from './AudioPlayerCustom';
import { 
  X, 
  Heart, 
  MessageSquare, 
  Send, 
  BookOpen, 
  Users, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface TestimonyDetailModalProps {
  testimony: Testimony;
  onClose: () => void;
  onAddResponse: (testimonyId: string, response: Omit<YouthResponse, 'id' | 'createdAt'>) => void;
  onPray: (testimonyId: string) => void;
  seniorMode: boolean;
}

export const TestimonyDetailModal: React.FC<TestimonyDetailModalProps> = ({
  testimony,
  onClose,
  onAddResponse,
  onPray,
  seniorMode
}) => {
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'huge'>(seniorMode ? 'large' : 'normal');
  const [responseType, setResponseType] = useState<'prayer' | 'gratitude' | 'question'>('gratitude');
  const [authorName, setAuthorName] = useState('');
  const [authorAge, setAuthorAge] = useState<number | ''>('');
  const [content, setContent] = useState('');
  const [hasPrayed, setHasPrayed] = useState(false);
  const [showThankYouNotice, setShowThankYouNotice] = useState(false);

  const handlePrayClick = () => {
    if (!hasPrayed) {
      onPray(testimony.id);
      setHasPrayed(true);
    }
  };

  const handleSubmitResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    onAddResponse(testimony.id, {
      authorName: authorName.trim(),
      authorAge: authorAge ? Number(authorAge) : undefined,
      type: responseType,
      content: content.trim()
    });

    setContent('');
    setShowThankYouNotice(true);
    setTimeout(() => setShowThankYouNotice(false), 4000);
  };

  const getFontSizeClass = () => {
    switch (fontSizeLevel) {
      case 'huge':
        return 'text-2xl leading-relaxed';
      case 'large':
        return 'text-xl leading-relaxed';
      case 'normal':
      default:
        return 'text-base leading-relaxed';
    }
  };

  const privacyLabel = {
    public: 'Público para toda la comunidad',
    church: 'Solo miembros de esta congregación',
    family: 'Privado para la familia'
  }[testimony.privacy];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center sm:p-4">
      <div 
        className="bg-[#FBF9F5] border border-stone-200 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[95vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />

        {/* Top bar modal */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-stone-200 bg-[#F7F4EE]">
          <div className="flex items-center gap-1.5 text-xs text-stone-600 truncate">
            <span className="font-semibold text-amber-900 truncate">{CATEGORY_LABELS[testimony.category] || testimony.category}</span>
            <span aria-hidden="true">·</span>
            <span className="shrink-0">{Math.round(testimony.durationSeconds / 60)} min</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
              {privacyLabel}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Font size adjustment */}
            <div className="flex items-center gap-1 bg-stone-200/70 p-0.5 rounded-md text-xs">
              <button
                onClick={() => setFontSizeLevel('normal')}
                className={`px-2 py-0.5 rounded ${fontSizeLevel === 'normal' ? 'bg-white font-bold shadow-xs' : 'text-stone-600'}`}
                title="Texto normal"
              >
                A
              </button>
              <button
                onClick={() => setFontSizeLevel('large')}
                className={`px-2 py-0.5 rounded ${fontSizeLevel === 'large' ? 'bg-white font-bold shadow-xs' : 'text-stone-600'}`}
                title="Texto grande"
              >
                A+
              </button>
              <button
                onClick={() => setFontSizeLevel('huge')}
                className={`px-2 py-0.5 rounded ${fontSizeLevel === 'huge' ? 'bg-white font-bold shadow-xs' : 'text-stone-600'}`}
                title="Texto muy grande para mayores"
              >
                A++
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-200 transition-colors"
              aria-label="Cerrar testimonio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal scrollable body */}
        <div className="overflow-y-auto px-4 sm:px-6 py-5 space-y-6">
          
          {/* Elder Profile Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={testimony.photoUrl}
              alt={testimony.authorName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-stone-300 shadow-sm shrink-0 bg-amber-50"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><circle cx="48" cy="48" r="48" fill="%23f7f4ee"/><circle cx="48" cy="38" r="16" fill="%2392400e"/><path d="M22 80c0-14 12-22 26-22s26 8 26 22" fill="%2392400e"/></svg>';
              }}
            />
            <div className="flex-1">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight">
                {testimony.title}
              </h2>
              
              <div className="flex items-center flex-wrap gap-2 text-stone-600 text-sm mt-1">
                <span className="font-semibold text-stone-800">{testimony.authorName}</span>
                <span aria-hidden="true">·</span>
                {testimony.biographicalYears ? (
                  <>
                    <span className="text-stone-800">{testimony.biographicalYears}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-900 font-medium">{testimony.countryOrCity}</span>
                  </>
                ) : (
                  <>
                    <span>{testimony.authorAge} años</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-900 font-medium">{testimony.yearsInFaith} años en la fe</span>
                    <span aria-hidden="true">·</span>
                    <span>{testimony.churchName}</span>
                  </>
                )}
              </div>

              {testimony.isHistoricalVerified && (
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-100/70 px-2.5 py-0.5 rounded-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Caso Verídico Histórico Documentado</span>
                </div>
              )}

              {testimony.recordedWithHelper && testimony.helperName && (
                <p className="text-xs text-stone-500 mt-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-800" />
                  <span>Grabado en Modo Acompañado con el apoyo de <strong>{testimony.helperName}</strong></span>
                </p>
              )}
            </div>
          </div>

          {/* Historical Source Citation Banner */}
          {testimony.isHistoricalVerified && testimony.sourceCitation && (
            <div className="bg-stone-100/80 border border-stone-300 rounded-xl p-4 flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
              <div className="text-xs text-stone-700">
                <strong className="block text-stone-900 font-semibold mb-0.5">Fuente y Archivo Histórico Verificado:</strong>
                <span>{testimony.sourceCitation}</span>
              </div>
            </div>
          )}

          {/* Guided Question Highlight */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4">
            <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider block mb-1">
              Pregunta Guía de Memoria
            </span>
            <p className="font-serif text-lg text-amber-950 italic">
              "{testimony.guidedQuestion}"
            </p>
          </div>

          {/* Audio Player Component */}
          <div>
            <AudioPlayerCustom
              id={testimony.id}
              title={testimony.title}
              author={testimony.authorName}
              durationSeconds={testimony.durationSeconds}
              textToSpeak={testimony.transcript}
              audioUrl={testimony.audioUrl}
              seniorMode={seniorMode}
            />
          </div>

          {/* Synchronized Transcript */}
          <div className="border-t border-stone-200 pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-xl font-semibold text-stone-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-800" />
                Transcripción Completa del Testimonio
              </h3>
              <span className="text-xs text-stone-500">
                Transcripción automática verificada
              </span>
            </div>

            <div className={`text-stone-800 font-serif ${getFontSizeClass()} bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4 max-w-none`}>
              {testimony.transcript.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className={idx === 0 ? "first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-amber-900" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Suggested Scripture Verses */}
          {testimony.verses && testimony.verses.length > 0 && (
            <div className="bg-[#F7F4EE] rounded-xl p-5 border border-stone-300/80 space-y-3">
              <h4 className="text-sm font-semibold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-800" />
                Versículos Bíblicos de Confirmación y Esperanza
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {testimony.verses.map((v, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
                    <span className="text-xs font-bold text-amber-900 block mb-1">
                      {v.reference}
                    </span>
                    <p className="font-serif text-sm text-stone-700 italic">
                      "{v.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prayer Counter & Youth Engagement Section */}
          <div className="border-t border-stone-200 pt-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-amber-50/60 p-4 rounded-xl border border-amber-200/60">
              <div>
                <h4 className="font-serif text-lg font-semibold text-stone-900">
                  Respaldo de Oración de la Comunidad
                </h4>
                <p className="text-xs text-stone-600">
                  {testimony.prayersCount} {testimony.prayersCount === 1 ? 'persona se ha' : 'personas se han'} unido en oración por este testimonio
                </p>
              </div>

              <button
                onClick={handlePrayClick}
                disabled={hasPrayed}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${
                  hasPrayed
                    ? 'bg-emerald-700 text-white'
                    : 'bg-amber-900 text-amber-50 hover:bg-amber-800 active:scale-95 shadow-sm'
                }`}
              >
                {hasPrayed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>¡Te uniste en oración!</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-amber-100/20" />
                    <span>Me uno en oración por este hermano/a</span>
                  </>
                )}
              </button>
            </div>

            {/* Youth Interaction: Ask question or Leave gratitude */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
              <h4 className="font-serif text-lg font-semibold text-stone-900 mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-800" />
                Interacción de Jóvenes y Familiares
              </h4>
              <p className="text-xs text-stone-600 mb-4">
                Deja una pregunta sincera o un agradecimiento. Los familiares o el equipo pastoral compartirán tus palabras con el autor.
              </p>

              {showThankYouNotice && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tu mensaje ha sido registrado con amor y será compartido con {testimony.authorName}.</span>
                </div>
              )}

              <form onSubmit={handleSubmitResponse} className="space-y-4">
                {/* Segmented type selector */}
                <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-lg text-xs w-fit">
                  <button
                    type="button"
                    onClick={() => setResponseType('gratitude')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                      responseType === 'gratitude' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Dar Gracias
                  </button>
                  <button
                    type="button"
                    onClick={() => setResponseType('prayer')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                      responseType === 'prayer' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Oración Escrita
                  </button>
                  <button
                    type="button"
                    onClick={() => setResponseType('question')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                      responseType === 'question' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Pregunta de Fe
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Tu Nombre
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Lucas Arismendi"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-800 bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Tu Edad (Opcional)
                    </label>
                    <input
                      type="number"
                      placeholder="Ej. 22"
                      value={authorAge}
                      onChange={(e) => setAuthorAge(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-800 bg-stone-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    {responseType === 'gratitude' && 'Tu mensaje de gratitud y bendición'}
                    {responseType === 'prayer' && 'Tu oración por la vida del hermano/a'}
                    {responseType === 'question' && '¿Qué pregunta espiritual te gustaría hacerle sobre este tema?'}
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Escribe con respeto y amor cristiano..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-800 bg-stone-50"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 text-sm font-medium bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Mensaje</span>
                  </button>
                </div>
              </form>

              {/* List of responses */}
              {testimony.responses && testimony.responses.length > 0 && (
                <div className="mt-6 pt-4 border-t border-stone-200 space-y-4">
                  <h5 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Mensajes y Oraciones de la Comunidad ({testimony.responses.length})
                  </h5>
                  
                  <div className="space-y-3">
                    {testimony.responses.map((resp) => (
                      <div key={resp.id} className="bg-stone-50 rounded-lg p-3.5 border border-stone-200">
                        <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-stone-800">{resp.authorName}</span>
                            {resp.authorAge && <span>({resp.authorAge} años)</span>}
                            <span aria-hidden="true">·</span>
                            <span className="text-amber-900">
                              {resp.type === 'prayer' && 'Oración'}
                              {resp.type === 'gratitude' && 'Agradecimiento'}
                              {resp.type === 'question' && 'Pregunta'}
                            </span>
                          </div>
                          <span>{resp.createdAt}</span>
                        </div>
                        <p className="text-sm text-stone-700">
                          {resp.content}
                        </p>

                        {/* Pastoral or elder reply */}
                        {resp.replies && resp.replies.map((reply) => (
                          <div key={reply.id} className="mt-2.5 pl-3 border-l-2 border-amber-800/60 bg-amber-50/50 p-2 rounded-r text-xs">
                            <div className="font-semibold text-amber-950 mb-0.5">
                              {reply.authorName}
                            </div>
                            <p className="text-stone-700 italic">
                              "{reply.content}"
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Modal footer close */}
        <div className="px-6 py-3 border-t border-stone-200 bg-[#F7F4EE] flex justify-between items-center text-xs text-stone-500">
          <span>Legado de Fe · Archivo Patrimonial Eclesial</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 text-stone-800 rounded-lg hover:bg-stone-300 font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
