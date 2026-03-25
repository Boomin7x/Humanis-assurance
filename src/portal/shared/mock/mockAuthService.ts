// src/portal/shared/mock/mockAuthService.ts
// Mock authentication service for demo mode

import { mockDelay } from "./mockDelay";
import type {
  AuthSession,
  LoginCredentials,
  AuthUser,
  UserRole,
  AuthError,
} from "../types";

// Storage key for mock auth data
const AUTH_STORAGE_KEY = "humanis_portal_auth";

// Demo credentials
const DEMO_USERS: Record<string, { password: string; user: AuthUser }> = {
  "agent@demo.com": {
    password: "demo1234",
    user: {
      id: "agent-1",
      email: "agent@demo.com",
      name: "Marie Dupont",
      role: "agent" as UserRole,
    },
  },
  "customer@demo.com": {
    password: "demo1234",
    user: {
      id: "customer-1",
      email: "customer@demo.com",
      name: "Jean Martin",
      role: "customer" as UserRole,
    },
  },
};

/**
 * Mock authentication service with localStorage persistence
 */
class MockAuthService {
  /**
   * Authenticate user with email and password
   * @param credentials - User login credentials
   * @returns Promise resolving to auth session
   * @throws AuthError for invalid credentials
   */
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const { email, password } = credentials;

    // Simulate network delay
    await mockDelay(null, 800);

    // Check if user exists
    const userRecord = DEMO_USERS[email.toLowerCase()];
    if (!userRecord) {
      throw new Error("User not found") as AuthError & {
        code: "USER_NOT_FOUND";
      };
    }

    // Validate password
    if (userRecord.password !== password) {
      throw new Error("Invalid credentials") as AuthError & {
        code: "INVALID_CREDENTIALS";
      };
    }

    // Create session
    const session: AuthSession = {
      user: userRecord.user,
      token: "mock-token",
      role: userRecord.user.role,
      isAuthenticated: true,
    };

    // Store in localStorage
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));

    return session;
  }

  /**
   * Logout user and clear session
   */
  async logout(): Promise<void> {
    await mockDelay(null, 300);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  /**
   * Get current session from localStorage
   * @returns Current auth session or null
   */
  getSession(): AuthSession | null {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!stored) return null;

      const session = JSON.parse(stored) as AuthSession;

      // Validate session structure
      if (!session.user || !session.token || !session.role || typeof session.isAuthenticated !== 'boolean') {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
      }

      return session;
    } catch (error) {
      // Clear corrupted data
      console.log({ error });
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getSession() !== null;
  }

  /**
   * Get current user role
   */
  getCurrentRole(): UserRole | null {
    const session = this.getSession();
    return session?.role || null;
  }

  /**
   * Validate if current user has required role
   */
  hasRole(requiredRole: UserRole): boolean {
    const currentRole = this.getCurrentRole();
    return currentRole === requiredRole;
  }
}

// Export singleton instance
export const mockAuthService = new MockAuthService();

// Export demo credentials for UI hints
export const DEMO_CREDENTIALS = {
  agent: { email: "agent@demo.com", password: "demo1234" },
  customer: { email: "customer@demo.com", password: "demo1234" },
};
