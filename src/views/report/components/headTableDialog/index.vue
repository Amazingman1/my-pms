<!--
 * @Author: wangxuan
 * @Date: 2020-10-19 19:15:33
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-10-19 19:53:18
 * @FilePath: /vue-misb/src/views/report/components/headTableDialog/index.vue
-->
<template>
  <el-dialog
    :visible.sync="dialogVisible"
    append-to-body
    width="58%"
  >
    <div class="content">
      <ul id="print_head" class="dialog-style">
        <p>{{ title }}</p>
        <el-table
          ref="xTable"
          :data="tableData"
        >
          <el-table-column prop="project" label="项目" />
          <el-table-column label="本日">
            <el-table-column prop="today" label="发生" />
          </el-table-column>
          <el-table-column label="本月">
            <el-table-column prop="month" label="发生" />
            <el-table-column prop="last_year_month" label="去年同期" />
            <el-table-column prop="month_proportion" label="同比(%)" />
          </el-table-column>
          <el-table-column label="本年">
            <el-table-column prop="year" label="发生" />
            <el-table-column prop="last_year" label="去年同期" />
            <el-table-column prop="year_proportion" label="同比(%)" />
          </el-table-column>
        </el-table>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      <el-button v-print="'#print_head'" type="primary" size="mini">打 印</el-button>
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
      title: '',
      tableColumn: []
    }
  },
  methods: {
    getReport(title, value) {
      this.dialogVisible = true
      this.title = title.name
      this.tableColumn = title.tableColumn
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
    .content{
        height: 600px;
        overflow-y: scroll;

    }
    .dialog-style {
        padding: 0;
        width: 100%;
        p{
            text-align: center;
            font-size: 18px;
            font-weight:bolder;
        }
    }
</style>
