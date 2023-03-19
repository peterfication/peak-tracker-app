import { refresh } from '../../utils/oauth';
import {
  getIsAuthenticated,
  isExpired,
  shouldRefresh,
  shouldRefreshComplex,
  updateRefreshToken,
} from '../useAuth.helpers';
import { AuthState } from '../useAuthState';

jest.mock('../../utils/oauth', () => ({
  authorize: jest.fn(),
  logout: jest.fn(),
  revoke: jest.fn(),
  refresh: jest.fn(),
}));

describe('getIsAuthenticated', () => {
  it('should return null for an undefined authState', () => {
    expect(getIsAuthenticated(undefined)).toBeNull();
  });

  it('should return false for null authState', () => {
    expect(getIsAuthenticated(null)).toBe(false);
  });

  it('should return true for authState with a defined accessToken', () => {
    const authState: AuthState = {
      accessToken: 'mockAccessToken',
      idToken: 'mockIdToken',
      refreshToken: 'mockRefreshToken',
      expiresAt: '2020-01-01T00:00:00.000Z',
    };

    expect(getIsAuthenticated(authState)).toBe(true);
  });
});

describe('isExpired', () => {
  it('should return true if the expiration date is 59 seconds in the future', () => {
    const expiresAt = new Date(Date.now() + 59 * 1000).toISOString();
    const result = isExpired(expiresAt);
    expect(result).toBe(true);
  });

  it('should return false if the expiration date is 60 seconds in the future', () => {
    const expiresAt = new Date(Date.now() + 60 * 1000).toISOString();
    const result = isExpired(expiresAt);
    expect(result).toBe(false);
  });
});

describe('shouldRefresh', () => {
  const authState: AuthState = {
    accessToken: 'access_token',
    idToken: 'id_token',
    refreshToken: 'refresh_token',
    expiresAt: new Date(Date.now() + 60 * 1000).toISOString(),
  };

  it('should return false if authState is undefined', () => {
    const result = shouldRefresh(undefined, undefined);
    expect(result).toBe(false);
  });

  it('should return false if authState is null', () => {
    const result = shouldRefresh(null, undefined);
    expect(result).toBe(false);
  });

  it('should return false if refreshToken is null', () => {
    const authStateWithNullRefreshToken: AuthState = {
      ...authState,
      refreshToken: null,
    };
    const result = shouldRefresh(authStateWithNullRefreshToken, undefined);
    expect(result).toBe(false);
  });

  it('should return false if authLoading is true', () => {
    const result = shouldRefresh(authState, true);
    expect(result).toBe(false);
  });

  it('should return true if authLoading is undefined', () => {
    const result = shouldRefresh(authState, undefined);
    expect(result).toBe(true);
  });

  it('should return true if authState is expired', () => {
    const authStateWithExpiredToken: AuthState = {
      ...authState,
      expiresAt: new Date().toISOString(),
    };
    const result = shouldRefresh(authStateWithExpiredToken, false);
    expect(result).toBe(true);
  });

  it('should return false if authState is not expired', () => {
    const result = shouldRefresh(authState, false);
    expect(result).toBe(true);
  });
});

describe('shouldRefreshComplex', () => {
  const authState: AuthState = {
    accessToken: 'access_token',
    idToken: 'id_token',
    refreshToken: 'refresh_token',
    expiresAt: new Date(Date.now() + 60 * 1000).toISOString(),
  };

  it('should return false if authState is undefined', () => {
    const result = shouldRefreshComplex(undefined, undefined);
    expect(result).toBe(false);
  });

  it('should return false if authState is null', () => {
    const result = shouldRefreshComplex(null, undefined);
    expect(result).toBe(false);
  });

  it('should return false if refreshToken is null', () => {
    const authStateWithNullRefreshToken: AuthState = {
      ...authState,
      refreshToken: null,
    };
    const result = shouldRefreshComplex(
      authStateWithNullRefreshToken,
      undefined,
    );
    expect(result).toBe(false);
  });

  it('should return false if authLoading is true', () => {
    const result = shouldRefreshComplex(authState, true);
    expect(result).toBe(false);
  });

  it('should return true if authLoading is undefined', () => {
    const result = shouldRefreshComplex(authState, undefined);
    expect(result).toBe(true);
  });

  it('should return true if authState is expired', () => {
    const authStateWithExpiredToken: AuthState = {
      ...authState,
      expiresAt: new Date().toISOString(),
    };
    const result = shouldRefreshComplex(authStateWithExpiredToken, false);
    expect(result).toBe(true);
  });

  it('should return false if authState is not expired', () => {
    const result = shouldRefreshComplex(authState, false);
    expect(result).toBe(true);
  });
});

describe('updateRefreshToken', () => {
  const authState = {
    accessToken: 'access_token',
    idToken: 'id_token',
    refreshToken: 'refresh_token',
    expiresAt: '2020-01-01T00:00:00.000Z',
  };

  const setAuthLoading = jest.fn();
  const storeAuthState = jest.fn();
  const removeAuthState = jest.fn();

  const mockedRefresh = jest.mocked(refresh);

  it('should remove auth state if authState is not valid', async () => {
    await updateRefreshToken(
      null,
      setAuthLoading,
      storeAuthState,
      removeAuthState,
    );

    expect(setAuthLoading).toHaveBeenCalledWith(true);
    expect(removeAuthState).toHaveBeenCalled();
    expect(setAuthLoading).toHaveBeenCalledWith(false);
  });

  it('should remove auth state if refresh token is null', async () => {
    const invalidAuthState = { ...authState, refreshToken: null };

    await updateRefreshToken(
      invalidAuthState,
      setAuthLoading,
      storeAuthState,
      removeAuthState,
    );

    expect(setAuthLoading).toHaveBeenCalledWith(true);
    expect(removeAuthState).toHaveBeenCalled();
    expect(setAuthLoading).toHaveBeenCalledWith(false);
  });

  it('should update the auth state if refresh token is valid', async () => {
    mockedRefresh.mockResolvedValueOnce({
      accessToken: 'new_access_token',
      idToken: 'new_id_token',
      refreshToken: 'new_refresh_token',
      accessTokenExpirationDate: '2020-01-01T00:00:00.000Z',
      tokenType: 'Bearer',
    });

    await updateRefreshToken(
      authState,
      setAuthLoading,
      storeAuthState,
      removeAuthState,
    );

    expect(setAuthLoading).toHaveBeenCalledWith(true);
    expect(mockedRefresh).toHaveBeenCalledWith(authState.refreshToken);
    expect(storeAuthState).toHaveBeenCalledWith({
      accessToken: 'new_access_token',
      idToken: 'new_id_token',
      refreshToken: 'new_refresh_token',
      expiresAt: '2020-01-01T00:00:00.000Z',
    });
    expect(setAuthLoading).toHaveBeenCalledWith(false);
  });

  it('should remove auth state if refresh token refresh fails', async () => {
    mockedRefresh.mockRejectedValue(new Error('Refresh failed'));

    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const validAuthState = { ...authState };
    await updateRefreshToken(
      validAuthState,
      setAuthLoading,
      storeAuthState,
      removeAuthState,
    );

    expect(setAuthLoading).toHaveBeenCalledWith(true);
    expect(mockedRefresh).toHaveBeenCalledWith(validAuthState.refreshToken);
    expect(removeAuthState).toHaveBeenCalled();
    expect(setAuthLoading).toHaveBeenCalledWith(false);

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'updateRefreshToken.storeAuthState',
      'Error: Refresh failed',
    );
    consoleErrorMock.mockRestore();
  });
});
