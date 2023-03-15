import { renderHook, act } from '@testing-library/react-hooks';

import { AuthState, useAuthState } from '../useAuthState';
import { getIsAuthenticated, useAuth } from '../useAuth';

const mockedAuthState: ReturnType<typeof useAuthState> = {
  authState: null,
  getAuthState: jest.fn(),
  storeAuthState: jest.fn(),
  removeAuthState: jest.fn(),
};

jest.mock('../useAuthState', () => ({
  useAuthState: () => mockedAuthState,
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
      accessToken: '1234567890',
      idToken: '1234567890',
      refreshToken: '1234567890',
    };

    expect(getIsAuthenticated(authState)).toBe(true);
  });
});

describe('useAuth', () => {
  describe('isAuthenticated', () => {
    it('should be false when auth state is not present', () => {
      mockedAuthState.authState = null;
      const { result } = renderHook(() => useAuth());
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should be true when auth state is present', () => {
      mockedAuthState.authState = {
        accessToken: 'mockAccessToken',
        idToken: 'mockIdToken',
        refreshToken: 'mockRefreshToken',
      };
      const { result } = renderHook(() => useAuth());
      expect(result.current.isAuthenticated).toBe(true);
    });
  });

  describe('login', () => {
    it('should call storeAuthState', async () => {
      const { result } = renderHook(() => useAuth());
      await act(async () => {
        await result.current.login();
      });
      expect(mockedAuthState.storeAuthState).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should call removeAuthState', async () => {
      const { result } = renderHook(() => useAuth());
      await act(async () => {
        await result.current.logout();
      });
      expect(mockedAuthState.removeAuthState).toHaveBeenCalled();
    });
  });
});
