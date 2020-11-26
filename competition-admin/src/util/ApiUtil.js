import { api } from '../common/config';

const axios = require('axios');

const AppUtil = {
  storeToken: (credentials) => {
    let local_credentials = JSON.parse(localStorage.getItem('credentials'));

    if (local_credentials?.RefreshToken && local_credentials?.AccessToken) {
      /* The refresh_token api doesn't return refresh_token. in that case we keep
       * Existing refresh token
       */
      local_credentials = {
        // eslint-disable-next-line camelcase
        ...local_credentials,
        ...credentials,
      };
      localStorage.setItem('credentials', JSON.stringify(local_credentials));
    } else {
      localStorage.setItem('credentials', JSON.stringify(credentials));
    }
  },

  nullifyToken: () => localStorage.removeItem('credentials'),

  refreshToken: () => new Promise((resolve, reject) => {
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    if (credentials?.RefreshToken) {
      axios
        .get(`${api}/refresh_token`, {
          headers: {
            'x-access-token': credentials.RefreshToken,
          },
        })
        .then((response) => {
          AppUtil.storeToken(response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject({ msg: 'token is not valid' });
    }
  }),

  getWithToken: (uri) => new Promise((resolve, reject) => {
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    if (credentials?.AccessToken && credentials?.TokenType) {
      axios
        .get(`${api}/${uri}`, {
          headers: {
            'x-access-token': credentials.AccessToken,
            'x-access-token-type': credentials.TokenType,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject({ msg: 'token is not valid' });
    }
  }),
  postWithToken: (url, data) => new Promise((resolve, reject) => {
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    if (credentials?.AccessToken && credentials?.TokenType) {
      axios
        .post(`${api}/${url}`, data, {
          headers: {
            'x-access-token': credentials.AccessToken,
            'x-access-token-type': credentials.TokenType,
          },
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    }
  }),
  putWithToken: (url, data) => new Promise((resolve, reject) => {
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    if (credentials?.AccessToken && credentials?.TokenType) {
      axios
        .put(`${api}/${url}`, data, {
          headers: {
            'x-access-token': credentials.AccessToken,
            'x-access-token-type': credentials.TokenType,
          },
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    }
  }),
  loginUser: (url, data) => new Promise((resolve, reject) => {
    axios
      .post(`${api}/${url}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        if (result && result.data) {
          AppUtil.storeToken(result.data.AuthenticationResult);
        }
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  }),

  postData: (url, data) => new Promise((resolve, reject) => {
    axios
      .post(`${api}/${url}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  }),

  getWithOutToken: (url) => new Promise((resolve, reject) => {
    axios
      .get(`${api}/${url}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  }),
};

/*
 *The interceptors execute before every response
 * If the response is ok we do nothing with it
 * but if there is error we firstly check if response status equals to 401(unauthorized)
 * If it true, we’re trying to refresh token.
 */
axios.interceptors.response.use(
  (response) => response,
  (error) => new Promise((resolve, reject) => {
    const originalRequest = error.config;
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    if (
      error.response
        && error.response.status === 401
        && error.config
        && !error.config.__isRetryRequest
        && credentials?.RefreshToken
    ) {
      originalRequest._retry = true;
      /*
         *  why We use fetch function instead of axios here?
         * if we would use axios to refresh, and refreshing will be successful
         * the app will receive token refreshing result instead of result of auth field request.
         * Therefore, it remains for us to use fetch
         */
      const response = fetch(`${api}/refresh_token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': credentials.RefreshToken,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP status ${res.status}`);
          }
          return res.json();
        })
        .then((res) => {
          AppUtil.storeToken(res.AuthenticationResult);

          // Requesting again
          originalRequest.headers['x-access-token'] = res.AuthenticationResult.AccessToken;
          originalRequest.headers['x-access-token-type'] = res.AuthenticationResult.TokenType;
          return axios(originalRequest);
        });
      resolve(response);
    } else {
      return reject(error);
    }
  }),
);
export default AppUtil;
