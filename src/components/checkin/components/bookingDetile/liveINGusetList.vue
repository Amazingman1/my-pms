<!--
 * @Author: wangxuan
 * @Date: 2020-12-03 20:35:02
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-04 14:05:48
 * @FilePath: /vue-misb/src/components/checkin/components/bookingDetile/liveINGusetList.vue
-->
<template>
  <el-table
    :data="tableData"
    stripe
    height="391"
    style="width: 100%"
  >
    <el-table-column
      type="index"
      label="序号"
    />
    <el-table-column
      prop="room_number"
      label="房间号"
    />

    <el-table-column
      prop="name"
      label="姓名"
    />
    <el-table-column
      prop="sex"
      label="性别"
    />
    <el-table-column
      prop="telephone"
      :show-overflow-tooltip="true"
      label="手机号码"
    />
    <el-table-column
      prop="id_code"
      label="证件类型"
    />
    <el-table-column
      prop="id_no"
      :show-overflow-tooltip="true"
      label="证件号码"
    />
  </el-table>
</template>

<script>
import { getWillApi } from '@/api/book'

export default {
  inject: ['banseInfo'],
  data() {
    return {
      tableData: []
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
    getWill() {
      getWillApi({ reserve_base: this.propsData.id }).then(res => {
        const { data } = res
        this.tableData = data.results
      })
    }
  }
}
</script>

<style>

</style>
