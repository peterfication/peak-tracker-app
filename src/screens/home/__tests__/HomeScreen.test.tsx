import React from 'react';
import { render } from '@testing-library/react-native';

import { HomeScreen } from '@app/screens';

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
