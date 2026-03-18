import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MatchRecord } from '../types';

interface MatchRecordState {
  records: MatchRecord[];
  getRecord: (matchId: string) => MatchRecord | undefined;
  saveRecord: (record: MatchRecord) => void;
}

export const useMatchRecordStore = create<MatchRecordState>()(
  persist(
    (set, get) => ({
      records: [],
      getRecord: (matchId) => get().records.find(r => r.matchId === matchId),
      saveRecord: (record) => set(state => ({
        records: state.records.some(r => r.matchId === record.matchId)
          ? state.records.map(r => r.matchId === record.matchId ? record : r)
          : [...state.records, record],
      })),
    }),
    { name: 'soccer-match-records' }
  )
);
