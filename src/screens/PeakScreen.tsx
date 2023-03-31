import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text, View } from 'react-native-ui-lib';

import { NavigationProps } from '@app/contexts/NavigationProvider';

export const PeakScreenWrapper = () => {
  const navigation = useNavigation<NavigationProps['Peak']['navigation']>();
  const route = useRoute<NavigationProps['Peak']['route']>();

  return <PeakScreen navigation={navigation} route={route} />;
};

export const PeakScreen = ({
  navigation,
  route,
}: {
  navigation: NavigationProps['Peak']['navigation'];
  route: NavigationProps['Peak']['route'];
}) => {
  return (
    <View flex paddingH-25 paddingT-120>
      <Text blue50 text20>
        Peak: {route.params.peakSlug}
      </Text>
      <View marginT-100 center>
        <Button
          testID="go-to-home-button"
          label="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
};
