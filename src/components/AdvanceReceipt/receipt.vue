<template>
  <div>
    <el-form :model="form" size="mini" label-width="85px">
      <el-form-item v-if="linkRe" label="账务信息">
        <span>{{ nameObj.room_number }}<span v-show="nameObj.room_number"> - </span>{{ nameObj.name }}</span>
      </el-form-item>
      <el-form-item label="收银点">
        <el-select v-model="form.cashier" placeholder="请选择" @focus="getCashList">
          <el-option
            v-for="item in cashAList"
            :key="item.id"
            :label="item.desc"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="付款方式">
        <el-select v-model="form.incoming_account_reason" placeholder="请选择" @change="getPayCode" @focus="getpayType">
          <el-option
            v-for="item in payTypeList"
            :key="item.id"
            :label="item.desc"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="入账代码">
        <el-select v-model="form.incoming_account_code" placeholder="请选择">
          <el-option
            v-for="item in payCodeList"
            :key="item.id"
            :label="item.desc"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <template v-if="show(form.incoming_account_code)">
        <el-form-item label="客户付款码">
          <el-input v-model="form.auth_code" @keyup="payCode" @blur="payCode" @keypress="payCode" />
        </el-form-item>
      </template>
      <el-form-item label="金额">
        <el-input v-model="form.pay_amount" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import { newPayApi, newPayForApi } from '@/api/accounts'
import { mapGetters } from 'vuex'

export default {
  name: 'RUYUSHOU',
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    nameObj: {
      type: Object,
      default: () => {}
    },
    linkRe: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      payTypeList: [],
      payCodeList: [],
      payforList: []
    }
  },
  computed: {
    form: {
      get(val) {
        return this.formData
      },
      set(val) {
        this.$emit('update:formData', val)
      }
    },
    ...mapGetters([
      'cashAList'
    ])
  },
  methods: {
    payCode(e) {
      e.preventDefault() // 阻止默认事件行为
      e.returnValue = false
      return (false)
    },
    // 格式化时间
    format(time, config) {
      return parseTime(time, config)
    },
    show(val) {
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
