<template>
  <div style="padding:10px">
    <el-form v-show="searchSow" :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="formInline.begin_date"
          type="date"
          placeholder="选择日期"
          @change="changeTime"
        />
      </el-form-item>
      <el-form-item label="房价码">
        <el-select v-model="formInline.rate_code" placeholder="请选择房价码" @change="changeRateCode">
          <el-option v-for="(p, index) in codeLidt" :key="index" :label="p.code" :value="p.code" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <table id="customers" v-loading="loading">
      <tr>
        <th>房价/可定</th>
        <!-- <th>房价/已定/可定</th> -->
        <th v-for="(p , index) in tableData" :key="index">
          <span>{{ p.header_date }}</span> <br>
          <span>{{ p.weekday_date }}</span>
        </th>
      </tr>
      <tr v-for="(v, index) in base_title" :key="index" class="tabe">
        <td><span style="margin-left:10px">{{ v.desc }}</span></td>
        <td v-for="(p, inx) in v.price_list" :key="inx">
          <span style="color: #eb3223;margin-left:10px">¥ {{ p.room_price }}</span>
          <!-- <span style="color:  #f98f6f;margin-left:10px">{{ p.occupy }}</span>/<span style="color: #0FB135FF">{{ p.occupy }}</span> -->
          /<span style="color: #0FB135FF;margin-left:10px">{{ p.occupy }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getpirceData, futureHousing } from '@/api/home'
import { parseTime } from '@/utils/index'
import { mapGetters } from 'vuex'

export default {
  props: {
    height: {
      type: String,
      default: '400'
    },
    searchSow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      formInline: {
        rate_code: '',
        begin_date: ''
      },
      loading: false,
      codeLidt: [],
      tableData: [],
      base_title: []
    }
  },
  computed: {
    ...mapGetters([
      'checkinInfo',
      'userObj'
    ])
  },
  mounted() {
    // 新建预定/新建入住 不用初始化列表
    this.getPriceCode()
    this.changeTime()
  },
  methods: {
    // 改变房价码
    changeRateCode() {
      console.log(this.formInline.rate_code, '房价码改变')
      this.$emit('changeRateCode', this.formInline.rate_code)
    },
    // 格式化时间
    format(time, config) {
      return parseTime(time, config)
    },
    //  开始时间确定自动加七天时间
    // 默认情况下为 当天时间
    changeTime() {
      this.formInline.begin_date = this.formInline.begin_date === '' ? this.userObj : this.format(this.formInline.begin_date, '{y}-{m}-{d}')
    },
    getPriceCode() {
      getpirceData().then(res => {
        this.codeLidt = res.data.results
        const arr = this.codeLidt.filter(p => {
          return p.is_default === 1
        })
        if (arr.length) {
          this.formInline.rate_code = arr[0].code
          this.search()
        } else {
          this.$message.warning('当前酒店未配置默认房价码')
        }
      })
    },
    search() {
      this.loading = true
      futureHousing(this.formInline).then(res => {
        const { data } = res
        this.tableData = data.header_dict.weekday_list
        this.base_title = data.all_price_list
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
#customers
  {
  /* font-family:"Trebuchet MS", Arial, Helvetica, sans-serif; */
  width:100%;
  border-collapse:collapse;
  color: #606266;
  }

#customers td, #customers th
  {
  font-size:1em;
  border:1px solid #f5ebeb;
  padding:3px 7px 2px 7px;
  }

#customers th
  {
  font-size:1.1em;
  text-align:left;
  padding-top:5px;
  padding-bottom:4px;
  background-color:#f5f7fa;
  color:#909399;
  padding-left: 10px;
  }
  .tabe{
    &:hover{
      background-color:#f5f7fa;
    }
  }
</style>
