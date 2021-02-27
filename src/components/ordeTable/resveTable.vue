<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      stripe
      size="mini"
      border
      highlight-current-row
    >
      <el-table-column
        prop="name"
        label="预定人"
      />
      <el-table-column
        prop="from_name"
        label="团队|会员|协议"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <span>{{ row.from_name | teamFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="联系电话"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <span>{{ row.telephone || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="arr_time"
        label="入住时间"
        show-overflow-tooltip
        sortable
        width="110px"
      >
        <template slot-scope="scope">
          <span>{{ format(scope.row.arr_time, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="leave_time"
        label="离店时间"
        sortable
        width="110px"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{ format(scope.row.leave_time, '{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="rate_code_desc"
        label="房价码"
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
        width="90px"
        sortable
        label="来源码"
      >
        <template slot-scope="{row}">
          <span>{{ row.code_src_desc || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="余额"
        sortable
        width="80px"
      >
        <template slot-scope="scope">
          <span :style=" scope.row.account.balance >0 ? redAmount : greenAmount">{{ scope.row.account.balance }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_user"
        label="销售员"
        width="80px"
      >
        <template slot-scope="{row}">
          <span>{{ row.create_user || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
      >
        <template slot-scope="{row}">
          <span>{{ row.remark || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="80"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-link type="primary" size="mini" :underline="false" @click="goCheckin(scope.row)">查看</el-link>
        </template>
      </el-table-column>
    </el-table>
    <BookingDetil ref="BookingDetil" />
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import BookingDetil from '@/components/checkin/bookingDetil'

export default {
  provide() {
    return {
      componentData: this.testData
    }
  },
  components: { BookingDetil },
  filters: {
    teamFilter(val) {
      if (val === undefined) { return '-' }
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
    tableType: {
      type: String,
      default: 'YUDING'
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
    // 格式化时间
    format(time, config) {
      return parseTime(time, config)
    },
    goCheckin(val) {
      console.log(val, '预定单详情')
      this.testData.data = {
        master_id: val.id,
        account_id: val.account.id
      }
      this.$refs.BookingDetil.show()
    }
  }
}
</script>
<style lang="scss" scoped>
// /deep/ .el-table .caret-wrapper{
//   right: -17px
// }
</style>
