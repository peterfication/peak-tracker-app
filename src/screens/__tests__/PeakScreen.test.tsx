import React from 'react';
import { render } from '@testing-library/react-native';

import { NavigationProps } from '@app/contexts/NavigationProvider';
import { PeakScreen } from '@app/screens/PeakScreen';

describe('PeakScreen', () => {
  const mockedRoute = {
    params: {
      peakSlug: 'test-peak',
    },
  } as unknown as NavigationProps['Peak']['route'];

  it('should render the PeakScreen component', () => {
    expect(() => {
      render(<PeakScreen route={mockedRoute} />);
    }).not.toThrow();
  });
});
