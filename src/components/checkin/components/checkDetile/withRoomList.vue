<!--
 * @Author: wangxuan
 * @Date: 2020-10-16 10:57:47
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-11 16:49:07
 * @FilePath: /vue-misb/src/components/checkin/components/checkDetile/withRoomList.vue
-->
<template>
  <div>
    <div style="padding:10px;background:#f5f7fa;margin-bottom:10px">
      <span>共计付款：</span>
      <span class="info_value">¥ {{ accuntData.pay_amount }}</span>
      <span>共计消费：</span>
      <span class="info_value">¥ {{ accuntData.general_consumption }}</span>
      <span>共计退款：</span>
      <span class="info_value">¥ {{ accuntData.total_refund }}</span>
      <span>共计余额：</span>
      <span class="info_value">¥ {{ accuntData.balance }}</span>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      height="400"
      style="width: 100%"
      border
    >
      <el-table-column prop="room_number" width="90" label="房间号">
        <template slot-scope="{row}">
          <span>{{ row.room_number }}</span>
          <span v-if="row.is_master === 1" class="text-icon icon-color">主</span>
        </template>
      </el-table-column>
      <el-table-column prop="master_status_lable_desc" sortable width="80" label="状态" />
      <el-table-column prop="name_list" label="姓名" />
      <el-table-column prop="room_type_desc" sortable label="房型" />
      <el-table-column prop="arr_time" sortable label="入住时间" />
      <el-table-column prop="leave_time" sortable label="离店时间" />
      <el-table-column label="操作" min-width="100">
        <template v-if="!isTeam(propsData.union_type)" slot-scope="{row}">
          <LeaveOrderHiden :status-code="row.master_status_lable">
            <el-button v-show="list.length> 1 && row.is_master === 0" type="text" size="mini" @click="setMasetr(row)">设置主帐</el-button>
            <el-button v-show="list.length> 1 && row.is_master === 0" type="text" size="mini" @click="cansleWiteRoom(row)">解除联房</el-button>
            <el-button v-show="list.length === 1 && row.is_master === 1" type="text" size="mini" @click="cansleWiteRoom(row)">解除联房</el-button>
            <el-button v-show="list.length> 1 && row.is_master === 1" type="text" size="mini" @click="cansleWiteRoom(row, 'ALL')">解除全部</el-button>
          </Leaveorderhiden>
        </template>
        <!-- <template v-if="isTeam(propsData.union_type)" slot-scope="{row}">
          <el-button type="text" size="mini" @click="outTeam(row)">出团</el-button>
        </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCombineListApi, setMasterApi, deleteMasterApi, outTeamApi } from '@/api/checkin'
import { checkArry } from '@/utils/index'
import LeaveOrderHiden from '@/components/checkin/leaveOrderHiden'

export default {
  inject: ['banseInfo'],
  components: { LeaveOrderHiden },
  data() {
    return {
      loading: false,
      list: [],
      accuntData: {}
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
    // 出团
    outTeam({ id }) {
      const data = {
        master_id: id
      }
      outTeamApi(data).then((res) => {
        console.log(res, '出团')
        this.$message.success('当前订单已出团！')
        this.$emit('rush')
        this.getCombineRoom()
      })
    },
    /**
     * union_type
     * 0 无
     * 1 联房主单
     * 2 联房从单
     * 3 团队主单
     * 4 团队从单
     */
    // 判断是否是团队订单
    isTeam(val) {
      const arr = [3, 4]
      return arr.includes(val)
    },
    // 父组件调用
    faterWithRoomList() {
      this.getCombineRoom(this.propsData.id)
    },
    // 获取联防列表
    getCombineRoom(id) {
      getCombineListApi(id).then(res => {
        console.log(res.data, 999)
        this.list = res.data.room_list
        this.accuntData = res.account_data
      })
    },
    // 解除联房
    cansleWiteRoom(val, type) {
      let combine_out_mb_list
      if (type) {
        combine_out_mb_list = checkArry(this.list, 'id')
      } else {
        combine_out_mb_list = [val.id]
      }
      const data = {
        main_master_base: this.selectMaseterId(),
        combine_out_mb_list
      }
      deleteMasterApi(data).then(res => {
        console.log(res, '解除联房')
        this.getCombineRoom(this.selectMaseterId())
        this.$emit('rush')
      })
    },
    // 查找主单id
    selectMaseterId() {
      const arr = this.list.filter(p => {
        return p.is_master === 1
      })
      if (arr.length > 0) {
        return arr[0].id
      } else {
        this.$message.warning('当前没有主帐单')
        return
      }
    },
    // 设置主帐单
    setMasetr(val) {
      console.log(val)
      const data = {
        present_main_master_base: this.selectMaseterId(),
        new_main_master_base: val.id
      }
      setMasterApi(data).then(res => {
        console.log(res, '设置主账单详情')
        this.getCombineRoom()
        this.$emit('rush')
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
  .text-icon {
    display: inline-block;
    height: 16px;
    width: 16px;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    border-radius: 4px;
    color: #fff;
  }
  .icon-color {
    background: #ffb900;
  }
</style>
