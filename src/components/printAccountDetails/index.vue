<!--
 * @Author: wangxuan
 * @Date: 2020-11-23 14:44:23
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-16 16:50:22
 * @FilePath: /vue-misb/src/components/printAccountDetails/index.vue
-->
<template>
  <el-dialog :visible.sync="dialogVisible" :show-close="false" append-to-body width="55%">
    <div class="content">
      <ul id="printDiv" class="dialog-style">
        <p>
          <span>{{ room_number }}</span>房间账单明细
        </p>
        <el-table
          :data="tableData"
          size="mini"
          :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ textAlign: 'center' }"
          style="width: 100%"
        >
          <el-table-column prop="room_num" label="房间号" width="70" />
          <el-table-column prop="subject_desc" label="类别" width="60" />
          <el-table-column
            prop="incoming_account_reason_desc"
            label="付款方式"
          />
          <el-table-column prop="incoming_account_code_desc" label="入账代码" />
          <el-table-column
            prop="biz_date"
            label="营业日期"
            :show-overflow-tooltip="true"
          />
          <el-table-column prop="charge_amount" label="发生金额">
            <template slot-scope="scope">
              <span>{{ scope.row.charge_amount }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="can_arrange" label="余额" />
          <el-table-column prop="pay_status_desc" label="状态" />
          <el-table-column prop="create_user_name" label="操作人" />
          <el-table-column
            prop="modify_datetime"
            label="时间"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{
                format(scope.row.modify_datetime, "{m}-{d} {h}:{i}")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="备注" />
        </el-table>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      <el-button
        v-print="'#printDiv'"
        type="primary"
        size="mini"
      >打 印</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      dialogVisible: false,
      room_number: '',
      tableData: []
    }
  },
  methods: {
    getDetails(value) {
      this.dialogVisible = true
      this.room_number = value[0].room_num
      this.tableData = value
    },
    // 格式化时间
    format(time, config) {
      return parseTime(time, config)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 600px;
  overflow-y: scroll;
}
.dialog-style {
  padding: 0;
  width: 100%;
  p {
    text-align: center;
    font-size: 18px;
    font-weight: bolder;
  }
}
</style>
