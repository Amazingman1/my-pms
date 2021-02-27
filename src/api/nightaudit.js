import request from '@/utils/request'

export function checkoutNoClosedApi(inx, data) {
  const urlObj = {
    0: `/v1/report/night_audit/check_out_but_no_closed/`, // 退房未平帐的主帐信息
    1: `/v1/report/night_audit/should_leave_without_leave/`, // 应离未离宾客列表
    2: ``, // 应离未离钟点房列表
    3: `/v1/report/night_audit/should_check_in_without_check_in/`, // 应到未到客人列表
    4: `/v1/report/night_audit/get_abnormal_master_base/`, // 异常检查
    5: ``, // 当日新增无地址宾客档案列表
    6: ``, // 即将删除宾客档案列表
    7: ``, // 夜审钟点房未离列表
    8: `/v1/report/night_audit/without_market_code_src_code/`, // 缺失市场码来源码主单
    9: ``, // 证件号码重复登记主单
    10: ``, // 应到未到有效账务宾客列表
    11: ``, // 取消预订列表
    12: `/v1/report/get_OO_room_list/`, // 即将到期维修/锁房列表
    13: ``, // 到期预授权撤销列表
    14: `/v1/bill/get_master_base_list/` // 房租预审
  }
  return request({
    url: urlObj[inx],
    method: 'get',
    params: data
  })
}
// 夜审最后一步
export function nightAuditApi(data) {
  return request({
    url: '/v1/report/night_audit/add_YSFF/',
    method: 'post',
    data
  })
}

// 开始夜审
export function startNightAuditApi(params) {
  return request({
    url: '/v1/report/night_audit/get_night_check/',
    method: 'get',
    params
  })
}
// 夜审预审
export function preNightCheckApi(params) {
  return request({
    url: '/v1/report/night_audit/pre_night_check/',
    method: 'get',
    params
  })
}

// 夜审预审
export function priceNightCheckApi(data) {
  return request({
    url: '/v1/report/night_audit/change_price/',
    method: 'post',
    data
  })
}
