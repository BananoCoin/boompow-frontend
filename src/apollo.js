import { ApolloClient, InMemoryCache } from '@apollo/client';

import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const getWsUrl = (url) =>
  url.includes('http://')
    ? url.replace('http://', 'ws://')
    : url.replace('https://', 'wss://');

const wsLink = new GraphQLWsLink(
  createClient({
    url: getWsUrl(process.env.REACT_APP_GraphQLURL),
  })
);

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_GraphQLURL}`,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export const apolloClient = () => client;
