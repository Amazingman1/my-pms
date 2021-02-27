<!--
 * @Author: wangxuan
 * @Date: 2020-10-19 19:15:33
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-29 09:59:29
 * @FilePath: /vue-misb/src/views/pursesteward/newAccounting/components/arListDialog/index.vue
-->
<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="55%"
    :show-close="false"
  >
    <ul id="printDiv" class="dialog-style">
      <p>AR账户列表</p>
      <el-table
        :data="tableData"
        size="mini"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{textAlign:'center'}"
        style="width: 100%"
      >
        <el-table-column prop="name" width="200" label="AR账户名" />
        <el-table-column prop="ar_status_desc" label="状态" />
        <el-table-column prop="account.biz_date" width="100" label="营业日期" />
        <el-table-column prop="account.pay_amount" label="预收" />
        <el-table-column prop="account.balance" label="余额" />
        <el-table-column prop="account.total_invoice" label="已开票" />
        <el-table-column prop="account.can_invoice" label="可开票" />
      </el-table>
    </ul>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      <el-button v-print="'#printDiv'" type="primary" size="mini">打 印</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: []
    }
  },
  methods: {
    getDetails(value) {
      this.dialogVisible = true
      this.tableData = value
    }
  }
}
</script>

<style lang="scss" scoped>
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
