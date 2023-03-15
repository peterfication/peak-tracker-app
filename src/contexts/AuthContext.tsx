import React, { createContext } from 'react';

import { useAuth } from '../hooks/useAuth';
import { LoginScreen, LoginLoadingScreen } from '../screens/LoginScreen';

export interface AuthContextInterface {
  /**
   * Logs the user out. This will result in isAuthenticated being set to false
   * and the LoginScreen being rendered.
   */
  logout: () => Promise<void>;
  /**
   * The initial value of isAuthenticated is null to be able to handle
   * the case when the auth state is not yet set (auth state === undefined).
   */
  isAuthenticated: boolean | null;
}

export const AuthContext = createContext<AuthContextInterface>({
  logout: async () => {},
  isAuthenticated: false,
});

export type AuthProviderType = React.FC<{ children: React.ReactNode }>;

/**
 * The AuthProvider hooks up the useAuth hook with the AuthContext.Provider
 * and is responsible for rendering the LoginScreen/LoginLoadingScreen
 * if the user is not authenticated.
 */
export const AuthProvider: AuthProviderType = ({ children }) => {
  const { login, logout, isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <LoginLoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ logout, isAuthenticated }}>
      {isAuthenticated ? children : <LoginScreen login={login} />}
    </AuthContext.Provider>
  );
};
