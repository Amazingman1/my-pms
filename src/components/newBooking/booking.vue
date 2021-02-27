<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="65%" :append-to-body="true">
    <el-form ref="formInline" :model="formInline" style="padding:10px 0" size="mini" label-width="80px" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="到达时间">
            <el-date-picker
              v-model="formInline.arr_time"
              type="datetime"
              placeholder="选择日期时间"
              :picker-options="startTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="selectDay"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="离店时间">
            <el-date-picker
              v-model="formInline.leave_time"
              type="datetime"
              placeholder="选择日期时间"
              default-time="14:00:00"
              :picker-options="endTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="selectDay"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="天数">
            <el-input-number v-model="formInline.days" controls-position="right" :min="1" :max="30" @change="reduceTime" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="市场码">
            <el-select v-model="formInline.code_market" placeholder="市场码" @change="changeMarckCode">
              <el-option v-for="p in marketList" :key="p.id" :label="p.descript" :value="p.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="来源码">
            <el-select
              v-model="formInline.code_src"
              placeholder="请选择来源码"
              @focus="selectMarktCodeToSrcCode(formInline.code_market)"
            >
              <el-option v-for="p in srcList" :key="p.id" :label="p.descript" :value="p.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单类型">
            <el-select v-model="formInline.rsv_type" placeholder="请选择房价类型" @change="getRatCodeList">
              <el-option label="全日房" :value="0" />
              <el-option label="钟点房" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="房价码">
            <el-select
              v-model="formInline.rate_code"
              placeholder="请选择房价码"
              @focus="getRatCodeList"
              @change="changeSelectRoomTypePric"
            >
              <el-option v-for="(p , index ) in roomPriceCodeList" :key="index" :label="p.description" :value="p.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            v-if="formInline.code_market === 'TD'|| formInline.code_market === 'XYGS'"
            label="协议公司"
            prop="company_base"
            :rules="{
              required: formInline.code_market === 'TD', message: '协议公司不能为空', trigger: 'blur'
            }"
          >
            <el-select
              v-model="formInline.company_base"
              filterable
              remote
              placeholder="请选择"
              :remote-method="getAgreement"
            >
              <el-option v-for="p in agreeList" :key="p.id" :label="p.name" :value="p.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            v-if="formInline.code_market === 'TD'|| formInline.code_market === 'XYGS'"
            label="团队名称"
            prop="team_name"
            :rules="{
              required: formInline.code_market === 'TD', message: '团队名不能为空', trigger: 'blur'
            }"
          >
            <el-input v-model="formInline.team_name" />
          </el-form-item>
        </el-col>
        <el-col v-if="formInline.code_market === 'HY'" :span="8">
          <el-form-item label="会员">
            <el-select
              v-model="formInline.card_name"
              filterable
              remote
              placeholder="请选择"
              :remote-method="getVipListMeoth"
            >
              <el-option v-for="p in vipList" :key="p.id" :label="p.card_name" :value="p.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="预定人" prop="name">
            <el-input v-model="formInline.name" maxlength="15" />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="电话号码">
            <el-input v-model="formInline.telephone" maxlength="11" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="备注">
            <el-input
              v-model="formInline.remark"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              maxlength="150"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-show="houseTrans" class="man-info">
      <el-table
        :data="tableData"
        border
        height="200"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="房型"
        >
          <template slot-scope="{row, $index}">
            <el-select
              v-model="row.room_type"
              size="mini"
              placeholder="请选择房型"
              style="width:100%"
              @focus="getroomTypeList"
              @change="changeRoomType($index)"
            >
              <el-option v-for="p in roomTypeList" :key="p.id" :label="p.descript_en" :value="p.code" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="房数"
          width="100"
        >
          <template slot-scope="{row}">
            <el-input v-model.number="row.room_count" size="mini" />
          </template>
        </el-table-column>
        <el-table-column
          label="房号"
          width="160"
        >
          <template slot-scope="{row, $index}">
            {{ row.room_number }}
            <el-link :underline="false" type="primary" @click="setRoomSort(row, $index)">排房</el-link>
          </template>
        </el-table-column>

        <el-table-column
          label="房单价"
          width="100"
        >
          <template slot-scope="{row}">
            <el-input v-model="row.price" size="mini" />
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="折扣方式"
        >
          <template slot-scope="{row}">
            <el-select v-model="row.discount_type" size="mini" placeholder="请选择折扣方式" style="width:100%">
              <el-option label="比例折扣" :value="0" />
              <el-option label="金额折扣" :value="1" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="折扣">
          <template slot-scope="{row, $index}">
            <el-input v-model="row.discount" size="mini" autocomplete="off" @blur="chageDiscount(row, $index)" />
          </template>
        </el-table-column>
        <el-table-column
          label="折扣价"
        >
          <template slot-scope="{row}">
            <el-input v-model="row.rate_code_price" size="mini" placeholder="折扣价格" style="width:100%" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="70px">
          <template slot-scope="scope">
            <i v-if="tableData.length > 1" style="font-size: 24px;" class="el-icon-delete" @click="deleteWith(scope.$index)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button v-show="houseTrans" type="text" class="el-icon-plus" @click="addWith">添加预定房型</el-button>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" plain @click="dialogFormVisible = false">取 消</el-button>
      <!-- <el-button type="primary" size="mini" @click="submint">取消排房</el-button> -->
      <el-button type="primary" size="mini" @click="houseTrans?submint():newBooking()">确认预定</el-button>
    </div>
    <RoomSort ref="RoomSort" :parm-data="parmData" @getRoomList="selectRoom" />
    <BookingDetil ref="BookingDetil" @rush="$store.dispatch('housStatus/getRoomSatusMap')" />
  </el-dialog>
</template>

<script>
import { roomTypeListApi, getVipListApi, getAgreementListApi, saerchData, submintRoomPriceApi } from '@/api/checkin'
import { parseTime } from '@/utils/index'
import { bookingApi, reserveInfoApi } from '@/api/book'
import { newBookingApi } from '@/api/book'
import { rataCodeListData } from '@/api/home'
import RoomSort from './components/roomSort'
import BookingDetil from '@/components/checkin/bookingDetil'

export default {
  provide() {
    return {
      componentData: this.testData
    }
  },
  components: { RoomSort, BookingDetil },
  props: {
    title: {
      type: String,
      default: '新增预定'
    },
    bookingData: {
      type: Object,
      default: () => {}
    },
    // 预定入口 true: 房态图入口 else 预定菜单
    houseTrans: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      testData: {},
      dialogFormVisible: false,
      formInline: {
        code_src: '',
        rate_code: '',
        arr_time: '',
        leave_time: '',
        days: '',
        rsv_type: '',
        code_market: '',
        company_base: '',
        remark: '',
        telephone: '',
        name: '',
        team_name: ''
      },
      flag: true,
      roomTypeList: [], // 房型列表
      srcList: [], // 来源码
      marketList: [],
      roomPriceCodeList: [], // 房价码
      seschForm: {
        total: 0,
        page: 1,
        page_size: 10
      },
      tableData: [
        {
          room_count: '',
          room_type: '',
          rate_code_price: '',
          room_number: '',
          discount_type: 0
        }
      ],
      selectIndex: null,
      parmData: {},

      agreeList: [],
      vipList: [],
      rules: {
        name: [
          { required: true, message: '预定人不能为空', trigger: ['blur'] }
        ]
      },
      startTime: {
        disabledDate: time => {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000 // 当天也可做预定
        }
      },
      endTime: {
        disabledDate: time => {
          if (this.formInline.arr_time) {
            return (
              time.getTime() < new Date(this.formInline.arr_time).getTime()
            )
          } else {
            return time.getTime() > Date.now()
          }
        }
      }
    }
  },
  methods: {
    // 获取天数
    getPrice() {
      const params = {
        begin_date: this.formInline.arr_time,
        end_date: this.formInline.leave_time,
        rate_code: this.formInline.rate_code,
        room_type: [this.formInline.room_type]
      }
      submintRoomPriceApi(params).then(res => {
        const { data } = res
        console.log(data, '房价')
        this.tableData = data.price[0].price_list
        this.formInline.days = data.check_days
        this.formInline.newPrice = data.price[0].price_list[0].room_price
        console.log(this.formInline)
      })
    },
    // 更改市场码修改；来源吗
    changeMarckCode() {
      this.formInline.company_base = ''
      this.formInline.team_name = ''
      this.selectMarktCodeToSrcCode(this.formInline.code_market)
      if (this.srcList.length > 0) {
        this.formInline.code_src = this.srcList[0].code
      }
    },
    // 更改房型
    changeRoomType(key) {
      this.$set(this.tableData[key], 'room_number', '')
      this.$set(this.tableData[key], 'room_count', '')
      this.getsaerchData(key)
    },
    // 查询房间是否占用
    getRoomStatus(arr_time, leave_time) {
      const data = {
        room_no: this.bookingData.room_no,
        arr_time,
        leave_time
      }
      reserveInfoApi(data).then(res => {
        if (res.data.take_up_status) {
          this.$message.warning('当前时间段，此房间已被占用请重新排房')
          this.tableData[0].room_no = ''
          this.$set(this.tableData[0], 'room_number', '')
        }
      })
    },
    // 获取预定默认信息
    getReserveInfo() {
      reserveInfoApi({ room_no: this.bookingData.room_no }).then(res => {
        const { data } = res
        this.marketList = data.market_list
        this.roomPriceCodeList = [{ code: data.rate_code_dict.code, description: data.rate_code_dict.desc }]
        this.formInline = {
          arr_time: data.arr_time,
          leave_time: data.leave_time,
          days: data.days,
          rsv_type: data.master_type,
          code_market: data.target_market.code,
          code_src: data.target_src.code,
          rate_code: data.rate_code_dict.code,
          company_base: '',
          team_name: ''
        }
        if (data.take_up_status) {
          this.$message.warning('当前时间段，此房间已被占用请重新排房')
          this.tableData[0].room_no = ''
          this.$set(this.tableData[0], 'room_no', '')
        }
        this.selectMarktCodeToSrcCode(this.formInline.code_market)
        this.getsaerchData(0)
      })
    },
    // 市场码确认选中来源码
    selectMarktCodeToSrcCode(val) {
      const arr = this.marketList.filter(p => {
        return p.code === val
      })
      if (arr.length > 0) {
        this.srcList = arr[0].src
      }
    },
    // 排房
    setRoomSort({ room_type, room_count }, index) {
      this.selectIndex = index
      this.$refs.RoomSort.show()
      this.parmData = {
        start_time: this.formInline.arr_time,
        end_time: this.formInline.leave_time,
        room_no: this.bookingData.room_no,
        room_type,
        room_count
      }
    },
    // 确认排房
    selectRoom(val) {
      console.log(val, '选中的房间')
      this.$set(this.tableData[this.selectIndex], 'room_number', val.join(','))
    },
    // 保存预定
    submint() {
      console.log(this.tableData[0].room_number, '预定信息')
      this.$refs.formInline.validate(valid => {
        if (valid) {
          const data = {
            main_room: this.tableData[0].room_number && this.tableData[0].room_number !== undefined ? this.tableData[0].room_number.split(',')[0] : '',
            ...this.formInline,
            reserve_type: this.tableData
          }
          console.log(data, '保存参数')
          bookingApi(data).then(res => {
            console.log(res, 2323)
            this.dialogFormVisible = false
            this.$emit('rush', res.data)
          })
        }
      })
    },
    newBooking() {
      if (this.formInline.code_market === 'TD') {
        this.formInline.from_type = 0
      } else if (this.formInline.code_market === 'XYGS') {
        this.formInline.from_type = 2
      } else {
        this.formInline.from_type = null
      }
      console.log(this.formInline, '新的预定参数')
      this.$refs.formInline.validate(valid => {
        if (valid) {
          newBookingApi(this.formInline).then(res => {
            this.testData.data = {
              master_id: res.data.id
            }
            this.$refs.BookingDetil.show()
            this.dialogFormVisible = false
            this.$emit('rush')
          })
        }
      })
    },
    // 计算折扣价
    curryPrice(key) {
      const currPrice = this.tableData[key]
      let newPrice
      if (currPrice.discount_type === 0) {
        newPrice = currPrice.price * currPrice.discount
      } else {
        newPrice = currPrice.price - currPrice.discount
      }
      this.$set(this.tableData[key], 'rate_code_price', newPrice)
    },
    // 限制折扣
    chageDiscount(val, index) {
      if (val.discount_type === 0) {
        if (/^(0.\d+|0|1)$/.test(val.discount)) {
          val.discount = Number(val.discount)
        } else {
          val.discount = 1
        }
      } else {
        if (Number(val.discount) <= Number(val.rate_code_price) && Number(val.discount) >= 0.01) {
          val.discount = Number(val.discount)
          this.flag = true
        } else {
          this.flag = false
        }
      }
      this.curryPrice(index)
    },
    // 修改房价码更新 已定房型房价
    changeSelectRoomTypePric() {
      if (this.formInline.rsv_type === 1) {
        const rateCode = this.roomPriceCodeList.filter(p => {
          return p.code === this.formInline.rate_code
        })
        console.log(rateCode[0].check_out_time, '过滤房价')
        const begintime = parseTime(this.formInline.arr_time, '{y}-{m}-{d} {h}:{i}:{s}')
        const time = new Date(Date.parse(parseTime(begintime))).getTime() + rateCode[0].hours * 60 * 60 * 1000
        const leaveTime = parseTime(time, '{h}:{i}:{s}')
        console.log(leaveTime, '时间')
        if (leaveTime > rateCode[0].check_out_time) {
          this.formInline.leave_time = parseTime(time, '{y}-{m}-{d}') + ' ' + rateCode[0].check_out_time
        } else {
          this.formInline.leave_time = parseTime(time, '{y}-{m}-{d} {h}:{i}:{s}')
        }
      } else {
        this.reduceTime()
      }
      this.tableData.map((p, index) => {
        this.getsaerchData(index)
      })
    },
    // 获取房价
    getsaerchData(key) {
      const data = {
        begin_date: parseTime(this.formInline.arr_time, '{y}-{m}-{d}'),
        code_type: 0,
        end_date: parseTime(this.formInline.leave_time, '{y}-{m}-{d}'),
        rate_code: this.formInline.rate_code,
        room_type_list: []
      }
      saerchData(data).then(res => {
        console.log(res, '房价')
        const { data } = res
        const price = data.price.filter(p => {
          return p.room_type === this.tableData[key].room_type
        })
        console.log(price, 555)
        if (price.length > 0) {
          this.$set(this.tableData[key], 'price', price[0].price_list[0].room_price)
          this.chageDiscount(this.tableData[key], key)
        }
      })
    },
    show() {
      this.dialogFormVisible = true
      if (!this.houseTrans) {
        this.getroomTypeList()
      } else {
        this.roomTypeList = [{}]//
      }
      this.$nextTick(() => {
        // 清除表单验证
        this.$refs.formInline.clearValidate()
        this.getReserveInfo()
        console.log(this.bookingData, '获取房型')
        this.tableData = [{
          room_type: this.bookingData.room_type_name,
          room_number: this.bookingData.room_no,
          room_count: 1,
          discount_type: 0,
          discount: 1
        }]
      })
    },
    getAgreement(key) {
      if (key !== '') {
        getAgreementListApi({ name__icontains: key }).then(res => {
          const { data } = res
          this.agreeList = data.results
        })
      }
    },
    getVipListMeoth(key) {
      getVipListApi({ name__icontains: key }).then(res => {
        const { data } = res
        this.vipList = data.results
      })
    },
    reduceTime() {
      const begintime = parseTime(this.formInline.arr_time, '{y}-{m}-{d} {h}:{i}:{s}')
      const time = new Date(Date.parse(parseTime(begintime))).getTime() + this.formInline.days * 24 * 60 * 60 * 1000
      this.formInline.leave_time = parseTime(time, '{y}-{m}-{d}') + ' 14:00:00'
    },
    selectDay() {
      const begintime = new Date(Date.parse(parseTime(this.formInline.arr_time, '{y}-{m}-{d}'))).getTime()
      const endtime = new Date(Date.parse(parseTime(this.formInline.leave_time, '{y}-{m}-{d}'))).getTime()
      const nTime = endtime - begintime
      const day = Math.ceil(nTime / 86400000)
      this.formInline.days = day
      this.getRoomStatus(this.formInline.arr_time, this.formInline.leave_time)
    },
    // 删除同住人
    deleteWith(index) {
      this.tableData.splice(index, 1)
    },
    // 新建入住单获取房型列表
    getroomTypeList() {
      roomTypeListApi().then(res => {
        const { data } = res
        this.roomTypeList = data.results
        this.$set(this.tableData[0], 'room_type', this.roomTypeList[0].code)
      })
    },
    // 房价码列表
    getRatCodeList() {
      this.formInline.rate_code = ''
      const obj = {}
      if (this.formInline.rsv_type === 1) {
        this.formInline.days = 0
        obj.is_day_user = 0
      } else if (this.formInline.rsv_type === 0) {
        obj.is_day_user = 1
        this.selectDay()
      } else {
        obj.is_free = 1
      }
      const params = {
        code_market: this.formInline.code_market,
        code_src: this.formInline.code_src,
        rsv_type: this.formInline.rsv_type,
        ...obj
      }
      rataCodeListData(params).then(res => {
        const { data } = res
        this.roomPriceCodeList = data.results
        console.log(this.roomPriceCodeList, '房价码')
      })
    },
    addWith() {
      const data = {
        room_type: '',
        rate_code_price: '',
        rate_code: '',
        room_count: '',
        discount_type: 0,
        discount: 1
      }
      this.tableData.push(data)
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
</style>
