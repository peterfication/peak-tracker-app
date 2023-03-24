import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreenWrapper } from '@app/screens/HomeScreen';
import { PeakScreenWrapper } from '@app/screens/PeakScreen';

// This can't be an interface because it's used as a generic.
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type StackParamList = {
  Home: undefined;
  Peak: { peakSlug?: string };
};

/**
 * We define the navigation props here globally, so that screens only need to
 * import this interface and not the types needed to construct it.
 */
export interface NavigationProps {
  Home: NativeStackScreenProps<StackParamList, 'Home'>;
  Peak: NativeStackScreenProps<StackParamList, 'Peak'>;
}

const Stack = createNativeStackNavigator<StackParamList>();

/**
 * The navigation provider defines all routes and their associated screens.
 */
export const NavigationProvider = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreenWrapper}
          options={{ title: 'Peak Tracker Dashboard' }}
        />
        <Stack.Screen name="Peak" component={PeakScreenWrapper} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
