import React from 'react';
import { render } from '@testing-library/react-native';

import { NavigationProvider } from '@app/contexts/NavigationProvider';

jest.mock('../../screens/HomeScreen');

describe('NavigationProvider', () => {
  it('renders', () => {
    expect(() => {
      // Disable linking to avoid "act ..." errors in tests
      render(<NavigationProvider disableLinking />);

      expect(true).toBe(true);
    }).not.toThrow();
  });
});
