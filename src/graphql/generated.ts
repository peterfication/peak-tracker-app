import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** A relay node */
export type Node = {
  /** A unique identifier */
  id: Scalars['ID'];
};

/** A relay page info */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue */
  startCursor?: Maybe<Scalars['String']>;
};

export type Peak = Node & {
  __typename?: 'Peak';
  elevation: Scalars['Int'];
  id: Scalars['ID'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
  osmId: Scalars['Int'];
  scaleCount: Scalars['Int'];
  scaledByUser?: Maybe<Scalars['Boolean']>;
  slug: Scalars['String'];
  wikidataId?: Maybe<Scalars['String']>;
  wikipedia?: Maybe<Scalars['String']>;
};


export type PeakScaledByUserArgs = {
  userId: Scalars['ID'];
};

/** :peak connection */
export type PeakConnection = {
  __typename?: 'PeakConnection';
  /** Total count on all pages */
  count?: Maybe<Scalars['Int']>;
  /** :peak edges */
  edges?: Maybe<Array<Maybe<PeakEdge>>>;
  /** Page information */
  pageInfo: PageInfo;
};

/** :peak edge */
export type PeakEdge = {
  __typename?: 'PeakEdge';
  /** Cursor */
  cursor: Scalars['String'];
  /** :peak node */
  node?: Maybe<Peak>;
};

export type PeakFilterElevation = {
  eq?: InputMaybe<Scalars['Int']>;
  greaterThan?: InputMaybe<Scalars['Int']>;
  greaterThanOrEqual?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  isNil?: InputMaybe<Scalars['Boolean']>;
  lessThan?: InputMaybe<Scalars['Int']>;
  lessThanOrEqual?: InputMaybe<Scalars['Int']>;
  notEq?: InputMaybe<Scalars['Int']>;
};

export type PeakFilterId = {
  eq?: InputMaybe<Scalars['ID']>;
  greaterThan?: InputMaybe<Scalars['ID']>;
  greaterThanOrEqual?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<Scalars['ID']>>;
  isNil?: InputMaybe<Scalars['Boolean']>;
  lessThan?: InputMaybe<Scalars['ID']>;
  lessThanOrEqual?: InputMaybe<Scalars['ID']>;
  notEq?: InputMaybe<Scalars['ID']>;
};

export type PeakFilterInput = {
  and?: InputMaybe<Array<PeakFilterInput>>;
  elevation?: InputMaybe<PeakFilterElevation>;
  id?: InputMaybe<PeakFilterId>;
  latitude?: InputMaybe<PeakFilterLatitude>;
  longitude?: InputMaybe<PeakFilterLongitude>;
  name?: InputMaybe<PeakFilterName>;
  or?: InputMaybe<Array<PeakFilterInput>>;
  osmId?: InputMaybe<PeakFilterOsmId>;
  scaleCount?: InputMaybe<PeakFilterScaleCount>;
  scaledByUser?: InputMaybe<PeakFilterScaledByUser>;
  slug?: InputMaybe<PeakFilterSlug>;
  wikidataId?: InputMaybe<PeakFilterWikidataId>;
  wikipedia?: InputMaybe<PeakFilterWikipedia>;
};

export type PeakFilterLatitude = {
  eq?: InputMaybe<Scalars['Float']>;
  greaterThan?: InputMaybe<Scalars['Float']>;
  greaterThanOrEqual?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  isNil?: InputMaybe<Scalars['Boolean']>;
  lessThan?: InputMaybe<Scalars['Float']>;
  lessThanOrEqual?: InputMaybe<Scalars['Float']>;
  notEq?: InputMaybe<Scalars['Float']>;
};

export type PeakFilterLongitude = {
  eq?: InputMaybe<Scalars['Float']>;
  greaterThan?: InputMaybe<Scalars['Float']>;
  greaterThanOrEqual?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  isNil?: InputMaybe<Scalars['Boolean']>;
  lessThan?: InputMaybe<Scalars['Float']>;
  lessThanOrEqual?: InputMaybe<Scalars['Float']>;
  notEq?: InputMaybe<Scalars['Float']>;
};

export type PeakFilterName = {
  eq?: InputMaybe<Scalars['String']>;
  greaterThan?: InputMaybe<Scalars['String']>;
  greaterThanOrEqual?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  isNil?: InputMaybe<Scalars['Boolean']>;
  lessThan?: InputMaybe<Scalars['String']>;
  lessThanOrEqual?: InputMaybe<Scalars['String']>;
  notEq?: InputMaybe<Scalars['String']>;
};

export type PeakFilterOsmId = {
  eq?: InputMaybe<Scalars['Int']>;
  greaterThan?: InputMaybe<Scalars['Int']>;
  greaterThanOrEqual?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  isNil?: InputMaybe<Scalars['Boolean']>;
  lessThan?: InputMaybe<Scalars['Int']>;
  lessThanOrEqual?: InputMaybe<Scalars['Int']>;
  notEq?: InputMaybe<Scalars['Int']>;
};

export type PeakFilterScaleCount = {
  eq?: InputMaybe<Scalars['Int']>;
  greaterThan?: InputMaybe<Scalars['Int']>;
  greaterThanOrEqual?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  isNil?: InputMaybe<Scalars['Boolean']>;
  lessThan?: InputMaybe<Scalars['Int']>;
  lessThanOrEqual?: InputMaybe<Scalars['Int']>;
  notEq?: InputMaybe<Scalars['Int']>;
};

export type PeakFilterScaledByUser = {
  eq?: InputMaybe<Scalars['Boolean']>;
  greaterThan?: InputMaybe<Scalars['Boolean']>;
  greaterThanOrEqual?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<Scalars['Boolean']>>;
  input?: InputMaybe<PeakScaledByUserFieldInput>;
  isNil?: InputMaybe<Scalars['Boolean']>;
  lessThan?: InputMaybe<Scalars['Boolean']>;
  lessThanOrEqual?: InputMaybe<Scalars['Boolean']>;
  notEq?: InputMaybe<Scalars['Boolean']>;
};

export type PeakFilterSlug = {
  eq?: InputMaybe<Scalars['String']>;
  greaterThan?: InputMaybe<Scalars['String']>;
  greaterThanOrEqual?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  isNil?: InputMaybe<Scalars['Boolean']>;
  lessThan?: InputMaybe<Scalars['String']>;
  lessThanOrEqual?: InputMaybe<Scalars['String']>;
  notEq?: InputMaybe<Scalars['String']>;
};

export type PeakFilterWikidataId = {
  eq?: InputMaybe<Scalars['String']>;
  greaterThan?: InputMaybe<Scalars['String']>;
  greaterThanOrEqual?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  isNil?: InputMaybe<Scalars['Boolean']>;
  lessThan?: InputMaybe<Scalars['String']>;
  lessThanOrEqual?: InputMaybe<Scalars['String']>;
  notEq?: InputMaybe<Scalars['String']>;
};

export type PeakFilterWikipedia = {
  eq?: InputMaybe<Scalars['String']>;
  greaterThan?: InputMaybe<Scalars['String']>;
  greaterThanOrEqual?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  isNil?: InputMaybe<Scalars['Boolean']>;
  lessThan?: InputMaybe<Scalars['String']>;
  lessThanOrEqual?: InputMaybe<Scalars['String']>;
  notEq?: InputMaybe<Scalars['String']>;
};

export type PeakScaledByUserFieldInput = {
  userId: Scalars['ID'];
};

export enum PeakSortField {
  Elevation = 'ELEVATION',
  Id = 'ID',
  Latitude = 'LATITUDE',
  Longitude = 'LONGITUDE',
  Name = 'NAME',
  OsmId = 'OSM_ID',
  ScaledByUser = 'SCALED_BY_USER',
  ScaleCount = 'SCALE_COUNT',
  Slug = 'SLUG',
  WikidataId = 'WIKIDATA_ID',
  Wikipedia = 'WIKIPEDIA'
}

export type PeakSortInput = {
  field: PeakSortField;
  order?: InputMaybe<SortOrder>;
  scaledByUserInput?: InputMaybe<PeakScaledByUserFieldInput>;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  currentUser?: Maybe<User>;
  peak?: Maybe<Peak>;
  peaks?: Maybe<PeakConnection>;
};


export type RootQueryTypePeakArgs = {
  id: Scalars['ID'];
};


export type RootQueryTypePeaksArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<PeakFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  scaledByActor?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<Array<InputMaybe<PeakSortInput>>>;
};

export enum SortOrder {
  Asc = 'ASC',
  AscNullsFirst = 'ASC_NULLS_FIRST',
  AscNullsLast = 'ASC_NULLS_LAST',
  Desc = 'DESC',
  DescNullsFirst = 'DESC_NULLS_FIRST',
  DescNullsLast = 'DESC_NULLS_LAST'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
};

export type GetPeaksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPeaksQuery = { __typename?: 'RootQueryType', peaks?: { __typename?: 'PeakConnection', edges?: Array<{ __typename?: 'PeakEdge', node?: { __typename?: 'Peak', id: string, name: string, slug: string } | null } | null> | null } | null };

export type GetPeaksPeakFragment = { __typename?: 'Peak', id: string, name: string, slug: string };

export const GetPeaksPeakFragmentDoc = gql`
    fragment GetPeaksPeak on Peak {
  id
  name
  slug
}
    `;
export const GetPeaksDocument = gql`
    query GetPeaks {
  peaks {
    edges {
      node {
        ...GetPeaksPeak
      }
    }
  }
}
    ${GetPeaksPeakFragmentDoc}`;

/**
 * __useGetPeaksQuery__
 *
 * To run a query within a React component, call `useGetPeaksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPeaksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPeaksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPeaksQuery(baseOptions?: Apollo.QueryHookOptions<GetPeaksQuery, GetPeaksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPeaksQuery, GetPeaksQueryVariables>(GetPeaksDocument, options);
      }
export function useGetPeaksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPeaksQuery, GetPeaksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPeaksQuery, GetPeaksQueryVariables>(GetPeaksDocument, options);
        }
export type GetPeaksQueryHookResult = ReturnType<typeof useGetPeaksQuery>;
export type GetPeaksLazyQueryHookResult = ReturnType<typeof useGetPeaksLazyQuery>;
export type GetPeaksQueryResult = Apollo.QueryResult<GetPeaksQuery, GetPeaksQueryVariables>;