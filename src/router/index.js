import Vue from 'vue'
import Router from 'vue-router'
// const _import = require('./_import_' + process.env.NODE_ENV)
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
const PowerList = r => require.ensure([], () => r(require('../views/atriskLearners/powerManagement/powerList')), 'PowerList')
const PowerEdit = r => require.ensure([], () => r(require('../views/atriskLearners/powerManagement/powerEdit')), 'PowerEdit')
const ItemList = r => require.ensure([], () => r(require('../views/atriskLearners/itemManagement/item/itemList')), 'ItemList')
const ItemEdit = r => require.ensure([], () => r(require('../views/atriskLearners/itemManagement/item/itemEdit')), 'ItemEdit')
const ItemAdd = r => require.ensure([], () => r(require('../views/atriskLearners/itemManagement/item/itemAdd')), 'ItemAdd')
const OfficialList = r => require.ensure([], () => r(require('../views/atriskLearners/itemManagement/official/officialList')), 'OfficialList')
const OfficialEdit = r => require.ensure([], () => r(require('../views/atriskLearners/itemManagement/official/officialEdit')), 'OfficialEdit')
const OfficialAdd = r => require.ensure([], () => r(require('../views/atriskLearners/itemManagement/official/officialAdd')), 'OfficialAdd')
const TransactorList = r => require.ensure([], () => r(require('../views/atriskLearners/itemManagement/transactor/transactorList')), 'TransactorList')
const TransactorEdit = r => require.ensure([], () => r(require('../views/atriskLearners/itemManagement/transactor/transactorEdit')), 'TransactorEdit')
const ObjectList = r => require.ensure([], () => r(require('../views/atriskLearners/itemManagement/object/objectList')), 'ObjectList')
const ObjectAdd = r => require.ensure([], () => r(require('../views/atriskLearners/itemManagement/object/objectAdd')), 'ObjectAdd')
const TemplateList = r => require.ensure([], () => r(require('../views/atriskLearners/templateManagement/templateList')), 'TemplateList')
const TemplateEdit = r => require.ensure([], () => r(require('../views/atriskLearners/templateManagement/templateEdit')), 'TemplateEdit')
const TemplateAdd = r => require.ensure([], () => r(require('../views/atriskLearners/templateManagement/templateAdd')), 'TemplateAdd')
const GainList = r => require.ensure([], () => r(require('../views/atriskLearners/gainManagement/gainList')), 'GainList')
const GainSchoolList = r => require.ensure([], () => r(require('../views/atriskLearners/gainManagement/gainSchoolList')), 'GainSchoolList')
const GainDetails = r => require.ensure([], () => r(require('../views/atriskLearners/gainManagement/gainDetails')), 'GainDetails')
const LogList = r => require.ensure([], () => r(require('../views/atriskLearners/operationLog/logList')), 'LogList')

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
        component: PowerList
      },
      {
        path: 'powerEdit',
        component: PowerEdit
      },
      {
        path: 'itemList',
        component: ItemList
      },
      {
        path: 'itemEdit',
        component: ItemEdit
      },
      {
        path: 'itemAdd',
        component: ItemAdd
      },
      {
        path: 'officialList',
        component: OfficialList
      },
      {
        path: 'officialEdit',
        component: OfficialEdit
      },
      {
        path: 'officialAdd',
        component: OfficialAdd
      },
      {
        path: 'transactorList',
        component: TransactorList
      },
      {
        path: 'transactorEdit',
        component: TransactorEdit
      },
      {
        path: 'objectList',
        component: ObjectList
      },
      {
        path: 'objectAdd',
        component: ObjectAdd
      },
      {
        path: 'templateList',
        component: TemplateList
      },
      {
        path: 'templateEdit',
        component: TemplateEdit
      },
      {
        path: 'templateAdd',
        component: TemplateAdd
      },
      {
        path: 'gainList',
        component: GainList
      },
      {
        path: 'gainSchoolList',
        component: GainSchoolList
      },
      {
        path: 'gainDetails',
        component: GainDetails
      },
      {
        path: 'logList',
        component: LogList
      }]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

