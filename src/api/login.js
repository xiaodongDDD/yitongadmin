import request from '@/utils/request'

export function login(params) {
  return request({
    url: '&v=0.1&method=Yi.backgroundLogin',
    method: 'post',
    data: params
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
