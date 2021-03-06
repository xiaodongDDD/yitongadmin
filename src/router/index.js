import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

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
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   // redirect: '/example/table',
  //   // name: 'Example',
  //   // meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: _import('table/index'),
  //       meta: { title: '列表', icon: 'table' }
  //     }
  //   ]
  // },
  // {
  //   path: '/feedbackQuestion',
  //   component: Layout,
  //   redirect: '/feedbackQuestion/schoolH5',
  //   name: '反馈问题',
  //   meta: { title: '反馈问题', icon: 'example' },
  //   children: [
  //     {
  //       path: 'schoolH5',
  //       name: '整校h5',
  //       component: _import('feedbackQuestion/schoolH5'),
  //       meta: { title: '整校h5', icon: 'form' }
  //     },
  //     {
  //       path: 'schoolPC',
  //       name: '整校pc',
  //       component: _import('form/index'),
  //       meta: { title: '整校pc', icon: 'form' },
  //       hidden: true
  //     }
  //   ]
  // },
  {
    path: '/eventManagement',
    component: Layout,
    redirect: '/eventManagement/worksManagement',
    name: '作品管理',
    meta: { title: '作品管理', icon: 'example' },
    children: [
      {
        path: 'worksManagement',
        name: 'worksManagement',
        component: _import('eventManagement/worksManagement'),
        meta: { title: '晓画家' }
      },
      {
        path: 'worldManagement',
        name: 'worldManagement',
        component: _import('eventManagement/worldManagement'),
        meta: { title: '晓世界' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

