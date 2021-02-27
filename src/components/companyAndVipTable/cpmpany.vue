<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
      :height="height"
      size="mini"
      highlight-current-row
      :default-sort="{prop: 'id'}"
      @row-click="selectVip"
    >
      <el-table-column
        width="50"
        label="编号"
        prop="id"
        align="center"
      />
      <el-table-column
        prop="name"
        label="单位名称"
        align="center"
      />
      <el-table-column
        prop="card_no"
        label="卡号"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="card_type_desc"
        label="协议单位计划"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="card_level_desc"
        label="协议单位等级"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="rate_code"
        label="房价码"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="phone"
        label="手机"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="email"
        label="Email"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="point_charge"
        label="累计积分"
        align="center"
      />
      <el-table-column
        label="消耗积分"
        prop="point_pay"
        width="80px"
        align="center"
      />
      <el-table-column
        prop="money_pay"
        label="付款"
        width="65"
        align="center"
      />
      <el-table-column
        prop="money_charge"
        label="消费"
        align="center"
      />
      <el-table-column
        prop="point_balance"
        label="储值余额"
      />
      <el-table-column
        prop="money_balance"
        label="账户余额"
      />
      <el-table-column
        prop="credit"
        label="信用"
      />
      <el-table-column
        prop="date_end"
        label="有效期"
      />
      <el-table-column
        prop="status_desc"
        label="卡状态"
      />
    </el-table>
  </div>
</template>

<script>

export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 400
    }
  },
  methods: {
    selectVip(row) {
      this.$emit('selectRow', row)
    }
  }
}
</script>
