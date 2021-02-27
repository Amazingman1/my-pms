import { loginApi, logoutApi } from '@/api/login'
import { getHotleInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import g_localStorage from '@/utils/saveLogal'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: g_localStorage.getItem('name') || '',
    avatar: g_localStorage.getItem('avatar') || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    hotel: '',
    photoTel: g_localStorage.getItem('photoTel'),
    userObj: g_localStorage.getItem('userObj'),
    guestlist: [],
    ruleRouter: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_HOTEL: (state, hotel) => {
    state.hotel = hotel
  },
  SET_PHOTOEL: (state, photoTel) => {
    state.photoTel = photoTel
  },
  SET_USEROBJ: (state, userObj) => {
    state.userObj = userObj
  },
  SET_GUESTLIST: (state, guestlist) => {
    state.guestlist = guestlist
  },
  SET_RULE: (state, ruleRouter) => {
    state.ruleRouter = ruleRouter
  }
}

const actions = {
  // 上传公安的宾客列表
  setGuestList({ commit }, guestlist) {
    commit('SET_GUESTLIST', guestlist)
  },
  clearGuestList({ commit }) {
    commit('SET_GUESTLIST', [])
  },
  login({ commit, dispatch }, userInfo) {
    console.log(process.env, '环境')
    const { user_name, password, code } = userInfo
    return new Promise((resolve, reject) => {
      loginApi({ user_name: user_name.trim(), password: password, code: code }).then(async response => {
        console.log(response, 555)
        commit('SET_TOKEN', response.new_authorization)
        commit('SET_HOTEL', response.user_info.hotel_id)
        setToken(response.new_authorization)
        g_localStorage.setItem('ruleRouter', JSON.stringify(response.rules))
        commit('SET_RULE', response.rules)
        g_localStorage.setItem('hotel_id', response.user_info.hotel_id)
        await dispatch('getInfo')
        resolve()
      })
    })
  },
  // get user info
  getInfo({ commit, dispatch, rootState }, data) {
    return new Promise((resolve, reject) => {
      getHotleInfo().then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        g_localStorage.setItem('userObj', data.biz_date)
        g_localStorage.setItem('user', JSON.stringify(data))
        commit('SET_USEROBJ', data.biz_date)
        commit('SET_PHOTOEL', data.photo)
        commit('SET_AVATAR', data.logo)
        commit('SET_PHOTOEL', data.short_name)
        g_localStorage.setItem('avatar', data.logo)
        g_localStorage.setItem('photoTel', data.short_name)
        g_localStorage.setItem('dateDelta', data.date_delta)
        g_localStorage.setItem('is_SF', data.is_SF)
        resolve(data)
      })
    })
  },
  changeBizDate({ commit }, data) {
    commit('SET_USEROBJ', data)
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logoutApi().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        g_localStorage.removeItem('cashId')
        location.reload()
        commit('RESET_STATE')
        resolve()
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      g_localStorage.removeItem('cashId')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

