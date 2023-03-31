import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { SettingsScreen } from '@app/screens';

jest.mock('@app/hooks/useAuth');

describe('SettingsScreen', () => {
  const mockedLogout = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the SettingsScreen component', () => {
    render(<SettingsScreen logout={mockedLogout} />);
    const logoutButton = screen.getByTestId('logout-button');
    expect(logoutButton).toBeDefined();
    expect(logoutButton).not.toBeNull();
  });

  it('should call the logout function when the logout button is pressed', () => {
    render(<SettingsScreen logout={mockedLogout} />);
    const logoutButton = screen.getByTestId('logout-button');
    fireEvent.press(logoutButton);
    expect(mockedLogout).toHaveBeenCalledTimes(1);
  });
});
