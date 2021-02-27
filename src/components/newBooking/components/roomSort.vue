<!--
 * @Author: wangxuan
 * @Date: 2020-10-20 17:23:37
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-09 15:28:11
 * @FilePath: /vue-misb/src/components/newBooking/components/roomSort.vue
-->
<template>
  <el-dialog title="排房" :visible.sync="dialogTableVisible" append-to-body width="50%">
    <el-form :inline="true" size="mini" :model="formInline">
      <el-form-item label="房态：">
        <el-select v-model="formInline.room_state" placeholder="选择房态">
          <el-option v-for="p in stateList" :key="p.key" :label="p.key" :value="p.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getCanLiveRoomFun">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="gridData"
      stripe
      style="width: 100%"
      height="300px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="room_no" label="房号" />
      <el-table-column property="room_type_name" label="房型" />
      <el-table-column property="room_state" label="状态" />
      <el-table-column property="building_name" label="楼座" />
      <el-table-column property="floor_number" label="楼层" />
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-link :underline="false">已选房间:{{ multipleSelection.length }} 间</el-link>
      <el-switch
        v-model="value1"
        inactive-text="自动排房"
        style="margin:0 20px"
        @change="changeSwitch"
      />
      <el-button size="mini" type="primary" @click="sbmint">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getCanLiveRoom } from '@/api/checkin'
import { checkArry } from '@/utils/index'
export default {
  props: {
    parmData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      gridData: [],
      dialogTableVisible: false,
      value1: false,
      roomAc: 0,
      multipleSelection: [],
      roomNumberList: [],
      selectRoomList: [],
      formInline: {
        room_state: ''
      },
      stateList: [
        { key: '全部', value: '' },
        { key: 'VC', value: 'VC' },
        { key: 'VD', value: 'VD' },
        { key: 'OD', value: 'OD' }
      ]
    }
  },
  methods: {
    show() {
      this.dialogTableVisible = true
      this.formInline = {
        room_state: '',
        can_live_type: 4
      }
      this.$nextTick(() => {
        // 排除房态页预定的默认房间
        if (this.parmData.room_no) {
          this.selectRoomList.push(this.parmData.room_no)
        }
        this.getCanLiveRoomFun()
      })
    },
    getCanLiveRoomFun() {
      const data = {
        ...this.parmData,
        ...this.formInline
      }
      getCanLiveRoom(data).then(res => {
        this.gridData = res.data
        // 过滤掉已经排好的房间
        this.gridData = this.gridData.filter(p => {
          return !this.selectRoomList.includes(p.room_no)
        })
        this.$nextTick(() => {
          this.changeSwitch()
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 自动排房
    changeSwitch() {
      if (this.value1) {
        for (let i = 0; i < this.parmData.room_count; i++) {
          this.$refs.multipleTable.toggleRowSelection(this.gridData[i])
        }
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    sbmint() {
      const roomArr = checkArry(this.multipleSelection, 'room_no')
      this.$emit('getRoomList', roomArr)
      roomArr.map(p => {
        this.selectRoomList.push(p)
      })
      this.dialogTableVisible = false
    },
    // 预定成功初始化选中的房间 数组
    restSelectRoomArr() {
      this.selectRoomList = []
    }
  }
}
</script>

<style>

</style>
