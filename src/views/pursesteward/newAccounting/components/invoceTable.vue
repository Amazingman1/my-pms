<!--
 * @Author: wangxuan
 * @Date: 2020-12-18 14:42:40
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-22 11:09:35
 * @FilePath: /vue-misb/src/views/pursesteward/newAccounting/components/invoceTable.vue
-->
<template>
  <div>
    <el-form :inline="true" size="mini" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="exportInvoice">导出EXCEL</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loadingTable"
      :data="tableData"
      border
      stripe
      size="mini"
      style="width: 100%"
    >
      <el-table-column label="客户类型">
        <template slot-scope="{row}">
          <span>{{ row.create_user || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发票类型">
        <template slot-scope="{row}">
          <span>{{ row.invoice_type_desc || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发票抬头">
        <template slot-scope="{row}">
          <span>{{ row.invoice_title || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发票代码">
        <template slot-scope="{row}">
          <span>{{ row.invoice_code || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="税号">
        <template slot-scope="{row}">
          <span>{{ row.tax_no || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="金额">
        <template slot-scope="{row}">
          <span>{{ row.amount || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开票日期">
        <template slot-scope="{row}">
          <span>{{ row.issued_date || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="人员">
        <template slot-scope="{row}">
          <span>{{ row.modify_user || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="说明">
        <template slot-scope="{row}">
          <span>{{ row.desc || '-' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="pageStion.page"
      :limit.sync="pageStion.page_size"
      @pagination="getInvoice"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getInvoiceApi, exportInvoiceApi } from '@/api/accounts'

export default {
  components: { Pagination },
  data() {
    return {
      loadingTable: false,
      total: 0,
      tableData: [],
      pageStion: {
        page: 1,
        page_size: 15
      }
    }
  },
  methods: {
    // 导出
    exportInvoice() {
      exportInvoiceApi({ ...this.pageStion, page_size: this.total }).then(res => {
        console.log(res, 'daochu')
        window.location.href = res.data.download
      })
    },
    // 获取开票记录
    getInvoice() {
      this.loadingTable = true
      getInvoiceApi(this.pageStion).then(res => {
        const { data } = res
        this.total = data.count
        this.tableData = data.results
        this.loadingTable = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info_value{
  margin-right: 5px;
  color: #000;
}
</style>
