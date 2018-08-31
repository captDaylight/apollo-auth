import React from 'react';
// import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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
    <Mutation
      mutation={LOGOUT_MUTATION}
    >
      {
        mutation => <button type="submit" onClick={mutation}>Logout</button>
      }
    </Mutation>

  </div>
);


// Header.propTypes = {
//   type: PropTypes.string.isRequired,
// };

export default Header;
