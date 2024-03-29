import React from 'react';
import {
  ApolloClient,
  ApolloProvider as ApolloProviderOriginal,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ErrorLink, onError } from '@apollo/client/link/error';

import { useAuthState } from '@app/hooks';

const GRAPHQL_URL = 'https://peak-tracker.com/gql';

/**
 * Unfortunately, the Apollo Client doesn't export the ServerError interface.
 */
interface ServerError {
  statusCode: number;
}

/**
 * Check whether a network error is a server error. This is needed in order to access
 * the statusCode property.
 */
export const isServerError = (error: unknown): error is ServerError =>
  typeof error === 'object' && error !== null && 'statusCode' in error;

const STATUS_CODE_UNAUTHORIZED = 401;

/**
 * Check for a 401 error from the backend. This happens if the auth state is not
 * valid/up to date. This actually shouldn't happen.
 */
export const isUnauthorizedError = (error: unknown): boolean =>
  isServerError(error) && error.statusCode === STATUS_CODE_UNAUTHORIZED;

/**
 * Needed for any checks from the Apollo Client.
 */
export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Add the operation name to the request URL for easier request inspection.
 */
export const fetchWithOperationName = (
  uri: string,
  options: { body: string },
) => {
  try {
    const parsedBody = JSON.parse(options.body) as unknown;
    const operationName =
      isObject(parsedBody) && typeof parsedBody['operationName'] === 'string' // eslint-disable-line dot-notation
        ? parsedBody['operationName'] // eslint-disable-line dot-notation
        : '';

    return fetch(`${uri}?op=${operationName}`, options);
  } catch (error) {
    console.error(`Failed to parse body: ${options.body}`);
    return fetch(uri, options);
  }
};

/**
 * The HTTP link is used to specify the GraphQL endpoint.
 */
const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  fetch: fetchWithOperationName,
});

/**
 * The auth link is used to add the ID token to the request headers.
 */
export const authLink = (getIdToken: () => Promise<string>) =>
  setContext(async (_, { headers }) => {
    const idToken = await getIdToken();
    return {
      headers: {
        ...(isObject(headers) ? headers : {}),
        Authorization: `Bearer ${idToken}`,
      },
    };
  });

export const errorHandler: ErrorLink.ErrorHandler = ({
  graphQLErrors,
  networkError,
}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      const errorDetails = [
        `Message: ${message}`,
        `Location: ${JSON.stringify(locations)}`,
        `Path: ${path?.join(' > ') ?? 'unknown'}`,
      ].join(', ');
      console.error(`GraphQL error: ${errorDetails}`);
    });
  }

  if (networkError) {
    if (isUnauthorizedError(networkError)) {
      // TODO: Handle 401
      // Maybe with RetryLink
      // https://www.apollographql.com/docs/react/api/link/apollo-link-retry
    } else {
      const errorMessage = `[GraphQL network error]: ${networkError.toString()}`;
      console.error(errorMessage);
    }
  }
};

/**
 * The error link is used to handle errors from the GraphQL server.
 */
export const errorLink = onError(errorHandler);

export const client = (getIdToken: () => Promise<string>) =>
  new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        // If the root query is called different than `Query`, we have to define it for
        // the InMemoryCache.
        // See https://github.com/apollographql/apollo-client/issues/7470
        RootQueryType: {
          queryType: true,
        },
        Peak: {
          merge: true,
        },
      },
    }),
    link: from([errorLink, authLink(getIdToken), httpLink]),
  });

export const ApolloProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { getIdToken } = useAuthState();

  return (
    <ApolloProviderOriginal client={client(getIdToken)}>
      {children}
    </ApolloProviderOriginal>
  );
};
