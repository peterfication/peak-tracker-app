import { useCallback, useEffect, useState } from 'react';

import { AuthContextInterface } from '@app/contexts/AuthContext';
import {
  getIsAuthenticated,
  performLogin,
  performLogout,
} from '@app/hooks/useAuth.helpers';
import { effectUpdateRefreshToken } from '@app/hooks/useAuth.useEffect';
import { MaybeAuthState, useAuthState } from '@app/hooks/useAuthState';

/**
 *
 * Whether the auth state is refreshing at the moment.
 */
export enum AuthLoadingState {
  /**
   * On startup, the auth state is unknown, hence we don't know yet if we need to
   * refresh it.
   */
  Init,
  /**
   * An auth state refresh is in progress.
   */
  Loading,
  /**
   * No auth state refresh is in progress.
   */
  NotLoading,
}

/**
 * The login function is not part of the AuthContextInterface because it is
 * only needed in the login screen and there it can be passed as a prop in
 * the AuthProvider.
 */
type UseAuthReturnType = AuthContextInterface & {
  /**
   * This function is used to login the user in the app
   * via the OAuth flow. After the user has logged in, the auth state is
   * set and stored in storage.
   */
  login: () => Promise<void>;

  /**
   * Whether the auth state is refreshing at the moment.
   *
   * Default is AuthLoadingState.Init, because we need to wait for the initial auth load
   * in useAuth.
   */
  authLoading: AuthLoadingState;
  authState: MaybeAuthState;
};

/**
 * This hook is used to login and logout and interacting with the
 * auth state via the useAuthState hook.
 */
export const useAuth = (): UseAuthReturnType => {
  const { authState, getAuthState, storeAuthState, removeAuthState } =
    useAuthState();

  // Undefined means it's the first run
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
