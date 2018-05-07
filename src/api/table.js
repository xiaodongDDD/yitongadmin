import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '&v=0.1&method=Yi.index',
    method: 'get',
    params
  })
}
