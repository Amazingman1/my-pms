<!--
 * @Author: wangxuan
 * @Date: 2020-12-18 09:59:51
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-24 14:04:44
 * @FilePath: /vue-misb/src/views/guests/components/tabls.vue
-->
<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      stripe
      size="mini"
      style="width: 100%"
    >
      <el-table-column prop="name" label="姓名">
        <template slot-scope="{row}">
          <span>{{ row.name || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房间号">
        <template slot-scope="{row}">
          <span>{{ row.room_number || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="50">
        <template slot-scope="{row}">
          <span>{{ row.sex || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="arr_time" label="入住时间" />
      <el-table-column prop="leave_time" label="离店时间" />
      <el-table-column prop="days" label="入住天数" width="80">
        <template slot-scope="{row}">
          <span>{{ row.days || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="telephone" label="电话">
        <template slot-scope="{row}">
          <span>{{ row.telephone || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id_code_desc" label="证件类型">
        <template slot-scope="{row}">
          <span>{{ row.id_code_desc || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id_no" label="证件号">
        <template slot-scope="{row}">
          <span>{{ row.id_no || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="goCheckDetile(scope.row)">详 情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <CheckinDetil ref="checkinDetil" />
  </div>
</template>

<script>
import CheckinDetil from '@/components/checkin/checkinDetil'

export default {
  provide() {
    return {
      componentData: this.testData
    }
  },
  components: {
    CheckinDetil
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      testData: {}
    }
  },
  methods: {
    goCheckDetile(val) {
      this.testData.data = {
        master_base: {
          master_id: val.master_base.id
        }
      }
      this.$refs.checkinDetil.show()
    }
  }
}
</script>

<style />
