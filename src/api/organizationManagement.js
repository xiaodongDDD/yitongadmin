import request from '@/utils/request'
// 用户详情
export function userDetail(params) {
  return request({
    url: '&v=0.1&method=Yi.userDetail',
    method: 'post',
    data: params
  })
}
// 菜单列表
export function menuList(params) {
  return request({
    url: '&v=0.1&method=Yi.menuList',
    method: 'post',
    data: params
  })
}
// 上下移动菜单列表
export function moveMenu(params) {
  return request({
    url: '&v=0.1&method=Yi.moveMenu',
    method: 'post',
    data: params
  })
}
// 删除菜单
export function delMenu(params) {
  return request({
    url: '&v=0.1&method=Yi.delMenu',
    method: 'post',
    data: params
  })
}
// 添加和编辑菜单
export function menu(params) {
  return request({
    url: '&v=0.1&method=Yi.menu',
    method: 'post',
    data: params
  })
}
// 登录菜单列表
export function menuAuthList(params) {
  return request({
    url: '&v=0.1&method=Yi.menuAuthList',
    method: 'post',
    data: params
  })
}
