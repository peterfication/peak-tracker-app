import { useEffect, useState } from 'react';

import { AuthContextInterface } from '../contexts/AuthContext';
import {
  authorize,
  // logout as oauthLogout,
  revoke,
} from '../utils/oauth';
import {
  getIsAuthenticated,
  shouldRefresh,
  updateRefreshToken,
} from './useAuth.helpers';
import {
  AuthState,
  isAuthState,
  MaybeAuthState,
  useAuthState,
} from './useAuthState';

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
};

export const effectUpdateRefreshToken = (
  authState: MaybeAuthState | null,
  authLoading: boolean | undefined,
  setAuthLoading: (authLoading: boolean) => void,
  storeAuthState: (authState: AuthState) => Promise<void>,
  removeAuthState: () => Promise<void>,
) => {
  /**
   * This function is just a synchronous wrapper around the updateRefreshToken
   * so that we can use it in the setInterval in the useEffect hook.
   */
  const updateRefreshTokenWrapper = () => {
    updateRefreshToken(
      authState,
      setAuthLoading,
      storeAuthState,
      removeAuthState,
    ).catch(
      error =>
        error instanceof Error &&
        console.error('updateRefreshTokenWrapper', error.toString()),
    );
  };

  // Execute it immediately because setInterval doesn't execute it immediately
  shouldRefresh(authState, authLoading) && updateRefreshTokenWrapper();

  const refreshInterval = setInterval(() => {
    shouldRefresh(authState, authLoading) && updateRefreshTokenWrapper();
  }, 2000);

  // The setInterval needs to be cleared when the component unmounts
  // otherwise it will keep running in the background and new setIntervals
  // will be created every time the component is mounted.
  return () => clearInterval(refreshInterval);
};

/**
 * This hook is used to login and logout and interacting with the
 * auth state via the useAuthState hook.
 */
export const useAuth = (): UseAuthReturnType => {
  const { authState, getAuthState, storeAuthState, removeAuthState } =
    useAuthState();

  // Undefined means it's the first run
  const [authLoading, setAuthLoading] = useState<boolean | undefined>(
    undefined,
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

  const login = async () => {
    try {
      setAuthLoading(true);

      const result = await authorize();

      const newAuthState: AuthState = {
        accessToken: result.accessToken,
        idToken: result.idToken,
        refreshToken: result.refreshToken,
        expiresAt: result.accessTokenExpirationDate,
      };

      await storeAuthState(newAuthState);

      // We need to set authLoading to false after the auth state is stored
      // so that we don't immediately trigger a refresh because it might be undefined
      setAuthLoading(false);
    } catch (error) {
      error instanceof Error &&
        console.error('useAuth.login', error.toString());
    }
  };

  const logout = async () => {
    try {
      // FIXME: The logout is crashing, see oauthLogout
      // isAuthState(authState) && await oauthLogout(authState.idToken);
      isAuthState(authState) && (await revoke(authState.accessToken));
    } catch (error) {
      error instanceof Error &&
        console.error('useAuth.logout', error.toString());
    }

    await removeAuthState();
  };

  const isAuthenticated = getIsAuthenticated(authState);

  return {
    // To the outside of this hook we only want authLoading to expose a
    // boolean value, so we cast undefined to false.
    authLoading: !!authLoading,
    isAuthenticated,
    login,
    logout,
  };
};
