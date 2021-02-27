<template>
  <div>
    <el-dialog title="退房" :visible.sync="dialogFormVisible" append-to-body width="40%">
      <el-form :model="form" label-width="90px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="宾客:">
              {{ propsData.master_guest_list }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房间号:">
              {{ rowData.room_num }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="预收:">
              {{ rowData.pay_amount }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总消费:">
              {{ rowData.general_consumption }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="余额:">
              <span :style="rowData.balance > 0 ? 'color:red': 'color:#377D22'">{{ rowData.balance }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总退款金额:">
              {{ rowData.total_refund }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin-top:10px" label="备注:">
          <el-input v-model="form.remark" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="payOrRefund()" size="mini" :disabled="isPay()" type="primary" @click="payAccunt">收 款</el-button>
        <el-button v-else type="primary" size="mini" @click="refund">退 款</el-button>
        <el-button type="primary" size="mini" @click="beforColse">退 房</el-button>
      </div>
    </el-dialog>
    <Receipt ref="Receipt" :account-id="propsData.account ? propsData.account.id : 0" @rush="getaccBaseInfo" />
  </div>
</template>

<script>
import { closeDetailApi, accBaseInfoApi } from '@/api/accounts'
import { mapGetters } from 'vuex'
import { getCombineListApi } from '@/api/checkin'
import Receipt from '@/components/AdvanceReceipt/newReceipt'

export default {
  inject: ['banseInfo'],

  components: { Receipt },
  props: {
    accClass: {
      type: String,
      default: 'TIAOZHANG'
    },
    masterId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: {
        remark: ''
      },
      dialogFormVisible: false,
      Police_Devices_Code: '',
      loading: false,
      willAccunt: false,
      nameObj: {},
      formData: {},
      dialogVisible: false,
      pay_type_desc: '',
      accuntData: {},
      rowData: {
        balance: 0
      }
    }
  },

  computed: {
    propsData() { return this.banseInfo() },
    ...mapGetters([
      'cashAList'
    ])
  },
  methods: {
    // propsData
    // 判断收款or 退款
    payOrRefund() {
      if (this.propsData !== this.propsData.master_id) {
        if (this.rowData.balance > 0) {
          return false
        } else {
          return true
        }
      }
    },
    // 判断是否收款
    isPay() {
      if (!this.propsData.master_id) {
        if (this.rowData.balance > 0) {
          return true
        } else {
          return false
        }
      }
    },
    // 退款
    refund() {
      this.dialogFormVisible = false
      this.$emit('rushRefund')
    },
    // 收款
    payAccunt() {
      this.$refs.Receipt.show()
    },
    // 主账单的账务
    getCombineRoom() {
      getCombineListApi(this.propsData.id).then(res => {
        this.rowData = res.account_data
      })
    },
    show() {
      this.dialogFormVisible = true
      this.form.remark = this.propsData.remark
      if (this.masterId) {
        this.getCombineRoom()
      } else {
        this.getaccBaseInfo()
      }
    },
    // 获取账务信息
    getaccBaseInfo() {
      accBaseInfoApi(this.propsData.account.id).then(res => {
        const { data } = res
        this.rowData = data
      })
    },
    beforColse() {
      if (this.rowData.balance !== '0.00') {
        this.$confirm('当前账务未平，是否强制退房？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.accClose()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消结账退房'
          })
        })
      } else {
        this.accClose()
      }
    },
    // 结账
    accClose() {
      closeDetailApi(this.form, this.propsData.id).then(res => {
        this.$message.success('pms退房成功!')
        this.dialogFormVisible = false
        this.$emit('houseStaus')
      })
    }
  }
}
</script>

<style>

</style>
