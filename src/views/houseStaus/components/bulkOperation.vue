<!--
 * @Author: wangxuan
 * @Date: 2020-11-24 20:17:54
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-28 17:11:59
 * @FilePath: /vue-misb/src/views/houseStaus/components/bulkOperation.vue
-->
<template>
  <el-dialog :title="`批量${searchType === 'VD'? '置净': '置脏'}`" :visible.sync="dialogFormVisible" append-to-body width="40%">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      height="400"
      size="mini"
      border
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="room_no"
        label="房间"
      />
      <el-table-column
        prop="room_type"
        label="房型"
      />
      <el-table-column
        prop="room_state_name"
        label="状态"
        show-overflow-tooltip
      />
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="chargeRoomSatatus">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { newRoomSatuslistApi, allChangeRoomStatusApi } from '@/api/housStatus'
import { checkArry, parseTime } from '@/utils/index'

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
        console.log(this.searchType, '详情')
        this.getList()
      })
      this.dialogFormVisible = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 批量操作
    chargeRoomSatatus() {
      const data = {
        room_no_list: checkArry(this.multipleSelection, 'room_no'),
        room_occupy_after_code: 'NNZ',
        room_state_after_code: this.searchType === 'VD' ? 'VC' : 'VD',
        start_time: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'),
        end_time: parseTime(new Date(new Date().setHours(23, 59, 59)), '{y}-{m}-{d} {h}:{i}:{s}')
      }
      allChangeRoomStatusApi(data).then(res => {
        this.dialogFormVisible = false
        this.$emit('rush')
      })
    },
    // 获取列表
    getList() {
      newRoomSatuslistApi({}, { room_state: this.searchType }).then(res => {
        console.log(res, '数据')
        this.tableData = res.data.results
      })
    }
  }
}
</script>

<style>

</style>

