<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item>
        <el-input v-model="formInline.room_number__icontains" placeholder="房间号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getBaseList">查 询</el-button>
        <el-button type="primary" plain @click="cancel">取 消</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      border
      size="mini"
      style="width: 100%"
    >
      <el-table-column
        prop="room_number"
        label="房间号"
      />
      <el-table-column
        prop="master_guest_list"
        label="宾客"
      />
      <el-table-column
        prop="arr_time"
        label="生效时间"
      />
      <el-table-column
        prop="leave_time"
        label="失效时间"
      />
      <el-table-column
        prop="room_card_number"
        label="当前房卡数"
      />
      <el-table-column
        prop="address"
        label="操作"
        width="80"
      >
        <template slot-scope="scope">
          <el-link :underline="false" type="primary" @click="roomMarkCar(scope.row)">制卡</el-link>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="total>0"
      :total="total"
      :page.sync="pageStion.page"
      :limit.sync="pageStion.page_size"
      @pagination="getBaseList"
    />
    <MakeCarCom ref="makeCarCom" :opetion="carData" @rush="getBaseList" />
  </div>
</template>

<script>
import { getMasterList } from '@/api/home'
import Pagination from '@/components/Pagination'
import { filterParams } from '@/utils/index'
import MakeCarCom from '@/components/mackCar'

export default {
  components: { Pagination, MakeCarCom },
  data() {
    return {
      total: 0,
      pageStion: {
        page: 1,
        page_size: 15
      },
      carData: {},
      formInline: {},
      tableData: [],
      loading: false
    }
  },
  mounted() {
    this.getBaseList()
  },
  methods: {
    async getBaseList() {
      this.loading = true
      await getMasterList({ ...this.pageStion, ...filterParams(this.formInline) }).then(res => {
        const { data } = res
        this.total = data.count
        this.tableData = data.results
        this.loading = false
      })
    },
    // 取消搜索
    cancel() {
      this.formInline.room_number__icontains = ''
      this.getBaseList()
    },
    roomMarkCar(val) {
      this.carData = {
        operate_type: 2, // 1, "读卡"), (2, "写卡"), (4, "销卡"),
        start_time: val.arr_time,
        end_time: val.leave_time,
        room_no: val.room_number,
        guest_no: 0,
        reference_type: 1, // 1表示入住单 2表示预定单 3表示非订单
        reference_id: val.id,
        lock_number: val.lock_number
      }
      this.$refs.makeCarCom.makeCar()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-input__inner::placeholder{
  color:#000
}
</style>
