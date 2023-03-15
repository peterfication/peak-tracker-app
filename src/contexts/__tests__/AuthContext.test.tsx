import React from 'react';
import { View } from 'react-native-ui-lib';
import { render, screen } from '@testing-library/react-native';

import { AuthProvider } from '../AuthContext';
import { useAuth } from '../../hooks/useAuth';

const mockedUseAuth = jest.mocked(useAuth);

const setIsAuthenticated = (isAuthenticated: boolean | null) =>
  mockedUseAuth.mockReturnValue({
    login: jest.fn(),
    logout: jest.fn(),
    isAuthenticated,
  });

jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('AuthProvider', () => {
  describe('when isAuthenticated is null', () => {
    beforeEach(() => {
      setIsAuthenticated(null);
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
