/*
 * @Author: wangxuan
 * @Date: 2020-06-22 20:20:47
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-30 09:48:22
 * @FilePath: /vue-misb/src/store/modules/websocket.js
 */

// 连接问题找老邓
// 后端给的端口号
import { getToken } from '@/utils/auth'
import { websocketUrl } from '@/utils/url'
import { Notification } from 'element-ui'
import { getMessageListApi, deleteMessageListApi } from '@/api/messageList'

const getDefaultState = () => {
  return {
    websock: null,
    messageWB: {},
    messageList: []
  }
}
const state = getDefaultState()
const mutations = {
  STAFF_UPDATEWEBSOCKET(state, websock) {
    state.websock = websock
  },
  SET_MESSAGELIST(state, messageList) {
    state.messageList = messageList
  },
  STAFF_websocketonmessage(e) { // 数据接收
    const redata = JSON.parse(e.data)
    console.log(redata)
  },
  STAFF_red(e) { // 数据接收
    console.log(e)
  },
  SET_messageWB(state, messageWB) {
    state.messageWB = messageWB
  }
}
const actions = {
  STAFF_WEBSOCKET({ commit, dispatch }, data) {
    const token = getToken()
    if (token) {
      const wsuri = `${websocketUrl}?authorization=${token}`
      commit('STAFF_UPDATEWEBSOCKET', new WebSocket(wsuri))
      state.websock.onopen = function(e) {
        // 链接websocket
        console.log('打开链接', e)
      }
      state.websock.onmessage = function(e) { // 接收信息
        const redata = JSON.parse(JSON.parse(e.data).message)
        console.log('接收数据', redata)
        commit('SET_messageWB', redata)
        dispatch('getMessageList')
        Notification({
          title: redata.title,
          dangerouslyUseHTMLString: true,
          message: redata.text,
          type: redata.type
        })
      }
      state.websock.onerror = function(e) {
        console.log('链接失败', e)
      }
    }
  },
  // 获取消息列表
  getMessageList({ commit }) {
    getMessageListApi().then(res => {
      const { data } = res
      commit('SET_MESSAGELIST', data)
    })
  },
  // 删除消息
  deleteMessageList({ commit, dispatch }, params) {
    deleteMessageListApi(params).then(res => {
      dispatch('getMessageList')
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
