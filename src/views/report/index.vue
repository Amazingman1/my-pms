<template>
  <div class="app-container" style="overflow:hidden">
    <div class="content-right">
      <div class="btn" style="margin-top:10px" @click="exportDataEvent">导出EXCEL</div>
      <div class="btn" style="margin-top:10px" @click="onPrint">打 印</div>
    </div>
    <div id="content">
      <div class="h5">报表种类</div>
      <div>
        <el-menu
          default-active="财务报表"
          :unique-opened="true"
          size="mini"
        >
          <el-submenu v-for="(p , index) in list" :key="index" :index="p.parant.name">
            <template slot="title">
              <span style="padding-left:10px">{{ p.parant.name }}</span>
            </template>
            <el-menu-item-group v-for="(v, i) in p.parant.children" :key="i">
              <el-menu-item :index="v.name" @click="handClickMun(v)">{{ v.name }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div id="sidebar">
      <div class="h5">{{ title }}</div>
      <div style="padding:10px">
        <ShowSearch :status-code="inx">
          <el-form :inline="true" class="demo-form-inline" size="mini">
            <el-form-item v-if="inx ===10|| inx ===12 || inx === 36 " label="筛选日期">
              <el-date-picker
                v-model="biz_date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="startTime"
              />
            </el-form-item>
            <el-form-item v-else label="筛选日期">
              <el-date-picker
                v-model="value1"
                type="daterange"
                placeholder="选择日期"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                size="mini"
                :clearable="false"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handClik({inx,tableColumn})">查询</el-button>
            </el-form-item>
          </el-form>
        </ShowSearch>
        <HeardTable v-if=" inx ===12" ref="xTable1" :loading="loading" :list-data="listData" :seleced="inx" />
        <ForTales v-else ref="xTable" :loading="loading" :list-data="listData" :table-column="tableColumn" />
        <Pagination
          v-show="total>0"
          style="height:50px"
          :total="total"
          :page.sync="pageStion.page"
          :limit.sync="pageStion.page_size"
          @pagination="handClik({inx,tableColumn})"
        />
      </div>
    </div>
    <!--报表打印-->
    <ReportDialog ref="reportDialog" />
    <!--报表---表头分组 打印-->
    <HeardTableDialog ref="heardTableDialog" />
    <ReportDialog ref="reportDialog" />
    <!--表头分组 打印-->
    <HeardTableDialog ref="heardTableDialog" />
  </div>
</template>
<script>
import { reportObj } from './report'
import { getReportApi, downReportApi } from '@/api/report'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils/index'
import ForTales from './components/forTales'
import HeardTable from './components/tables'
import g_localStorage from '@/utils/saveLogal'
import ReportDialog from './components/printReportDialog/index'
import HeardTableDialog from './components/headTableDialog/index'
import ShowSearch from './components/showSearch'
export default {
  components: { Pagination, ForTales, HeardTable, ReportDialog, HeardTableDialog, ShowSearch },
  data() {
    return {
      value1: [parseTime(new Date(), '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      biz_date: g_localStorage.getItem('userObj'),
      listData: [],
      title: '冲调账报表',
      loading: false,
      list: [],
      inx: 0,
      pageStion: {
        page: 1,
        page_size: 15
      },
      total: 0,
      tableColumn: [],
      startTime: {
        disabledDate: (time) => {
          return time.getTime() > new Date(g_localStorage.getItem('userObj')).getTime() // 限制营业时间
        }
      },
      report: ''
    }
  },
  created() {
    this.list = reportObj
  },
  methods: {
    handClickMun(val) {
      this.inx = val.inx
      this.title = val.name
      this.tableColumn = val.tableColumn
      this.handClik(val)
    },
    // 导出表格
    exportDataEvent() {
      const inxList = [10, 12, 36, 31, 63]
      const params = inxList.includes(this.report.inx) ? { biz_date: this.biz_date } : {
        start_biz_date: this.value1[0],
        end_biz_date: this.value1[1]
      }
      downReportApi(this.report.inx, params, { page_size: this.total },).then(res => {
        window.location.href = res.data.download
      })
    },
    handClik(val) {
      console.log(val, '选中的报表')
      this.loading = true
      this.report = val
      // 参数为 biz_date 的表
      const inxList = [10, 12, 36, 31, 63]
      const params = inxList.includes(val.inx) ? { biz_date: this.biz_date } : {
        start_biz_date: this.value1[0],
        end_biz_date: this.value1[1]
      }
      getReportApi(val.inx, params, this.pageStion).then(res => {
        const { data } = res
        this.total = data.count ? data.count : 0
        if (val.inx === 11 || val.inx === 12) {
          this.getInfowFromChild(data.result_list)
          this.tableColumn = val.tableColumn
          if (this.$refs.xTable) {
            this.$refs.xTable.rushTable()
          }
        } else {
          const arr = res.data.results ? res.data.results : res.data
          this.listData = arr
          this.tableColumn = val.tableColumn
          this.$refs.xTable.rushTable()
        }
        this.loading = false
      })
    },
    getInfowFromChild(data) {
      this.listData = data.total // 暂时的
      const receive_array = data.room_data
      const { count: a, percentage: b, price: c, average_price: d } = receive_array // 解构赋值
      const resolveValue_a = this.resolveData(a, '房间出租总数', 'a、')// 处理数据
      const resolveValue_b = this.resolveData(b, '出租率%', 'b、')// 处理数据
      const resolveValue_c = this.resolveData(c, '房租收入', 'c、')// 处理数据
      const resolveValue_d = this.resolveData(d, '平均房价', 'd、')// 处理数据
      this.listData = this.listData.concat(resolveValue_a, resolveValue_b, resolveValue_c, resolveValue_d) // 数组拼接
    },
    resolveData(param, desc, prefix) {
      const index_param = param.findIndex(item => item.project === desc)
      const paramValue = param.splice(index_param, 1)
      paramValue[0].project = prefix + paramValue[0].project
      param.unshift(paramValue[0]) // 放在首位
      return param
    },
    /* 打 印报表 */
    onPrint() {
      if (this.inx === 12) {
        this.$refs.heardTableDialog.getReport(this.report, this.listData)
      } else {
        this.$refs.reportDialog.getReport(this.report, this.listData)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #sidebar {
    min-height: 832px;
    margin-left: 260px;
    margin-right: 120px;
    border: 1px solid #8957A1;

    .h5{
      font-size:13px;
      height: 30px;
      line-height: 30px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
      background: #8957A1;
      padding-left:10px ;
    }
  }
  #content {
    min-height: 832px;
    height: 832px;
    overflow: auto;
    float: left;
    width: 250px;
    border: 1px solid #4488E9;
    .h5{
      font-size:13px;
      height: 30px;
      line-height: 30px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
      background: #4488E9;
      padding-left:10px ;
    }

  }
  .content-right {
    float: right;
    width: 110px;
    border: 1px solid #EEEEEE;
    height: 780px;
    padding: 10px 10px;
    .btn{
      height: 40px;
      background:#4488E9;
      text-align: center;
      line-height: 40px;
      color: #fff;
      cursor: pointer;
        &:hover{
          background:rgba(124, 168, 243, 0.5);
          border: 1px solid rgba(210, 229, 235, 0.5);
        }
    }
  }
</style>

