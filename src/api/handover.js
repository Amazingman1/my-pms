/*
 * @Author: wangxuan
 * @Date: 2020-04-24 17:34:04
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-17 09:20:20
 * @FilePath: /vue-misb/src/api/handover.js
 */
import request from '@/utils/request'
//  员工信息
export function getStaffInfoApi(data) {
  return request({
    url: `/v1/common/employee/staff`,
    method: 'get'
    // params: data
  })
}
/*
  前台入账明细
*/
export function getListApi(params, inx) {
  const urlObj = {
    0: `/v1/report/change_shifts_record/account_charge_details/`, // 前台入账明细
    1: `/v1/report/change_shifts_record/charge_summary_by_date/`, // 前台入账简表
    2: `/v1/report/change_shifts_record/account_pay_details/?subject=pay`, // 前台收款明细
    15: `/v1/report/change_shifts_record/account_pay_details/?subject=refund`, // 前台退款明细
    3: `/v1/report/change_shifts_record/pay_summary_by_date/`, // 前台收退款汇总
    4: `/v1/report/change_shifts_record/transfer_details_by_date/`, // 前台转账明细
    5: `/v1/report/change_shifts_record/arrange_operation_by_date/`, // 冲调账报表
    6: `/v1/report/change_shifts_record/ar_account_charge_details/`, // AR入账明细
    7: `/v1/report/change_shifts_record/ar_charge_summary_by_date/`, // AR入账简表
    8: `/v1/report/change_shifts_record/ar_account_pay_details/`, // AR收款明细
    9: `/v1/report/change_shifts_record/ar_pay_summary_by_date/`, // AR收款简表
    10: ``, // 客房中心入账汇总表
    11: ``, // 商务中心入账汇总表
    12: ``, // 储值卡款项汇总表
    13: ``, // 储值卡充值明细表
    14: `` // 储值卡消费明细表
  }
  if (urlObj[inx] === ``) {
    //  缺失接口防止报错
    return request({
      url: urlObj[0],
      method: 'get',
      params
    })
  } else {
    return request({
      url: urlObj[inx],
      method: 'get',
      params
    })
  }
}
// 下载
export function downListApi(params, inx) {
  const urlObj = {
    0: `/v1/report/change_shifts_record/excel/account_charge_details/`, // 前台入账明细
    1: `/v1/report/change_shifts_record/excel/charge_summary_by_date/`, // 前台入账简表
    2: `/v1/report/change_shifts_record/excel/account_pay_details/?subject=pay`, // 前台收款明细
    15: `/v1/report/change_shifts_record/excel/account_pay_details/?subject=refund`, // 前台退款明细
    3: `/v1/report/change_shifts_record/excel/pay_summary_by_date/`, // 前台收退款汇总
    4: `/v1/report/change_shifts_record/excel/transfer_details_by_date/`, // 前台转账明细
    5: `/v1/report/change_shifts_record/excel/arrange_operation_by_date/`, // 冲调账报表
    6: `/v1/report/change_shifts_record/excel/ar_account_charge_details/`, // AR入账明细
    7: `/v1/report/change_shifts_record/excel/ar_charge_summary_by_date/`, // AR入账简表
    8: `/v1/report/change_shifts_record/excel/ar_account_pay_details/`, // AR收款明细
    9: `/v1/report/change_shifts_record/excel/ar_pay_summary_by_date/`, // AR收款简表
    10: ``, // 客房中心入账汇总表
    11: ``, // 商务中心入账汇总表
    12: ``, // 储值卡款项汇总表
    13: ``, // 储值卡充值明细表
    14: `` // 储值卡消费明细表
  }
  if (urlObj[inx] === ``) {
    //  缺失接口防止报错
    return request({
      url: urlObj[0],
      method: 'get',
      params
    })
  } else {
    return request({
      url: urlObj[inx],
      method: 'get',
      params
    })
  }
}
