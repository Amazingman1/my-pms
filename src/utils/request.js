/*
 * @Author: wangxuan
 * @Date: 2020-09-16 13:58:52
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-15 15:17:27
 * @FilePath: /vue-misb/src/utils/request.js
 */
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, setToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['authorization'] = getToken()
      // config.headers['content-Type'] = 'text/plain;charset=UTF-8'
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.message !== 'success' && res.message) {
      Message({
        message: res.message || 'Error',
        type: 'error'
      })
      if (res.message === 'authorization invalid') {
        // to re-login
        store.dispatch('user/resetToken').then(() => {
          // 删除收银点
          location.reload()
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      setToken(res.new_authorization)
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
