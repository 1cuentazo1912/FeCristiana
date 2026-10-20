import React, { useState } from 'react';
import { ARCHIVE_DELIVERABLES } from '../data/deliverables';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Compass 
} from 'lucide-react';

interface ProductDossierProps {
  onGoToSection: (tab: 'archive' | 'record' | 'questions' | 'pastoral') => void;
}

export const ProductDossier: React.FC<ProductDossierProps> = ({ onGoToSection }) => {
  const [activeDeliverableId, setActiveDeliverableId] = useState<string>(ARCHIVE_DELIVERABLES[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  const currentDeliverable = ARCHIVE_DELIVERABLES.find(d => d.id === activeDeliverableId) || ARCHIVE_DELIVERABLES[0];

  const handleCopyFullDossier = () => {
    const fullText = ARCHIVE_DELIVERABLES.map(d => {
      return `=====================================================\nENTREGABLE ${d.number}: ${d.title.toUpperCase()}\n${d.subtitle}\n=====================================================\n\n${d.content}\n\n`;
    }).join('\n');

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleDownloadMarkdown = () => {
    const fullText = ARCHIVE_DELIVERABLES.map(d => {
      return `# Entregable ${d.number}: ${d.title}\n*${d.subtitle}*\n\n${d.content}\n\n---\n`;
    }).join('\n');

    const blob = new Blob([fullText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Legado_de_Fe_Dossier_Diseno_y_Estrategia.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Editorial Title Banner */}
      <div className="bg-[#F7F4EE] border border-stone-300 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold text-amber-900 uppercase tracking-widest block mb-1">
            Diseño de Producto & Archivística Comunitaria Eclesial
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight">
            Dossier Ejecutivo: Los 7 Entregables de la App
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Estrategia de diseño, accesibilidad cognitiva para personas mayores de 75 años, 
            políticas de privacidad pastoral, banco de 15 preguntas y plan de adopción comunitaria.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleCopyFullDossier}
            className="px-4 py-2.5 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold rounded-lg border border-stone-300 shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '¡Copiado al Portapapeles!' : 'Copiar Todo el Dossier'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="px-4 py-2.5 bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Descargar .MD</span>
          </button>
        </div>
      </div>

      {/* Two Column Layout: Navigation Rail & Reading Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Rail */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-3 space-y-1 shadow-xs sticky top-28">
          <div className="px-3 py-2 text-xs font-semibold text-stone-400 uppercase tracking-wider">
            Índice de Entregables
          </div>

          {ARCHIVE_DELIVERABLES.map((deliv) => {
            const isCurrent = deliv.id === activeDeliverableId;
            return (
              <button
                key={deliv.id}
                onClick={() => setActiveDeliverableId(deliv.id)}
                className={`w-full text-left px-3.5 py-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 ${
                  isCurrent
                    ? 'bg-amber-900 text-amber-50 font-medium shadow-xs'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span className={`font-mono text-xs font-bold pt-0.5 ${isCurrent ? 'text-amber-200' : 'text-amber-900'}`}>
                  {deliv.number}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate">
                    {deliv.title}
                  </div>
                  <div className={`text-[11px] truncate ${isCurrent ? 'text-amber-100/80' : 'text-stone-500'}`}>
                    {deliv.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Reading Canvas */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs space-y-6">
          
          {/* Header of Section */}
          <div className="border-b border-stone-200 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-900 font-semibold mb-1">
              <span>ENTREGABLE {currentDeliverable.number}</span>
              <span aria-hidden="true">·</span>
              <span>DOCUMENTO DE ARQUITECTURA</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight">
              {currentDeliverable.title}
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              {currentDeliverable.subtitle}
            </p>
          </div>

          {/* Formatted Content */}
          <div className="prose prose-stone max-w-none text-stone-800 text-sm sm:text-base leading-relaxed space-y-4">
            {currentDeliverable.content.split('\n\n').map((block, idx) => {
              if (block.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-serif text-xl font-bold text-stone-900 pt-3 pb-1 border-b border-stone-100">
                    {block.replace('### ', '')}
                  </h3>
                );
              }
              if (block.startsWith('#### ')) {
                return (
                  <h4 key={idx} className="font-serif text-base font-bold text-stone-800 pt-2 text-amber-900">
                    {block.replace('#### ', '')}
                  </h4>
                );
              }
              if (block.startsWith('> ')) {
                return (
                  <blockquote key={idx} className="bg-amber-50/70 border-l-4 border-amber-800 p-4 rounded-r-lg font-serif italic text-stone-800 my-4">
                    {block.replace('> ', '')}
                  </blockquote>
                );
              }
              if (block.startsWith('---')) {
                return <hr key={idx} className="border-stone-200 my-6" />;
              }
              return (
                <p key={idx} className="text-stone-700 leading-relaxed whitespace-pre-line">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Interactive Bridge to Try in the App */}
          <div className="mt-8 pt-6 border-t border-stone-200 bg-[#F7F4EE] -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 p-6 sm:p-8 rounded-b-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-amber-900 uppercase tracking-wider mb-0.5">
                Experiencia en Vivo
              </div>
              <div className="text-xs text-stone-600">
                Prueba cómo este principio de diseño funciona en la app interactiva.
              </div>
            </div>

            <div className="flex items-center gap-2">
              {currentDeliverable.number === '02' || currentDeliverable.number === '03' ? (
                <button
                  onClick={() => onGoToSection('record')}
                  className="px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Probar Grabador Senior</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : currentDeliverable.number === '04' ? (
                <button
                  onClick={() => onGoToSection('questions')}
                  className="px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Ver las 15 Preguntas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => onGoToSection('archive')}
                  className="px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Explorar Archivo Vivo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
