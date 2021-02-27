/*
 * @Author: wangxuan
 * @Date: 2020-10-19 18:56:27
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-29 16:02:07
 * @FilePath: /vue-misb/src/store/modules/checkin.js
 */
import { cashApi } from '@/api/checkin'

const getDefaultState = () => {
  return {
    cashAList: []

  }
}

const state = getDefaultState()

const mutations = {
  SET_CASHALIST: (state, cashAList) => {
    state.cashAList = cashAList
  }
}

const actions = {
  // 收银点列表
  getCashInfo({ commit, dispatch }, products) {
    return new Promise((resolve, reject) => {
      cashApi(products).then(res => {
        const { data } = res
        commit('SET_CASHALIST', data.results)
        resolve()
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

