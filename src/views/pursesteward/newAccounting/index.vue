<!--
 * @Author: wangxuan
 * @Date: 2020-11-23 14:34:15
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-18 17:52:39
 * @FilePath: /vue-misb/src/views/pursesteward/newAccounting/index.vue
-->
<template>
  <div class="app-container" style="overflow:hidden">
    <div>
      <el-tabs v-model="tabPosition" @tab-click="changeR">
        <el-tab-pane label="收款明细" name="pay">
          <RefundTable ref="PayTable" :tab-position="'pay'" />
        </el-tab-pane>
        <el-tab-pane label="退款明细" name="refund">
          <RefundTable ref="RefundTable" :tab-position="'refund'" />
        </el-tab-pane>
        <el-tab-pane label="发票记录" name="fapiao">
          <InvoceTable ref="InvoceTable" />
        </el-tab-pane>
        <el-tab-pane label="AR账户明细" name="arAccount">
          <ArTable ref="ArTable" />
        </el-tab-pane>
        <el-tab-pane label="临客帐" name="LinAccount">
          <LinkAccunt ref="LinkAccunt" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import LinkAccunt from './components/linkAccunt'
import InvoceTable from './components/invoceTable'
import RefundTable from './components/reundTable'
import ArTable from './components/arTable'
export default {
  components: { LinkAccunt, InvoceTable, RefundTable, ArTable },
  data() {
    return {
      tabPosition: 'pay'
    }
  },
  methods: {
    // 切换表
    changeR() {
      if (this.tabPosition !== 'fapiao') {
        if (this.tabPosition === 'arAccount') {
          this.$refs.ArTable.getArAccount()
        } else if (this.tabPosition === 'LinAccount') {
          this.$refs.LinkAccunt.dumpCharge()
        } else if (this.tabPosition === 'pay') {
          this.$refs.PayTable.getPayList()
        } else if (this.tabPosition === 'refund') {
          this.$refs.RefundTable.getPayList()
        }
      } else {
        this.$refs.InvoceTable.getInvoice()
      }
    }
  }
}
</script>

