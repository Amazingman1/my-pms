/*
 * @Author: wangxuan
 * @Date: 2020-03-23 17:22:38
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-29 15:37:08
 * @FilePath: /vue-misb/src/store/index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import housStatus from './modules/housStatus'
import checkin from './modules/checkin'
import websocket from './modules/websocket'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    housStatus,
    checkin,
    websocket
  },
  getters
})

export default store
