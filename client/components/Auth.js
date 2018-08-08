import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
  {
    SignupMutation(
      $name: String!
      $email: String!
      $password: String!
    ) {
      signup(name: $name, email: $email, password: $password) {
        token
        user {
          id
          name
          email
        }
      }
    }
  }
`;

class Auth extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }

  render() {
    const { type } = this.props;
    const { email, password, name } = this.state;

    const isSignup = type === 'SIGNUP';

    return (
      <div>
        {isSignup ? 'Sign Up' : 'Log In'}

        {
          isSignup
          && (
            <React.Fragment>
              <label htmlFor="auth-name">name</label>
              <input
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
                type="text"
                placeholder="name"
                id="auth-name"
              />
            </React.Fragment>

          )
        }
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={e => this.setState({ email: e.target.value })}
          type="text"
          placeholder="email"
          id="auth-email"
        />

        <label htmlFor="password">password</label>
        <input
          value={password}
          onChange={e => this.setState({ password: e.target.value })}
          type="text"
          placeholder="password"
          id="auth-password"
        />

        <Mutation
          mutation={SIGNUP_MUTATION}
          variables={isSignup ? { name, email, password } : { email, password }}
        >
          {
            mutation => <button onClick={mutation}>Submit</button>
          }
        </Mutation>
      </div>
    );
  }
}

Auth.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Auth;
