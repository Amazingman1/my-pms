<template>
  <div class="app-container">
    <el-tabs v-model="activeName" v-loading="loading" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.title" :name="item.name">
        <div style="padding: 10px;">
          <SearchForm
            :form-data="formSearch"
            :table-data="tableData"
            :table-type="radio4"
            @serachList="pageEvent"
            @cansleSearch="cansleSearch"
          />
        </div>
        <TableMast
          v-if="isTable()"
          :table-data="tableData"
        />
        <ResveTable v-else :table-data="tableData" />
      </el-tab-pane>

      <Pagination
        v-show="total> 0"
        :total="total"
        :page.sync="pageStion.page"
        :limit.sync="pageStion.page_size"
        @pagination="pageEvent"
      />
    </el-tabs>
  </div>
</template>
<script>
import TableMast from '@/components/ordeTable/table'
import ResveTable from '@/components/ordeTable/resveTable'
import { getMasterList, getReserveListTime, getReserveList, dayReserveList, getDayMasterList, getDayLeaveMasterList } from '@/api/home'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils/index'
import { getLiveListApi, getHistoryReserveListApi } from '@/api/home'
import { filterParams } from '@/utils/index'
import SearchForm from './components/searchform'

export default {
  components: { TableMast, ResveTable, Pagination, SearchForm },
  data() {
    return {
      activeName: 'DANGQIAN',
      tabList: [
        { name: 'DANGQIAN', title: '当前在住' },
        { name: 'JIANGLI', title: '本日将离' },
        { name: 'JIANGDAO', title: '本日将到' },
        { name: 'YUDING', title: '有效预定' },
        { name: 'YILI', title: '已离订单' },
        { name: 'LISHI', title: '历史预定' },
        { name: 'JIEZHANG', title: '本日结账' }
      ],
      loading: false,
      tableData: [],
      total: 0,
      pageStion: {
        page: 1,
        page_size: 15
      },
      radio4: 'DANGQIAN',
      formSearch: {
        code_src: ''
      },
      roomNuList: [],
      roomTypeList: []
    }
  },
  created() {
    this.getBaseList(this.pageStion)
  },
  methods: {
    cansleSearch() {
      this.formSearch = {
        code: '',
        code_market: '',
        code_src: '',
        name__icontains: '',
        master_guest__name__icontains: '',
        telephone__icontains: '',
        master_guest__telephone__icontains: '',
        room_number: ''
      }
      this.pageEvent()
    },
    isTable() {
      const arr = ['DANGQIAN', 'JIANGLI', 'YILI', 'JIEZHANG']
      return arr.includes(this.activeName)
    },
    format(time, config) {
      return parseTime(time, config)
    },
    // 历史预定
    getHistoryReserveList() {
      this.loading = true
      getHistoryReserveListApi({
        ...this.pageStion,
        ...filterParams(this.formSearch)
      }).then(res => {
        const { data } = res
        this.total = data.count
        this.tableData = data.results
        this.loading = false
      })
    },
    // 已离店订单
    getLiveList() {
      this.loading = true
      const params = {
        ...this.pageStion,
        ...this.formSearch
      }
      getLiveListApi(filterParams(params)).then(res => {
        const { data } = res
        this.total = data.count
        this.tableData = data.results
        this.loading = false
      })
    },
    // 清空当前页data数据
    flushData() {
      this.tableData = []
    },
    handleClick({ name }) {
      this.radio4 = name
      this.formSearch = {
        code: '',
        code_market: '',
        code_src: '',
        name__icontains: '',
        master_guest__name__icontains: '',
        telephone__icontains: '',
        master_guest__telephone__icontains: '',
        room_number: ''
      }
      this.pageStion.page = 1
      this.flushData()
      const time = new Date().getTime() + 1 * 24 * 60 * 60 * 1000
      const arr_time__gte = this.format(new Date(), '{y}-{m}-{d}') + ' 00:00:00'
      const leave_time__lt = this.format(time, '{y}-{m}-{d}') + ' 00:00:00'
      if (name === 'JIANGLI') {
        this.getDayLeaveMaster(this.pageStion, arr_time__gte, leave_time__lt)
      } else if (name === 'DANGQIAN') {
        this.getBaseList(this.pageStion)
      } else if (name === 'YUDING') {
        this.getReserveAllLsit(this.pageStion)
      } else if (name === 'JIANGDAO') {
        this.dayReserve(this.pageStion, arr_time__gte, leave_time__lt)
      } else if (name === 'YILI') {
        this.getLiveList(this.pageStion)
      } else if (name === 'LISHI') {
        this.getHistoryReserveList(this.pageStion)
      } else if (name === 'JIEZHANG') {
        this.getDayLeaveMaster(this.pageStion, arr_time__gte, leave_time__lt)
      }
    },
    async getBaseList(val) {
      this.loading = true
      await getMasterList({ ...val, ...filterParams(this.formSearch) }).then(res => {
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
      } else if (this.activeName === 'YILI') {
        this.getLiveList(this.pageStion)
      } else if (this.activeName === 'LISHI') {
        this.getHistoryReserveList(this.pageStion)
      } else if (name === 'JIEZHANG') {
        this.getDayLeaveMaster(this.pageStion, arr_time__gte, leave_time__lt)
      }
    },
    // 获应到未到
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
      getReserveList({ ...val, ...filterParams(this.formSearch), rsv_status_lable__in: '0,1' }).then(res => {
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
      dayReserveList({ ...val, ...filterParams(this.formSearch) }, tiem, times).then(res => {
        const { data } = res
        this.total = data.count
        this.tableData = data.results
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 本日将离/今日结账
    getDayLeaveMaster(val, tiem, times) {
      this.loading = true
      const params = {
        ...val,
        ...filterParams(this.formSearch),
        leave_time__gte: tiem,
        leave_time__lt: times,
        master_status_lable: this.activeName === 'JIEZHANG' ? 1 : ''
      }
      getDayLeaveMasterList(filterParams(params)).then(res => {
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
