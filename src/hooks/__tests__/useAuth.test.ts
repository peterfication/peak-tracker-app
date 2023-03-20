import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { useAuth } from '../useAuth';
import {
  getIsAuthenticated,
  performLogin,
  performLogout,
} from '../useAuth.helpers';
import { effectUpdateRefreshToken } from '../useAuth.useEffect';
import { AuthState, useAuthState } from '../useAuthState';

jest.mock('../useAuthState');
const mockedUseAuthState = jest.mocked(useAuthState);

jest.mock('../useAuth.helpers');
const mockedPerformLogin = jest.mocked(performLogin);
const mockedPerformLogout = jest.mocked(performLogout);
const mockedGetIsAuthenticated = jest.mocked(getIsAuthenticated);

jest.mock('../useAuth.useEffect');
const mockedEffectUpdateRefreshToken = jest.mocked(effectUpdateRefreshToken);

describe('useAuth', () => {
  const mockedAuthLoading = undefined;
  const mockedSetAuthLoading = jest.fn();
  const mockedAuthState: AuthState = {
    accessToken: 'accessToken',
    idToken: 'idToken',
    refreshToken: 'refreshToken',
    expiresAt: 'expiresAt',
  };
  const mockedGetAuthState = jest.fn();
  const mockedStoreAuthState = jest.fn();
  const mockedRemoveAuthState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [mockedAuthLoading, mockedSetAuthLoading]);

    mockedUseAuthState.mockReturnValueOnce({
      authState: mockedAuthState,
      getAuthState: mockedGetAuthState,
      storeAuthState: mockedStoreAuthState,
      removeAuthState: mockedRemoveAuthState,
    });
  });

  describe('useEffect setInitialAuthState', () => {
    describe('when the call to getAuthState fails', () => {
      const error = new Error('mockError');
      beforeEach(() => {
        mockedGetAuthState.mockRejectedValueOnce(error);
      });

      it('should catch the error', async () => {
        const consoleErrorMock = jest
          .spyOn(console, 'error')
          .mockImplementation(() => {});

        renderHook(() => useAuth());

        await new Promise(process.nextTick);

        expect(consoleErrorMock).toHaveBeenCalledWith(
          'setInitialAuthState',
          'Error: mockError',
        );
        consoleErrorMock.mockRestore();
      });
    });
  });

  describe('useEffect updateRefreshToken', () => {
    it('calls effectUpdateRefreshToken', async () => {
      renderHook(() => useAuth());

      await new Promise(process.nextTick);

      expect(mockedEffectUpdateRefreshToken).toHaveBeenCalledWith(
        mockedAuthState,
        mockedAuthLoading,
        mockedSetAuthLoading,
        mockedStoreAuthState,
        mockedRemoveAuthState,
      );
    });
  });

  describe('isAuthenticated', () => {
    describe('when getIsAuthenticated returns true', () => {
      beforeEach(() => {
        mockedGetIsAuthenticated.mockReturnValueOnce(true);
      });

      it('should be true', () => {
        const { result } = renderHook(() => useAuth());
        expect(result.current.isAuthenticated).toBe(true);
      });
    });

    describe('when getIsAuthenticated returns false', () => {
      beforeEach(() => {
        mockedGetIsAuthenticated.mockReturnValueOnce(false);
      });

      it('should be false', () => {
        const { result } = renderHook(() => useAuth());
        expect(result.current.isAuthenticated).toBe(false);
      });
    });
  });

  describe('login', () => {
    it('calls performLogin', async () => {
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.login();
      });

      expect(mockedPerformLogin).toHaveBeenCalledWith(
        mockedSetAuthLoading,
        mockedStoreAuthState,
      );
    });
  });

  describe('logout', () => {
    it('calls performLogout', async () => {
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.logout();
      });

      expect(mockedPerformLogout).toHaveBeenCalledWith(
        mockedAuthState,
        mockedRemoveAuthState,
      );
    });
  });
});
