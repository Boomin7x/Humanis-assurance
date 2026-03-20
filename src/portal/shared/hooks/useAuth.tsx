// src/portal/shared/hooks/useAuth.tsx
// Authentication context and hook for portal

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockAuthService } from '../mock/mockAuthService';
import type { AuthState, LoginCredentials, AuthSession } from '../types';

// Auth context interface
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

// Create auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Initial auth state
const initialAuthState: AuthState = {
  user: null,
  role: null,
  token: null,
  isAuthenticated: false,
};

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth provider component that manages authentication state
 */
export function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const session = mockAuthService.getSession();
        if (session) {
          setAuthState({
            user: session.user,
            role: session.role,
            token: session.token,
            isAuthenticated: true,
          });
        }
      } catch (err) {
        console.error('Failed to initialize auth state:', err);
        setError('Failed to restore session');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Login user with credentials
   */
  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const session: AuthSession = await mockAuthService.login(credentials);
      setAuthState({
        user: session.user,
        role: session.role,
        token: session.token,
        isAuthenticated: true,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err; // Re-throw to let components handle it
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user and clear state
   */
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await mockAuthService.logout();
      setAuthState(initialAuthState);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear error state
   */
  const clearError = (): void => {
    setError(null);
  };

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    isLoading,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context
 * @returns Auth context with state and methods
 * @throws Error if used outside AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}