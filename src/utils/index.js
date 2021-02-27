/**
 * Created by PanJiaChen on 16/11/18.
 */
import axios from 'axios'

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['周日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}
/**
 * @param {Arry, string} list key
 * @returns {Arrar}
 */
export function checkArry(list, key) {
  if (typeof list !== 'object' && typeof key !== 'string') {
    console.error('list or key type is not "Arry" or "String"')
  }
  const arr = []
  list.map(v => {
    arr.push(v[key] || 0)
  })
  return arr
}

/**
 * 过滤对象中 值为 空字符串的键
 * @param {Object} obj key
 * @returns {Object}
 */
export function filterParams(obj) {
  var _newPar = {}
  for (var key in obj) {
    // 如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。
    if ((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
      _newPar[key] = obj[key]
    }
  }
  return _newPar
}
/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
/**
 * 多维数组转化一维数组
 * @param arr
 * @param type
 * @returns {Array}
 */
export function sortList(arr, type) {
  let arr1 = []
  if (typeof arr === 'object') {
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        if (arr[i] && isArray(arr[i])) {
          arr1 = [...arr1, ...sortList(arr[i], type)]
        } else if (arr[i] && typeof arr[i] === 'object') {
          if (!arr[i].hasOwnProperty(type) || !isArray(arr[i][type]) || arr[i][type].length <= 0) {
            arr1.push(arr[i])
          } else {
            arr1.push(arr[i])
            arr1 = [...arr1, ...sortList(arr[i][type], type)]
          }
        } else {
          arr1.push(arr[i])
        }
      }
    }
  }
  return arr1
}

/**
 * 多维数组转化一维数组
 * @param arr
 * @param type
 * @returns {Array}
 */
export function arrObjToArr(arr, type, newKye) {
  const arr1 = []
  arr.map(p => {
    if (p.hasOwnProperty(type)) {
      const obj1 = filterObj(p[type], newKye)
      const obj = {
        ...p,
        ...obj1
      }
      arr1.push(obj)
    } else {
      const obj = {
        ...p
      }
      arr1.push(obj)
    }
  })
  return arr1
}
export function filterObj(obj, newKye) {
  var _newPar = {}
  for (var key in obj) {
    if (obj[key] !== null && key !== newKye) {
      _newPar[key] = obj[key]
    }
  }
  return _newPar
}
// 转blob
export function blobToFile(theBlob, fileName) {
  theBlob.lastModifiedDate = new Date()
  theBlob.name = fileName + new Date().getTime()
  return theBlob
}
// base64 转换二进制文件
export function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime
  })
}
/**
 * 图片上传
 * @param upload // base64图片
 * @then url
 */
export function uploadPhoto(upload) {
  return new Promise((resolve, reject) => {
    const blob = dataURLtoBlob(upload)
    const file = blobToFile(blob, 'checkin')
    const formData = new FormData()
    // const url = `http://oss.crowncrystalhotel.com/resource/icon/upload`
    const url = `/api/pms_oss/resource/icon/upload`
    formData.append('file', file, 'image.png')
    const config = { headers: { 'Content-Type': 'multipart/form-data' }}
    const promise = axios.post(url, formData, config)
    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

/**
 * 数组对象去重
 * @param {arr} Array
 * @param {str} String
 * @return {*} Array
 */
export function deleteSameObj(arr, str) {
  const hash = {}
  const newArr = arr.reduce((item, next) => {
    hash[next[str]] ? '' : hash[next[str]] = true && item.push(next)
    return item
  }, [])
  return newArr
}
/**
 * 身份证号计算生日
 * @param {idCard} Number
 */
export function getBirthdayFromIdCard(idCard) {
  let birthday = ''
  if (idCard !== null && idCard !== '') {
    if (idCard.length === 15) {
      birthday = '19' + idCard.substr(6, 6)
    } else if (idCard.length === 18) {
      birthday = idCard.substr(6, 8)
    }
    birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
  }
  return birthday
}

/**
 * 判断师傅是团队
 * @param {val} Number
 */
export function isTeam(val) {
  const arr = [3, 4]
  return arr.includes(val)
}

export function accAdd(arg1, arg2) {
  var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  } try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) { r2 = 0 } m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

/**
 * 计算离店时间
 * @param {val} Object
 * @return {str}
 */
export function leveTime({ arrTime, days }) {
  const begintime = parseTime(arrTime, '{y}-{m}-{d} {h}:{i}:{s}')
  const time = new Date(Date.parse(parseTime(begintime))).getTime() + days * 24 * 60 * 60 * 1000
  return parseTime(time, '{y}-{m}-{d}') + ' 14:00:00'
}

/**
 * 计算离店时间
 * @param {val} Object
 * @return {str}
 */
export function selectDay({ arrTime, leaveTime }) {
  const begintime = new Date(Date.parse(parseTime(arrTime, '{y}-{m}-{d}'))).getTime()
  const endtime = new Date(Date.parse(parseTime(leaveTime, '{y}-{m}-{d}'))).getTime()
  const nTime = endtime - begintime
  const day = Math.ceil(nTime / 86400000)
  return day
}
