import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreenWrapper } from '@app/screens';

// This can't be an interface because it's used as a generic.
type HomeStackParamList = {
  Home: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={HomeScreenWrapper}
      options={{ title: 'Peak Tracker' }}
    />
  </HomeStack.Navigator>
);

export interface HomeNavigationProps {
  Home: NativeStackScreenProps<HomeStackParamList, 'Home'>;
}
