import {
  GetPeaksQueryHookResult,
  PeakListPeakFragment,
} from '@app/graphql/generated';

export type Peak = PeakListPeakFragment;

/**
 * Extract the peaks from the query data and properly type them.
 */
export const peaksFromQuery = (data: GetPeaksQueryHookResult['data']): Peak[] =>
  (data?.peaks?.edges?.map(edge => edge?.node) ?? []).filter(
    (peak: unknown): peak is Peak =>
      peak !== null && typeof peak === 'object' && 'name' in peak,
  );
