import {
  authorize as RNAuthorize,
  logout as RNLogout,
  refresh as RNRefresh,
  revoke as RNRevoke,
} from 'react-native-app-auth';

import { authorize, logout, refresh, revoke } from '@app/utils';

jest.mock('react-native-app-auth');

const mockAccessToken = 'access-token';
const mockRefreshToken = 'refresh-token';
const mockIdToken = 'id-token';

describe('authorize', () => {
  describe('when OAUTH_USE_LOCALHOST is true', () => {
    it('calls RNAuthorize with local config', async () => {
      await authorize();
      expect(RNAuthorize).toHaveBeenCalledWith({
        redirectUrl: 'com.peak-tracker.auth://callback/',
        scopes: ['openid'],
        iosPrefersEphemeralSession: true,
        issuer: 'http://localhost:3000',
        clientId: 'local-abc-123-app',
      });
    });
  });
});

describe('refresh', () => {
  describe('when OAUTH_USE_LOCALHOST is true', () => {
    it('calls RNRefresh with local config and correct parameters', async () => {
      await refresh(mockRefreshToken);
      expect(RNRefresh).toHaveBeenCalledWith(
        {
          redirectUrl: 'com.peak-tracker.auth://callback/',
          scopes: ['openid'],
          iosPrefersEphemeralSession: true,
          issuer: 'http://localhost:3000',
          clientId: 'local-abc-123-app',
        },
        {
          refreshToken: mockRefreshToken,
        },
      );
    });
  });
});

describe('logout', () => {
  describe('when OAUTH_USE_LOCALHOST is true', () => {
    it('calls RNLogout with local config and correct parameters', async () => {
      await logout(mockIdToken);
      expect(RNLogout).toHaveBeenCalledWith(
        {
          redirectUrl: 'com.peak-tracker.auth://callback/',
          scopes: ['openid'],
          iosPrefersEphemeralSession: true,
          issuer: 'http://localhost:3000',
          clientId: 'local-abc-123-app',
        },
        {
          idToken: mockIdToken,
          postLogoutRedirectUrl: 'com.peak-tracker.auth://logout/',
        },
      );
    });
  });
});

describe('revoke', () => {
  describe('when OAUTH_USE_LOCALHOST is true', () => {
    it('calls RNRevoke with local config and correct parameters', async () => {
      await revoke(mockAccessToken);
      expect(RNRevoke).toHaveBeenCalledWith(
        {
          redirectUrl: 'com.peak-tracker.auth://callback/',
          scopes: ['openid'],
          iosPrefersEphemeralSession: true,
          issuer: 'http://localhost:3000',
          clientId: 'local-abc-123-app',
        },
        {
          tokenToRevoke: mockAccessToken,
          includeBasicAuth: false,
          sendClientId: true,
        },
      );
    });
  });
});
