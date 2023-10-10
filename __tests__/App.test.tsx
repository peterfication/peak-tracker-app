import React from 'react';
import { render } from '@testing-library/react-native';

import { App } from '../App';

jest.mock('react-native/Libraries/Utilities/DevSettings', () => ({
  addMenuItem: jest.fn(),
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
