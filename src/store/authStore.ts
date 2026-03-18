import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  loggedInTeamId: string | null;
  login: (teamId: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      loggedInTeamId: null,
      login: (teamId) => set({ loggedInTeamId: teamId }),
      logout: () => set({ loggedInTeamId: null }),
      isLoggedIn: () => get().loggedInTeamId !== null,
    }),
    { name: 'soccer-auth' }
  )
);
