import request from '@/utils/request'

// 查房记录列表
export function getSweepistApi(params) {
  return request({
    url: '/v1/task/room_service/get_room_check_list/',
    method: 'get',
    params
  })
}
// 新增查房
export function addCheckRoomApi(data) {
  return request({
    url: '/v1/task/room_service/add_room_check/',
    method: 'post',
    data
  })
}

// 获取在住房间
export function getMasterList(params) {
  return request({
    url: `/v1/bill/get_master_base_list_only/`,
    method: 'get',
    params
  })
}
// 删除查房任务
export function deletRoomCheckApi(id) {
  return request({
    url: `/v1/task/room_service/remove_room_check/${id}/`,
    method: 'post'
  })
}
// 删除查房任务
export function overRoomCheckApi(id) {
  return request({
    url: `/v1/task/room_service/update_room_check/${id}/`,
    method: 'post'
  })
}
// 获取打扫记录
export function getSweepListApi(params) {
  return request({
    url: `/v1/task/room_service/get_sweep_list/`,
    method: 'get',
    params
  })
}
// 新建打扫任务
export function addSweepListApi(data) {
  return request({
    url: `/v1/task/room_service/add_sweep/`,
    method: 'post',
    data
  })
}
// 删除打扫任务
export function removeSweepListApi(id) {
  return request({
    url: `/v1/task/room_service/remove_sweep/${id}/`,
    method: 'post'
  })
}
