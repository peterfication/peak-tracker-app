import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { AuthContext } from '../../contexts/AuthContext';
import { HomeScreen } from '../HomeScreen';

describe('HomeScreen', () => {
  const logout = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the HomeScreen component', () => {
    const { getByTestId } = render(<HomeScreen />);
    const logoutButton = getByTestId('logout-button');
    expect(logoutButton).toBeDefined();
    expect(logoutButton).not.toBeNull();
  });

  it('should call the logout function when the Login button is pressed', () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={{ logout, isAuthenticated: true }}>
        <HomeScreen />
      </AuthContext.Provider>,
    );
    const logoutButton = getByTestId('logout-button');
    fireEvent.press(logoutButton);
    expect(logout).toHaveBeenCalledTimes(1);
  });
});
