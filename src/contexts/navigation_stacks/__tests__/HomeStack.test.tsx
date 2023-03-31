import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';

import { HomeStackScreen } from '../HomeStack';

describe('HomeStackScreen', () => {
  it('renders', () => {
    expect(() =>
      render(
        <NavigationContainer>
          <HomeStackScreen />
        </NavigationContainer>,
      ),
    ).not.toThrow();
  });
});
