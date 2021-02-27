<template>
  <el-dialog
    title="房价码"
    :visible.sync="dialogRateCode"
    width="60%"
    append-to-body
  >
    <el-table :data="roomPriceCodeList" stripe style="width: 100%" size="mini" @row-click="slectRoomPriceCode">
      <el-table-column prop="code" label="code" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="category_desc" label="类别" />
      <el-table-column prop="start_date" label="开始日期" width="85px" />
      <el-table-column prop="end_date" label="结束日期" width="85px" />
      <el-table-column prop="check_in_time" label="最早入住时间" width="95px" />
      <el-table-column prop="check_out_time" label="最迟离店时间" width="95px" />
      <el-table-column prop="hours" label="时长" />
      <el-table-column prop="market" label="市场码" />
      <el-table-column prop="src" label="来源码" />
      <el-table-column prop="is_house_user" label="自用房">
        <template slot-scope="{row}">
          <span> {{ row.is_house_user | statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="is_free" label="免费房">
        <template slot-scope="{row}">
          <span> {{ row.is_free | statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="is_secret" label="房价保密">
        <template slot-scope="{row}">
          <span> {{ row.is_secret | statusFilter }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- <Pagination
      v-show="seschForm.total>0"
      :total="seschForm.total"
      :page.sync="seschForm.page"
      :limit.sync="seschForm.page_size"
      @pagination="search"
    /> -->
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogRateCode = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { rataCodeListData } from '@/api/home'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '否',
        1: '是'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      dialogRateCode: false,
      roomPriceCodeList: [],
      total: 0,
      seschForm: {
        page: 1,
        page_size: 10
      }
    }
  },
  methods: {
    show() {
      this.search()
      this.dialogRateCode = true
    },
    slectRoomPriceCode() {},
    search() {
      const params = {
        is_day_user: 1,
        page: this.seschForm.page,
        page_size: this.seschForm.page_size
      }
      rataCodeListData(params).then(res => {
        const { data } = res
        this.total = data.count
        this.roomPriceCodeList = data.results
      })
    }
  }
}
</script>

<style>

</style>
