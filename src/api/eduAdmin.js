import request from '@/utils/request'

export function getData(params) {
  return request({
    url: '/evaluate/?v=0.1&method=user.login',
    method: 'post',
    params
  })
}

export function getProjectList(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Projectevaluate.projectList',
    method: 'post',
    params
  })
}