import {
  shouldRefresh,
  updateRefreshToken,
} from '@peak-tracker/hooks/useAuth.helpers';
import { AuthState, MaybeAuthState } from '@peak-tracker/hooks/useAuthState';

/**
 * This function is the effect in useAuth that sets up the refresh functionality
 * for the auth state.
 */
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
    shouldRefresh(authState, authLoading) &&
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
  updateRefreshTokenWrapper();

  const refreshInterval = setInterval(() => {
    updateRefreshTokenWrapper();
  }, 2000);

  // The setInterval needs to be cleared when the component unmounts
  // otherwise it will keep running in the background and new setIntervals
  // will be created every time the component is mounted.
  return () => clearInterval(refreshInterval);
};
