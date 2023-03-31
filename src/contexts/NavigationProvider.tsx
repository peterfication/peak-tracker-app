import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreenWrapper } from '@app/screens/HomeScreen';
import { PeakListScreenWrapper } from '@app/screens/PeakListScreen';
import { PeakScreenWrapper } from '@app/screens/PeakScreen';
import { SettingsScreenWrapper } from '@app/screens/SettingsScreen';

// This can't be an interface because it's used as a generic.
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type StackParamList = {
  Home: undefined;

  Peak: { peakSlug?: string };
  PeakList: undefined;

  Settings: undefined;
};

/**
 * We define the navigation props here globally, so that screens only need to
 * import this interface and not the types needed to construct it.
 */
export interface NavigationProps {
  Home: NativeStackScreenProps<StackParamList, 'Home'>;
  Peak: NativeStackScreenProps<StackParamList, 'Peak'>;
  Settings: NativeStackScreenProps<StackParamList, 'Settings'>;
  PeakList: NativeStackScreenProps<StackParamList, 'PeakList'>;
}

const HomeStack = createNativeStackNavigator<StackParamList>();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={HomeScreenWrapper}
      options={{ title: 'Peak Tracker' }}
    />
  </HomeStack.Navigator>
);

const PeaksStack = createNativeStackNavigator<StackParamList>();

const PeaksStackScreen = () => (
  <PeaksStack.Navigator>
    <PeaksStack.Screen name="PeakList" component={PeakListScreenWrapper} />
    <PeaksStack.Screen name="Peak" component={PeakScreenWrapper} />
  </PeaksStack.Navigator>
);

const SettingsStack = createNativeStackNavigator<StackParamList>();

const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      name="Settings"
      component={SettingsScreenWrapper}
      options={{ title: 'Peak Tracker' }}
    />
  </SettingsStack.Navigator>
);

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
      Peak: 'peaks/:peakSlug',
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
