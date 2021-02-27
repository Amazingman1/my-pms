<template>
  <div>
    <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="房间号">
            <el-input v-model="formInline.room_no" style="width:100%" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="英文姓名(Name)">
            <el-input v-model="formInline.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="中文名">
            <el-input v-model="formInline.room_number" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="性别">
            <el-select v-model="formInline.sex">
              <el-option label="女" value="女" />
              <el-option label="男" value="男" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出生日期(Date of Birth)">
            <el-date-picker
              v-model="formInline.birth"
              type="date"
              style="width:100%"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              default-value="1991-01-01"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话">
            <el-input v-model="formInline.phone" style="width:100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="证件类型(Type)">
            <el-select v-model="formInline.id_type" filterable @focus="getNationCode('id_type')">
              <el-option v-for="p in dictTypeObj.id_type" :key="p.code" :label="p.name" :value="p.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件号码(Identification No)">
            <el-input v-model="formInline.id_no" style="width:100%" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="国籍(Coutry)">
            <el-select v-model="formInline.nationality" style="width:100%" filterable :remote-method="getNationCode" @focus="getNationCode('nation_code')">
              <el-option v-for="p in dictTypeObj.nation_code" :key="'_' + p.name" :label="p.name" :value="p.code" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="入境口岸(port of Entry)">
            <el-select v-model="formInline.entry_port" filterable :remote-method="getNationCode" @focus="getNationCode('entry_port')">
              <el-option v-for="p in dictTypeObj.entry_port" :key="'_' + p.name" :label="p.name" :value="p.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入境日期(Date of Entry)">
            <el-date-picker
              v-model="formInline.entry_date"
              type="date"
              style="width:100%"
              placeholder="选择入境日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="停留天数">
            <el-input v-model="formInline.day" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="停留期止">
            <el-date-picker
              v-model="formInline.leave_time"
              style="width:100%"
              type="date"
              placeholder="选择停留期止"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签证(注)种类">
            <el-select v-model="formInline.visa_type" style="width:100%" filterable :remote-method="getNationCode" @focus="getNationCode('visa_type')">
              <el-option v-for="p in dictTypeObj.visa_type" :key="'_' + p.name" :label="p.name" :value="p.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签证(注)号码" style="width:100%">
            <el-input v-model="formInline.visa_no" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getNationCodeApi } from '@/api/pmsb'
// nation_code=国籍代码id_type=证件类型,entry_port=入境口岸,visa_type=签证类型
const listObj = {
  nation_code: 'nation_code',
  id_type: 'id_type',
  entry_port: 'entry_port',
  visa_type: 'visa_type'
}
export default {
  name: 'Abroad',
  props: {
    formOutline: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dictTypeObj: {
        id_type: [], // 证件类型
        nation_code: [], // 国籍列表
        entry_port: [], // 登陆口岸
        visa_type: [] // 签证类型
      }
    }
  },

  computed: {
    formInline: {
      get(val) {
        return this.formOutline
      },
      set(val) {
        this.$emit('update:formOutline', val)
      }
    }
  },
  methods: {
    getNationCode(val) {
      const params = {
        dict_type: listObj[val],
        name: ''
      }
      getNationCodeApi(params).then(res => {
        const { data } = res
        this.dictTypeObj[val] = data.items
      })
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style>

</style>
