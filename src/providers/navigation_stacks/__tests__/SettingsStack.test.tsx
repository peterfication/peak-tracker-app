import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';

import { SettingsStackScreen } from '../SettingsStack';

describe('SettingsStackScreen', () => {
  it('renders', () => {
    expect(() =>
      render(
        <NavigationContainer>
          <SettingsStackScreen />
        </NavigationContainer>,
      ),
    ).not.toThrow();
  });
});
