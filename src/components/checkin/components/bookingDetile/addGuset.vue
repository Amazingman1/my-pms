<!--
 * @Author: wangxuan
 * @Date: 2020-12-03 19:55:20
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-04 14:03:26
 * @FilePath: /vue-misb/src/components/checkin/components/bookingDetile/addGuset.vue
-->
<template>
  <div>
    <el-tabs v-model="activeNamea2" @tab-click="handleClick">
      <el-tab-pane label="未住宾客" name="first">
        <el-button type="primary" icon="el-icon-plus" size="mini" style="margin: 10px 0;" @click="clickAdd">增加宾客</el-button>
        <Tables ref="Tables" />
      </el-tab-pane>
      <el-tab-pane label="已住宾客" name="second">
        <LiveINGusetList ref="LiveINGusetList" />
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="新增宾客信息" :visible.sync="dialogFormVisible" append-to-body width="30%">
      <div style="width:70%">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini" style="padding-top:10px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio label="男" />
              <el-radio label="女" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机" prop="telephone">
            <el-input v-model="form.telephone" maxlength="11" />
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select v-model="form.id_code" placeholder="请选择" style="width:100%">
              <el-option v-for="p in idTypeList" :key="p.id" :label="p.descript" :value="p.code" />
            </el-select>
          </el-form-item>
          <template>
            <el-form-item label="证件号码">
              <el-input v-model="form.id_no" />
            </el-form-item>
          </template>
          <el-form-item label="生日">
            <el-date-picker
              v-model="form.birth"
              type="date"
              style="width:100%"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addGuest">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tables from './gusetList'
import LiveINGusetList from './liveINGusetList'
import { addGuestApi } from '@/api/book'
import { validTel, validStr } from '@/utils/validate'

export default {
  inject: ['banseInfo'],
  components: { Tables, LiveINGusetList },
  data() {
    const validTelInfo = (rule, value, callback) => {
      if (validTel(value) || !value) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号!'))
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
      activeNamea2: 'first',
      dialogFormVisible: false,
      form: {
        sex: '男',
        id_no: ''
      },
      flag: true,
      willLiveList: [],
      idTypeList: [
        { descript: '身份证', id: 1, code: '01' }
      ],
      rules: {
        name: [
          { required: true, message: '宾客姓名不能为空', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validName }
        ],
        sex: [
          { required: true, message: '性别必填', trigger: 'change' }
        ],
        telephone: [
          { required: false, trigger: 'blur', validator: validTelInfo }
        ]

      }
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
    clickAdd() {
      this.dialogFormVisible = true
      this.form = {
        sex: '男',
        id_no: ''
      }
    },
    addGuest() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            reserve_base: this.propsData.id,
            ...this.form
          }
          addGuestApi(params).then(res => {
            this.dialogFormVisible = false
            this.$message.success('添加成功!')
            this.$refs.Tables.getgetCanGuest()
          })
        }
      })
    },
    // 获取未住
    handleClick({ name }) {
      if (name === 'second') {
        this.$refs.LiveINGusetList.getWill()
      } else {
        this.$refs.Tables.getgetCanGuest()
      }
    }
  }

}
</script>

<style>

</style>
