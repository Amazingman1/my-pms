<template>
  <div
    style="
    border-bottom: 1px solid #ccc;"
  >
    <el-form ref="formName" :inline="true" :model="formInline" :rules="rules" class="demo-form-inline" size="mini">
      <el-form-item v-if="tableType === 'YUDING'|| tableType === 'HISRE'" prop="name__icontains">
        <el-input v-model="formInline.name__icontains" class="input" placeholder="姓名" />
      </el-form-item>
      <el-form-item v-else prop="name">
        <el-input v-model="formInline.master_guest__name__icontains" class="input" placeholder="姓名" />
      </el-form-item>
      <el-form-item v-if="tableType === 'YUDING' || tableType === 'HISRE'" prop="telephone__icontains">
        <el-input v-model="formInline.telephone__icontains" placeholder="手机号" maxlength="11" />
      </el-form-item>
      <el-form-item v-else prop="master_guest__telephone__icontains">
        <el-input v-model="formInline.master_guest__telephone__icontains" placeholder="手机号" maxlength="11" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.code_market" placeholder="市场码" @focus="getMKCode" @change="getSRCCode">
          <el-option v-for="p in marktCodeList" :key="p.id" :label="p.descript" :value="p.code" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.code_src" placeholder="来源码">
          <el-option v-for="p in srcCodeLit" :key="p.id" :label="p.descript" :value="p.code" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="tableType === 'DANGQIAN'">
        <el-select v-model="formInline.room_type_desc" placeholder="房型" @focus="getRoomTY">
          <el-option v-for="p in roomTypeList" :key="p.id" :label="p.descript" :value="p.descript" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="tableType === 'DANGQIAN' || tableType === 'YILI' ">
        <el-input v-model.number="formInline.room_number" placeholder="房间号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查 询</el-button>
        <el-button type="primary" plain @click="cansleSearch">取 消</el-button>
        <el-button v-if="tableType === 'DANGQIAN' || tableType ==='YUDING'" type="primary" @click="onPrint">打 印</el-button></el-form-item>
    </el-form>
    <!--当前在住-->
    <LiveDialog ref="LiveDialog" />
    <!--有效预定-->
    <ReserveDialog ref="ReserveDialog" />
  </div>
</template>

<script>
import { getMarktCode, getSrcCode, getRoomType } from '@/api/home'
import { validStr, validTels } from '@/utils/validate'
import LiveDialog from '../components/liveDialog/index'
import ReserveDialog from '../components/reserveDialog/index'
export default {
  components: {
    LiveDialog,
    ReserveDialog
  },
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    tableType: {
      type: String,
      default: 'YUDING'
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const validName = (rule, value, callback) => {
      if (validStr(value) || !value) {
        callback()
      } else {
        callback(new Error('请输入正确的姓名'))
      }
    }
    const validTelInfo = (rule, value, callback) => {
      if (validTels(value) || !value) {
        callback()
      } else {
        callback(new Error('请输入正整数!'))
      }
    }
    return {
      marktCodeList: [],
      srcCodeLit: [],
      roomTypeList: [],
      rules: {
        name__icontains: [
          { required: false, trigger: 'blur', validator: validName }
        ],
        master_guest__telephone__icontains: [
          { required: false, trigger: 'blur', validator: validTelInfo }
        ],
        telephone__icontains: [
          { required: false, trigger: 'blur', validator: validTelInfo }
        ]
      }
    }
  },
  computed: {
    formInline: {
      get(val) {
        return this.formData
      },
      set(val) {
        this.$emit('update:formData', val)
      }
    }
  },
  methods: {
    cansleSearch() {
      this.$emit('cansleSearch')
    },
    // 房间类型
    getRoomTY() {
      getRoomType().then(res => {
        const { data } = res
        this.roomTypeList = data.results
      })
    },
    // 搜索
    onSubmit() {
      this.$refs.formName.validate(valid => {
        if (valid) {
          this.$emit('serachList')
        }
      })
    },
    getMKCode() {
      getMarktCode().then(res => {
        this.marktCodeList = res.data.results
      })
    },
    getSRCCode() {
      this.formInline.code_src = ''
      getSrcCode({ code_category: this.formInline.code_market, page_size: 300 }).then(res => {
        this.srcCodeLit = res.data.results
      })
    },
    // 打印
    onPrint() {
      if (this.tableType === 'DANGQIAN') {
        this.$refs.LiveDialog.getDetails('DANGQIAN', this.tableData)
      } else {
        this.$refs.ReserveDialog.getReserve('YUDING', this.tableData)
      }
    }
  }
}

</script>

<style lang="scss" scoped>
/deep/.el-input__inner::placeholder{
  color:#000
}
</style>

