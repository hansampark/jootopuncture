// const base = NODE_ENV === 'test' ? 'http://localhost' : '';
// const API_URL = `${base}${BASE_URL || ''}/api`;
// const GRAPHQL_URL = `${base}${BASE_URL || ''}/graphql`;
import fetch from 'isomorphic-fetch';
import decode from 'jwt-decode';
import { ApiError } from './errors';
const API_URL = 'http://localhost:5000/api';

const handleHTTPError = async res => {
  if (res.status < 200 || res.status >= 300) {
    let data;
    try {
      data = await res.json();
    } catch (err) {
      const text = await res.text();

      throw new ApiError({
        ...err,
        responseBody: text
      });
    }

    if (res.status === 401) {
      return data;
    }

    throw new ApiError(data);
  }

  return res;
};

/**
 * API client for browser
 */

export default {
  async login({ email, password }) {
    const req = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      }),
      credentials: 'same-origin'
    };
    const response = await fetch(`${API_URL}/login`, req);
    console.log('[login response]', response);

    const data = await response.json();

    if (response.status < 200 || response.status >= 300) {
      return Promise.reject(new ApiError(data));
    } else {
      this.setToken(data.token);
      return data;
    }
  },

  async loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  },

  async isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  },

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  },

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  },

  getConfirm() {
    // Using jwt-decode npm package to decode the token
    let answer = decode(this.getToken());
    return answer;
  },

  async logout() {
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`
      },
      credentials: 'same-origin'
    };

    const response = await fetch(`${API_URL}/logout`, req).then(
      handleHTTPError
    );

    const { data, session } = await response.json();

    localStorage.removeItem('id_token');
    return data;
  },

  verify({ password, token }) {
    return this.post(
      '/users/verify',
      {
        token,
        password
      },
      false
    );
  },

  //   TODO: add multipart request

  async request({ method, endpoint, params }) {
    const token = this.getToken();
    const req = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bear ${token}`
      },
      credentials: 'same-origin'
    };

    if (params) {
      req.body = JSON.stringify(params);
    }

    const response = await fetch(`${API_URL}${endpoint}`, req).then(
      handleHTTPError
    );

    const data = await response.json();

    return data;
  },

  get(endpoint, params) {
    return this.request({
      method: 'GET',
      endpoint,
      params
    });
  },

  post(endpoint, params) {
    return this.request({
      method: 'POST',
      endpoint,
      params
    });
  },

  put(endpoint, params) {
    return this.request({
      method: 'PUT',
      endpoint,
      params
    });
  },

  delete(endpoint, params) {
    return this.request({
      method: 'DELETE',
      endpoint,
      params
    });
  }
};
