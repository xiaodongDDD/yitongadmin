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
  {
    path: '/bannerList',
    component: Layout,
    children: [
      {
        path: 'bannerList',
        name: 'bannerList',
        component: _import('growUp/banner/bannerList'),
        meta: { title: 'banner管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/labelList',
    component: Layout,
    children: [
      {
        path: 'labelList',
        name: 'labelList',
        component: _import('growUp/label/labelList'),
        meta: { title: '标签管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/column',
    component: Layout,
    redirect: '/column/columnList',
    name: '栏目管理',
    meta: { title: '栏目管理', icon: 'example' },
    children: [
      {
        path: 'columnList',
        name: 'columnList',
        component: _import('growUp/column/columnList'),
        meta: { title: '栏目管理', icon: 'form' }
      },
      {
        path: 'topList',
        name: 'topList',
        component: _import('growUp/column/topList'),
        meta: { title: '置顶文章管理', icon: 'form' }
      },
      {
        path: 'pageList',
        name: 'pageList',
        component: _import('growUp/column/pageList'),
        meta: { title: '专栏管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/journal',
    component: Layout,
    redirect: '/journal/journalList',
    name: '晓周刊',
    hidden: false,
    meta: { title: '晓周刊', icon: 'example' },
    children: [
      {
        path: 'journalList',
        name: 'journalList',
        component: _import('growUp/weekly/journalList'),
        meta: { title: '期刊管理', icon: 'form' }
      },
      {
        path: 'journalAdd',
        name: 'journalAdd',
        hidden: false,
        component: _import('growUp/weekly/journalAdd'),
        meta: { title: '期刊编辑/新增', icon: 'form' }
      },
      {
        path: 'spaceList',
        name: 'spaceList',
        component: _import('growUp/weekly/spaceList'),
        meta: { title: '版面管理', icon: 'form' }
      },
      {
        path: 'dataList',
        name: 'dataList',
        component: _import('growUp/weekly/dataList'),
        meta: { title: '晓周刊数据', icon: 'form' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/articleList',
    name: '文章管理',
    meta: { title: '文章管理', icon: 'example' },
    children: [
      {
        path: 'articleList',
        name: 'articleList',
        component: _import('growUp/article/articleList'),
        meta: { title: '文章管理', icon: 'form' }
      },
      {
        path: 'articleAdd',
        name: 'articleAdd',
        hidden: true,
        component: _import('growUp/article/articleAdd'),
        meta: { title: '文章编辑/新增', icon: 'form' }
      },
      {
        path: 'commentList',
        name: 'commentList',
        component: _import('growUp/article/commentList'),
        meta: { title: '评论管理', icon: 'form' }
      },
      {
        path: 'commentInfo',
        name: 'commentInfo',
        hidden: true,
        component: _import('growUp/article/commentInfo'),
        meta: { title: '评论详情', icon: 'form' }
      },
      {
        path: 'artistList',
        name: 'artistList',
        component: _import('growUp/article/artistList'),
        meta: { title: '作者管理', icon: 'form' }
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

