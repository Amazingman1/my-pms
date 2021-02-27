<!--
 * @Author: wangxuan
 * @Date: 2020-12-25 14:40:39
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-25 15:17:55
 * @FilePath: /vue-misb/src/views/houseStaus/components/houseCard.vue
-->
<template>
  <div>
    <div v-for="(p, inx) in roomSatusMap" :key="inx" style="margin-bottom: 10px;">
      <!-- <div v-for="(item, index) in p" :key="index" /> -->
      <div style="border: 1px solid #ccc;margin-top:10px">
        <div style="padding:9px;border-bottom: 1px solid #ccc;font-size:14px;font-weight: 500">{{ p.floor_name }}</div>
        <div class="flow" style="padding:10px">
          <div v-for="(v, indx) in p.data" :key="indx">
            <div
              ref="card"
              class="card"
              :style="{'background': v.color, 'border': v.border, 'box-shadow': v.shadow}"
              @dblclick="goChekin(v)"
              @click="selectRoom(v,$event)"
              @mouseenter="changeColor(v,$event)"
              @mouseleave="rushColor(v)"
            >
              <img v-show="v.is_room_lock" class="lock_img" :src="iconObj.lock" alt="">
              <p>{{ v.room_type }}</p>
              <p>{{ v.room_no }}</p>
              <p>{{ v.room_guest }}</p>
              <img v-show="v.backGroundColor" class="img img-master" :src="iconObj.ZHU" alt="">
              <div class="img_box">
                <img v-show="v.room_state_extra[0] === '1'" class="img" :src="iconObj.team" alt="">
                <img v-show="v.room_state_extra[1] === '1'" class="img" :src="iconObj.qian" alt="">
                <img v-show="v.room_state_extra[2] === '1'" class="img" :src="iconObj.time" alt="">
                <img v-show="v.room_state_extra[3] === '1'" class="img" :src="iconObj.leave" alt="">
                <img v-show="v.room_state_extra[4] === '1'" class="img" :src="iconObj.lian" alt="">
                <img v-show="v.room_state_extra[5] === '1'" class="img" :src="iconObj.ziyong" alt="">
                <img v-show="v.room_state_extra[6] === '1'" class="img" :src="iconObj.zizhuji" alt="">
                <img v-show="v.room_state_extra[7] === '1'" class="img" :src="iconObj.book" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <Options ref="Options" :left-set="offset" :top-set="topSet" :house-data="houseData" :trigger="trigger">
      <div v-show="trigger" slot="DOM">
        <div v-if="!houseData.is_room_lock">
          <div v-show="houseData.room_state === 'VC'" class="btn" @click="haldClick(houseData, 'RZ')">入 住</div>
          <div v-show="houseData.room_state === 'VC' && houseData.room_state_extra[7] !== '1'" class="btn" @click="haldClick(houseData, 'BK')">预 定</div>
          <div v-show="houseData.room_state === 'VC'|| houseData.room_state === 'VD'" class="btn" @click="haldClick(houseData, 'WX')">置维修</div>
          <div v-show="houseData.room_state === 'VC'" class="btn" @click="haldClick(houseData, 'ZZ')">置 脏</div>
          <div v-show="houseData.room_state === 'VD'" class="btn" @click="haldClick(houseData, 'ZJ')">置 净</div>
          <div v-show="houseData.room_state === 'VC'|| houseData.room_state === 'VD'" class="btn" @click="haldClick(houseData, 'SF')">锁 房</div>
          <div v-show="houseData.room_state !== 'OC' && houseData.room_state !== 'OD' && houseData.room_state !== 'OO'" class="btn" @click="canselRoom">取 消</div>
        </div>
        <div v-else class="btn" @click="haldClick(houseData, 'JS')">解 锁</div>
      </div>
      <div v-show="!trigger" slot="ROOMINFO">
        <div v-if="houseData.room_state === 'OO'">
          <Service :house-data="houseData" />
          <el-button class="lin-btn" type="primary" size="mini" @click="canselRoom">取 消</el-button>
          <el-button class="lin-btn" type="primary" size="mini" @click="haldClick(houseData,'JCWX')">解除维修</el-button>
        </div>
        <div v-if="houseData.room_state == 'OC' || houseData.room_state == 'OD' ">
          <RoomInfo :house-data="houseData" />
          <el-button class="lin-btn" type="primary" size="mini" @click="canselRoom">取 消</el-button>
        </div>
      </div>
    </Options>
    <CheckinDetil ref="checkinDetil" @rush="$store.dispatch('housStatus/getRoomSatusMap'), canselRoom()" />
    <Booking ref="booking" :booking-data="bookingData" house-trans @rush="$store.dispatch('housStatus/getRoomSatusMap'), canselRoom()" />
    <Checkin ref="checkin" @rush="$store.dispatch('housStatus/getRoomSatusMap'),canselRoom()" />
  </div>
</template>

<script>
import { roomLockApi, changeRoomStatusApi } from '@/api/housStatus'
import { mapGetters } from 'vuex'
import { sendCheckRoomApi, addRoomCheckApi } from '@/api/roomSeting'
import CheckinDetil from '@/components/checkin/checkinDetil'
import Checkin from '@/components/checkin/index'
import Booking from '@/components/newBooking/booking'
import RoomInfo from './roomInfo'
import Service from './service'
import Options from './houseOptions'
const LEAVE = require('@/assets/image/preLeave2x.png')
const TEAM = require('@/assets/image/team2x.png')
// 房态iocn 组
const BOOK = require('@/assets/image/preDestine2x.png')
const PRINT = require('@/assets/image/printHouse2x.png')
const QIAN = require('@/assets/image/qianFei2x.png')
const TIME = require('@/assets/image/timeHouse2x.png')
const LIAN = require('@/assets/image/and2x.png')
const ZIYONG = require('@/assets/image/selfUse2x.png')
const ZIZHUJI = require('@/assets/image/selfHelp2x.png')
const LOCK = require('@/assets/image/lockPng.png')
const ZHU = require('@/assets/image/zhu.png')

export default {
  components: { CheckinDetil, Booking, Checkin, Options, RoomInfo, Service },
  provide() {
    return {
      componentData: this.testData
    }
  },
  props: {
    newCardList: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      testData: {},
      iconObj: {
        leave: LEAVE,
        team: TEAM,
        book: BOOK,
        print: PRINT,
        qian: QIAN,
        time: TIME,
        lian: LIAN,
        ziyong: ZIYONG,
        zizhuji: ZIZHUJI,
        lock: LOCK,
        ZHU
      },
      bookingData: {},
      offset: null,
      topSet: null,
      isShowOption: false,
      houseData: {},
      trigger: false
    }
  },
  computed: {
    form: {
      get(val) {
        return this.formData
      },
      set(val) {
        this.$emit('update:formData', val)
      }
    },
    ...mapGetters([
      'roomSatusMap',
      'newCopyStatusList'
    ])
  },

  methods: {
    // 选中房态
    selectRoom(item, event) {
      console.log(item, '选中的房体啊')
      this.$refs.Options.show()
      this.isShowOption = true
      this.houseData = { ...item }
      const str = ['OC', 'OD', 'OO']
      if (str.includes(item.room_state)) {
        this.trigger = false
        const x = event.pageX + 330
        const y = event.pageY + 10
        const clienX = document.documentElement.clientWidth - 140
        const clienY = document.documentElement.scrollHeight - 240
        this.offset = x > clienX ? x - 630 : x - 320
        this.topSet = y > clienY ? y - 190 : y
      } else {
        this.trigger = true
        const x = event.pageX + 10
        const y = event.pageY + 10
        const clienX = document.documentElement.clientWidth - 140
        const clienY = document.documentElement.scrollHeight - 240
        this.offset = x > clienX ? x - 130 : x
        this.topSet = y > clienY ? y - 190 : y
      }
      this.newCopyStatusList.map(key => {
        if (item.room_no === key.room_no) {
          this.$set(key, 'border', 'solid 4px #000')
        } else {
          this.$set(key, 'border', 'solid 0px #000')
        }
      })
    },
    // 取消选中
    canselRoom() {
      this.$refs.Options.hiden()
      this.newCopyStatusList.map(key => {
        this.$set(key, 'border', 'solid 0px #000')
      })
    },
    // 联房鼠标移出取消边框设置
    rushColor(item, event) {
      this.newCopyStatusList.map(key => {
        if (key.master_base.main_master_room_number) {
          if (item.master_base.main_master_room_number === key.master_base.main_master_room_number) {
            this.$set(key, 'border', 'solid 0px #EB6100')
            if (key.room_no === key.master_base.main_master_room_number) {
              this.$set(key, 'backGroundColor', false)
            }
          }
        }
      })
    },
    // 联房鼠标移入边框显示
    changeColor(item, event) {
      this.newCopyStatusList.map(key => {
        if (key.master_base.main_master_room_number) {
          if (item.master_base.main_master_room_number === key.master_base.main_master_room_number) {
            this.$set(key, 'border', 'solid 4px #EB6100')
            if (key.room_no === key.master_base.main_master_room_number) {
              this.$set(key, 'backGroundColor', true)
            }
          }
        }
      })
    },
    // 判断当前房态是否可以入住或预定
    targertBtn({ reserve_base, room_state }) {
      console.log(reserve_base.arr_time, 99009)
      if (reserve_base.arr_time) {
        return false
      } else {
        return true
      }
    },
    // 房态码映射关系 在 readme
    haldClick(val, status) {
      this.form.room_no = val.room_no
      this.form.room_occupy_after_code = ''
      this.form.room_occupy_before_code = val.room_occupy
      this.form.room_state_before_code = val.room_state
      if (status === 'JCWX') {
        this.form.room_occupy_after_code = 'NNZ'
        this.form.room_state_after_code = 'VD'
        this.changeRoomSatatus(val)
      } else if (status === 'WX') {
        this.$emit('roomNo', this.form.room_no)
        this.form.room_state_after_code = 'OO'
        this.form.room_occupy_after_code = 'OOZ'
        this.$parent.getReson()
      } else if (status === 'ZJ') {
        this.form.room_occupy_after_code = 'NNZ'
        this.form.room_state_after_code = 'VC'
        this.changeRoomSatatus(val)
      } else if (status === 'ZZ') {
        this.form.room_occupy_after_code = 'NNZ'
        this.form.room_state_after_code = 'VD'
        this.changeRoomSatatus(val)
      } else if (status === 'RZXQ') {
        this.toSrc(val)
      } else if (status === 'RZ') {
        this.goCheckinforcheckin(val, 'checkin')
      } else if (status === 'SF') {
        this.setRoomLock(val, '1')
      } else if (status === 'JS') {
        this.setRoomLock(val, '2')
      } else if (status === 'BK') {
        this.goCheckinforcheckin(val, 'booking')

        console.log(val, 99)
      } else if (status === 'JF') {
        console.log('净房检查')
      } else if (status === 'DS') {
        console.log('立即打扫')
      } else if (status === 'CFQQ') {
        console.log('退房查房请求')
        this.addRoomCheck(val)
      }
    },
    // 发送查房请求
    sendCheckRoom(val) {
      sendCheckRoomApi({ RoomNo: val.room_no }).then(res => {
        console.log('查房请求结果', res)
      })
    },
    // 新增查房任务
    addRoomCheck(val) {
      console.log(val)
      const data = {
        check_type: val.room_state,
        room_no: val.room_no,
        master_id: val.id,
        account_id: val.account_base.account_id
      }
      addRoomCheckApi(data).then(res => {
        console.log('新增任务', res)
      })
    },
    goChekin(val) {
      if (val.room_state === 'OC' || val.room_state === 'OD') {
        this.toSrc(val)
      } else if (val.room_state === 'VC') {
        if (val.room_state_extra[7] === '1') {
          this.testData.data = { ...val }
          this.$refs.checkin.show()
        } else {
          this.goCheckinforcheckin(val, 'checkin')
        }
      }
    },
    changeRoomSatatus(val) {
      console.log(this.form, 'shij')
      changeRoomStatusApi(this.form).then(res => {
        this.repairDialog = false
        this.$store.dispatch('housStatus/getRoomSatusMap')
        this.canselRoom()
      })
    },
    // 净房跳转入住
    goCheckinforcheckin(val, type) {
      if (val.is_room_lock) {
        return
      }
      if (type === 'checkin') {
        this.testData.data = { ...val }
        this.$refs.checkin.show()
      } else {
        this.bookingData = val
        this.$refs.booking.show()
      }
    },
    // 锁房
    setRoomLock(val, type) {
      const params = {
        room_no: val.room_no,
        lock_type: type
      }
      roomLockApi(params).then(res => {
        this.$store.dispatch('housStatus/getRoomSatusMap')
        this.canselRoom()
      })
    },
    toSrc(val) {
      this.testData.data = { ...val }
      this.$refs.checkinDetil.show()
    }
  }
}
</script>

<style lang="scss" scoped>
.flow{
  display: flex;
  flex-wrap: wrap;
}
.room-info{
   padding: 20px;
   display: flex;
   overflow: hidden;
   }
  .card{
    position: relative;
    width: 123px;
    height: 80px;
    margin: 1px 4px 4px 1px;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    &:hover{
      opacity:0.6;
    }
    p{
      margin: 0;
      padding:0;
      font-size: 12px;
      font-family:PingFang SC;
      font-weight:400;
      display: block;
      width: 100%;
      white-space: nowrap;  /* 强制不换行 */
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .img_box{
      display: flex;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .img{
      width: 15px;
      height: 15px;
    }
  }
    .lock_img{
      width: 40px;
      height: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -20px;
      margin-top: -20px;
    }
    .selectCard{
      border: solid 1px #EB6100;
    }
    .outSelect{
      border: solid 0px #EB6100;
    }
    .img-master{
      position: absolute;
      top: 0;
      right: 0;
    }
  .btn{
    padding: 6px 0;
    &:hover{
      color:#fff;
      background-color: #409eff;
      cursor: pointer;
    }
  }
    .lin-btn{
      float: right;
      margin-right: 10px;
      margin-bottom: 10px;
    }
</style>
