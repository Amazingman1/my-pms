import request from '@/utils/request'
//  消息列表
export function getMessageListApi(params) {
  return request({
    url: `/v1/system/push_msg/get_message_list/`,
    method: 'get',
    params
  })
}
// 删除信息
export function deleteMessageListApi(data) {
  return request({
    url: `/v1/system/push_msg/remove_message/`,
    method: 'post',
    data
  })
}
