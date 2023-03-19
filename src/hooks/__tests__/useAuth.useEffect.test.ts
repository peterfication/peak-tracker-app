import { shouldRefresh, updateRefreshToken } from '../useAuth.helpers';
import { effectUpdateRefreshToken } from '../useAuth.useEffect';
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when shouldRefresh returns false', () => {
    beforeEach(() => {
      mockedShouldRefresh.mockReturnValueOnce(false);
    });

    it('should not call updateRefreshToken', () => {
      const clear = effectUpdateRefreshToken(
        mockedAuthStateContent,
        undefined,
        mockedSetAuthLoading,
        mockedStoreAuthState,
        mockedRemoveAuthState,
      );
      clear();

      expect(mockedUpdateRefreshToken).not.toHaveBeenCalled();
    });
  });

  describe('when shouldRefresh returns true', () => {
    beforeEach(() => {
      mockedShouldRefresh.mockReturnValueOnce(true);
    });

    it('should call updateRefreshToken with the authState', () => {
      mockedUpdateRefreshToken.mockResolvedValueOnce();
      const clear = effectUpdateRefreshToken(
        mockedAuthStateContent,
        undefined,
        mockedSetAuthLoading,
        mockedStoreAuthState,
        mockedRemoveAuthState,
      );

      clear();

      expect(mockedUpdateRefreshToken).toHaveBeenCalledWith(
        mockedAuthStateContent,
        mockedSetAuthLoading,
        mockedStoreAuthState,
        mockedRemoveAuthState,
      );
    });

    describe('when updateRefreshToken fails', () => {
      it('should log the error', async () => {
        const error = new Error('mockError');
        mockedShouldRefresh.mockReturnValue(true);
        mockedUpdateRefreshToken.mockRejectedValue(error);

        const consoleErrorMock = jest
          .spyOn(console, 'error')
          .mockImplementation(() => {});

        const clear = effectUpdateRefreshToken(
          mockedAuthStateContent,
          undefined,
          mockedSetAuthLoading,
          mockedStoreAuthState,
          mockedRemoveAuthState,
        );

        await new Promise(process.nextTick);

        clear();

        expect(consoleErrorMock).toHaveBeenCalledWith(
          'updateRefreshTokenWrapper',
          'Error: mockError',
        );
        consoleErrorMock.mockRestore();
      });
    });

    it('should set an interval to call updateRefreshToken', () => {
      mockedUpdateRefreshToken.mockResolvedValueOnce();
      const setIntervalSpy = jest.spyOn(global, 'setInterval');

      const clear = effectUpdateRefreshToken(
        mockedAuthStateContent,
        undefined,
        mockedSetAuthLoading,
        mockedStoreAuthState,
        mockedRemoveAuthState,
      );

      expect(setIntervalSpy).toHaveBeenCalled();

      clear();
    });

    it('should return a function that clears the interval', () => {
      mockedUpdateRefreshToken.mockResolvedValueOnce();
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

    describe('when the interval is executed', () => {
      beforeEach(() => {
        mockedUpdateRefreshToken.mockResolvedValueOnce();
        jest.useFakeTimers();
      });

      describe('when shouldRefresh returns true', () => {
        beforeEach(() => {
          mockedShouldRefresh.mockReturnValueOnce(true);
        });

        it('should call updateRefreshToken', () => {
          mockedUpdateRefreshToken.mockResolvedValueOnce();
          const clear = effectUpdateRefreshToken(
            mockedAuthStateContent,
            undefined,
            mockedSetAuthLoading,
            mockedStoreAuthState,
            mockedRemoveAuthState,
          );

          jest.advanceTimersByTime(2000);

          clear();

          expect(mockedUpdateRefreshToken).toHaveBeenCalledTimes(2);
        });
      });

      describe('when shouldRefresh returns false', () => {
        beforeEach(() => {
          mockedShouldRefresh.mockReturnValueOnce(false);
        });

        it('should call updateRefreshToken', () => {
          const clear = effectUpdateRefreshToken(
            mockedAuthStateContent,
            undefined,
            mockedSetAuthLoading,
            mockedStoreAuthState,
            mockedRemoveAuthState,
          );

          jest.advanceTimersByTime(2000);

          clear();

          expect(mockedUpdateRefreshToken).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
