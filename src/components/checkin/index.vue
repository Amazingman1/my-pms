<template>
  <el-dialog :title="bookingToCheckin ? '预定转入住': '新增入住'" :visible.sync="dialogFormVisible" width="65%" :append-to-body="true">
    <div style="padding-top:10px">
      <el-form ref="form" :model="formInline" label-width="110px" size="mini" :rules="rules">
        <el-row v-if="bookingToCheckin" :gutter="20">
          <el-col :span="8">
            <el-form-item label="预定人：">
              {{ formInline.reserver_name || '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号：">
              {{ formInline.reserver_tel || '-' }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="市场码：" prop="code_market">
              <el-select
                v-model="formInline.code_market"
                placeholder="请选择市场码"
                style="width:100%"
                @focus="marktCode"
                @change="srcCode"
              >
                <el-option v-for="p in marketList" :key="p.id" :label="p.descript" :value="p.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="来源码：" prop="code_src">
              <el-select v-model="formInline.code_src" placeholder="请选择来源码" style="width:100%" @focus="srcCode">
                <el-option v-for="p in srcList" :key="p.id" :label="p.descript" :value="p.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房价类型：" prop="master_type">
              <el-select
                v-model="formInline.master_type"
                :disabled="bookingToCheckin"
                placeholder="房价类型"
                style="width:100%"
                @change="formInline.rate_code = ''"
              >
                <el-option label="全日房" :value="0" />
                <el-option label="钟点房" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item v-if="formInline.code_market === 'TD'|| formInline.code_market === 'XYGS'" label="协议公司">
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
            <el-form-item v-if="formInline.code_market === 'HY'" label="会员">
              <el-input ref="input" v-model="formInline.card_name" @focus="showViplsit" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="入住时间：" prop="arr_time">
              <el-date-picker
                v-if="!bookingToCheckin"
                v-model="formInline.arr_time"
                type="datetime"
                disabled
                placeholder="选择日期时间"
                style="width:100%"
                :picker-options="startTime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
              <span v-else>
                {{ formInline.arr_time }}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="离店时间：" prop="leave_time">
              <el-date-picker
                v-if="!bookingToCheckin"
                v-model="formInline.leave_time"
                type="datetime"
                style="width:100%"
                placeholder="选择日期时间"
                :picker-options="endTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="selectDay"
              />
              <span v-else>
                {{ formInline.leave_time }}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入住天数：" prop="days">
              <el-input-number
                v-if="!bookingToCheckin"
                v-model="formInline.days"
                controls-position="right"
                :min="1"
                @change="reduceTime"
              />
              <span v-else>
                {{ formInline.days }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="房价码：" prop="rate_code">
              <el-select
                v-model="formInline.rate_code"
                :disabled="bookingToCheckin"
                placeholder="请选择房价码"
                style="width:100%"
                @focus="search"
                @change="getPrice('onlePric'),changeLeaveTime()"
              >
                <el-option v-for="p in roomCodeList" :key="p.id" :label="p.description" :value="p.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房价：" prop="newPrice">
              <el-input v-if="!bookingToCheckin" v-model="formInline.newPrice" />
              <span v-else>
                {{ formInline.newPrice }}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房型：" prop="room_type">
              <el-select
                v-model="formInline.room_type"
                :disabled="bookingToCheckin"
                placeholder="请选择房型"
                style="width:100%"
                @change="chageCanliRoom"
                @focus="getroomTypeList"
              >
                <el-option v-for="p in roomTypeList" :key="p.id" :label="p.descript_en" :value="p.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房号：" prop="room_number">
              <el-select v-if="!bookingToCheckin" v-model="formInline.room_number" @focus="getCanRoom">
                <el-option v-for="p in canRoomList" :key="p.id" :label="p.room_no" :value="p.room_no" />
              </el-select>
              <span v-else>
                {{ formInline.room_number }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="备注:">
              <el-input
                v-model="formInline.remark"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                maxlength="100"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="结账提醒:">
              <el-input
                v-model="formInline.remark2"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                maxlength="100"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="height:250px;overflow: auto;padding: 0 10px;">
      <el-form ref="guestInfo" :model="guestInfo" label-width="90px" size="mini">
        <div v-for="(p, index) in guestInfo.guestList" :key="index" class="man-info">
          <el-row :gutter="5">
            <el-col :span="6">
              <el-form-item
                label="姓名："
                :prop="'guestList.'+ index + '.name'"
                :rules="{
                  required: true, message: '姓名不能为空', trigger: 'blur'
                }"
              >
                <el-input v-model="p.name" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="手机：">
                <el-input v-model="p.telephone" maxlength="11" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别：">
                <el-select v-model="p.sex" placeholder="请选择性别">
                  <el-option label="男" value="男" />
                  <el-option label="女" value="女" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="生日：">
                <el-date-picker
                  v-model="p.birth"
                  style="width:100%"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  default-value="1991-01-01"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="民族：">
                <el-select v-model="p.nation" placeholder="请选择民族">
                  <el-option label="汉" value="01" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件类型：">
                <el-select v-model="p.id_code" placeholder="请选择证件类型">
                  <el-option label="身份证" value="01" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件号：">
                <el-input v-model="p.id_no" maxlength="18" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item
                label="人脸照"
              >
                <el-image
                  style="width: 60px; height: 60px"
                  :src="p.pic_now"
                  fit="fit"
                >
                  <div slot="error">
                    <img src="@/assets/image/face.png" width="100%">
                  </div>
                </el-image>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label-width="10px">
                <div style="display:flex">
                  <el-button type="primary" @click="takePhotoFn(index)">拍照</el-button>
                  <el-button type="primary" @click="readIdFn(index)">读身份证</el-button>
                  <el-button v-show="guestInfo.guestList.length > 1" type="danger" @click="deleteWith(index)">删除</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <el-button type="text" class="el-icon-plus" @click="addWith">添加同住人</el-button>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" plain @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" size="mini" @click="getPrice('showPrice')">确认入住</el-button>
    </div>
    <el-dialog
      title="确认房价"
      :visible.sync="dialogRoomPrice"
      width="30%"
      :append-to-body="true"
    >
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="price_date" label="入住日期" />
        <el-table-column label="星期">
          <template slot-scope="scope">
            {{ format(scope.row.price_date, '{a}' ) }}
          </template>
        </el-table-column>
        <el-table-column prop="room_price" label="价格">
          <template slot-scope="scope">
            <div style="display: flex;">
              <div
                v-show="tableData.length>1"
                class="doune"
                @click="allChangePeice(scope.$index, scope.row)"
              >
                <el-link :underline="false">
                  <i class="el-icon-bottom" size="mini" type="text" />
                </el-link>
              </div>
              <el-input
                v-model="scope.row.room_price"
                size="mini"
                style="width: 100%"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogRoomPrice = false">取 消</el-button>
        <el-button v-show="tableData.length>0" size="mini" type="primary" @click="bookingToCheckin? reserveTransferFn() : checkinSave()">确认入住</el-button>
      </span>
    </el-dialog>
    <RoomCode ref="RoomCode" />
    <TakePhoto ref="TakePhoto" @getPhotoBasce64="getPhoto" />
    <ReadIdCard ref="ReadIdCard" @IdInfo="getIdInfo" />
    <VipCompany ref="vipCompany" :list-type="'vip'" @selectRow="selectVip" />
    <CheckinDetil ref="CheckinDetil" />
  </el-dialog>
</template>

<script>
import { getCheckinINfoApi, getCanLiveRoom, checkinApi, roomTypeListApi, getAgreementListApi, submintRoomPriceApi } from '@/api/checkin'
import { parseTime } from '@/utils/index'
import { rataCodeListData, getMarktCode, getSrcCode } from '@/api/home'
import { reserveTransferApi, bookingTransferApi } from '@/api/book'
import RoomCode from './components/indexDetil/roomCode'
import g_localStorage from '@/utils/saveLogal'
import TakePhoto from '@/components/takePhoto'
import ReadIdCard from '@/components/ReadIdCard'
import VipCompany from '@/components/companyAndVipTable'
import { mapGetters } from 'vuex'
import CheckinDetil from '@/components/checkin/checkinDetil'

export default {
  inject: ['componentData'],
  components: { RoomCode, TakePhoto, ReadIdCard, VipCompany, CheckinDetil },
  provide() {
    return {
      componentData: this.testData
    }
  },
  data() {
    return {
      bookingToCheckin: false,
      dialogFormVisible: false,
      dialogRoomPrice: false,
      testData: {},
      formInline: {},
      must_photo: true,
      guestInfo: {
        guestList: [
          { name: '' }
        ]
      },
      tableData: [],
      marketList: [], // 市场码
      srcList: [], // 来源码
      roomCodeList: [], // 房价码
      roomTypeList: [], // 房型
      canRoomList: [],
      newPrice: '',
      reserve_rt_rate_id: '',
      isIndex: '',
      agreeList: [],
      seschForm: {
        total: 0,
        page: 1,
        page_size: 10
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
              time.getTime() < new Date(this.formInline.arr_time).getTime() - 24 * 60 * 60 * 1000 // 当天也可做预定
            )
          } else {
            return time.getTime() >= Date.now()
          }
        }
      },
      rules: {
        code_market: [
          { required: true, message: '市场码不能为空', trigger: 'change' }
        ],
        code_src: [
          { required: true, message: '来源码为空', trigger: 'change' }
        ],
        rate_code: [
          { required: !this.bookingToCheckin, message: '房价码不能为空', trigger: ['change', 'blur'] }
        ]

      }
    }
  },
  computed: {
    ...mapGetters([
      'userObj'
    ])
  },
  methods: {
    // 格式化时间
    format(time, config) {
      return parseTime(time, config)
    },
    // 确认入住修改所有房价
    allChangePeice(inx, { price_date, room_price }) {
      this.tableData.map(v => {
        if (v.price_date > price_date) {
          this.$set(v, 'room_price', room_price)
        }
      })
    },
    // 会员
    showViplsit() {
      this.$refs.input.blur()
      this.$refs.vipCompany.show()
    },
    // 选择vip
    selectVip(val) {
      if (val) {
        this.$set(this.formInline, 'card_base', val.id)
        this.$set(this.formInline, 'card_name', val.card_name)
      }
    },
    // 读取身份证
    readIdFn(index) {
      this.isIndex = index
      this.$refs.ReadIdCard.ReadIdCard()
    },
    getIdInfo(val) {
      console.log(val, '获取的身份证信息')
      this.$set(this.guestInfo.guestList[this.isIndex], 'name', val.name)
      this.$set(this.guestInfo.guestList[this.isIndex], 'sex', val.sex)
      this.$set(this.guestInfo.guestList[this.isIndex], 'birth', val.birthday)
      this.$set(this.guestInfo.guestList[this.isIndex], 'nation', val.nation)
      this.$set(this.guestInfo.guestList[this.isIndex], 'id_no', val.idcardno)
      this.$set(this.guestInfo.guestList[this.isIndex], 'id_code', '01')
    },
    // 协议公司
    getAgreement(key) {
      if (key !== '') {
        getAgreementListApi({ name__icontains: key }).then(res => {
          const { data } = res
          this.agreeList = data.results
        })
      }
    },
    // 打开拍照
    takePhotoFn(index) {
      this.$refs.TakePhoto.show()
      this.isIndex = index
    },
    // 钟点房更改时间
    changeLeaveTime() {
      console.log('过滤房价')
      if (this.formInline.master_type === 1) {
        const rateCode = this.roomCodeList.filter(p => {
          return p.code === this.formInline.rate_code
        })
        console.log(rateCode, '过滤房价')
        const begintime = parseTime(this.formInline.arr_time, '{y}-{m}-{d} {h}:{i}:{s}')
        const time = new Date(Date.parse(parseTime(begintime))).getTime() + rateCode[0].hours * 60 * 60 * 1000
        const leaveTime = parseTime(time, '{h}:{i}:{s}')
        if (leaveTime > rateCode[0].check_out_time) {
          this.formInline.leave_time = parseTime(time, '{y}-{m}-{d}') + ' ' + rateCode[0].check_out_time
        } else {
          this.formInline.leave_time = parseTime(time, '{y}-{m}-{d} {h}:{i}:{s}')
        }
        console.log(this.formInline.leave_time, '钟点房离店时间')
      } else {
        this.reduceTime()
      }
    },
    // 获取照片地址
    getPhoto(ph) {
      this.$set(this.guestInfo.guestList[this.isIndex], 'pic_now', ph)
      console.log(ph, '获取拍照的图片地址')
    },
    // 预定转入住寄出信息
    getBookingTransfer(val) {
      console.log(this.componentData, 12121212)
      const data = {
        room_number: this.componentData.data.room_no ? this.componentData.data.room_no : this.componentData.data.reserve_base.room_number,
        rt_rate_id: this.componentData.data.reserve_base.rt_rate_id
      }
      bookingTransferApi(data).then(res => {
        console.log(res, '预定转入住信息')
        const { data } = res
        this.reserve_rt_rate_id = data.reserve_rt_rate_id
        this.formInline = {
          arr_time: data.arr_time,
          leave_time: data.leave_time,
          days: data.days,
          room_type: data.room_type_dict.code,
          rate_code: data.rate_code_dict.code,
          code_src: data.src_dict.code,
          code_market: data.market_dict.code,
          room_number: data.room_number,
          is_secret: data.is_secret,
          master_type: data.master_type,
          master_rt_rate: data.price_list,
          reserver_name: data.reserver_name,
          newPrice: '',
          reserver_tel: data.reserver_tel,
          company_base: data.company_base_dict.id,
          remark: data.remark
        }
        console.log(data.master_guest_data_list, 6666)
        if (data.master_guest_data_list.length > 0) {
          this.guestInfo.guestList = data.master_guest_data_list
        }
        this.marketList = [{ code: data.market_dict.code, descript: data.market_dict.desc }]
        this.srcList = [{ code: data.src_dict.code, descript: data.src_dict.desc }]
        this.roomCodeList = [{ code: data.rate_code_dict.code, description: data.rate_code_dict.desc }]
        this.roomTypeList = [{ code: data.room_type_dict.code, descript_en: data.room_type_dict.desc }]
        this.agreeList = [{ id: data.company_base_dict.id, name: data.company_base_dict.name }]
        this.search()
        this.getPrice('onlePric')
      })
    },
    showRoomCode() {
      this.$refs.RoomCode.show()
    },
    show() {
      // 移除校验
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
        this.$refs.guestInfo.clearValidate()
      })
      this.guestInfo.guestList = [
        { name: '' }
      ]
      if (this.componentData.data.reserve_base.rt_rate_id) {
        this.bookingToCheckin = true
        this.getBookingTransfer()
      } else {
        this.bookingToCheckin = false
        this.getInfo()
      }
    },
    // 新建入住单获取房型列表
    getroomTypeList() {
      roomTypeListApi().then(res => {
        const { data } = res
        this.roomTypeList = data.results
      })
    },
    // 市场码
    marktCode() {
      getMarktCode().then(res => {
        const { data } = res
        this.marketList = data.results
      })
    },
    // 来源码
    srcCode() {
      this.formInline.code_src = ''
      getSrcCode({ code_category: this.formInline.code_market }).then(res => {
        const { data } = res
        this.srcList = data.results
      })
    },
    // 获取默认信息
    getInfo() {
      getCheckinINfoApi({ room_number: this.componentData.data.room_no }).then(res => {
        const { data } = res
        this.formInline = {
          arr_time: data.arr_time,
          leave_time: data.leave_time,
          days: data.days,
          room_type: data.room_type_dict.code,
          rate_code: data.rate_code_dict.code,
          code_src: data.src_dict.code,
          code_market: data.market_dict.code,
          room_number: data.room_number,
          is_secret: data.is_secret,
          master_type: data.master_type,
          master_rt_rate: data.price_list,
          newPrice: ''
        }
        this.marketList = [{ code: data.market_dict.code, descript: data.market_dict.desc }]
        this.srcList = [{ code: data.src_dict.code, descript: data.src_dict.desc }]
        this.roomCodeList = [{ code: data.rate_code_dict.code, description: data.rate_code_dict.desc }]
        this.roomTypeList = [{ code: data.room_type_dict.code, descript_en: data.room_type_dict.desc }]
        this.search()
        this.getPrice('onlePric')
      })
    },
    // 获取最新房价
    getPrice(val) {
      console.log(val, 8989)
      if (val && val === 'showPrice') {
        this.dialogRoomPrice = true
      }
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
    // 确认入住
    checkinSave() {
      let gestvalid
      this.$refs.guestInfo.validate(valid => {
        console.log(valid)
        gestvalid = valid
      })
      this.$refs.form.validate(valid => {
        if (valid && gestvalid) {
          this.formInline.room_number_list = [this.formInline.room_number]
          this.guestInfo.guestList.forEach(p => {
            p.room_number = this.formInline.room_number
          })
          const params = {
            room_number_dict: {
              master: [this.formInline.room_number],
              slave: []
            },
            master_base: [this.formInline],
            master_guest: this.guestInfo.guestList,
            master_rt_rate: [
              {
                room_number: this.formInline.room_number,
                price_list: this.tableData
              }
            ]
          }
          checkinApi(params).then(res => {
            this.dialogRoomPrice = false
            this.dialogFormVisible = false
            // 入住成功后的回调
            this.$emit('rush')
            const { data } = res
            this.testData.data = {
              master_base: {
                master_id: data.id,
                account_id: data.account_id
              }
            }
            this.$refs.CheckinDetil.show()
          })
        } else {
          this.dialogRoomPrice = false
        }
      })
    },
    // 预定转入住
    reserveTransferFn() {
      this.$refs.guestInfo.validate(valid => {
        if (valid) {
          const data = {
            master_base: [this.formInline],
            master_guest: this.guestInfo.guestList,
            master_rt_rate: [
              {
                room_number: this.formInline.room_number,
                price_list: this.tableData
              }
            ],
            reserve_rt_rate: this.reserve_rt_rate_id
          }
          reserveTransferApi(data).then(res => {
            console.log(res, '转入住结果s')
            this.dialogRoomPrice = false
            this.dialogFormVisible = false
            // 入住成功后的回调
            const { data } = res
            this.$emit('rush')
            this.testData.data = {
              master_base: {
                master_id: data.id,
                account_id: data.account_id
              }
            }
            this.$refs.CheckinDetil.show()
          })
        } else {
          this.dialogRoomPrice = false
        }
      })
    },
    chageCanliRoom() {
      this.formInline.room_number = ''
      this.getCanRoom()
    },
    // 获取可住房间
    getCanRoom() {
      const params = {
        start_time: parseTime(this.formInline.arr_time, '{y}-{m}-{d}'),
        end_time: parseTime(this.formInline.leave_time, '{y}-{m}-{d}'),
        room_type: this.formInline.room_type,
        can_live_type: 1

      }
      getCanLiveRoom(params).then(res => {
        this.canRoomList = res.data
      })
    },
    // 添加同住人
    addWith() {
      const data = {
        name: ''
      }
      this.guestInfo.guestList.unshift(data)
    },
    // 删除同住人
    deleteWith(index) {
      this.guestInfo.guestList.splice(index, 1)
    },
    search() {
      const params = {
        is_day_user: this.formInline.master_type === 1 ? 0 : 1,
        page: this.seschForm.page,
        page_size: this.seschForm.page_size
      }
      rataCodeListData(params).then(res => {
        const { data } = res
        this.seschForm.total = data.count
        this.roomCodeList = data.results
      })
    },
    // 时间计算 天数于时间计算
    reduceTime() {
      const begintime = parseTime(this.formInline.arr_time, '{y}-{m}-{d} {h}:{i}:{s}')
      const time = new Date(Date.parse(parseTime(begintime))).getTime() + this.formInline.days * 24 * 60 * 60 * 1000
      const rateCode = this.roomCodeList.filter(p => {
        return p.code === this.formInline.rate_code
      })
      this.formInline.leave_time = parseTime(time, '{y}-{m}-{d}') + ' ' + rateCode[0].check_out_time
    },
    countDown(time) {
      let s = 0
      const hour = time.split(':')[0]
      const min = time.split(':')[1]
      const sec = time.split(':')[2]
      s = Number(hour * 3600) + Number(min * 60) + Number(sec)
      return s
    },
    selectDay() {
      // this.getPrice('onlePric')
      const begin = new Date(Date.parse(parseTime(this.formInline.arr_time, '{y}-{m}-{d} {h}:{i}:{s}'))).getTime() // 开始日期时间
      const beginTime = this.countDown(parseTime(this.formInline.arr_time, '{h}:{i}:{s}')) // 开始时间
      const end = new Date(Date.parse(parseTime(this.formInline.leave_time, '{y}-{m}-{d} {h}:{i}:{s}'))).getTime() // 离店日期时间
      const hotleTime = this.countDown(g_localStorage.getItem('dateDelta'))
      const nTime = end - begin
      const day = Math.floor(nTime / 86400000)
      console.log(day, '11188800')

      if (beginTime < hotleTime) {
        this.formInline.days = day + 1
      } else {
        this.formInline.days = day
      }
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
.doune{
  width: 40px;
  text-align: center;
  &:hover{
    cursor: pointer;
  }
}
</style>
