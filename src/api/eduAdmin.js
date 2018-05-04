import request from '@/utils/request'

// 登录
export function getLogin(params) {
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

export function getProjectInfo(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Projectevaluate.getProjectInfo',
    method: 'post',
    params
  })
}

export function deleteProject(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Projectevaluate.deleteProject',
    method: 'post',
    params
  })
}

export function saveProject(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Projectevaluate.saveProject',
    method: 'post',
    params
  })
}

export function statusProject(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Projectevaluate.statusProject',
    method: 'post',
    params
  })
}

export function projectLeaderList(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Projecteleader.projectLeaderList',
    method: 'post',
    params
  })
}
