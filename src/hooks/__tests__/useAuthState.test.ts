import { act, renderHook } from '@testing-library/react-hooks';

import { AuthState, useAuthState } from '../useAuthState';
import { useEncryptedStorage } from '../useEncryptedStorage';

const mockedUseEncryptedStorage: ReturnType<typeof useEncryptedStorage> = {
  value: null,
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
const mockedGetItem = jest.mocked(mockedUseEncryptedStorage.getItem);
const mockedSetItem = jest.mocked(mockedUseEncryptedStorage.setItem);

jest.mock('../useEncryptedStorage', () => ({
  useEncryptedStorage: () => mockedUseEncryptedStorage,
}));

describe('useAuthState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const authState: AuthState = {
    accessToken: 'mockAccessToken',
    idToken: 'mockIdToken',
    refreshToken: 'mockRefreshToken',
    expiresAt: '2020-01-01T00:00:00.000Z',
  };

  describe('storeAuthState', () => {
    it('should store auth state in encrypted storage', async () => {
      const { result } = renderHook(() => useAuthState());

      await act(async () => {
        await result.current.storeAuthState(authState);
      });

      expect(mockedUseEncryptedStorage.setItem).toHaveBeenCalledWith(
        'authState',
        JSON.stringify(authState),
      );
      expect(result.current.authState).toEqual(authState);
    });
  });

  describe('getAuthState', () => {
    it('should retrieve auth state from encrypted storage', async () => {
      mockedGetItem.mockResolvedValueOnce(JSON.stringify(authState));

      const { result } = renderHook(() => useAuthState());

      await act(async () => {
        await result.current.getAuthState();
      });

      expect(mockedGetItem).toHaveBeenCalledWith('authState');
      expect(result.current.authState).toEqual(authState);
    });

    it('should return null if auth state does not exist', async () => {
      mockedGetItem.mockResolvedValueOnce(null);

      const { result } = renderHook(() => useAuthState());

      await act(async () => {
        await result.current.getAuthState();
      });

      expect(mockedGetItem).toHaveBeenCalledWith('authState');
      expect(result.current.authState).toBeNull();
    });

    it('should handle an empty string in storage', async () => {
      mockedGetItem.mockResolvedValueOnce('');

      const { result } = renderHook(() => useAuthState());

      await act(async () => {
        await result.current.getAuthState();
      });

      expect(mockedGetItem).toHaveBeenCalledWith('authState');
      expect(result.current.authState).toBeNull();
    });

    it('should handle bad data in the storage', async () => {
      mockedGetItem.mockResolvedValueOnce('not a JSON string');

      const { result } = renderHook(() => useAuthState());

      const consoleErrorMock = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await act(async () => {
        await result.current.getAuthState();
      });

      expect(mockedGetItem).toHaveBeenCalledWith('authState');
      expect(result.current.authState).toBeNull();
      expect(mockedSetItem).toHaveBeenCalledWith('authState', '');

      expect(consoleErrorMock).toHaveBeenCalledWith(
        'getAuthState',
        'SyntaxError: Unexpected token o in JSON at position 1',
      );
      consoleErrorMock.mockRestore();
    });
  });

  describe('removeAuthState', () => {
    it('should remove auth state from encrypted storage', async () => {
      const { result } = renderHook(() => useAuthState());

      await act(async () => {
        await result.current.removeAuthState();
      });
      expect(mockedUseEncryptedStorage.setItem).toHaveBeenCalledWith(
        'authState',
        '',
      );
      expect(result.current.authState).toBeNull();
    });
  });
});
