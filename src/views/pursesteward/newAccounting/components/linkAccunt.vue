<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="账单明细" name="first">
        <div style="padding:10px;background:#f5f7fa;margin-bottom:10px">
          <span>总支付：</span>
          <span class="info_value">¥ {{ formAc.pay_amount||'-' }}</span>
          <span>总退款: </span>
          <span class="info_value">¥ {{ formAc.total_refund ||'-' }}</span>
          <span>总消费：</span>
          <span class="info_value">¥ {{ formAc.total_transfer_in || '-' }}</span>
          <span>余额：</span>
          <span class="info_value">¥ {{ formAc.balance || '-' }}</span>
        </div>
        <el-form :inline="true" size="mini" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary" @click="exportDumpCharge">导出EXCEL</el-button>
          </el-form-item>
        </el-form>
        <el-table
          v-loading="loadingTable"
          :data="listData"
          stripe
          border
          size="mini"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="number" type="selection" width="55" :selectable="checkboxT" />
          <el-table-column prop="room_num" label="房间号">
            <template slot-scope="{row}">
              <span>{{ row.room_num|| '-' }}</span><br>
            </template>
          </el-table-column>
          <el-table-column prop="guest_name" label="宾客">
            <template slot-scope="{row}">
              <span>{{ row.guest_name|| '-' }}</span><br>
            </template>
          </el-table-column>
          <el-table-column prop="team_name" label="团队">
            <template slot-scope="{row}">
              <span>{{ row.team_name|| '-' }}</span><br>
            </template>
          </el-table-column>
          <el-table-column prop="biz_date" label="营业日期" />
          <el-table-column prop="subject_desc" label="类型" />
          <el-table-column prop="charge_amount" label="金额" />
          <el-table-column prop="can_arrange" label="可操作金额" />
          <el-table-column prop="incoming_account_reason_desc" label="付款方式" />
          <el-table-column prop="incoming_account_code_desc" label="入账代码" />
          <el-table-column prop="modify_datetime" label="操作时间" width="160" />
          <el-table-column prop="modify_user_name" label="操作人员" />
          <el-table-column prop="desc" label="备注">
            <template slot-scope="{row}">
              <span>{{ row.desc|| '-' }}</span><br>
            </template>
          </el-table-column>
          <el-table-column prop="address" width="150" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-link :underline="false" type="primary" :disabled="scope.row.subject === 'pay'" size="mini" @click="payMoney(scope.row)">收 款</el-link>
              <el-link :underline="false" type="primary" :disabled="tiaoDisable(scope.row)" size="mini" @click="refundAccunt(scope.row,'调帐')">冲调帐</el-link>
              <el-link :underline="false" type="primary" size="mini" :disabled="refundDisable(scope.row) || scope.row.can_arrange<0 || scope.row.pay_status === 8" @click="refundAccunt(scope.row, '退款')">退款</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="历史明细" name="second">
        <el-form :inline="true" size="mini" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary" @click="exportLinkAccunt">导出EXCEL</el-button>
          </el-form-item>
        </el-form>
        <el-table
          v-loading="loadingTable"
          :data="historyList"
          stripe
          border
          style="width: 100%"
          size="mini"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="room_num" label="房间号">
            <template slot-scope="{row}">
              <span>{{ row.room_num|| '-' }}</span><br>
            </template>
          </el-table-column>
          <el-table-column prop="biz_date" label="营业日期" />
          <el-table-column prop="subject_desc" label="类型">
            <template slot-scope="{row}">
              <span>{{ row.subject_desc|| '-' }}</span><br>
            </template>
          </el-table-column>
          <el-table-column prop="charge_amount" label="金额" />
          <el-table-column prop="can_arrange" label="可操作金额" />
          <el-table-column prop="incoming_account_reason_desc" label="付款方式" />
          <el-table-column prop="incoming_account_code_desc" label="入账代码" />
          <el-table-column prop="create_datetime" label="操作时间" width="160" />
          <el-table-column prop="modify_user_name" label="操作人员" />
          <el-table-column prop="desc" label="备注">
            <template slot-scope="{row}">
              <span>{{ row.desc|| '-' }}</span><br>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="pageStion.page"
      :limit.sync="pageStion.page_size"
      @pagination="changePage"
    />
    <ReceiptYS ref="WillA" :account-id="accountId" @rush="dumpCharge" />
    <Refund ref="refund" :row-data="rowData" :title="title" @rushRfundTable="reushTalbForParant" />
  </div>
</template>
<script>
import ReceiptYS from '@/components/AdvanceReceipt/newReceipt'
import Refund from './refund'
import { LinkAccuntApi, dumpChargeApi, exportDumpChargeApi, exportLinkAccuntApi } from '@/api/accounts'
import Pagination from '@/components/Pagination'

export default {
  components: { Refund, Pagination, ReceiptYS },
  data() {
    return {
      nameObj: {},
      historyList: [],
      multipleSelection: [],
      rowData: {},
      listData: [],
      title: '',
      total: 0,
      loadingTable: false,
      radio2: '',
      activeName: 'first',
      accountId: null,
      pageStion: {
        page: 1,
        page_size: 15
      },
      formAc: {}
    }
  },
  methods: {
    // 导出临客帐
    exportDumpCharge() {
      exportDumpChargeApi({ page_size: this.total }).then(res => {
        window.location.href = res.data.download
      })
    },
    exportLinkAccunt() {
      exportLinkAccuntApi({ page_size: this.total }).then(res => {
        window.location.href = res.data.download
      })
    },
    // 获取临客帐详情列表
    dumpCharge() {
      this.loadingTable = true
      dumpChargeApi({ ...this.pageStion }).then(res => {
        const { data } = res
        this.total = data.count
        this.listData = data.results
        this.formAc = {
          ...res.account_data
        }
        this.loadingTable = false
      })
    },
    handleClick({ name }) {
      console.log(name, 9090)
      this.pageStion = {
        page: 1,
        page_size: 15
      }
      if (name === 'second') {
        this.pageChange()
      } else {
        this.dumpCharge()
      }
    },
    // 临客帐分页
    changePage() {
      if (this.activeName === 'second') {
        this.pageChange()
      } else {
        this.dumpCharge()
      }
    },
    // 获取历史临客帐
    pageChange() {
      LinkAccuntApi(this.pageStion).then(res => {
        console.log(res, '历史账单')
        const { data } = res
        this.historyList = data.results
        this.total = data.count
      })
    },
    // 列别颜色
    tableRowClassName({ row, rowIndex }) {
      if (row.subject === 'pay') {
        return 'warning-row'
      } else if (row.subject === 'consume' || row.subject === 'refund') {
        return 'success-row'
      }
      return ''
    },
    // 退款
    refundAccunt(val, title) {
      this.$refs.refund.show()
      this.rowData = val
      this.title = title
    },
    payMoney(val) {
      this.accountId = val.account
      this.$refs.WillA.show()
    },
    // 付款车成功后刷新列表
    reushTalbForParant() {
      this.dumpCharge()
    },
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 刷新列表
    rushAccuntTable() {
      this.$emit('rushAccuntTable')
    },
    tiaoDisable(row) {
      if (
        row.subject === 'consume' && (row.pay_status === 0 || row.pay_status === 1)
      ) {
        return false
      } else {
        return true
      }
    },
    refundDisable(row) {
      if (row.subject === 'pay' && row.can_arrange > 0) {
        return false
      } else {
        return true
      }
    },
    checkboxT(row) {
      if (row.pay_status_desc === '已转账') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style>

</style>
