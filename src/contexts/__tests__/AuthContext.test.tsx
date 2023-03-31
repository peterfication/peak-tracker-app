import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { View } from 'react-native-ui-lib';

import { AuthProvider } from '@app/contexts/AuthContext';
import { AuthLoadingState, useAuth } from '@app/hooks/useAuth';
import { AuthStateMode } from '@app/hooks/useAuthState';

jest.mock('@app/hooks/useAuth');
const mockedUseAuth = jest.mocked(useAuth);

describe('AuthProvider', () => {
  const setIsAuthenticated = (
    isAuthenticated: boolean | AuthStateMode.Loading,
  ) =>
    mockedUseAuth.mockReturnValue({
      login: jest.fn(),
      logout: jest.fn(),
      authState: AuthStateMode.Loading,
      authLoading: AuthLoadingState.NotLoading,
      isAuthenticated,
    });

  describe('when isAuthenticated is AuthStateMode.Loading', () => {
    beforeEach(() => {
      setIsAuthenticated(AuthStateMode.Loading);
    });

    it('renders the LoginLoadingScreen if', () => {
      render(
        <AuthProvider>
          <View testID="child-component" />
        </AuthProvider>,
      );
      expect(screen.getByTestId('login-loading-screen')).not.toBeNull();
      expect(screen.queryByTestId('child-component')).toBeNull();
      expect(screen.queryByTestId('login-screen')).toBeNull();
    });
  });

  describe('when isAuthenticated is false', () => {
    beforeEach(() => {
      setIsAuthenticated(false);
    });

    it('renders the LoginScreen if isAuthenticated is false', () => {
      render(
        <AuthProvider>
          <View testID="child-component" />
        </AuthProvider>,
      );
      expect(screen.getByTestId('login-screen')).not.toBeNull();
      expect(screen.queryByTestId('child-component')).toBeNull();
      expect(screen.queryByTestId('login-loading-screen')).toBeNull();
    });
  });

  describe('when isAuthenticated is true', () => {
    beforeEach(() => {
      setIsAuthenticated(true);
    });

    it('renders the child components if isAuthenticated is true', () => {
      render(
        <AuthProvider>
          <View testID="child-component" />
        </AuthProvider>,
      );
      expect(screen.getByTestId('child-component')).not.toBeNull();
      expect(screen.queryByTestId('login-screen')).toBeNull();
      expect(screen.queryByTestId('login-loading-screen')).toBeNull();
    });
  });
});
