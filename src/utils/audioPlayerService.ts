export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  testimonyId: string | null;
  title: string;
  author: string;
  currentChunkIndex: number;
  totalChunks: number;
  isMuted: boolean;
}

type Listener = (state: AudioPlayerState) => void;

class AudioPlayerService {
  private state: AudioPlayerState = {
    isPlaying: false,
    currentTime: 0,
    duration: 120,
    playbackRate: 1.0,
    testimonyId: null,
    title: '',
    author: '',
    currentChunkIndex: 0,
    totalChunks: 1,
    isMuted: false
  };

  private listeners: Set<Listener> = new Set();
  private audioElement: HTMLAudioElement | null = null;
  private chunks: string[] = [];
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private progressTimer: any = null;
  private keepAliveTimer: any = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private userStopped: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initVoices();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.initVoices();
        };
      }
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Prioritize high-quality Spanish voice
    const esVoice = voices.find(v => v.lang.startsWith('es-') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Neural'))) ||
      voices.find(v => v.lang.startsWith('es-')) ||
      voices.find(v => v.lang.includes('es'));
    if (esVoice) {
      this.selectedVoice = esVoice;
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  public getState(): AudioPlayerState {
    return this.state;
  }

  private updateState(updates: Partial<AudioPlayerState>) {
    this.state = { ...this.state, ...updates };
    this.listeners.forEach(listener => listener(this.state));
  }

  /**
   * Split full transcript into sentence chunks of max 150-180 characters.
   * This completely prevents the Chrome 15-second speech cutoff bug.
   */
  private splitTextIntoChunks(text: string, maxChars = 160): string[] {
    if (!text) return [];
    
    // Normalize text
    const cleanText = text.replace(/\r\n/g, '\n').trim();
    // Match sentences ending in ., !, ?, :, ; or newline
    const sentences = cleanText.match(/[^.!?\n:]+[.!?\n:]*/g) || [cleanText];
    const chunks: string[] = [];
    let current = '';

    for (const s of sentences) {
      const trimmed = s.trim();
      if (!trimmed) continue;

      if ((current + ' ' + trimmed).trim().length <= maxChars) {
        current = (current + ' ' + trimmed).trim();
      } else {
        if (current) chunks.push(current);
        if (trimmed.length > maxChars) {
          // Break very long sentence into comma or word clauses
          const words = trimmed.split(' ');
          let sub = '';
          for (const w of words) {
            if ((sub + ' ' + w).trim().length <= maxChars) {
              sub = (sub + ' ' + w).trim();
            } else {
              if (sub) chunks.push(sub);
              sub = w;
            }
          }
          if (sub) chunks.push(sub);
          current = '';
        } else {
          current = trimmed;
        }
      }
    }
    if (current) chunks.push(current);
    return chunks.length > 0 ? chunks : [cleanText];
  }

  public playTestimony(options: {
    id: string;
    title: string;
    author: string;
    durationSeconds: number;
    transcript?: string;
    audioUrl?: string;
    startFromBeginning?: boolean;
  }) {
    this.userStopped = false;

    // If already playing this exact testimony and just toggling
    if (this.state.testimonyId === options.id && !options.startFromBeginning) {
      if (this.state.isPlaying) {
        this.pause();
        return;
      } else {
        this.resume();
        return;
      }
    }

    // Stop whatever was playing
    this.stopPlayback();

    const text = options.transcript || options.title;
    this.chunks = this.splitTextIntoChunks(text);
    const estimatedDuration = Math.max(options.durationSeconds || 60, Math.round(text.length / 15));

    this.updateState({
      testimonyId: options.id,
      title: options.title,
      author: options.author,
      duration: estimatedDuration,
      currentTime: 0,
      currentChunkIndex: 0,
      totalChunks: Math.max(1, this.chunks.length),
      isPlaying: true
    });

    if (options.audioUrl) {
      this.playRealAudio(options.audioUrl);
    } else {
      this.playChunk(0);
    }

    this.startProgressTracking();
  }

  private playRealAudio(url: string) {
    if (!this.audioElement) {
      this.audioElement = new Audio();
    }
    this.audioElement.src = url;
    this.audioElement.playbackRate = this.state.playbackRate;
    this.audioElement.muted = this.state.isMuted;
    
    this.audioElement.onloadedmetadata = () => {
      if (this.audioElement && this.audioElement.duration && !isNaN(this.audioElement.duration)) {
        this.updateState({ duration: Math.round(this.audioElement.duration) });
      }
    };

    this.audioElement.onended = () => {
      this.updateState({ isPlaying: false, currentTime: this.state.duration });
      this.stopProgressTracking();
    };

    this.audioElement.play().catch(e => {
      console.warn('Audio play prevented or error:', e);
    });
  }

  private playChunk(index: number) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (this.userStopped) return;

    if (index >= this.chunks.length) {
      // Reached the end of the entire testimony!
      this.updateState({
        isPlaying: false,
        currentTime: this.state.duration,
        currentChunkIndex: this.chunks.length
      });
      this.stopProgressTracking();
      return;
    }

    const chunkText = this.chunks[index];
    this.updateState({
      currentChunkIndex: index,
      currentTime: Math.round((index / this.chunks.length) * this.state.duration)
    });

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(chunkText);
      utterance.lang = 'es-ES';
      utterance.rate = this.state.playbackRate * 0.95;
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      utterance.onend = () => {
        if (!this.userStopped && this.state.isPlaying) {
          // Chain to next chunk immediately
          this.playChunk(index + 1);
        }
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error on chunk', index, e);
        if (!this.userStopped && this.state.isPlaying && index + 1 < this.chunks.length) {
          setTimeout(() => this.playChunk(index + 1), 50);
        } else {
          this.updateState({ isPlaying: false });
          this.stopProgressTracking();
        }
      };

      this.activeUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Error initiating utterance', e);
    }
  }

  private startProgressTracking() {
    this.stopProgressTracking();

    // Smooth ticker for scrubber bar
    this.progressTimer = setInterval(() => {
      if (!this.state.isPlaying) return;

      if (this.audioElement && this.audioElement.src) {
        this.updateState({ currentTime: Math.round(this.audioElement.currentTime) });
      } else {
        // Increment smooth timer based on total chunks and playback rate
        this.updateState({
          currentTime: Math.min(this.state.duration, this.state.currentTime + 1)
        });
      }
    }, 1000 / this.state.playbackRate);

    // Keep-alive ping for speech synthesis to prevent garbage collection in Chromium
    this.keepAliveTimer = setInterval(() => {
      if (this.state.isPlaying && typeof window !== 'undefined' && 'speechSynthesis' in window && !this.audioElement?.src) {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }
    }, 10000);
  }

  private stopProgressTracking() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  public pause() {
    this.userStopped = true;
    this.updateState({ isPlaying: false });
    this.stopProgressTracking();

    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public resume() {
    if (!this.state.testimonyId) return;
    this.userStopped = false;
    this.updateState({ isPlaying: true });
    this.startProgressTracking();

    if (this.audioElement && this.audioElement.src) {
      this.audioElement.play().catch(() => {});
    } else {
      this.playChunk(this.state.currentChunkIndex);
    }
  }

  public togglePlay() {
    if (this.state.isPlaying) {
      this.pause();
    } else {
      this.resume();
    }
  }

  public stop() {
    this.stopPlayback();
    this.updateState({
      isPlaying: false,
      currentTime: 0,
      currentChunkIndex: 0,
      testimonyId: null
    });
  }

  public restart() {
    if (!this.state.testimonyId) return;
    this.userStopped = false;
    this.updateState({ currentTime: 0, currentChunkIndex: 0, isPlaying: true });

    if (this.audioElement && this.audioElement.src) {
      this.audioElement.currentTime = 0;
      this.audioElement.play().catch(() => {});
    } else {
      this.playChunk(0);
    }
    this.startProgressTracking();
  }

  public seekPercent(percent: number) {
    const clamped = Math.max(0, Math.min(100, percent));
    const targetSeconds = Math.round((clamped / 100) * this.state.duration);

    if (this.audioElement && this.audioElement.src) {
      this.audioElement.currentTime = targetSeconds;
      this.updateState({ currentTime: targetSeconds });
    } else if (this.chunks.length > 0) {
      const targetChunk = Math.min(
        this.chunks.length - 1,
        Math.floor((clamped / 100) * this.chunks.length)
      );
      this.updateState({
        currentTime: targetSeconds,
        currentChunkIndex: targetChunk
      });
      if (this.state.isPlaying) {
        this.playChunk(targetChunk);
      }
    }
  }

  public setPlaybackRate(rate: number) {
    this.updateState({ playbackRate: rate });
    if (this.audioElement) {
      this.audioElement.playbackRate = rate;
    }
    // If currently speaking, restart current chunk with new rate
    if (this.state.isPlaying && !this.audioElement?.src) {
      this.playChunk(this.state.currentChunkIndex);
    }
  }

  public setMuted(muted: boolean) {
    this.updateState({ isMuted: muted });
    if (this.audioElement) {
      this.audioElement.muted = muted;
    }
    if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window && !this.audioElement?.src) {
      window.speechSynthesis.cancel();
    } else if (!muted && this.state.isPlaying && !this.audioElement?.src) {
      this.playChunk(this.state.currentChunkIndex);
    }
  }

  private stopPlayback() {
    this.userStopped = true;
    this.stopProgressTracking();
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const globalAudioPlayer = new AudioPlayerService();
