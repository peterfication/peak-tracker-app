import { useEffect } from 'react';

import { AuthContextInterface } from '../contexts/AuthContext';
import { useAuthState, AuthState, MaybeAuthState } from './useAuthState';

/**
 * The login function is not part of the AuthContextInterface because it is
 * only needed in the login screen and there it can be passed as a prop in
 * the AuthProvider.
 */
type UseAuthReturnType = AuthContextInterface & { login: () => Promise<void> };

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

  useEffect(() => {
    // Set initial auth state from storage if available.
    getAuthState();
    // We only want to run this effect once, hence the empty dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async () => {
    // Sleep for a second to simulate a network request.
    // eslint-disable-next-line  no-promise-executor-return
    await new Promise(resolve => setTimeout(resolve, 100));

    const newAuthState: AuthState = {
      accessToken: 'accessToken',
      idToken: 'idToken',
      refreshToken: 'refreshToken',
    };
    storeAuthState(newAuthState);
  };

  const logout = async () => {
    // Sleep for a second to simulate a network request.
    // eslint-disable-next-line  no-promise-executor-return
    await new Promise(resolve => setTimeout(resolve, 100));

    removeAuthState();
  };

  const isAuthenticated = getIsAuthenticated(authState);

  return { isAuthenticated, login, logout };
};
