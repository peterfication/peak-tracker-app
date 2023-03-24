import React from 'react';
import { STORYBOOK_ENABLED } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ApolloProvider } from '@app/contexts/ApolloProvider';
import { AuthProvider } from '@app/contexts/AuthContext';
import { HomeScreenWrapper } from '@app/screens/HomeScreen';
import { PeakScreenWrapper } from '@app/screens/PeakScreen';

import Storybook from './.storybook/Storybook';

// This can't be an interface because it's used as a generic.
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type StackParamList = {
  Home: undefined;
  Peak: { peakSlug?: string };
};

export interface NavigationProps {
  Home: NativeStackScreenProps<StackParamList, 'Home'>;
  Peak: NativeStackScreenProps<StackParamList, 'Peak'>;
}

const Stack = createNativeStackNavigator<StackParamList>();

export const App = () => {
  return (
    <AuthProvider>
      <ApolloProvider>
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
      </ApolloProvider>
    </AuthProvider>
  );
};

const defaultExport = STORYBOOK_ENABLED === 'true' ? Storybook : App;

if (STORYBOOK_ENABLED === 'true') {
  console.log('Running Storybook ...');
}

export default defaultExport;
