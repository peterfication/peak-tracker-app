import React from 'react';
import { ApolloError } from '@apollo/client';
import { render, screen } from '@testing-library/react-native';

import { PeaksNavigationProps } from '@app/providers';
import { PeakListScreen } from '@app/screens';

import { PeakListQueryResult } from '../PeakListScreen.graphql';

describe('PeakListScreen', () => {
  const mockedNavigation = {
    navigate: jest.fn(),
  } as unknown as PeaksNavigationProps['PeakList']['navigation'];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when the queryResult is loading', () => {
    const queryResult: PeakListQueryResult = {
      data: undefined,
      loading: true,
      error: new ApolloError({}),
    };

    it('should render the loading', () => {
      render(
        <PeakListScreen
          navigation={mockedNavigation}
          queryResult={queryResult}
        />,
      );

      const loading = screen.getByTestId('peak-list-loading');
      expect(loading).not.toBeNull();
    });
  });

  describe('when the queryResult returns an error', () => {
    const MOCK_ERROR = new ApolloError({
      networkError: new Error('Network error'),
    });

    const queryResult: PeakListQueryResult = {
      data: undefined,
      loading: false,
      error: MOCK_ERROR,
    };

    it('should render the error', () => {
      render(
        <PeakListScreen
          navigation={mockedNavigation}
          queryResult={queryResult}
        />,
      );

      const error = screen.getByTestId('peak-list-error');
      expect(error).not.toBeNull();
    });
  });

  describe('when the useGetPeaksQueryResult returns data', () => {
    const queryResult: PeakListQueryResult = {
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
    } as unknown as PeakListQueryResult;

    it('should list the peaks', () => {
      render(
        <PeakListScreen
          navigation={mockedNavigation}
          queryResult={queryResult}
        />,
      );
      const peak1 = screen.getByTestId('peak-list-peak-1');
      expect(peak1).not.toBeNull();
    });
  });
});
