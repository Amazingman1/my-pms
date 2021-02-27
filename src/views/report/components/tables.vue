<template>
  <div>
    <el-table
      id="dateYingye_id"
      :data="listData"
      size="mini"
      height="700"
      style="width: 100%;"
    >
      <el-table-column label="项目">
        <template slot-scope="scope">
          <span :class="{isFontColor: (scope.row.project== 'a、房间出租总数' || scope.row.project== 'b、出租率%' || scope.row.project== 'c、房租收入' || scope.row.project== 'd、平均房价') ? !isColor :isColor}">
            {{ scope.row.project }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="本日">
        <el-table-column prop="today" label="发生" />
      </el-table-column>
      <el-table-column label="本月">
        <el-table-column prop="month" label="发生" />
        <el-table-column prop="last_year_month" label="去年同期" />
        <el-table-column prop="month_proportion" label="同比(%)" />
      </el-table-column>
      <el-table-column label="本年">
        <el-table-column prop="year" label="发生" />
        <el-table-column prop="last_year" label="去年同期" />
        <el-table-column prop="year_proportion" label="同比(%)" />
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default: () => []
    },
    seleced: {
      type: Number,
      default: 0
    },
    tableType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      isColor: false
    }
  },
  watch: {
    listData: function(params) {
      console.log(this.listData, 121323)
    }
  },
  methods: {
    // 监听子组件的值

  }
}
</script>

<style>

</style>
