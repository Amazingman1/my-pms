<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" size="mini">
      <el-form-item label="营业日期">
        <el-date-picker
          v-model="formInline.biz_date__gte"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker
          v-model="formInline.biz_date__lte"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getAccountLIst">查 询</el-button>
        <el-button type="primary" plain @click="cansle">取 消</el-button>
        <el-button type="primary" size="mini" @click="exportExcel">导出EXCEL</el-button>
        <el-button type="primary" plain size="mini" @click="onPrint">打 印</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="list"
      border
      stripe
      style="width: 100%"
      :height="height"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" :selectable="checkboxT" />
      <el-table-column prop="room_num" label="房间" width="60">
        <template slot-scope="{row}">
          <span>{{ row.room_num|| '-' }}</span><br>
        </template>
      </el-table-column>
      <el-table-column prop="guest_name" label="宾客" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.guest_name|| '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="subject_desc" label="类别" width="50" />
      <el-table-column prop="incoming_account_reason_desc" label="付款方式" />
      <el-table-column prop="incoming_account_code_desc" label="入账代码" />
      <el-table-column prop="biz_date" label="营业日期" width="95" />
      <el-table-column prop="consume_datetime" label="消费时间" width="100">
        <template slot-scope="{row}">
          <span>{{ format(row.consume_datetime, '{m}-{d} {h}:{i}')|| '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="charge_amount" label="发生金额" width="100" />
      <el-table-column prop="can_arrange" label="可操作金额" width="100" />
      <el-table-column prop="pay_status_desc" label="状态" />
      <el-table-column prop="create_user_name" label="操作人" />
      <el-table-column prop="modify_datetime" label="操作时间" width="100">
        <template slot-scope="scope">
          <span>{{ format(scope.row.modify_datetime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="备注" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.desc|| '-' }}</span><br>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="90">
        <template slot-scope="scope">
          <el-button v-if="scope.row.subject === 'consume'" type="text" size="mini" :disabled="tiaoDisable(scope.row)" @click="changeAcc(scope.row, '冲调账')">冲调帐</el-button>
          <el-button type="text" size="mini" :disabled="tiaoDisable(scope.row)" @click="changeAcc(scope.row, '分账')">分账</el-button>
          <el-button
            v-if="scope.row.subject === 'pay'"
            type="text"
            size="mini"
            :disabled="refundDisable(scope.row) || scope.row.can_arrange<0 || scope.row.pay_status === 8 "
            @click="changeAcc(scope.row, '退款')"
          >退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="overflow: hidden;">
      <div style="float:right;margin-top:10px;margin-bottom:10px">
        <div style="padding:10px;background:#f5f7fa;margin-bottom:10px">
          <span>付款：</span>
          <span class="info_value">¥ {{ payTotal }}</span>
          <span>消费：</span>
          <span class="info_value">¥ {{ consumeTotal }}</span>
          <span>余额：</span>
          <span class="info_value">¥ {{ balanceTotal }}</span>
        </div>
        <el-button-group>
          <el-button type="primary" size="mini" :disabled="multipleSelection.length === 0" @click="transferMe('挂帐')">转 账</el-button>
          <el-button type="primary" size="mini" :disabled="multipleSelection.length === 0" @click="partialCheckoutVisible = true;form.desc = ''">部分结账</el-button>
        </el-button-group>
      </div>
    </div>
    <Pagination
      :total="total"
      :page.sync="pageObj.page"
      :limit.sync="pageObj.page_size"
      @pagination="getAccountLIst"
    />
    <Dalog
      ref="dalog"
      :acc-class="accClass"
      :title="title"
      :row-data="rowData"
      :id-obj="idObj"
      @accuntSuccess="accuntDelSuccess"
    />
    <Transfer
      ref="transfer"
      :multiple-selection="multipleSelection"
      :id-obj="idObj"
      :radio2="radio2"
      @refresh="refresh"
      @accuntSuccess="accuntDelSuccess"
    />
    <el-dialog
      title="部分结账"
      :visible.sync="partialCheckoutVisible"
      :append-to-body="true"
      width="30%"
    >
      <el-form :model="form">
        <el-form-item label="备注">
          <el-input v-model="form.desc" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="partialCheckoutVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="partialCheckout">确 定</el-button>
      </span>
    </el-dialog>
    <!--ar账户明细打印-->
    <ArDetailDialog ref="arDetailDialog" />
  </div>
</template>

<script>
import Dalog from './components/index'
import Transfer from './components/transfer'
import Pagination from '@/components/Pagination'
import { parseTime, accAdd, filterParams } from '@/utils/index'
import { addCalApi, newAccountLIstApi } from '@/api/accounts'
import { exportArInfoApi } from '@/api/arAccount'
import ArDetailDialog from './components/arDetailDialog/index'
export default {
  components: { Dalog, Transfer, ArDetailDialog, Pagination },
  props: {
    accuntId: {
      type: Number,
      default: null
    },
    arAccountName: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: '443px'
    }
  },
  data() {
    return {
      red: 'color: red',
      accClass: '',
      title: '调账',
      rowData: {},
      list: [],
      radio2: '转账',
      multipleSelection: [],
      idObj: {},
      loading: false,
      form: {
        desc: ''
      },
      partialCheckoutVisible: false,
      pageObj: {
        page: 1,
        page_size: 10
      },
      total: 0,
      payTotal: 0,
      consumeTotal: 0,
      balanceTotal: 0,
      biz_date: '',
      formInline: {
        biz_date__gte: '',
        biz_date__lte: ''
      }
    }
  },
  methods: {
    // 导出详情
    exportExcel() {
      const data = {
        account: [this.accuntId],
        only_self: 1
      }
      exportArInfoApi(data).then(res => {
        window.location.href = res.data.download
      })
    },
    // 取消搜搜
    cansle() {
      this.formInline = {
        biz_date__gte: '',
        biz_date__lte: ''
      }
      this.getAccountLIst()
    },
    // 查看ar帐详情
    lookArDetile(val) {
      this.rowData = val
      this.$refs.ConsomeInfo.show()
    },
    // 获取账务列表
    getAccountLIst() {
      this.idObj.accountId = this.accuntId
      const data = {
        account: [this.accuntId],
        only_self: 1 // 查看自身的账务
      }
      newAccountLIstApi(data, { ...this.pageObj, subject__in: 'consume,pay,refund', ...filterParams(this.formInline) }).then(res => {
        console.log(res, '获取账务列表')
        this.total = res.data.charge_list.count
        this.list = res.data.charge_list.results
        console.log(this.total)
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
    // 账务处理成功后的回调
    accuntDelSuccess() {
      this.$emit('rushList')
      this.getAccountLIst()
    },
    refresh(val) {
      this.$emit('refresh', val)
    },
    // 格式化时间
    format(time, config) {
      if (time) {
        return parseTime(time, config)
      }
    },
    // 已转账or离店禁止选择
    checkboxT({ pay_status }) {
      // pay_status 状态值详情见 readme
      const arr = [0]
      return arr.includes(pay_status)
    },
    tiaoDisable({ subject, pay_status }) {
      const arr = [0, 1]
      return !(arr.includes(pay_status) && subject === 'consume')
    },
    refundDisable(row) {
      return !(row.subject === 'pay' && row.can_arrange !== '0.00')
    },
    changeAcc(val, title) {
      const obj = {
        '冲调帐': 'TIAOZHANG',
        '分账': 'FENZHANG',
        '退款': 'TUIKUAN'
      }
      this.rowData = val
      this.title = title
      this.accClass = obj[title]
      this.$refs.dalog.show()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.payTotal = 0
      this.consumeTotal = 0
      this.balanceTotal = 0
      this.multipleSelection.map(p => {
        if (p.subject === 'pay') {
          this.payTotal = accAdd(this.payTotal, Number(p.can_arrange))
        } else if (p.subject === 'consume') {
          this.consumeTotal = accAdd(this.consumeTotal, Number(p.can_arrange))
        }
      })
      this.balanceTotal = this.payTotal - this.consumeTotal
    },
    // 部分结账
    partialCheckout() {
      const payList = []
      const chargeList = []
      this.multipleSelection.map(p => {
        if (p.subject === 'consume') {
          chargeList.push(p.id)
        } else if (p.subject === 'pay') {
          payList.push(p.id)
        }
      })
      if (chargeList.length > 0 && payList.length > 0) {
        this.form.charge_list = chargeList
        this.form.pay_list = payList
        addCalApi(this.form).then(res => {
          this.partialCheckoutVisible = false
          this.$message.success('部分结账成功')
          this.form.desc = ''
          this.$emit('rushList')
        })
      } else {
        this.$message.warning('请选择至少一条消费和付款')
      }
    },
    transferMe(type) {
      this.radio2 = type
      if (type === '转账') {
        this.$refs.transfer.getBaseList()
      } else {
        this.$refs.transfer.getARList()
      }
      this.$refs.transfer.show()
    },
    /* Ar账户明细打印 */
    onPrint() {
      this.$refs.arDetailDialog.getDetails(this.arAccountName, this.list, this.formInline)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.red{
  color: red;
}
.green{
  color: #67C23A
}
.info_value{
  margin-right: 5px;
  color: #000;
}
</style>

