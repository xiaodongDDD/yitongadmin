import request from '@/utils/request'
import qs from 'qs'

// 登录
export function getLogin(datas) {
  return request({
    url: '/evaluate/?v=0.1&method=user.login',
    method: 'post',
    data: qs.stringify(datas)
  })
}

// 项目列表
export function getProjectList(datas) {
  return request({
    url: '/evaluate/?v=0.1&method=Projectevaluate.projectList',
    method: 'post',
    data: qs.stringify(datas)
  })
}

// 获取项目信息
export function getProjectInfo(datas) {
  return request({
    url: '/evaluate/?v=0.1&method=Projectevaluate.getProjectInfo',
    method: 'post',
    data: qs.stringify(datas)
  })
}

// 删除项目
export function deleteProject(datas) {
  return request({
    url: '/evaluate/?v=0.1&method=Projectevaluate.deleteProject',
    method: 'post',
    data: qs.stringify(datas)
  })
}

// 保存项目
export function saveProject(datas) {
  return request({
    url: '/evaluate/?v=0.1&method=Projectevaluate.saveProject',
    method: 'post',
    data: qs.stringify(datas)
  })
}

// 状态管理
export function statusProject(datas) {
  return request({
    url: '/evaluate/?v=0.1&method=Projectevaluate.statusProject',
    method: 'post',
    data: qs.stringify(datas)
  })
}

// 负责人列表
export function projectLeaderList(datas) {
  return request({
    url: '/evaluate/?v=0.1&method=Projecteleader.projectLeaderList',
    method: 'post',
    data: qs.stringify(datas)
  })
}

// 保存新增负责人
export function saveLeader(datas) {
  return request({
    url: '/evaluate/?v=0.1&method=Projecteleader.saveLeader',
    method: 'post',
    data: qs.stringify(datas)
  })
}

// 删除负责人
export function deleteLeader(datas) {
  return request({
    url: '/evaluate/?v=0.1&method=Projecteleader.deleteLeader',
    method: 'post',
    data: qs.stringify(datas)
  })
}

// 显示切换学校列表
export function showSchools(datas) {
  return request({
    url: '/evaluate/?v=0.1&method=Projectbase.showSchools',
    method: 'post',
    data: qs.stringify(datas)
  })
}

// 账户列表
export function accountList(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Usermanage.getUserList',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 删除账户
export function accountDelete(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Usermanage.userDel',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 获取账户
export function accountDetail(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Usermanage.teacherDetail',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 账户状态
export function accountSet(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Usermanage.accountSet',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 账户修改
export function accountEdit(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Usermanage.accountSet',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 添加模板
export function addTemplate(params) {
  return request({
    url: '/evaluate/?v=0.1&method=Templatesmanage.createTemplate',
    method: 'post',
    data: qs.stringify(params)
  })
}
