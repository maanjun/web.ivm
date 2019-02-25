import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    params: {
      'username': username,
      'password': password
    }
    // },
    // data: {
    //   'username': username,
    //   'password': password
    // }
  })
}

export function getInfo(id) {
  return request({
    url: '/sysuser/detail',
    method: 'get',
    params: { 'id': id }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
