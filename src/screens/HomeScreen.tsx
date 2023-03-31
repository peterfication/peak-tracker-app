import React from 'react';
import { Text, View } from 'react-native-ui-lib';

export const HomeScreenWrapper = () => <HomeScreen />;

export const HomeScreen = () => {
  return (
    <View flex paddingH-25 paddingT-120>
      <Text blue50 text20>
        Welcome
      </Text>
    </View>
  );
};
