import { gql } from '@apollo/client';
import { apolloClient } from 'apollo';

export const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
      banAddress
      serviceName
      serviceWebsite
      type
      emailVerified
      email
    }
  }
`;

const Auth = {
  login: async (email, password) => {
    const resp = await apolloClient().mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        input: {
          email,
          password,
        },
      },
    });
    return resp.data?.login;
  },
  register: async ({
    serviceType,
    email,
    password,
    banAddress,
    serviceName,
    serviceWebsite,
  }) => true,
  changePassword: async (oldPassword, newPassword) => true,

  resendVerificationEmail: async () => true,
  verifyEmail: async (token) => true,
};

export default Auth;
