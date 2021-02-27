<!--
 * @Author: wangxuan
 * @Date: 2020-10-19 19:15:33
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-21 10:19:44
 * @FilePath: /vue-misb/src/components/arAccuntTable/components/arDetailDialog/index.vue
-->
<template>
  <el-dialog :visible.sync="dialogVisible" append-to-body width="55%" :show-close="false">
    <div class="content">
      <ul id="print" class="dialog-style">
        <div class="title">
          <p><span>{{ message }}</span>——AR账户明细</p>
          <p> <span>营业日期：</span>{{ biz_date__gte + '-'+ biz_date__lte }}</p>
        </div>
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
          <el-table-column
            prop="desc"
            label="备注"
            :show-overflow-tooltip="true"
          />
        </el-table>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      <el-button v-print="'#print'" type="primary" size="mini">打 印</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      message: '',
      biz_date__gte: '',
      biz_date__lte: ''
    }
  },
  methods: {
    getDetails(title, value, { biz_date__gte, biz_date__lte }) {
      this.dialogVisible = true
      this.message = title
      this.tableData = value
      this.biz_date__gte = biz_date__gte
      this.biz_date__lte = biz_date__lte
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
  height: 500px;
  overflow-y: scroll;
}
.dialog-style {
  padding: 0;
  width: 100%;
  .title {
    display: flex;
    justify-content:space-around;
    font-size: 16px;
    font-weight: bolder;
  }
}
</style>
