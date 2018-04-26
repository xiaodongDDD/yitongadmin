import request from '@/utils/request'

export function getWorkManagementList(params) {
  return request({
    url: '/api/?v=0.1&method=Yi.worksList',
    method: 'post',
    data: params
  })
}

export function updataWorkManagementInfo(params) {
  return request({
    url: '/api/?v=0.1&method=Yi.enterCancel',
    method: 'post',
    data: params
  })
}
