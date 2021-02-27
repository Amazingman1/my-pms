<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="卡记录" name="first">
        <el-table
          v-loading="loading"
          :data="gridData"
          stripe
          border
          height="350"
        >
          <el-table-column property="room_no" label="房间号" />
          <el-table-column property="lock_no" label="锁号" />
          <el-table-column property="operate_type" label="操作类型" />
          <el-table-column property="start_time" sortable label="开始时间" />
          <el-table-column property="create_datetime" label="操作时间" />
          <el-table-column property="create_user_name" label="操作员工" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="改价记录" name="second">
        <el-table
          v-loading="loading"
          :data="changePriceData"
          stripe
          border
          height="350"
        >
          <el-table-column width="80" property="room_number" label="房间号" />
          <el-table-column property="price_date" label="营业日期" />
          <el-table-column property="old_price" label="原价格（元）" />
          <el-table-column property="new_price" label="新价格（元）" />
          <el-table-column property="change_reason" label="改价原因">
            <template slot-scope="scope">
              <span> {{ scope.row.change_reason || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column property="create_datetime" width="155px" label="操作时间" />
          <el-table-column property="create_user" label="操作员工" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="换房记录" name="third">
        <el-table
          v-loading="loading"
          :data="changeRoomList"
          stripe
          border
          height="350"
        >
          <el-table-column property="biz_date" label="营业日期" />
          <el-table-column property="old_room" label="原房间" />
          <el-table-column property="old_room_type_desc" label="原房型" />
          <el-table-column property="new_room" label="当前房间" />
          <el-table-column property="new_room_type_desc" label="当前房型" />
          <el-table-column property="is_free" label="是否免费">
            <template slot-scope="scope">
              <span> {{ scope.row.is_free ? "是" : "否" }}</span>
            </template>
          </el-table-column>
          <el-table-column property="create_datetime" width="155px" label="操作时间" />
          <el-table-column property="create_user" label="操作员工" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="续住记录" name="fourth">
        <el-table
          v-loading="loading"
          :data="continuedLiveData"
          stripe
          border
          height="350"
        >
          <el-table-column property="room_number" width="90" label="房间号" />
          <el-table-column property="biz_date" width="100" label="营业日期" />
          <el-table-column property="old_leave_time" width="155" label="旧离店时间" />
          <el-table-column property="leave_time" width="155" label="新离店时间" />
          <el-table-column property="total_day" width="80" label="续住天数" />
          <el-table-column property="create_datetime" width="155" label="操作时间" />
          <el-table-column property="create_user" width="100" label="操作员工" />
          <el-table-column property="change_room" label="备注">
            <template slot-scope="scope">
              <span> {{ scope.row.remark || '-' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="分账记录" name="分账记录">
        <el-table
          v-loading="loading"
          :data="continuedLiveData"
          stripe
          border
          style="width: 100%"
          height="350"
        >
          <el-table-column prop="biz_date" label="营业日期" />
          <el-table-column prop="split_method_desc" label="分账方法" />
          <el-table-column prop="split_info" label="分账金额" />
          <el-table-column prop="modify_datetime" label="操作时间" :show-overflow-tooltip="true" />
          <el-table-column prop="modify_user" label="操作用户" :show-overflow-tooltip="true" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="冲调账记录" name="冲调账记录">
        <el-table
          v-loading="loading"
          :data="continuedLiveData"
          stripe
          border
          style="width: 100%"
          height="350"
        >
          <el-table-column prop="biz_date" label="营业日期" />
          <el-table-column prop="arranged_amount" label="冲调金额" />
          <el-table-column prop="balance_after_arranged" label="调账后金额" />
          <el-table-column prop="arrange_flag_desc" label="操作类型" width="100" />
          <el-table-column prop="modify_datetime" label="操作时间" />
          <el-table-column prop="modify_user" label="操作用户" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="转账记录" name="转账记录">
        <el-table
          v-loading="loading"
          :data="continuedLiveData"
          stripe
          border
          style="width: 100%"
          height="350"
        >
          <el-table-column prop="submit_biz_date" label="营业日期" />
          <el-table-column prop="from_account.room_num" label="转出账户" />
          <el-table-column prop="to_account.room_num" label="转入账户" />
          <el-table-column prop="amount" label="金额" />
          <el-table-column prop="from_account.account_type_desc" label="来源类型" />
          <el-table-column prop="to_account.account_type_desc" label="转入类型" />
          <el-table-column prop="do_flag_desc" label="转账状态" />
          <el-table-column prop="create_datetime" label="操作时间" :show-overflow-tooltip="true" />
          <el-table-column prop="create_user" label="操作用户" :show-overflow-tooltip="true" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <Pagination
      v-show="total> 0"
      :total="total"
      :page.sync="pageStion.page"
      :limit.sync="pageStion.page_size"
      @pagination="getLogList"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getLogListApi, getChangeRoomRecodeApi, getChangePriceRecodeApi, getContinuedLiveRecodeApi } from '@/api/checkin'
import { accuntsrRecord } from '@/api/accounts'

export default {
  inject: ['banseInfo'],

  components: { Pagination },
  data() {
    return {
      changeRoomList: [],
      changePriceData: [],
      continuedLiveData: [],
      gridData: [],
      dialogTableVisible: false,
      total: 0,
      activeName: 'first',
      recordingList: [],
      loading: false,
      pageStion: {
        page: 1,
        page_size: 10
      }
    }
  },
  computed: {
    propsData() { return this.banseInfo() }

  },
  methods: {
    show() {
      this.activeName = 'first'
      this.dialogTableVisible = true
      this.getLogList()
    },
    // 卡操日志
    getLogList() {
      const params = {
        reference_type: 1,
        reference_id: this.propsData.id,
        is_success: true,
        ...this.pageStion
      }
      this.loading = true
      getLogListApi(params).then(res => {
        const { data } = res
        this.gridData = data.results
        this.total = data.count
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 改价记录
    getChangePriceRecode() {
      this.loading = true
      getChangePriceRecodeApi({ master_base: this.propsData.id, ...this.pageStion }).then(res => {
        const { data } = res
        this.changePriceData = data.results
        this.total = data.count
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 换房记录
    getChangeRoomRecode() {
      this.loading = true
      getChangeRoomRecodeApi({ master_base: this.propsData.id, ...this.pageStion }).then(res => {
        const { data } = res
        this.changeRoomList = data.results
        this.total = data.count
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 续住记录
    getContinuedLiveRecode() {
      this.loading = true
      getContinuedLiveRecodeApi({ master_base: this.propsData.id, ...this.pageStion }).then(res => {
        const { data } = res
        this.continuedLiveData = data.results
        this.total = data.count
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 获取账务列表
    getAccuntsrRecord(val) {
      this.loading = true
      const params = {
        account: this.propsData.account.id,
        ...this.pageStion
      }
      accuntsrRecord(val, params,).then(res => {
        console.log(res, '账务记录')
        const { data } = res
        this.continuedLiveData = data.results
        this.total = data.count
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleClick({ name }) {
      this.pageStion = {
        page: 1,
        page_size: 10
      }
      if (name === 'first') {
        this.getLogList()
      } else if (name === 'second') {
        this.getChangePriceRecode()
      } else if (name === 'third') {
        this.getChangeRoomRecode()
      } else if (name === 'fourth') {
        this.getContinuedLiveRecode()
      } else if (name.includes('记录')) {
        this.getAccuntsrRecord(name)
      }
    }
  }
}
</script>

<style>

</style>
