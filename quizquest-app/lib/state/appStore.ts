import { create } from 'zustand';
import type { User as LoggedInUser } from '@/lib/types/user/User';
import { logoutUser } from '@/services/authServices';

type AuthStatus = 'loading' | 'loggedIn' | 'loggedOut';

type AppStore = {
  authStatus: AuthStatus;
  authUser: { uid: string; email?: string | null } | null;

  userDoc: LoggedInUser | null;

  setAuthStatus: (s: AuthStatus) => void;
  setAuthUser: (u: AppStore['authUser']) => void;
  setUserDoc: (u: LoggedInUser | null) => void;
  resetAll: () => void;
  logout: () => Promise<void>;
};

export const useAppStore = create<AppStore>((set) => ({
  authStatus: 'loading',
  authUser: null,
  userDoc: null,

  setAuthStatus: (authStatus) => set({ authStatus }),
  setAuthUser: (authUser) => set({ authUser }),
  setUserDoc: (userDoc) => set({ userDoc }),
  resetAll: () => set({ authStatus: 'loggedOut', authUser: null, userDoc: null }),
  logout: async () => {
    try {
      await logoutUser();
      set({ authStatus: 'loggedOut', authUser: null, userDoc: null });
    } catch (error) {
      console.error('Error during logout:', error);
      set({ authStatus: 'loggedOut', authUser: null, userDoc: null });
    }
  },
}));
