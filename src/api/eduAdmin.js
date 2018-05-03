import request from '@/utils/request'

// 登录
export function getLogin(params) {
  return request({
    url: '/evaluate/?v=0.1&method=user.login',
    method: 'post',
    params
  })
}

// 新增模板
export function addTemplate(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Templatesmanage.createTemplate',
    method: 'post',
    params
  })
}

