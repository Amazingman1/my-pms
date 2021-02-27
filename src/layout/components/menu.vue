<!--
 * @Author: wangxuan
 * @Date: 2020-09-16 13:58:52
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-30 09:54:22
 * @FilePath: /vue-misb/src/layout/components/menu.vue
-->
<template>
  <div class="menu">
    <router-link v-for="(item, index) in newMenuList" :key="index" :to="goFun(item.code) ? '': item.code" @click.native="goPath(item)">
      <div
        class="menu-item"
        :style="item.isSelected ? `background: #FA7C45;box-shadow: 0 5px 8px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);`: ''"
      >
        <img class="img" :src="item.icon" :alt="item.titel">
      </div>
    </router-link>
    <CasrList ref="CasrList" />
    <Checkin ref="checkin" />
    <Booking ref="booking" :booking-data="bookingData" />
  </div>
</template>

<script>
// const DUKA = require('@/assets/icons/duka.png')
const ZHIKA = require('@/assets/icons/zhika.png')
const FANGTAI = require('@/assets/icons/fangtai.png')
const RUZHU = require('@/assets/icons/ruzhu.png')
const BINKE = require('@/assets/icons/binke.png')
const JJB = require('@/assets/icons/jiaojieban.png')
const YUDING = require('@/assets/icons/yuding.png')
const ZHANGWU = require('@/assets/icons/zhangwu.png')
const BAOBIAO = require('@/assets/icons/baobiao.png')
const YESHEN = require('@/assets/icons/yeshen.png')
const DIANZHANG = require('@/assets/icons/dianzhang.png')
const ZHUYE = require('@/assets/icons/zhuye.png')
const TEAM = require('@/assets/icons/team.png')
const DINGDAN = require('@/assets/icons/dingdan.png')
import { makeCarApi } from '@/api/checkin'
import { parseTime } from '@/utils/index'
import { carldApi, lockforIdApi } from '@/api/card'
import { goUrl } from '@/utils/url'
import { mapGetters } from 'vuex'
import g_localStorage from '@/utils/saveLogal'
import { hotelUrl } from '@/api/login'
import CasrList from './casrList'
import Checkin from '@/components/checkin/index'
import Booking from '@/components/newBooking/booking'

export default {
  provide() {
    return {
      componentData: this.testData
    }
  },
  components: {
    CasrList,
    Checkin,
    Booking
  },
  data() {
    return {
      menuList:
      [
        { titel: '主页', path: 'home', icon: ZHUYE },
        { titel: '订单', path: 'allList', icon: DINGDAN },
        { titel: '房态', path: 'houseStaus', icon: FANGTAI },
        { titel: '入住', path: 'checkin', icon: RUZHU },
        { titel: '预定', path: 'booking', icon: YUDING },
        { titel: '团队', path: 'teamPms', icon: TEAM },
        { titel: '账务', path: 'pursesteward', icon: ZHANGWU },
        { titel: '制卡', path: 'cardList', icon: ZHIKA },
        { titel: '宾客', path: 'guestsPms', icon: BINKE },
        { titel: '交接班', path: 'handover', icon: JJB },
        { titel: '报表', path: 'report', icon: BAOBIAO },
        { titel: '夜审', path: 'nightTrial', icon: YESHEN },
        { titel: '店长', path: 'shopMan', icon: DIANZHANG }

      ],
      newMenuList: [],
      form: {},
      referenceId: null,
      messageId: '',
      testData: {},
      bookingData: {}
    }
  },
  computed: {
    ...mapGetters([
      'ruleRouter'
    ])
  },
  watch: {
    '$route': function() {
      this.selectMun()
    }
  },
  mounted() {
    const _this = this
    this.fliterRuter()
    document.onkeydown = function(e) {
      const key = window.event.keyCode
      if ((key === 49 || key === 97) && e.altKey) {
        _this.makeCar(1)
      } else if ((key === 50 || key === 98) && e.altKey) {
        _this.goKeys('houseStaus')
      } else if ((key === 51 || key === 99) && e.altKey) {
        _this.goKeys('booking')
      } else if ((key === 52 || key === 100) && e.altKey) {
        _this.goKeys('checkin')
      }
    }
    _this.selectMun()
    const cash_id = g_localStorage.getItem('cashId')
    if (!cash_id) {
      this.$nextTick(() => {
        this.$refs.CasrList.show()
      })
    }
    _this.$store.dispatch('websocket/STAFF_WEBSOCKET')
  },
  methods: {
    // 菜单不用刚跳转
    goFun(val) {
      const arr = ['shopMan', 'checkin', 'booking']
      return arr.includes(val)
    },
    // 本地路由和服务路由结合
    mergeRouter(sourceArr, ayncArr) {
      const arr = []
      sourceArr.map(p => {
        ayncArr.forEach(v => {
          if (p.path === v.code) {
            v.icon = p.icon
            arr.push(v)
          }
        })
      })
      return arr
    },
    ruleUrlMap(baseUrlLIst) {
      const arr = []
      baseUrlLIst.map(v => {
        if (v.code === 'ERP') {
          v.children.map(p => {
            if (p.code === 'ZGJ') {
              p.children.map(i => {
                this.menuList.map(t => {
                  if (i.code === t.path) {
                    arr.push(i)
                  }
                })
              })
            }
          })
        }
      })
      this.newMenuList = this.mergeRouter(this.menuList, arr)
      this.selectMun()
    },
    // 路由权限
    fliterRuter() {
      const baseUrlLIst = g_localStorage.getItem('ruleRouter')
      if (baseUrlLIst !== 'undefined' && baseUrlLIst) {
        this.ruleUrlMap(JSON.parse(baseUrlLIst)[0].children)
      } else {
        hotelUrl().then(res => {
          const { data } = res
          this.ruleUrlMap(data.module_type_list[0].children)
          g_localStorage.setItem('ruleRouter', JSON.stringify(data.module_type_list))
        })
      }
    },
    // 首页菜单选中
    selectMun() {
      this.newMenuList.forEach(p => {
        if (this.$route.name === p.code) {
          this.$set(p, 'isSelected', true)
        } else {
          this.$set(p, 'isSelected', false)
        }
      })
    },
    goPath({ name }) {
      const namList = ['读卡', '店长', '入住', '预订']
      this.newMenuList.forEach(p => {
        if (namList.includes(name)) {
          return
        }
        if (name === p.name) {
          this.$set(p, 'isSelected', true)
        } else {
          this.$set(p, 'isSelected', false)
        }
      })
      if (name === '店长') {
        this.go()
      } else if (name === '预订') {
        this.testData.data = { master_base: {}}
        this.$refs.booking.show()
      } else if (name === '入住') {
        this.testData.data = { reserve_base: '' }
        this.$refs.checkin.show()
      }
    },
    goKeys(val) {
      this.$router.push({ name: val })
    },
    go() {
      window.open(goUrl)
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
        this.$refs.card.show()
        this.form = res.data.master_base
        this.referenceId = res.data.reference_type
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.menu{
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content:center;
  .menu-item{
    height: 50px;
    width: 50px;
    margin: 0 10px;
    background:#4E8FED;
    border-radius: 4px;
    // border: 1px dashed #fff;
    .img{
      height: 50px;
      width: 50px;
    }
    :hover{
      cursor:pointer;
      background: #FA7C45;
      border-radius: 4px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, .12), 0 0 2px rgba(0, 0, 0, .04);
    }
    .is_active{
      background: #FA7C45;
    }
  }
  .icon {
    width: 100%;
    height: 100%;
    color: #5c807a;
  }
}
</style>
