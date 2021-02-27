<!--
 * @Author: wangxuan
 * @Date: 2020-11-24 09:46:04
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-11-24 10:55:06
 * @FilePath: /vue-misb/src/components/checkin/components/checkDetile/addRoomPrice.vue
-->
<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" append-to-body width="30%">
    <el-form ref="form" :model="form" label-width="90px" size="mini" :rules="rules">
      <el-form-item label="加收类型">
        <el-radio-group v-model="form.incoming_account_code" size="mini" @change="changeType">
          <el-radio :label="16">全天</el-radio>
          <el-radio :label="18">半天</el-radio>
          <el-radio :label="19">手工</el-radio>
        </el-radio-group>
        <el-tooltip placement="top">
          <div slot="content">
            全天： 所选房间加收全天房费。<br>
            半天： 所选客人加收半天房费。<br>
            手工： 手工输入房费。<br>
          </div>
          <el-link icon="el-icon-info" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="账户信息">
        {{ propsData.room_number }} - {{ propsData.master_guest_list }}
      </el-form-item>
      <el-form-item label="金额" prop="charge_amount">
        <el-input v-model="form.charge_amount" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="addChargeDetail">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addChargeDetailApi } from '@/api/accounts'
import { mapGetters } from 'vuex'

export default {
  inject: ['banseInfo'],

  props: {
    rowData: {
      type: Object,
      default: () => {}
    },
    roomPrice: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      title: '',
      form: {
        incoming_account_code: 16,
        charge_amount: null,
        account: '',
        incoming_account_reason: 5
      },
      dialogFormVisible: false,
      rules: {
        charge_amount: [
          { required: true, message: '房价为必填不可为空', trigger: 'blur' }
        ]
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
    show() {
      console.log(this.propsData, '详情')
      this.form = {
        incoming_account_code: 16,
        charge_amount: this.propsData.room_price,
        account: this.propsData.account.id,
        incoming_account_reason: 5
      }
      this.dialogFormVisible = true
    },
    changeType(val) {
      if (this.form.incoming_account_code === 16) {
        this.form.charge_amount = this.propsData.room_price
      } else if (this.form.incoming_account_code === 18) {
        this.form.charge_amount = this.propsData.room_price / 2
      } else {
        this.form.charge_amount = null
      }
    },
    addChargeDetail() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addChargeDetailApi(this.form).then(res => {
            this.$message.success('加收成功')
            this.dialogFormVisible = false
            this.$emit('rush')
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
