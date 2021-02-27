<!--
 * @Author: wangxuan
 * @Date: 2020-10-19 19:15:33
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-10-19 19:53:01
 * @FilePath: /vue-misb/src/views/report/components/printReportDialog/index.vue
-->
<template>
  <el-dialog
    :visible.sync="dialogVisible"
    append-to-body
    width="58%"
  >
    <div class="content">
      <ul id="print" class="dialog-style">
        <p>{{ title }}</p>
        <vxe-table
          ref="xTable"
          border
          highlight-hover-row
          highlight-current-row
          :data="tableData"
        >
          <vxe-table-column v-for="(config, index) in tableColumn" :key="index" v-bind="config" />
        </vxe-table>
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
        height: 500px;
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
