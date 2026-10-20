export type CategoryType = 
  | 'fe_en_las_pruebas'
  | 'familia'
  | 'perdon'
  | 'llamado'
  | 'sanidad'
  | 'provision';

export type PrivacyLevel = 'public' | 'church' | 'family';

export type StatusType = 'approved' | 'pending_moderation' | 'draft';

export interface BibleVerse {
  reference: string;
  text: string;
}

export interface YouthResponse {
  id: string;
  authorName: string;
  authorAge?: number;
  type: 'prayer' | 'question' | 'gratitude';
  content: string;
  createdAt: string;
  replies?: {
    id: string;
    authorName: string;
    content: string;
    createdAt: string;
  }[];
}

export interface Testimony {
  id: string;
  title: string;
  authorName: string;
  authorAge: number;
  yearsInFaith: number;
  churchName: string;
  category: CategoryType;
  privacy: PrivacyLevel;
  status: StatusType;
  durationSeconds: number;
  audioUrl?: string;
  videoUrl?: string;
  mediaType: 'audio' | 'video';
  photoUrl: string;
  guidedQuestion: string;
  recordedWithHelper?: boolean;
  helperName?: string;
  transcript: string;
  verses: BibleVerse[];
  createdAt: string;
  responses: YouthResponse[];
  prayersCount: number;
  isHistoricalVerified?: boolean;
  sourceCitation?: string;
  biographicalYears?: string;
  countryOrCity?: string;
  moderatedBy?: string;
  moderationNotes?: string;
}

export interface GuidedQuestion {
  id: string;
  category: CategoryType;
  categoryLabel: string;
  question: string;
  gentleHint: string;
  anchorVerse: BibleVerse;
}

export interface FaithGeneral {
  id: string;
  name: string;
  nickname: string;
  years: string;
  country: string;
  category: CategoryType;
  photoUrl: string;
  summary: string;
  christianLifeTestimony: string;
  keyMiraclesOrLegacy: string[];
  famousQuote: string;
  keyVerse: BibleVerse;
  youtubeVideoId?: string;
  youtubeUrl?: string;
  videoTitle?: string;
  videoChannel?: string;
  videoLanguage?: string;
  tiktokSearchUrl?: string;
}

