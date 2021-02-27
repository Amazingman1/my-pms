<!--
 * @Author: wangxuan
 * @Date: 2020-09-22 10:49:17
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-25 15:43:26
 * @FilePath: /vue-misb/src/components/checkin/components/checkDetile/leaveEarly.vue
-->
<template>
  <el-dialog title="提前离店" :visible.sync="dialogFormVisible" width="40%" :append-to-body="true">
    <el-form :model="formData" size="mini" label-width="90px">
      <el-form-item label="原入离日期:">
        <span>{{ format(propsData.arr_time, '{y}-{m}-{d}') }}</span>
        <span>-</span>
        <span>{{ format(propsData.leave_time, '{y}-{m}-{d}') }}</span>
      </el-form-item>
      <el-form-item label="现离店日期:">
        <el-date-picker
          v-model="formData.leave_time"
          type="datetime"
          placeholder="选择日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="14:00:00"
          style="width:100%"
          :picker-options="endTime"
          :clearable="false"
          @change="changeTime"
        />
      </el-form-item>
      <el-form-item label="备注:">
        <el-input v-model="formData.remark" type="textarea" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="submint">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { parseTime } from '@/utils/index'
import { leaveShopApi } from '@/api/checkin'

export default {
  inject: ['banseInfo'],
  data() {
    return {
      formData: {
        leave_time: ''
      },
      dialogFormVisible: false,
      endTime: {
        disabledDate: time => {
          const arrTime = new Date(this.propsData.leave_time).getTime() - 24 * 60 * 60 * 1000
          const endTime = new Date(this.propsData.arr_time).getTime() - 24 * 60 * 60 * 1000
          // return time.getTime() >= new Date(this.propsData.leave_time).getTime() - 24 * 60 * 60 * 1000 // 当天也可做预定
          return time.getTime() > arrTime || time.getTime() < endTime
        }
      }
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
    show() {
      this.dialogFormVisible = true
    },
    // 格式化时间
    format(time, config) {
      return parseTime(time, config)
    },
    changeTime() {
      this.formData.old_leave_time = this.propsData.leave_time
    },
    submint() {
      leaveShopApi(this.formData, this.propsData.id).then(res => {
        this.$message.success('提前离店成功！')
        this.form = {}
        this.dialogFormVisible = false
        this.$emit('rush')
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
