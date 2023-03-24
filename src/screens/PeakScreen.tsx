import React from 'react';
import { Button, Text, View } from 'react-native-ui-lib';
import { useNavigation, useRoute } from '@react-navigation/native';

import { NavigationProps } from '@app/contexts/NavigationProvider';

export const PeakScreenWrapper = () => {
  return <PeakScreen />;
};

export const PeakScreen = () => {
  const navigation = useNavigation<NavigationProps['Peak']['navigation']>();
  const route = useRoute<NavigationProps['Peak']['route']>();

  return (
    <View flex paddingH-25 paddingT-120>
      <Text blue50 text20>
        Peak: {route.params.peakSlug}
      </Text>
      <View marginT-100 center>
        <Button
          label="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
};
