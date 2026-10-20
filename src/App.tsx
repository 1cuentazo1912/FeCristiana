import React, { useState, useEffect } from 'react';
import { Testimony, YouthResponse } from './types';
import { INITIAL_TESTIMONIES } from './data/seedData';
import { Header } from './components/Header';
import { TestimoniesFeed } from './components/TestimoniesFeed';
import { TestimonyDetailModal } from './components/TestimonyDetailModal';
import { RecordingStudio } from './components/RecordingStudio';
import { GuidedQuestionsBrowser } from './components/GuidedQuestionsBrowser';
import { PastoralModeration } from './components/PastoralModeration';
import { ProductDossier } from './components/ProductDossier';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MiniPlayerBar } from './components/MiniPlayerBar';
import { FaithGeneralsSection } from './components/FaithGeneralsSection';
import { globalAudioPlayer } from './utils/audioPlayerService';

export default function App() {
  const [activeTab, setActiveTab] = useState<'archive' | 'generales' | 'record' | 'questions' | 'pastoral' | 'dossier'>('archive');
  const [seniorMode, setSeniorMode] = useState<boolean>(false);
  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null);
  const [preselectedQuestionId, setPreselectedQuestionId] = useState<string | null>(null);
  
  // Persistent mobile mini player state
  const [activePlayingTestimony, setActivePlayingTestimony] = useState<Testimony | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Persistent testimonies in localStorage with fallback and merge with INITIAL_TESTIMONIES
  const [testimonies, setTestimonies] = useState<Testimony[]>(() => {
    try {
      const stored = localStorage.getItem('legado_de_fe_testimonies');
      if (stored) {
        const parsed: Testimony[] = JSON.parse(stored);
        // Ensure all verified historical testimonies exist in state
        const storedIds = new Set(parsed.map(t => t.id));
        const missingInitial = INITIAL_TESTIMONIES.filter(t => !storedIds.has(t.id));
        if (missingInitial.length > 0) {
          return [...INITIAL_TESTIMONIES.filter(t => t.isHistoricalVerified), ...parsed.filter(t => !t.isHistoricalVerified)];
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return INITIAL_TESTIMONIES;
  });

  // Subscribe to globalAudioPlayer to synchronize audio playback across cards, modal, and mini-player
  useEffect(() => {
    const unsubscribe = globalAudioPlayer.subscribe((state) => {
      setIsPlayingAudio(state.isPlaying);
      if (state.testimonyId) {
        const found = testimonies.find(t => t.id === state.testimonyId);
        if (found) {
          setActivePlayingTestimony(found);
        }
      }
    });
    return unsubscribe;
  }, [testimonies]);

  useEffect(() => {
    try {
      localStorage.setItem('legado_de_fe_testimonies', JSON.stringify(testimonies));
    } catch (e) {
      console.warn('Could not write to localStorage', e);
    }
  }, [testimonies]);

  // Count pending moderation items
  const pendingCount = testimonies.filter(t => t.status === 'pending_moderation').length;

  // Handlers
  const handleSelectTestimony = (t: Testimony) => {
    setSelectedTestimony(t);
  };

  const handleCloseModal = () => {
    setSelectedTestimony(null);
  };

  const handlePray = (testimonyId: string) => {
    setTestimonies(prev => prev.map(t => {
      if (t.id === testimonyId) {
        return { ...t, prayersCount: t.prayersCount + 1 };
      }
      return t;
    }));

    if (selectedTestimony && selectedTestimony.id === testimonyId) {
      setSelectedTestimony(prev => prev ? { ...prev, prayersCount: prev.prayersCount + 1 } : null);
    }
  };

  const handleAddResponse = (testimonyId: string, responseData: Omit<YouthResponse, 'id' | 'createdAt'>) => {
    const newResponse: YouthResponse = {
      ...responseData,
      id: `resp-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTestimonies(prev => prev.map(t => {
      if (t.id === testimonyId) {
        return {
          ...t,
          responses: [newResponse, ...t.responses]
        };
      }
      return t;
    }));

    if (selectedTestimony && selectedTestimony.id === testimonyId) {
      setSelectedTestimony(prev => prev ? {
        ...prev,
        responses: [newResponse, ...prev.responses]
      } : null);
    }
  };

  const handleTestimonyCreated = (newTestimony: Testimony) => {
    setTestimonies(prev => [newTestimony, ...prev]);
  };

  const handleApproveTestimony = (id: string, notes?: string) => {
    setTestimonies(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: 'approved',
          moderatedBy: 'Equipo Pastoral',
          moderationNotes: notes
        };
      }
      return t;
    }));
  };

  const handleRejectOrReturnTestimony = (id: string, notes: string) => {
    setTestimonies(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: 'draft',
          moderationNotes: notes
        };
      }
      return t;
    }));
  };

  const handleSelectQuestionForRecording = (questionId: string) => {
    setPreselectedQuestionId(questionId);
    setActiveTab('record');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-[#FBF9F5] text-stone-900 flex flex-col ${
      seniorMode ? 'text-lg' : 'text-base'
    }`}>
      
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        pendingCount={pendingCount}
        seniorMode={seniorMode}
        setSeniorMode={setSeniorMode}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'archive' && (
          <TestimoniesFeed
            testimonies={testimonies}
            onSelectTestimony={handleSelectTestimony}
            onPlayTestimony={(t) => {
              setActivePlayingTestimony(t);
              globalAudioPlayer.playTestimony({
                id: t.id,
                title: t.title,
                author: t.authorName,
                durationSeconds: t.durationSeconds,
                transcript: t.transcript,
                audioUrl: t.audioUrl
              });
            }}
            onQuickPray={(id) => handlePray(id)}
            onOpenRecorder={() => {
              setActiveTab('record');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenGenerals={() => {
              setActiveTab('generales');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            seniorMode={seniorMode}
          />
        )}

        {activeTab === 'generales' && (
          <FaithGeneralsSection
            seniorMode={seniorMode}
            onOpenRecorder={() => {
              setActiveTab('record');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'record' && (
          <RecordingStudio
            onTestimonyCreated={handleTestimonyCreated}
            seniorMode={seniorMode}
            preselectedQuestionId={preselectedQuestionId}
          />
        )}

        {activeTab === 'questions' && (
          <GuidedQuestionsBrowser
            onSelectQuestionForRecording={handleSelectQuestionForRecording}
            seniorMode={seniorMode}
          />
        )}

        {activeTab === 'pastoral' && (
          <PastoralModeration
            testimonies={testimonies}
            onApproveTestimony={handleApproveTestimony}
            onRejectOrReturnTestimony={handleRejectOrReturnTestimony}
            seniorMode={seniorMode}
          />
        )}

        {activeTab === 'dossier' && (
          <ProductDossier
            onGoToSection={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Floating Mobile Mini-Player Bar */}
      {activePlayingTestimony && (
        <MiniPlayerBar
          testimony={activePlayingTestimony}
          isPlaying={isPlayingAudio}
          onTogglePlay={() => globalAudioPlayer.togglePlay()}
          onExpand={() => setSelectedTestimony(activePlayingTestimony)}
          onClose={() => {
            globalAudioPlayer.stop();
            setActivePlayingTestimony(null);
          }}
        />
      )}

      {/* Fixed Mobile Bottom Tab Bar (Thumb Zone) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        pendingCount={pendingCount}
      />

      {/* Detail Modal (Listening Experience) */}
      {selectedTestimony && (
        <TestimonyDetailModal
          testimony={selectedTestimony}
          onClose={handleCloseModal}
          onAddResponse={handleAddResponse}
          onPray={handlePray}
          seniorMode={seniorMode}
        />
      )}

      {/* Institutional Editorial Footer */}
      <footer className="mt-16 border-t border-stone-200 bg-[#F7F4EE] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-serif text-lg font-semibold text-stone-900">
              Legado de Fe
            </div>
            <p className="text-xs text-stone-500 font-serif italic max-w-md">
              "Contando a la generación venidera las alabanzas del Señor, y su potencia, y las maravillas que hizo." — Salmo 78:4
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-600 flex-wrap justify-center">
            <button
              onClick={() => {
                setActiveTab('generales');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-stone-900 font-semibold text-amber-900 transition-colors"
            >
              Generales de la Fe
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                setActiveTab('questions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-stone-900 transition-colors"
            >
              15 Preguntas Guía
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                setActiveTab('pastoral');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-stone-900 transition-colors"
            >
              Panel Pastoral ({pendingCount})
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                setActiveTab('dossier');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-stone-900 transition-colors"
            >
              7 Entregables de Diseño
            </button>
            <span aria-hidden="true">·</span>
            <span className="text-stone-400">Archivo Comunitario Cristiano</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
