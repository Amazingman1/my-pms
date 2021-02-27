<template>
  <el-dialog title="修改宾客信息" :visible.sync="addVisible" width="25%" :append-to-body="true">
    <div class="content">
      <el-form ref="formName" :model="guestData" label-width="80px" size="mini" :rules="rules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="guestData.name" autocomplete="no" />
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="guestData.telephone" maxlength="11" />
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select v-model="guestData.id_code" placeholder="请选择证件类型" style="width:100%">
            <el-option v-for="p in idTypeList" :key="p.id" :label="p.descript_en" :value="p.code" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="guestData.id_code === '01'" label="证件号码" prop="id_no">
          <el-input v-model="guestData.id_no" maxlength="18" @blur="birthDate" />
        </el-form-item>
        <el-form-item v-else label="证件号码">
          <el-input v-model="guestData.id_no" maxlength="18" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="guestData.sex" label="男" />
          <el-radio v-model="guestData.sex" label="女" />
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-input v-model="guestData.birth" autocomplete="no" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="guestData.address" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="guestData.email" autocomplete="off" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="addVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="editSave(guestData)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { editGuestsApi } from '@/api/checkin'
import { getBirthdayFromIdCard } from '@/utils/index'
import { validateIdCard, validTel, validEmail, validStr, isCheckinInfo } from '@/utils/validate'

export default {
  props: {
    guestData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const validId = (rule, value, callback) => {
      if (validateIdCard(value)) {
        isCheckinInfo(value, callback)
      } else {
        callback(new Error('请输入正确的身份证号!'))
      }
    }
    const validTelInfo = (rule, value, callback) => {
      if (validTel(value)) {
        callback()
      } else if (!value) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号!'))
      }
    }
    const validEm = (rule, value, callback) => {
      if (validEmail(value)) {
        callback()
      } else if (!value) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱!'))
      }
    }
    const validName = (rule, value, callback) => {
      if (validStr(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的宾客名!'))
      }
    }
    return {
      dialogTableVisible: false,
      addVisible: false,
      form: {
        id_no: '',
        birth: ''
      },
      rules: {
        name: [
          { required: true, message: '名称为必填不可为空', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validName }
        ],
        id_code: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        id_no: [
          { required: true, message: '请输入证件号', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validId }
        ],
        telephone: [
          { required: false, message: '请输入手机号', trigger: 'blur' },
          { required: false, trigger: 'change', validator: validTelInfo }
        ],
        email: [
          { required: false, trigger: 'blur', validator: validEm }
        ],
        sex: [
          { required: true, message: '请选择选择性别', trigger: 'change' }
        ]

      }
    }
  },
  computed: {
    ...mapGetters([
      'idTypeList'
    ])
  },
  methods: {
    show() {
      this.addVisible = true
    },
    valid() {
      this.$refs.guestsInfo1.handleChange()
    },
    birthDate() {
      this.form.birth = getBirthdayFromIdCard(this.form.id_no)
    },
    editSave(val) {
      this.$refs.formName.validate(valid => {
        if (valid) {
          editGuestsApi(val, val.id).then(res => {
            this.addVisible = false
            this.$message.success('宾客信息修改成功!')
            this.$emit('rush')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content{
    padding: 10px;
    // height: 400px;
  }
</style>
