<!--
 * @Author: wangxuan
 * @Date: 2020-12-18 14:42:40
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-22 11:29:53
 * @FilePath: /vue-misb/src/views/pursesteward/newAccounting/components/reundTable.vue
-->
<template>
  <div>
    <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
      <el-form-item label="营业日期">
        <el-date-picker
          v-model="formInline.biz_date"
          type="date"
          placeholder="日期"
          size="mini"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="付款方式">
        <el-select v-model="formInline.incoming_account_reason">
          <el-option label="全部" :value="null" />
          <el-option
            v-for="item in payTypeList"
            :key="item.id"
            :label="item.desc"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="房间号">
        <el-select v-model="formInline.room_num" filterable>
          <el-option label="全部" :value="null" />
          <el-option
            v-for="item in roomList"
            :key="item.id"
            :label="item.room_no"
            :value="item.room_no"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getPayList">查 询</el-button>
        <el-button type="primary" @click="exportList">导出EXCEL</el-button>
      </el-form-item>
    </el-form>
    <div style="padding:10px;background:#f5f7fa;margin-bottom:10px">
      <span>总支付：</span>
      <span class="info_value">¥ {{ formAc.pay_amount||'-' }}</span>
      <span>总退款: </span>
      <span class="info_value">¥ {{ formAc.refund_amount ||'-' }}</span>
      <span>总消费：</span>
      <span class="info_value">¥ {{ formAc.charge_amount || '-' }}</span>
    </div>
    <el-table
      v-loading="loadingTable"
      :data="tableData"
      size="mini"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column label="营业日期">
        <template slot-scope="{row}">
          <span>{{ row.biz_date || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房间号">
        <template slot-scope="{row}">
          <span>{{ row.room_num || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="付款方式">
        <template slot-scope="{row}">
          <span>{{ row.incoming_account_reason_desc || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入账代码">
        <template slot-scope="{row}">
          <span>{{ row.incoming_account_code_desc || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付状态">
        <template slot-scope="{row}">
          <span>{{ row.pay_status_desc || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额">
        <template slot-scope="{row}">
          <span>{{ row.charge_amount || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="可操作金额">
        <template slot-scope="{row}">
          <span>{{ row.can_arrange || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" width="150">
        <template slot-scope="{row}">
          <span>{{ row.modify_datetime || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="人员">
        <template slot-scope="{row}">
          <span>{{ row.modify_user_name || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="说明">
        <template slot-scope="{row}">
          <span>{{ row.desc || '-' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="pageStion.page"
      :limit.sync="pageStion.page_size"
      @pagination="getPayList"
    />
  </div>
</template>

<script>
import { getpirceData, geAllRoomListApi, eportPirceData } from '@/api/newAccunts'
import Pagination from '@/components/Pagination'
import { newPayApi } from '@/api/accounts'
import g_localStorage from '@/utils/saveLogal'

export default {
  components: { Pagination },
  props: {
    tabPosition: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableData: [],
      loadingTable: false,
      roomList: [],
      total: 0,
      formInline: {
        incoming_account_code: null,
        room_num: null,
        biz_date: g_localStorage.getItem('userObj')
      },
      pageStion: {
        page: 1,
        page_size: 15
      },
      payTypeList: [],
      formAc: {}
    }
  },
  mounted() {
    this.getPayList()
    this.geAllRoomList()
    this.newPay()
  },
  methods: {
    // 获取付款列表
    getPayList() {
      this.loadingTable = true
      const params = {
        ...this.pageStion,
        ...this.formInline
      }
      getpirceData(params, this.tabPosition).then(res => {
        const { data } = res
        this.total = data.count
        this.tableData = data.results
        this.formAc = {
          ...res.account_data
        }
        this.loadingTable = false
      })
    },
    // 导出
    exportList() {
      const params = {
        ...this.formInline,
        page_size: this.total
      }
      eportPirceData(params, this.tabPosition).then(res => {
        console.log(res, 'daochu')
        window.location.href = res.data.download
      })
    },
    // 获取付款方式
    newPay() {
      newPayApi({ code_type: 2 }).then(res => {
        const { data } = res
        this.payTypeList = data
      })
    },
    // 获取所有房间号
    geAllRoomList() {
      geAllRoomListApi().then(res => {
        const { data } = res
        this.roomList = data.results
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info_value{
  margin-right: 5px;
  color: #000;
}
</style>
