<template>
  <el-dialog title="入消费" :visible.sync="dialogFormVisible" width="25%" append-to-body>
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
      <el-form-item label="付款原因" prop="incoming_account_reason">
        <el-select v-model="form.incoming_account_reason" placeholder="请选择" style="width:100%" @focus="getPayFor" @change="getPayForCode">
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
      <el-form-item label="金额" prop="charge_amount">
        <el-input v-model="form.charge_amount" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="dialogFormVisible = false">取 消</el-button>
      <el-button :loading="payLoading" size="mini" type="primary" @click="editSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { parseTime } from '@/utils/index'
import { newPayApi, newPayForApi } from '@/api/accounts'
import { addAccApi } from '@/api/checkin'
import { mapGetters } from 'vuex'
import { validTels } from '@/utils/validate'

export default {
  name: 'RUXIAOFEI',
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
      payTypeList: [],
      payCodeList: [],
      payforList: [],
      dialogFormVisible: false,
      payLoading: false,
      form: {
        cashier: '',
        incoming_account_reason: '',
        incoming_account_code: '',
        charge_amount: '',
        desc: ''
      },
      rules: {
        incoming_account_reason: [
          { required: true, message: '付款方式不可为空', trigger: 'change' }
        ],
        incoming_account_code: [
          { required: true, message: '入账代码不可为空', trigger: 'change' }
        ],
        charge_amount: [
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
        charge_amount: '',
        desc: ''
      }
    },
    // 格式化时间
    format(time, config) {
      return parseTime(time, config)
    },
    // 获取收银点
    getCashList() {
      this.$store.dispatch('checkin/getCashInfo')
    },
    // 如消费的付款原因
    getPayFor() {
      newPayApi({ code_type: 1 }).then(res => {
        const { data } = res
        this.payTypeList = data
        this.form.incoming_account_code = ''
      })
    },
    // 入消费入账码码
    getPayForCode() {
      const params = {
        code_type: 1,
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
          this.payLoading = true
          addAccApi(acForm).then(res => {
            this.$message.success('入消费成功！')
            this.dialogFormVisible = false
            this.payLoading = false
            this.$emit('rush')
          }).catch(() => {
            this.payLoading = false
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scopde>
</style>
