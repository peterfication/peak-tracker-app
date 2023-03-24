import React from 'react';
import { render } from '@testing-library/react-native';

import { NavigationProvider } from '@app/contexts/NavigationProvider';

jest.mock('../../screens/HomeScreen');

describe('NavigationProvider', () => {
  it('renders', () => {
    expect(() => {
      render(<NavigationProvider />);
    }).not.toThrow();
  });
});
