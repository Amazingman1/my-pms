<template>
  <div>
    <el-dialog
      title="收款"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleCloses"
    >
      <component :is="componentName" :form-data="form" :link-re="false" />
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="payMoney">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisibleCode"
      width="14%"
      :title="pay_type_desc"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @opened="showQRcode"
    >
      <div id="myCode" ref="qrcode" />
    </el-dialog>
  </div>

</template>

<script>
import recepit from './receipt'
import QRCode from 'qrcodejs2'
import { payApi, verifyApi } from '@/api/checkin'
import { canselPayApi } from '@/api/accounts'
import { filterParams } from '@/utils/index'
export default {
  components: { recepit },
  props: {
    nameObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisibleCode: false,
      loading: false,
      componentName: 'recepit',
      pay_type_desc: '',
      form: {
        incoming_account_code: '',
        pay_amount: '',
        auth_code: null,
        desc: ''
      }
    }
  },
  methods: {
    handleCloses() {
      this.dialogVisible = false
    },
    showPay() {
      this.form = {
        incoming_account_code: '',
        pay_amount: '',
        auth_code: null,
        desc: ''
      }
      this.dialogVisible = true
    },
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
    showQRcode() {
      document.getElementById('myCode').innerHTML = ''
      this.makeCode(this.qrcodeUrl)
    },
    payMoney() {
      this.form.pay_amount = Number(this.form.pay_amount)
      this.form.account = this.nameObj.id
      this.form.charge_detail = this.nameObj.rowDataId || ''
      payApi(filterParams(this.form)).then(res => {
        const { data } = res
        this.payId = data.id
        if (data.pay_data.url !== '') {
          this.qrcodeUrl = data.pay_data.url
          this.pay_type_desc = data.pay_data.pay_type_desc
          this.dialogVisibleCode = true
          this.whether(data.id)
        } else {
          this.$message.success('付款成功！')
          this.willAc = {}
          this.dialogVisible = false
          this.loading = false
          this.$emit('reushTalb')
        }
      })
    },
    handleClose() {
      this.dialogVisibleCode = false
      this.loading = false
      canselPayApi({ id: this.payId }).then(res => {
        clearInterval(this.circulation)
      })
    },
    verify(val) {
      verifyApi({ id: val }).then(res => {
        if (res.message === 'success') {
          const { data } = res
          if (data.info === 1) {
            clearInterval(this.circulation)
            this.$message.success('支付成功！')
            this.dialogVisible = false
            this.dialogVisibleCode = false
            this.loading = false
            this.willAc = {
              incoming_account_code: '',
              pay_amount: '',
              auth_code: null,
              desc: ''
            }
          } else if (data.info === 0) {
            this.whether(val)
          }
        } else {
          this.$message.warning('支付已取消！')
          this.dialogVisibleCode = false
          clearInterval(this.circulation)
        }
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
    show() {
      this.dialogFormVisible = true
    }
  }
}
</script>

<style>

</style>
