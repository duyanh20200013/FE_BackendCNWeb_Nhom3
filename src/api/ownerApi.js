import request from '/src/utils/request';

export const getAllHouseOfOwner = (data = {}) => {
  return request({
    url: 'get-all-house-of-owner',
    method: 'get',
    params: data,
  });
};

export const createHouse = (data = {}) => {
  return request({
    url: 'create-house',
    method: 'post',
    data: { data: data },
  });
};

export const updateHouse = (params = {}, data = {}) => {
  return request({
    url: 'update-house',
    method: 'post',
    params: params,
    data: {
      data: data,
    },
  });
};

export const createVerifyInfo = (data = {}) => {
  return request({
    url: 'create-verify-infomation',
    method: 'post',
    data: {
      data: data,
    },
  });
};

export const getVerifyInfo = (data = {}) => {
  return request({
    url: 'get-verify-infomation',
    method: 'get',
    params: data,
  });
};

export const updateVerifyInfo = (data = {}) => {
  return request({
    url: 'update-verify-infomation',
    method: 'post',
    data: {
      data: data,
    },
  });
};

export const getAllContractOfHouse = (data = {}) => {
  return request({
    url: 'get-all-contract-of-house',
    method: 'get',
    params: data,
  });
};

export const getAllContractOfOwner = (data = {}) => {
  return request({
    url: 'get-all-contract-of-owner',
    method: 'get',
    params: data,
  });
};
