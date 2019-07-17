const PLATFORM_URL = 'http://localhost:5000/api';
const createError = (res, payload) => {
  if (res.status === 401) {
    return new Error({ ...payload, status: res.status });
  }

  if (payload) {
    const props = {
      ...payload,
      status: res.status
    };

    return new Error(props);
  }

  return new Error(res);
};

// Temporary function to map endpoint
function toEndpoint(path) {
  return `${PLATFORM_URL}${path}`;
}

export default {
  async getToken({ email, password }) {
    const endpoint = `${PLATFORM_URL}/oauth/token`;
    const data = {
      username: email,
      password,
      client_id: 'jootopuncture web app',
      client_secret: 'jootopuncture web app',
      grant_type: 'password'
    };
    const request = {
      method: 'POST',
      body: encodeFormUrl(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    };

    const res = await fetch(endpoint, request);
    const body = await res.text();
    let auth;
    try {
      auth = JSON.parse(body);
    } catch (err) {
      throw new Error({
        message: body,
        status: res.status,
        endpoint
      });
    }

    if (res.status === 200) {
      return auth;
    } else if (auth) {
      throw createError(res, auth);
    }

    throw new Error(res);
  },

  async refreshShortLivedToken(viewer) {
    const { email, refreshToken } = viewer;
    const endpoint = `${PLATFORM_URL}/oauth/token`;
    const params = {
      username: email,
      refresh_token: refreshToken,
      client_id: 'jootopuncture web app',
      client_secret: 'jootopuncture web app',
      grant_type: 'refresh_token'
    };

    const request = {
      method: 'POST',
      body: encodeFormUrl(params),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    };

    const data = await fetch(endpoint, request).then(response =>
      response.json()
    );

    logger.debug({ endpoint, params, data }, '[PLATFORM REFRESH]');

    return data;
  },

  async revokeToken(viewer) {
    const endpoint = `${PLATFORM_URL}/oauth/logout`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${viewer.accessToken}`,
      client_id: 'jootopuncture web app'
    };
    const request = {
      method: 'POST',
      headers
    };

    return fetch(endpoint, request).then(res => res.json());
  },

  async requestAnimationFrame({
    method,
    path,
    viewer,
    params,
    canHaveEmptyBody = false
  }) {
    const endpoint = toEndpoint(path);

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      client_id: 'jootopuncture web app',
      Authorization: `Bearer ${
        viewer && viewer.accessToken ? viewer.accessToken : ''
      }`
    };

    const request = {
      method,
      headers,
      body: params ? JSON.stringify(params) : undefined,
      credentials: 'same-origin'
    };
    const response = await fetch(endpoint, request);
    const body = await response.text();

    if (response.status >= 200 && response.status < 300) {
      try {
        const data = JSON.parse(body);

        // logger.info({ method, endpoint, data }, '[PLATFORM]');
        return data;
      } catch (ex) {
        if (!canHaveEmptyBody) {
          //   logger.debug(
          //     { method, endpoint, params, ex },
          //     '[PLATFORM JSON PARSE]'
          //   );
          throw new Error({
            message: body,
            status: response.status,
            endpoint
          });
        }
      }
    } else {
      let error;
      try {
        error = JSON.parse(body);

        // logger.error({ method, endpoint, params, error }, '[PLATFORM]');
        error = createError(response, { ...error, endpoint });
      } catch (ex) {
        error = new Error({
          message: body,
          status: response.status,
          endpoint
        });
      } finally {
        throw error;
      }
    }
  },

  async requestWithRefresh({
    method,
    path,
    viewer,
    params,
    canHaveEmptyBody = false
  }) {
    if (!viewer || !viewer.accessToken) {
      console.log('[PLATFORM] 401', 'Access Token is missing', viewer);
      throw new Error({ status: 401, endpoint: toEndpoint(path) });
    } else {
      try {
        const data = await this.request({
          method,
          path,
          viewer,
          params,
          canHaveEmptyBody
        });
        return data;
      } catch (e) {
        // Try again with refreshed token
        if (
          e instanceof UnauthorizedError &&
          viewer.user &&
          viewer.accessToken &&
          viewer.refreshToken
        ) {
          const newViewer = await this.refreshShortLivedToken(viewer);

          // Update accessToken in session
          viewer.accessToken = newViewer.access_token;
          viewer.refreshToken = newViewer.refresh_token;

          viewer.save(error => {
            if (error) {
              logger.error(error, '[SESSION]');

              throw new Error(
                'There was something wrong while persisting session.'
              );
            } else {
              //   logger.info(viewer, '[SESSION persisted new session]');
            }
          });

          // Try again with refreshed access token
          const data = await this.request({
            method,
            path,
            viewer,
            params
          });

          return data;
        } else {
          // Didn't work. Forward error
          console.log('[PLATFORM] What error is this?', e);
          throw e;
        }
      }
    }
  },

  // TODO: add multipart

  get(path, viewer, params) {
    return this.requestWithRefresh({
      method: 'GET',
      path,
      viewer,
      params
    });
  },

  post(path, viewer, params) {
    return this.requestWithRefresh({
      method: 'POST',
      path,
      viewer,
      params
    });
  },

  put(path, viewer, params) {
    return this.requestWithRefresh({
      method: 'PUT',
      path,
      viewer,
      params
    });
  },

  delete(path, viewer, params) {
    return this.requestWithRefresh({
      method: 'DELETE',
      path,
      viewer,
      params,
      canHaveEmptyBody: true
    });
  }
};
