<template>
  <el-dialog :visible.sync="dialogVisible" append-to-body :show-close="false" width="55%">
    <div class="content">
      <ul id="printDiv" class="dialog-style">
        <p>
          {{ photoTel }}
        </p>
        <div class="message">预订单用房清单</div>
        <li class="title">
          <div>
            <span>预订单号：</span>
            <span>{{ tableObj.order_no }}</span>
          </div>
          <div>
            <!-- <span>{{ tableObj.name }}</span>-->
            <span>{{ format(dateNow, '{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
        </li>
        <table class="table" border="1" cellspacing="0" cellpadding="14">
          <tr>
            <td>姓名</td>
            <td>{{ tableObj.name }}</td>
            <td>性别</td>
            <td>{{ tableObj.sex }}</td>
            <td>电话</td>
            <td>{{ tableObj.telephone }}</td>
          </tr>
          <tr>
            <td>证件类型</td>
            <td>{{ tableObj.id_code }}</td>
            <td>证件号</td>
            <td>{{ tableObj.id_no }}</td>
            <td>地址</td>
            <td>{{ tableObj.address }}</td>
          </tr>
          <tr>
            <td>到达时间</td>
            <td>{{ tableObj.arr_time }}</td>
            <td>离店时间</td>
            <td>{{ tableObj.leave_time }}</td>
            <td>天数</td>
            <td>{{ tableObj.days }}</td>
          </tr>
          <!-- <tr>
            <td>总付款</td>
            <td>{{ tableObj.account.pay_amount }}</td>
            <td>总消费</td>
            <td>{{ tableObj.account.total_consumption }}</td>
            <td>总开票</td>
            <td>{{ tableObj.account.total_invoice }}</td>
          </tr>-->
        </table>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      <el-button
        v-print="'#printDiv'"
        type="primary"
        size="mini"
      >打 印</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'

export default {
  name: 'Index',
  data() {
    return {
      dialogVisible: false,
      tableObj: {},
      title: '',
      dateNow: new Date()
    }
  },
  computed: {
    ...mapGetters([
      'photoTel'
    ])
  },
  methods: {
    getDetails(value) {
      this.dialogVisible = true
      console.log(value)
      this.tableObj = value
    },
    format(time, config) {
      return parseTime(time, config)
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    height: 600px;
    overflow-y: scroll;
  }
  .dialog-style {
    padding: 0;
    width: 100%;
    p {
      text-align: center;
      font-size: 20px;
      font-weight: bolder;
      margin: 18px 0 0 0;
    }
    .message{
      text-align: center;
      font-size: 14px;
    }
    .title{
      display: flex;
      justify-content: space-around;
      height: 40px;
      line-height: 40px;
    }
    .table{
      margin: 0 auto;
    }
  }
</style>
