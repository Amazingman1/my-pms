/*
 * @Author: wangxuan
 * @Date: 2020-09-16 13:58:52
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-03 16:42:59
 * @FilePath: /vue-misb/src/utils/requestUser.js
 */
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { baseUrl } from '@/utils/url'
import { getToken, setToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: baseUrl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['authorization'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.message !== 'success' && res.message) {
      Message({
        message: res.message || 'Error',
        type: 'error'
      })
      if (res.message === 'authorization_invalid') {
        store.dispatch('user/resetToken').then(() => {
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
