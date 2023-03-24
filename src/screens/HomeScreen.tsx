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
  const { logout } = useContext(AuthContext);
  const useGetPeaksQueryResult = useGetPeaksQuery();

  return (
    <HomeScreen
      logout={logout}
      useGetPeaksQueryResult={useGetPeaksQueryResult}
    />
  );
};

export const HomeScreen = ({
  logout,
  useGetPeaksQueryResult,
}: {
  logout: () => Promise<void>;
  useGetPeaksQueryResult: Pick<
    GetPeaksQueryHookResult,
    'data' | 'loading' | 'error'
  >;
}) => {
  const navigation = useNavigation<NavigationProps['Home']['navigation']>();
  const { data, loading, error } = useGetPeaksQueryResult;

  console.log({ data, loading, error });

  const tempPeakSlug = 'zugspitze'; // cspell:disable-line

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
