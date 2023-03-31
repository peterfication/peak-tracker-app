import {
  AuthLoadingState,
  AuthState,
  AuthStateMode,
  isAuthState,
  MaybeAuthState,
} from '@app/hooks';
import {
  authorize,
  // logout as oauthLogout,
  refresh,
  revoke,
} from '@app/utils';

/**
 * This function is used to determine if the user is authenticated.
 *
 * It returns AuthStateMode.Loading if the auth state is not present yet. This is useful
 * to prevent the app from rendering the LoginScreen shortly before the possibly
 * authenticated auth state is retrieved.
 */
export const getIsAuthenticated = (
  authState: MaybeAuthState,
): boolean | AuthStateMode.Loading => {
  if (authState === AuthStateMode.Loading) {
    return AuthStateMode.Loading;
  }

  return authState !== AuthStateMode.NotAuthenticated;
};

/**
 * The margin in milliseconds that is used to determine if the auth state
 * is expired, so that we refresh early enough.
 */
const EXPIRATION_MARGIN = 60 * 1000; // eslint-disable-line no-magic-numbers

/**
 * Takes an expiration date and returns true if the date
 * minus 60 seconds is in the past.
 */
export const isExpired = (expiresAt: string): boolean => {
  // We subtract the EXPIRATION_MARGIN from the expiresAt date to have a buffer
  // so that we refresh early enough.
  const adjustedExpiresAtDate = new Date(
    new Date(expiresAt).getTime() - EXPIRATION_MARGIN,
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
  authLoading: AuthLoadingState,
): boolean => {
  if (
    // If the auth state is not present yet, we don't want to trigger a refresh
    !isAuthState(authState) ||
    // If the auth state is present, but the refresh token is null, we don't
    // want to trigger a refresh.
    authState.refreshToken === null ||
    // If the auth state is present, but auth is already loading, we don't
    // want to trigger another refresh.
    authLoading === AuthLoadingState.Loading
  ) {
    return false;
  }

  // If the auth state is present, but the authLoading is undefined, we
  // want to trigger a refresh just to be sure
  if (authLoading === AuthLoadingState.Init) {
    return true;
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
  authLoading: AuthLoadingState,
): boolean =>
  !(
    // If the auth state is not present yet, we don't want to trigger a refresh
    (
      !isAuthState(authState) ||
      // If the auth state is present, but the refresh token is null, we don't
      // want to trigger a refresh.
      authState.refreshToken === null ||
      // If the auth state is present, but auth is already loading, we don't
      // want to trigger another refresh.
      authLoading === AuthLoadingState.Loading
    )
  ) &&
  // If the auth state is present, but the authLoading is undefined, we
  // want to trigger a refresh just to be sure
  (authLoading === AuthLoadingState.Init ||
    // If the auth state is expired, we want to refresh it.
    isExpired(authState.expiresAt));

/**
 * Transform the result for authorize and refresh into an AuthState.
 */
const authStateFromResult = (
  result: Awaited<ReturnType<typeof refresh>>,
): AuthState => ({
  accessToken: result.accessToken,
  idToken: result.idToken,
  refreshToken: result.refreshToken,
  expiresAt: result.accessTokenExpirationDate,
  // Expire in 10 seconds for refresh testing (also change it in useAuth.login)
  // expiresAt: new Date(Date.now() + 60 * 1000 + 10 * 1000).toISOString(),
});

/**
 * This function is used to refresh the auth state.
 *
 * If the refresh token is null or the auth state is not able to refresh
 * the auth state is removed from storage.
 */
export const updateRefreshToken = async (
  authState: MaybeAuthState,
  setAuthLoading: (authLoading: AuthLoadingState) => void,
  storeAuthState: (authState: AuthState) => Promise<void>,
  removeAuthState: () => Promise<void>,
) => {
  setAuthLoading(AuthLoadingState.Loading);

  // This should not happen because shouldRefresh should return false
  // in that case
  if (!isAuthState(authState) || authState.refreshToken === null) {
    await removeAuthState();
    setAuthLoading(AuthLoadingState.NotLoading);
    return;
  }

  try {
    const result = await refresh(authState.refreshToken);
    await storeAuthState(authStateFromResult(result));
    setAuthLoading(AuthLoadingState.NotLoading);
  } catch (error) {
    error instanceof Error &&
      console.error('updateRefreshToken.storeAuthState', error.toString());

    // If an error happened, we remove the auth state so that the user can
    // login again.
    await removeAuthState();
    setAuthLoading(AuthLoadingState.NotLoading);
  }
};

/**
 * This function is used to perform the login and store the auth state.
 *
 * @param setAuthLoading React useState function to set the authLoading state
 * @param storeAuthState Function to permanently store the auth state
 */
export const performLogin = async (
  setAuthLoading: (authLoading: AuthLoadingState) => void,
  storeAuthState: (authState: AuthState) => Promise<void>,
) => {
  try {
    setAuthLoading(AuthLoadingState.Loading);

    const result = await authorize();
    await storeAuthState(authStateFromResult(result));

    // We need to set authLoading to false after the auth state is stored
    // so that we don't immediately trigger a refresh because it might be undefined
    setAuthLoading(AuthLoadingState.NotLoading);
  } catch (error) {
    error instanceof Error && console.error('performLogin', error.toString());
  }
};

/**
 * This function is used to perform the logout and remove the auth state.
 *
 * @param removeAuthState Function to remove the auth state
 */
export const performLogout = async (
  authState: MaybeAuthState,
  removeAuthState: () => Promise<void>,
) => {
  try {
    // FIXME: The logout is crashing, see oauthLogout
    // isAuthState(authState) && await oauthLogout(authState.idToken);
    isAuthState(authState) && (await revoke(authState.accessToken));
  } catch (error) {
    error instanceof Error && console.error('performLogout', error.toString());
  }

  await removeAuthState();
};
