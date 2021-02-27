<!--
 * @Author: wangxuan
 * @Date: 2020-09-15 17:08:51
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-11-25 09:47:23
 * @FilePath: /vue-misb/src/components/checkin/components/checkDetile/changeRoomPiec.vue
-->
<template>
  <el-dialog title="修改房价" :visible.sync="dialogFormVisible" width="40%" :append-to-body="true">
    <el-table
      height="300"
      :data="propsData.master_rt_rate"
      style="width:100%"
    >
      <el-table-column
        prop="price_date"
        label="日期"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.price_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="星期">
        <template slot-scope="scope">
          {{ format(scope.row.price_date, '{a}' ) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="room_price"
        label="价格"
      >
        <template slot-scope="scope">
          <div style="display: flex;">
            <div @click="allChangePeice(scope.$index)">
              <el-link :underline="false">
                <i v-if="scope.row.price_date >= nowday() " class="el-icon-bottom" size="mini" type="text" />
              </el-link>
            </div>
            <div>
              <el-input
                v-model="scope.row.room_price"
                size="mini"
                style="width:100%"
                :disabled="changeDate(scope.row.price_date)"
                @blur="changeP"
              />
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-form :model="form" size="mini" label-width="85px" style="margin-top:10px">
      <el-form-item label="改价原因">
        <el-input v-model="form.change_reason" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" :loading="Loading" @click="submint">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { parseTime } from '@/utils/index'
import { changPirceApi } from '@/api/checkin'
import { mapGetters } from 'vuex'

export default {
  inject: ['banseInfo'],
  data() {
    return {
      dialogFormVisible: false,
      form: {
        price_data: []
      },
      Loading: false
    }
  },
  computed: {
    propsData() { return this.banseInfo() },
    ...mapGetters([
      'userObj'
    ])
  },
  methods: {
    show() {
      this.dialogFormVisible = true
    },
    submint() {
      const data = {
        ...this.form
      }
      this.Loading = true
      changPirceApi(data, this.propsData.id).then(res => {
        console.log(res)
        this.dialogFormVisible = false
        this.Loading = false
        this.$emit('rush')
      }).catch(() => {
        this.Loading = false
      })
    },
    // 格式化时间
    format(time, config) {
      return parseTime(time, config)
    },
    changeDate(time) {
      const show = time >= this.nowday()
      return !show
    },
    nowday() {
      return this.userObj
      // return this.format(new Date(), '{y}-{m}-{d}')
    },
    changeP() {
      const arr = []
      this.propsData.master_rt_rate.map(p => {
        arr.push({
          date: p.price_date,
          price: Number(p.room_price)
        })
      })
      this.form.price_data = arr
    },
    allChangePeice(index) {
      // 保存参数
      console.log(this.form.price_data, 990009)
      this.form.price_data.map(p => {
        if (p.date >= this.nowday() && p.date > this.form.price_data[index].date) {
          this.$set(p, 'price', this.form.price_data[index].price)
        }
      })
      // 更新视图
      this.propsData.master_rt_rate.map(v => {
        if (v.price_date >= this.nowday() && v.price_date > this.propsData.master_rt_rate[index].price_date) {
          this.$set(v, 'room_price', this.propsData.master_rt_rate[index].room_price)
        }
      })
    }
  }
}
</script>

<style>

</style>
