/*
 * @Author: wangxuan
 * @Date: 2020-05-12 18:26:57
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-24 13:57:44
 * @FilePath: /vue-misb/src/api/geustList.js
 */
import request from '@/utils/request'

// 在住宾客/已离店宾客
export function masterListApi(data, params) {
  return request({
    url: `/v1/report/get_current_guest/`,
    method: 'post',
    data,
    params
  })
}
// 房间号
export function roomNumberListApi(params) {
  return request({
    url: '/v1/room/room_status/get_room_list/?page_size=300',
    method: 'get',
    params
  })
}
// 在住客人导出表格
export function downLoad(data, params) {
  return request({
    url: '/v1/report/excel/get_current_guest/',
    method: 'post',
    data,
    params
  })
}
