import request from '@/utils/requestUser'
// 登陆
export function loginApi(data) {
  return request({
    url: '/v2/common/employee/login',
    method: 'post',
    data
  })
}
// 退出登陆
export function logoutApi() {
  return request({
    url: 'v2/common/employee/logout',
    method: 'get'
  })
}
// 获取员工列表
export function getUserList(params) {
  return request({
    url: 'v2/organization/hotel_base/hotel_get_employee/',
    method: 'get',
    params
  })
}

export function getHotel() {
  return request({
    url: 'v2/organization/hotel_base/get_hotel/',
    method: 'get'
  })
}

// 获取酒店权限
export function hotelUrl(params) {
  return request({
    url: 'v2/organization/fixed_base/hotel_tree_list/',
    method: 'get'
  })
}
