/*
 * @Author: wangxuan
 * @Date: 2020-11-23 14:34:15
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-11-27 13:58:56
 * @FilePath: /vue-misb/src/api/report.js
 */
import request from '@/utils/request'

export function getReportApi(inx, data, params) {
  const urlObj = {
    0: `/v1/report/comprehensive/report_arrange_detail_list/`, // 冲调账报表
    1: `/v1/report/comprehensive/report_ar_charge_summary_by_date/`, // *AR入账简表
    2: `/v1/report/comprehensive/report_ar_account_real_time/`, // *AR账户实时余额表
    3: ``, // AR账户收款汇总表
    4: `/v1/report/comprehensive/report_ar_account_pay_details/`, // *AR付款明细
    5: `/v1/report/comprehensive/report_ar_pay_summary_by_date/`, // *AR收款简表
    6: `/v1/report/comprehensive/report_ar_account_charge_details/`, // *AR入账明细报表
    7: ``, // 催账报表
    8: ``, // 消费详情报表
    9: ``, // 收银清单
    10: `/v1/report/comprehensive/report_transfer_details_by_date/`, // 前台转账记录
    11: `/v1/report/comprehensive/biz_date_daily_interval_report/`, // *营业日报（区间）表
    12: `/v1/report/comprehensive/biz_date_daily_report/`, // 营业日报表
    25: `/v1/report/comprehensive/report_current_in_live_master_guest_list/`, // 当前在住
    61: `/v1/report/comprehensive/report_today_arrival_reserve_base_list/`, // 本日将到
    36: `/v1/report/get_today_arr_master/`, // 本日在住散客
    29: `/v1/report/get_current_guest/`, // 当前在住客人
    62: `/v1/report/get_room_rental_analysis/`, // 客房房间出租分析表
    31: `/v1/report/comprehensive/report_change_room_list/`, // 换房该房价
    45: `/v1/report/get_today_room_map_list/`, // 当前房态
    63: `/v1/report/comprehensive/report_dump_account_charge_details/`, // 哑房帐
    64: `/v1/report/comprehensive/report_today_leave_master_base_list/` // 本日离店客人报表
  }
  return request({
    url: urlObj[inx],
    method: 'post',
    data,
    params
  })
}

export function downReportApi(inx, data, params) {
  const urlObj = {
    0: `/v1/report/comprehensive/excel/report_arrange_detail_list/`, // 冲调账报表
    1: `/v1/report/comprehensive/excel/report_ar_charge_summary_by_date/`, // *AR入账简表
    2: `/v1/report/comprehensive/excel/report_ar_account_real_time/`, // *AR账户实时余额表
    3: ``, // AR账户收款汇总表
    4: `/v1/report/comprehensive/excel/report_ar_account_pay_details/`, // *AR付款明细
    5: `/v1/report/comprehensive/excel/report_ar_pay_summary_by_date/`, // *AR收款简表
    6: `/v1/report/comprehensive/excel/report_ar_account_charge_details/`, // *AR入账明细报表
    7: ``, // 催账报表
    8: ``, // 消费详情报表
    9: ``, // 收银清单
    10: `/v1/report/comprehensive/excel/report_transfer_details_by_date/`, // 前台转账记录
    11: `/v1/report/comprehensive/excel/biz_date_daily_interval_report/`, // *营业日报（区间）表
    12: `/v1/report/comprehensive/excel/biz_date_daily_report/`, // 营业日报表
    25: `/v1/report/comprehensive/excel/report_current_in_live_master_guest_list/`, // 当前在住
    61: `/v1/report/comprehensive/excel/report_today_arrival_reserve_base_list/`, // 本日将到
    36: `/v1/report/excel/get_today_arr_master/`, // 本日在住散客
    29: `/v1/report/excel/get_current_guest/`, // 当前在住客人
    62: `/v1/report/excel/get_room_rental_analysis/`, // 客房房间出租分析表
    31: `/v1/report/excel/comprehensive/report_change_room_list/`, // 换房该房价
    45: `/v1/report/excel/get_today_room_map_list/`, // 当前房态
    63: `/v1/report/excel/comprehensive/report_dump_account_charge_details/`, // 哑房帐
    64: `/v1/report/comprehensive/excel/report_today_leave_master_base_list/` // 本日离店客人报表
  }
  return request({
    url: urlObj[inx],
    method: 'post',
    data,
    params
  })
}
