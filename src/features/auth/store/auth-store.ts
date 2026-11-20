"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { clearAuthCookie, setAuthCookie } from "@/lib/auth/cookie";
import type { AuthUser } from "@/features/auth/types";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  login: (token: string, email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setHasHydrated: (value) => set({ _hasHydrated: value }),
      login: (token, email) => {
        setAuthCookie(token);
        set({
          token,
          user: { email },
          isAuthenticated: true,
        });
      },
      logout: () => {
        clearAuthCookie();
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "venuze-auth",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        if (state?.token) {
          setAuthCookie(state.token);
        }
      },
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
