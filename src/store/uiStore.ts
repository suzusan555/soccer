import { create } from 'zustand';
import type { Category } from '../types';

interface UIState {
  scoreModalMatchId: string | null;
  recordModalMatchId: string | null;
  selectedCategory: Category;
  openScoreModal: (matchId: string) => void;
  closeScoreModal: () => void;
  openRecordModal: (matchId: string) => void;
  closeRecordModal: () => void;
  setSelectedCategory: (cat: Category) => void;
}

export const useUIStore = create<UIState>((set) => ({
  scoreModalMatchId: null,
  recordModalMatchId: null,
  selectedCategory: 'pro',
  openScoreModal: (matchId) => set({ scoreModalMatchId: matchId }),
  closeScoreModal: () => set({ scoreModalMatchId: null }),
  openRecordModal: (matchId) => set({ recordModalMatchId: matchId }),
  closeRecordModal: () => set({ recordModalMatchId: null }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
}));
