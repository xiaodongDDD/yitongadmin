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
    component: _import('index'),
    children: [
      {
        path: 'userList',
        component: _import('userManagement/userList')
      },
      {
        path: 'userEdit',
        component: _import('userManagement/userEdit')
      },
      {
        path: 'userAdd',
        component: _import('userManagement/userAdd')
      },
      {
        path: 'accountList',
        component: _import('accountManagement/accountList')
      },
      {
        path: 'accountEdit',
        component: _import('accountManagement/accountEdit')
      },
      {
        path: 'accountAdd',
        component: _import('accountManagement/accountAdd')
      },
      {
        path: 'powerList',
        component: _import('powerManagement/powerList')
      },
      {
        path: 'powerEdit',
        component: _import('powerManagement/powerEdit')
      },
      {
        path: 'itemList',
        component: _import('itemManagement/item/itemList')
      },
      {
        path: 'itemEdit',
        component: _import('itemManagement/item/itemEdit')
      },
      {
        path: 'itemAdd',
        component: _import('itemManagement/item/itemAdd')
      },
      {
        path: 'officialList',
        component: _import('itemManagement/official/officialList')
      },
      {
        path: 'officialEdit',
        component: _import('itemManagement/official/officialEdit')
      },
      {
        path: 'officialAdd',
        component: _import('itemManagement/official/officialAdd')
      },
      {
        path: 'transactorList',
        component: _import('itemManagement/transactor/transactorList')
      },
      {
        path: 'transactorEdit',
        component: _import('itemManagement/transactor/transactorEdit')
      },
      {
        path: 'objectList',
        component: _import('itemManagement/object/objectList')
      },
      {
        path: 'objectAdd',
        component: _import('itemManagement/object/objectAdd')
      },
      {
        path: 'templateList',
        component: _import('templateManagement/templateList')
      },
      {
        path: 'templateEdit',
        component: _import('templateManagement/templateEdit')
      },
      {
        path: 'templateAdd',
        component: _import('templateManagement/templateAdd')
      },
      {
        path: 'gainList',
        component: _import('gainManagement/gainList')
      },
      {
        path: 'gainSchoolList',
        component: _import('gainManagement/gainSchoolList')
      },
      {
        path: 'gainDetails',
        component: _import('gainManagement/gainDetails')
      },
      {
        path: 'logList',
        component: _import('operationLog/logList')
      }]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

