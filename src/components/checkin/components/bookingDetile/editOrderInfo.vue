<!--
 * @Author: wangxuan
 * @Date: 2020-11-30 11:34:00
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-22 15:11:51
 * @FilePath: /vue-misb/src/components/checkin/components/bookingDetile/editOrderInfo.vue
-->
<template>
  <el-dialog title="修改预定信息" :visible.sync="addVisible" width="30%" :append-to-body="true">
    <div class="content">
      <el-form ref="formName" :model="roomInfo" label-width="70px" size="mini" :rules="rules">
        <el-form-item label="预定人">
          <el-input v-model="roomInfo.name" placeholder="预定人" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="roomInfo.telephone" maxlength="11" placeholder="手机号" />
        </el-form-item>
        <el-form-item label="抵达时间" prop="arr_time">
          <el-date-picker
            v-model="roomInfo.arr_time"
            type="datetime"
            style="width:100%"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="天数" prop="days">
          <el-input-number v-model="roomInfo.days" controls-position="right" :min="1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="离开时间" prop="leave_time">
          <el-date-picker
            v-model="roomInfo.leave_time"
            type="datetime"
            style="width:100%"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="市场码" prop="code_market">
          <el-select v-model="roomInfo.code_market" style="width:100%" placeholder="请选择市场码" @focus="marktCode" @change="srcCode">
            <el-option v-for="p in marketList" :key="p.id" :label="p.descript" :value="p.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="来源码" prop="code_src">
          <el-select v-model="roomInfo.code_src" style="width:100%" placeholder="请选择来源码" @focus="srcCode">
            <el-option v-for="p in srcList" :key="p.id" :label="p.descript" :value="p.code" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="roomInfo.code_market === 'TD'" label="协议单位" prop="company_name">
          <el-input ref="input" v-model="roomInfo.company_name" @focus="showViplsit('agre')" />
        </el-form-item>
        <el-form-item
          v-if="roomInfo.code_market === 'TD'"
          label="组团单位"
          prop="team_name"
          :rules="{
            required: formInline.code_market === 'TD', message: '团队名不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="roomInfo.team_name" />
        </el-form-item>
        <el-form-item v-if="roomInfo.code_market === 'HY'" label="会员">
          <el-input ref="input" v-model="roomInfo.card_name" @focus="showViplsit('vip')" />
        </el-form-item>
        <el-form-item label="订单类型" prop="rsv_type">
          <el-select v-model="roomInfo.rsv_type" style="width:100%" placeholder="请选择">
            <el-option label="全日房" :value="0" />
            <el-option label="钟点房" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="roomInfo.remark" type="textarea" maxlength="150" placeholder="备注" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="addVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="updateBooking">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getMarktCode, getSrcCode } from '@/api/home'
import { updateBookingApi } from '@/api/book'

export default {
  inject: ['banseInfo'],
  data() {
    return {
      dialogTableVisible: false,
      addVisible: false,
      roomInfo: {},
      marketList: [],
      srcList: [],
      rules: {
        code_market: [
          { required: true, message: '市场码为必填不可为空', trigger: ['blur', 'change'] }
        ],
        code_src: [
          { required: true, message: '来源码必填不可为空', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
    showViplsit(val) {
      this.$refs.input.blur()
      // this.listType = val
      this.$refs.vipCompany.show()
    },
    show() {
      this.addVisible = true
      this.roomInfo = this.propsData
      this.marketList = [
        { 'descript': this.roomInfo.code_market_desc, code: this.roomInfo.code_market }
      ]
      this.srcList = [
        { 'descript': this.roomInfo.code_src_desc, code: this.roomInfo.code_src }
      ]
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
      this.propsData.code_src = ''
      getSrcCode({ code_category: this.propsData.code_market }).then(res => {
        const { data } = res
        this.srcList = data.results
      })
    },
    // 预定单修改
    updateBooking() {
      console.log(this.propsData, '修改信息')
      const data = {
        arr_time: this.roomInfo.arr_time,
        leave_time: this.roomInfo.leave_time,
        days: this.roomInfo.days,
        code_market: this.roomInfo.code_market,
        code_src: this.roomInfo.code_src,
        rsv_type: this.roomInfo.rsv_type,
        rate_code: this.roomInfo.rate_code,
        remark: this.roomInfo.remark,
        name: this.roomInfo.name,
        sex: this.roomInfo.sex,
        id_code: this.roomInfo.id_code,
        id_no: this.roomInfo.id_no,
        email: this.roomInfo.email,
        from_id: this.roomInfo.from_id === '' ? null : this.roomInfo.from_id,
        telephone: this.roomInfo.telephone
      }
      console.log(data, '修改信息____')

      updateBookingApi(data, this.propsData.id).then(res => {
        this.$message.success('修改信息成功!')
        this.addVisible = false
        this.$emit('rush')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content{
    padding: 10px;
  }
</style>
