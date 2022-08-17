let dummyUser = {
  email: "klicer@example.org",
  emailVerified: false,
  banAddress:
    "ban_3monkeycojjjto6b5ayan5juhth6ffdcgep19pg7ibpj5fd4bca7x5k3nw69",
  type: "service",
  serviceWebsite: "https://example.org",
  serviceName: "Some Service",
};

const Auth = {
  user: async () => dummyUser,
  login: async (email, password) => true,
  register: async ({
    serviceType,
    email,
    password,
    banAddress,
    serviceName,
    serviceWebsite,
  }) => true,
  changePassword: async (oldPassword, newPassword) => true,
  resendVerificationEmail: () => true,
};

export default Auth;
