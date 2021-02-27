<template>
  <div>
    <el-form :model="formInline" :disabled="true" size="mini" class="demo-form-inline" label-width="80px">
      <el-form-item label="证件照">
        <img :src="formInline.profile_photo" alt="" style="height:100px;width:80px">
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="formInline.user_name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房间号">
            <el-input v-model="formInline.room_number" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="性别">
            <el-input v-model="formInline.sex" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期">
            <el-input v-model="formInline.birthday" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="证件类型">
            <el-input v-model="formInline.card_type" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码">
            <el-input v-model="formInline.card_number" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="民族">
            <el-input v-model="formInline.nation" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="户籍地址">
            <el-input v-model="formInline.permanent_address" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Territory',
  props: {
    formInline: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style>

</style>
