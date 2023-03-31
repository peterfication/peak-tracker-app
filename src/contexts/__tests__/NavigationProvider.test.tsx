import React from 'react';
import { render } from '@testing-library/react-native';

import { NavigationProvider } from '@app/contexts';

describe('NavigationProvider', () => {
  it('renders', () => {
    expect(() => {
      // Disable linking to avoid "act ..." errors in tests
      render(<NavigationProvider disableLinking />);
    }).not.toThrow();
  });
});
