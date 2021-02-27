<template>
  <el-dialog :visible.sync="dialogVisible" :show-close="false" width="58%">
    <div class="content">
      <ul id="printDiv" class="dialog-style">
        <p>
          <span>{{ message }}</span>
        </p>
        <el-table
          :data="tableData"
          size="mini"
          :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ textAlign: 'center' }"
          style="width: 100%"
        >
          <el-table-column prop="room_type_desc" label="房型" align="center" />
          <el-table-column
            prop="room_number"
            label="房间"
            width="50px"
            align="center"
          />
          <el-table-column
            prop="master_guest_list"
            label="在住人"
            width="80"
            align="center"
          />
          <el-table-column
            prop="from_name"
            label="团队|会员|协议"
            width="70"
            align="center"
          />
          <el-table-column
            prop="master_phone_list"
            label="联系电话"
            width="100"
            align="center"
          />
          <el-table-column prop="arr_time" label="入住时间" align="center">
            <template slot-scope="scope">
              <span>{{ format(scope.row.arr_time, "{m}-{d} {h}:{i}") }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="leave_time" label="离店时间" align="center">
            <template slot-scope="scope">
              <span>{{ format(scope.row.leave_time, "{m}-{d} {h}:{i}") }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="rate_code_desc"
            label="房价码说明"
            align="center"
          />
          <el-table-column
            prop="code_market_desc"
            label="市场码"
            width="60"
            align="center"
          />
          <el-table-column prop="code_src_desc" label="来源码" align="center" />
          <el-table-column label="是否换房" align="center" width="50px">
            <template slot-scope="scope">
              <span>{{ scope.row.is_change_room ? "T" : "F" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="room_price"
            label="房价"
            width="50px"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.room_price }}</span>
            </template>
          </el-table-column>

          <el-table-column label="余额" align="center" width="70">
            <template slot-scope="scope">
              <span>{{ scope.row.account.balance }}</span>
            </template>
          </el-table-column>
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
      message: '',
      tableData: []
    }
  },
  methods: {
    // 获取数据
    getDetails(title, value) {
      this.dialogVisible = true
      if (title === 'DANGQIAN') {
        this.message = '当前在住单'
      }
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
  height: 500px;
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
