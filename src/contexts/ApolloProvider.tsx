import React from 'react';
import {
  ApolloClient,
  ApolloProvider as ApolloProviderOriginal,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { useAuthState } from '@app/hooks/useAuthState';

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
const isServerError = (error: unknown): error is ServerError =>
  typeof error === 'object' && error !== null && 'statusCode' in error;

/**
 * Check for a 401 error from the backend. This happens if the auth state is not
 * valid/up to date. This actually shouldn't happen.
 */
const isUnauthorizedError = (error: unknown): boolean =>
  isServerError(error) && error.statusCode === 401;

/**
 * Needed for any checks from the Apollo Client.
 */
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const errorLink = onError(({ graphQLErrors, networkError }) => {
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
});

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

// TODO: custom fetching to add operation name to the request URL
// https://www.apollographql.com/docs/react/networking/advanced-http-networking/#custom-fetching

export const ApolloProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { getIdToken } = useAuthState();

  // TODO: Extract from Provider to make it testable
  const authLink = setContext(async (_, { headers }) => {
    const idToken = await getIdToken();
    console.log('authLink.idToken', idToken);
    return {
      headers: {
        ...(isObject(headers) ? headers : {}),
        authorization: `Bearer ${idToken}`,
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Peak: {
          merge: true,
        },
      },
    }),
    link: from([errorLink, authLink, httpLink]),
  });

  return (
    <ApolloProviderOriginal client={client}>{children}</ApolloProviderOriginal>
  );
};