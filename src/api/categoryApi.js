import request from '/src/utils/request';

export const getCategories = (data = {}) => {
  return request({
    url: 'allType',
    method: 'get',
    params: data,
  });
};
