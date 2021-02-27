<template>
  <div class="app-container">
    <template v-if="!$route.params.accuntTeam">
      <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline" style="border-bottom: 1px solid #ccc;">
        <el-form-item>
          <el-input v-model="formInline.team_base__name__icontains" placeholder="团队名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.name__icontains" placeholder="领队名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.telephone__icontains" placeholder="手机号" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.rsv_status_lable" placeholder="全部状态">
            <el-option label="全部状态" value="" />
            <el-option v-for="p in stateList" :key="p.value" :label="p.key" :value="p.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pageEvnt">查 询</el-button>
          <el-button type="primary" plain @click="cansleTeamList">取 消</el-button>
          <el-button icon="el-icon-download" type="primary" @click="downLoad">下载模版</el-button>
        </el-form-item>
        <el-form-item>
          <upload-excel-component
            :upload-loading.sync="uploadLoading"
            :on-upload-file="onUploadFile"
            :before-upload="beforeUpload"
          />
        </el-form-item>
      </el-form>
      <el-tabs v-model="activeName" @tab-click="handleClickTab">
        <el-tab-pane label="有效团队订单" name="first">
          <Table :table-data="tableData" />
        </el-tab-pane>
        <el-tab-pane label="历史团队订单" name="second">
          <Table :table-data="tableDataHistory" />
        </el-tab-pane>
      </el-tabs>
      <Pagination
        v-show="total>0"
        style="height:50px"
        :total="total"
        :page.sync="pageStion.page"
        :limit.sync="pageStion.page_size"
        @pagination="pageEvnt"
      />
    </template>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getTeamListApi, getHistoryTeamListApi, importExcelApi } from '@/api/team'
import { filterParams } from '@/utils/index'
import UploadExcelComponent from '@/components/uploadExcel'
import Table from './components/table'

export default {
  components: { Pagination, UploadExcelComponent, Table },
  data() {
    return {
      formInline: {
        team_base__name__icontains: '',
        name__icontains: '',
        telephone__icontains: '',
        rsv_status_lable: 0
      },
      pageStion: {
        page: 1,
        page_size: 15
      },
      stateList: [
        { key: '预定', value: 0 },
        { key: '入住', value: 1 }
      ],
      total: 0,
      tableData: [],
      /* 7-22*/
      activeName: 'first',
      tableDataHistory: [],
      uploadLoading: false,
      accuntTeamObject: {}

    }
  },
  mounted() {
    this.getgetTeamList()
  },
  methods: {
    // 取消搜索
    cansleTeamList() {
      this.formInline = {
        team_base__name__icontains: '',
        name__icontains: '',
        telephone__icontains: '',
        rsv_status_lable: 0
      }
      console.log(this.activeName, 1112)
      this.pageEvnt()
    },
    downLoad() {
      window.location = 'https://ispider-oss.oss-cn-hangzhou.aliyuncs.com/DYL/70b1a386.xlsx'
    },
    beforeUpload() {
      this.uploadLoading = true
      return true
    },
    onUploadFile(rawFile) {
      const formData = new FormData()
      formData.append('file', rawFile)
      importExcelApi(formData).then(res => {
        this.uploadLoading = false
        this.$message.success('导入成功!')
        this.getgetTeamList()
      })
        .catch(() => {
          this.uploadLoading = false
        })
    },
    // 分页
    pageEvnt() {
      if (this.activeName === 'first') {
        this.getgetTeamList()
      } else {
        this.getgetHistoryTeamList()
      }
    },
    /* tab事件*/
    handleClickTab(tab, event) {
      this.pageStion = {
        page: 1,
        page_size: 15
      }
      if (tab.name === 'first') {
        this.formInline.rsv_status_lable = 0
        this.stateList = [
          { key: '预定', value: 0 },
          { key: '入住', value: 1 }
        ]
        this.getgetTeamList()
      } else {
        this.formInline.rsv_status_lable = ''
        this.stateList = [
          { key: '已离', value: 2 },
          { key: '取消', value: 3 },
          { key: '初始化', value: 4 },
          { key: 'no show', value: -1 }
        ]
        this.getgetHistoryTeamList()
      }
    },
    getgetTeamList() {
      getTeamListApi({ code_market: 'TD', ...this.pageStion, ...filterParams(this.formInline) }).then(res => {
        const { data } = res
        this.tableData = data.results
        this.total = data.count
      })
    },
    /* 历史团队订单*/
    getgetHistoryTeamList() {
      getHistoryTeamListApi({ code_market: 'TD', ...this.pageStion, ...filterParams(this.formInline) }).then(res => {
        const { data } = res
        this.tableDataHistory = data.results
        this.total = data.count
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-input__inner::placeholder{
  color:#000
}
</style>
