<template>
  <div class="app-container" style="overflow:hidden">
    <div id="content">
      <div class="h5">项目审核</div>
      <el-button style="width:80%;margin-top:20px;margin-left:30px" type="primary" size="mini" @click="prenightAudit">预 审</el-button>
      <el-button style="width:80%;margin-top:10px;margin-left:30px" type="primary" size="mini" @click="nightAudit"> 开始夜审</el-button>
      <div style="padding:10px">
        <el-table
          v-loading.fullscreen.lock="loading"
          :data="tableData"
          stripe
          border
          size="mini"
          height="733"
          style="width: 100%"
          @row-click="rowClick"
        >
          <el-table-column
            prop="name"
            label="夜审项目"
          />
          <el-table-column
            prop="count"
            label="数量"
            width="70"
          />
          <el-table-column prop="address" label="标志" width="70">
            <template slot-scope="scope">
              <span :style="scope.row.count > 0 ? textRed:textSuccess">{{ scope.row.count > 0 ? '异常': '通过' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div id="sidebar">
      <div class="h5">{{ title }}</div>
      <div style="padding:10px">
        <Tabls :list-data="listData" :seleced="seleced" :table-type="tableType" />
        <Pagination
          v-show="total>0"
          style="height:50px"
          :total="total"
          :page.sync="pageStion.page"
          :limit.sync="pageStion.page_size"
          @pagination="checkoutNoClosed(seleced1,pageStion)"
        />
      </div>
    </div>
    <PreTable ref="PreTable" />
  </div>
</template>

<script>
import { checkoutNoClosedApi, nightAuditApi, startNightAuditApi } from '@/api/nightaudit'
import Tabls from './componentes/tabls'
import Pagination from '@/components/Pagination'
import PreTable from './componentes/preTable'

export default {
  components: { Tabls, Pagination, PreTable },
  data() {
    return {
      listData: [],
      textSuccess: 'color:#67c23a',
      textRed: 'color:#FF4F5E',
      tableData: [],
      seleced: 0,
      seleced1: {},
      title: '退房未平帐的主帐信息',
      pageStion: {
        page: 1,
        page_size: 10
      },
      total: 0,
      tableType: 0,
      loading: false,
      inxObj: {}
    }
  },
  mounted() {
    this.startNightAudit()
  },
  methods: {
    // 夜审预审
    prenightAudit() {
      this.$refs.PreTable.show()
    },
    // 刷新页面
    rushList() {
      this.rowClick(this.inxObj)
      this.startNightAudit()
    },
    // 新开始夜审
    startNightAudit() {
      this.loading = true
      startNightAuditApi().then(res => {
        console.log('开始夜审结果', res)
        const { data } = res
        this.tableData = data.results
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 开始夜审
    onSubmit() {
      const auditList = []
      const abnormalList = []
      this.tableData.map(p => {
        if (p.num === null) {
          auditList.push(p)
        } else if (p.num !== null && p.num > 0 && p.inx !== 14) {
          abnormalList.push(p)
        }
      })
      if (auditList.length > 0) {
        this.$message.warning('存在未审核项目，请全部审核后开始夜审!')
      } else if (abnormalList.length > 0) {
        this.$message.warning('存在异常项目!')
      } else {
        this.nightAudit()
      }
    },
    // 开始夜审
    nightAudit() {
      this.loading = true
      nightAuditApi().then(res => {
        this.loading = false
        this.logout()
        this.$message.success('夜审入账成功')
      }).catch(_ => {
        this.loading = false
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
    },
    rowClick(val) {
      this.inxObj = { ...val }
      this.seleced1 = val
      this.pageStion.page = 1
      this.checkoutNoClosed(val, this.pageStion)
    },
    checkoutNoClosed(val, page) {
      const arr = [2, 5, 6, 7, 9, 10, 11, 13, 14] // 缺失接口，默认通过
      if (arr.includes(val.inx)) {
        // this.$set(this.tableData[val.inx], 'num', 0)
        this.listData = []
        return
      }
      checkoutNoClosedApi(val.inx, page).then(res => {
        const { data } = res
        this.seleced = val.inx
        this.title = val.name
        this.tableType = val.type
        this.listData = data.results
        this.total = data.count
        this.$set(this.tableData[val.inx], 'num', data.count)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #sidebar {
    margin-left: 410px;
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
    width: 120px;
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
  .box-card{
    width: 30%;
    padding: 10px;
    justify-content: center;
    align-items: center;
  }
</style>

