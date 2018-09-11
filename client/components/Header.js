import React from 'react';
// import PropTypes from 'prop-types';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const USER_QUERY = gql`
  {
    user {
      id
      email
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logout {
      message
    }
  }
`;

const Header = () => (
  <div className="header">
    header

    <Query query={USER_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) {
          return (
            <div>
              <Link to="signup">Signup</Link>
              <Link to="login">Login</Link>
            </div>
          );
        }

        return (
          <div>
            {data.user.email}
            <Mutation
              mutation={LOGOUT_MUTATION}
            >
              {
                mutation => <button type="submit" onClick={mutation}>Logout</button>
              }
            </Mutation>
          </div>
        );
      }}
    </Query>

  </div>
);


// Header.propTypes = {
//   type: PropTypes.string.isRequired,
// };

export default Header;
