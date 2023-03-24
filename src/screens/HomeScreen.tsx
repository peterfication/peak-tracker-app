import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '@app/contexts/AuthContext';
import { NavigationProps } from '@app/contexts/NavigationProvider';
import {
  GetPeaksQueryHookResult,
  useGetPeaksQuery,
} from '@app/graphql/generated';

export const HomeScreenWrapper = () => {
  const navigation = useNavigation<NavigationProps['Home']['navigation']>();
  const { logout } = useContext(AuthContext);
  const useGetPeaksQueryResult = useGetPeaksQuery();

  return (
    <HomeScreen
      logout={logout}
      navigation={navigation}
      useGetPeaksQueryResult={useGetPeaksQueryResult}
    />
  );
};

export const HomeScreen = ({
  logout,
  navigation,
  useGetPeaksQueryResult,
}: {
  logout: () => Promise<void>;
  navigation: NavigationProps['Home']['navigation'];
  useGetPeaksQueryResult: Pick<
    GetPeaksQueryHookResult,
    'data' | 'loading' | 'error'
  >;
}) => {
  const { data, loading, error } = useGetPeaksQueryResult;

  console.log({ data, loading, error });

  const tempPeakSlug = 'zugspitze';

  return (
    <View flex paddingH-25 paddingT-120>
      <Text blue50 text20>
        Welcome
      </Text>
      <View marginT-100 center>
        <Button
          testID="logout-button"
          text70
          white
          background-orange30
          label="Logout"
          onPress={logout}
        />

        <Button
          marginT-10
          label="Go to Peak"
          text70
          white
          background-orange30
          onPress={() =>
            navigation.navigate('Peak', { peakSlug: tempPeakSlug })
          }
        />
      </View>
    </View>
  );
};
