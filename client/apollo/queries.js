import gql from 'graphql-tag';

export const GET_USER = gql`
  {
    user {
      id
      name
      email
      __typename
    }
  }
`;

export const SIGNUP = gql`
  mutation SignupMutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      id
      name
      email
      __typename
    }
  }
`;

export const LOGIN = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      __typename
    }
  }
`;

export const LOGOUT = gql`
  mutation LogoutMutation {
    logout {
      message
    }
  }
`;
