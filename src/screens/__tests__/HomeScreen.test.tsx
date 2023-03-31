import React from 'react';
import { render } from '@testing-library/react-native';

import { HomeScreen } from '@app/screens/HomeScreen';

jest.mock('../../hooks/useAuth');

describe('HomeScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the HomeScreen component', () => {
    expect(() => {
      render(<HomeScreen />);
    }).not.toThrow();
  });
});
