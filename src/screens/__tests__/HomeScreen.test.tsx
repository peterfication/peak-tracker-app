import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import { HomeScreen } from '../HomeScreen';

jest.mock('../../hooks/useAuth');
const mockedUseAuth = jest.mocked(useAuth);

describe('HomeScreen', () => {
  const mockedLogout = jest.fn();

  beforeEach(() => {
    mockedUseAuth.mockReturnValue({
      login: jest.fn(),
      logout: mockedLogout,
      authLoading: false,
      isAuthenticated: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the HomeScreen component', () => {
    render(<HomeScreen />);
    const logoutButton = screen.getByTestId('logout-button');
    expect(logoutButton).toBeDefined();
    expect(logoutButton).not.toBeNull();
  });

  it('should call the logout function when the Login button is pressed', () => {
    render(
      <AuthContext.Provider
        value={{
          logout: mockedLogout,
          authLoading: false,
          isAuthenticated: true,
        }}>
        <HomeScreen />
      </AuthContext.Provider>,
    );
    const logoutButton = screen.getByTestId('logout-button');
    fireEvent.press(logoutButton);
    expect(mockedLogout).toHaveBeenCalledTimes(1);
  });
});
