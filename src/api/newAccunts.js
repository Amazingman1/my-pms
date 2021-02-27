/*
 * @Author: wangxuan
 * @Date: 2020-05-12 17:19:20
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-22 10:32:43
 * @FilePath: /vue-misb/src/api/newAccunts.js
 */
import request from '@/utils/request'

// 收款明细
export function getpirceData(params, type) {
  return request({
    url: `/v1/accounts/get_charge_detail_list_by_pms/?subject=${type}`,
    method: 'get',
    params
  })
}
// 所有房间列表
export function geAllRoomListApi(params) {
  return request({
    url: `/v1/room/room_status/get_room_list/?page_size=300`,
    method: 'get',
    params
  })
}

// 收款明细
export function eportPirceData(params, type) {
  return request({
    url: `/v1/accounts/excel/get_charge_detail_list_by_pms/?subject=${type}`,
    method: 'get',
    params
  })
}
