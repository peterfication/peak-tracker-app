import { act, renderHook } from '@testing-library/react-hooks';

import { authorize, revoke } from '../../utils/oauth';
import { useAuth } from '../useAuth';
import { AuthState, isAuthState, useAuthState } from '../useAuthState';

const mockedAuthState: ReturnType<typeof useAuthState> = {
  authState: null,
  getAuthState: jest.fn(),
  storeAuthState: jest.fn(),
  removeAuthState: jest.fn(),
};

jest.mock('../useAuthState', () => ({
  useAuthState: () => mockedAuthState,
  isAuthState: jest.fn(),
}));

const mockedIsAuthState = jest.mocked(isAuthState);

const mockedAuthStateContent: AuthState = {
  accessToken: 'mockAccessToken',
  idToken: 'mockIdToken',
  refreshToken: 'mockRefreshToken',
  expiresAt: '2020-01-01T00:00:00.000Z',
};

jest.mock('../../utils/oauth', () => ({
  authorize: jest.fn(),
  logout: jest.fn(),
  revoke: jest.fn(),
  refresh: jest.fn(),
}));

const mockedAuthorize = jest.mocked(authorize);
const mockedRevoke = jest.mocked(revoke);
const mockedAuthorizeResult: Awaited<ReturnType<typeof mockedAuthorize>> = {
  accessToken: 'mockAccessToken',
  idToken: 'mockIdToken',
  refreshToken: 'mockRefreshToken',
  accessTokenExpirationDate: '2020-01-01T00:00:00.000Z',
  tokenType: 'Bearer',
  scopes: ['openid'],
  authorizationCode: 'mockAuthorizationCode',
};

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isAuthenticated', () => {
    it('should be false when auth state is not present', () => {
      mockedAuthState.authState = null;
      const { result } = renderHook(() => useAuth());
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should be true when auth state is present', () => {
      mockedAuthState.authState = mockedAuthStateContent;
      const { result } = renderHook(() => useAuth());
      expect(result.current.isAuthenticated).toBe(true);
    });
  });

  describe('login', () => {
    describe('when the authorize call succeeds', () => {
      it('should call storeAuthState', async () => {
        mockedAuthorize.mockResolvedValueOnce(mockedAuthorizeResult);
        const { result } = renderHook(() => useAuth());

        await act(async () => {
          await result.current.login();
        });

        expect(mockedAuthState.storeAuthState).toHaveBeenCalled();
      });
    });

    describe('when the authorize call fails', () => {
      it('should call storeAuthState', async () => {
        const error = new Error('mockError');
        mockedAuthorize.mockRejectedValueOnce(error);

        const { result } = renderHook(() => useAuth());

        const consoleErrorMock = jest
          .spyOn(console, 'error')
          .mockImplementation(() => {});

        await act(async () => {
          await result.current.login();
        });

        expect(mockedAuthState.storeAuthState).not.toHaveBeenCalled();
        expect(consoleErrorMock).toHaveBeenCalledWith(
          'useAuth.login',
          'Error: mockError',
        );
        consoleErrorMock.mockRestore();
      });
    });
  });

  describe('logout', () => {
    describe('when revoke throws an error', () => {
      it('should call removeAuthState', async () => {
        mockedAuthState.authState = mockedAuthStateContent;
        // For useEffect to prevent a change in the auth state
        mockedIsAuthState.mockReturnValueOnce(false);
        // For logout
        mockedIsAuthState.mockReturnValueOnce(true);

        const error = new Error('mockError');
        mockedRevoke.mockRejectedValueOnce(error);

        const { result } = renderHook(() => useAuth());

        const consoleErrorMock = jest
          .spyOn(console, 'error')
          .mockImplementation(() => {});

        await act(async () => {
          await result.current.logout();
        });

        expect(mockedAuthState.removeAuthState).toHaveBeenCalled();
        expect(consoleErrorMock).toHaveBeenCalledWith(
          'useAuth.logout',
          'Error: mockError',
        );
        consoleErrorMock.mockRestore();
      });
    });

    describe('when an auth state is present', () => {
      it('should call revoke and removeAuthState', async () => {
        // For useEffect to prevent a change in the auth state
        mockedIsAuthState.mockReturnValueOnce(false);
        // For logout
        mockedIsAuthState.mockReturnValueOnce(true);

        const { result } = renderHook(() => useAuth());

        await act(async () => {
          await result.current.logout();
        });
        expect(mockedRevoke).toHaveBeenCalled();
        expect(mockedAuthState.removeAuthState).toHaveBeenCalled();
      });
    });

    describe('when no auth state is present', () => {
      it('should only call removeAuthState', async () => {
        mockedIsAuthState.mockReturnValueOnce(false);
        const { result } = renderHook(() => useAuth());

        await act(async () => {
          await result.current.logout();
        });
        expect(mockedAuthState.removeAuthState).toHaveBeenCalled();
      });
    });
  });
});
