import request from '@/utils/request'
import reauestCopy from '@/utils/reauestCopy'
//  获取入住单详情信息
export function getMasterInfo(data) {
  return request({
    url: `/v1/bill/get_master_base_info/${data}/`,
    method: 'get'
    // params: data
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
// 员工列表
export function getStaffList(params) {
  return request({
    url: '/v1/common/employee/info_list',
    method: 'get'
  })
}

// 获取可用房间
export function getCanLiveRoom(data, params) {
  return request({
    url: '/v1/room/room_status/can_live_room_list/',
    method: 'post',
    data,
    params
  })
}
// 获取可房间
export function changeRoomApi(data, id) {
  return request({
    url: `/v1/bill/change_room/${id}/`,
    method: 'post',
    data
  })
}
// 提前离店
export function leaveShopApi(data, id) {
  return request({
    url: `/v1/bill/leave_early/${id}/`,
    method: 'post',
    data
  })
}
// 续住
export function continuedToLiveApi(data, id) {
  return request({
    url: `/v1/bill/continued_live/${id}/`,
    method: 'post',
    data
  })
}
// 修改价格
export function changPirceApi(data, id) {
  return request({
    url: `/v1/bill/update_room_price/${id}/`,
    method: 'post',
    data
  })
}
// 可联房列表
export function editRoomApi(params) {
  return request({
    url: `/v1/bill/can_combine_master_list/`,
    method: 'get',
    params
  })
}
// 查询房列表
export function getCombineListApi(id) {
  return request({
    url: `/v1/bill/get_combine_master_list/${id}/`,
    method: 'get'
  })
}
// 编辑联防保存
export function updataCombineApi(data) {
  return request({
    url: `/v1/bill/combine_master/`,
    method: 'post',
    data
  })
}
// 打印信息
export function printApi(data) {
  return request({
    url: `/v1/report/receipt/master_base_summary/`,
    method: 'post',
    data
  })
}
// 制卡
export function makeCarApi(data) {
  return request({
    url: `/v1/room/room_lock/activate_card/`,
    method: 'post',
    data
  })
}
// 收银点
export function cashApi(data) {
  return request({
    url: `/v1/accounts/get_cash_register_list/`,
    method: 'get',
    data
  })
}
// 入消费保存
export function addAccApi(data) {
  return request({
    url: `/v1/accounts/add_charge_detail/`,
    method: 'post',
    data
  })
}
// 付款
export function payApi(data) {
  return request({
    url: `/v1/accounts/pay/`,
    method: 'post',
    data
  })
}
// 支付验证
export function verifyApi(data) {
  return reauestCopy({
    url: `/v1/accounts/verify/`,
    method: 'post',
    data
  })
}
// 获取房型
export function roomTypeListApi(data) {
  return request({
    url: `/v1/room/room_status/get_room_type_list/`,
    method: 'get',
    data
  })
}
// 获取房型SS
export function roomTypeLisAccuntApi(params) {
  return request({
    url: `/v1/room/room_status/can_live_room_type_num/`,
    method: 'get',
    params
  })
}

// 入住
export function checkinApi(data) {
  return request({
    url: `/v1/bill/check_in/`,
    method: 'post',
    data
  })
}
//  获取证件类型
export function getIdTypeApi(data) {
  return request({
    url: `/v1/system/settings/get_code_base_sys_list/?parent_code=idcode`,
    method: 'get',
    params: data
  })
}
//  新建入住单获取默认数据
export function getCheckinINfoApi(params) {
  return request({
    url: `/v1/bill/check_in_info/`,
    method: 'get',
    params
  })
}
//  添加同住人
export function addMasterGuestApi(data) {
  return request({
    url: `/v1/bill/add_master_guest/`,
    method: 'post',
    data
  })
}
/* time 2020-5-8 */
//  获取操作日志
export function getLogListApi(params) {
  return request({
    url: `/v1/room/room_lock/get_door_lock_status_list/`,
    method: 'get',
    params
  })
}
//  修改宾客信息
export function editGuestsApi(data, id) {
  return request({
    url: `/v1/bill/update_master_guest/${id}/`,
    method: 'post',
    data
  })
}
//  修改基本信息
export function editOrdApi(data, id) {
  return request({
    url: `/v1/bill/update_master_base/${id}/`,
    method: 'post',
    data
  })
}
//  校验入住人是否已住
export function isCheckinInfoApi(data) {
  return request({
    url: `/v1/bill/is_checkin_info/`,
    method: 'post',
    data
  })
}
// 会员列表
export function getVipListApi(params) {
  return request({
    url: `/v1/customer/member/get_card_base_list/`,
    method: 'get',
    params
  })
}
// 会员列表
export function getAgreementListApi(params) {
  return request({
    url: `/v1/customer/company/get_company_base_list/`,
    method: 'get',
    params
  })
}

// 发放制卡券列表
export function createMakeCardCoupouApi(data) {
  return request({
    url: `/v1/bill/add_make_card_coupon/`,
    method: 'post',
    data
  })
}

// 2020-7-14

// 改价记录
export function getChangePriceRecodeApi(params) {
  return request({
    url: `/v1/bill/get_master_change_price_list/`,
    method: 'get',
    params
  })
}

// 换房记录
export function getChangeRoomRecodeApi(params) {
  return request({
    url: `/v1/bill/get_master_change_room_list/`,
    method: 'get',
    params
  })
}

// 续住记录
export function getContinuedLiveRecodeApi(params) {
  return request({
    url: `/v1/bill/get_master_continued_live_list/`,
    method: 'get',
    params
  })
}

// 发票列表
export function getInvoiceListApi(params) {
  return request({
    url: `/v1/accounts/get_invoice_detail_list/`,
    method: 'get',
    params
  })
}
// 发票抬头列表
export function getInvoiceTitleListApi(params) {
  return request({
    url: `/v1/accounts/get_invoice_title_list/`,
    method: 'get',
    params
  })
}
// 新增开票记录
export function addInvoiceApi(data) {
  return request({
    url: `/v1/accounts/add_invoice_detail/`,
    method: 'post',
    data
  })
}

// 2020-10-12
// 入团
export function enterTeam(data) {
  return request({
    url: `/v1/customer/team/in/member/`,
    method: 'post',
    data
  })
}

// 出团
export function outTeamApi(data) {
  return request({
    url: `/v1/customer/team/out/member/`,
    method: 'post',
    data
  })
}

// 没有联房设置联房
export function setNewCombinApi(data) {
  return request({
    url: `/v1/bill/combine_room/`,
    method: 'post',
    data
  })
}
// 新增联房接口
export function addCombinApi(data) {
  return request({
    url: `/v1/bill/combine_room_in/`,
    method: 'post',
    data
  })
}
// 设置主帐单
export function setMasterApi(data) {
  return request({
    url: `/v1/bill/set_combine_master/`,
    method: 'post',
    data
  })
}

// 解除联房
export function deleteMasterApi(data) {
  return request({
    url: `/v1/bill/combine_room_out/`,
    method: 'post',
    data
  })
}

// 入住去定房价
export function submintRoomPriceApi(data) {
  return request({
    url: `/v1/room/rate_code/get_rate_price_list/`,
    method: 'post',
    data
  })
}

// 导出团队
export function donloadTeamListApi(id) {
  return request({
    url: `/v1/report/excel/get_team_guest_list/${id}/`,
    method: 'get'
  })
}
