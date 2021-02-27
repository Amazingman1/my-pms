<template>
  <div class="content-wrap">
    <el-row :gutter="20">
      <el-col :span="14">
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="境内查询" />
          <el-radio-button label="境外查询" />
        </el-radio-group>
        <el-button style="float: right;" size="mini" type="primary">证件扫描</el-button>

        <el-form style="padding: 15px;" :model="formInline" size="mini" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input v-model="formInline.name" placeholder="请输入内容" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件类型">
                <el-input v-model="formInline.name" placeholder="请输入内容" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="证件号码">
                <el-input v-model="formInline.name" placeholder="请输入内容" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别">
                <el-select v-model="formInline.sex" style="width: 100%;">
                  <el-option label="女" value="女" />
                  <el-option label="男" value="男" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="民族">
                <el-input v-model="formInline.name" placeholder="请输入内容" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生日期">
                <el-date-picker
                  v-model="formInline.end_time"
                  style="width: 100%;"
                  type="datetime"
                  placeholder="选择日期"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="家庭住址">
            <el-input v-model="formInline.name" width="100%" placeholder="请输入内容" />
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入住房号">
                <el-input v-model="formInline.name" placeholder="请输入内容" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发证机关">
                <el-select v-model="formInline.region" style="width: 100%;" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="有效期限">
                <el-date-picker
                  v-model="formInline.start_time"
                  type="datetime"
                  style="width: 100%;"
                  placeholder="选择日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="至">
                <el-date-picker
                  v-model="formInline.end_time"
                  style="width: 100%;"
                  type="datetime"
                  placeholder="选择日期"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input v-model="formInline.name" placeholder="请输入内容" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码">
                <el-input v-model="formInline.name" placeholder="请输入内容" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="10">
        <div>
          <el-button size="mini" type="primary">人脸验证</el-button>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { getUploadRecApi } from '@/api/pmsb'
export default {
  inject: ['hotel_id'],
  data() {
    return {
      formInline: {},
      tableData: [],
      totals: 0,
      radio1: '境内查询',
      loading: false,
      pageObj: {
        page: 1,
        page_size: 10
      }
    }
  },
  mounted() {
    this.getUploadRec()
  },
  methods: {
    getUploadRec() {
      this.loading = true
      getUploadRecApi({ hotel_id: this.hotel_id, value_type: 2, ...this.formInline, ...this.pageObj }).then(res => {
        this.tableData = res.data.items
        this.totals = res.data.count
        this.loading = false
      })
    }
  }
}
</script>

<style>
/* .content-wrap{
  display: flex;
  height:100%;
} */
</style>
