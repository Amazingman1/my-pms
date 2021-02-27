import request from '@/utils/requestGongan'

export function gongAnApi(params) {
  return request({
    url: `/st/get_ee_records/`,
    method: 'get',
    params
  })
}

export function addApi(data) {
  return request({
    url: `/st/add_employee/`,
    method: 'post',
    data
  })
}
// 更改从业人员
export function editApi(data) {
  return request({
    url: `/st/alter_employee/`,
    method: 'put',
    data
  })
}
// 获取公安上传记录
export function getUploadRecApi(params) {
  return request({
    url: `/st/get_ps_records/`,
    method: 'get',
    params
  })
}
// 获取名族列表
export function getNationList() {
  const obj = {
    '汉族': '01',
    '蒙古族': '02',
    '回族': '03',
    '藏族': '04',
    '维吾尔族': '05',
    '苗族': '06',
    '彝族': '07',
    '壮族': '08',
    '布依族': '09',
    '朝鲜族': '10',
    '满族': '11',
    '侗族': '12',
    '瑶族': '13',
    '白族': '14',
    '土家族': '15',
    '哈尼族': '16',
    '哈萨克族': '17',
    '傣族': '18',
    '黎族': '19',
    '傈僳族': '20',
    '佤族': '21',
    '畲族': '22',
    '高山族': '23',
    '拉祜族': '24',
    '水族': '25',
    '东乡族': '26',
    '纳西族': '27',
    '景颇族': '28',
    '柯尔克孜族': '29',
    '土族': '30',
    '达斡尔族': '31',
    '仫佬族': '32',
    '羌族': '33',
    '布朗族': '34',
    '撒拉族': '35',
    '毛难族': '36',
    '仡佬族': '37',
    '锡伯族': '38',
    '阿昌族': '39',
    '普米族': '40',
    '塔吉克族': '41',
    '怒族': '42',
    '乌孜别克族': '43',
    '俄罗斯族': '44',
    '鄂温克族': '45',
    '崩龙族': '46',
    '保安族': '47',
    '裕固族': '48',
    '京族': '49',
    '塔塔尔族': '50',
    '独龙族': '51',
    '鄂伦春族': '52',
    '赫哲族': '53',
    '门巴族': '54',
    '珞巴族': '55',
    '基诺族': '56'
  }
  const arr = []
  Object.keys(obj).map(p => {
    const obj1 = {
      value: p,
      lable: p
    }
    arr.push(obj1)
  })
  return arr
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
// /st/request_verification
// 无证查询
export function searchNoCardApi(data) {
  return request({
    url: `/st/request_verification/`,
    method: 'post',
    data
  })
}
