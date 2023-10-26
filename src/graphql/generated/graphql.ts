/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** A relay node */
export type Node = {
  /** A unique identifier */
  id: Scalars['ID']['output'];
};

/** A relay page info */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Peak = Node & {
  __typename?: 'Peak';
  elevation: Scalars['Int']['output'];
  googlePlacesId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  osmId: Scalars['Int']['output'];
  scaleCount: Scalars['Int']['output'];
  scaledByUser?: Maybe<Scalars['Boolean']['output']>;
  slug: Scalars['String']['output'];
  wikidataId?: Maybe<Scalars['String']['output']>;
  wikipedia?: Maybe<Scalars['String']['output']>;
};


export type PeakScaledByUserArgs = {
  userId: Scalars['ID']['input'];
};

/** :peak connection */
export type PeakConnection = {
  __typename?: 'PeakConnection';
  /** Total count on all pages */
  count?: Maybe<Scalars['Int']['output']>;
  /** :peak edges */
  edges?: Maybe<Array<Maybe<PeakEdge>>>;
  /** Page information */
  pageInfo: PageInfo;
};

/** :peak edge */
export type PeakEdge = {
  __typename?: 'PeakEdge';
  /** Cursor */
  cursor: Scalars['String']['output'];
  /** :peak node */
  node?: Maybe<Peak>;
};

export type PeakFilterElevation = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNil?: InputMaybe<Scalars['Boolean']['input']>;
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  lessThanOrEqual?: InputMaybe<Scalars['Int']['input']>;
  notEq?: InputMaybe<Scalars['Int']['input']>;
};

export type PeakFilterGooglePlacesId = {
  eq?: InputMaybe<Scalars['String']['input']>;
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isNil?: InputMaybe<Scalars['Boolean']['input']>;
  lessThan?: InputMaybe<Scalars['String']['input']>;
  lessThanOrEqual?: InputMaybe<Scalars['String']['input']>;
  notEq?: InputMaybe<Scalars['String']['input']>;
};

export type PeakFilterId = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  greaterThan?: InputMaybe<Scalars['ID']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  isNil?: InputMaybe<Scalars['Boolean']['input']>;
  lessThan?: InputMaybe<Scalars['ID']['input']>;
  lessThanOrEqual?: InputMaybe<Scalars['ID']['input']>;
  notEq?: InputMaybe<Scalars['ID']['input']>;
};

export type PeakFilterInput = {
  and?: InputMaybe<Array<PeakFilterInput>>;
  elevation?: InputMaybe<PeakFilterElevation>;
  googlePlacesId?: InputMaybe<PeakFilterGooglePlacesId>;
  id?: InputMaybe<PeakFilterId>;
  latitude?: InputMaybe<PeakFilterLatitude>;
  longitude?: InputMaybe<PeakFilterLongitude>;
  name?: InputMaybe<PeakFilterName>;
  not?: InputMaybe<Array<PeakFilterInput>>;
  or?: InputMaybe<Array<PeakFilterInput>>;
  osmId?: InputMaybe<PeakFilterOsmId>;
  scaleCount?: InputMaybe<PeakFilterScaleCount>;
  scaledByUser?: InputMaybe<PeakFilterScaledByUser>;
  slug?: InputMaybe<PeakFilterSlug>;
  wikidataId?: InputMaybe<PeakFilterWikidataId>;
  wikipedia?: InputMaybe<PeakFilterWikipedia>;
};

export type PeakFilterLatitude = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  greaterThan?: InputMaybe<Scalars['Float']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  isNil?: InputMaybe<Scalars['Boolean']['input']>;
  lessThan?: InputMaybe<Scalars['Float']['input']>;
  lessThanOrEqual?: InputMaybe<Scalars['Float']['input']>;
  notEq?: InputMaybe<Scalars['Float']['input']>;
};

export type PeakFilterLongitude = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  greaterThan?: InputMaybe<Scalars['Float']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  isNil?: InputMaybe<Scalars['Boolean']['input']>;
  lessThan?: InputMaybe<Scalars['Float']['input']>;
  lessThanOrEqual?: InputMaybe<Scalars['Float']['input']>;
  notEq?: InputMaybe<Scalars['Float']['input']>;
};

export type PeakFilterName = {
  eq?: InputMaybe<Scalars['String']['input']>;
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  isNil?: InputMaybe<Scalars['Boolean']['input']>;
  lessThan?: InputMaybe<Scalars['String']['input']>;
  lessThanOrEqual?: InputMaybe<Scalars['String']['input']>;
  notEq?: InputMaybe<Scalars['String']['input']>;
};

export type PeakFilterOsmId = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNil?: InputMaybe<Scalars['Boolean']['input']>;
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  lessThanOrEqual?: InputMaybe<Scalars['Int']['input']>;
  notEq?: InputMaybe<Scalars['Int']['input']>;
};

export type PeakFilterScaleCount = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isNil?: InputMaybe<Scalars['Boolean']['input']>;
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  lessThanOrEqual?: InputMaybe<Scalars['Int']['input']>;
  notEq?: InputMaybe<Scalars['Int']['input']>;
};

export type PeakFilterScaledByUser = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  greaterThan?: InputMaybe<Scalars['Boolean']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  input?: InputMaybe<PeakScaledByUserFieldInput>;
  isNil?: InputMaybe<Scalars['Boolean']['input']>;
  lessThan?: InputMaybe<Scalars['Boolean']['input']>;
  lessThanOrEqual?: InputMaybe<Scalars['Boolean']['input']>;
  notEq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PeakFilterSlug = {
  eq?: InputMaybe<Scalars['String']['input']>;
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  isNil?: InputMaybe<Scalars['Boolean']['input']>;
  lessThan?: InputMaybe<Scalars['String']['input']>;
  lessThanOrEqual?: InputMaybe<Scalars['String']['input']>;
  notEq?: InputMaybe<Scalars['String']['input']>;
};

export type PeakFilterWikidataId = {
  eq?: InputMaybe<Scalars['String']['input']>;
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isNil?: InputMaybe<Scalars['Boolean']['input']>;
  lessThan?: InputMaybe<Scalars['String']['input']>;
  lessThanOrEqual?: InputMaybe<Scalars['String']['input']>;
  notEq?: InputMaybe<Scalars['String']['input']>;
};

export type PeakFilterWikipedia = {
  eq?: InputMaybe<Scalars['String']['input']>;
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isNil?: InputMaybe<Scalars['Boolean']['input']>;
  lessThan?: InputMaybe<Scalars['String']['input']>;
  lessThanOrEqual?: InputMaybe<Scalars['String']['input']>;
  notEq?: InputMaybe<Scalars['String']['input']>;
};

export type PeakScaledByUserFieldInput = {
  userId: Scalars['ID']['input'];
};

export enum PeakSortField {
  Elevation = 'ELEVATION',
  GooglePlacesId = 'GOOGLE_PLACES_ID',
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
  id: Scalars['ID']['input'];
};


export type RootQueryTypePeaksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<PeakFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  scaledByActor?: InputMaybe<Scalars['Boolean']['input']>;
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
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type PeakListQueryVariables = Exact<{ [key: string]: never; }>;


export type PeakListQuery = (
  { __typename?: 'RootQueryType' }
  & { ' $fragmentRefs'?: { 'PeakListPeaksFragment': PeakListPeaksFragment } }
);

export type PeakListPeaksFragment = { __typename?: 'RootQueryType', peaks?: { __typename?: 'PeakConnection', edges?: Array<{ __typename?: 'PeakEdge', node?: (
        { __typename?: 'Peak' }
        & { ' $fragmentRefs'?: { 'PeakListPeakFragment': PeakListPeakFragment } }
      ) | null } | null> | null } | null } & { ' $fragmentName'?: 'PeakListPeaksFragment' };

export type PeakListPeakFragment = { __typename?: 'Peak', id: string, name: string, slug: string } & { ' $fragmentName'?: 'PeakListPeakFragment' };

export const PeakListPeakFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PeakListPeak"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Peak"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]} as unknown as DocumentNode<PeakListPeakFragment, unknown>;
export const PeakListPeaksFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PeakListPeaks"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RootQueryType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"peaks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PeakListPeak"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PeakListPeak"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Peak"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]} as unknown as DocumentNode<PeakListPeaksFragment, unknown>;
export const PeakListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PeakList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PeakListPeaks"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PeakListPeak"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Peak"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PeakListPeaks"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RootQueryType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"peaks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PeakListPeak"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PeakListQuery, PeakListQueryVariables>;