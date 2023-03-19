import { refresh } from '../utils/oauth';
import { AuthState, isAuthState, MaybeAuthState } from './useAuthState';

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
 * Takes an expiration date and returns true if the date
 * minus 60 seconds is in the past.
 */
export const isExpired = (expiresAt: string): boolean => {
  // We subtract 60 seconds from the expiresAt date to have a buffer
  const adjustedExpiresAtDate = new Date(
    new Date(expiresAt).getTime() - 60 * 1000,
  );

  const now = new Date();
  return now > adjustedExpiresAtDate;
};

/**
 * This function is used to determine if the auth state should be refreshed.
 *
 * NOTE: This function could be written in a single line but then it would
 * be way harder to reason about. It would look like shouldRefreshComplex then.
 */
export const shouldRefresh = (
  authState: MaybeAuthState,
  authLoading: boolean | undefined,
): boolean => {
  // If the auth state is not present yet, we don't want to trigger a refresh
  if (!isAuthState(authState)) {
    return false;
  }

  // If the auth state is present, but the refresh token is null, we don't
  // want to trigger a refresh.
  if (authState.refreshToken === null) {
    return false;
  }

  // If the auth state is present, but the authLoading is undefined, we
  // want to trigger a refresh just to be sure
  if (authLoading === undefined) {
    return true;
  }

  // If the auth state is present, but the authLoading is true, we don't
  // want to trigger another refresh.
  if (authLoading) {
    return false;
  }

  // If the auth state is expired, we want to refresh it.
  return isExpired(authState.expiresAt);
};

/**
 * This function ist just for demonstration purposes. It is the same as
 * shouldRefresh but written in a single line and IMO in a more complex way.
 */
export const shouldRefreshComplex = (
  authState: MaybeAuthState,
  authLoading: boolean | undefined,
): boolean =>
  !(
    // If the auth state is not present yet, we don't want to trigger a refresh
    (
      !isAuthState(authState) ||
      // If the auth state is present, but the refresh token is null, we don't
      // want to trigger a refresh.
      authState.refreshToken === null ||
      // If the auth state is present, but the authLoading is true, we don't
      // want to trigger another refresh.
      authLoading
    )
  ) &&
  // If the auth state is present, but the authLoading is undefined, we
  // want to trigger a refresh just to be sure
  (authLoading === undefined ||
    // If the auth state is expired, we want to refresh it.
    isExpired(authState.expiresAt));

/**
 * This function is used to refresh the auth state.
 *
 * If the refresh token is null or the auth state is not able to refresh
 * the auth state is removed from storage.
 */
export const updateRefreshToken = async (
  authState: MaybeAuthState,
  setAuthLoading: (authLoading: boolean) => void,
  storeAuthState: (authState: AuthState) => Promise<void>,
  removeAuthState: () => Promise<void>,
) => {
  setAuthLoading(true);

  // This should not happen because shouldRefresh should return false
  // in that case
  if (!isAuthState(authState) || authState.refreshToken === null) {
    await removeAuthState();
    setAuthLoading(false);
    return;
  }

  try {
    const result = await refresh(authState.refreshToken);
    const newAuthState: AuthState = {
      accessToken: result.accessToken,
      idToken: result.idToken,
      refreshToken: result.refreshToken,
      expiresAt: result.accessTokenExpirationDate,
    };

    await storeAuthState(newAuthState);
    setAuthLoading(false);
  } catch (error) {
    error instanceof Error &&
      console.error('updateRefreshToken.storeAuthState', error.toString());

    // If an error happened, we remove the auth state so that the user can
    // login again.
    await removeAuthState();
    setAuthLoading(false);
  }
};
