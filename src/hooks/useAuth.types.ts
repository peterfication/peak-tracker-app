import type { AuthContextInterface } from '@app/contexts';

import { MaybeAuthState } from './useAuthState';

/**
 *
 * Whether the auth state is refreshing at the moment.
 */
export enum AuthLoadingState {
  /**
   * On startup, the auth state is unknown, hence we don't know yet if we need to
   * refresh it.
   */
  Init = 'INIT',
  /**
   * An auth state refresh is in progress.
   */
  Loading = 'LOADING',
  /**
   * No auth state refresh is in progress.
   */
  NotLoading = 'NOT_LOADING',
}

/**
 * The login function is not part of the AuthContextInterface because it is
 * only needed in the login screen and there it can be passed as a prop in
 * the AuthProvider.
 */
export type UseAuthReturnType = AuthContextInterface & {
  /**
   * This function is used to login the user in the app
   * via the OAuth flow. After the user has logged in, the auth state is
   * set and stored in storage.
   */
  login: () => Promise<void>;

  /**
   * Whether the auth state is refreshing at the moment.
   *
   * Default is AuthLoadingState.Init, because we need to wait for the initial auth load
   * in useAuth.
   */
  authLoading: AuthLoadingState;
  authState: MaybeAuthState;
};
