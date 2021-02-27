<template>
  <div v-loading="hosuLoading" style="padding-bottom: 80px;display:flex">
    <div class="dashboard-left" @click="hidenRoom">
      <div class="canger">
        <SearchBar />
      </div>
    </div>
    <div class="dashboard">
      <HoustMap ref="HoustMap" :new-card-list="newCardList" :form-data="form" @roomNo="getRoomNo" />
    </div>
    <el-dialog width="25%" class="houseTypeClass" title="置维修" :visible.sync="repairDialog" :modal="true">
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="form.start_time"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="rangeDate"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            v-model="form.end_time"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="rangeDate"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="维修原因">
          <el-select v-model="form.room_state_change_reason">
            <el-option
              v-for="item in repairReasonList"
              :key="item.code"
              :label="item.descript"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :rows="5" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="service">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchBar from './components/searchBar'
import HoustMap from './components/housCardcopy'
// import HoustMap from './components/houseCard'
import { changeRoomResonApi, changeRoomStatusApi } from '@/api/housStatus'
import { checkArry, parseTime } from '@/utils/index'
// 房间状态 离店

export default {
  name: 'Dashboard',
  components: { SearchBar, HoustMap },
  data() {
    return {
      rangeDate: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      newCardList: [],
      form: {
        room_no: '',
        room_occupy_after_code: '',
        room_occupy_before_code: '',
        room_occupy_change_reason: '',
        room_state_after_code: '',
        room_state_before_code: '',
        start_time: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'),
        end_time: parseTime(new Date(new Date().setHours(23, 59, 59)), '{y}-{m}-{d} {h}:{i}:{s}'),
        room_state_change_reason: '',
        remark: ''
      },
      repairDialog: false,
      repairReasonList: []
    }
  },
  computed: {
    ...mapGetters([
      'roomSatusMap',
      'hosuLoading'
    ])
  },
  watch: {
    roomSatusMap: function(params) {
      this.newHouseMaoFlow()
    }
  },
  mounted() {
    this.$store.dispatch('housStatus/getRoomSatusMap')
  },
  methods: {
    hidenRoom() {
      this.$refs.HoustMap.canselRoom()
    },
    newHouseMaoFlow() {
      // 获取楼栋字段
      const builList = checkArry(this.roomSatusMap, 'building_name')
      // 楼栋字段去重，剩下实际楼层
      const newArr = [...new Set(builList)]
      const newHouse = []
      // 重新组装楼栋楼层为新的数组
      newArr.map(p => {
        const buildList = []
        this.roomSatusMap.map(v => {
          if (p === v.building_name) {
            buildList.push(v)
          }
        })
        newHouse.push(this.setHouseMaoFlow(buildList))
      })
      this.newCardList = newHouse
      console.log(this.newCardList, '房态休息休息')
    },
    // 分楼层
    setHouseMaoFlow(setList) {
      var newMap = new Map()
      var newArr = []
      setList.map((item, i) => {
        newMap.has(item.floor_number) ? newMap.get(item.floor_number).push(item) : newMap.set(item.floor_number, [item])
      })
      newArr = [...newMap.values()]
      return newArr
    },
    getRoomNo(val) {
      this.form.room_no = val
    },
    // 置维修
    service() {
      this.changeRoomSatatus()
    },
    // 房间置干净or置脏
    changeRoomSatatus(val) {
      console.log(this.form, 'shij')
      changeRoomStatusApi(this.form).then(res => {
        this.repairDialog = false
        this.$store.dispatch('housStatus/getRoomSatusMap')
        this.hidenRoom()
      })
    },
    // 获取维修原因列表
    getReson() {
      changeRoomResonApi({ parent_code: 'room_maint_reason' }).then(res => {
        const { data } = res
        this.repairReasonList = data.results
        this.repairDialog = true
        this.form.room_state_change_reason = ''
        this.form.remark = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0px 10px 0px 0px;
  align-content: flex-start;
  overflow: auto;
}
.dashboard-left{
  width: 200px;
  padding:10px;
  .canger{
    border-right: 1px solid #4488E9;
    height: 100%;
    padding: 10px;
  }
}
</style>
