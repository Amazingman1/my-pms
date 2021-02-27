/*
 * @Author: wangxuan
 * @Date: 2020-09-03 20:37:26
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-09-29 10:19:26
 * @FilePath: /vue-misb/src/api/user.js
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/v2/common/employee/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/v1/common/employee/logout',
    method: 'post'
  })
}

/* 获取酒店信息 */
export function getHotleInfo() {
  return request({
    url: '/v1/report/hotel_info/',
    method: 'get'
  })
}
