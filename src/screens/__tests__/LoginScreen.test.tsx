import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { LoginLoadingScreen, LoginScreen } from '../LoginScreen';

describe('LoginScreen', () => {
  const login = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the LoginScreen component', () => {
    render(<LoginScreen login={login} />);
    const loginButton = screen.getByTestId('login-button');
    expect(loginButton).toBeDefined();
    expect(loginButton).not.toBeNull();
  });

  it('should call the login function when the Login button is pressed', () => {
    render(<LoginScreen login={login} />);
    const loginButton = screen.getByTestId('login-button');
    fireEvent.press(loginButton);
    expect(login).toHaveBeenCalledTimes(1);
  });
});

describe('LoginLoadingScreen', () => {
  it('should render a "Loading" message', () => {
    render(<LoginLoadingScreen />);
    const loadingScreen = screen.getByTestId('login-loading-screen');
    expect(loadingScreen).toBeTruthy();
  });
});
