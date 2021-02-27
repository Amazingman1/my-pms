<!--
 * @Author: wangxuan
 * @Date: 2020-08-14 16:05:01
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-09-17 16:30:17
 * @FilePath: /vue-misb/src/components/checkGuest/components/idcard.vue
-->
<template>
  <el-form size="mini" :model="formInline" class="demo-form-inline">
    <el-form-item label="姓名">
      <el-input v-model="formInline.name" placeholder="姓名" />
    </el-form-item>
    <el-form-item label="请输入证件号">
      <el-input v-model="formInline.id_no" placeholder="请填写身份证号" />
    </el-form-item>
    <el-form-item>
      <el-image
        style="width: 218px; height: 204px"
        :src="getBase64"
        :fit="'fit'"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { searchNoCardApi } from '@/api/pmsb'
export default {
  props: {
    getBase64: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formInline: {
        id_no: '',
        name: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.getBase64, 99999)
      searchNoCardApi({ ...this.formInline, cur_portrait_64: this.getBase64 }).then(res => {
        console.log(res, 'submit!')
      })
    }
  }
}
</script>

<style>

</style>
