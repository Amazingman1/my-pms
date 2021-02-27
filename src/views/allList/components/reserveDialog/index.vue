<template>
  <el-dialog :visible.sync="dialogVisible" :show-close="false" width="58%">
    <div class="content">
      <ul id="print" class="dialog-style">
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
          <el-table-column
            type="index"
            width="50"
            label="序号"
            align="center"
          />
          <el-table-column prop="name" label="预定人" align="center" />
          <el-table-column
            prop="from_name"
            label="团队|会员|协议"
            align="center"
          />
          <el-table-column prop="telephone" label="联系电话" align="center" />
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
            label="房价码"
            align="center"
          />
          <el-table-column
            prop="code_market_desc"
            label="市场码"
            align="center"
          />
          <el-table-column prop="code_src_desc" label="来源码" align="center" />
          <el-table-column label="余额" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.account.balance }}</span>
            </template>
          </el-table-column>
          <el-table-column label="信用" width="65" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.account.usable_pre_authorized }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_user" label="销售员" align="center" />
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
      message: '',
      tableData: []
    }
  },
  methods: {
    // 获取数据
    getReserve(title, value) {
      this.dialogVisible = true
      if (title === 'YUDING') {
        this.message = '有效预定单'
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
