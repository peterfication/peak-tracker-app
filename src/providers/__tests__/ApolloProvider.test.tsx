import React from 'react';
import { ApolloLink, execute, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { render } from '@testing-library/react-native';

import { AuthStateMode, useAuthState } from '@app/hooks';

import {
  ApolloProvider,
  authLink,
  client,
  errorHandler,
  errorLink,
  fetchWithOperationName,
  isObject,
  isServerError,
  isUnauthorizedError,
} from '../ApolloProvider';

jest.mock('@app/hooks/useAuthState');
const mockedUseAuthState = jest.mocked(useAuthState);

describe('ApolloProvider', () => {
  const mockGetIdToken = jest.fn();

  beforeEach(() => {
    mockedUseAuthState.mockReturnValue({
      getIdToken: mockGetIdToken,
      authState: AuthStateMode.Loading,
      storeAuthState: jest.fn(),
      getAuthState: jest.fn(),
      removeAuthState: jest.fn(),
    });
  });

  it('renders the ApolloProviderOriginal component with the expected props', () => {
    const mockChildren = <div>Mock Children</div>;
    render(<ApolloProvider>{mockChildren}</ApolloProvider>);

    expect(mockedUseAuthState).toHaveBeenCalled();
  });
});

const MockQuery = gql`
  query {
    peaks {
      edges {
        node {
          id
        }
      }
    }
  }
`;
const executeRequest = (link: ApolloLink) => {
  execute(link, { query: MockQuery }).subscribe(() => {
    /* not our concern within this test */
  });
};

describe('isServerError', () => {
  it('returns true if the input has a statusCode property', () => {
    const error = { statusCode: 500 };
    expect(isServerError(error)).toBe(true);
  });

  it('returns false if the input does not have a statusCode property', () => {
    const error = new Error('some error');
    expect(isServerError(error)).toBe(false);
  });

  it('returns false if the input is not an object', () => {
    const error = 'some error';
    expect(isServerError(error)).toBe(false);
  });

  it('returns false if the input is null', () => {
    const error = null;
    expect(isServerError(error)).toBe(false);
  });
});

describe('isUnauthorizedError', () => {
  it('returns true if the input is a server error with a 401 status code', () => {
    const error = { statusCode: 401 };
    expect(isUnauthorizedError(error)).toBe(true);
  });

  it('returns false if the input is not a server error', () => {
    const error = new Error('some error');
    expect(isUnauthorizedError(error)).toBe(false);
  });

  it('returns false if the input is a server error with a different status code', () => {
    const error = { statusCode: 500 };
    expect(isUnauthorizedError(error)).toBe(false);
  });

  it('returns false if the input is null', () => {
    const error = null;
    expect(isUnauthorizedError(error)).toBe(false);
  });

  it('returns false if the input is not an object', () => {
    const error = 'some error';
    expect(isUnauthorizedError(error)).toBe(false);
  });
});

describe('isObject', () => {
  it('returns true for an object', () => {
    const obj = { foo: 'bar' };
    expect(isObject(obj)).toBe(true);
  });

  it('returns false for null', () => {
    const obj = null;
    expect(isObject(obj)).toBe(false);
  });

  it('returns false for an array', () => {
    const obj = ['foo', 'bar'];
    expect(isObject(obj)).toBe(false);
  });

  it('returns false for a string', () => {
    const obj = 'foo';
    expect(isObject(obj)).toBe(false);
  });

  it('returns false for a number', () => {
    const obj = 42;
    expect(isObject(obj)).toBe(false);
  });

  it('returns false for undefined', () => {
    const obj = undefined;
    expect(isObject(obj)).toBe(false);
  });
});

describe('fetchWithOperationName', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockOptions = { body: JSON.stringify({ operationName: 'myOp' }) };

  it('adds the operation name to the URL query parameters', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch');
    fetchSpy.mockResolvedValueOnce(new Response());

    await fetchWithOperationName('http://example.com', mockOptions);

    expect(fetchSpy).toHaveBeenCalledWith(
      'http://example.com?op=myOp',
      mockOptions,
    );
  });

  it('uses an empty string as the operation name if none is provided', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch');
    fetchSpy.mockResolvedValueOnce(new Response());

    const optionsWithoutOperationName = { body: JSON.stringify({}) };
    await fetchWithOperationName(
      'http://example.com',
      optionsWithoutOperationName,
    );

    expect(fetchSpy).toHaveBeenCalledWith(
      'http://example.com?op=',
      optionsWithoutOperationName,
    );
  });

  it('returns the result of the fetch call', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch');
    const mockResponse = new Response('response body');
    fetchSpy.mockResolvedValueOnce(mockResponse);

    const result = await fetchWithOperationName(
      'http://example.com',
      mockOptions,
    );

    expect(result).toBe(mockResponse);
  });

  it('logs an error and returns the result of the fetch call when parsing fails', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch');
    const mockResponse = new Response('response body');
    fetchSpy.mockResolvedValueOnce(mockResponse);

    const optionsWithInvalidJsonBody = { body: '{ foo: }' };
    console.error = jest.fn();

    const result = await fetchWithOperationName(
      'http://example.com',
      optionsWithInvalidJsonBody,
    );

    expect(result).toBe(mockResponse);
    expect(console.error).toHaveBeenCalledWith(
      `Failed to parse body: ${optionsWithInvalidJsonBody.body}`,
    );
  });
});

describe('authLink', () => {
  const mockIdToken = 'mockIdToken';

  it('adds the Authorization header with the correct value', () => {
    const mockGetIdToken = jest.fn();
    const expectedAuthorizationHeader = `Bearer ${mockIdToken}`;
    mockGetIdToken.mockResolvedValueOnce(mockIdToken);

    const lastLink = new ApolloLink(operation => {
      /* eslint-disable dot-notation */
      const headers = operation.getContext()['headers'] as Record<
        string,
        string
      >;
      /* eslint-enable dot-notation */
      expect(headers).toEqual({ Authorization: expectedAuthorizationHeader });

      return null;
    });

    const link = ApolloLink.from([authLink(mockGetIdToken), lastLink]);

    executeRequest(link);
  });

  it('keeps the other header values', () => {
    const mockGetIdToken = jest.fn();
    const expectedAuthorizationHeader = `Bearer ${mockIdToken}`;
    mockGetIdToken.mockResolvedValueOnce(mockIdToken);

    const firstLink = setContext((_1, _2) => ({
      headers: {
        'x-custom': 'mocked header',
      },
    }));

    const lastLink = new ApolloLink(operation => {
      /* eslint-disable dot-notation */
      const headers = operation.getContext()['headers'] as Record<
        string,
        string
      >;
      /* eslint-enable dot-notation */
      expect(headers).toEqual({
        'x-custom': 'mocked header',
        Authorization: expectedAuthorizationHeader,
      });

      return null;
    });

    const link = ApolloLink.from([
      firstLink,
      authLink(mockGetIdToken),
      lastLink,
    ]);

    executeRequest(link);
  });
});

describe('errorLink', () => {
  it('executes', () => {
    expect(() => {
      const lastLink = new ApolloLink(_ => null);

      const link = ApolloLink.from([errorLink, lastLink]);

      executeRequest(link);
    }).not.toThrow();
  });
});

/**
 * Apollo does not export the ErrorResponse type.
 */
type ErrorResponse = Parameters<typeof errorHandler>[0];

describe('errorHandler', () => {
  const mockGraphQLErrors = [
    {
      message: 'Error 1',
      locations: [{ line: 1, column: 1 }],
      path: ['field1', 'field2'],
    },
    {
      message: 'Error 2',
      locations: [{ line: 2, column: 2 }],
      path: ['field3'],
    },
  ];
  const mockNetworkError = new Error('Network error');

  beforeEach(() => {
    console.error = jest.fn();
  });

  it('logs GraphQL errors with the correct format', () => {
    errorHandler({
      graphQLErrors: mockGraphQLErrors,
    } as unknown as ErrorResponse);

    expect(console.error).toHaveBeenCalledWith(
      'GraphQL error: Message: Error 1, Location: [{"line":1,"column":1}], Path: field1 > field2',
    );
    expect(console.error).toHaveBeenCalledWith(
      'GraphQL error: Message: Error 2, Location: [{"line":2,"column":2}], Path: field3',
    );
  });

  it('logs network errors with the correct format', () => {
    errorHandler({
      networkError: mockNetworkError,
    } as unknown as ErrorResponse);

    expect(console.error).toHaveBeenCalledWith(
      `[GraphQL network error]: ${mockNetworkError.toString()}`,
    );
  });
});

describe('client', () => {
  const mockedGetIdToken = jest.fn();

  it('executes', () => {
    expect(() => {
      client(mockedGetIdToken);
    }).not.toThrow();
  });
});
