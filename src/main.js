/*
 * @Author: wangxuan
 * @Date: 2020-10-19 18:56:27
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-21 17:19:53
 * @FilePath: /vue-misb/src/main.js
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import Print from 'vue-print-nb'
import VueResource from 'vue-resource'
import VueWechatTitle from 'vue-wechat-title'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

// 节流
const on = Vue.prototype.$on
Vue.prototype.$on = function(event, func) {
  let previous = 0
  let newFunc = func
  if (event === 'click') {
    newFunc = function() {
      const now = new Date().getTime()
      if (previous + 1000 <= now) {
        func.apply(this, arguments)
        previous = now
      }
    }
  }
  on.call(this, event, newFunc)
}
Vue.use(VXETable)
// 给 vue 实例挂载全局窗口对象
Vue.prototype.$XModal = VXETable.modal
Vue.use(VueWechatTitle)
Vue.use(VueResource)
Vue.use(Print)
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
