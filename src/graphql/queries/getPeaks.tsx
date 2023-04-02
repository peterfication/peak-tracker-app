import {
  useGetPeaksQuery,
  GetPeaksQueryHookResult,
  GetPeaksPeakFragment,
} from '@app/graphql/generated';

export { useGetPeaksQuery };
export type { GetPeaksQueryHookResult, GetPeaksPeakFragment };

/**
 * Extract the peaks from the query data and properly type them.
 */
export const getPeaksExtractPeaksFromData = (
  data: GetPeaksQueryHookResult['data'],
): GetPeaksPeakFragment[] =>
  (data?.peaks?.edges?.map(edge => edge?.node) ?? []).filter(
    (peak: unknown): peak is GetPeaksPeakFragment =>
      peak !== null &&
      typeof peak === 'object' &&
      'id' in peak &&
      'name' in peak &&
      'slug' in peak,
  );
