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
const ExectorAdd = r => require.ensure([], () => r(require('../views/atriskLearners/itemManagement/transactor/exectorAdd')), 'ExectorAdd')
const ExectorEdit = r => require.ensure([], () => r(require('../views/atriskLearners/itemManagement/transactor/ExectorEdit')), 'ExectorEdit')
const PoorStudentEdit = r => require.ensure([], () => r(require('../views/atriskLearners/itemManagement/transactor/poorStudentEdit')), 'PoorStudentEdit')
const ObjectList = r => require.ensure([], () => r(require('../views/atriskLearners/itemManagement/object/objectList')), 'ObjectList')
const ObjectMan = r => require.ensure([], () => r(require('../views/atriskLearners/itemManagement/object/objectMan')), 'ObjectMan')
const ObjectEdit = r => require.ensure([], () => r(require('../views/atriskLearners/itemManagement/object/objectEdit')), 'ObjectEdit')
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
        name: '学校用户管理',
        component: UserList,
        meta:{
          title:'学校用户管理'
        }
      },
      {
        path: 'userEdit',
        name: '编辑学校用户',
        component: UserEdit,
        meta:{
          title:'编辑学校用户'
        }
      },
      {
        path: 'userAdd',
        name: '新增学校用户',
        component: UserAdd,
        meta:{
          title:'新增学校用户'
        }
      },
      {
        path: 'accountList',
        name: '账户管理',
        component: AccountList,
        meta:{
          title:'账户管理'
        }
      },
      {
        path: 'accountEdit',
        name: '编辑账户信息',
        component: AccountEdit,
        meta:{
          title:'编辑账户信息'
        }
      },
      {
        path: 'accountAdd',
        name: '新增账户信息',
        component: AccountAdd,
        meta:{
          title:'新增账户信息'
        }
      },
      {
        path: 'powerList',
        name: '权限管理',
        component: PowerList,
        meta:{
          title:'权限管理'
        }
      },
      {
        path: 'powerEdit',
        name: '编辑权限管理',
        component: PowerEdit,
        meta:{
          title:'编辑权限管理'
        }
      },
      {
        path: 'itemList',
        component: ItemList,
        name: '评价项目管理',
        meta:{
          title:'评价项目管理'
        }
      },
      {
        path: 'officialList',
        name: '负责人管理',
        component: OfficialList,
        meta:{
          title:'负责人管理'
        }
      },
      {
        path: 'officialEdit',
        name: '编辑负责人',
        component: OfficialEdit,
        meta:{
          title: '编辑负责人'
        }
      },
      {
        path: 'officialAdd',
        name: '新增负责人',
        component: OfficialAdd,
        meta:{
          title: '新增负责人'
        }
      },
      {
        path: 'itemEdit',
        name: '编辑评价项目',
        component: ItemEdit,
        meta:{
          title: '编辑评价项目'
        }
      },
      {
        path: 'itemAdd',
        name: '新增评价项目',
        component: ItemAdd
      },
      {
        path: 'transactorList',
        name: '执行人管理',
        component: TransactorList,
      },
      {
        path: 'transactorEdit',
        name: '编辑执行人管理',
        component: TransactorEdit
      },
      {
        path: 'exectorAdd',
        name: '执行人管理添加',
        component: ExectorAdd
      },
      {
        path: 'exectorEdit',
        name: '执行人管理编辑',
        component: ExectorEdit
      },
      {
        path: 'poorStudentEdit',
        name: '执行人管理',
        component: PoorStudentEdit
      },
      {
        path: 'objectList',
        name: '评价对象管理',
        component: ObjectList,
      },
      {
        path: 'objectMan',
        name: '评价对象管理',
        component: ObjectMan
      },
      {
        path: 'objectEdit',
        name: '编辑评价对象管理',
        component: ObjectEdit
      },
      {
        path: 'templateList',
        name:'评价模板管理',
        component: TemplateList
      },
      {
        path: 'templateEdit',
        name: '编辑评价模板',
        component: TemplateEdit
      },
      {
        path: 'templateAdd',
        name: 'dasdas',
        component: TemplateAdd
      },
      {
        path: 'gainList',
        name: '评价成果',
        component: GainList
      },
      {
        path: 'gainSchoolList',
        name: '1212212',
        component: GainSchoolList
      },
      {
        path: 'gainDetails',
        name: '21qwda',
        component: GainDetails
      },
      {
        path: 'logList',
        name: '操作日志',
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

