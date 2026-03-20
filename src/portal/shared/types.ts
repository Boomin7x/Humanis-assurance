// src/portal/shared/types.ts
// Shared types for portal authentication and user management

export type UserRole = 'agent' | 'customer';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  user: AuthUser | null;
  role: UserRole | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  role: UserRole;
}

// Mock auth error types
export class AuthError extends Error {
  constructor(message: string, public code: 'INVALID_CREDENTIALS' | 'USER_NOT_FOUND' | 'UNAUTHORIZED') {
    super(message);
    this.name = 'AuthError';
  }
}