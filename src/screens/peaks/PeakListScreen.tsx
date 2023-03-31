import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native-ui-lib';

import { PeaksNavigationProps } from '@app/contexts';
import {
  GetPeaksQueryHookResult,
  useGetPeaksQuery,
} from '@app/graphql/generated';

import { Peak, peaksFromQuery } from './PeakListScreen.utils';

export const PeakListScreenWrapper = () => {
  const navigation =
    useNavigation<PeaksNavigationProps['PeakList']['navigation']>();

  const useGetPeaksQueryResult = useGetPeaksQuery();

  return (
    <PeakListScreen
      navigation={navigation}
      useGetPeaksQueryResult={useGetPeaksQueryResult}
    />
  );
};

const PeakButton = ({
  peak,
  navigation,
}: {
  peak: Peak;
  navigation: PeaksNavigationProps['PeakList']['navigation'];
}) => {
  return (
    <Button
      testID={`peak-list-peak-${peak.id}`}
      marginT-10
      label={peak.name}
      text70
      white
      background-orange30
      onPress={() => navigation.navigate('Peak', { peakSlug: peak.name })}
    />
  );
};

export const PeakListScreen = ({
  navigation,
  useGetPeaksQueryResult,
}: {
  navigation: PeaksNavigationProps['PeakList']['navigation'];
  useGetPeaksQueryResult: Pick<
    GetPeaksQueryHookResult,
    'data' | 'loading' | 'error'
  >;
}) => {
  const { data, loading, error } = useGetPeaksQueryResult;
  const peaks = peaksFromQuery(data);

  return (
    <View flex paddingH-25 paddingT-120>
      <Text blue50 text20>
        Peak List
      </Text>

      {loading && <Text testID="peak-list-loading">Loading...</Text>}

      {error && (
        <Text testID="peak-list-error">
          Error: {error.networkError?.message}
        </Text>
      )}

      {peaks.map(peak => (
        <PeakButton key={peak.id} peak={peak} navigation={navigation} />
      ))}
    </View>
  );
};
