import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native-ui-lib';

import { NavigationProps } from '@app/contexts/NavigationProvider';
import {
  GetPeaksQueryHookResult,
  useGetPeaksQuery,
} from '@app/graphql/generated';

export const PeakListScreenWrapper = () => {
  const navigation = useNavigation<NavigationProps['PeakList']['navigation']>();

  const useGetPeaksQueryResult = useGetPeaksQuery();

  return (
    <PeakListScreen
      navigation={navigation}
      useGetPeaksQueryResult={useGetPeaksQueryResult}
    />
  );
};

/**
 * Extracted Peak type from the GraphQL query.
 */
type Peak = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<Pick<GetPeaksQueryHookResult, 'data'>['data']>['peaks']
      >['edges']
    >[number]
  >['node']
>;

/**
 * Check whether a peak from the query data is a peak.
 */
const isPeakListPeak = (peak: unknown): peak is Peak =>
  peak !== null && typeof peak === 'object' && 'name' in peak;

/**
 * Extract the peaks from the query data and properly type them.
 */
const peaksFromQuery = (data: GetPeaksQueryHookResult['data']): Peak[] =>
  (data?.peaks?.edges?.map(edge => edge?.node) ?? []).filter(isPeakListPeak);

const PeakButton = ({
  peak,
  navigation,
}: {
  peak: Peak;
  navigation: NavigationProps['PeakList']['navigation'];
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
  navigation: NavigationProps['PeakList']['navigation'];
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
