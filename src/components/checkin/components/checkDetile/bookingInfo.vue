<!--
 * @Author: wangxuan
 * @Date: 2020-11-20 15:34:18
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-11-20 16:18:48
 * @FilePath: /vue-misb/src/components/checkin/components/checkDetile/bookingInfo.vue
-->
<template>
  <el-dialog title="预定信息" :visible.sync="addVisible" width="30%" :append-to-body="true">
    <el-form ref="formName" :model="roomInfo" label-width="80px" size="mini">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="预定人:">
            {{ roomInfo.name || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话:">
            {{ roomInfo.telephone || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="到达时间:">
            {{ roomInfo.arr_time || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="离店时间:">
            {{ roomInfo.leave_time || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="操作人:">
            {{ roomInfo.modify_user || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="操作时间:">
            {{ roomInfo.modify_datetime || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="addVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { bookIngInfoApi } from '@/api/book'

export default {
  inject: ['banseInfo'],
  data() {
    return {
      addVisible: false,
      roomInfo: {}
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
    show() {
      this.addVisible = true
      this.changeOrdeInfo()
    },
    // 入住单修改入住信息
    changeOrdeInfo() {
      if (this.propsData.reserve_base) {
        bookIngInfoApi(this.propsData.reserve_base).then(res => {
          this.roomInfo = res.data
        })
      } else {
        this.roomInfo = {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .content{
    padding: 10px;
  }
</style>
