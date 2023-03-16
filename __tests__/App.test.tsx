import { render } from '@testing-library/react-native';
import React from 'react';

import { App } from '../App';

jest.mock('../src/hooks/useAuth', () => ({
  useAuth: () => ({
    login: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: true,
  }),
}));

describe('App', () => {
  // eslint-disable-next-line jest/expect-expect
  it('renders', () => {
    render(<App />);
  });
});
