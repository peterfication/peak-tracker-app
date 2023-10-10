import React from 'react';
import { render } from '@testing-library/react-native';

import { App } from '../App';

jest.mock('react-native-dev-menu', () => ({
  addItem: jest.fn(() => Promise.resolve()),
}));

jest.mock('@app/hooks/useAuth', () => ({
  useAuth: () => ({
    login: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: false,
  }),
}));

describe('App', () => {
  // eslint-disable-next-line jest/expect-expect
  it('renders', () => {
    render(<App />);
  });
});
