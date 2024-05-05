export default class AuthApi {
  constructor(client) {
    this.client = client;
  }

  login = ({ email, password }) => {
    return this.client.post(`/api/auth/login`, {
      email,
      password,
    });
  };

  getMe = () => {
    return this.client.post(`/api/auth/me`);
  };
}
