<template>
  <el-dialog title="打印小票" :visible.sync="dialogFormVisible" width="30%" :append-to-body="true">
    <div class="content-body">
      <div id="littleBill" ref="littleBill_ref" class="content">
        <ul class="little_bill" style="padding:0;margin: 0px;">
          <li>{{ printParam.hotel_name }}</li>
          <li>账目明细</li>
          <li><span style="float: left">机器编号:{{ printParam.machine_id }}</span><span>打印:</span> {{ printParam.date }}</li>
          <li>
            <div class="little_bill_header">
              <div><span>姓名</span>{{ printParam.master_guest_name }}</div>
              <div><span>账号</span>{{ printParam.account_id }}</div>
              <div><span>到达日期</span>{{ printParam.arr_time }}</div>
              <div><span>离店日期</span>{{ printParam.leave_time }}</div>
              <div><span>房号</span>{{ printParam.room_num }}</div>
            </div>
          </li>
          <li class="little_bill_title">
            <div>项目</div>
            <div>消费</div>
            <div>付款</div>
          </li>
          <li
            v-for="(item, index) of printParam.account"
            :key="index"
            ref="content"
            class="little_bill_title line"
          >
            <span>{{ item.desc }}</span>
            <span>{{ item.charge_amount }}</span>
            <span>{{ item.pay_amount }}</span>
          </li>
          <li class="little_sign">
            <span>宾客签字</span>
          </li>
          <li class="little_sign_en">
            <span>SIGNATURE</span>
            <div />
          </li>
          <li class="little_end">
            <div class="little_end_content">
              <span>地址:{{ printParam.address1 }}</span>
              <span>电话:{{ printParam.office_tel }}</span>
              <span>TEL:{{ printParam.office_tel }}</span>
            </div>
            <div style="flex:1" />
          </li>
        </ul>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="dialogFormVisible = false">取 消</el-button>
      <el-button v-print="printObj" type="primary" size="mini" @click="handlePrint">打 印</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { printApi } from '@/api/checkin'
export default {
  inject: ['banseInfo'],
  data() {
    return {
      dialogFormVisible: false,
      printParam: {},
      printObj: {
        id: 'littleBill',
        popTitle: '酒店管理',
        // extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      }
    }
  },
  computed: {
    propsData() { return this.banseInfo() }

  },
  methods: {
    // 显示
    show() {
      this.dialogFormVisible = true
      this.getPrint()
    },
    // 获取打印信息
    getPrint() {
      printApi({ master_base_id: this.propsData.id }).then(res => {
        const { data } = res
        this.printParam = data
      })
    },
    handlePrint() {
      document.querySelector('#littleBill').style.margin = '0 auto'
    }
  }
}
</script>

<style lang="scss" scoped>
.content-body{
  min-height: 543px;
  max-height: 600px;
  overflow: auto;
  display: flex;
  justify-content: center
}
.little_bill {
  font-size: 14px;
  li{
    list-style-type:none;
  }
  li:nth-child(1) {
    text-align: center;
    font-size: 40 / 2px;
    font-family: Songti SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
  li:nth-child(2) {
    text-align: center;
    font-size: 40 / 2px;
    font-family: Songti SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
  li:nth-child(3) {
    text-align: right;
    span {
      font-family: Songti SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
    padding-bottom: 4px;
    border-bottom: 2px solid #000000ff;
  }
  .little_bill_header {
    margin-left: 36px;
    line-height: 30px;
    margin-top: 15px;
    span {
      display: inline-block;
      width: 70px;
      margin-right: 10px;
    }
  }
  .line{
    border-bottom: 2px dashed #888181;
  }
  .line:last-child{
    border-bottom: 0px dashed #888181;
  }
  .little_bill_title {
    display: flex;
    div {
      flex: 1;
      text-align: center;
      border: 1px solid;
      height: 35px;
      line-height: 35px;
    }
    span {
      flex: 1;
      text-align: center;
      height: 25px;
      margin-top: 5px;
    }
  }
  .little_sign {
    font: bold;
    font-size: 20px;
    margin-top: 20px;
  }
  .little_sign_en {
    display: flex;
    font: bold;
    font-size: 20px;
    div {
      flex: 1;
      height: 1px;
      background: black;
      margin-top: 15px;
    }
  }
  .little_end {
    margin-top: 20px;
    display: flex;
    .little_end_content {
      font-size: 10px;
      line-height: 20px;
      span {
        display: block;
      }
    }
  }
}
.content{
  width: 360px;
}
</style>
