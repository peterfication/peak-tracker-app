import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { HomeScreen } from '@app/screens/HomeScreen';

jest.mock('../../hooks/useAuth');

describe('HomeScreen', () => {
  const mockedLogout = jest.fn();

  const useGetPeaksQueryResult = {
    data: undefined,
    loading: false,
    error: undefined,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the HomeScreen component', () => {
    render(
      <HomeScreen
        logout={jest.fn()}
        useGetPeaksQueryResult={useGetPeaksQueryResult}
      />,
    );
    const logoutButton = screen.getByTestId('logout-button');
    expect(logoutButton).toBeDefined();
    expect(logoutButton).not.toBeNull();
  });

  it('should call the logout function when the Login button is pressed', () => {
    render(
      <HomeScreen
        logout={mockedLogout}
        useGetPeaksQueryResult={useGetPeaksQueryResult}
      />,
    );
    const logoutButton = screen.getByTestId('logout-button');
    fireEvent.press(logoutButton);
    expect(mockedLogout).toHaveBeenCalledTimes(1);
  });
});
