import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native-ui-lib';

import { AuthContext } from '@app/contexts/AuthContext';
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
  const { data, loading, error } = useGetPeaksQueryResult;

  console.log({ data, loading, error });

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
      </View>
    </View>
  );
};
