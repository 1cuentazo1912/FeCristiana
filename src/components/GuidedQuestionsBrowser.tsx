import React, { useState } from 'react';
import { GUIDED_QUESTIONS, CATEGORY_LABELS } from '../data/guidedQuestions';
import { CategoryType, GuidedQuestion } from '../types';
import { Volume2, Mic, Sparkles, BookOpen, ChevronRight } from 'lucide-react';

interface GuidedQuestionsBrowserProps {
  onSelectQuestionForRecording: (questionId: string) => void;
  seniorMode: boolean;
}

export const GuidedQuestionsBrowser: React.FC<GuidedQuestionsBrowserProps> = ({
  onSelectQuestionForRecording,
  seniorMode
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const categories = [
    { key: 'all', label: 'Todas las Preguntas (15)' },
    { key: 'fe_en_las_pruebas', label: 'Fe en las Pruebas' },
    { key: 'familia', label: 'Familia' },
    { key: 'perdon', label: 'Perdón' },
    { key: 'llamado', label: 'Llamado' },
    { key: 'sanidad', label: 'Sanidad' },
    { key: 'provision', label: 'Provisión' }
  ];

  const filteredQuestions = activeCategory === 'all'
    ? GUIDED_QUESTIONS
    : GUIDED_QUESTIONS.filter(q => q.category === activeCategory);

  const handleSpeakQuestion = (q: GuidedQuestion) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (speakingId === q.id) {
        setSpeakingId(null);
        return;
      }
      setSpeakingId(q.id);
      const text = `${q.question}. Consejo: ${q.gentleHint}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.88;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Editorial Header */}
      <div className="bg-[#F7F4EE] border border-stone-300 rounded-2xl p-6 sm:p-8">
        <span className="text-xs font-semibold text-amber-900 uppercase tracking-widest block mb-1">
          Archivo Intergeneracional de Testimonios · Banco Homilético
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight">
          15 Preguntas Guía para Despertar Memorias Vivas
        </h1>
        <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          Diseñadas con sensibilidad pastoral para ayudar a los adultos mayores a recordar no solo los datos cronológicos, 
          sino la presencia viva del Espíritu Santo en momentos decisivos. Cada pregunta cuenta con lectura en voz alta para personas con fatiga visual.
        </p>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap pt-6 mt-4 border-t border-stone-200/80">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-amber-900 text-amber-50 shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Guided Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuestions.map((q, index) => {
          const isPlaying = speakingId === q.id;

          return (
            <div
              key={q.id}
              className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-900/40 transition-all shadow-xs"
            >
              <div>
                {/* Unboxed Metadata (Zero-pill) */}
                <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                  <span className="font-medium text-amber-900">
                    {q.categoryLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{q.anchorVerse.reference}</span>
                </div>

                {/* Question Text */}
                <h3 className={`font-serif font-semibold text-stone-900 mb-3 ${
                  seniorMode ? 'text-xl' : 'text-lg'
                } leading-snug`}>
                  "{q.question}"
                </h3>

                {/* Pastoral gentle hint */}
                <p className="text-xs text-stone-600 italic bg-amber-50/50 p-3 rounded-lg border border-amber-200/50 mb-4">
                  {q.gentleHint}
                </p>

                {/* Biblical anchor text */}
                <div className="text-[11px] text-stone-600 mb-4">
                  <span className="font-semibold text-stone-800 block mb-0.5">Versículo Ancla:</span>
                  <span className="font-serif italic text-stone-700">"{q.anchorVerse.text}"</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleSpeakQuestion(q)}
                  className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    isPlaying 
                      ? 'bg-amber-100 text-amber-900 font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                  title="Escuchar la pregunta leída en voz alta"
                >
                  <Volume2 className="w-4 h-4 text-amber-800" />
                  <span>{isPlaying ? 'Detener voz' : 'Escuchar'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectQuestionForRecording(q.id)}
                  className="px-3.5 py-2 bg-amber-900 hover:bg-amber-800 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Grabar con esta</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
