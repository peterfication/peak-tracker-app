import React, { createContext, useMemo } from 'react';

import { useAuth, AuthStateMode } from '@app/hooks';
import {
  LoginLoadingScreen,
  LoginScreen,
  // Import directly from the file to avoid a circular dependency
} from '@app/screens/login/LoginScreen';

export interface AuthContextInterface {
  /**
   * Logs the user out. This will result in isAuthenticated being set to false
   * and the LoginScreen being rendered.
   */
  logout: () => Promise<void>;
  /**
   * The initial value of isAuthenticated is null to be able to handle
   * the case when the auth state is not yet set (auth state === undefined)
   * to show the user a loading screen (see LoginLoadingScreen in AuthProvider).
   */
  isAuthenticated: boolean | AuthStateMode.Loading;
}

/**
 * For more information, check the docs of the return values of
 * `useContext(AuthContext)`, e.g.:
 *
 *   `const { logout, ... } = useContext(AuthContext)`
 */
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
export const AuthProvider: AuthProviderType = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { login, logout, isAuthenticated } = useAuth();

  const authContextValue = useMemo(
    () => ({
      logout,
      isAuthenticated,
    }),
    [isAuthenticated, logout],
  );

  if (authContextValue.isAuthenticated === AuthStateMode.Loading) {
    return <LoginLoadingScreen />;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {authContextValue.isAuthenticated ? (
        children
      ) : (
        <LoginScreen login={login} />
      )}
    </AuthContext.Provider>
  );
};
