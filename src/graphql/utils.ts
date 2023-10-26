import { QueryResult } from '@apollo/client';

import { Exact } from '@app/graphql/generated/graphql';

/**
 * This type is used to simplify the usage of QueryResult as the OperationVariables can
 * be omitted sometimes.
 */
export type SimpleQueryResult<T> = QueryResult<
  T,
  Exact<{ [key: string]: never }>
>;
