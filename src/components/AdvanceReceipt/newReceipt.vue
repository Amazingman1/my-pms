<template>
  <el-dialog title="入预收" :visible.sync="dialogFormVisible" width="25%" append-to-body>
    <el-form ref="form" :model="form" label-width="85px" size="mini" :rules="rules">
      <el-form-item label="收银点">
        <el-select v-model="form.cashier" placeholder="请选择" style="width:100%" @focus="getCashList">
          <el-option
            v-for="item in cashAList"
            :key="item.id"
            :label="item.desc"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="付款方式" prop="incoming_account_reason">
        <el-select v-model="form.incoming_account_reason" placeholder="请选择" style="width:100%" @change="getPayCode" @focus="getpayType">
          <el-option
            v-for="item in payTypeList"
            :key="item.id"
            :label="item.desc"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="入账代码" prop="incoming_account_code">
        <el-select v-model="form.incoming_account_code" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in payCodeList"
            :key="item.id"
            :label="item.desc"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <template v-if="showss(form.incoming_account_code)">
        <el-form-item label="客户付款码">
          <el-input v-model="form.auth_code" />
        </el-form-item>
      </template>
      <el-form-item label="金额" prop="pay_amount">
        <el-input v-model="form.pay_amount" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="dialogFormVisible = false, payLoading = false">取 消</el-button>
      <el-button :loading="payLoading" size="mini" type="primary" @click="editSave">确 定</el-button>
    </span>
    <el-dialog
      :visible.sync="dialogVisible"
      width="14%"
      :title="pay_type_desc"
      :before-close="handleClose"
      :close-on-click-modal="false"
      append-to-body
      @opened="showQRcode"
    >
      <div id="myCode" ref="qrcode" />
    </el-dialog>
  </el-dialog>
</template>

<script>
import { parseTime } from '@/utils/index'
import { newPayApi, newPayForApi, canselPayApi } from '@/api/accounts'
import { payApi, verifyApi } from '@/api/checkin'
import { mapGetters } from 'vuex'
import { validTels } from '@/utils/validate'
import QRCode from 'qrcodejs2'

export default {
  name: 'RUYUSHOU',
  props: {
    accountId: {
      type: Number,
      default: 0
    }
  },
  data() {
    const validNumber = (rule, value, callback) => {
      if (validTels(value)) {
        callback()
      } else {
        callback(new Error('请输入正整，小数保留两位!'))
      }
    }
    return {
      payLoading: false,
      payTypeList: [],
      payCodeList: [],
      payforList: [],
      dialogFormVisible: false,
      dialogVisible: false,
      circulation: '',
      pay_type_desc: '',
      payId: null,
      qrcodeUrl: '',
      form: {
        cashier: '',
        incoming_account_reason: '',
        incoming_account_code: '',
        auth_code: null,
        pay_amount: '',
        desc: ''
      },
      rules: {
        incoming_account_reason: [
          { required: true, message: '付款方式不可为空', trigger: 'change' }
        ],
        incoming_account_code: [
          { required: true, message: '入账代码不可为空', trigger: 'change' }
        ],
        pay_amount: [
          { required: true, message: '金额不能为空', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validNumber }

        ]
      }
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
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
      this.form = {
        cashier: '',
        incoming_account_reason: '',
        incoming_account_code: '',
        auth_code: null,
        pay_amount: '',
        desc: ''
      }
    },
    // 格式化时间
    format(time, config) {
      return parseTime(time, config)
    },
    showss(val) {
      const arr = this.payCodeList.filter(p => {
        return p.id === val
      })
      if (arr.length > 0 && arr[0].request_data) {
        this.payforList = JSON.parse(arr[0].request_data)
        return true
      } else {
        return false
      }
    },
    // 获取收银点
    getCashList() {
      this.$store.dispatch('checkin/getCashInfo')
    },
    // 付款方式
    getpayType(key) {
      newPayApi({ code_type: 2 }).then(res => {
        const { data } = res
        this.payTypeList = data
        this.form.incoming_account_code = ''
        this.form.auth_code = null
      })
    },
    // 入账代码
    getPayCode() {
      const params = {
        code_type: 2,
        in_or_out: 1,
        parent_id: this.form.incoming_account_reason
      }
      newPayForApi(params).then(res => {
        const { data } = res
        this.payCodeList = data
      })
    },
    editSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const acForm = {
            account: this.accountId,
            ...this.form
          }
          this.pay(acForm)
        }
      })
    },
    pay(data) {
      this.payLoading = true
      data.pay_amount = Number(data.pay_amount)
      payApi(data).then(res => {
        const { data } = res
        this.payId = data.id
        this.qrcodeUrl = data.pay_data.url
        this.pay_type_desc = data.pay_data.pay_type_desc
        if (this.qrcodeUrl !== '') {
          this.dialogVisible = true
        }
        this.whether(data.id)
      }).catch(() => {
        this.payLoading = false
      })
    },
    // 封装微信二维码后的定时器
    whether(payment_id) {
      const that = this
      clearInterval(this.circulation)
      this.circulation = setInterval(function() { // 开启循环：
        that.timer++
        that.verify(payment_id)
        if (that.timer >= 60) {
          clearInterval(this.circulation)
          return
        }
      }, 2000)
    },
    verify(val) {
      verifyApi({ id: val }).then(res => {
        if (res.message === 'success') {
          const { data } = res
          if (data.info === 1) {
            clearInterval(this.circulation)
            this.$message.success('支付成功！')
            this.payLoading = false
            this.dialogVisible = false
            this.dialogFormVisible = false
            this.$emit('rush')
          } else if (data.info === 0) {
            this.whether(val)
          }
        } else {
          this.$message.warning('支付已取消！')
          this.dialogVisible = false
          this.form = {}
          clearInterval(this.circulation)
        }
      }).catch(() => {
        this.payLoading = false
      })
    },
    showQRcode() {
      document.getElementById('myCode').innerHTML = ''
      this.makeCode(this.qrcodeUrl)
    },
    // 支付码码转为二维码
    makeCode(url) {
      new QRCode(document.getElementById('myCode'), {
        text: url,
        width: 210,
        height: 210,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    handleClose() {
      this.dialogVisible = false
      this.loading = false
      this.payLoading = false
      canselPayApi({ id: this.payId }).then(res => {
        clearInterval(this.circulation)
      })
    }
  }
}
</script>

<style lang='scss' scopde>
  .demo-drawer__footer{
    display: flex;
     button {
      flex: 1;
    }
  }
</style>
