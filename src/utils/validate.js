import { isCheckinInfoApi } from '@/api/checkin'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor', 'zpj']
  return valid_map.indexOf(str.trim()) >= 0
}
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validStr(str) {
  if (!str) {
    return
  }
  const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/
  return reg.test(str.trim())
}

/**
 * @param tel
 * @returns {boolean}
 */
export function validTel(tel) {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(tel)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}
/**
 * 身份证号校验
 * @param idcode
 * @returns {boolean}
 */
export function validateIdCard(id) {
  // 15位和18位身份证号码的正则表达式
  var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
  // 号码规则校验
  if (!format.test(id)) {
    return false
  }
  // 区位码校验
  // 出生年月日校验   前正则限制起始年份为1900;
  var year = id.substr(6, 4); var // 身份证年
    month = id.substr(10, 2); var // 身份证月
    date = id.substr(12, 2); var // 身份证日
    time = Date.parse(month + '-' + date + '-' + year); var // 身份证日期时间戳date
    now_time = Date.parse(new Date()); var // 当前时间戳
    dates = (new Date(year, month, 0)).getDate()// 身份证当月天数
  if (time > now_time || date > dates) {
    return false
  }
  // 校验码判断
  // eslint-disable-next-line no-array-constructor
  var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2) // 系数
  // eslint-disable-next-line no-array-constructor
  var b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2') // 校验码对照表
  var id_array = id.split('')
  var sum = 0
  for (var k = 0; k < 17; k++) {
    sum += parseInt(id_array[k]) * parseInt(c[k])
  }
  if (id_array[17].toUpperCase() !== b[sum % 11].toUpperCase()) {
    return false
  }
  return true
}

// 校验宾客是否已入住
export function isCheckinInfo(value, callback) {
  isCheckinInfoApi({ value }).then(res => {
    const { data } = res
    if (data.is_checkin === 1) {
      callback(new Error('宾客已入住!'))
    } else {
      callback()
    }
  })
}

/**
 * @param 正整数和小数小数两位数
 * @returns {boolean}
 */
export function validTels(tel) {
  const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
  return reg.test(tel)
}
