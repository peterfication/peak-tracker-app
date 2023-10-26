import { getFragmentData } from '@app/graphql/generated';
import {
  PeakListPeakFragmentDoc,
  PeakListPeaksFragmentDoc,
  PeakListQuery,
  PeakListPeakFragment,
  PeakListDocument,
} from '@app/graphql/generated/graphql';
import { SimpleQueryResult } from '@app/graphql/utils';
import { notEmpty } from '@app/utils';

export type PeakListQueryResult = Pick<
  SimpleQueryResult<PeakListQuery>,
  'data' | 'loading' | 'error'
>;

/**
 * Extract the nodes from the peak connection so we have a nice array
 * of PeakList_PeakFragment objects.
 *
 * TODO: Create a generic function for this.
 */
export const extractNodes = (queryResult: PeakListQueryResult) => {
  const { data } = queryResult;

  return (getFragmentData(PeakListPeaksFragmentDoc, data)?.peaks?.edges || [])
    .map(edge => getFragmentData(PeakListPeakFragmentDoc, edge?.node))
    .filter(notEmpty);
};

export { PeakListDocument };
export type { PeakListPeakFragment, PeakListQuery };
