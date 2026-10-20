import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { globalAudioPlayer, AudioPlayerState } from '../utils/audioPlayerService';

interface AudioPlayerCustomProps {
  id?: string;
  title: string;
  author: string;
  durationSeconds: number;
  textToSpeak?: string;
  audioUrl?: string;
  seniorMode?: boolean;
}

export const AudioPlayerCustom: React.FC<AudioPlayerCustomProps> = ({
  id,
  title,
  author,
  durationSeconds,
  textToSpeak,
  audioUrl,
  seniorMode
}) => {
  const [playerState, setPlayerState] = useState<AudioPlayerState>(globalAudioPlayer.getState());

  useEffect(() => {
    const unsubscribe = globalAudioPlayer.subscribe((state) => {
      setPlayerState(state);
    });
    return unsubscribe;
  }, []);

  const isCurrentTestimony = id ? playerState.testimonyId === id : true;
  const isPlaying = isCurrentTestimony && playerState.isPlaying;
  const currentTime = isCurrentTestimony ? playerState.currentTime : 0;
  const duration = isCurrentTestimony && playerState.duration ? playerState.duration : durationSeconds;
  const playbackRate = playerState.playbackRate;
  const isMuted = playerState.isMuted;

  const handleTogglePlay = () => {
    if (isCurrentTestimony && playerState.testimonyId) {
      globalAudioPlayer.togglePlay();
    } else {
      globalAudioPlayer.playTestimony({
        id: id || `audio-${Date.now()}`,
        title,
        author,
        durationSeconds,
        transcript: textToSpeak,
        audioUrl,
        startFromBeginning: false
      });
    }
  };

  const handleRestart = () => {
    if (isCurrentTestimony && playerState.testimonyId) {
      globalAudioPlayer.restart();
    } else {
      globalAudioPlayer.playTestimony({
        id: id || `audio-${Date.now()}`,
        title,
        author,
        durationSeconds,
        transcript: textToSpeak,
        audioUrl,
        startFromBeginning: true
      });
    }
  };

  const handleSpeedChange = (rate: number) => {
    globalAudioPlayer.setPlaybackRate(rate);
  };

  const handleMuteToggle = () => {
    globalAudioPlayer.setMuted(!isMuted);
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));

    if (!isCurrentTestimony) {
      globalAudioPlayer.playTestimony({
        id: id || `audio-${Date.now()}`,
        title,
        author,
        durationSeconds,
        transcript: textToSpeak,
        audioUrl,
        startFromBeginning: false
      });
    }
    globalAudioPlayer.seekPercent(percent);
  };

  const formatTime = (seconds: number) => {
    const safeSecs = Math.max(0, Math.floor(seconds || 0));
    const mins = Math.floor(safeSecs / 60);
    const secs = safeSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="bg-[#F7F4EE] rounded-2xl border border-stone-300/80 p-5 shadow-xs">
      
      {/* Waveform Visualization Bars */}
      <div 
        onClick={handleScrub}
        title="Toca para avanzar o retroceder en el audio"
        className="flex items-end justify-between gap-1 h-14 mb-3 px-3 bg-stone-200/50 rounded-xl py-2 cursor-pointer hover:bg-stone-200/80 transition-colors"
      >
        {Array.from({ length: 36 }).map((_, i) => {
          const barHeight = Math.sin((i / 36) * Math.PI) * 70 + (i % 3 === 0 ? 25 : 15);
          const isPassed = (i / 36) * 100 <= progressPercent;
          const isCurrentBar = isPlaying && Math.abs((progressPercent / 100) * 36 - i) < 2;

          return (
            <div
              key={i}
              className={`w-1.5 rounded-full transition-all duration-150 ${
                isPassed ? 'bg-amber-800' : 'bg-stone-300'
              } ${isCurrentBar ? 'scale-y-125 bg-amber-600' : ''}`}
              style={{ height: `${Math.max(15, barHeight)}%` }}
            />
          );
        })}
      </div>

      {/* Interactive Timeline scrub bar */}
      <div 
        onClick={handleScrub}
        className="relative w-full h-3 bg-stone-300/80 rounded-full cursor-pointer mb-2.5 overflow-hidden hover:h-3.5 transition-all"
        title="Arrastra o toca para buscar en el audio completo"
      >
        <div
          className="absolute top-0 left-0 h-full bg-amber-800 rounded-full transition-all duration-100"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Time indicators & Chunk Progress */}
      <div className="flex justify-between items-center text-xs text-stone-600 font-mono tabular-nums mb-4">
        <span>{formatTime(currentTime)}</span>
        {isCurrentTestimony && playerState.totalChunks > 1 && (
          <span className="text-[10px] font-sans text-stone-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>Audio Completo ({playerState.currentChunkIndex + 1}/{playerState.totalChunks})</span>
          </span>
        )}
        <span>{formatTime(duration)}</span>
      </div>

      {/* Player Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-stone-200/70">
        
        {/* Left: Speed selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-stone-500 font-medium mr-1">Velocidad:</span>
          {[0.8, 1.0, 1.2].map((rate) => (
            <button
              key={rate}
              onClick={() => handleSpeedChange(rate)}
              className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                playbackRate === rate
                  ? 'bg-amber-900 text-white font-semibold shadow-xs'
                  : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>

        {/* Center: Main Play/Pause Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRestart}
            title="Reiniciar desde el principio"
            className="p-2.5 text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-200/70 transition-colors cursor-pointer"
            aria-label="Reiniciar audio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pausar testimonio' : 'Escuchar testimonio completo'}
            className={`${
              seniorMode ? 'w-16 h-16' : 'w-14 h-14'
            } rounded-full bg-amber-900 text-amber-50 flex items-center justify-center hover:bg-amber-800 transition-all shadow-md active:scale-95 cursor-pointer`}
          >
            {isPlaying ? (
              <Pause className={seniorMode ? 'w-8 h-8' : 'w-6 h-6'} />
            ) : (
              <Play className={`${seniorMode ? 'w-8 h-8' : 'w-6 h-6'} ml-0.5`} />
            )}
          </button>
        </div>

        {/* Right: Audio Status indicator */}
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <button
            onClick={handleMuteToggle}
            className="p-2 hover:bg-stone-200/80 rounded-lg transition-colors cursor-pointer"
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-600" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <span className="hidden sm:inline font-medium">
            {isPlaying ? 'Reproduciendo audio completo' : 'Pausado'}
          </span>
        </div>

      </div>
    </div>
  );
};
