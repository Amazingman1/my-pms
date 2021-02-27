<template>
  <div class="app-container" style="overflow:hidden">
    <div class="content-right">
      <div class="btn" @click="onSubmit">交接班</div>
      <div class="btn" style="margin-top:10px" @click="exportDataEvent">导出EXCEL</div>
    </div>
    <div id="content">
      <div class="h5">交接报表</div>
      <div style="padding:10px">
        <el-form :label-position="'left'" :model="formLabelAlign" label-width="80px" size="mini">
          <el-form-item label="营业日期">
            <el-date-picker
              v-model="formLabelAlign.login_date"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="用户名">
            <el-input ref="input" v-model="formLabelAlign.name" @focus="getStaffInfo" />
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          stripe
          border
          size="mini"
          height="687"
          style="width: 100%"
        >
          <el-table-column prop="img" label="Tips">
            <template slot-scope="scope">
              <img style="width: 20px;height: 20px" :src="scope.row.img">
            </template>
          </el-table-column>
          <el-table-column
            prop="report"
            label="报表"
          />
          <el-table-column label="操作" width="55">
            <template slot-scope="scope">
              <el-link type="primary" :underline="false" @click="rowClick(scope.row)">查看</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div id="sidebar">
      <div class="h5">{{ title }}</div>
      <div style="padding:10px">
        <el-form v-show="title === '前台收款明细'" :inline="true" size="mini" :model="formInline">
          <el-form-item label="付款方式：">
            <el-select v-model="formInline.incoming_account_reason" placeholder="请选择" @focus="getpayType">
              <el-option
                v-for="item in payTypeList"
                :key="item.id"
                :label="item.desc"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="checkoutNoClosed(tableObj)">查询</el-button>
          </el-form-item>
        </el-form>
        <NewTables ref="xTable" :list-data="listData" :table-column="tableColumn" :loading="loading" />
        <Pagination
          v-show="total>0"
          style="height:50px"
          :total="total"
          :page.sync="pageStion.page"
          :limit.sync="pageStion.page_size"
          @pagination="checkoutNoClosed(tableObj)"
        />
      </div>
    </div>
    <el-dialog title="员工" :visible.sync="dialogTableVisible">
      <el-table :data="staffList" border height="500" @row-click="rowClickSelecetName">
        <el-table-column property="id" label="ID" width="150" />
        <el-table-column property="real_name" label="姓名" />
        <el-table-column property="gender" label="性别" />
        <el-table-column property="user_name" label="呢称" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import NewTables from './componentes/newTables'
import { listObj } from './listname'
import Pagination from '@/components/Pagination'
import { getListApi, downListApi } from '@/api/handover'
import { parseTime } from '@/utils/index'
import { getUserList } from '@/api/login'
import { newPayApi } from '@/api/accounts'
export default {
  components: { Pagination, NewTables },
  data() {
    return {
      formLabelAlign: {
        login_date: new Date(),
        name: ''
      },
      formInline: {},
      listData: [],
      tableData: [],
      title: '前台入账明细',
      pageStion: {
        page: 1,
        page_size: 20
      },
      total: 0,
      staffList: [],
      dialogTableVisible: false,
      seleced: 0,
      tableColumn: [],
      tableObj: {},
      payTypeList: [],
      loading: false
    }
  },
  mounted() {
    this.tableData = listObj
  },
  methods: {
    // 付款方式
    getpayType(key) {
      newPayApi({ code_type: 2 }).then(res => {
        const { data } = res
        this.payTypeList = data
      })
    },
    // 确定交接班
    async onSubmit() {
      await this.$store.dispatch('user/logout')
    },
    getStaffInfo() {
      this.$refs.input.blur()
      getUserList().then(res => {
        const { data } = res
        this.staffList = data.results
        this.dialogTableVisible = true
      })
    },
    // 导出表格
    exportDataEvent() {
      this.formLabelAlign.login_date = parseTime(this.formLabelAlign.login_date, '{y}-{m}-{d}')
      const aprams = {
        ...this.formLabelAlign,
        ...this.formInline,
        page_size: this.total
      }
      downListApi(aprams, this.seleced).then(res => {
        window.location.href = res.data.download
      })
    },
    rowClickSelecetName(val) {
      this.formLabelAlign.name = val.real_name
      this.formLabelAlign.employee_id = val.id
      this.dialogTableVisible = false
    },
    rowClick(val) {
      this.tableObj = { ...val }
      this.title = val.report
      this.pageStion.page = 1
      this.checkoutNoClosed(val)
    },
    async checkoutNoClosed(val) {
      if (!this.formLabelAlign.employee_id) {
        this.$message.warning('请选则用户!')
        return
      }
      this.formLabelAlign.login_date = parseTime(this.formLabelAlign.login_date, '{y}-{m}-{d}')
      const aprams = {
        ...this.formLabelAlign,
        ...this.pageStion,
        ...this.formInline
      }
      this.loading = true
      await getListApi(aprams, val.inx).then(res => {
        this.seleced = val.inx
        const arr = res.data.results ? res.data.results : res.data
        this.listData = arr
        this.tableColumn = val.tableColumn
        this.total = res.data.count
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #sidebar {
    margin-left: 410px;
    margin-right: 120px;
    border: 1px solid #8957A1;
    min-height: 832px;
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
    float: left;
    width: 400px;
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
      width: 80px;
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
