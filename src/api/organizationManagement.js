import request from '@/utils/request'

// 登录菜单列表
export function menuAuthList(params) {
  return request({
    url: '&v=0.1&method=Yi.menuAuthList',
    method: 'post',
    data: params
  })
}
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

// 菜单详情接口
export function menuDetail(params) {
  return request({
    url: '&v=0.1&method=Yi.menuDetail',
    method: 'post',
    data: params
  })
}

// 新增/编辑菜单数据权限
export function menuDataAuth(params) {
  return request({
    url: '&v=0.1&method=Yi.menuDataAuth',
    method: 'post',
    data: params
  })
}

// 新增/编辑菜单功能权限
export function menuFunctionAuth(params) {
  return request({
    url: '&v=0.1&method=Yi.menuFunctionAuth',
    method: 'post',
    data: params
  })
}

// 删除菜单数据
export function delMenuData(params) {
  return request({
    url: '&v=0.1&method=Yi.delMenuData',
    method: 'post',
    data: params
  })
}

// 删除菜单功能模块
export function delMenuFunction(params) {
  return request({
    url: '&v=0.1&method=Yi.delMenuFunction',
    method: 'post',
    data: params
  })
}

// 角色管理 列表
export function roleList(params) {
  return request({
    url: '&v=0.1&method=Yi.RoleList',
    method: 'post',
    data: params
  })
}

// 角色管理 删除
export function delRole(params) {
  return request({
    url: '&v=0.1&method=Yi.delRole',
    method: 'post',
    data: params
  })
}

// 角色管理 新增编辑
export function addEditRole(params) {
  return request({
    url: '&v=0.1&method=Yi.addEditRole',
    method: 'post',
    data: params
  })
}

// 员工的管理接口 冻结、启用账号
export function companyList(params) {
  return request({
    url: '&v=0.1&method=Yi.companyList',
    method: 'post',
    data: params
  })
}

// 员工的管理接口 冻结、启用账号
export function freezeStart(params) {
  return request({
    url: '&v=0.1&method=Yi.freezeStart',
    method: 'post',
    data: params
  })
}

// 员工的管理接口 	添加编辑部门/公司
export function addCompanyDepartment(params) {
  return request({
    url: '&v=0.1&method=Yi.addCompanyDepartment',
    method: 'post',
    data: params
  })
}

// 员工的管理接口 	删除部门/公司
export function delCompanyDepartment(params) {
  return request({
    url: '&v=0.1&method=Yi.delCompanyDepartment',
    method: 'post',
    data: params
  })
}

// 员工的管理接口 	删除部门中职务职级
export function delPosition(params) {
  return request({
    url: '&v=0.1&method=Yi.delPosition',
    method: 'post',
    data: params
  })
}

// 员工的管理接口 	上下移动部门公司
export function moveCompanyDepartment(params) {
  return request({
    url: '&v=0.1&method=Yi.moveCompanyDepartment',
    method: 'post',
    data: params
  })
}

// 员工的管理接口 	批量添加员工
export function batchAddEditUser(params) {
  return request({
    url: '&v=0.1&method=Yi.batchAddEditUser',
    method: 'post',
    data: params
  })
}

// 员工的管理接口 	添加/编辑员工
export function addEditUser(params) {
  return request({
    url: '&v=0.1&method=Yi.addEditUser',
    method: 'post',
    data: params
  })
}

// 员工的管理接口 	批量导出文件
export function user_export(params) {
  return request({
    url: '&v=0.1&method=Yi.user_export',
    method: 'post',
    data: params
  })
}

// 员工的管理接口 	公司/部门详情
export function companyDepartmentDetail(params) {
  return request({
    url: '&v=0.1&method=Yi.companyDepartmentDetail',
    method: 'post',
    data: params
  })
}

// 员工的管理接口 	新增员工（公司/部门/职务/职级列表）
export function companyDepartmentList(params) {
  return request({
    url: '&v=0.1&method=Yi.companyDepartmentList',
    method: 'post',
    data: params
  })
}

// 员工的管理接口 	下载模板
export function doload_tmp(params) {
  return request({
    url: '&v=0.1&method=Yi.doload_tmp',
    method: 'post',
    data: params
  })
}
