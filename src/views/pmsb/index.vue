<template>
  <div class="app-container" style="overflow:hidden">
    <div id="content">
      <div class="h5">PMSB</div>
      <div style="padding:10px">
        <el-menu
          default-active="1"
          @select="handClickMun"
        >
          <el-menu-item v-for="p in munDataList" :key="p.inx" :index="p.inx">
            <span slot="title">{{ p.name }}</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div id="sidebar">
      <div class="h5">{{ title }}</div>
      <div style="padding:10px">
        <component :is="conponmentName" />
        <!-- <Pagination
          v-show="total>0"
          style="height:50px"
          :total="total"
          :page.sync="pageStion.page"
          :limit.sync="pageStion.page_size"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>

import Pagination from '@/components/Pagination'
import policeRecode from './component/policeRecode'
import Visitors from './component/visitors'
import faceVerification from './component/faceVerification'
import Practitioners from './component/practitioners'
import policeSearch from './component/policeSearch'
import g_localStorage from '@/utils/saveLogal'

export default {

  components: { Pagination, policeRecode, Visitors, Practitioners, policeSearch, faceVerification },
  provide() {
    return {
      hotel_id: g_localStorage.getItem('hotel_id')
    }
  },
  data() {
    return {
      munDataList: [
        {
          name: '公安上传记录',
          inx: '1',
          con: 'policeRecode'
        },
        {
          name: '访客登记',
          inx: '2',
          con: 'Visitors'

        },
        {
          name: '从业人员登记',
          inx: '3',
          con: 'Practitioners'
        },
        {
          name: '民警巡查',
          inx: '4',
          con: 'policeSearch'
        }
        // {
        //   name: '人证对比',
        //   inx: '5',
        //   con: 'faceVerification'
        // },
        // {
        //   name: '外宾查询',
        //   inx: '6',
        //   con: 'faceVerification'
        // },
        // {
        //   name: '内宾查询',
        //   inx: '7',
        //   con: 'faceVerification'
        // }
      ],
      listData: [],
      tableData: [],
      seleced: 0,
      seleced1: {},
      title: '公安上传记录',
      conponmentName: 'policeRecode',
      pageStion: {
        page: 1,
        page_size: 10
      },
      total: 0,
      tableType: 0,
      loading: false

    }
  },
  methods: {
    handClickMun(val) {
      this.title = this.munDataList[val]
      this.munDataList.map(p => {
        if (p.inx === val) {
          this.title = p.name
          this.conponmentName = p.con
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  #sidebar {
    margin-left: 210px;
    border: 1px solid #8957A1;
    min-height: 665px;
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
    width: 200px;
    min-height: 665px;
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
    .el-menu{
      border-right: solid 0px #e6e6e6
    }
  }
  .el-menu-vertical-demo{
    display: inline-block;
    text-align: left;
  }

</style>

