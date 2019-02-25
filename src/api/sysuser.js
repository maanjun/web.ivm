import request from '@/utils/request'

export function getList(params, currentPage, pagesize) {
  return request({
    url: `/sysuser/getSysuserList?currentPage=${currentPage}&pageSize=${pagesize}`,
    method: 'post',
    data: params
  })
}

export function addUser(params) {
  return request({
    url: '/sysuser/save',
    method: 'post',
    data: params
  })
}

export function detail(param) {
  return request({
    url: '/sysuser/detail',
    method: 'get',
    params: param
  })
}

export function updateUser(params) {
  return request({
    url: '/sysuser/update',
    method: 'post',
    data: params
  })
}

export function deleteSysuser(param) {
  return request({
    url: '/sysuser/delete',
    method: 'get',
    params: param
  })
}

export function resetUserPassword(param) {
  return request({
    url: '/sysuser/resetpassword',
    method: 'get',
    params: param
  })
}
