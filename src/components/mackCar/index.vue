<!--
 * @Author: wangxuan
 * @Date: 2020-11-23 14:34:15
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-14 16:48:23
 * @FilePath: /vue-misb/src/components/mackCar/index.vue
-->
<template>
  <div />
</template>

<script>
import { makeCarApi } from '@/api/checkin'
import { carldApi } from '@/api/card'
// import { parseTime } from '@/utils/index'

import g_localStorage from '@/utils/saveLogal'

export default {
  props: {
    opetion: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    makeCar() {
      this.$nextTick(() => {
        const { operate_type, end_time, room_no, start_time, reference_type, reference_id, lock_number } = this.opetion
        console.log(this.opetion, 'shsiis')
        makeCarApi({
          operate_type, // 1, "读卡"), (2, "写卡"), (4, "销卡"),
          start_time,
          // start_time: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'),
          end_time,
          room_no,
          guest_no: 0,
          reference_type, // 1表示入住单 2表示预定单 3表示非订单
          reference_id,
          lock_number,
          cash_id: g_localStorage.getItem('cashId')
        }).then(res => {
          const { data } = res
          this.zhicard(data.url, data.id)
        })
      })
    },
    zhicard(url, id) {
      url = url.replace('angular.callbacks._1', 'userHandler') // 替换
      this.$http.jsonp(url, {
        jsonpCallback: 'userHandler'
      }).then(res => {
        if (res.body.Result === true) {
          this.$message.success('制卡成功!')
          this.carld(id)
          this.$emit('rush')
        } else {
          this.$message.warning('制卡失败!')
        }
      }).catch(() => {
        this.$message.warning('本地服务未开启!')
      })
    },
    carld(id) {
      carldApi(id)
    }

  }
}
</script>

<style>

</style>
