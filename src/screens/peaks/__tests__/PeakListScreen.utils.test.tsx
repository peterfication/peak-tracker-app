import { GetPeaksQueryHookResult } from '@app/graphql/generated';

import { peaksFromQuery } from '../PeakListScreen.utils';

describe('peaksFromQuery', () => {
  it('should return an empty array when data is undefined', () => {
    const data: GetPeaksQueryHookResult['data'] = undefined;
    const result = peaksFromQuery(data);
    expect(result).toEqual([]);
  });

  it('should return an empty array when peaks is undefined', () => {
    const data: GetPeaksQueryHookResult['data'] = { peaks: undefined };
    const result = peaksFromQuery(data);
    expect(result).toEqual([]);
  });

  it('should return an empty array when edges is undefined', () => {
    const data: GetPeaksQueryHookResult['data'] = {
      peaks: { edges: undefined },
    };
    const result = peaksFromQuery(data);
    expect(result).toEqual([]);
  });

  it('should return an empty array when all nodes are null or invalid', () => {
    const data: GetPeaksQueryHookResult['data'] = {
      peaks: {
        edges: [{ node: null }, { node: undefined }, null],
      },
    };
    const result = peaksFromQuery(data);
    expect(result).toEqual([]);
  });

  it('should return an array of valid peaks', () => {
    const data: GetPeaksQueryHookResult['data'] = {
      peaks: {
        edges: [
          { node: { id: '1', name: 'Peak 1' } },
          { node: { id: '2', name: 'Peak 2' } },
          { node: { id: '3', name: 'Peak 3' } },
        ],
      },
    };
    const result = peaksFromQuery(data);
    expect(result).toEqual([
      { id: '1', name: 'Peak 1' },
      { id: '2', name: 'Peak 2' },
      { id: '3', name: 'Peak 3' },
    ]);
  });
});
