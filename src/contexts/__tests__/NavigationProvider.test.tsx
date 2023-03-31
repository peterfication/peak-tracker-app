import React from 'react';
import { render } from '@testing-library/react-native';

import { NavigationProvider } from '@app/contexts';

jest.mock('@app/screens/home/HomeScreen');

describe('NavigationProvider', () => {
  it('renders', () => {
    expect(() => {
      // Disable linking to avoid "act ..." errors in tests
      render(<NavigationProvider disableLinking />);

      expect(true).toBe(true);
    }).not.toThrow();
  });
});
