import request from '/src/utils/request';

export function getHouseOfType(data = {}) {
  return request({
    url: 'all-house-of-type',
    method: 'get',
    params: data,
  });
}

export function searchHouse(data = {}) {
  return request({
    url: 'search-house',
    method: 'post',
    data: { data },
  });
}

export function getHouseById(data = {}) {
  return request({
    url: 'get-house-by-id',
    method: 'get',
    params: data,
  });
}

export function getAllConvenient() {
  return request({
    url: 'allconvenient',
    method: 'get',
  });
}

export function getAllTypeConvenient() {
  return request({
    url: 'all-type-convenients',
    method: 'get',
  });
}

export function getAllHouseType() {
  return request({
    url: 'alltype',
    method: 'get',
  });
}


export function getAllProvince() {
  return request({
    url: 'all-province',
    method: 'get',
  });
}

export function getAllCreateHouse() {
  return request({
    url: 'get-all-create-house',
    method: 'get',
  });
}

export function getAllUpdateHouse() {
  return request({
    url: 'get-all-update-house',
    method: 'get',
  });
}

export function getAllDistrictOfProvince(data = {}) {
  return request({
    url: 'all-district-of-province',
    method: 'get',
    params: data,
  });
}

export function createContract(data = {}) {
  return request({
    url: 'create-contract',
    method: 'post',
    data: { data },
  });
}

export function getAllContractOfCustomer(data = {}) {
  return request({
    url: 'get-all-contract-of-customer',
    method: 'get',
    params: data,
  });
}

export function createReview(data = {}) {
  return request({
    url: 'create-review',
    method: 'post',
    data: { data },
  });
}

export function endContract(data = {}) {
  return request({
    url: 'end-contract',
    method: 'get',
    params: data,
  });
}

export function refundContract(data = {}) {
  return request({
    url: 'refund-contract',
    method: 'post',
    data: data,
  });
}

export function confirmCreateHouse(data = {}) {
  return request({
    url: 'confirm-create-house',
    method: 'post',
    data: data,
  });
}

export function rejectCreateHouse(data = {}) {
  return request({
    url: 'reject-create-house',
    method: 'get',
    params: data,
  });
}

export function confirmUpdateHouse(data = {}) {
  return request({
    url: 'confirm-update-house',
    method: 'post',
    params: data,
  });
}

export function rejectUpdateHouse(data = {}) {
  return request({
    url: 'reject-update-house',
    method: 'get',
    params: data,
  });
}

export function cancelContract(data = {}) {
  return request({
    url: 'cancel-contract',
    method: 'post',
    data: data,
  });
}

export function getAllContract() {
  return request({
    url: 'all-contract',
    method: 'get',
  });
}

export function hoanTatThanhToan(data = {}) {
  return request({
    url: 'full-payment-contract',
    method: 'get',
    params: data,
  });
}

export function createHouse(data = {}) {
  return request({
    url: 'create-house',
    method: 'post',
    data: data,
  });
}
