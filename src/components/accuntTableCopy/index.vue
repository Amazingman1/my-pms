<template>
  <div>
    <div style="padding:10px;background:#f5f7fa;margin-bottom:10px">
      <span>订单付款：</span>
      <span class="info_value">¥ {{ accuntData.pay_amount ||'-' }}</span>
      <span>订单消费：</span>
      <span class="info_value">¥ {{ accuntData.general_consumption ||'-' }}</span>
      <span>订单退款：</span>
      <span class="info_value">¥ {{ accuntData.total_refund ||'-' }}</span>
      <span>订单余额：</span>
      <span class="info_value">¥ {{ accuntData.balance ||'-' }}</span>
      <span>可开票金额：</span>
      <span class="info_value">¥ {{ accuntData.can_invoice || '-' }}</span>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      stripe
      style="width: 100%"
      :height="height"
      size="mini"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="50"
        :selectable="checkboxT"
      />
      <el-table-column
        prop="subject_desc"
        label="类别"
        width="65"
        :filters="fliters"
        :filter-method="filterHandler"
      />
      <el-table-column prop="room_num" label="房间" width="70" />
      <el-table-column prop="incoming_account_reason_desc" label="付款方式" />
      <el-table-column prop="incoming_account_code_desc" label="入账代码" />
      <el-table-column prop="charge_amount" label="发生金额" />
      <el-table-column prop="can_arrange" width="70" label="余额" />
      <el-table-column prop="pay_status_desc" width="70" label="状态" />
      <el-table-column prop="biz_date" label="营业时间" width="100" />
      <el-table-column prop="create_user_name" label="操作人" />
      <el-table-column label="创建时间" width="100">
        <template slot-scope="scope">
          <span>{{ format(scope.row.create_datetime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" width="100">
        <template slot-scope="scope">
          <span>{{ format(scope.row.modify_datetime, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="备注" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.desc || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.subject === 'consume'" type="text" size="mini" :disabled="tiaoDisable(scope.row)" @click="changeAcc(scope.row, '冲调账')">冲调帐</el-button>
          <el-button type="text" :disabled="tiaoDisable(scope.row)" size="mini" @click="changeAcc(scope.row, '分账')">分账</el-button>
          <el-button v-if="scope.row.subject === 'pay'" type="text" size="mini" :disabled="refundDisable(scope.row) || scope.row.can_arrange<0 || scope.row.pay_status === 8 " @click="changeAcc(scope.row, '退款')">退款</el-button>
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
          <el-button v-show="ISteam(isShow) && !roomWith" type="primary" :disabled="multipleSelection.length === 0" size="mini" @click="sbmintToTeam">转团队帐</el-button>
          <el-button v-show="!accuntType" type="primary" :disabled="multipleSelection.length === 0" size="mini" @click="transferMe('转账')">转 账</el-button>
          <el-button type="primary" :disabled="multipleSelection.length === 0" size="mini" @click="transferMe('挂帐')">挂 帐</el-button>
          <el-button type="primary" :disabled="multipleSelection.length === 0" size="mini" @click="partialCheckoutVisible = true;form.desc = ''">部分结账</el-button>
          <el-button type="primary" :disabled="multipleSelection.length === 0" size="mini" @click="showAddDump">挂临帐</el-button>
          <el-button type="primary" size="mini" @click="onPrintDetails">打印账务详情</el-button>
          <el-button type="primary" size="mini" @click="exportAccountLIst">导出EXCEL</el-button>
        </el-button-group>
      </div>
    </div>
    <Dalog
      ref="dalog"
      :acc-class="accClass"
      :title="title"
      :row-data="rowData"
      :accunt-data="accuntData"
      @accuntSuccess="getAccountLIst"
    />
    <Transfer
      ref="transfer"
      :multiple-selection="multipleSelection"
      :accunt-id="accuntId"
      @accuntSuccess="getAccountLIst"
    />
    <el-dialog
      title="部分结账"
      :visible.sync="partialCheckoutVisible"
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
    <el-dialog
      title="挂临帐"
      :visible.sync="partialCheckoutVisibleLin"
      width="30%"
      append-to-body
    >
      <el-form :model="form">
        <el-form-item label="备注">
          <el-input v-model="form.desc" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="partialCheckoutVisibleLin = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addDump">确 定</el-button>
      </span>
    </el-dialog>
    <!--打印账务信息-->
    <PrintDetailsDialog ref="PrintDetailsDialog" />
  </div>
</template>

<script>
import Dalog from './components/index'
import Transfer from './components/transfer'
import { parseTime, checkArry, isTeam, accAdd } from '@/utils/index'
import { addCalApi, dumpApi, newGetAccountLIstApi, transferApi, exportAccountLIstApi } from '@/api/accounts'
import { getCombineListApi } from '@/api/checkin'
import { mapGetters } from 'vuex'
import PrintDetailsDialog from '@/components/printAccountDetails'
export default {
  inject: ['banseInfo'],
  components: { Dalog, Transfer, PrintDetailsDialog },
  props: {
    accuntType: { // 是否显示转账
      type: Boolean,
      default: false
    },
    subject: {
      type: String,
      default: 'consume,pay,refund'
    },
    masterRoom: {
      type: Number,
      default: 1
    },
    height: {
      type: String,
      default: '343px'
    },
    // 团队账单
    isShow: {
      type: Number,
      default: null
    },
    teamId: {
      type: Number,
      default: null
    },
    roomWith: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      isShow: () => {
        return this.isShow
      },
      transType: () => {
        return this.transType
      }
    }
  },
  data() {
    return {
      red: 'color: red',
      tableData: [],
      accClass: '',
      title: '调账',
      rowData: {},
      transType: '转账',
      multipleSelection: [],
      idObj: {},
      loading: false,
      acOrAndCk: '',
      form: {
        desc: ''
      },
      fliters: [
        { text: '消费', value: '消费' },
        { text: '付款', value: '付款' },
        { text: '退款', value: '退款' }
      ],
      partialCheckoutVisible: false,
      partialCheckoutVisibleLin: false,
      pageObj: {
        page: 1,
        page_size: 10
      },
      accuntData: {},
      payTotal: 0,
      consumeTotal: 0,
      balanceTotal: 0,
      accuntId: null,
      totoal: 0
    }
  },
  computed: {
    propsData() { return this.banseInfo() },
    ...mapGetters([
      'ordingStatus'
    ])
  },
  watch: {
    'subject': function(params) {
      this.getAccountLIst()
    }
  },
  methods: {
    // 导出账务详情
    exportAccountLIst() {
      if (this.isTeam(this.isShow) && this.roomWith) {
        this.accuntId = this.teamId
      } else {
        this.accuntId = this.propsData.account.id
      }
      const data = {
        account: [this.accuntId],
        only_self: this.masterRoom
      }
      const params = {
        page_size: this.totoal,
        subject__in: this.subject
      }
      exportAccountLIstApi(data, params).then(res => {
        console.log(res, '导出')
        window.location.href = res.data.download
      })
    },
    // 确定转团队
    sbmintToTeam() {
      console.log(this.propsData)
      const form = {
        is_ar_account: false,
        from_account: Number(this.propsData.account.id),
        to_account: this.propsData.account.main_combined_account,
        charge_detail: checkArry(this.multipleSelection, 'id')
      }

      transferApi(form).then(res => {
        this.$message.success('转账成功!')
        this.getAccountLIst()
      })
    },
    // 判断团队
    ISteam(val) {
      return isTeam(val)
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    getaccBaseInfo(id) {
      getCombineListApi(id).then(res => {
        const { account_data } = res
        this.accuntData = account_data
      })
    },
    isTeam(val) {
      const arr = [3, 4]
      return arr.includes(val)
    },
    // 获取账务列表
    getAccountLIst() {
      if (this.isTeam(this.isShow) && this.roomWith) {
        this.accuntId = this.teamId
      } else {
        this.accuntId = this.propsData.account.id
      }
      const data = {
        account: [this.accuntId],
        only_self: this.masterRoom
      }
      const params = {
        page: 1,
        page_size: 900,
        subject__in: this.subject
      }
      this.loading = true
      // this.getaccBaseInfo(this.propsData.id)
      newGetAccountLIstApi(data, params).then(res => {
        this.loading = false
        const { data } = res
        this.tableData = data.charge_list.results
        this.totoal = data.charge_list.count
        this.accuntData = data.account_info
      })
    },
    // 列别颜色
    tableRowClassName({ row, rowIndex }) {
      if (row.subject === 'pay' || row.subject === 'refund') {
        return 'warning-row'
      } else if (row.subject === 'consume') {
        return 'success-row'
      }
      return ''
    },
    // 挂临客帐
    showAddDump() {
      this.partialCheckoutVisibleLin = true
    },
    addDump() {
      const data = {
        from_account: this.propsData.account.id,
        charge_detail: checkArry(this.multipleSelection, 'id'),
        desc: this.form.desc
      }
      dumpApi(data).then(res => {
        this.$message.success('挂临帐成功!')
        this.partialCheckoutVisibleLin = false
        this.form.desc = ''
        this.getAccountLIst()
      })
    },
    // 格式化时间
    format(time, config) {
      return parseTime(time, config)
    },
    // 更新所有列表入住单title
    reastAll(val) {
      this.$emit('title', val)
    },
    // 已转账or离店禁止选择
    checkboxT({ pay_status }) {
      // pay_status 状态值详情见 readme
      const arr = [0]
      return arr.includes(pay_status)
    },
    // 判断是否显示调帐 分账
    tiaoDisable({ subject, pay_status }) {
      const arr = [0, 1]
      return !(arr.includes(pay_status) && subject === 'consume')
    },
    // 是否可已退款
    refundDisable(row) {
      return !(row.subject === 'pay' && row.can_arrange !== '0.00')
    },
    changeAcc(val, title) {
      const obj = {
        '冲调帐': 'TIAOZHANG',
        '分账': 'FENZHANG',
        '退款': 'TUIKUAN'
      }
      console.log(val, 323)
      this.rowData = val
      this.title = title
      this.accClass = obj[title]
      this.$refs.dalog.show()
    },
    handleSelectionChange(val) {
      console.log(val, 'ppp')
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
          this.getAccountLIst()
        })
      } else {
        this.$message.warning('请选择至少一条消费和付款')
      }
    },
    transferMe(type) {
      this.transType = type
      this.$refs.transfer.show()
    },
    // 打印账务详情
    onPrintDetails() {
      if (this.tableData.length > 0) {
        this.$refs.PrintDetailsDialog.getDetails(this.tableData)
      } else {
        this.$message.warning('当前账务为空')
      }
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

