import axios from 'axios';
import Global from '@/general/Global';
import PreferenceKeys from '@/general/constants/PreferenceKeys';

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_HOST + import.meta.env.VITE_APP_BASE_API,
  headers: {
    'content-type': 'application/json',
  },
});

// Request interceptor
request.interceptors.request.use(
  config => {
    const accessToken = Global.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    // For debug
    console.log('Error: ', error);
    return Promise.reject(error);
  },
);

// Response interceptor
request.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (!error.response) {
      alert('Không thể kết nối đến server');
    }

    console.log(error.response);

    // Debugger
    const originalConfig = error.config;
    if (originalConfig.url == '/auth-token' && error.response) {
      if (originalConfig._retry) {
        return Promise.reject();
      }
      if (error.response.status === 400) {
        originalConfig._retry = true;
        Global.accessToken = null;
        Global.refreshToken = null;
        localStorage.removeItem(PreferenceKeys.accessToken);
        localStorage.removeItem(PreferenceKeys.refreshToken);
        localStorage.removeItem(PreferenceKeys.isLogin);
        localStorage.removeItem(PreferenceKeys.user);
        window.location.reload();
        return Promise.reject();
      }
    }

    if (
      originalConfig.url !== '/auth-token' &&
      originalConfig.url !== '/login' &&
      error.response
    ) {
      // Access token was expired
      if (
        error.response.status === 403 &&
        !originalConfig._retry &&
        Global.refreshToken &&
        Global.refreshToken.length > 0 &&
        Global.accessToken &&
        Global.accessToken.length > 0
      ) {
        originalConfig._retry = true;

        try {
          const res = await request.post('/auth-token', {
            refreshToken: Global.refreshToken,
          });
          console.log(Global.refreshToken);

          const { access_token: accessToken, errCode } = res.data;
          if (accessToken && errCode == 0) {
            console.log(123);
            Global.accessToken = accessToken;
            localStorage.setItem(PreferenceKeys.accessToken, accessToken);
            localStorage.setItem(PreferenceKeys.isLogin, true);
            originalConfig.headers.Authorization = `Bearer ${accessToken}`;
            console.log('New access token: ', accessToken);
            return request(originalConfig);
          } else {
            originalConfig._retry = true;
            Global.accessToken = null;
            Global.refreshToken = null;
            localStorage.removeItem(PreferenceKeys.accessToken);
            localStorage.removeItem(PreferenceKeys.refreshToken);
            localStorage.removeItem(PreferenceKeys.isLogin);
            localStorage.removeItem(PreferenceKeys.user);
            window.location.reload();
            return Promise.reject();
          }
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(error);
  },
);

export const get = async (path, options = {}) => {
  const response = await request.get(path, options);

  return response.data;
};

export default request;
