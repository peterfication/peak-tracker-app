import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PeakListScreenWrapper } from '@app/screens/PeakListScreen';
import { PeakScreenWrapper } from '@app/screens/PeakScreen';

// This can't be an interface because it's used as a generic.
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type PeaksStackParamList = {
  PeakList: undefined;
  Peak: { peakSlug?: string };
};

const PeaksStack = createNativeStackNavigator<PeaksStackParamList>();

export const PeaksStackScreen = () => (
  <PeaksStack.Navigator>
    <PeaksStack.Screen name="PeakList" component={PeakListScreenWrapper} />
    <PeaksStack.Screen name="Peak" component={PeakScreenWrapper} />
  </PeaksStack.Navigator>
);

export interface PeaksNavigationProps {
  Peak: NativeStackScreenProps<PeaksStackParamList, 'Peak'>;
  PeakList: NativeStackScreenProps<PeaksStackParamList, 'PeakList'>;
}

export const homeLinking = {
  Peak: 'peaks/:peakSlug',
};
