<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="80%" :append-to-body="true" @close="closeDelog">
    <el-container>
      <el-aside width="150px">
        <div class="aside-left">
          <div :class="roomWith? 'room-with color': 'room-with' ">
            <span style="vertical-align: middle;">排房管理</span>
          </div>
          <div v-for="(p,index) in combineList" :key="index" :class="p.bgc? 'aside-table color' :'aside-table'" @click="selectRoom(p)">
            <div class="lin-icon">
              <div style="display: flex;  justify-content: space-around;">
                <div class="text-status">
                  <span v-if="p.is_check_in === 1" class="text-icon">已入住</span>
                  <span v-else-if="p.is_check_in === 0" class="text-icon icon-color">未入住</span>
                  <span v-else class="text-icon icon-color-leve">已离店</span>
                </div>
                <div>
                  <span v-if="p.is_check_in === 0">
                    <el-link :underline="false" type="danger" @click="deltePai(p)">删 除</el-link>
                    <el-link :underline="false" type="primary" @click="tranToCheckin(p, 'checkin')">入 住</el-link>
                  </span>
                  <el-button v-else type="text" size="mini" @click="tranToCheckin(p, 'checkinDetil')">详 情</el-button>
                </div>
              </div>
              <div style="display: flex;justify-content: space-around;">
                <div style="width: 100px;">{{ p.room_type_desc }}</div>
                <div>{{ p.room_number }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-aside>
      <el-main v-loading="loading" style="padding: 10px 20px;">
        <el-tabs v-model="activeName" type="card" @tab-click="tergeTable">
          <el-tab-pane label="订单" name="first">
            <div style="height: 450px; overflow:auto">
              <OrderInfo :form-inline="formInline" />
              <el-button style="margin: 10px 0;" type="primary" plain size="mini" @click="showOption('EditOrderInfo')">预定信息修改</el-button>
              <NewTable ref="NewTable" @rush="russhBaseBookingInfo" />
              <el-button style="margin-top: 10px" type="primary" plain size="mini" @click="showOption('AddNewBookingRoom')">新增房型</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="账单" name="second">
            <AccuntTable ref="accuntTable" accunt-type />
          </el-tab-pane>
          <el-tab-pane label="宾客" name="thrid">
            <AddGuset ref="AddGuset" />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
    <div v-show="activeName === 'first'" slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="showOption('CanselBooking')">取消预定</el-button>
      <el-button type="primary" size="mini" @click="onPrint">打印预定单信息</el-button>
    </div>
    <div v-show="activeName === 'second'" slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="showOption('AndC')">入消费</el-button>
      <el-button type="primary" size="mini" @click="showOption('WillA')">入预收</el-button>
    </div>
    <div v-show="activeName === 'thrid'" slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="dialogFormVisible = false">取 消</el-button>
    </div>
    <Advance ref="AndC" :account-id="accountId" @rush="rushAccuntList" />
    <ReceiptYS ref="WillA" :account-id="accountId" @rush="rushAccuntList" />
    <!--预订单打印-->
    <BookPrintDialog ref="bookPrintDialog" />
    <AddNewGuest ref="liveWith" :mast-base="mastBase" />
    <Checkin ref="checkin" @rush="russhBaseBookingInfo" />
    <AddNewBookingRoom ref="AddNewBookingRoom" :props-data="formInline" @rush="russhBaseBookingInfo" />
    <EditOrderInfo ref="EditOrderInfo" @rush="russhBaseBookingInfo" />
    <CanselBooking ref="CanselBooking" @rush="beforClose" />
    <CheckinDetil ref="checkinDetil" @rush="russhBaseBookingInfo" />
  </el-dialog>
</template>

<script>
import AccuntTable from '@/components/accuntTableCopy/index'
import OrderInfo from './components/bookingDetile/orderInfo'
import Advance from '@/components/AdvanceReceipt/newAdvance'
import ReceiptYS from '@/components/AdvanceReceipt/newReceipt'
import BookPrintDialog from '@/components/checkin/bookPrintDialog/index'
import AddNewGuest from './components/bookingDetile/addNewGuest'
import NewTable from './components/bookingDetile/newtables'
import Checkin from '@/components/checkin/index'
import AddNewBookingRoom from './components/bookingDetile/addNewBookingRoom'
import EditOrderInfo from './components/bookingDetile/editOrderInfoCopy'
import CanselBooking from './components/bookingDetile/canselBooking'
import CheckinDetil from '@/components/checkin/checkinDetil'
import AddGuset from './components/bookingDetile/addGuset'

import { bookIngInfoApi, rowHouseListApi, bookUpdataApi } from '@/api/book'
import { checkArry } from '@/utils/index'
export default {
  inject: ['componentData'],
  components: {
    AccuntTable,
    OrderInfo,
    Advance,
    ReceiptYS,
    BookPrintDialog,
    AddNewGuest,
    NewTable,
    Checkin,
    AddNewBookingRoom,
    EditOrderInfo,
    CanselBooking,
    CheckinDetil,
    AddGuset
  },
  provide() {
    return {
      banseInfo: () => { return this.formInline },
      componentData: this.testData
    }
  },
  props: {
    title: {
      type: String,
      default: '预定详情'
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      formInline: {},
      testData: {},
      activeName: 'first',
      activeNames: '0',
      checkinInfo: {},
      combineList: [],
      loading: false,
      guestData: {},
      mastBase: {},
      accountId: null,
      rowData: {},
      roomWith: false,
      masterGuest: []
    }
  },
  methods: {
    // 关闭刷新
    closeDelog() {
      this.$emit('rush')
    },
    // 更新账务列表
    rushAccuntList() {
      this.$refs.accuntTable.getAccountLIst()
    },
    // 关闭
    beforClose() {
      this.dialogFormVisible = false
      this.$emit('cansel')
    },
    // 删除已排房
    deltePai(val) {
      const arr = this.combineList.filter(p => {
        return p.rt_rate_id === val.rt_rate_id
      })
      arr.map((p, inx) => {
        if (p.room_number === val.room_number) {
          arr.splice(inx, 1)
        }
      })
      console.log(val, '90909021')
      const params = {
        rt_rate: {
          id: val.rt_rate_id,
          room_count: val.old_count,
          leave_time: val.leave_time,
          arr_time: val.arr_time,
          room_number_list: checkArry(arr, 'room_number').join(',')
        },
        reserve_base: this.formInline.id
      }
      bookUpdataApi(params).then(res => {
        this.$message.success('删除成功!')
        this.russhBaseBookingInfo()
      })
    },
    // 预定转入住
    tranToCheckin(val, ref) {
      this.testData.data = ref === 'checkin' ? { reserve_base: { ...val }} : { master_base: { ...val }}
      this.$refs[ref].show()
    },
    // 获取预定房间列表
    getrowHouseList() {
      rowHouseListApi(this.componentData.data.master_id).then(res => {
        this.combineList = res.data
        if (this.combineList.length > 0) {
          this.$set(this.combineList[0], 'bgc', true)
        }
      })
    },
    getBaseBookingInfo(id) {
      bookIngInfoApi(id).then(res => {
        console.log(res, '预定单详情333')
        const { data } = res
        this.formInline = data
      })
    },
    // 切换在住信息-账务信息
    tergeTable({ name }) {
      if (name === 'second') {
        // 获取账务列表
        this.$refs.accuntTable.getAccountLIst()
      } else if (name === 'thrid') {
        this.$refs.AddGuset.handleClick({ name: 'first' })
      }
    },
    show() {
      this.dialogFormVisible = true
      this.activeName = 'first'
      this.getBaseBookingInfo(this.componentData.data.master_id)
      this.getrowHouseList()
    },
    // 回调刷新预定单详情
    russhBaseBookingInfo() {
      this.getBaseBookingInfo(this.componentData.data.master_id)
      this.getrowHouseList()
    },
    // 操作显示
    showOption(ref) {
      this.accountId = this.formInline.account.id
      this.$refs[ref].show()
    },
    // 点击联房列表
    selectWithRoom() {
      this.roomWith = true
      this.activeName = 'first'
      this.combineList.map(p => {
        this.$set(p, 'bgc', false)
      })
      this.$nextTick(() => {
        this.$refs.BookingRoomW.getrowHouseList()
      })
    },
    //  selectRoom 选择房间
    selectRoom(val) {
      this.roomWith = false
      this.activeName = 'first'
      this.activeNames = '0'
      this.combineList.map(p => {
        if (p.room_number === val.room_number) {
          this.$set(p, 'bgc', true)
        } else {
          this.$set(p, 'bgc', false)
        }
      })
    },
    // 预订信息打印
    onPrint() {
      this.$refs.bookPrintDialog.getDetails(this.formInline)
    }
  }
}
</script>

<style lang="scss" scoped>
.man-info{
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 5px;
}
.aside-left{
  height: 100%;
  font-size: 18px;
  border-right: 1px solid #ccc;
  .room-with{
    text-align: center;
    padding: 5px 0;
    font-size: 16px;
     &.color{
      background-color: #E1F1FF;
    }
  }
  .aside-table{
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    padding: 4px 0;
    cursor:pointer;
    &.color{
      background-color: #E1F1FF;
    }
  }
}
.content{
  display:flex;
  justify-content: space-around;
  border: 1px solid #ccc;
  padding: 10px 0;
}
.info{
  margin-top: 5px;
  display: flex;
}
.lin-icon{
  line-height: 23px;
  .text-icon{
    display: inline-block;
    text-align: center;
    border-radius: 4px;
    padding: 0 3px;
    color: #fff;
    background: #3ac9b6;
  }
  .icon-color{
    background: #fdcf01;
  }
  .icon-color-leve{
    background: #f1852c;
  }
}
.text-status{
  // width: 70px;
  text-align: center;
  line-height: 21px;
  display: inline-block;
}
.btn-style{
  text-align: center;
  margin-top:10px;
}
</style>
