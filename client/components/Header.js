import React from 'react';
// import PropTypes from 'prop-types';
import { Mutation, Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_USER, LOGOUT } from '../apollo/queries';

const Header = () => (
  <div className="header">
    header

    <Query query={GET_USER}>
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
              mutation={LOGOUT}
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
