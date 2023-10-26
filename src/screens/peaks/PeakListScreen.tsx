import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native-ui-lib';

import type { PeaksNavigationProps } from '@app/providers';

import {
  useQueryResult,
  extractNodes,
  PeakListPeakFragment,
} from './PeakListScreen.graphql';

export const PeakListScreenWrapper = () => {
  const navigation =
    useNavigation<PeaksNavigationProps['PeakList']['navigation']>();

  const queryResult = useQueryResult();

  return <PeakListScreen navigation={navigation} queryResult={queryResult} />;
};

const PeakButton = ({
  peak,
  navigation,
}: {
  peak: PeakListPeakFragment;
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
      onPress={() => navigation.navigate('Peak', { peakSlug: peak.slug })}
    />
  );
};

export const PeakListScreen = ({
  navigation,
  queryResult,
}: {
  navigation: PeaksNavigationProps['PeakList']['navigation'];
  queryResult: ReturnType<typeof useQueryResult>;
}) => {
  const { loading, error } = queryResult;
  const nodes = extractNodes(queryResult);

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

      {nodes.map(peak => (
        <PeakButton key={peak.id} peak={peak} navigation={navigation} />
      ))}
    </View>
  );
};
