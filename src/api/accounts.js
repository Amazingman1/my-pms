import request from '@/utils/request'

// 房间账务信息列表
export function accountLIstApi(data, page, pageSize, subjiect) {
  return request({
    url: `/v1/accounts/get_charge_detail_list/?page=${page}&page_size=${pageSize}&subject__in=${subjiect}`,
    method: 'post',
    data
  })
}
// 房间账务信息列表
export function newAccountLIstApi(data, params) {
  return request({
    url: `/v1/accounts/get_charge_detail_list/`,
    method: 'post',
    data,
    params
  })
}
// 增加冲调帐
export function addIncreaseApi(data, params) {
  return request({
    url: `/v1/accounts/add_arrange_operation/`,
    method: 'post',
    data,
    params

  })
}
// 拆分金额
export function splitAccApi(data, params) {
  return request({
    url: `/v1/accounts/add_split_charge_operation/`,
    method: 'post',
    data,
    params

  })
}
// 退款
export function refundApi(data, params) {
  return request({
    url: `/v1/accounts/refund/`,
    method: 'post',
    data,
    params

  })
}
// 查询单个账单详情
export function accBaseInfoApi(params) {
  return request({
    url: `/v1/accounts/get_account_base_info/${params}/`,
    method: 'get'
    // params

  })
}
// 结账加收房费
export function addChargeDetailApi(data) {
  return request({
    url: `/v1/accounts/add_charge_detail/`,
    method: 'post',
    data

  })
}
// 结账
export function closeDetailApi(data, id) {
  return request({
    url: `/v1/bill/check_out/${id}/`,
    method: 'post',
    data
  })
}
// 转账
export function transferApi(data) {
  return request({
    url: `/v1/accounts/add_transfer_detail/`,
    method: 'post',
    data
  })
}
// 获取AR账户列表
export function ARListApi(params) {
  return request({
    url: `/v1/accounts/get_ar_account_list/`,
    method: 'get',
    params
  })
}
// 二位码支付取消支付
export function canselPayApi(data) {
  return request({
    url: `/v1/accounts/cancel/`,
    method: 'post',
    data
  })
}
// new 入消费的付款原因/入预收付款方式
export function newPayApi(params) {
  return request({
    url: `/v1/system/settings/get_hotel_pay_reason/`,
    method: 'get',
    params
  })
}

// new 入账代码
export function newPayForApi(params) {
  return request({
    url: `/v1/system/settings/get_hotel_pay_code/`,
    method: 'get',
    params
  })
}
/*
  新增账务记录查询 2020-06-15
*/
// 账务记录查询
export function accuntsrRecord(data, params) {
  const urlObj = {
    '分账记录': `/v1/accounts/get_split_charge_operation_list/`,
    '冲调账记录': `/v1/accounts/get_arrange_operation_list/`,
    '转账记录': `/v1/accounts/get_transfer_detail_list/`
  }
  return request({
    url: urlObj[data],
    method: 'get',
    params
  })
}

// new发票记录
export function getInvoiceApi(params) {
  return request({
    url: `/v1/accounts/get_invoice_detail_list/`,
    method: 'get',
    params
  })
}
export function exportInvoiceApi(params) {
  return request({
    url: `/v1/accounts/excel/get_invoice_detail_list/`,
    method: 'get',
    params
  })
}
// 部分结账
export function addCalApi(data) {
  return request({
    url: `/v1/accounts/add_calculate_record/`,
    method: 'post',
    data
  })
}
// 临客帐挂帐
export function dumpApi(data) {
  return request({
    url: `/v1/accounts/add_transfer_dump_detail/`,
    method: 'post',
    data
  })
}
// 临客帐详情
export function dumpChargeApi(params) {
  return request({
    url: `/v1/accounts/get_dumb_charge_detail_list/`,
    method: 'get',
    params
  })
}
// 临客帐详情
export function exportDumpChargeApi(params) {
  return request({
    url: `/v1/accounts/excel/get_dumb_charge_detail_list/`,
    method: 'get',
    params
  })
}
// 消费详情
export function chargrDetailApi(id, params) {
  return request({
    url: `/v1/accounts/get_charge_detail_info/${id}/`,
    method: 'get',
    params
  })
}

// 账务导出
export function exportListApi(data) {
  return request({
    url: `/v1/accounts/get_charge_detail_report/`,
    method: 'post',
    data
  })
}
// 2020-10-14
// 导出历史临客帐
export function exportLinkAccuntApi(params) {
  return request({
    url: `/v1/accounts/excel/get_dumb_history_list`,
    method: 'get',
    params
  })
}
// 临客帐历史账单
export function LinkAccuntApi(params) {
  return request({
    url: `/v1/accounts/get_dumb_history_list`,
    method: 'get',
    params
  })
}

export function newGetAccountLIstApi(data, params) {
  return request({
    url: `/v1/accounts/get_charge_detail_list/`,
    method: 'post',
    data,
    params
  })
}
// 账务详情导出
export function exportAccountLIstApi(data, params) {
  return request({
    url: `/v1/report/excel/get_charge_details_excel/`,
    method: 'post',
    data,
    params
  })
}
