import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native-ui-lib';

import { useAuth } from '../../hooks/useAuth';
import { AuthProvider } from '../AuthContext';

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

    it('renders the LoginLoadingScreen if ', () => {
      const { queryByTestId } = render(
        <AuthProvider>
          <View testID="child-component" />
        </AuthProvider>,
      );
      expect(queryByTestId('login-loading-screen')).not.toBeNull();
      expect(queryByTestId('child-component')).toBeNull();
      expect(queryByTestId('login-screen')).toBeNull();
    });
  });

  describe('when isAuthenticated is false', () => {
    beforeEach(() => {
      setIsAuthenticated(false);
    });

    it('renders the LoginScreen if isAuthenticated is false', () => {
      const { queryByTestId } = render(
        <AuthProvider>
          <View testID="child-component" />
        </AuthProvider>,
      );
      expect(queryByTestId('login-screen')).not.toBeNull();
      expect(queryByTestId('child-component')).toBeNull();
      expect(queryByTestId('login-loading-screen')).toBeNull();
    });
  });

  describe('when isAuthenticated is true', () => {
    beforeEach(() => {
      setIsAuthenticated(true);
    });

    it('renders the child components if isAuthenticated is true', () => {
      const { queryByTestId } = render(
        <AuthProvider>
          <View testID="child-component" />
        </AuthProvider>,
      );
      expect(queryByTestId('child-component')).not.toBeNull();
      expect(queryByTestId('login-screen')).toBeNull();
      expect(queryByTestId('login-loading-screen')).toBeNull();
    });
  });
});
