import request from '/src/utils/request';

export const login = (data = {}) => {
  return request({
    url: 'login',
    method: 'post',
    data,
  });
};

export const signUp = (data = {}) => {
  return request({
    url: 'register',
    method: 'post',
    data,
  });
};

export const generateToken = (data = {}) => {
  return request({
    url: 'auth-token',
    method: 'post',
    data,
  });
};

export const getResetPwdToken = (data = {}) => {
  return request({
    url: 'reset-password',
    method: 'post',
    data,
  });
};

export const updatePassword = (params = {}, data = {}) => {
  return request({
    url: 'update-password',
    method: 'post',
    params,
    data,
  });
};

export const updateProfile = (data = {}) => {
  return request({
    url: 'update-profile',
    method: 'post',
    data: { data },
  });
};

export const logOut = () => {
  return request({
    url: 'logout',
    method: 'post',
  });
};
