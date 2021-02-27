<!--
 * @Author: wangxuan
 * @Date: 2020-11-30 17:04:17
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-22 15:12:55
 * @FilePath: /vue-misb/src/components/checkin/components/bookingDetile/editOrderInfoCopy.vue
-->
<template>
  <el-dialog title="修改预定信息" :visible.sync="dialogFormVisible" width="60%" :append-to-body="true">
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
          <el-form-item label="市场码" prop="code_market">
            <el-select v-model="formInline.code_market" placeholder="市场码" @focus="marktCode" @change="srcCode">
              <el-option v-for="p in marketList" :key="p.id" :label="p.descript" :value="p.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="来源码" prop="code_src">
            <el-select
              v-model="formInline.code_src"
              placeholder="请选择来源码"
              @focus="srcCode"
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
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" plain @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" size="mini" @click="updateBooking">确 认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getVipListApi, getAgreementListApi } from '@/api/checkin'
import { parseTime } from '@/utils/index'
import { updateBookingApi } from '@/api/book'
import { rataCodeListData, getMarktCode, getSrcCode } from '@/api/home'

export default {
  inject: ['banseInfo'],
  data() {
    return {
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
        company_name: '',
        remark: '',
        telephone: '',
        name: ''
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
        company_base: [
          { required: true, message: '协议公司不能为空', trigger: 'change' }
        ],
        team_name: [
          { required: true, message: '团队名不能为空', trigger: ['blur'] }
        ],
        name: [
          { required: true, message: '预定人不能为空', trigger: ['blur'] }
        ],
        code_src: [
          { required: true, message: '来源码不能为空', trigger: ['change'] }
        ],
        code_market: [
          { required: true, message: '市场码不能为空', trigger: ['change'] }
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
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
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
    // 预定单修改
    updateBooking() {
      this.$refs.formInline.validate(valid => {
        if (valid) {
          updateBookingApi({ ...this.formInline }, this.propsData.id).then(res => {
            this.$message.success('修改信息成功!')
            this.dialogFormVisible = false
            this.$emit('rush')
          })
        }
      })
    },
    show() {
      this.dialogFormVisible = true
      console.log(this.propsData, '9102901')
      this.marketList = [
        { 'descript': this.propsData.code_market_desc, code: this.propsData.code_market }
      ]
      this.srcList = [
        { 'descript': this.propsData.code_src_desc, code: this.propsData.code_src }
      ]
      this.roomPriceCodeList = [
        { 'description': this.propsData.rate_code_desc, code: this.propsData.rate_code }
      ]
      this.getAgreement(this.propsData.company_name)
      this.formInline = {
        code_src: this.propsData.code_src,
        rate_code: this.propsData.rate_code,
        arr_time: this.propsData.arr_time,
        leave_time: this.propsData.leave_time,
        days: this.propsData.days,
        rsv_type: this.propsData.rsv_type,
        code_market: this.propsData.code_market,
        company_base: this.propsData.company_base,
        remark: this.propsData.remark,
        telephone: this.propsData.telephone,
        name: this.propsData.name
      }
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
        this.roomPriceCodeList = data.results
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
