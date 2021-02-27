<!--
 * @Author: wangxuan
 * @Date: 2020-12-21 11:17:48
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-21 15:47:04
 * @FilePath: /vue-misb/src/views/guests/components/search.vue
-->
<template>
  <div style="border-bottom: 1px solid #ccc;">
    <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.name__icontains" placeholder="姓名" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.room_number" filterable placeholder="房间号">
          <el-option label="全部" :value="null" />
          <el-option v-for="(p, index) in roomList" :key="index" :label="p.room_no" :value="p.room_no" />
        </el-select>
      </el-form-item>
      <el-form-item v-show="live">
        <el-date-picker
          v-model="formInline.master_base__arr_time__gte"
          type="date"
          placeholder="入住日期"
          size="mini"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item v-show="!live">
        <el-date-picker
          v-model="formInline.master_base__leave_time__gte"
          type="date"
          placeholder="离店日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          size="mini"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchFn">查 询</el-button>
        <el-button type="primary" plain @click="cansleFn">取 消</el-button>
        <el-button type="primary" @click="live?exportDataEvent():dialogFormVisible = true">导出EXCEL</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="选择导出时间端" :visible.sync="dialogFormVisible" width="30%" :append-to-body="true">
      <el-form :model="formData" size="mini" label-width="20px">
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <el-date-picker
                v-model="formData.start_biz_date"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                style="width:100%"
                :clearable="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="-">
              <el-date-picker
                v-model="formData.end_biz_date"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                style="width:100%"
                :clearable="false"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cansleSelectDate">取 消</el-button>
        <el-button type="primary" size="mini" @click="exportDataEvent">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { roomNumberListApi, downLoad } from '@/api/geustList'

export default {
  props: {
    live: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      formInline: {},
      formData: {
        start_biz_date: '',
        end_biz_date: ''
      },
      roomList: [],
      dialogFormVisible: false
    }
  },
  mounted() {
    this.roomNumberList()
  },
  methods: {
    // 搜索
    searchFn() {
      this.$emit('searchFn', { ...this.formInline })
    },
    // 取消搜索
    cansleFn() {
      this.formInline = {}
      this.$emit('searchFn', { ...this.formInline })
    },
    // 获取在住房间号
    roomNumberList() {
      roomNumberListApi().then(res => {
        const { data } = res
        this.roomList = data.results
      })
    },
    cansleSelectDate() {
      this.dialogFormVisible = false
      this.formData = {
        start_biz_date: '',
        end_biz_date: ''
      }
    },
    // 导出表格
    exportDataEvent() {
      const data = {
        master_status_lable: this.live ? 0 : 1,
        start_biz_date: this.formData.start_biz_date,
        end_biz_date: this.formData.end_biz_date
      }
      downLoad(data, { page_size: this.total }).then(res => {
        this.dialogFormVisible = false
        this.formData = {
          start_biz_date: '',
          end_biz_date: ''
        }
        window.location.href = res.data.download
      })
    }
  }
}
</script>

<style>

</style>
