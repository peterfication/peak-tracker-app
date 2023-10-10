import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PeakScreenWrapper, PeakListScreenWrapper } from '@app/screens';

// This can't be an interface because it's used as a generic.

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
