<template>
  <el-dialog title="换房升降" :visible.sync="dialogFormVisible" width="40%" :append-to-body="true">
    <el-form :model="form" label-width="80px" size="mini">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="现住房型">
            <span>{{ propsData.room_type_desc }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="换房型">
            <el-select v-model="form.room_type" placeholder="请选择房型" @change="getNewPrice(),roomNumber()">
              <el-option v-for="p in roomTypeList" :key="p.id" :label="p.descript" :value="p.code" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="现住房间">
            <span>{{ propsData.room_number }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="换房号">
            <el-select v-model="form.new_room_no" placeholder="请选择房间号">
              <el-option v-for="p in roomNumberList" :key="p.room_no" :label="p.descript" :value="p.room_no" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="是否免费">
        <el-radio-group v-model="form.is_free" @change="getNewPrice">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="折扣">
        <el-input
          v-model="form.discount"
          :disabled="form.is_free === 1"
          placeholder="示例:100或者-100"
          @blur="computeData"
          @input="form.discount = form.discount.replace(/[^\-?\d.]/g,'')"
        />
      </el-form-item>
      <el-form-item label="换房理由">
        <el-input v-model="form.change_result" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" />
      </el-form-item>
    </el-form>
    <el-table
      :data="propsData.master_rt_rate"
      stripe
      style="width: 100%"
      height="200"
    >
      <el-table-column
        prop="price_date"
        label="日期"
      />
      <el-table-column
        prop="room_price"
        label="当前价格"
      />
      <el-table-column
        prop="new_price"
        label="最新价格"
      />
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="submintChangeroom">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getRoomType, saerchData } from '@/api/home'
import { getCanLiveRoom, changeRoomApi } from '@/api/checkin'
import { parseTime, filterParams } from '@/utils/index'
export default {
  inject: ['banseInfo'],
  data() {
    return {
      dialogFormVisible: false,
      form: {
        is_free: 0,
        discount: '',
        new_room_no: '',
        room_type: '',
        change_result: '',
        remark: ''
      },
      tableData: [],
      roomTypeList: [],
      roomNumberList: []
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
    show() {
      this.roomType()
      this.dialogFormVisible = true
      this.form = {
        is_free: 0,
        discount: '',
        new_room_no: '',
        room_type: '',
        change_result: '',
        remark: ''
      }
    },
    // 格式化时间
    format(time, config) {
      return parseTime(time, config)
    },
    roomType() {
      getRoomType().then(res => {
        const { data } = res
        this.roomTypeList = data.results
      })
    },
    roomNumber() {
      this.form.new_room_no = ''
      const params = {
        start_time: this.propsData.arr_time,
        end_time: this.propsData.leave_time,
        room_type: this.form.room_type,
        can_live_type: 3
      }
      getCanLiveRoom(params).then(res => {
        const { data } = res
        this.roomNumberList = data
      })
    },
    getNewPrice() {
      this.form.discount = null
      const params = {
        rate_code: this.propsData.rate_code,
        begin_date: this.format(this.propsData.arr_time, '{y}-{m}-{d}'),
        end_date: this.format(this.propsData.leave_time, '{y}-{m}-{d}'),
        room_type_list: []
      }
      saerchData(params).then(res => {
        const { data } = res
        this.form.master_rt_rate = data.price.filter(p => {
          return p.room_type === this.form.room_type
        })
        this.propsData.master_rt_rate.forEach(p => {
          if (this.form.is_free === 1) {
            this.$set(p, 'new_price', p.room_price)
          } else {
            this.$set(p, 'new_price', this.propsData.master_rt_rate[0].room_price)
          }
        })
      })
    },
    computeData() {
      const nowDay = this.format(new Date(), '{y}-{m}-{d}')
      this.propsData.master_rt_rate.forEach(p => {
        if (this.format(p.price_date, '{y}-{m}-{d}').valueOf() >= this.format(nowDay, '{y}-{m}-{d}').valueOf()) {
          if (this.form.is_free === 1) {
            console.log(1)
            this.$set(p, 'new_price', p.room_price)
          } else {
            console.log(2)
            this.$set(p, 'new_price', Number(p.room_price) + Number(this.form.discount))
          }
        }
      })
    },
    // 确认换房
    submintChangeroom() {
      changeRoomApi(filterParams(this.form), this.propsData.id).then(res => {
        this.$message.success('换房成功！')
        this.dialogFormVisible = false
        this.$emit('rush')
        this.form = {
          is_free: 0,
          discount: '',
          new_room_no: '',
          room_type: '',
          change_result: '',
          remark: ''
        }
      })
    }
  }
}
</script>

<style lang='scss' scopde>
  .demo-drawer__footer{
    display: flex;
     button {
      flex: 1;
    }
  }
</style>
© 2020 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
 Octotree
15 days trial remained

VUE-MISB/src/components/checkin/components/checkDetile/changeRoom.vue
Users who have contributed to this file
Powered by Yiting & Majiang
