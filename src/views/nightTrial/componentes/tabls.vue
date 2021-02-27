<template>
  <div>
    <el-table
      v-if="seleced === 0"
      :data="listData"
      stripe
      border
      height="716"
      style="width: 100%"
      @row-click="rowClick"
    >
      <el-table-column prop="room_number" label="房间号" width="100" />
      <el-table-column prop="room_type_desc" label="房型" />
      <el-table-column prop="lock_number" label="锁号" />
      <el-table-column prop="code_src" label="来源码" />
      <el-table-column prop="code_market" label="市场码" />
      <el-table-column prop="arr_time" label="到达时间" />
      <el-table-column prop="leave_time" label="离店时间" />
    </el-table>
    <el-table
      v-if="seleced === 1 || seleced === 2"
      :data="listData"
      stripe
      border
      height="716"
      style="width: 100%"
      @row-click="rowClick"
    >
      <el-table-column prop="master_guest_list" label="姓名" />
      <el-table-column prop="room_number" label="房间号" width="100" />
      <el-table-column prop="room_type_desc" label="房型" />
      <el-table-column prop="order_no" label="单号" />
      <el-table-column prop="master_phone_list" label="电话" />
      <el-table-column prop="arr_time" label="到达时间" />
      <el-table-column prop="leave_time" label="离店时间" />
    </el-table>
    <el-table
      v-if="seleced === 3"
      :data="listData"
      stripe
      border
      height="716"
      style="width: 100%"
      @row-click="rowClick"
    >
      <el-table-column prop="arr_time" label="到达时间" />
      <el-table-column prop="days" label="天数" />
      <el-table-column prop="leave_time" label="离店时间" />
      <el-table-column prop="rate_code" label="房价码" />
      <el-table-column prop="room_type_desc" label="房型" />
      <el-table-column prop="room_count" label="房数" />
      <el-table-column prop="check_in_count" label="已住房数" />
      <el-table-column prop="room_number_list" label="未住房间" />
      <el-table-column prop="price" label="房价" />
    </el-table>
    <el-table
      v-if="seleced === 4"
      :data="listData"
      stripe
      border
      height="716"
      style="width: 100%"
      @row-click="rowClick"
    >
      <el-table-column prop="room_number" label="预定人" width="100" />
      <el-table-column prop="room_type_desc" label="入住人" />
      <el-table-column prop="lock_number" label="房间" />
      <el-table-column prop="code_src" label="房型" />
      <el-table-column prop="code_market" label="单号" />
      <el-table-column prop="code_market" label="电话" />
      <el-table-column prop="arr_time" label="到达时间" />
      <el-table-column prop="leave_time" label="离店时间" />
    </el-table>
    <el-table
      v-if="seleced === 5 || seleced === 6 || seleced === 7 || seleced === 8"
      :data="listData"
      stripe
      border
      height="716"
      style="width: 100%"
      @row-click="rowClick"
    >
      <el-table-column prop="room_number" label="房间号" width="100" />
      <el-table-column prop="room_type_desc" label="姓名" />
      <el-table-column prop="lock_number" label="性别" />
      <el-table-column prop="code_src" label="地址" />
      <el-table-column prop="code_market" label="电话" />
    </el-table>
    <el-table
      v-if="seleced === 9"
      :data="listData"
      stripe
      border
      height="716"
      style="width: 100%"
      @row-click="rowClick"
    >
      <el-table-column prop="room_number" label="姓名" width="100" />
      <el-table-column prop="code_market" label="性别" />
      <el-table-column prop="code_market" label="电话" />
      <el-table-column prop="room_type_desc" label="房间" />
      <el-table-column prop="code_src" label="身份证" />
      <el-table-column prop="lock_number" label="房型" />
      <el-table-column prop="arr_time" label="到达时间" />
      <el-table-column prop="leave_time" label="离店时间" />
    </el-table>
    <el-table
      v-if="seleced === 10"
      :data="listData"
      stripe
      border
      height="716"
      style="width: 100%"
      @row-click="rowClick"
    >
      <el-table-column prop="room_number" label="姓名" width="100" />
      <el-table-column prop="arr_time" label="到达时间" />
      <el-table-column prop="leave_time" label="离店时间" />
    </el-table>
    <el-table
      v-if="seleced === 11"
      :data="listData"
      stripe
      border
      height="716"
      style="width: 100%"
      @row-click="rowClick"
    >
      <el-table-column prop="room_number" label="预定人" width="100" />
      <el-table-column prop="room_number" label="姓名" width="100" />
      <el-table-column prop="room_type_desc" label="房间" />
      <el-table-column prop="lock_number" label="房型" />
      <el-table-column prop="code_src" label="单号" />
      <el-table-column prop="code_market" label="电话" />
      <el-table-column prop="arr_time" label="到达时间" />
      <el-table-column prop="leave_time" label="离店时间" />
    </el-table>
    <el-table
      v-if="seleced === 12"
      :data="listData"
      stripe
      border
      height="716"
      style="width: 100%"
      @row-click="rowClick"
    >
      <el-table-column prop="room_number" label="房间号" width="100" />
      <el-table-column prop="room_type_desc" label="维修/锁房原因" />
      <el-table-column prop="lock_number" label="备注" />
      <el-table-column prop="arr_time" label="开始时间" />
      <el-table-column prop="leave_time" label="结束时间" />
    </el-table>
    <el-table
      v-if="seleced === 13"
      :data="listData"
      stripe
      border
      height="716"
      style="width: 100%"
      @row-click="rowClick"
    >
      <el-table-column prop="room_number" label="预授权卡号" width="100" />
      <el-table-column prop="room_type_desc" label="预授权额度" />
      <el-table-column prop="lock_number" label="卡到期时间" />
      <el-table-column prop="code_src" label="操作人" />
    </el-table>
    <el-table
      v-if="seleced === 14"
      :data="listData"
      stripe
      border
      height="716"
      style="width: 100%"
      @row-click="rowClick"
    >
      <el-table-column prop="room_number" label="房间号" width="100" />
      <el-table-column prop="room_type_desc" label="房间类型" />
      <el-table-column prop="master_type_desc" label="入住类型" />
      <el-table-column prop="room_price" label="房价" />
      <el-table-column prop="rate_code_desc" label="房价码" />
      <el-table-column prop="code_market_desc" label="市场码" />
      <el-table-column prop="code_src_desc" label="来源码" />
      <el-table-column prop="arr_time" label="到达时间" />
      <el-table-column prop="leave_time" label="离店时间" />
      <el-table-column prop="create_user" label="员工" />
    </el-table>
    <CheckinDetil ref="CheckinDetil" @rush="rushlist" />
    <BookingDetil ref="BookingDetil" @rush="rushlist" />
  </div>
</template>

<script>
import CheckinDetil from '@/components/checkin/checkinDetil'
import BookingDetil from '@/components/checkin/bookingDetil'

export default {
  components: { CheckinDetil, BookingDetil },
  provide() {
    return {
      componentData: this.testData
    }
  },
  props: {
    listData: {
      type: Array,
      default: () => []
    },
    seleced: {
      type: Number,
      default: 0
    },
    tableType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      testData: {}
    }
  },
  methods: {
    rowClick(val) {
      const accunt_id = typeof (val.reserve_base) === typeof ({}) && val.reserve_base !== null ? val.reserve_base.account.id : val.account.id
      const id = typeof (val.reserve_base) === typeof ({}) && val.reserve_base !== null ? val.reserve_base.id : val.id
      if (this.tableType !== 1) {
        const params = {
          id,
          accunt_id
        }
        this.goBookingDetil(params)
      } else {
        this.goCheckDetil(val)
      }
    },
    // 刷新夜审列表
    rushlist() {
      this.$parent.rushList()
    },
    goBookingDetil(val) {
      console.log(val, '预定单详情')
      this.testData.data = {
        master_id: val.id,
        account_id: val.account_id
      }
      this.$refs.BookingDetil.show()
    },
    goCheckDetil(val, ref) {
      console.log(val, '子啊猪啊')
      this.testData.data = {
        master_base: {
          master_id: val.id,
          account_id: val.account.id
        }
      }
      this.$refs['CheckinDetil'].show()
    }
  }
}
</script>

<style>

</style>
