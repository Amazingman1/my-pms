<template>
  <div class>
    <el-form :model="form" size="mini" label-width="85px">
      <el-form-item label="账务信息">
        <span>{{ nameObj.room_number }}- {{ nameObj.name }}</span>
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
      <el-form-item label="付款原因">
        <el-select v-model="form.incoming_account_reason" placeholder="请选择" @focus="getPayFor" @change="getPayForCode">
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
      <el-form-item label="金额">
        <el-input v-model="form.charge_amount" />
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
  name: 'RUXIAOFEI',
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    nameObj: {
      type: Object,
      default: () => {}
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
