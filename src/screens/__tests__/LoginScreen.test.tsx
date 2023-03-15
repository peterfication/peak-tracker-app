import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { LoginScreen, LoginLoadingScreen } from '../LoginScreen';

describe('LoginScreen', () => {
  const login = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the LoginScreen component', () => {
    const { getByTestId } = render(<LoginScreen login={login} />);
    const loginButton = getByTestId('login-button');
    expect(loginButton).toBeDefined();
    expect(loginButton).not.toBeNull();
  });

  it('should call the login function when the Login button is pressed', () => {
    const { getByTestId } = render(<LoginScreen login={login} />);
    const loginButton = getByTestId('login-button');
    fireEvent.press(loginButton);
    expect(login).toHaveBeenCalledTimes(1);
  });
});

describe('LoginLoadingScreen', () => {
  it('should render a "Loading" message', () => {
    const { getByText } = render(<LoginLoadingScreen />);
    const loadingText = getByText('Loading');
    expect(loadingText).toBeTruthy();
  });
});
