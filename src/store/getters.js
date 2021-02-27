/*
 * @Author: wangxuan
 * @Date: 2020-10-19 18:56:27
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-29 16:02:58
 * @FilePath: /vue-misb/src/store/getters.js
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userObj: state => state.user.userObj,
  ruleRouter: state => state.user.ruleRouter,
  guestlist: state => state.user.guestlist,
  tel: state => state.user.tel,
  addres: state => state.user.addres,
  photoTel: state => state.user.photoTel,
  starTime: state => state.user.starTime,
  roomSatusMap: state => state.housStatus.roomSatusMap,
  copyStatusList: state => state.housStatus.copyStatusList,
  newCopyStatusList: state => state.housStatus.newCopyStatusList,
  roomSta: state => state.housStatus.roomSta,
  hosuLoading: state => state.housStatus.hosuLoading,
  valid: state => state.housStatus.valid,
  cashAList: state => state.checkin.cashAList,
  websock: state => state.websocket.websock,
  messageList: state => state.websocket.messageList
}
export default getters
