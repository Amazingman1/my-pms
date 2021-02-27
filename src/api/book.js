import request from '@/utils/request'

export function bookIngInfoApi(data) {
  return request({
    url: `/v1/bill/get_reserve_base_info/${data}/`,
    method: 'get'
  })
}
// 修改预订单房型相关信息
export function bookUpdataApi(data) {
  return request({
    url: `/v1/bill/update_reserve_rt_rate/`,
    method: 'post',
    data
  })
}
// 包价列表
export function breakfastApi(data) {
  return request({
    url: `/v1/room/rate_code/get_breakfast_list/`,
    method: 'get',
    data
  })
}
// 删除预定房型相关
export function deleteReserveApi(data) {
  return request({
    url: `/v1/bill/destroy_reserve_rt_rate/`,
    method: 'post',
    data
  })
}
// 新增预定房型相关
export function addReserveApi(data) {
  return request({
    url: `/v1/bill/add_reserve_rt_rate/`,
    method: 'post',
    data
  })
}
// 取消预定
export function cancelReserveApi(id, data) {
  return request({
    url: `/v1/bill/cancel_booking/${id}/`,
    method: 'post',
    data
  })
}
// 获取排房列表
export function rowHouseListApi(id) {
  return request({
    url: `/v1/bill/get_row_house_list/${id}/`,
    method: 'get'
  })
}
// 预定转入住基础信息
export function bookingTransferApi(data) {
  return request({
    url: `/v1/bill/booking_transfer_info/`,
    method: 'post',
    data
  })
}
// 预定转入住 入住
export function reserveTransferApi(data) {
  return request({
    url: `/v1/bill/booking_transfer/`,
    method: 'post',
    data
  })
}

// 新建预定单保存
export function newBookingApi(data) {
  return request({
    url: `/v1/bill/booking/`,
    method: 'post',
    data
  })
}

// 获取团队列表
export function teamListApi(params) {
  return request({
    url: `/v1/customer/team/get_team_base_list/`,
    method: 'get',
    params
  })
}
// 获取协议单位
export function getCompanyApi(params) {
  return request({
    url: `/v1/customer/company/get_company_base_list/`,
    method: 'get',
    params
  })
}
// 预定排人列表
export function getCanGuestApi(data) {
  return request({
    url: `/v1/bill/get_reserve_guest_list/?is_transfer=0`,
    method: 'post',
    data
  })
}
// 预定排人列表
export function getWillApi(data) {
  return request({
    url: `/v1/bill/get_reserve_guest_list/?is_transfer=1`,
    method: 'post',
    data
  })
}
// 预订单的可排人房间列表
export function getCanHoseApi(data) {
  return request({
    url: `/v1/bill/get_reserve_base_house_list/${data}/`,
    method: 'get'
  })
}
// 删除预定单宾客
export function deleteGuestApi(data) {
  return request({
    url: `/v1/bill/remove_reserve_guest/${data}/`,
    method: 'post'
  })
}
// 更新预定单宾客
export function updateGuestApi(id, data) {
  return request({
    url: `/v1/bill/update_reserve_guest/${id}/`,
    method: 'post',
    data
  })
}
// 新增预定单宾客
export function addGuestApi(data) {
  return request({
    url: `/v1/bill/add_reserve_guest/`,
    method: 'post',
    data
  })
}
// 修改预定单住单
export function updateBookingApi(data, id) {
  return request({
    url: `/v1/bill/update_booking/${id}/`,
    method: 'post',
    data
  })
}

// 2020=10-15
// 直接预定
export function bookingApi(data) {
  return request({
    url: `/v1/bill/add_reserve_room_state/`,
    method: 'post',
    data
  })
}

//  预定默认信息
// 预定房间查询是否占用

export function reserveInfoApi(data) {
  return request({
    url: `/v1/bill/reserve_info/`,
    method: 'post',
    data
  })
}
