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
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
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
  id?: InputMaybe<PeakFilterId>;
  name?: InputMaybe<PeakFilterName>;
  or?: InputMaybe<Array<PeakFilterInput>>;
  slug?: InputMaybe<PeakFilterSlug>;
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

export enum PeakSortField {
  Id = 'ID',
  Name = 'NAME',
  Slug = 'SLUG'
}

export type PeakSortInput = {
  field: PeakSortField;
  order?: InputMaybe<SortOrder>;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
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
  sort?: InputMaybe<Array<InputMaybe<PeakSortInput>>>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

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