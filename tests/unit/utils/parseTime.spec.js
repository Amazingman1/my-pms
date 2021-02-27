/*
 * @Author: wangxuan
 * @Date: 2020-03-23 17:22:38
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-10 16:39:54
 * @FilePath: /vue-misb/tests/unit/utils/parseTime.spec.js
 */
import { parseTime } from '@/utils/index.js'

describe('Utils:parseTime', () => {
  const d = new Date('2018-07-13 17:54:01') // "2018-07-13 17:54:01"
  it('timestamp', () => {
    expect(parseTime(d)).toBe('2018-07-13 17:54:01')
  })
  it('ten digits timestamp', () => {
    expect(parseTime((d / 1000).toFixed(0))).toBe('2018-07-13 17:54:01')
  })
  it('new Date', () => {
    expect(parseTime(new Date(d))).toBe('2018-07-13 17:54:01')
  })
  it('format', () => {
    expect(parseTime(d, '{y}-{m}-{d} {h}:{i}')).toBe('2018-07-13 17:54')
    expect(parseTime(d, '{y}-{m}-{d}')).toBe('2018-07-13')
    expect(parseTime(d, '{y}/{m}/{d} {h}-{i}')).toBe('2018/07/13 17-54')
  })
  it('get the day of the week', () => {
    expect(parseTime(d, '{a}')).toBe('星期五') // 星期五
  })
  it('get the day of the week', () => {
    expect(parseTime(+d + 1000 * 60 * 60 * 24 * 2, '{a}')).toBe('周日') // 星期日
  })
  it('empty argument', () => {
    expect(parseTime()).toBeNull()
  })
})
