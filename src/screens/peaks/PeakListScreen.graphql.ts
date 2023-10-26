import { useQuery } from '@apollo/client';

import { getFragmentData } from '@app/graphql/generated';
import {
  PeakListPeakFragmentDoc,
  PeakListPeaksFragmentDoc,
  PeakListQuery,
  PeakListPeakFragment,
  PeakListDocument,
} from '@app/graphql/generated/graphql';
import { notEmpty } from '@app/utils';

export const useQueryResult = () => useQuery(PeakListDocument);

/**
 * Extract the nodes from the peak connection so we have a nice array
 * of PeakList_PeakFragment objects.
 *
 * TODO: Create a generic function for this.
 */
export const extractNodes = (
  queryResult: ReturnType<typeof useQueryResult>,
) => {
  const { data } = queryResult;

  return (getFragmentData(PeakListPeaksFragmentDoc, data)?.peaks?.edges || [])
    .map(edge => getFragmentData(PeakListPeakFragmentDoc, edge?.node))
    .filter(notEmpty);
};

export type { PeakListPeakFragment, PeakListQuery };
