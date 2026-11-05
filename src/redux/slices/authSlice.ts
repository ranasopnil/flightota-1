import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthSession, AuthUser } from "@/types/auth";

/**
 * Authentication state.
 *
 * Security: the access token is kept in memory only. It is never written to
 * localStorage or redux-persist. The refresh token lives in an httpOnly cookie
 * set by the backend, and the session is restored with /auth/refresh.
 */
export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  expiresAt: number | null;
  status: "idle" | "authenticated" | "anonymous";
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  expiresAt: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionEstablished(state, action: PayloadAction<AuthSession>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.expiresAt = action.payload.expiresAt;
      state.status = "authenticated";
    },
    tokenRefreshed(state, action: PayloadAction<{ accessToken: string; expiresAt: number }>) {
      state.accessToken = action.payload.accessToken;
      state.expiresAt = action.payload.expiresAt;
    },
    signedOut() {
      return { ...initialState, status: "anonymous" as const };
    },
  },
  selectors: {
    selectCurrentUser: (state) => state.user,
    selectAccessToken: (state) => state.accessToken,
    selectIsAuthenticated: (state) => state.status === "authenticated",
  },
});

export const { sessionEstablished, tokenRefreshed, signedOut } = authSlice.actions;
export const { selectCurrentUser, selectAccessToken, selectIsAuthenticated } = authSlice.selectors;
export default authSlice;
