import request from '@/utils/request'

export function getList(params, currentPage, pagesize) {
  return request({
    url: `/wsdlog/getWsdlogList?currentPage=${currentPage}&pageSize=${pagesize}`,
    method: 'post',
    data: params
  })
}

export function getDetail(params) {
  return request({
    url: '/wsdlog/detail',
    method: 'get',
    params
  })
}
