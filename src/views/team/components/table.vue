<!--
 * @Author: wangxuan
 * @Date: 2020-12-17 20:12:30
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-22 11:02:21
 * @FilePath: /vue-misb/src/views/team/components/table.vue
-->
<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      size="mini"
    >
      <el-table-column prop="company_name" label="协议公司">
        <template slot-scope="{row}">
          <span>{{ row.company_name || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="team_name" label="团队名">
        <template slot-scope="{row}">
          <span>{{ row.team_name || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="order_no" label="团队订单号" width="135" />
      <el-table-column prop="arr_time" label="到达日期" width="135" />
      <el-table-column prop="leave_time" label="离开日期" width="135" />
      <el-table-column prop="name" label="领队姓名">
        <template slot-scope="{row}">
          <span>{{ row.name || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="telephone" label="领队电话">
        <template slot-scope="{row}">
          <span>{{ row.telephone || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="code_src_desc" label="来源码" />
      <el-table-column prop="rate_code" label="房价码" />
      <el-table-column prop="room_price" label="房价" width="80" />
      <el-table-column prop="balance" label="余额" width="80" />
      <el-table-column prop="usable_pre_authorized" label="信用" width="80" />
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.master_ids.length" type="text" size="mini" @click="goCheckin(scope.row)">详 情</el-button>
          <el-button v-else type="text" size="mini" @click="goCheckDetile(scope.row)">详 情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <CheckinDetil ref="checkinDetil" />
    <BookingDetil ref="BookingDetil" />
  </div>

</template>

<script>
import CheckinDetil from '@/components/checkin/checkinDetil'
import BookingDetil from '@/components/checkin/bookingDetil'

export default {
  provide() {
    return {
      componentData: this.testData
    }
  },
  components: {
    CheckinDetil,
    BookingDetil
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      testData: {}
    }
  },
  methods: {
    goCheckin(val) {
      this.testData.data = {
        master_id: val.id
      }
      this.$refs.BookingDetil.show()
    },
    goCheckDetile({ master_ids }) {
      this.testData.data = { master_base: { master_id: master_ids[0] }}
      this.$refs.checkinDetil.show()
    }
  }
}
</script>

<style />
