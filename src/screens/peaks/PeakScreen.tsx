import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native-ui-lib';

import type { PeaksNavigationProps } from '@app/providers';

export const PeakScreenWrapper = () => {
  const route = useRoute<PeaksNavigationProps['Peak']['route']>();

  return <PeakScreen route={route} />;
};

export const PeakScreen = ({
  route,
}: {
  route: PeaksNavigationProps['Peak']['route'];
}) => {
  return (
    <View flex paddingH-25 paddingT-120>
      <Text blue50 text20>
        Peak: {route.params.peakSlug}
      </Text>
    </View>
  );
};
