import { create } from 'zustand';
import type { Team, GroupName } from '../types';
import { INITIAL_TEAMS } from '../data/initialData';

interface TeamState {
  teams: Team[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getTeamById: (id: string) => Team | undefined;
  getTeamsByGroup: (group: GroupName) => Team[];
}

export const useTeamStore = create<TeamState>((set, get) => ({
  teams: INITIAL_TEAMS,
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  getTeamById: (id) => get().teams.find(t => t.id === id),
  getTeamsByGroup: (group) => get().teams.filter(t => t.group === group),
}));
