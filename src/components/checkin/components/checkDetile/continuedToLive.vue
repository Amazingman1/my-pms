<template>
  <el-dialog title="续住" :visible.sync="addVisible" width="40%" :append-to-body="true">
    <el-form :model="form" label-width="90px" style="margin-top:10px" size="mini">
      <el-form-item label="原入离日期:">
        <span>{{ format(propsData.arr_time, '{y}-{m}-{d}') }}</span>
        <span>-</span>
        <span>{{ format(propsData.leave_time, '{y}-{m}-{d}') }}</span>
      </el-form-item>
      <el-form-item label="现离店日期:">
        <el-date-picker
          v-model="form.leave_time"
          type="datetime"
          placeholder="选择日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :clearable="false"
          :picker-options="pickerOptions"
          style="width:100%"
          @blur="changeTimeBB(btn)"
          @change="changeTime"
          @focus="changeTimeBB(btn)"
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" />
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      height="340"
    >
      <el-table-column prop="price_date" label="日期" />
      <el-table-column label="星期">
        <template slot-scope="scope">
          {{ format(scope.row.price_date, '{a}' ) }}
        </template>
      </el-table-column>
      <el-table-column prop="room_price" label="最新价格">
        <template slot-scope="scope">
          <div style="display: flex;">
            <div @click="allChangePeice(scope.$index)">
              <el-link :underline="false">
                <i v-if="tableData.length > 1" class="el-icon-bottom" size="mini" type="text" />
              </el-link>
            </div>
            <div>
              <el-input
                v-model="scope.row.room_price"
                placeholder="最新价格"
                size="mini"
              />
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="addVisible = false">取消</el-button>
      <el-button v-show="!btn" type="primary" size="mini" @click="submint">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { parseTime } from '@/utils/index'
import { saerchData } from '@/api/home'
import { continuedToLiveApi } from '@/api/checkin'

export default {
  inject: ['banseInfo'],
  data() {
    return {
      form: {
        leave_time: '',
        remark: ''
      },
      tableData: [],
      addVisible: false,
      btn: false,
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() < new Date(this.propsData.leave_time).getTime()
        }
      }
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },

  methods: {
    show() {
      this.addVisible = true
      this.form.leave_time = parseTime(Date.parse(new Date(this.format(this.propsData.leave_time, '{y}-{m}-{d}'))) + 24 * 60 * 60 * 1000, '{y}-{m}-{d}') + ' 14:00:00'
      this.form.remark = this.propsData.remark
      this.changeTime()
    },
    changeTimeBB(val) {
      this.btn = !val
    },
    allChangePeice(index) {
      // 更新视图
      this.tableData.map(v => {
        this.$set(v, 'room_price', this.tableData[index].room_price)
      })
    },
    // 格式化时间
    format(time, config) {
      return parseTime(time, config)
    },
    cearTable() {
      this.tableData = []
    },
    changeTime(val) {
      this.form.old_leave_time = this.propsData.leave_time
      const params = {
        rate_code: this.propsData.rate_code,
        begin_date: this.format(this.form.old_leave_time, '{y}-{m}-{d}'),
        end_date: this.format(this.form.leave_time, '{y}-{m}-{d}'),
        room_type_list: []
      }
      saerchData(params).then(res => {
        console.log('最新房价', res)
        const { data } = res
        const list = data.price
        const newPric = list.filter(p => {
          return p.room_type === this.propsData.room_type
        })
        this.form.master_rt_rate = newPric[0].price_list
        this.tableData = newPric[0].price_list
      })
    },
    // 确认续住
    submint() {
      continuedToLiveApi(this.form, this.propsData.id).then(res => {
        this.$message.success('续住成功！')
        this.form = {}
        this.addVisible = false
        this.$emit('rush')
        this.form = {
          leave_time: '',
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
