import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
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
      isSignup: props.type === 'SIGNUP',
    };
  }

  render() {
    const {
      email,
      password,
      name,
      isSignup,
    } = this.state;

    return (
      <div>
        <h1>{isSignup ? 'Sign Up' : 'Log In'}</h1>

        <Mutation
          mutation={isSignup ? SIGNUP_MUTATION : LOGIN_MUTATION}
          variables={isSignup ? { name, email, password } : { email, password }}
          onCompleted={(res) => { console.log('complete', res); }}
        >
          {
            mutation => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  mutation();
                }}
              >
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
                  type="password"
                  placeholder="password"
                  id="auth-password"
                />

                <button type="submit">Submit</button>
              </form>
            )
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
