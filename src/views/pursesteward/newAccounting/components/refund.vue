<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" label-width="100px" size="mini">
        <div v-if="title === '调帐'">
          <el-form-item label="可调账金额">
            {{ rowData.can_arrange }}
          </el-form-item>
          <el-form-item label="操作方式">
            <el-radio-group v-model="formTiao.arrange_flag" size="mini" @change="changeType">
              <el-radio :label="0">调帐</el-radio>
              <el-radio :label="1">冲账</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="调整金额">
            <el-input v-model="formTiao.arranged_amount" :disabled="accDisable" autocomplete="off" />
          </el-form-item>
          <el-form-item label="收银点">
            <el-select v-model="formTiao.cashier" placeholder="请选择收银点">
              <el-option
                v-for="item in cashAList"
                :key="item.id"
                :label="item.desc"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formTiao.desc" autocomplete="off" />
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="收银点">
            <el-select v-model="form.cashier" placeholder="请选择活动区域">
              <el-option
                v-for="item in cashAList"
                :key="item.id"
                :label="item.desc"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="最大可退金额">
            <span>{{ rowData.can_arrange }}</span>
          </el-form-item>
          <el-form-item label="退款金额">
            <el-input v-model="form.pay_amount" placeholder="退款金额小于剩余金额" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.desc" />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel">取 消</el-button>
        <el-button size="mini" type="primary" @click="submint">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addIncreaseApi, refundApi } from '@/api/accounts'
import { mapGetters } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    rowData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {},
      formTiao: {
        arrange_flag: 0,
        arranged_amount: null,
        cashier: null
      },
      accDisable: false,
      dialogFormVisible: false,
      cashList: []
    }
  },
  computed: {
    ...mapGetters([
      'cashAList'
    ])
  },
  methods: {
    show() {
      this.dialogFormVisible = true
      this.accDisable = false
      this.getCashList()
      this.form = {}
      this.formTiao = {
        arrange_flag: 0,
        arranged_amount: null,
        cashier: null
      }
    },
    cancel() {
      this.dialogFormVisible = false
      this.form = {}
      this.formTiao = {
        arrange_flag: 0,
        arranged_amount: null,
        cashier: null
      }
    },
    // 获取收银点
    getCashList() {
      this.$store.dispatch('checkin/getCashInfo')
    },
    submint() {
      this.form.charge_detail = this.rowData.id
      this.form.account = this.rowData.account
      if (this.title === '调帐') {
        this.formTiao.arranged_amount = Number(this.formTiao.arranged_amount)
        this.formTiao.charge_detail = this.rowData.id
        this.formTiao.account = this.rowData.account
        this.addIncrease(this.formTiao)
      } else {
        if (this.form.pay_amount > Number(this.rowData.can_arrange)) {
          return
        }
        const params = {
          pay_amount: Number(this.form.pay_amount), // 退款金额
          desc: this.form.desc, // 描述
          account: this.rowData.account, // 住单id
          cashier: this.form.cashier, // 收银点
          charge_detail: this.rowData.id // 消费单id
        }
        this.refund(params)
      }
    },
    changeType(val) {
      if (this.formTiao.arrange_flag === 1) {
        this.formTiao.arranged_amount = this.rowData.charge_amount
        this.accDisable = true
      } else {
        this.formTiao.arranged_amount = ''
        this.accDisable = false
      }
    },
    addIncrease(val) {
      addIncreaseApi(val).then(res => {
        // flag: 0 调帐
        // flag: 1 冲账
        if (res.data.flag === 0) {
          this.$message.success('调账成功!')
        } else {
          this.$message.success('冲账成功!')
        }

        this.formTiao.arrange_flag = 1
        this.formTiao.arranged_amount = ''
        this.dialogFormVisible = false
        this.$emit('rushRfundTable')
        this.formTiao = {
          arrange_flag: 0
        }
      })
    },
    refund(val) {
      refundApi(val).then(res => {
        this.$message.success('退款成功!')
        this.form.pay_amount = null
        this.dialogFormVisible = false
        this.$emit('rushRfundTable')
      })
    }
  }
}
</script>

<style>

</style>
