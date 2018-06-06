import Vue from 'vue'
import 'babel-polyfill'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
// import eduData from '@/api/eduAdmin.js'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

// Vue.prototype.eduData = eduData
Vue.prototype.HOST = 'http://jiaowu-test.xiaoheiban.cn/'

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
