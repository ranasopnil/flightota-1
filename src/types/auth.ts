export type UserRole = "super_admin" | "admin" | "developer" | "business" | "enterprise";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  emailVerified: boolean;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
  /** Epoch milliseconds. */
  expiresAt: number;
}
