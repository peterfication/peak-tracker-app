import React from 'react';
import { ApolloError } from '@apollo/client';
import { render, screen } from '@testing-library/react-native';

import { GetPeaksQueryHookResult } from '@app/graphql/queries';
import { PeaksNavigationProps } from '@app/providers';
import { PeakListScreen } from '@app/screens';

describe('PeakListScreen', () => {
  const mockedNavigation = {
    navigate: jest.fn(),
  } as unknown as PeaksNavigationProps['PeakList']['navigation'];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when the useGetPeaksQueryResult is loading', () => {
    const useGetPeaksQueryResult: Pick<
      GetPeaksQueryHookResult,
      'data' | 'loading' | 'error'
    > = {
      data: undefined,
      loading: true,
      error: new ApolloError({}),
    };

    it('should render the loading', () => {
      render(
        <PeakListScreen
          navigation={mockedNavigation}
          useGetPeaksQueryResult={useGetPeaksQueryResult}
        />,
      );

      const loading = screen.getByTestId('peak-list-loading');
      expect(loading).not.toBeNull();
    });
  });

  describe('when the useGetPeaksQueryResult returns an error', () => {
    const MOCK_ERROR = new ApolloError({
      networkError: new Error('Network error'),
    });

    const useGetPeaksQueryResult = {
      data: undefined,
      loading: false,
      error: MOCK_ERROR,
    };

    it('should render the error', () => {
      render(
        <PeakListScreen
          navigation={mockedNavigation}
          useGetPeaksQueryResult={useGetPeaksQueryResult}
        />,
      );

      const error = screen.getByTestId('peak-list-error');
      expect(error).not.toBeNull();
    });
  });

  describe('when the useGetPeaksQueryResult returns returns data', () => {
    const useGetPeaksQueryResult: Pick<
      GetPeaksQueryHookResult,
      'data' | 'loading' | 'error'
    > = {
      data: {
        peaks: {
          edges: [
            {
              node: {
                id: '1',
                name: 'Peak 1',
                slug: 'peak-1',
              },
            },
          ],
        },
      },
      loading: false,
      error: new ApolloError({}),
    };

    it('should list the peaks', () => {
      render(
        <PeakListScreen
          navigation={mockedNavigation}
          useGetPeaksQueryResult={useGetPeaksQueryResult}
        />,
      );
      const peak1 = screen.getByTestId('peak-list-peak-1');
      expect(peak1).not.toBeNull();
    });
  });
});
