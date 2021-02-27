<!--
 * @Author: wangxuan
 * @Date: 2020-12-28 19:21:59
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-28 20:09:46
 * @FilePath: /vue-misb/src/views/nightTrial/componentes/preTable.vue
-->
<template>
  <el-dialog title="夜审预审" :visible.sync="dialogFormVisible" append-to-body width="60%">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      height="400"
      size="mini"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="room_type_desc"
        label="房型"
      />
      <el-table-column
        prop="room_number"
        label="房间"
        width="60"
      />
      <el-table-column
        prop="arr_time"
        label="入住时间"
      />
      <el-table-column
        prop="leave_time"
        label="离店时间"
      />
      <el-table-column
        prop="modify_datetime"
        label="操作时间"
      />
      <el-table-column
        prop="rt_rate.room_price"
        label="房价"
        width="80"
      >
        <template slot-scope="{row, $index}">
          <span v-if="!row.select">{{ row.rt_rate.room_price || '-' }}</span>
          <el-input v-else v-model="row.rt_rate.room_price" size="mini" type="text" @blur="priceNightCheck(row, $index)" />
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <span>{{ row.remark || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-link type="primary" size="mini" :underline="false" @click="goCheckin(scope.$index)">改 价</el-link>
          <el-link type="primary" style="margin-left:10px" size="mini" :underline="false" @click="cansleCheckin(scope.$index)">取 消</el-link>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
      <!-- <el-button size="mini" type="primary" @click="chargeRoomSatatus">确 定</el-button> -->
    </div>
  </el-dialog>
</template>
<script>
import { preNightCheckApi, priceNightCheckApi } from '@/api/nightaudit'
// import { checkArry, parseTime } from '@/utils/index'

export default {
  props: {
    searchType: {
      type: String,
      default: 'VC'
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    show() {
      this.$nextTick(() => {
        this.getList()
      })
      this.dialogFormVisible = true
    },
    cansleCheckin(index) {
      this.tableData.forEach(p => {
        this.$set(this.tableData[index], 'select', false)
      })
    },
    // 改价
    goCheckin(index) {
      console.log(index)
      this.tableData.forEach(p => {
        this.$set(this.tableData[index], 'select', true)
      })
    },
    // 确认改价
    priceNightCheck(val, index) {
      console.log(val, 1091)
      const data = {
        price_list: [
          {
            master_id: val.id,
            rt_rate_id: val.rt_rate.id,
            room_price: val.rt_rate.room_price,
            change_reason: '',
            remark: ''
          }
        ]
      }
      priceNightCheckApi(data).then(res => {
        console.log(res, '改i旧爱')
        this.cansleCheckin(index)
        this.$message.success('价格修改成功!')
        this.getList()
      })
    },
    // 获取列表
    getList() {
      preNightCheckApi().then(res => {
        console.log(res, '数据')
        this.tableData = res.data
      })
    }
  }
}
</script>

<style>

</style>

