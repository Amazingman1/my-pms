<!--
 * @Author: wangxuan
 * @Date: 2020-11-30 10:24:12
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-20 12:58:49
 * @FilePath: /vue-misb/src/components/checkin/components/bookingDetile/addNewBookingRoom.vue
-->
<template>
  <el-dialog :title="'新增房型'" :visible.sync="addVisible" width="25%" append-to-body>
    <el-form ref="formName" :model="form" label-width="80px" size="mini" :rules="rules">
      <el-form-item label="抵达时间" prop="arr_time">
        <el-date-picker
          v-model="form.arr_time"
          type="datetime"
          style="width:100%"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="getroomTypeList"
        />
      </el-form-item>
      <el-form-item label="天数" prop="days">
        <el-input-number v-model="form.days" controls-position="right" :min="1" autocomplete="off" @change="getLeveTime" />
      </el-form-item>
      <el-form-item label="离开时间" prop="leave_time">
        <el-date-picker
          v-model="form.leave_time"
          type="datetime"
          style="width:100%"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="getroomTypeList(),getDays()"
        />
      </el-form-item>
      <el-form-item label="市场码">
        <el-select v-model="form.code_market" placeholder="请选择" @change="srcCode" @focus="marktCode" @click="srcCode">
          <el-option v-for="p in marketList" :key="p.id" :label="p.descript" :value="p.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="来源码">
        <el-select v-model="form.code_src" placeholder="请选择">
          <el-option v-for="p in srcList" :key="p.id" :label="p.descript" :value="p.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="房型描述" prop="room_type">
        <el-select v-model="form.room_type" placeholder="请选择" :disabled="editRoom" @change="getNewPrice(form)">
          <el-option v-for="p in roomTypeList" :key="p.room_type" :label="p.room_type_desc" :value="p.room_type" :disabled="p.can_live_num <= 0">
            <span style="float: left">{{ p.room_type_desc }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">可用房数{{ p.can_live_num }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房间数量" prop="room_count">
        <el-input-number v-model.number="form.room_count" controls-position="right" :min="1" autocomplete="off" />
      </el-form-item>
      <el-form-item label="当前房价" prop="rate_code_price">
        <el-input v-model="form.rate_code_price" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" autocomplete="off" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="addVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" :loading="loading" @click=" editRoom ? edit({...propsData,...form}): addSave(form)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { roomTypeLisAccuntApi } from '@/api/checkin'
import { getMarktCode, getSrcCode, saerchData } from '@/api/home'
import { parseTime, selectDay, leveTime } from '@/utils/index'
import { addReserveApi, bookUpdataApi } from '@/api/book'
import { validTels } from '@/utils/validate'

export default {
  inject: ['banseInfo'],

  props: {
    propsData: {
      type: Object,
      default: () => {}
    },
    editRoom: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validEm = (rule, value, callback) => {
      if (value > this.getCanLiveCum()) {
        callback(new Error('房间数不能大于可排房间数!'))
      } else if (value <= 0) {
        callback(new Error('房间数为正整数!'))
      } else {
        callback()
      }
    }
    const validNumber = (rule, value, callback) => {
      if (validTels(value)) {
        callback()
      } else {
        callback(new Error('请输入正整，小数保留两位!'))
      }
    }
    return {
      loading: false,
      srcList: [],
      marketList: [],
      roomTypeList: [],
      addVisible: false,
      form: {
        code_src: '',
        rate_code: '',
        arr_time: '',
        leave_time: '',
        days: ''.days,
        code_market: '',
        rate_code_price: '',
        remark: ''
      },
      rules: {
        arr_time: [
          { required: true, message: '到达时间不可为空', trigger: 'change' }
        ],
        days: [
          { required: true, message: '入住天数不可为空', trigger: 'blur' }
        ],
        leave_time: [
          { required: true, message: '离店时间不可为空', trigger: 'change' }
        ],
        room_type: [
          { required: true, message: '请选择房型', trigger: 'change' }
        ],
        room_count: [
          { required: true, message: '请填写房间数量', trigger: 'blur' },
          { required: false, trigger: 'blur', validator: validEm }
        ],
        rate_code_price: [
          { required: true, trigger: 'blur', validator: validNumber }
        ]
      }
    }
  },
  computed: {
    baseInfo() { return this.banseInfo() }
  },
  methods: {
    show() {
      this.addVisible = true
      this.$nextTick(() => {
        this.marketList = [
          { 'descript': this.propsData.code_market_desc, code: this.propsData.code_market }
        ]
        this.srcList = [
          { 'descript': this.propsData.code_src_desc, code: this.propsData.code_src }
        ]
        this.form = {
          code_src: this.propsData.code_src,
          rate_code: this.propsData.rate_code,
          arr_time: this.propsData.arr_time,
          leave_time: this.propsData.leave_time,
          days: this.propsData.days,
          code_market: this.propsData.code_market,
          rate_code_price: this.propsData.rate_code_price,
          room_type: this.propsData.room_type,
          room_count: this.propsData.room_count || 1,
          remark: this.editRoom ? this.propsData.remark : null
        }
        this.getroomTypeList()
      })
    },
    // 计算离店时间
    getLeveTime() {
      const data = {
        arrTime: this.form.arr_time,
        days: this.form.days
      }
      this.form.leave_time = leveTime(data)
    },
    // 计算天数
    getDays() {
      const data = {
        arrTime: this.form.arr_time,
        leaveTime: this.form.leave_time
      }
      this.form.days = selectDay(data)
    },
    getCanLiveCum() {
      const arr = this.roomTypeList.filter(p => {
        return this.form.room_type === p.room_type
      })
      console.log(this.roomTypeList, '房间数量')
      if (arr.length > 0) {
        return arr[0].can_live_num + this.number
      }
    },
    getNewPrice(row) {
      this.form.room_count = ''
      const params = {
        begin_date: parseTime(row.arr_time, '{y}-{m}-{d}'),
        end_date: parseTime(row.leave_time, '{y}-{m}-{d}'),
        room_type: [row.room_type],
        rate_code: row.rate_code
      }
      saerchData(params).then(res => {
        const { data } = res
        if (data.price.length > 0) {
          console.log(data.price[0].price_list[0].room_price, '2121房价')
          this.form.rate_code_price = data.price[0].price_list[0].room_price
        }
      })
    },
    // 新增保存
    addSave(row) {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          this.loading = true
          const params = {
            rt_rate: row,
            reserve_base: this.baseInfo.id
          }
          addReserveApi(params).then(res => {
            this.loading = false
            this.$message.success('添加成功！')
            this.addVisible = false
            this.$emit('rush')
          })
        } else {
          this.loading = false
        }
      })
    },
    // 确认修改
    edit(row) {
      this.loading = true
      const params = {
        rt_rate: row,
        reserve_base: this.baseInfo.id
      }
      bookUpdataApi(params).then(res => {
        this.$message.success('修改成功！')
        this.$emit('rush')
        this.addVisible = false
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 市场码
    marktCode() {
      getMarktCode().then(res => {
        const { data } = res
        this.marketList = data.results
        this.form.code_src = ''
      })
    },
    // 来源码
    srcCode() {
      getSrcCode({ code_category: this.form.code_market }).then(res => {
        const { data } = res
        this.srcList = data.results
      })
    },
    // 房型列表
    getroomTypeList() {
      roomTypeLisAccuntApi(
        {
          biz_date__gte: parseTime(this.form.arr_time, '{y}-{m}-{d}'),
          biz_date__lt: parseTime(this.form.leave_time, '{y}-{m}-{d}'),
          rate_code: this.propsData.rate_code
        }
      ).then(res => {
        const { data } = res
        console.log(data, '获取房型列表')
        this.roomTypeList = data
      })
    }
  }
}
</script>

<style>

</style>
