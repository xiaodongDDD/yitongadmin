import request from '@/utils/request'

// 获取链接参数
export function getQueryString(params) {
  var currentUrl = window.location.hash
  var arr = currentUrl.split('?')
  if (arr.length > 1) {
    arr = arr[1].split('&')
    for (var i = 0; i < arr.length; i++) {
      var tem = arr[i].split('=')
      if (tem[0] === params) {
        return tem[1]
      }
    }
    return null
  } else {
    return null
  }
}

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

// 账户列表
export function accountList(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Usermanage.getUserList',
    method: 'post',
    params
  })
}

// 删除账户
export function accountDelete(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Usermanage.userDel',
    method: 'post',
    params
  })
}

// 获取账户
export function accountDetail(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Usermanage.teacherDetail',
    method: 'post',
    params
  })
}

// 账户状态
export function accountSet(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Usermanage.accountSet',
    method: 'post',
    params
  })
}

// 账户修改
export function accountEdit(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Usermanage.accountSet',
    method: 'post',
    params
  })
}
