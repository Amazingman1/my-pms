/*
 * @Author: wangxuan
 * @Date: 2020-04-29 17:34:59
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-30 10:07:41
 * @FilePath: /vue-misb/src/api/card.js
 */
import request from '@/utils/request'

export function carldApi(id) {
  return request({
    url: `/v1/room/room_lock/success_update/${id}/`,
    method: 'post'
  })
}
export function lockforIdApi(data) {
  return request({
    url: `/v1/room/room_lock/get_room_no_by_lock_no/`,
    method: 'post',
    data
  })
}
export function readIdCardApi(data) {
  return request({
    url: `/v1/room/room_lock/scanning_id_card/`,
    method: 'post',
    data
  })
}
