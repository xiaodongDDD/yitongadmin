import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
// 这边做个特殊说明   这个路由不能乱改的 否则权限出问题  添加的路由往下面接
Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    name: 'home',
    meta: { title: '首页', icon: 'table' },
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      meta: { title: '首页', icon: 'table' },
      hidden: false
    }]
  },
  {
    path: '/organizationManagement',
    component: Layout,
    redirect: '/organizationManagement/employeeMangement',
    name: 'framework',
    meta: { title: '组织架构管理', icon: 'table' },
    hidden: true,
    alwaysShow: true,
    children: [
      {
        path: 'employeeMangement',
        name: 'work',
        component: _import('organizationManagement/organizationManagement/employeeMangement'),
        meta: { title: '员工管理', icon: 'table' },
        hidden: true
      },
      {
        path: 'employeeMangementsp',
        name: '员工管理sp',
        component: _import('organizationManagement/organizationManagement/employeeUpdate'),
        meta: { title: '员工管理', icon: 'table' },
        hidden: true
      },
      {
        path: 'roleMangement',
        name: 'role',
        component: _import('organizationManagement/organizationManagement/roleMangement'),
        meta: { title: '角色管理', icon: 'table' },
        hidden: true
      },
      {
        path: 'roleUpdatesp',
        name: '角色管理sp',
        component: _import('organizationManagement/organizationManagement/roleUpdate'),
        meta: { title: '角色管理', icon: 'table' },
        hidden: true
      },
      {
        path: 'authorityMangement',
        name: 'auth',
        component: _import('organizationManagement/organizationManagement/authorityMangement'),
        meta: { title: '权限管理', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/organizationManagementInfo',
    component: Layout,
    redirect: '/organizationManagementInfo/myInfo',
    name: 'center',
    meta: { title: '个人中心', icon: 'table' },
    hidden: true,
    alwaysShow: true,
    children: [
      {
        path: 'myInfo',
        name: 'myself',
        component: _import('organizationManagement/personalCenter/myInfo'),
        meta: { title: '我的资料', icon: 'table' },
        hidden: true
      },
      {
        path: 'myMessage',
        name: 'myMessage',
        component: _import('organizationManagement/personalCenter/myInfo'),
        meta: { title: '我的消息', icon: 'table' },
        hidden: false
      },
      {
        path: 'updatePassword',
        name: '修改密码',
        component: _import('organizationManagement/personalCenter/updatePassword'),
        meta: { title: '修改密码', icon: 'table' },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/feedbackQuestion',
    component: Layout,
    redirect: '/feedbackQuestion/schoolH5',
    name: '反馈问题',
    meta: { title: '反馈问题', icon: 'table' },
    hidden: true,
    children: [
      {
        path: 'schoolH5',
        name: '整校h5',
        component: _import('feedbackQuestion/schoolH5'),
        meta: { title: '整校h5', icon: 'table' }
      },
      {
        path: 'schoolPC',
        name: '整校pc',
        component: _import('form/index'),
        meta: { title: '整校pc', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/eventManagement',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'worksManagement',
        name: 'worksManagement',
        component: _import('eventManagement/worksManagement'),
        meta: { title: '作品管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '晓黑板', icon: 'table' },
    alwaysShow: true,
    children: [
      {
        path: 'table',
        name: 'Table1',
        component: _import('table/index'),
        meta: { title: '用户管理SP', icon: 'table' },
        children: [
          {
            path: 'table',
            name: 'Table2',
            component: _import('table/index'),
            meta: { title: '用户管理ddd', icon: 'table' }
          },
          {
            path: 'table',
            name: 'Table3',
            component: _import('table/index'),
            meta: { title: '用户申请', icon: 'table' }
          }
          // {
          //   path: 'table',
          //   name: 'Table4',
          //   component: _import('table/index'),
          //   meta: { title: '分派配置', icon: 'table' }
          // }
        ]
      },
      {
        path: 'table',
        name: 'Table5',
        component: _import('table/index'),
        meta: { title: '列表', icon: 'table' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

