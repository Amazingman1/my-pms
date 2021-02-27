// 线上 https://duty.eloadspider.com
// 线下 http://47.98.113.173:9503
// 访客 查询/v1/security/visitor/list
// 访客 新增/v1/security/visitor/add
// 删除 /v1/security/visitor/delete/
import request from '@/utils/vistory'

export function getVisitorApi(params) {
  return request({
    url: `/v1/security/visitor/list`,
    method: 'get',
    params
  })
}
// 新增访客
export function addVisitorApi(data) {
  return request({
    url: `/v1/security/visitor/add`,
    method: 'post',
    data
  })
}
// 删除访客记录
export function deleteVisitorApi(id, params) {
  return request({
    url: `/v1/security/visitor/delete/${id}`,
    method: 'get',
    params
  })
}
// 境内境外上传公安
export function upnatePolice(data) {
  return request({
    url: `/st/check_in/`,
    method: 'post',
    data
  })
}

// 证件
export function getNationCodeApi(params) {
  return request({
    url: `/st/gfd/`,
    method: 'get',
    params
  })
}

// 境内境外退房
export function checkOutPoliceApi(data) {
  return request({
    url: `/st/check_out/`,
    method: 'put',
    data
  })
}

