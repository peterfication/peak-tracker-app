import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { HomeScreen } from '../HomeScreen';

jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    login: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: true,
  }),
}));

describe('HomeScreen', () => {
  const logout = jest.fn();

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
      <AuthContext.Provider value={{ logout, isAuthenticated: true }}>
        <HomeScreen />
      </AuthContext.Provider>,
    );
    const logoutButton = screen.getByTestId('logout-button');
    fireEvent.press(logoutButton);
    expect(logout).toHaveBeenCalledTimes(1);
  });
});
