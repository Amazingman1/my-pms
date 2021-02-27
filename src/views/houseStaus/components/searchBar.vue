<template>
  <div class="heaed-bar">
    <div style="margin-bottom:10px">
      <el-button type="primary" size="mini" style="width:100%" @click="bulkFun('VD')">批量置净</el-button>
      <el-button type="primary" size="mini" style="width:100%;margin: 10px 0 0 0" @click="bulkFun('VC')">批量置脏</el-button>
    </div>
    <span style="font-size: 16px;margin-bottom:10px;display: block;">筛选查询</span>
    <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.room_no__icontains" placeholder="房间号" @input="search" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.floor_number" placeholder="楼层" @focus="getroomFloorList" @change="filterColor(formInline.floor_number, 'floorNumber')">
          <el-option label="全部楼层" value="" />
          <el-option v-for="p in deleteSameObj(roomFloorList, 'code')" :key="p.id" :label="p.descript_en" :value="p.code" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.room_type_name" placeholder="房型筛选" @focus="getRoomList" @change="filterColor(formInline.room_type_name, 'roomType')">
          <el-option label="全部房型" value="" />
          <el-option v-for="p in roomList" :key="p.id" :label="p.descript_en" :value="p.code" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.building_name" placeholder="房型筛选" @focus="getRooBuildingList" @change="filterColor(formInline.building_name, 'buiding')">
          <el-option label="全部房型" value="" />
          <el-option v-for="p in buildingList" :key="p.id" :label="p.descript" :value="p.descript" />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="house-status">
      <div ref="card" class="item-t" :style="{'background': background, 'color': fontcolor}" @click="filterColor('ALL')">
        <span>全 部</span>
      </div>
      <div v-for="(item, index) in roomSta" :key="index" :style="{'background': item.background, 'color': item.fontcolor}" class="item-t" @click="filterColor(item.code, 'color')">
        <div style="flex:2;display:flex">
          <div class="span" :style="{'background': item.color}" />
          <div>{{ item.desc }}</div>
        </div>
        <div>
          <span>{{ item.count || 0 }}</span>
        </div>
      </div>
      <div class="house-status-icon">
        <div
          v-for="(p,index) in imgType"
          :key="index"
          class="status-icon"
          style="margin-left:0px"
          :style="{'background': p.background, 'color': p.fontcolor}"
          @click="filterColor(p.extra, 'status')"
        >
          <img :src="p.img" alt="" style="width:20px;vertical-align:middle;">
          <span>{{ p.name }}</span>
        </div>
      </div>
    </div>
    <BulkOperation ref="BulkOperation" :search-type="roomType" @rush="$store.dispatch('housStatus/getRoomSatusMap')" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { roomFloorListApi, roomBuildingListApi } from '@/api/housStatus'
import { getRoomType } from '@/api/home'
import BulkOperation from './bulkOperation'

const LEAVE = require('@/assets/image/preLeave2x.png')
const TEAM = require('@/assets/image/team2x.png')
const BOOK = require('@/assets/image/preDestine2x.png')
const QIAN = require('@/assets/image/qianFei2x.png')
const TIME = require('@/assets/image/timeHouse2x.png')
const LIAN = require('@/assets/image/and2x.png')
const ZIYONG = require('@/assets/image/selfUse2x.png')
const ZIZHUJI = require('@/assets/image/selfHelp2x.png')

export default {
  components: { BulkOperation },
  data() {
    return {
      buildingList: [],
      formInline: {
        floor_number: '',
        room_type_name: '',
        room_no__icontains: '',
        building_name: ''
      },
      roomType: '',
      room_no: '',
      imgType: [
        { name: '将离', img: LEAVE, extra: 3, style: true },
        { name: '欠费', img: QIAN, extra: 1 },
        { name: '钟点', img: TIME, extra: 2, style: true },
        { name: '自用', img: ZIYONG, extra: 5 },
        { name: '自助机', img: ZIZHUJI, extra: 6, style: true },
        { name: '联房', img: LIAN, extra: 4, left: true },
        { name: '预定', img: BOOK, extra: 7, style: true },
        { name: '团队', img: TEAM, extra: 0 }
      ],
      roomFloorList: [],
      roomList: [],
      background: '#F0F5FF',
      fontcolor: '#407BEB'
    }
  },
  computed: {
    ...mapGetters([
      'roomSta',
      'roomSatusMap',
      'copyStatusList'
    ])
  },
  methods: {
    // 批量操作
    bulkFun(val) {
      this.roomType = val
      this.$refs.BulkOperation.show()
    },
    // 获取楼栋
    getRooBuildingList() {
      roomBuildingListApi().then(res => {
        const { data } = res
        this.buildingList = data.results
      })
    },
    // 数组对象去重
    deleteSameObj(arr, str) {
      const hash = {}
      const newArr = arr.reduce((item, next) => {
        hash[next[str]] ? '' : hash[next[str]] = true && item.push(next)
        return item
      }, [])
      return newArr
    },
    // 选中搜索条件
    selectItem(val, type) {
      console.log(type, val)
      if (val === 'ALL') {
        this.background = '#F0F5FF'
        this.fontcolor = '#407BEB'
      } else {
        this.background = '#fff'
        this.fontcolor = '#000'
      }
      const arr = type === 'color' ? this.roomSta : this.imgType
      const arrCopy = type === 'color' ? this.imgType : this.roomSta
      const code = type === 'color' ? 'code' : 'extra'
      arrCopy.forEach(v => {
        this.$set(v, 'background', '#fff')
        this.$set(v, 'fontcolor', '#000')
      })
      arr.forEach(p => {
        if (val === p[code]) {
          this.$set(p, 'background', '#F0F5FF')
          this.$set(p, 'fontcolor', '#407BEB')
        } else {
          this.$set(p, 'background', '#fff')
          this.$set(p, 'fontcolor', '#000')
        }
      })
    },
    newFilterColor(val, type) {
      this.selectItem(val, type)
      const params = {
        room_state: val
      }
      this.$store.dispatch('housStatus/getRoomSatusMap', params)
    },
    filterColor(val, type) {
      this.selectItem(val, type)
      this.$store.dispatch('housStatus/searchColor', this.copyStatusList)
      if (val !== 'ALL') {
        if (val !== '') {
          const arr = this.roomSatusMap.filter(p => {
            if (type === 'color') {
              return p.room_state === val
            } else if (type === 'status') {
              return p.room_state_extra[val] === '1'
            } else if (type === 'buiding') {
              return p.room_building === val
            } else if (type === 'roomType') {
              return p.room_type_name === val
            } else if (type === 'floorNumber') {
              return p.floor_number === val
            }
          })
          this.$store.dispatch('housStatus/searchColor', arr)
        } else {
          this.$store.dispatch('housStatus/searchColor', this.copyStatusList)
        }
      } else {
        this.$store.dispatch('housStatus/searchColor', this.copyStatusList)
      }
    },
    search() {
      const params = JSON.parse(JSON.stringify(this.formInline))
      for (const p in params) {
        if (params[p] === '') {
          delete params[p]
        }
      }
      this.$store.dispatch('housStatus/getRoomSatusMap', params)
    },
    // 获取楼层列表
    getroomFloorList() {
      roomFloorListApi().then(res => {
        const { data } = res
        this.roomFloorList = data.results.sort((a, b) => {
          return a.floor_number - b.floor_number
        })
      })
    },
    // 获取房型列表
    getRoomList() {
      getRoomType().then(res => {
        const { data } = res
        this.roomList = data.results
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .heaed-bar{
    .icon-it{
      margin-left: 10px;
    }
    .house-status{
      .item-t{
        display: flex;
        cursor: pointer;
        font-size: 14px;
        padding: 5px;
        &:hover{
          // background-color: #F0F5FF;
          // color: #407BEB;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
        }
        .span{
          display: block;
          width: 24px;
          height: 24px;
          background: #0367A6;
          margin-right: 5px;
        }
      }
    }
    .house-status-icon{
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      .status-icon{
        margin-top: 10px;
        margin-left:5px;
        cursor: pointer;
        font-size: 14px;
        width: 69px;
        margin-left: 10px;
        &:hover{
          // background-color: #F0F5FF;
          // color: #407BEB;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
        }
      }
    }
  }
</style>
