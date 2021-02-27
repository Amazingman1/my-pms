<!--
 * @Author: wangxuan
 * @Date: 2020-12-04 09:19:57
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-21 15:23:01
 * @FilePath: /vue-misb/src/views/guests/index.vue
-->
<template>
  <div class="app-container">
    <el-tabs v-model="tabPosition" @tab-click="changeR">
      <el-tab-pane label="在住客人" name="live">
        <Search ref="Search" live :total="total" @cansleFn="searchFn" @searchFn="searchFn" />
        <Tables :table-data="liveNowList" :loading="loading" />
      </el-tab-pane>
      <el-tab-pane label="已离店客人" name="leave">
        <Search ref="Search" :total="total" @cansleFn="searchFn" @searchFn="searchFn" />
        <Tables :table-data="liveNowList" :loading="loading" />
      </el-tab-pane>
    </el-tabs>
    <Pagination
      v-show="total>0"
      :total="total"
      :page.sync="pageStion.page"
      :limit.sync="pageStion.page_size"
      @pagination="onCancel"
    />
  </div>
</template>

<script>
import { masterListApi } from '@/api/geustList'
import Pagination from '@/components/Pagination'
import { filterParams } from '@/utils/index'
import Tables from './components/tabls'
import Search from './components/search'

export default {
  components: { Pagination, Tables, Search },
  data() {
    return {
      formInline: {},
      tabPosition: 'live',
      liveNowList: [],
      total: 0,
      loading: false,
      pageStion: {
        page: 1,
        page_size: 15
      }
    }
  },
  mounted() {
    this.onCancel()
  },
  methods: {
    searchFn(val) {
      this.onCancel(val)
    },
    // 切换表
    changeR() {
      this.pageStion = {
        page: 1,
        page_size: 15
      }
      this.onCancel(this.formInline)
    },
    onCancel(val) {
      this.loading = true
      const data = {
        master_status_lable: this.tabPosition === 'live' ? 0 : 1
      }
      masterListApi(data, { ...this.pageStion, ...filterParams(val) }).then(res => {
        const { data } = res
        this.total = data.count
        this.liveNowList = data.results
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-input__inner::placeholder{
  color:#000
}
</style>

