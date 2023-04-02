import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SettingsScreenWrapper } from '@app/screens';

// This can't be an interface because it's used as a generic.
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SettingsStackParamList = {
  Settings: undefined;
};

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      name="Settings"
      component={SettingsScreenWrapper}
      options={{ title: 'Peak Tracker' }}
    />
  </SettingsStack.Navigator>
);

export interface SettingsNavigationProps {
  Settings: NativeStackScreenProps<SettingsStackParamList, 'Settings'>;
}
