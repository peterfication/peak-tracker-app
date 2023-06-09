import {
  AuthLoadingState,
  getIsAuthenticated,
  isExpired,
  performLogin,
  performLogout,
  shouldRefresh,
  shouldRefreshComplex,
  updateRefreshToken,
  AuthState,
  AuthStateMode,
} from '@app/hooks';
import { authorize, refresh, revoke } from '@app/utils/oauth';

jest.mock('@app/utils/oauth');
const mockedAuthorize = jest.mocked(authorize);
const mockedRefresh = jest.mocked(refresh);
const mockedRevoke = jest.mocked(revoke);

describe('getIsAuthenticated', () => {
  it('should return null for an undefined authState', () => {
    expect(getIsAuthenticated(AuthStateMode.Loading)).toBe(
      AuthStateMode.Loading,
    );
  });

  it('should return false for null authState', () => {
    expect(getIsAuthenticated(AuthStateMode.NotAuthenticated)).toBe(false);
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

  it('should return false if authState is loading', () => {
    const result = shouldRefresh(AuthStateMode.Loading, AuthLoadingState.Init);
    expect(result).toBe(false);
  });

  it('should return false if authState is not authenticated', () => {
    const result = shouldRefresh(
      AuthStateMode.NotAuthenticated,
      AuthLoadingState.Init,
    );
    expect(result).toBe(false);
  });

  it('should return false if refreshToken is null', () => {
    const authStateWithNullRefreshToken: AuthState = {
      ...authState,
      refreshToken: null,
    };
    const result = shouldRefresh(
      authStateWithNullRefreshToken,
      AuthLoadingState.Init,
    );
    expect(result).toBe(false);
  });

  it('should return false if authLoading is loading', () => {
    const result = shouldRefresh(authState, AuthLoadingState.Loading);
    expect(result).toBe(false);
  });

  it('should return true if authLoading is init', () => {
    const result = shouldRefresh(authState, AuthLoadingState.Init);
    expect(result).toBe(true);
  });

  it('should return true if authState is expired', () => {
    const authStateWithExpiredToken: AuthState = {
      ...authState,
      expiresAt: new Date().toISOString(),
    };
    const result = shouldRefresh(
      authStateWithExpiredToken,
      AuthLoadingState.NotLoading,
    );
    expect(result).toBe(true);
  });

  it('should return false if authState is not expired', () => {
    const result = shouldRefresh(authState, AuthLoadingState.NotLoading);
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

  it('should return false if authState is loading', () => {
    const result = shouldRefreshComplex(
      AuthStateMode.Loading,
      AuthLoadingState.Init,
    );
    expect(result).toBe(false);
  });

  it('should return false if authState is not authenticated', () => {
    const result = shouldRefreshComplex(
      AuthStateMode.NotAuthenticated,
      AuthLoadingState.Init,
    );
    expect(result).toBe(false);
  });

  it('should return false if refreshToken is null', () => {
    const authStateWithNullRefreshToken: AuthState = {
      ...authState,
      refreshToken: null,
    };
    const result = shouldRefreshComplex(
      authStateWithNullRefreshToken,
      AuthLoadingState.Init,
    );
    expect(result).toBe(false);
  });

  it('should return false if authLoading is loading', () => {
    const result = shouldRefreshComplex(authState, AuthLoadingState.Loading);
    expect(result).toBe(false);
  });

  it('should return true if authLoading is init', () => {
    const result = shouldRefreshComplex(authState, AuthLoadingState.Init);
    expect(result).toBe(true);
  });

  it('should return true if authState is expired', () => {
    const authStateWithExpiredToken: AuthState = {
      ...authState,
      expiresAt: new Date().toISOString(),
    };
    const result = shouldRefreshComplex(
      authStateWithExpiredToken,
      AuthLoadingState.NotLoading,
    );
    expect(result).toBe(true);
  });

  it('should return false if authState is not expired', () => {
    const result = shouldRefreshComplex(authState, AuthLoadingState.NotLoading);
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

  it('should remove auth state if authState is not valid', async () => {
    await updateRefreshToken(
      AuthStateMode.NotAuthenticated,
      setAuthLoading,
      storeAuthState,
      removeAuthState,
    );

    expect(setAuthLoading).toHaveBeenCalledWith(AuthLoadingState.Loading);
    expect(removeAuthState).toHaveBeenCalled();
    expect(setAuthLoading).toHaveBeenCalledWith(AuthLoadingState.NotLoading);
  });

  it('should remove auth state if refresh token is null', async () => {
    const invalidAuthState = { ...authState, refreshToken: null };

    await updateRefreshToken(
      invalidAuthState,
      setAuthLoading,
      storeAuthState,
      removeAuthState,
    );

    expect(setAuthLoading).toHaveBeenCalledWith(AuthLoadingState.Loading);
    expect(removeAuthState).toHaveBeenCalled();
    expect(setAuthLoading).toHaveBeenCalledWith(AuthLoadingState.NotLoading);
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

    expect(setAuthLoading).toHaveBeenCalledWith(AuthLoadingState.Loading);
    expect(mockedRefresh).toHaveBeenCalledWith(authState.refreshToken);
    expect(storeAuthState).toHaveBeenCalledWith({
      accessToken: 'new_access_token',
      idToken: 'new_id_token',
      refreshToken: 'new_refresh_token',
      expiresAt: '2020-01-01T00:00:00.000Z',
    });
    expect(setAuthLoading).toHaveBeenCalledWith(AuthLoadingState.NotLoading);
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

    expect(setAuthLoading).toHaveBeenCalledWith(AuthLoadingState.Loading);
    expect(mockedRefresh).toHaveBeenCalledWith(validAuthState.refreshToken);
    expect(removeAuthState).toHaveBeenCalled();
    expect(setAuthLoading).toHaveBeenCalledWith(AuthLoadingState.NotLoading);

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'updateRefreshToken.storeAuthState',
      'Error: Refresh failed',
    );
    consoleErrorMock.mockRestore();
  });
});

describe('performLogin', () => {
  const setAuthLoading = jest.fn();
  const storeAuthState = jest.fn();

  describe('when the call to authorize succeeds', () => {
    beforeEach(() => {
      mockedAuthorize.mockResolvedValueOnce({
        accessToken: 'new_access_token',
        idToken: 'new_id_token',
        refreshToken: 'new_refresh_token',
        accessTokenExpirationDate: '2020-01-01T00:00:00.000Z',
        tokenType: 'Bearer',
        scopes: ['openid'],
        authorizationCode: 'auth_code',
      });
    });

    it('should store the auth state if login is successful', async () => {
      await performLogin(setAuthLoading, storeAuthState);

      expect(setAuthLoading).toHaveBeenCalledWith(AuthLoadingState.Loading);
      expect(mockedAuthorize).toHaveBeenCalled();
      expect(storeAuthState).toHaveBeenCalledWith({
        accessToken: 'new_access_token',
        idToken: 'new_id_token',
        refreshToken: 'new_refresh_token',
        expiresAt: '2020-01-01T00:00:00.000Z',
      });
      expect(setAuthLoading).toHaveBeenCalledWith(AuthLoadingState.NotLoading);
    });
  });

  describe('when the call to authorize fails', () => {
    const error = new Error('Authorize failed');

    beforeEach(() => {
      mockedAuthorize.mockRejectedValue(error);
    });

    it('should log the error', async () => {
      const consoleErrorMock = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await performLogin(setAuthLoading, storeAuthState);

      expect(consoleErrorMock).toHaveBeenCalledWith(
        'performLogin',
        'Error: Authorize failed',
      );
      consoleErrorMock.mockRestore();
    });
  });
});

describe('performLogout', () => {
  const removeAuthState = jest.fn();

  describe('when isAuthState is true', () => {
    const authState: AuthState = {
      accessToken: 'access_token',
      idToken: 'id_token',
      refreshToken: 'refresh_token',
      expiresAt: '3000-01-01T00:00:00.000Z',
    };

    describe('when the call to revoke succeeds', () => {
      beforeEach(() => {
        mockedRevoke.mockResolvedValueOnce();
      });

      it('should remove the auth state', async () => {
        await performLogout(authState, removeAuthState);

        expect(mockedRevoke).toHaveBeenCalledWith(authState.accessToken);
        expect(removeAuthState).toHaveBeenCalled();
      });
    });

    describe('when the call to revoke fails', () => {
      const error = new Error('Revoke failed');

      beforeEach(() => {
        mockedRevoke.mockRejectedValueOnce(error);
      });

      it('should remove the auth state and log the error', async () => {
        const consoleErrorMock = jest
          .spyOn(console, 'error')
          .mockImplementation(() => {});

        await performLogout(authState, removeAuthState);

        expect(mockedRevoke).toHaveBeenCalledWith(authState.accessToken);
        expect(removeAuthState).toHaveBeenCalled();

        expect(consoleErrorMock).toHaveBeenCalledWith(
          'performLogout',
          'Error: Revoke failed',
        );
        consoleErrorMock.mockRestore();
      });
    });
  });
});
