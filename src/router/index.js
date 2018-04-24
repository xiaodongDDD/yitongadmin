import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
// 懒加载路由
const Login = r => require.ensure([], () => r(require('../views/login/index')), 'Login')
const Error = r => require.ensure([], () => r(require('../views/404')), 'Error')
const Index = r => require.ensure([], () => r(require('../views/atriskLearners/index')), 'Index')
const UserList = r => require.ensure([], () => r(require('../views/atriskLearners/userManagement/userList')), 'UserList')
const UserEdit = r => require.ensure([], () => r(require('../views/atriskLearners/userManagement/userEdit')), 'UserEdit')
const UserAdd = r => require.ensure([], () => r(require('../views/atriskLearners/userManagement/userAdd')), 'UserAdd')
const AccountList = r => require.ensure([], () => r(require('../views/atriskLearners/accountManagement/accountList')), 'AccountList')
const AccountAdd = r => require.ensure([], () => r(require('../views/atriskLearners/accountManagement/accountAdd')), 'AccountAdd')
const AccountEdit = r => require.ensure([], () => r(require('../views/atriskLearners/accountManagement/accountEdit')), 'AccountEdit')
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: Error, hidden: true },

  {
    path: '/',
    redirect: '/userList',
    name: 'Index',
    component: Index,
    children: [
      {
        path: 'userList',
        component: UserList
      },
      {
        path: 'userEdit',
        component: UserEdit
      },
      {
        path: 'userAdd',
        component: UserAdd
      },
      {
        path: 'accountList',
        component: AccountList
      },
      {
        path: 'accountEdit',
        component: AccountEdit
      },
      {
        path: 'accountAdd',
        component: AccountAdd
      },
      {
        path: 'powerList',
        component: _import('atriskLearners/powerManagement/powerList')
      },
      {
        path: 'powerEdit',
        component: _import('atriskLearners/powerManagement/powerEdit')
      },
      {
        path: 'itemList',
        component: _import('atriskLearners/itemManagement/item/itemList')
      },
      {
        path: 'itemEdit',
        component: _import('atriskLearners/itemManagement/item/itemEdit')
      },
      {
        path: 'itemAdd',
        component: _import('atriskLearners/itemManagement/item/itemAdd')
      },
      {
        path: 'officialList',
        component: _import('atriskLearners/itemManagement/official/officialList')
      },
      {
        path: 'officialEdit',
        component: _import('atriskLearners/itemManagement/official/officialEdit')
      },
      {
        path: 'officialAdd',
        component: _import('atriskLearners/itemManagement/official/officialAdd')
      },
      {
        path: 'transactorList',
        component: _import('atriskLearners/itemManagement/transactor/transactorList')
      },
      {
        path: 'transactorEdit',
        component: _import('atriskLearners/itemManagement/transactor/transactorEdit')
      },
      {
        path: 'objectList',
        component: _import('atriskLearners/itemManagement/object/objectList')
      },
      {
        path: 'objectAdd',
        component: _import('atriskLearners/itemManagement/object/objectAdd')
      },
      {
        path: 'templateList',
        component: _import('atriskLearners/templateManagement/templateList')
      },
      {
        path: 'templateEdit',
        component: _import('atriskLearners/templateManagement/templateEdit')
      },
      {
        path: 'templateAdd',
        component: _import('atriskLearners/templateManagement/templateAdd')
      },
      {
        path: 'gainList',
        component: _import('atriskLearners/gainManagement/gainList')
      },
      {
        path: 'gainSchoolList',
        component: _import('atriskLearners/gainManagement/gainSchoolList')
      },
      {
        path: 'gainDetails',
        component: _import('atriskLearners/gainManagement/gainDetails')
      },
      {
        path: 'logList',
        component: _import('atriskLearners/operationLog/logList')
      }]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

