import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Match, GroupName, Stage } from '../types';
import { INITIAL_MATCHES } from '../data/initialData';

interface MatchState {
  matches: Match[];
  getMatchById: (id: string) => Match | undefined;
  getMatchesByGroup: (group: GroupName) => Match[];
  getMatchesByStage: (stage: Stage) => Match[];
  getLiveMatches: () => Match[];
  getRecentResults: (limit?: number) => Match[];
  getUpcomingMatches: (limit?: number) => Match[];
  updateScore: (matchId: string, homeScore: number, awayScore: number, homePenalty?: number, awayPenalty?: number) => void;
  setMatchLive: (matchId: string, minute?: number) => void;
}

export const useMatchStore = create<MatchState>()(
  persist(
    (set, get) => ({
      matches: INITIAL_MATCHES,
      getMatchById: (id) => get().matches.find(m => m.id === id),
      getMatchesByGroup: (group) => get().matches.filter(m => m.stage === 'group' && m.group === group),
      getMatchesByStage: (stage) => get().matches.filter(m => m.stage === stage),
      getLiveMatches: () => get().matches.filter(m => m.status === 'live'),
      getRecentResults: (limit = 5) => get().matches.filter(m => m.status === 'completed').sort((a,b) => new Date(b.date).getTime()-new Date(a.date).getTime()).slice(0, limit),
      getUpcomingMatches: (limit = 5) => get().matches.filter(m => m.status === 'upcoming').sort((a,b) => new Date(a.date).getTime()-new Date(b.date).getTime()).slice(0, limit),
      updateScore: (matchId, homeScore, awayScore, homePenalty, awayPenalty) => set(state => ({
        matches: state.matches.map(m => m.id === matchId ? { ...m, homeScore, awayScore, homePenalty, awayPenalty, status: 'completed' as const, minute: undefined } : m),
      })),
      setMatchLive: (matchId, minute = 1) => set(state => ({
        matches: state.matches.map(m => m.id === matchId ? { ...m, status: 'live' as const, minute, homeScore: m.homeScore ?? 0, awayScore: m.awayScore ?? 0 } : m),
      })),
    }),
    { name: 'soccer-matches' }
  )
);
