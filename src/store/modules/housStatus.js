/*
 * @Author: wangxuan
 * @Date: 2020-04-12 10:42:48
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-25 15:45:08
 * @FilePath: /vue-misb/src/store/modules/housStatus.js
 */
// import { roomSatuslistApi } from '@/api/housStatus'
import { newRoomSatuslistApi } from '@/api/housStatus'

const getDefaultState = () => {
  return {
    roomSatusMap: [],
    roomSta: [],
    copyStatusList: [],
    newCopyStatusList: [],
    valid: false,
    hosuLoading: false
  }
}

const state = getDefaultState()

const mutations = {
  SET_ROOMSTATUSMAP: (state, roomSatusMap) => {
    state.roomSatusMap = roomSatusMap
  },
  SET_ROOMSTA: (state, roomSta) => {
    state.roomSta = roomSta
  },
  SET_VALID: (state, valid) => {
    state.valid = valid
  },
  SET_HOUSELOADING: (state, hosuLoading) => {
    state.hosuLoading = hosuLoading
  },
  SET_COPYLIST: (state, copyStatusList) => {
    state.copyStatusList = copyStatusList
  },
  SET_NEWCOPYLIST: (state, newCopyStatusList) => {
    state.newCopyStatusList = newCopyStatusList
  }
}

const actions = {
  getRoomSatusMap({ commit, dispatch }, products) {
    commit('SET_HOUSELOADING', true)
    return new Promise((resolve, reject) => {
      // roomSatuslistApi(products).then(res => {
      const data = {
        // by_floor: true
      }
      newRoomSatuslistApi(data, { ...products }).then(res => {
        console.log('房态列表', res)
        const { data } = res
        let arr = []
        data.results.map(p => {
          arr = arr.concat(p.data)
        })
        commit('SET_NEWCOPYLIST', arr)
        commit('SET_ROOMSTATUSMAP', data.results)
        commit('SET_COPYLIST', data.results)
        commit('SET_ROOMSTA', data.room_state_count)
        commit('SET_HOUSELOADING', false)
        resolve()
      })
    })
  },
  searchColor({ commit }, products) {
    commit('SET_ROOMSTATUSMAP', products)
  },
  changeValid({ commit, dispatch }, products) {
    commit('SET_VALID', products)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

