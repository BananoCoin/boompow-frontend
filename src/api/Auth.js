import { gql } from "@apollo/client";
import { apolloClient } from "apollo";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

export const SERVICE_TOKEN_MUTATION = gql`
  mutation generateOrGetServiceToken {
    generateOrGetServiceToken
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`;

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword($input: ChangePasswordInput!) {
    changePassword(input: $input)
  }
`;

export const VERIFY_EMAIL_QUERY = gql`
  query verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input)
  }
`;

export const GET_USER_QUERY = gql`
  query getUser {
    getUser {
      banAddress
      serviceName
      serviceWebsite
      type
      emailVerified
      email
      canRequestWork
    }
  }
`;

const Auth = {
  // ACCOUNT
  login: async (email, password) => {
    const resp = await apolloClient().mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        input: {
          email,
          password
        }
      }
    });
    if (resp.data?.login) {
      return resp.data.login;
    }
    throw new Error(`Unknown error processing login`);
  },
  register: async ({
    type,
    email,
    password,
    banAddress,
    serviceName,
    serviceWebsite
  }) => {
    const resp = await apolloClient().mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        input: {
          type,
          email,
          password,
          banAddress,
          serviceName,
          serviceWebsite
        }
      }
    });
    if (resp.data?.createUser) {
      return resp.data.createUser;
    }
    throw new Error(`Unknown error processing registration`);
  },

  // EMAIL VERIFICATION
  resendVerificationEmail: async () => true,
  verifyEmail: async (email, token) => {
    const resp = await apolloClient().query({
      query: VERIFY_EMAIL_QUERY,
      variables: {
        input: {
          email,
          token
        }
      }
    });
    if (resp.data?.verifyEmail) {
      return resp.data.verifyEmail;
    }
    throw new Error("Unknown error verifying email");
  },

  // PASSWORD RECOVERY
  sendRecoveryEmail: async (email) => {
    const resp = await apolloClient().mutate({
      mutation: RESET_PASSWORD_MUTATION,
      variables: {
        input: {
          email
        }
      }
    });
    if (resp.data) {
      return true;
    }
    throw new Error("Unknown error verifying email");
  },
  recoverPassword: async (token, newPassword) => {
    const resp = await apolloClient().mutate({
      mutation: CHANGE_PASSWORD_MUTATION,
      variables: {
        input: {
          newPassword
        }
      },
      context: {
        headers: {
          Authorization: token
        }
      }
    });
    if (resp.data?.changePassword) {
      return resp.data?.changePassword;
    }
    throw new Error("Unknown error recovering password");
  },
  generateServiceToken: async (token) => {
    const resp = await apolloClient().mutate({
      mutation: SERVICE_TOKEN_MUTATION,
      context: {
        headers: {
          Authorization: token
        }
      }
    });
    if (resp.data?.generateOrGetServiceToken) {
      return resp.data?.generateOrGetServiceToken;
    }
    throw new Error("Unknown error generating service token");
  }
};

export default Auth;
