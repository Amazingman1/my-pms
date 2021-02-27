<!--
 * @Author: wangxuan
 * @Date: 2020-12-03 19:44:10
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-04 14:01:15
 * @FilePath: /vue-misb/src/components/checkin/components/bookingDetile/gusetList.vue
-->
<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      height="343"
    >
      <el-table-column
        type="index"
        label="序号"
      />
      <el-table-column
        prop="room_number"
        width="200"
        label="房间号"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.room_number"
            placeholder="全部房间"
            size="mini"
          >
            <el-option
              v-for="item in hoseList"
              :key="item.room_number"
              :label="item.room_number"
              :value="item.room_number"
              :disabled="item.count === 0"
            >
              <span style="float: left">{{ item.room_number }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">可排人数{{ item.count }}</span>
            </el-option>
          </el-select>
        </template>
      </el-table-column>
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
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="save(scope.row)">保存</el-button>
          <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { updateGuestApi, deleteGuestApi, getCanGuestApi, getCanHoseApi } from '@/api/book'
export default {
  inject: ['banseInfo'],
  data() {
    return {
      tableData: [],
      hoseList: []
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
    // 获取未入住宾客
    getgetCanGuest() {
      getCanGuestApi({ reserve_base: this.propsData.id }).then(res => {
        this.tableData = res.data.results
        this.getCanGuestList()
      })
    },
    // 获取排房列表
    getCanGuestList() {
      getCanHoseApi(this.propsData.id).then(res => {
        this.hoseList = res.data
      })
    },
    getCode(arr, str, _kye) {
      const key = arr.filter(p => {
        return str === p.room_number
      })
      if (key.length > 0) {
        return key[0][_kye]
      } else {
        return ''
      }
    },
    save(val) {
      const params = {
        room_number: val.room_number,
        reserve_rt_rate: this.getCode(this.hoseList, val.room_number, 'rt_rate_id')
      }
      updateGuestApi(val.id, params).then(res => {
        this.$message.success('保存成功!')
        this.getCanGuestList()
      })
    },
    deleteRow(val) {
      deleteGuestApi(val.id).then(res => {
        this.$message.success('删除成功!')
        this.getgetCanGuest()
      })
    }
  }
}
</script>

<style>

</style>
