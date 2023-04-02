import { useCallback, useEffect, useState } from 'react';

import {
  getIsAuthenticated,
  performLogin,
  performLogout,
} from './useAuth.helpers';
import { UseAuthReturnType, AuthLoadingState } from './useAuth.types';
import { effectUpdateRefreshToken } from './useAuth.useEffect';
import { useAuthState } from './useAuthState';

/**
 * This hook is used to login and logout and interacting with the
 * auth state via the useAuthState hook.
 */
export const useAuth = (): UseAuthReturnType => {
  const { authState, getAuthState, storeAuthState, removeAuthState } =
    useAuthState();

  const [authLoading, setAuthLoading] = useState<AuthLoadingState>(
    AuthLoadingState.Init,
  );

  // This effect is used to set the initial auth state from storage.
  useEffect(
    () => {
      // Set initial auth state from storage if available.
      const setInitialAuthState = async () => {
        await getAuthState();
      };
      setInitialAuthState().catch(
        error =>
          error instanceof Error &&
          console.error('setInitialAuthState', error.toString()),
      );
    },
    // We only want to run this effect once, hence the empty dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // This effect is used to refresh the auth state if needed.
  useEffect(
    () =>
      effectUpdateRefreshToken(
        authState,
        authLoading,
        setAuthLoading,
        storeAuthState,
        removeAuthState,
      ),
    [authState, authLoading, storeAuthState, removeAuthState],
  );

  const login = useCallback(
    async () => await performLogin(setAuthLoading, storeAuthState),
    [storeAuthState],
  );
  const logout = useCallback(
    async () => await performLogout(await getAuthState(), removeAuthState),
    [getAuthState, removeAuthState],
  );
  const isAuthenticated = getIsAuthenticated(authState);

  return {
    authLoading,
    authState,
    isAuthenticated,
    login,
    logout,
  };
};
