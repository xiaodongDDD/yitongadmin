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
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },

  {
    path: '/',
    redirect: '/userList',
    name: 'Index',
    component: _import('atriskLearners/index'),
    children: [
      {
        path: 'userList',
        component: _import('atriskLearners/userManagement/userList')
      },
      {
        path: 'userEdit',
        component: _import('atriskLearners/userManagement/userEdit')
      },
      {
        path: 'userAdd',
        component: _import('atriskLearners/userManagement/userAdd')
      },
      {
        path: 'accountList',
        component: _import('atriskLearners/accountManagement/accountList')
      },
      {
        path: 'accountEdit',
        component: _import('atriskLearners/accountManagement/accountEdit')
      },
      {
        path: 'accountAdd',
        component: _import('atriskLearners/accountManagement/accountAdd')
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
        path: 'exectorAdd',
        component: _import('atriskLearners/itemManagement/transactor/exectorAdd')
      },
      {
        path: 'exectorEdit',
        component: _import('atriskLearners/itemManagement/transactor/exectorEdit')
      },
      {
        path: 'poorStudentEdit',
        component: _import('atriskLearners/itemManagement/transactor/poorStudentEdit')
      },
      {
        path: 'objectList',
        component: _import('atriskLearners/itemManagement/object/objectList')
      },
      {
        path: 'objectMan',
        component: _import('atriskLearners/itemManagement/object/objectMan')
      },
      {
        path: 'objectEdit',
        component: _import('atriskLearners/itemManagement/object/objectEdit')
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

