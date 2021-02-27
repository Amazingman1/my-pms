<!--
 * @Author: wangxuan
 * @Date: 2020-12-18 16:51:11
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-29 10:14:01
 * @FilePath: /vue-misb/src/views/pursesteward/newAccounting/components/arTable.vue
-->
<template>
  <div>
    <el-form :inline="true" size="mini">
      <el-form-item label="AR账户">
        <el-select v-model="params.arId" filterable remote :remote-method="getArList" @change="getArAccount">
          <el-option label="全部" :value="null" />
          <el-option
            v-for="item in arList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-form-item>
          <el-button type="primary" size="mini" @click="onPrint">打 印</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loadingTable"
      :data="liveNowList"
      stripe
      border
      size="mini"
      style="width: 100%"
    >
      <el-table-column prop="name" label="AR账户名" />
      <el-table-column prop="ar_status_desc" width="90" label="状态" />
      <el-table-column prop="account.biz_date" width="100" label="营业日期" />
      <el-table-column prop="account.pay_amount" width="120" label="预收" />
      <el-table-column prop="account.balance" width="120" label="可操作金额" />
      <el-table-column prop="account.total_invoice" width="120" label="已开票" />
      <el-table-column prop="account.can_invoice" width="120" label="可开票" />
      <el-table-column prop="modify_datetime" width="160" label="操作时间" />
      <el-table-column prop="modify_user" width="100" label="操作人" />
      <el-table-column prop="address" label="操作" width="160">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" @click="getComssue(scope.row, 'WillA')">付 款</el-link>
          <el-link type="primary" :underline="false" style="margin-left:10px" @click="getComssue(scope.row, 'AndC')">入消费</el-link>
          <el-link type="info" :underline="false" style="margin-left:10px" @click="getArInfo(scope.row)">详 情</el-link>
        </template>
      </el-table-column>
      <template slot="empty">
        <img :src="TableInfo" alt="">
      </template>
    </el-table>
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="pageStion.page"
      :limit.sync="pageStion.page_size"
      @pagination="getArAccount"
    />
    <!-- 入消费 -->
    <Advance ref="AndC" :account-id="accountId" @rush="getArAccount" />
    <!-- 收款 -->
    <ReceiptYS ref="WillA" :account-id="accountId" @rush="getArAccount" />
    <!-- ar账户账单 -->
    <el-dialog :title="'AR账户: '+ arAccountName " :visible.sync="dialogVisibleArAccount" width="80%">
      <ARAccount ref="aRAccount" :accunt-id="accountId" :ar-account-name="arAccountName" />
    </el-dialog>
    <!--打印AR账户列表-->
    <ARListDialog ref="arListDialog" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getArAccountApi, getArApi } from '@/api/arAccount'
import Advance from '@/components/AdvanceReceipt/newAdvance'
import ARListDialog from './arListDialog/index'
import ARAccount from '@/components/arAccuntTable'
import ReceiptYS from '@/components/AdvanceReceipt/newReceipt'
const TableInfo = require('@/assets/image/tableInfo.png')

export default {
  components: { Pagination, ARAccount, ARListDialog, Advance, ReceiptYS },
  data() {
    return {
      TableInfo: TableInfo,
      pageStion: {
        page: 1,
        page_size: 15
      },
      total: 0,
      params: {
        page_size: 999,
        ordering: 'pay_status'
      },
      liveNowList: [],
      loadingTable: false,
      arList: [],
      accountId: null,
      arAccountName: '',
      dialogVisibleArAccount: false
    }
  },
  methods: {
    // 获取AR账户明细
    getArAccount() {
      this.loadingTable = true
      getArAccountApi({ ...this.pageStion, id: this.params.arId }).then(res => {
        const { data } = res
        this.total = data.count
        this.liveNowList = data.results
        this.loadingTable = false
      })
    },
    /* 获取ar账户 */
    getArList(key) {
      if (key !== '') {
        this.pageStion.page = 1
        getArApi({ name__icontains: key }).then(res => {
          const { data } = res
          this.arList = data.results
        })
      }
    },
    // 入消费/付款
    getComssue(row, ref) {
      this.accountId = row.account.id
      this.$refs[ref].show()
    },
    // 获取ar账户详情
    getArInfo(value) {
      this.accountId = value.account.id
      this.arAccountName = value.name
      this.dialogVisibleArAccount = true
      this.$nextTick(() => {
        this.$refs.aRAccount.getAccountLIst()
      })
    },
    /* 打印 */
    onPrint() {
      this.$refs.arListDialog.getDetails(this.liveNowList)
    }
  }
}
</script>

<style>

</style>
