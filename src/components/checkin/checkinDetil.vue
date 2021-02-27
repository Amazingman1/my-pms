<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="80%"
    :append-to-body="true"
    @close="closeDelog"
  >
    <el-container>
      <el-aside width="150px" style="height:494px;border-right:1px solid #ccc;">
        <div class="aside-left">
          <div :class="roomWith ? 'room-with color' : 'room-with'" @click="selectWithRoom">
            <img src="@/assets/image/with.png" style="width: 20px; height: 18px; vertical-align: middle">
            <span style="vertical-align: middle">
              {{ isTeam(is_show) ? '团队管理' : '联房管理' }}</span>
            <span>[{{ liveInMount }}]</span>
          </div>
          <div
            v-for="(p, index) in combineList"
            :key="index"
            @click="selectRoom(p.id, index)"
          >
            <div :class="p.bgc ? 'aside-table color' : 'aside-table'">
              <div class="lin-icon">
                <span v-if="p.is_master === 1" class="text-icon icon-color">主</span>
                <span v-else class="text-icon" />
                <span>{{ p.room_number }}</span><br>
              </div>
              <div style="width: 70px; text-align: center">
                {{ p.master_status_lable_desc }}
              </div>
              <div>
                <span
                  class="list-style"
                >{{ p.name_list.length > 0 ? p.name_list.join(' '): '-' }}</span>
              </div>
            </div>

          </div>
        </div>
      </el-aside>
      <el-main v-loading="loading" style="padding: 10px 20px">
        <el-tabs v-model="activeName" type="card" @tab-click="tergeTable">
          <el-tab-pane v-if="!roomWith" label="客单" name="first">
            <RoomInfo :form-inline="formInline" />
            <LeaveOrderHiden :status-code="formInline.master_status_lable">
              <el-button style="margin-top: 10px" type="primary" plain size="mini" @click="editRoomInfoMethod">房间信息修改</el-button>
              <el-button style="margin-top: 10px" type="primary" plain size="mini" @click="checkBookingInfo">预定信息</el-button>
            </LeaveOrderHiden>
            <el-tabs v-model="activeNames" type="card" style="margin-top: 20px">
              <el-tab-pane
                v-for="(item, index) in formInline.master_guest"
                :key="index"
                :label="item.name"
                :name="`${index}`"
              >
                <GuestInfo :item-value="item" />
                <LeaveOrderHiden :status-code="formInline.master_status_lable">
                  <div style="margin-top: 10px">
                    <el-button type="primary" size="mini" plain @click="addGuest">新增同住人</el-button>
                    <el-button type="primary" size="mini" plain @click="editGuestMethod(item)">修改客人</el-button>
                  </div>
                </LeaveOrderHiden>
              </el-tab-pane>
              <div v-show="formInline.master_guest && formInline.master_guest.length === 0">
                <GuestInfo :item-value="{name: ''}" />
                <LeaveOrderHiden :status-code="formInline.master_status_lable">
                  <div style="margin-top: 10px">
                    <el-button type="primary" size="mini" plain @click="addGuest">新增同住人</el-button>
                  </div>
                </LeaveOrderHiden>
              </div>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane v-else :label="isTeam(is_show) ? '团队列表' : '联房列表'" name="first">
            <WithRoomList ref="WithRoomList" @rush="getCombineListOnyl" />
          </el-tab-pane>
          <el-tab-pane label="账单" name="second">
            <AccuntTable
              ref="accuntTable"
              :subject="subject"
              :master-room="masterRoom"
              :is-master="isMaster"
              :is-show="is_show"
              :team-id="teamId"
              :room-with="roomWith"
            />
          </el-tab-pane>
          <el-tab-pane v-if="!roomWith" label="日志" name="tree">
            <Log ref="Log" />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
    <div v-show="activeName === 'first' && !roomWith" slot="footer" class="dialog-footer">
      <LeaveOrderHiden :status-code="formInline.master_status_lable">
        <el-button type="primary" size="mini" @click="showOption('LeaveEarly')">提前离店</el-button>
        <el-button type="primary" size="mini" @click="showOption('ChangeRoom')">换房升降</el-button>
        <el-button type="primary" size="mini" @click="showOption('changePrice')">价格修改</el-button>
        <el-button type="primary" size="mini" @click="showOption('continuedToLive')">续 住</el-button>
        <el-button v-if="!isTeam(is_show)" type="primary" size="mini" @click="showOption('EditRoom')">编辑联房</el-button>
        <el-button type="primary" size="mini" @click="roomMarkCar">制 卡</el-button>
        <el-popover v-show="isTeam(is_show) || is_show === 0 " placement="right" trigger="hover" style="margin-left: 10px">
          <div class="btn-style">
            <el-button size="mini" type="primary" plain @click="showOption('TeamIn')">入 团</el-button>
          </div>
          <div class="btn-style" style="padding-bottom: 10px">
            <el-button size="mini" type="primary" plain @click="outTeam">出 团</el-button>
          </div>
          <el-button slot="reference" type="primary" size="mini">团 队</el-button>
        </el-popover>
      </LeaveOrderHiden>
      <el-button type="primary" size="mini" @click="showOption('Receipt')">小 票</el-button>
    </div>
    <div v-show="activeName === 'second' && !roomWith" slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="showOption('Invoice')">发 票</el-button>
      <el-button type="primary" size="mini" @click="showOption('AndC')">入消费</el-button>
      <el-button type="primary" size="mini" @click="showOption('WillA')">入预收</el-button>
      <LeaveOrderHiden :status-code="formInline.master_status_lable">
        <el-button type="primary" size="mini" @click="isAddRoomPirce('RefundRoom')">退 房</el-button>
      </LeaveOrderHiden>
      <el-button v-show="formInline.master_status_lable === 2" type="primary" size="mini" @click="isAddRoomPirce('RefundRoom')">结 账</el-button>
    </div>
    <div v-show="activeName === 'tree' && !roomWith" slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="dialogFormVisible = false">取 消</el-button>
    </div>
    <div v-show="roomWith" slot="footer" class="dialog-footer">
      <LeaveOrderHiden :status-code="formInline.master_status_lable">
        <el-button v-show="!isTeam(is_show)" type="primary" size="mini" @click="showOption('EditRoom')">编辑联房</el-button>
      </LeaveOrderHiden>
      <el-button v-show="isTeam(is_show)" type="primary" size="mini" @click="donloadTeamList">导 出</el-button>
      <el-button type="primary" size="mini" @click="dialogFormVisible = false">取 消</el-button>
    </div>
    <LiveWith ref="liveWith" :mast-base="mastBase" @rush="rushBaseInfo(), getCombineList()" />
    <EditGuest ref="editGuest" :guest-data="guestData" @rush="rushBaseInfo(), getCombineList()" />
    <ChangePrice ref="changePrice" @rush="rushBaseInfo" />
    <ContinuedToLive ref="continuedToLive" @rush="rushBaseInfo" />
    <Receipt ref="Receipt" />
    <ChangeRoom ref="ChangeRoom" @rush="rushBaseInfo(), getCombineList()" />
    <LeaveEarly ref="LeaveEarly" @rush="rushBaseInfo" />
    <Invoice ref="Invoice" />
    <EditRoom ref="EditRoom" @rush="rushBaseInfo(), getCombineList()" />
    <Advance ref="AndC" :account-id="accountId" @rush="rushAccuntList" />
    <ReceiptYS ref="WillA" :account-id="accountId" @rush="rushAccuntList" />
    <RefundRoom
      ref="RefundRoom"
      :row-data="rowData"
      :master-id="masterId"
      @houseStaus="rushBaseInfo(), getCombineListOnyl(),rushAccuntList()"
      @rushRefund="refundMo"
    />
    <EditRoomInfo ref="EditRoomInfo" @rush="rushBaseInfo" />
    <TeamIn ref="TeamIn" @rush="rushBaseInfo(), getCombineList()" />
    <MakeCarCom ref="makeCarCom" :opetion="carData" />
    <BookingInfo ref="BookingInfo" />
    <AddRoomPrice ref="AddRoomPrice" @rush="rushAccuntList, showOption('RefundRoom')" />
  </el-dialog>
</template>

<script>
import { getMasterInfo, getCombineListApi, outTeamApi, donloadTeamListApi } from '@/api/checkin'
import AccuntTable from '@/components/accuntTableCopy/index'
import LiveWith from './components/checkDetile/liveWith'
import EditGuest from './components/checkDetile/editGuset'
import ChangePrice from './components/checkDetile/changeRoomPiec'
import RoomInfo from './components/checkDetile/roomInfo'
import GuestInfo from './components/checkDetile/guestInfo'
import ContinuedToLive from './components/checkDetile/continuedToLive'
import Receipt from './components/checkDetile/receipt'
import ChangeRoom from './components/checkDetile/changeRoom'
import LeaveEarly from './components/checkDetile/leaveEarly'
import Log from './components/checkDetile/log'
import Invoice from './components/checkDetile/invoice'
import EditRoom from './components/checkDetile/newEditRoom'
import Advance from '@/components/AdvanceReceipt/newAdvance'
import ReceiptYS from '@/components/AdvanceReceipt/newReceipt'
import RefundRoom from './components/checkDetile/refundRoom'
import WithRoomList from './components/checkDetile/withRoomList'
import EditRoomInfo from './components/checkDetile/editRoomInfo'
import TeamIn from './components/checkDetile/teamIn'
import MakeCarCom from '@/components/mackCar'
import LeaveOrderHiden from '@/components/checkin/leaveOrderHiden'
import BookingInfo from './components/checkDetile/bookingInfo'
import AddRoomPrice from './components/checkDetile/addRoomPrice'

export default {
  inject: ['componentData'],
  components: {
    AccuntTable,
    LiveWith,
    EditGuest,
    ChangePrice,
    RoomInfo,
    GuestInfo,
    ContinuedToLive,
    Receipt,
    ChangeRoom,
    LeaveEarly,
    Log,
    Invoice,
    EditRoom,
    Advance,
    ReceiptYS,
    RefundRoom,
    WithRoomList,
    EditRoomInfo,
    TeamIn,
    MakeCarCom,
    LeaveOrderHiden,
    BookingInfo,
    AddRoomPrice
  },
  provide() {
    return {
      banseInfo: () => {
        return this.formInline
      }
    }
  },
  props: {
    title: {
      type: String,
      default: '入住详情'
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      masterRoom: 1,
      formInline: {},
      activeName: 'first',
      activeNames: '0',
      radio2: '总账务',
      checkinInfo: {},
      combineList: [],
      liveInMount: 0, // 联房/团队已入住房间数
      loading: false,
      guestData: {},
      mastBase: {},
      accountId: null,
      rowData: {},
      subject: 'consume,pay,refund',
      roomWith: false,
      isMaster: 0,
      accuntDetail: {},
      carData: {},
      masterId: null,
      is_show: null,
      teamId: null
    }
  },
  methods: {
    // 导出团队详情列表
    donloadTeamList() {
      donloadTeamListApi(this.formInline.id).then(res => {
        window.location.href = res.data.download
      })
    },
    // 退房是否加收房费
    isAddRoomPirce() {
      console.log(this.formInline, '444')
      const flag = this.formInline.id === this.formInline.master_id
      if (flag) {
        this.$msgbox({
          title: '退房提醒',
          message: '当前为主帐房，如要退房，从帐房会一并退房,是否要继续退房？',
          showCancelButton: true,
          confirmButtonText: '继续退房',
          cancelButtonText: '取消退房',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          this.reffundRoomInfo()
        }).catch(() => {
          return
        })
      } else {
        this.reffundRoomInfo()
      }
    },
    // 退房提醒
    reffundRoomInfo() {
      this.$msgbox({
        title: '是否加收房费',
        message: `结账提醒：${this.formInline.remark2 || '无'}`,
        showCancelButton: true,
        confirmButtonText: '加收',
        cancelButtonText: '不加收',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        this.operationTitle = '加收'
        this.$refs.AddRoomPrice.show()
      }).catch(() => {
        this.$refs.RefundRoom.show()
      })
    },
    // 查看预定信息,,
    checkBookingInfo() {
      this.$refs.BookingInfo.show()
    },
    // 房间制卡
    roomMarkCar() {
      this.carData = {
        operate_type: 2, // 1, "读卡"), (2, "写卡"), (4, "销卡"),
        start_time: this.formInline.latest_make_card_arr_time,
        end_time: this.formInline.leave_time,
        room_no: this.formInline.room_number,
        guest_no: 0,
        reference_type: 1, // 1表示入住单 2表示预定单 3表示非订单
        reference_id: this.formInline.id,
        lock_number: this.formInline.lock_number
      }
      this.$refs.makeCarCom.makeCar()
    },
    // 出团
    outTeam() {
      const data = {
        master_id: this.formInline.id
      }
      outTeamApi(data).then((res) => {
        console.log(res, '出团')
        this.$message.success('当前订单已出团！')
        this.$emit('rush')
        this.rushBaseInfo()
        this.getCombineList()
      })
    },
    // 开始修改房间信息
    editRoomInfoMethod() {
      this.$refs.EditRoomInfo.show()
    },
    // 退款跳至付款
    refundMo() {
      this.radio2 = '付款'
      this.subject = 'pay'
    },
    // 更新账务列表
    rushAccuntList() {
      this.$refs.accuntTable.getAccountLIst()
    },
    // 切换在住信息-账务信息
    tergeTable({ name }) {
      if (name === 'second') {
        // 获取账务列表
        this.$refs.accuntTable.getAccountLIst()
      } else if (name === 'tree') {
        this.$refs.Log.show()
      }
    },
    show() {
      this.getCombineList()
      this.dialogFormVisible = true
      this.activeName = 'first'
    },
    // 操作显示
    showOption(ref) {
      this.accountId = this.formInline.account.id
      this.$refs[ref].show()
    },
    // 添加同住人
    addGuest() {
      this.mastBase = {
        id: this.formInline.id,
        room_number: this.formInline.room_number
      }
      this.$refs.liveWith.show()
    },
    // 修改宾客
    editGuestMethod(row) {
      this.guestData = { ...row }
      this.$refs.editGuest.show()
    },
    // 点击联房列表
    selectWithRoom() {
      this.roomWith = true
      this.activeName = 'first'
      if (this.isTeam(this.is_show)) {
        this.teamId = this.combineList[0].main_account_id
        this.masterRoom = 1
      } else {
        this.masterRoom = 0
      }
      this.combineList.map((p) => {
        if (p.is_master === 1) {
          this.masterId = p.account_id
        }
        this.$set(p, 'bgc', false)
      })
      this.filterMasterAccuntId()
      this.$nextTick(() => {
        this.$refs.WithRoomList.faterWithRoomList()
      })
    },
    // 过滤到主账单的账单id
    filterMasterAccuntId() {
      const arr = this.combineList.filter((p) => {
        return p.is_master === 1
      })
      if (arr.length > 0) {
        this.isMaster = arr[0].account_id
      } else {
        this.isMaster = this.componentData.data.master_base.account_id
      }
    },
    //  selectRoom 选择房间
    selectRoom(id, index) {
      this.getBaseInfo(id)
      this.masterId = null
      this.roomWith = false
      this.activeName = 'first'
      this.activeNames = '0'
      this.combineList.map((p) => {
        if (p.id === id) {
          this.$set(p, 'bgc', true)
          this.masterRoom = 1
        } else {
          this.$set(p, 'bgc', false)
        }
      })
    },
    // 操作过后刷新在住单详情信息
    rushBaseInfo() {
      this.getBaseInfo(this.componentData.data.master_base.master_id)
    },
    // 关闭详情弹窗刷新后刷新
    closeDelog() {
      this.is_show = null
      this.$emit('rush')
    },
    /**
     * union_type
     * 0 无
     * 1 联房主单
     * 2 联房从单
     * 3 团队主单
     * 4 团队从单
     */
    // 判断是否是团队订单
    isTeam(val) {
      const arr = [3, 4]
      return arr.includes(val)
    },
    // 获取在住单详情
    getBaseInfo(id) {
      this.loading = true
      getMasterInfo(id).then((res) => {
        const { data } = res
        this.formInline = data
        this.is_show = data.union_type
        this.loading = false
      })
    },
    // 设置主帐房指刷新获取联防列表
    getCombineListOnyl() {
      getCombineListApi(this.componentData.data.master_base.master_id).then((res) => {
        this.combineList = res.data.room_list
        this.liveInMount = res.data.live_in_amount
      })
    },
    // 获取联防列表
    getCombineList() {
      getCombineListApi(this.componentData.data.master_base.master_id).then((res) => {
        this.combineList = res.data.room_list
        this.liveInMount = res.data.live_in_amount
        this.$set(this.combineList[0], 'bgc', true)
        this.selectRoom(this.componentData.data.master_base.master_id)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.man-info {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 5px;
}
.aside-left {
  height: 100%;
  font-size: 18px;
  .room-with {
    text-align: center;
    padding: 5px 0;
    font-size: 16px;
    &.color {
      background-color: #e1f1ff;
    }
  }
  .aside-table {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    padding: 4px 0;
    flex-wrap: wrap;
    cursor: pointer;
    &.color {
      background-color: #e1f1ff;
    }
  }
}
.content {
  display: flex;
  justify-content: space-around;
  border: 1px solid #ccc;
  padding: 10px 0;
}
.info {
  margin-top: 5px;
  display: flex;
}
.lin-icon {
  line-height: 23px;
  .text-icon {
    display: inline-block;
    height: 16px;
    width: 16px;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    border-radius: 4px;
    color: #fff;
  }
  .icon-color {
    background: #ffb900;
  }
}
.btn-style {
  text-align: center;
  margin-top: 10px;
}
.list-style{
  display: inline-block;
  overflow: hidden;
  width: 92px;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  color: red;
}
</style>
