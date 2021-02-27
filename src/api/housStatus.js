/*
 * @Author: wangxuan
 * @Date: 2020-11-23 14:34:15
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-25 13:53:14
 * @FilePath: /vue-misb/src/api/housStatus.js
 */
import request from '@/utils/request'

// 房态列表
export function roomSatuslistApi(data) {
  return request({
    url: `/v1/room/room_status/get_room_map_list/?page_size=1000&ordering=room_no`,
    method: 'get',
    data
  })
}
// 新房态
export function newRoomSatuslistApi(data, params) {
  return request({
    url: `/v1/room/room_status/room_home_page/`,
    method: 'post',
    data,
    params
  })
}
//  房间状态颜色
export function roomStatusColorApi(data) {
  return request({
    url: `/v1/room/room_status/get_code_room_state_list/`,
    method: 'get'
    // params: data
  })
}
//  房间置干净置脏
export function changeRoomStatusApi(data) {
  return request({
    url: `/v1/room/room_status/manual_change_room_status/`,
    method: 'post',
    data
  })
}
//  房间置干净置脏
export function allChangeRoomStatusApi(data) {
  return request({
    url: `/v1/room/room_status/batch_change_room_state/`,
    method: 'post',
    data
  })
}
// 置维修原因
export function changeRoomResonApi(data) {
  return request({
    url: `/v1/system/settings/get_code_base_list/`,
    method: 'get',
    data
  })
}
// 楼层列表
export function roomFloorListApi(data) {
  return request({
    url: `/v1/room/room_status/get_room_floor_list/?page_size=300`,
    method: 'get',
    data
  })
}
// 楼层列表
export function roomBuildingListApi(data) {
  return request({
    url: `/v1/room/room_status/get_room_building_list/?page_size=300`,
    method: 'get',
    data
  })
}
// 锁房 解锁
export function roomLockApi(data) {
  return request({
    url: `v1/room/room_status/lock_room/`,
    method: 'post',
    data
  })
}
