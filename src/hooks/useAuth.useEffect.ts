import {
  shouldRefresh,
  updateRefreshToken,
  AuthLoadingState,
} from './useAuth.helpers';
import { AuthState, MaybeAuthState } from './useAuthState';

/**
 * Check whether the auth state should be refreshed every 2 seconds.
 */
const REFRESH_CHECK_INTERVAL = 2 * 1000; // eslint-disable-line no-magic-numbers

/**
 * This function is the effect in useAuth that sets up the refresh functionality
 * for the auth state.
 */
export const effectUpdateRefreshToken = (
  authState: MaybeAuthState,
  authLoading: AuthLoadingState,
  setAuthLoading: (authLoading: AuthLoadingState) => void,
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
  }, REFRESH_CHECK_INTERVAL);

  // The setInterval needs to be cleared when the component unmounts
  // otherwise it will keep running in the background and new setIntervals
  // will be created every time the component is mounted.
  return () => clearInterval(refreshInterval);
};
