<!--
 * @Author: wangxuan
 * @Date: 2020-10-16 10:57:47
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-11-27 17:56:44
 * @FilePath: /vue-misb/src/components/checkin/components/bookingDetile/bookingRoomWite.vue
-->
<template>
  <div>
    <el-table
      v-loading="loading"
      :data="list"
      height="400"
      style="width: 100%"
      border
    >
      <el-table-column prop="room_number" label="房间号" />
      <el-table-column prop="rate_code" label="房价码" />
      <el-table-column prop="arr_time" label="入住时间" />
      <el-table-column prop="leave_time" label="离店时间" />
      <el-table-column prop="room_type_desc" label="房型" />
      <el-table-column label="状态">
        <template slot-scope="{row}">
          {{ row.is_check_in === 1? '已入住': '未入住' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="{row}">
          <el-button v-show=" row.is_check_in !== 1" type="text" size="mini" @click="cansleWiteRoom(row)">删 除</el-button>
          <el-button v-show=" row.is_check_in !== 1" type="text" size="mini" @click="cansleWiteRoom(row)">入 住</el-button>
          <!-- <el-button type="text" size="mini" @click="cansleWiteRoom(row)">删 除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { rowHouseListApi } from '@/api/book'

export default {
  inject: ['banseInfo'],

  data() {
    return {
      loading: false,
      list: [],
      accuntData: {}
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
    // 获取联防列表
    getrowHouseList() {
      console.log(this.propsData, 21)
      rowHouseListApi(this.propsData.id).then(res => {
        console.log(res, '排房列表')
        this.list = res.data
      })
    },
    // 解除联房
    cansleWiteRoom(val) {

    }
  }
}
</script>

<style>
  .info_value{
    margin-right: 5px;
    color: #000;
  }
</style>
