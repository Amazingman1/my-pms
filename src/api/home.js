import request from '@/utils/request'

// 未来房情
export function futureHousing(data) {
  return request({
    url: `/v1/room/rate_code/future_housing_situation/`,
    method: 'post',
    data
  })
}
export function getpirceData() {
  return request({
    url: '/v1/room/rate_code/get_rate_code_list/',
    method: 'get'
  })
}
// 首页销售信息
export function getChartData() {
  return request({
    url: `/v1/room/room_status/real_time_situation/`,
    method: 'get'
  })
}
// 获取房价码
export function saerchData(data) {
  return request({
    url: `/v1/room/rate_code/get_rate_code/`,
    method: 'post',
    data
  })
}
// 获取房价码列表
export function rataCodeListData(data) {
  return request({
    url: `/v1/room/rate_code/get_rate_code_list/`,
    method: 'get',
    params: data
  })
}
export function getMasterList(params) {
  return request({
    url: `/v1/bill/get_master_base_list/`,
    method: 'get',
    params
  })
}
// 本日将到
export function getDayMasterList(data, time, times) {
  return request({
    url: `/v1/bill/get_master_base_list/?arr_time__gte=${time}&leave_time__lt=${times}`,
    method: 'get',
    params: data
  })
}
// 本日将到
export function getDayLeaveMasterList(params) {
  return request({
    url: `/v1/bill/get_master_base_list/`,
    method: 'get',
    params
  })
}
// 获取预定单列表
export function getReserveList(data) {
  return request({
    url: `/v1/bill/get_reserve_base_list/`,
    method: 'get',
    params: data
  })
}
// 获取今日将到列表
export function dayReserveList(data, time, times) {
  return request({
    url: `/v1/bill/get_reserve_base_list/?arr_time__gte=${time}&arr_time__lt=${times}`,
    method: 'get',
    params: data
  })
}
// 应到未到
export function getReserveListTime(data, time) {
  return request({
    url: `/v1/bill/get_reserve_base_list/?arr_time__lte=${time}`,
    method: 'get',
    params: data
  })
}
//  获取市场码
export function getMarktCode(data) {
  return request({
    url: `/v1/system/settings/get_code_base_sys_list/?parent_code=market_code`,
    method: 'get',
    params: data
  })
}
// 获取来源码
export function getSrcCode(data) {
  return request({
    url: `/v1/system/settings/get_code_base_sys_list/?parent_code=src_code`,
    method: 'get',
    params: data
  })
}

// 获取在住房间号
export function getRoomNumber(data) {
  return request({
    url: `/v1/bill/get_master_room_no_list/`,
    method: 'get',
    params: data
  })
}
// 获取房型
export function getRoomType(data) {
  return request({
    url: `/v1/room/room_status/get_room_type_list/`,
    method: 'get',
    params: data
  })
}
// 已离店列表
export function getLiveListApi(data) {
  return request({
    url: `/v1/bill/get_check_out_master_base_list/`,
    method: 'get',
    params: data
  })
}
// 获取历史预订单
export function getHistoryReserveListApi(data) {
  return request({
    url: `/v1/bill/get_history_reserve_base_list/`,
    method: 'get',
    params: data
  })
}
