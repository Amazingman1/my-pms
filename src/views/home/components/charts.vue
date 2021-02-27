<template>
  <div class="chart">
    <div class="chart-title">
      <el-image
        style="width: 100%; height: 220px"
        :src="user().photo"
        fit="scale-down"
        @click="getHotelInfo"
      />
      <div class="text">
        <el-row :gutter="5">
          <el-col v-for="(p,index) in priceData" :key="index" :xs="24" :sm="8">
            <el-card class="box-card">
              <div class="chart-wrapper">
                {{ p.name }}
                <span style="display:block;text-aling:center"><span style="color: red">{{ p.price }}</span> 元</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="chart-box">
      <div class="chart-item" style="padding: 10px;">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="8">
            <div class="items">
              <pie :pie-data="roomStatusList" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="8">
            <div class="items">
              <bar :bar-data="futureRoomList" :title-sting="title" :num-sting="numSting" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="8">
            <div class="items">
              <barAndLIne :bar-data="lineData" :title-sting="'market_decript'" :num-sting="'room_number'" :max-obj="maxObj" />
            </div>
          </el-col>
        </el-row>
        <div />
      </div>
    </div>
    <el-dialog
      title="酒店信息"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="form" size="mini" label-width="90px">
        <el-form-item label="酒店名:">
          {{ user().full_name }}
        </el-form-item>
        <el-form-item label="LOGO:">
          <img :src="avatar" class="user-avatar">
        </el-form-item>
        <el-form-item label="服务电话:">
          {{ user().service_tel }}
        </el-form-item>
        <el-form-item label="地址:">
          {{ user().address_1 }}
        </el-form-item>
        <el-form-item label="邮箱:">
          {{ user().email }}
        </el-form-item>
        <el-form-item label="官网:">
          {{ user().web_site }}

        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pie from './pie'
import Bar from './bar'
import barAndLIne from './barAndLIne'
// import future from '@/components/future'
import { getChartData } from '@/api/home'
import { parseTime } from '@/utils/index'
import resize from './mixins/index'
import g_localStorage from '@/utils/saveLogal'

export default {
  components: {
    Pie,
    Bar,
    barAndLIne
  },
  mixins: [resize],
  data() {
    return {
      radio4: '未来房情',
      roomStatusList: [],
      futureRoomList: [],
      lineData: [],
      priceData: [],
      title: 'biz_date',
      numSting: 'rsv_num',
      dialogVisible: false,
      form: {},
      maxObj: {}
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'photoTel',
      'userObj'
    ])
  },
  mounted() {
    this.getData()
  },
  methods: {
    user() {
      return JSON.parse(g_localStorage.getItem('user'))
    },
    getHotelInfo() {
      this.dialogVisible = true
    },
    format(time, config) {
      return parseTime(time, config)
    },
    getData() {
      getChartData().then(res => {
        const { data } = res
        this.roomStatusList = data.room_status
        this.lineData = data.expected_return.market_return
        this.maxObj = {
          'market_max_room_number': data.expected_return.market_max_room_number,
          'market_max_room_price': data.expected_return.market_max_room_price
        }
        this.roomStatusList.forEach(p => {
          p.value = p.num
          p.name = `${p.name} (${p.value})`
          p.itemStyle = { 'color': p.color }
        })
        this.priceData = data.room_price
        this.futureRoomList = data.future_room_type_occupy_list
        this.futureRoomList.forEach(p => {
          p.biz_date = this.format(p.biz_date, '{m}-{d}')
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chart{
  display: flex;
  .chart-title{
    width: 25%;
    border: 1px solid #ccc;
    padding: 1px;
    // background-color: rgb(236, 219, 219);
    img{
      width: 100%;
      height: 220px;
    }
    .text{
      text-align: center;
      line-height: 30px;
      overflow: auto;
      padding: 0 5px;
      span{
        font-size: 14px;
        color:rgba(34,34,34,1);
      }
    }
  }
  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  .chart-box{
    border: 1px solid #cccc;
    width:100%;
    margin-left:10px;
    padding: 10px;

  }
  .chart-item{
    width: 100%;
    .items{
      width: 100%;
    }
  }
  .chart-wrapper {
    background: #fff;
  }
}

</style>
