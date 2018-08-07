import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider, Query } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import Trip from './components/Trip';

const TRIP_QUERY = gql`
  {
    trips {
      name
      id
    }
  }
`;

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <h1>
      Hello Parcel
    </h1>
    <Query query={TRIP_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        return data.trips.map(trip => <Trip name={trip.name} key={trip.id} />);
      }}
    </Query>
  </ApolloProvider>
);

render(<App />, document.getElementById('app'));
