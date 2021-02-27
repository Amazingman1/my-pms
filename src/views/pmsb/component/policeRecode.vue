<template>
  <div>
    <el-form :inline="true" :model="formInline" size="mini">
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="formInline.start_time"
          type="datetime"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="formInline.end_time"
          type="datetime"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUploadRec">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="uploaded_time"
        label="上传时间"
      />
      <el-table-column
        prop="room_no"
        label="房间"
      />
      <el-table-column
        prop="name"
        label="姓名"
      />
      <el-table-column
        prop="gender"
        label="性别"
      />
      <el-table-column
        prop="ethnicity"
        label="民族"
      />
      <el-table-column
        prop="id_type"
        label="证件类型"
      />
      <el-table-column
        prop="id_no"
        label="证件号码"
      />
      <el-table-column
        prop="birthday"
        label="出生日期"
      />
      <el-table-column
        prop="mail_addr"
        label="户籍地址"
      />
      <el-table-column
        prop="zip"
        label="证件照"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.id_portrait"
            fit="fill"
          />
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="totals>0"
      :total="totals"
      :page.sync="pageObj.page"
      :limit.sync="pageObj.page_size"
      @pagination="getUploadRec"
    />
  </div>
</template>

<script>
import { getUploadRecApi } from '@/api/pmsb'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  inject: ['hotel_id'],
  data() {
    return {
      formInline: {},
      tableData: [],
      totals: 0,
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

</style>
