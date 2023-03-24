import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { NavigationProps } from '@app/contexts/NavigationProvider';
import { PeakScreen } from '@app/screens/PeakScreen';

describe('PeakScreen', () => {
  const mockedNavigation = {
    navigate: jest.fn(),
  } as unknown as NavigationProps['Peak']['navigation'];
  const mockedRoute = {
    params: {
      peakSlug: 'test-peak',
    },
  } as unknown as NavigationProps['Peak']['route'];

  it('should render the PeakScreen component', () => {
    render(<PeakScreen navigation={mockedNavigation} route={mockedRoute} />);
    const navigateButton = screen.getByTestId('go-to-home-button');
    expect(navigateButton).toBeDefined();
    expect(navigateButton).not.toBeNull();
  });

  it('should call the navigate function when the Home button is pressed', () => {
    render(<PeakScreen navigation={mockedNavigation} route={mockedRoute} />);
    const navigateButton = screen.getByTestId('go-to-home-button');
    fireEvent.press(navigateButton);
    expect(mockedNavigation.navigate).toHaveBeenCalledTimes(1);
  });
});
