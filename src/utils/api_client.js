import assign from 'lodash/assign';
import axios from 'axios';
import apiRoutes from './api_routes';
import AccessToken from '../models/access_token';

class ApiClient {
  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL;
    this.token = null;
  }

  // Requests

  async get(url, opts) {
    return await this.send(assign({ url: url, method: 'GET' }, opts));
  }
  async post(url, opts) {
    return await this.send(assign({ url: url, method: 'POST' }, opts));
  }
  async patch(url, opts) {
    return await this.send(assign({ url: url, method: 'PATCH' }, opts));
  }
  async delete(url, opts) {
    return await this.send(assign({ url: url, method: 'DELETE' }, opts));
  }

  async send(opts) {
    const request = assign({ baseUrl: this.apiURL, authenticate: false }, opts);

    if (request.authenticate === true && this.token !== null) {
      request.headers = { Authorization: `Bearer ${this.token.access_token}` };
    }

    try {
      const response = await axios(request);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.status === 401 &&
        this.token !== null
      ) {
        try {
          await this.refreshToken();
          return this.send(request);
        } catch (error) {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }

  // Authentication

  async requestToken(email, password) {
    try {
      const response = await this.post(apiRoutes.oauthToken(), {
        data: { email, password, grant_type: 'password' }
      });
      this.setToken(response.data);
    } catch (error) {
      throw error;
    }
  }

  async refreshToken() {
    try {
      const response = await this.post(apiRoutes.oauthToken(), {
        data: {
          refresh_token: this.token.refresh_token,
          grant_type: 'refresh_token'
        }
      });
      this.setToken(response.data);
    } catch (error) {
      this.nullifyToken();
      throw error;
    }
  }

  async revokeToken() {
    await this.post(apiRoutes.oauthRevoke());
    this.nullifyToken();
  }

  // Helpers

  setToken(token) {
    this.token = AccessToken.create(token);
  }

  nullifyToken() {
    this.token = null;
  }
}

export default ApiClient;
