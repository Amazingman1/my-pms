<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane name="all" label="所有订单" />
    <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.title" :name="item.name">
      <tableMast v-if="activeName === 'DANGQIAN' || activeName === 'JIANGLI' " :loading="loading" :table-data="tableData" :height="tableHeight" />
      <resveTable v-else :table-data="tableData" :loading="loading" :height="tableHeight" />
    </el-tab-pane>
    <Pagination
      v-show="true"
      :total="total"
      :page.sync="pageStion.page"
      :limit.sync="pageStion.page_size"
      @pagination="pageEvent"
    />
  </el-tabs>
</template>
<script>
import tableMast from '@/components/ordeTable/table'
import resveTable from '@/components/ordeTable/resveTable'
import { getMasterList, getReserveListTime, getReserveList, dayReserveList, getDayMasterList, getDayLeaveMasterList } from '@/api/home'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils/index'

export default {
  components: { tableMast, resveTable, Pagination },
  data() {
    return {
      activeName: 'DANGQIAN',
      tabList: [
        { name: 'DANGQIAN', title: '当前在住' },
        { name: 'JIANGLI', title: '本日将离' },
        { name: 'JIANGDAO', title: '本日将到' },
        { name: 'YUDING', title: '有效预定' }
      ],
      loading: false,
      tableData: [],
      total: 0,
      pageStion: {
        page: 1,
        page_size: 10
      },
      // tableHeight: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 600
      tableHeight: 420
    }
  },
  created() {
    this.getBaseList(this.pageStion)
  },
  methods: {
    format(time, config) {
      return parseTime(time, config)
    },
    // 清空当前页data数据
    flushData() {
      this.tableData = []
      console.log(`当前页面的高度为${this.tableHeight}`)
    },
    handleClick(tab, event) {
      this.flushData()
      const time = new Date().getTime() + 1 * 24 * 60 * 60 * 1000
      const arr_time__gte = this.format(new Date(), '{y}-{m}-{d}') + ' 00:00:00'
      const leave_time__lt = this.format(time, '{y}-{m}-{d}') + ' 00:00:00'
      if (tab.name === 'all') {
        this.$router.push('allList')
      } else if (tab.name === 'JIANGLI') {
        this.getDayLeaveMaster(this.pageStion, arr_time__gte, leave_time__lt)
      } else if (tab.name === 'DANGQIAN') {
        this.getBaseList(this.pageStion)
      } else if (tab.name === 'YUDING') {
        this.getReserveAllLsit(this.pageStion)
      } else if (tab.name === 'JIANGDAO') {
        this.dayReserve(this.pageStion, arr_time__gte, leave_time__lt)
      }
    },
    async getBaseList(val) {
      this.loading = true
      await getMasterList(val).then(res => {
        const { data } = res
        this.total = data.count
        this.tableData = data.results
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 分页
    pageEvent() {
      const time = new Date().getTime() + 1 * 24 * 60 * 60 * 1000
      const arr_time__gte = this.format(new Date(), '{y}-{m}-{d}') + ' 00:00:00'
      const leave_time__lt = this.format(time, '{y}-{m}-{d}') + ' 00:00:00'
      if (this.activeName === 'JIANGLI') {
        this.getDayLeaveMaster(this.pageStion, arr_time__gte, leave_time__lt)
      } else if (this.activeName === 'DANGQIAN') {
        this.getBaseList(this.pageStion)
      } else if (this.activeName === 'YUDING') {
        this.getReserveAllLsit(this.pageStion)
      } else if (this.activeName === 'JIANGDAO') {
        this.dayReserve(this.pageStion, arr_time__gte, leave_time__lt)
      }
    },
    // 获取预定单列表
    getReserve(val, time) {
      getReserveListTime(val, time).then(res => {
        const { data } = res
        this.total = data.count
        this.tableData = data.results
      })
    },
    // 获取预订单
    getReserveAllLsit(val) {
      this.loading = true
      getReserveList(val).then(res => {
        const { data } = res
        this.total = data.count
        this.tableData = data.results
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 今日将到
    dayReserve(val, tiem, times) {
      this.loading = true
      dayReserveList(val, tiem, times).then(res => {
        const { data } = res
        this.total = data.count
        this.tableData = data.results
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 本日将离
    getDayLeaveMaster(val, tiem, times) {
      this.loading = true
      getDayLeaveMasterList(val, tiem, times).then(res => {
        const { data } = res
        this.total = data.count
        this.tableData = data.results
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 本日将到
    getDayMaster(val, tiem, times) {
      getDayMasterList(val, tiem, times).then(res => {
        const { data } = res
        this.total = data.count
        this.tableData = data.results
      })
    }
  }
}
</script>
<style lang="sass">

</style>
