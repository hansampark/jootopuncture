// const base = NODE_ENV === 'test' ? 'http://localhost' : '';
// const API_URL = `${base}${BASE_URL || ''}/api`;
// const GRAPHQL_URL = `${base}${BASE_URL || ''}/graphql`;
import fetch from 'isomorphic-fetch';
import decode from 'jwt-decode';
import { dispatch } from '../store';
import { sessionExpired } from '../actions';
import { ApiError } from './errors';

const API_URL = 'https://jootopuncture.herokuapp.com/api';
const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api'
    : API_URL;

const handleHTTPError = async res => {
  if (res.status < 200 || res.status >= 300) {
    let data;
    try {
      data = await res.json();
    } catch (err) {
      // API returned invalid JSON error object.

      const text = await res.text();

      throw new ApiError({
        ...err,
        responseBody: text
      });
    }

    // 401 is handled. No need to throw.
    if (res.status === 401) {
      dispatch(sessionExpired());
      throw new ApiError(data);
    }

    // API returned JSON error object.
    throw new ApiError(data);
  }

  // It's all good. proceed.
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
    const response = await fetch(`${URL}/login`, req);

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

  setToken(token) {
    // Saves user token to localStorage
    localStorage.setItem('token', token);
  },

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('token');
  },

  // TODO: Use refresh jwt token for every call if token is valid
  setRefreshToken(refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  },

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
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

    const response = await fetch(`${URL}/logout`, req).then(handleHTTPError);

    const data = await response.json();

    localStorage.removeItem('token');
    return data;
  },

  // TODO: Refresh jwt token
  // async refreshToken({ user, refreshToken }) {
  //   const req = {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${this.getToken()}`
  //     },
  //     body: JSON.stringify({
  //       user,
  //       refreshToken
  //     }),
  //     credentials: 'same-origin'
  //   };

  //   const response = await fetch(`${URL}/refreshToken`, req);

  //   const data = await response.json();
  //   // console.log('[data]', data);
  // },

  //   TODO: add multipart request

  async request({ method, endpoint, params }) {
    const token = this.getToken();
    // console.log('[request token]', token);
    const req = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bear ${token}`
      },
      credentials: 'same-origin'
    };

    if (params) {
      console.log('[params]', params, JSON.stringify(params));
      req.body = JSON.stringify(params);
    }

    const response = await fetch(`${URL}${endpoint}`, req).then(
      handleHTTPError
    );
    console.log('[response]', response);

    const data = await response.json();

    return data;
  },

  // TODO:
  // async requestWithRefresh({ method, endpoint, params }) {
  //   const token = this.getToken();
  //   const refreshToken = this.getRefreshToken();

  //   if (!token) {
  //     console.log('[no token]');
  //     throw new Error({ status: 401 });
  //   } else {
  //     try {
  //       console.log('[success token]', token);
  //       const data = await this.request({
  //         method,
  //         endpoint,
  //         params
  //       });

  //       return data;
  //     } catch (err) {
  //       console.log('[refresh err]', err);
  //       if (err && token && refreshToken) {
  //         // const refresh = await refreshToken({ user, refreshToken });
  //         // console.log('[refresh]', refresh);

  //         const data = await this.request({
  //           method,
  //           endpoint,
  //           params
  //         });

  //         return data;
  //       } else {
  //         // Didn't work. Forward error
  //         console.log('[PLATFORM] What error is this?', err);
  //         throw err;
  //       }
  //     }
  //   }
  // },

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
