<!--
 * @Author: wangxuan
 * @Date: 2020-11-30 19:50:09
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-01 09:41:02
 * @FilePath: /vue-misb/src/components/checkin/components/bookingDetile/canselBooking.vue
-->
<template>
  <el-dialog title="取消预定" :visible.sync="addVisible" width="25%" append-to-body>
    <el-form ref="form" :model="form" label-width="80px" size="mini">
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" />
      </el-form-item>
      <el-form-item label="取消原因">
        <el-input v-model="form.cancel_reason" type="textarea" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="addVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" :loading="loading" @click="cansel">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { cancelReserveApi } from '@/api/book'

export default {
  inject: ['banseInfo'],
  data() {
    return {
      addVisible: false,
      form: {},
      loading: false
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
    show() {
      this.addVisible = true
    },
    cansel() {
      this.dialog = true
      cancelReserveApi(this.propsData.id, this.form).then(res => {
        this.$message.success('取消预订单成功！')
        this.dialog = false
        this.addVisible = false
        this.$emit('rush')
      }).catch(() => {
        this.dialog = false
      })
    }
  }
}
</script>

<style>

</style>
