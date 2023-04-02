import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';

import { PeaksStackScreen } from '../PeaksStack';

jest.mock('@app/screens/peaks/PeakListScreen');

describe('PeaksStackScreen', () => {
  it('renders', () => {
    expect(() =>
      render(
        <NavigationContainer>
          <PeaksStackScreen />
        </NavigationContainer>,
      ),
    ).not.toThrow();
  });
});
