/*
 * @Author: wangxuan
 * @Date: 2020-09-16 13:58:52
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-29 16:03:55
 * @FilePath: /vue-misb/src/utils/url.js
 */

export const baseUrl = process.env.NODE_ENV === 'development'
  ? `http://tauth.crowncrystalhotel.com/`
  : `/api/pms_auth/`// 新权限

// ? `http://pauth.crowncrystalhotel.com/`
// : `http://tauth.crowncrystalhotel.com`// 新权限
export const goUrl = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
  ? `http://www.eloadspider.com/mis/#/initial-login`
  : `http://www.eloadspider.com/erp/#/initial-login`// 店长条状jie

export const websocketUrl = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
  ? `ws://tpms.eloadspider.com/api/pms_ws/message/`
  : `ws://pms.eloadspider.com/api/pms_ws/message/` // websocket
export const gongAnUrl = process.env.NODE_ENV === 'development'
  ? `http://47.98.113.173:9540` // 开发环境 http://192.168.4.40:8000
  : `/api/pms_public_security/` // 生产环境

export const vistory = process.env.NODE_ENV === 'development'
  ? `http://47.98.113.173:9503` // 开发环境
  : `/api/pms_duty/` // 生产环境

export const readId = process.env.NODE_ENV === 'development'
  ? `http://hw.crowncrystalhotel.com` // 开发环境
  : `/api/pms_duty/` // 生产环境
