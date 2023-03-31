import { useCallback, useState } from 'react';

import { useEncryptedStorage } from '@app/hooks';

/**
 * @see MaybeAuthState
 */
export interface AuthState {
  accessToken: string;
  idToken: string;
  /**
   * It's not guaranteed that the refresh token is available, hence it can be null.
   */
  refreshToken: string | null;
  expiresAt: string;
}

export enum AuthStateMode {
  /**
   * This mode means that on startup, the auth state is not loaded yet.
   */
  Loading = 'LOADING',
  /**
   * This mode means that no auth state is available and the user is not authenticated.
   */
  NotAuthenticated = 'NOT_AUTHENTICATED',
}

/**
 * This state represents the state of the auth information.
 */
export type MaybeAuthState = AuthState | AuthStateMode;

/**
 * Type guard to check if the auth state is an AuthState.
 */
export const isAuthState = (authState: unknown): authState is AuthState =>
  typeof authState === 'object' &&
  authState !== null &&
  'accessToken' in authState &&
  'idToken' in authState &&
  'refreshToken' in authState &&
  'expiresAt' in authState;

/**
 * Parse the data from the encrypted storage.
 *
 * Returns null if the data in the encrypted storage is not a JSON or empty.
 *
 * @throws If the data in the encrypted storage is not a JSON. This has to be handled by the caller.
 */
const parseAuthStateFromStorage = (
  authStateFromStorageString: string | null,
): AuthState | AuthStateMode.NotAuthenticated => {
  if (
    authStateFromStorageString === null ||
    authStateFromStorageString === ''
  ) {
    return AuthStateMode.NotAuthenticated;
  }

  const parsedAuthState = JSON.parse(authStateFromStorageString) as unknown;

  return isAuthState(parsedAuthState)
    ? parsedAuthState
    : AuthStateMode.NotAuthenticated;
};

interface UseAuthStateReturnType {
  authState: MaybeAuthState;
  /**
   * This function is used to store the auth state in the encrypted storage.
   *
   * @param newAuthState The new auth state to be stored.
   */
  storeAuthState: (newAuthState: AuthState) => Promise<void>;
  /**
   * This function is used to retrieve the auth state from the encrypted storage.
   *
   * @returns The auth state or undefined if it doesn't exist.
   */
  getAuthState: () => Promise<AuthState | AuthStateMode.NotAuthenticated>;
  /**
   * This method is used to get the id token from the auth state without triggering
   * re-renders in case the ID token changes. This is needed in the ApolloProvider so
   * that the Apollo client is not re-created every time the ID token changes.
   *
   * It will always return a string but this string might be empty if the auth state
   * is not available.
   */
  getIdToken: () => Promise<string>;
  /**
   * This function is used to remove the auth state from the encrypted storage.
   */
  removeAuthState: () => Promise<void>;
}
/**
 * This hook is used to store, retrieve and remove the auth state from the encrypted storage.
 */
export const useAuthState = (): UseAuthStateReturnType => {
  const { setItem, getItem } = useEncryptedStorage();

  const [authState, setAuthState] = useState<MaybeAuthState>(
    AuthStateMode.Loading,
  );

  const storeAuthState = useCallback(
    async (newAuthState: AuthState) => {
      setAuthState(newAuthState);
      await setItem('authState', JSON.stringify(newAuthState));
    },
    [setItem],
  );

  const getAuthState = useCallback(async (): Promise<
    AuthState | AuthStateMode.NotAuthenticated
  > => {
    try {
      const authStateFromStorageString = await getItem('authState');
      const authStateFromStorage = parseAuthStateFromStorage(
        authStateFromStorageString,
      );

      setAuthState(authStateFromStorage);
      return authStateFromStorage;
    } catch (error) {
      error instanceof Error && console.error('getAuthState', error.toString());

      // If there was an error getting the auth state from the encrypted storage,
      // we remove it from the encrypted storage.
      await setItem('authState', '');

      setAuthState(AuthStateMode.NotAuthenticated);
      return AuthStateMode.NotAuthenticated;
    }
  }, [getItem, setItem]);

  const getIdToken = useCallback(async (): Promise<string> => {
    try {
      const authStateFromStorageString = await getItem('authState');
      const authStateFromStorage = parseAuthStateFromStorage(
        authStateFromStorageString,
      );

      if (isAuthState(authStateFromStorage)) {
        return authStateFromStorage.idToken;
      }
      return '';
    } catch (error) {
      return '';
    }
  }, [getItem]);

  const removeAuthState = useCallback(async () => {
    setAuthState(AuthStateMode.NotAuthenticated);
    await setItem('authState', '');
  }, [setItem]);

  return {
    authState,
    storeAuthState,
    getAuthState,
    getIdToken,
    removeAuthState,
  };
};
