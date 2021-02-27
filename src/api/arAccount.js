/*
 * @Author: wangxuan
 * @Date: 2020-11-23 14:34:15
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-25 11:20:44
 * @FilePath: /vue-misb/src/api/arAccount.js
 */
import request from '@/utils/request'
/*
7-22
AR账户明细*/
export function getArAccountApi(params, id) {
  return request({
    url: '/v1/accounts/get_ar_account_list/',
    method: 'get',
    params,
    id
  })
}
/* 获取的付款详情 */
export function getPayArApi(data, params) {
  return request({
    url: `/v1/accounts/get_charge_detail_list/`,
    method: 'post',
    data,
    params
  })
}
/* 退款 */

export function getRefundArApi(data) {
  return request({
    url: `/v1/accounts/refund/`,
    method: 'post',
    data
  })
}
/* 获取AR账户 */
export function getArApi(params) {
  return request({
    url: `/v1/accounts/get_ar_account_list/`,
    method: 'get',
    params
  })
}
/* 获取AR详情账户 */
export function getArInfoApi(id, params) {
  return request({
    url: `/v1/accounts/get_ar_account_info/${id}/`,
    method: 'get',
    params
  })
}

/* 导出ar详情 */
export function exportArInfoApi(data) {
  return request({
    url: `/v1/report/excel/get_charge_details_excel/?&subject__in=consume,pay,refund`,
    method: 'post',
    data
  })
}
