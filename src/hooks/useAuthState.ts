import { useState } from 'react';

import { useEncryptedStorage } from './useEncryptedStorage';

/**
 * @see MaybeAuthState
 */
export interface AuthState {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}
/**
 * This state is used to store the auth state in memory.
 *
 * Undefined means the initial state when nothing is loaded yet.
 * Null means no auth state is available and the user is not authenticated.
 */
export type MaybeAuthState = AuthState | null | undefined;

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
  const getAuthState = async (): Promise<MaybeAuthState> => {
    try {
      const authStateFromStorageString = await getItem('authState');

      const parsedAuthState =
        authStateFromStorageString &&
        authStateFromStorageString !== '' &&
        JSON.parse(authStateFromStorageString);

      setAuthState(parsedAuthState);

      return parsedAuthState;
    } catch (error) {
      console.error(`${error}`);
      setAuthState(null);
      return null;
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
