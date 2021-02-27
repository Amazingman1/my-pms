<template>
  <div class="app-container" style="overflow:hidden">
    <div id="content">
      <div class="h5">房务管理</div>
      <div style="padding:10px">
        <el-menu
          default-active="1-1"
          @select="handClickMun"
        >
          <el-submenu index="1">
            <template slot="title">
              <span>查房管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">离店查房记录表</el-menu-item>
              <el-menu-item index="1-2">置净房记录表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <span slot="title">打扫记录表</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span slot="title">开门记录表</span>
          </el-menu-item>
          <el-submenu index="4">
            <template slot="title">
              <span>房务设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">查房内容设置</el-menu-item>
              <el-menu-item index="4-2">打扫价码设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="5">
            <span slot="title">维修设置</span>
          </el-menu-item>
          <el-menu-item index="6">
            <span slot="title">客房布草设置</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div id="sidebar">
      <div class="h5">{{ title }}</div>
      <div style="padding:10px">
        <component :is="conponmentName" :title="title" />
      </div>
    </div>
  </div>
</template>

<script>

// import { mapGetters } from 'vuex'
import liveRoomRec from './component/liveRoomRec'
import clearRoomRec from './component/clearRoomRec'
import openRec from './component/openRec'
import cloth from './component/cloth'

export default {

  components: { liveRoomRec, clearRoomRec, openRec, cloth },
  data() {
    return {
      munDataList: [
        { inx: '1-1', title: '离店查房记录表', componentName: 'liveRoomRec' },
        { inx: '1-2', title: '置净房记录表', componentName: 'liveRoomRec' },
        { inx: '2', title: '打扫记录表', componentName: 'clearRoomRec' },
        { inx: '3', title: '开门记录表', componentName: 'openRec' },
        { inx: '4-1', title: '查房内容设置', componentName: 'liveRoomRec' },
        { inx: '4-2', title: '打扫价码设置', componentName: 'liveRoomRec' },
        { inx: '5', title: '维修设置', componentName: 'liveRoomRec' },
        { inx: '6', title: '客房布草设置', componentName: 'cloth' }
      ],
      listData: [],
      tableData: [],
      seleced: 0,
      seleced1: {},
      conponmentName: 'liveRoomRec',
      title: '离店查房记录表',
      tableType: 0,
      loading: false
    }
  },
  methods: {
    handClickMun(val) {
      this.munDataList.map(p => {
        if (val === p.inx) {
          this.title = p.title
          this.conponmentName = p.componentName
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

