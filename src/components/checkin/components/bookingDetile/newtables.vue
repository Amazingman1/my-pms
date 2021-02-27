<!--
 * @Author: wangxuan
 * @Date: 2020-11-27 15:46:21
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-01 19:31:59
 * @FilePath: /vue-misb/src/components/checkin/components/bookingDetile/newtables.vue
-->
<template>
  <div>
    <el-table
      :data="propsData.reserve_rt_rate"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="room_number_list" label="房间号" show-overflow-tooltip />
      <el-table-column prop="room_type_desc" label="房型描述" show-overflow-tooltip />
      <el-table-column prop="rate_code_desc" label="房价码" />
      <el-table-column prop="room_count" width="60" label="房间" />
      <el-table-column prop="check_in_count" width="60" label="已住" />
      <el-table-column prop="arr_time" label="抵达时间" />
      <el-table-column prop="days" width="60" label="天数" />
      <el-table-column prop="leave_time" label="离开时间" />
      <el-table-column prop="code_market_desc" label="市场码" />
      <el-table-column prop="code_src_desc" label="来源码" />
      <el-table-column prop="price" width="60" label="房价" />
      <el-table-column prop="remark" label="备注" show-overflow-tooltip />
      <el-table-column prop="packages" label="操作" width="125" fixed="right">
        <template slot-scope="scope">
          <el-link :underline="false" type="primary" :disabled="scope.row.room_count === scope.row.check_in_count" @click="setRoomSort(scope.row)">排 房</el-link>
          <el-link :underline="false" type="warning" @click="editRow(scope.row)">修 改</el-link>
          <el-link :underline="false" type="danger" :disabled="scope.row.check_in_count>0" @click="deleteEidt(scope.row, scope.$index)">删 除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <RoomSort ref="RoomSort" :parm-data="parmData" @getRoomList="selectRoom" />
    <AddNewBookingRoom ref="AddNewBookingRoom" :props-data="form" edit-room @rush="$emit('rush')" />
  </div>
</template>

<script>
// import { saerchData } from '@/api/home'
import { bookUpdataApi, deleteReserveApi } from '@/api/book'
// import { parseTime, checkArry } from '@/utils/index'
import RoomSort from '@/components/newBooking/components/roomSort'
import AddNewBookingRoom from './addNewBookingRoom'

export default {
  components: { RoomSort, AddNewBookingRoom },
  inject: ['banseInfo'],

  props: {
    status: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      loading: false,
      form: {},
      parmData: {}
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
    // 确认排房
    selectRoom(val) {
      console.log(val, '选中的房间')
      this.form.room_number_list = val.length > 0 ? val.join(',') : ''
      if (val.length <= this.parmData.room_count) {
        this.edit(this.form)
      } else {
        this.$message.warning(`当前只能排${this.parmData.room_count}间`)
      }
    },
    // 排房
    setRoomSort(row) {
      console.log(row.check_in_count, '一株发那个叫爱你')
      this.form = { ...row }
      this.$refs.RoomSort.show()
      this.parmData = {
        start_time: this.propsData.arr_time,
        end_time: this.propsData.leave_time,
        // room_no: this.propsData.room_no,
        room_type: row.room_type,
        room_count: row.room_count - row.check_in_count
      }
    },
    // 修改
    editRow(row) {
      this.loading = false
      this.form = { ...row }
      this.$refs.AddNewBookingRoom.show()
    },
    // 删除已预定的房型
    deleteEidt(row) {
      const params = {
        rt_rate: {
          id: row.id
        },
        reserve_base: this.propsData.id
      }
      deleteReserveApi(params).then(res => {
        this.$message.success('删除成功!')
        this.$emit('rush')
      })
    },
    // 确认排房
    edit(row) {
      this.loading = true
      console.log(row, 888888)
      const params = {
        rt_rate: row,
        reserve_base: this.propsData.id
      }
      bookUpdataApi(params).then(res => {
        this.$message.success('排房成功！')
        this.$emit('rush')
        this.loading = false
      }).catch(() => {
        console.log(9999)
        this.loading = false
      })
    }
  }
}
</script>
