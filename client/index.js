import './style/index.scss';
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider, Query } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Auth from './components/Auth';
import Trip from './components/Trip';
import Header from './components/Header';

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
  // credentials: 'same-origin', // send cookies
  credentials: 'include', // localhost server diff from parcel
});

const client = new ApolloClient({
  link: ApolloLink.from([withClientState({}), httpLink]),
  cache: new InMemoryCache(),
});

const App = () => (
  <Router>
    <ApolloProvider client={client}>
      <Header />
      <Route path="/signup" render={() => <Auth type="SIGNUP" />} />
      <Route path="/login" render={() => <Auth type="LOGIN" />} />

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
  </Router>
);

render(<App />, document.getElementById('app'));
