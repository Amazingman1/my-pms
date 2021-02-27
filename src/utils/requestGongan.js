import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { gongAnUrl } from '@/utils/url'
import { getToken, setToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: gongAnUrl, // url = base url + request url
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
    if (res.message !== 'success' && res.message) {
      Message({
        message: res.message || 'Error',
        type: 'error'
      })
      // if (!res.new_authorization) {
      //   store.dispatch('user/resetToken').then(() => {
      //     location.reload()
      //   })
      // }
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
