<template>
  <div class="navbar">
    <div class="hamburger-container">
      <el-link icon="el-icon-back" :underline="false" @click="goBack">返回</el-link>
      <router-link to="/home">
        <el-link icon="el-icon-s-home" :underline="false">主页</el-link>
      </router-link>
    </div>
    <!-- <search class="hamburger-container" style="line-height: 39px" /> -->
    <div class="hamburger-container" style="line-height: 50px">
      <span class="title">{{ photoTel }}</span>
      <span class="title" style="margin-left:10px">营业时间：{{ userObj }}</span>
    </div>

    <div class="right-menu" style="margin-right: 0px;">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <Tiem class="right-menu" style="line-height: 55px;" />
    <div class="right-menu">
      <el-badge :value="100" :max="9" is-dot :hidden="messageList.length <= 0">
        <el-link icon="el-icon-bank-card" :underline="false" @click="makeCar(1)">读卡</el-link>
        <el-link icon="el-icon-chat-dot-square" :underline="false" @click="showMes">消息</el-link>
      </el-badge>
    </div>
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
    >
      <el-table :data="messageList" style="width: 100%" :default-sort="{prop: 'time_stamp',	order: 'descending'}">
        <el-table-column property="time_stamp" label="时间" />
        <el-table-column property="title" label="内容" />
        <el-table-column property="source" label="来源" show-overflow-tooltip />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="danger" size="mini" :underline="false" @click="deletePrice(scope.row, scope.$index)">已 阅</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
    <CheckinDetil ref="CheckinDetil" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { carldApi, lockforIdApi } from '@/api/card'
import { parseTime } from '@/utils/index'
import { makeCarApi } from '@/api/checkin'
import CheckinDetil from '@/components/checkin/checkinDetil'

import Tiem from './tiem'

export default {
  provide() {
    return {
      componentData: this.testData
    }
  },
  components: {
    Tiem,
    CheckinDetil
  },
  data() {
    return {
      home: '',
      form: {},
      drawer: false,
      referenceId: null,
      testData: {}
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'photoTel',
      'userObj',
      'messageList'
    ])
  },
  watch: {
    $route(to, from) {
      this.home = this.$route.path
    }

  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    goBack() {
      this.$router.go(-1)
      // location.reload()
    },
    // 打开消息列表
    showMes() {
      this.drawer = true
      this.$store.dispatch('websocket/getMessageList')
    },
    // 删除消息列表
    deletePrice(val, index) {
      this.$store.dispatch('websocket/deleteMessageList', { id: val.id })
    },
    makeCar(val) {
      const params = {
        operate_type: val, // 1：读卡, 2：写卡, 4：销卡 5:读取身份证号,
        start_time: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'),
        end_time: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'),
        room_no: '0000',
        guest_no: 0
      }
      makeCarApi(params).then(res => {
        const { data } = res
        this.zhicard(data.url, data.id, val)
      })
    },
    zhicard(url, id, val) {
      url = url.replace('angular.callbacks._0', 'userHandler') // 替换
      this.$http.jsonp(url, {
        jsonpCallback: 'userHandler'
      }).then(res => {
        if (res.body.Result === true) {
          this.lockforId(res.body.Data.LockNo)
        } else {
          this.$message.warning(res.body.Msg)
        }
      }).catch(() => {
        this.$message.warning('请打开本地服务!')
      })
    },
    // 制卡消
    carld(id) {
      carldApi(id).then(res => {})
    },
    // 锁号换取id
    lockforId(val) {
      lockforIdApi({ lock_no: val }).then(res => {
        console.log(res.data, '读卡信息')
        const { data } = res
        this.testData.data = {
          master_base: {
            master_id: data.id,
            account_id: data.account_id
          }
        }
        this.$refs.CheckinDetil.show()
        this.referenceId = res.data.reference_type
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.58);
  .hamburger-container {
    line-height: 46px;
    margin-left: 10px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
    .title{
      font-size: 14px;
      color: #333333;
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 15px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
 /deep/ .el-badge__content.is-fixed {
   top:20px;
 }
}
</style>
