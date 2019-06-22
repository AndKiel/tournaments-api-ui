import assign from "lodash/assign";
import axios from "axios";
import { observable } from "mobx";
import apiRoutes from "./api_routes";
import AccessToken from "../models/access_token";

import i18n from "../i18n";
import cookie from "js-cookie";
import qs from "qs";

class ApiClient {
  @observable token = null;

  constructor() {
    this.client = axios.create({
      paramsSerializer: qs.stringify
    });
    const cookieToken = cookie.getJSON("token");
    if (cookieToken) {
      this.token = AccessToken.create(cookieToken);
    }
  }

  // Requests

  async get(url, opts) {
    return await this.send(assign({ url: url, method: "GET" }, opts));
  }
  async post(url, opts) {
    return await this.send(assign({ url: url, method: "POST" }, opts));
  }
  async patch(url, opts) {
    return await this.send(assign({ url: url, method: "PATCH" }, opts));
  }
  async delete(url, opts) {
    return await this.send(assign({ url: url, method: "DELETE" }, opts));
  }

  async send(opts) {
    const request = assign(
      {
        authenticate: false,
        baseURL: `${process.env.REACT_APP_API_URL}/${i18n.language || "en"}`
      },
      opts
    );

    if (request.authenticate === true && this.hasToken()) {
      request.headers = { Authorization: `Bearer ${this.token.access_token}` };
    }

    try {
      return await this.client.request(request);
    } catch (error) {
      if (error.response && error.response.status === 401 && this.hasToken()) {
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
        data: { email, password, grant_type: "password" }
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
          grant_type: "refresh_token"
        }
      });
      this.setToken(response.data);
    } catch (error) {
      this.nullifyToken();
      throw error;
    }
  }

  async revokeToken() {
    await this.post(apiRoutes.oauthRevoke(), { authenticate: true });
    this.nullifyToken();
  }

  // Helpers

  setToken(token) {
    cookie.set("token", token, { expires: 365 });
    this.token = AccessToken.create(token);
  }

  hasToken() {
    return this.token !== null;
  }

  nullifyToken() {
    cookie.remove("token");
    this.token = null;
  }
}

export default ApiClient;
