import React, { createContext, useMemo } from 'react';

import { useAuth } from '@app/hooks/useAuth';
import { LoginLoadingScreen, LoginScreen } from '@app/screens/LoginScreen';

export interface AuthContextInterface {
  /**
   * Logs the user out. This will result in isAuthenticated being set to false
   * and the LoginScreen being rendered.
   */
  logout: () => Promise<void>;
  /**
   * Whether the auth state is refreshing at the moment.
   *
   * Default is true, because we need to wait for the initial auth load
   * in useAuth.
   */
  authLoading: boolean;
  /**
   * The initial value of isAuthenticated is null to be able to handle
   * the case when the auth state is not yet set (auth state === undefined)
   * to show the user a loading screen (see LoginLoadingScreen in AuthProvider).
   */
  isAuthenticated: boolean | null;
}

/**
 * For more information, check the docs of the return values of
 * `useContext(AuthContext)`, e.g.:
 *
 *   `const { logout, ... } = useContext(AuthContext)`
 */
export const AuthContext = createContext<AuthContextInterface>({
  logout: async () => {},
  authLoading: true,
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
  const { login, logout, authLoading, isAuthenticated } = useAuth();

  const authContextValue = useMemo(
    () => ({
      logout,
      authLoading,
      isAuthenticated,
    }),
    [logout, authLoading, isAuthenticated],
  );

  if (isAuthenticated === null) {
    return <LoginLoadingScreen />;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {isAuthenticated ? children : <LoginScreen login={login} />}
    </AuthContext.Provider>
  );
};
