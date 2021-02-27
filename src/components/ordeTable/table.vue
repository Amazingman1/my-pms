<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      border
      size="mini"
      stripe
      highlight-current-row
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        prop="room_type_desc"
        label="房型"
        sortable
        :show-overflow-tooltip="true"
      >
        <template slot-scope="{row}">
          <span>{{ row.room_type_desc || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="room_number"
        label="房间"
        width="75"
      >
        <template slot-scope="{row}">
          <span>{{ row.room_number || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="master_guest_list"
        label="在住人"
        sortable
        width="90px"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="{row}">
          <span>{{ row.master_guest_list || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="from_name"
        label="团队|会员|协议"
      >
        <template slot-scope="{row}">
          <span>{{ row.from_name | teamFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="master_phone_list"
        label="联系电话"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="{row}">
          <span>{{ row.master_phone_list || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="arr_time"
        label="入住时间"
        :show-overflow-tooltip="true"
        sortable
        width="110"
      >
        <template slot-scope="scope">
          <span>{{ format(scope.row.arr_time, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="leave_time"
        label="离店时间"
        sortable
        :show-overflow-tooltip="true"
        width="110"
      >
        <template slot-scope="scope">
          <span>{{ format(scope.row.leave_time, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="rate_code_desc"
        label="房价码"
        sortable
        width="90px"
      >
        <template slot-scope="{row}">
          <span>{{ row.rate_code_desc || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="code_market_desc"
        label="市场码"
        sortable
        width="90px"
      />
      <el-table-column
        prop="code_src_desc"
        sortable
        label="来源码"
        width="90px"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="remark2"
        label="结账提醒"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="{row}">
          <span>{{ row.remark2 || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否换房"
        width="80px"
      >
        <template slot-scope="scope">
          <span :style="scope.row.is_change_room ? 'color: green': 'color: red'">{{ scope.row.is_change_room ? 'T': 'F' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="room_price"
        label="房价"
        sortable
        width="80px"
      >
        <template slot-scope="scope">
          <span style="color: red">{{ scope.row.room_price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="余额"
        width="80px"
      >
        <template slot-scope="scope">
          <span :style=" scope.row.account.balance >0 ? redAmount : greenAmount">{{ scope.row.account.balance }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="{row}">
          <span>{{ row.remark || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="80px"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-link type="primary" size="mini" :underline="false" @click="goCheckin(scope.row)">查看</el-link>
        </template>
      </el-table-column>
    </el-table>
    <CheckinDetil ref="CheckinDetil" />
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import CheckinDetil from '@/components/checkin/checkinDetil'

export default {
  provide() {
    return {
      componentData: this.testData
    }
  },
  components: { CheckinDetil },
  filters: {
    teamFilter(val) {
      if (val === undefined) { return }
      const arrStr = val.split('|')
      if (arrStr[0] === '' && arrStr[1] === '' && arrStr[2] === '') {
        return '-'
      } else {
        return val
      }
    }
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
      redAmount: `color: red`,
      greenAmount: `color: green`,
      testData: {}
    }
  },
  methods: {
    // 列别颜色
    tableRowClassName({ row, rowIndex }) {
      if (row.master_status_lable === 2) {
        return 'warning-row-bg'
      }
      return ''
    },
    // 格式化时间
    format(time, config) {
      return parseTime(time, config)
    },
    goCheckin(val) {
      this.testData.data = {
        master_base: {
          master_id: val.id
        }
      }
      this.$refs.CheckinDetil.show()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
