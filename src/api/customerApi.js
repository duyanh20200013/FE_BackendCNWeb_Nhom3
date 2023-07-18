import request from './../utils/request';

export const createFavoriteHouse = (data = {}) => {
  return request({
    url: 'create-favourite-house',
    method: 'post',
    data: { data },
  });
};

export const getAllFavoriteList = () => {
  return request({
    url: 'get-all-name-favouriteList',
    method: 'get',
  });
};

export const getAllHouseOfFavList = (data = {}) => {
  return request({
    url: 'get-all-house-of-one-favourite-list',
    method: 'post',
    data,
  });
};

export const getAllFavoriteHouse = () => {
  return request({
    url: 'get-all-favourite-house-id',
    method: 'get',
  });
};

export const deleteFavoriteHouse = (data = {}) => {
  return request({
    url: 'delete-favourite-house-by-id',
    method: 'post',
    data,
  });
};

export const deleteFavoriteList = (data = {}) => {
  return request({
    url: 'delete-favourite-house-by-name',
    method: 'post',
    data,
  });
};

export const updateFavoriteListName = (data = {}) => {
  return request({
    url: 'update-name-favourite-list',
    method: 'post',
    data,
  });
};

export const createContact = (data = {}) => {
  return request({
    url: 'create-contract',
    method: 'post',
    data: { data },
  });
};
export const getAllContractOfCus = (data = {}) => {
  return request({
    url: 'get-all-contract-of-customer',
    method: 'get',
    params: data,
  });
};
export const endContract = (data = {}) => {
  return request({
    url: 'end-contract',
    method: 'get',
    params: data,
  });
};
