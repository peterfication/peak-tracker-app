import { renderHook } from '@testing-library/react-hooks';

import { useAuth } from '../useAuth';
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

  describe('useEffect updateRefreshToken', () => {
    describe('when shouldRefresh returns false', () => {
      beforeEach(() => {
        mockedShouldRefresh.mockReturnValueOnce(false);
      });

      it('should not call updateRefreshToken', async () => {
        renderHook(() => useAuth());

        // Wait for a millisecond for the useEffect to run
        await wait(1);

        expect(mockedUpdateRefreshToken).not.toHaveBeenCalled();
      });
    });

    describe('when shouldRefresh returns true', () => {
      beforeEach(() => {
        mockedShouldRefresh.mockReturnValueOnce(true);
      });

      it('should call updateRefreshToken with the authState', async () => {
        mockedAuthState.authState = mockedAuthStateContent;

        renderHook(() => useAuth());

        // Wait for a millisecond for the useEffect to run
        await wait(1);

        expect(mockedUpdateRefreshToken).toHaveBeenCalledWith(
          mockedAuthStateContent,
          expect.anything(),
          expect.anything(),
          expect.anything(),
        );
      });

      describe('when the call to updateRefreshToken fails', () => {
        const error = new Error('mockError');
        beforeEach(() => {
          mockedUpdateRefreshToken.mockRejectedValueOnce(error);
        });

        it('catches the error', async () => {
          const consoleErrorMock = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

          renderHook(() => useAuth());

          // Wait for a millisecond for the useEffect to run
          await wait(1);

          expect(consoleErrorMock).toHaveBeenCalledWith(
            'updateRefreshTokenWrapper',
            'Error: mockError',
          );
          consoleErrorMock.mockRestore();
        });
      });
    });
  });
});
