import React, { useMemo } from 'react';

import { useAuth, AuthStateMode } from '@app/hooks';
import { LoginLoadingScreen, LoginScreen } from '@app/screens';

import { AuthContext } from './AuthContext';

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
