import { createContext } from 'react';

import { AuthStateMode } from '@app/hooks';

export interface AuthContextInterface {
  /**
   * Logs the user out. This will result in isAuthenticated being set to false
   * and the LoginScreen being rendered.
   */
  logout: () => Promise<void>;
  /**
   * The initial value of isAuthenticated is null to be able to handle
   * the case when the auth state is not yet set (auth state === undefined)
   * to show the user a loading screen (see LoginLoadingScreen in AuthProvider).
   */
  isAuthenticated: boolean | AuthStateMode.Loading;
}

/**
 * For more information, check the docs of the return values of
 * `useContext(AuthContext)`, e.g.:
 *
 *   `const { logout, ... } = useContext(AuthContext)`
 */
export const AuthContext = createContext<AuthContextInterface>({
  logout: async () => {},
  isAuthenticated: false,
});
