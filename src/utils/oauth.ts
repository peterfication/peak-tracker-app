import {
  authorize as RNAuthorize,
  logout as RNLogout,
  refresh as RNRefresh,
  revoke as RNRevoke,
} from 'react-native-app-auth';
import { OAUTH_CLIENT_ID, OAUTH_USE_LOCALHOST } from '@env';

/**
 * It can't be imported from react-native-app-auth because it's not exported.
 *
 * `AuthConfiguration not found in 'react-native-app-auth'`
 */
type AuthConfiguration = Parameters<typeof RNAuthorize>[0];

/**
 * The common config for both the production and localhost config.
 */
const configBase: Pick<AuthConfiguration, 'redirectUrl' | 'scopes'> = {
  redirectUrl: 'com.peak-tracker.auth://callback/',
  scopes: ['openid'],
};

/**
 * The config that calls the production OAuth server.
 */
const configProduction = (): AuthConfiguration => ({
  ...configBase,
  issuer: 'https://auth.peak-tracker.com',
  clientId: OAUTH_CLIENT_ID ?? '',
});

/**
 * The config that calls the OAuth server running on localhost for testing
 * of the OAuth flow.
 */
const configLocalhost = (): AuthConfiguration => ({
  ...configBase,
  issuer: 'http://localhost:3000',
  clientId: 'local-abc-123-app',
});

/**
 * This function is used to determine whether to use the production or
 * the localhost config.
 */
const config = (): AuthConfiguration => {
  OAUTH_USE_LOCALHOST === 'true' &&
    process.env.NODE_ENV !== 'test' &&
    /* istanbul ignore next */
    console.log('Using localhost as OAuth issuer.');

  /* istanbul ignore next */
  return OAUTH_USE_LOCALHOST === 'true'
    ? configLocalhost()
    : configProduction();
};

/**
 * This function is used to authorize a user. It constructs the necessary
 * OpenID connect config from the environment, either for using localhost
 * or the production config and then calls the authorize function from
 * react-native-app-auth.
 *
 * @throws errors from react-native-app-auth
 */
export const authorize = async () => await RNAuthorize(config());

/**
 * This function is used to refresh the tokens of a user. It constructs the necessary
 * OpenID connect config from the environment, either for using localhost
 * or the production config and then calls the authorize function from
 * react-native-app-auth.
 *
 * @param refreshToken The refresh token of the user to refresh the tokens.
 *
 * @throws errors from react-native-app-auth
 */
export const refresh = async (refreshToken: string) =>
  await RNRefresh(config(), {
    refreshToken,
  });

/**
 * This function is used to perform an OpenID connect logout. It constructs the necessary
 * OpenID connect config from the environment, either for using localhost
 * or the production config and then calls the authorize function from
 * react-native-app-auth.
 *
 * @param idToken The id token of the user to logout.
 *
 * @throws errors from react-native-app-auth
 */
export const logout = async (idToken: string) =>
  // FIXME: This is crashing. Maybe because of the postLogoutRedirectUrl?
  await RNLogout(config(), {
    idToken,
    postLogoutRedirectUrl: 'com.peak-tracker.auth://logout/',
  });

/**
 * This function is used to revoke a token. It constructs the necessary
 * OpenID connect config from the environment, either for using localhost
 * or the production config and then calls the authorize function from
 * react-native-app-auth.
 *
 * @param accessToken The access token of the user to revoke.
 *
 * @throws errors from react-native-app-auth
 */
export const revoke = async (accessToken: string) =>
  await RNRevoke(config(), {
    tokenToRevoke: accessToken,
    includeBasicAuth: false,
    sendClientId: true,
  });
