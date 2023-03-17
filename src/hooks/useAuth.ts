import { useEffect } from 'react';

import { AuthContextInterface } from '../contexts/AuthContext';
import {
  authorize,
  // logout as oauthLogout,
  revoke,
} from '../utils/oauth';
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

/**
 * This function is used to determine if the user is authenticated.
 *
 * It returns null if the auth state is not present yet. This is useful
 * to prevent the app from rendering the LoginScreen shortly before the
 * authenticated auth state is retrieved.
 */
export const getIsAuthenticated = (
  authState: MaybeAuthState,
): boolean | null => {
  // Undefined means that the auth state is not present yet.
  if (authState === undefined) {
    return null;
  }

  // Null means that the user is not authenticated.
  return authState !== null;
};

/**
 * This hook is used to login and logout and interacting with the
 * auth state via the useAuthState hook.
 */
export const useAuth = (): UseAuthReturnType => {
  const { authState, getAuthState, storeAuthState, removeAuthState } =
    useAuthState();

  useEffect(
    () => {
      // Set initial auth state from storage if available.
      const setInitialAuthState = async () => {
        await getAuthState();
      };
      setInitialAuthState().catch(error => {
        error instanceof Error &&
          console.error('setInitialAuthState', error.toString());
      });
    },
    // We only want to run this effect once, hence the empty dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const login = async () => {
    try {
      const result = await authorize();

      const newAuthState: AuthState = {
        accessToken: result.accessToken,
        idToken: result.idToken,
        refreshToken: result.refreshToken,
        expiresAt: result.accessTokenExpirationDate,
      };

      await storeAuthState(newAuthState);
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

  return { isAuthenticated, login, logout };
};
