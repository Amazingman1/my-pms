import request from '@/utils/request'

export function getTeamListApi(params) {
  return request({
    url: '/v1/bill/get_reserve_base_list/',
    method: 'get',
    params
  })
}
/*
7-22
历史团队订单*/
export function getHistoryTeamListApi(params) {
  return request({
    url: '/v1/bill/get_history_reserve_base_list/',
    method: 'get',
    params
  })
}

// 团队订单倒入
export function importExcelApi(data) {
  return request({
    url: '/v1/bill/unity_booking_with_xlsx/',
    method: 'post',
    data
  })
}
