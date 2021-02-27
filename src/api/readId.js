/*
 * @Author: wangxuan
 * @Date: 2020-09-03 20:37:26
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-11-10 20:48:31
 * @FilePath: /vue-misb/src/api/readId.js
 */
import request from '@/utils/readId'
import g_localStorage from '@/utils/saveLogal'

export function readIdApi(id, data) {
  return request({
    url: `/hc/room/room_lock/scanning_id_card/${g_localStorage.getItem('cashId')}`,
    method: 'get',
    data
  })
}
