import request from '@/utils/request'

export function getData(params) {
  return request({
    url: '/api/?v=0.1&method=user.login',
    method: 'post',
    params
  })
}
