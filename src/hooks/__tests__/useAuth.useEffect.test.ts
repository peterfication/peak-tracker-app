import { renderHook } from '@testing-library/react-hooks';

import { effectUpdateRefreshToken, useAuth } from '../useAuth';
import { shouldRefresh, updateRefreshToken } from '../useAuth.helpers';
import { AuthState, useAuthState } from '../useAuthState';

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

const mockedAuthStateContent: AuthState = {
  accessToken: 'mockAccessToken',
  idToken: 'mockIdToken',
  refreshToken: 'mockRefreshToken',
  expiresAt: '2020-01-01T00:00:00.000Z',
};

jest.mock('../useAuth.helpers');

const mockedUpdateRefreshToken = jest.mocked(updateRefreshToken);
const mockedShouldRefresh = jest.mocked(shouldRefresh);

describe('effectUpdateRefreshToken', () => {
  const mockedSetAuthLoading = jest.fn();
  const mockedStoreAuthState = jest.fn();
  const mockedRemoveAuthState = jest.fn();

  describe('when shouldRefresh returns false', () => {
    beforeEach(() => {
      mockedShouldRefresh.mockReturnValueOnce(false);
    });

    it('should not call updateRefreshToken', () => {
      effectUpdateRefreshToken(
        mockedAuthStateContent,
        undefined,
        mockedSetAuthLoading,
        mockedStoreAuthState,
        mockedRemoveAuthState,
      );

      expect(mockedUpdateRefreshToken).not.toHaveBeenCalled();
    });
  });

  describe('when shouldRefresh returns true', () => {
    beforeEach(() => {
      mockedShouldRefresh.mockReturnValueOnce(true);
      mockedUpdateRefreshToken.mockResolvedValueOnce();
    });

    it('should call updateRefreshToken with the authState', () => {
      effectUpdateRefreshToken(
        mockedAuthStateContent,
        undefined,
        mockedSetAuthLoading,
        mockedStoreAuthState,
        mockedRemoveAuthState,
      );

      expect(mockedUpdateRefreshToken).toHaveBeenCalledWith(
        mockedAuthStateContent,
        mockedSetAuthLoading,
        mockedStoreAuthState,
        mockedRemoveAuthState,
      );
    });

    it('should set an interval to call updateRefreshToken', () => {
      const setIntervalSpy = jest.spyOn(global, 'setInterval');

      effectUpdateRefreshToken(
        mockedAuthStateContent,
        undefined,
        mockedSetAuthLoading,
        mockedStoreAuthState,
        mockedRemoveAuthState,
      );

      expect(setIntervalSpy).toHaveBeenCalled();
    });

    it('should return a function that clears the interval', () => {
      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

      const clear = effectUpdateRefreshToken(
        mockedAuthStateContent,
        undefined,
        mockedSetAuthLoading,
        mockedStoreAuthState,
        mockedRemoveAuthState,
      );

      clear();

      expect(clearIntervalSpy).toHaveBeenCalled();
    });
  });
});

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wait = async (time: number) =>
    new Promise(resolve => {
      setTimeout(resolve, time);
    });

  describe('useEffect setInitialAuthState', () => {
    describe('when the call to getAuthState fails', () => {
      it('should catch the error', async () => {
        const error = new Error('mockError');

        // @ts-expect-error I don't know how to mock this in a type safe way yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        mockedAuthState.getAuthState.mockRejectedValueOnce(error);

        const consoleErrorMock = jest
          .spyOn(console, 'error')
          .mockImplementation(() => {});

        renderHook(() => useAuth());

        // Wait for a millisecond for the useEffect to run
        await wait(1);

        expect(consoleErrorMock).toHaveBeenCalledWith(
          'setInitialAuthState',
          'Error: mockError',
        );
        consoleErrorMock.mockRestore();
      });
    });
  });

  // describe('useEffect updateRefreshToken', () => {
  //   it('calls effectUpdateRefreshToken', () => {

  //   });
  // });
});
