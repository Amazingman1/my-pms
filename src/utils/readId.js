/*
 * @Author: wangxuan
 * @Date: 2020-11-10 16:43:36
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-03 16:43:16
 * @FilePath: /vue-misb/src/utils/readId.js
 */
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { readId } from '@/utils/url'
import { getToken, setToken } from '@/utils/auth'

const service = axios.create({
  baseURL: readId, // url = base url + request url
  timeout: 10000 // request timeout
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
    setToken(res.new_authorization)
    return res
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
