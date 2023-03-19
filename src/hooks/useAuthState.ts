import { useState } from 'react';

import { useEncryptedStorage } from './useEncryptedStorage';

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
/**
 * This state is used to store the auth state in memory.
 *
 * Undefined means the initial state when nothing is loaded yet.
 * Null means no auth state is available and the user is not authenticated.
 */
export type MaybeAuthState = AuthState | null | undefined;

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
): AuthState | null => {
  if (
    authStateFromStorageString === null ||
    authStateFromStorageString === ''
  ) {
    return null;
  }

  const parsedAuthState = JSON.parse(authStateFromStorageString) as unknown;

  return isAuthState(parsedAuthState) ? parsedAuthState : null;
};

/**
 * This hook is used to store, retrieve and remove the auth state from the encrypted storage.
 */
export const useAuthState = () => {
  const { setItem, getItem } = useEncryptedStorage();

  const [authState, setAuthState] = useState<MaybeAuthState>(undefined);

  /**
   * This function is used to store the auth state in the encrypted storage.
   *
   * @param newAuthState The new auth state to be stored.
   */
  const storeAuthState = async (newAuthState: AuthState) => {
    setAuthState(newAuthState);
    await setItem('authState', JSON.stringify(newAuthState));
  };

  /**
   * This function is used to retrieve the auth state from the encrypted storage.
   *
   * @returns The auth state or undefined if it doesn't exist.
   */
  const getAuthState = async (): Promise<void> => {
    try {
      const authStateFromStorageString = await getItem('authState');
      const authStateFromStorage = parseAuthStateFromStorage(
        authStateFromStorageString,
      );

      setAuthState(authStateFromStorage);
    } catch (error) {
      error instanceof Error && console.error('getAuthState', error.toString());

      // If there was an error getting the auth state from the encrypted storage,
      // we remove it from the encrypted storage.
      await setItem('authState', '');

      setAuthState(null);
    }
  };

  /**
   * This function is used to remove the auth state from the encrypted storage.
   */
  const removeAuthState = async () => {
    setAuthState(null);
    await setItem('authState', '');
  };

  return { authState, storeAuthState, getAuthState, removeAuthState };
};
