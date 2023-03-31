import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import {
  HomeStackScreen,
  PeaksStackScreen,
  SettingsStackScreen,
  HomeNavigationProps,
  PeaksNavigationProps,
  SettingsNavigationProps,
  homeLinking,
} from './navigation_stacks';

export type {
  HomeNavigationProps,
  PeaksNavigationProps,
  SettingsNavigationProps,
};

const Tab = createBottomTabNavigator();

/**
 * Configuration for deep links.
 *
 * Open a deep link in the iOS simulator from the terminal with:
 * xcrun simctl openurl booted com.peak-tracker://peaks/zugspitze
 */
const linking = {
  prefixes: ['com.peak-tracker://'],
  config: {
    screens: {
      ...homeLinking,
    },
  },
};

/**
 * The navigation provider defines all routes and their associated screens.
 */
export const NavigationProvider = ({
  disableLinking = false,
}: {
  /**
   * This is just for testing purposes so that we don't have to use act in tests.
   */
  disableLinking?: boolean;
}) => {
  const linkingConfig = disableLinking ? undefined : linking;
  return (
    <NavigationContainer linking={linkingConfig}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="TabHome"
          component={HomeStackScreen}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="TabPeaks"
          component={PeaksStackScreen}
          options={{ title: 'Peaks' }}
        />
        <Tab.Screen
          name="TabSettings"
          component={SettingsStackScreen}
          options={{ title: 'Settings' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
