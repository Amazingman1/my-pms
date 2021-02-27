<!--
 * @Author: wangxuan
 * @Date: 2020-05-11 17:22:30
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-21 19:22:40
 * @FilePath: /vue-misb/src/views/nightTrial/componentes/newTables.vue
-->
<template>
  <div>
    <el-table
      v-if="update"
      v-loading="loading"
      :data="listData"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column
        v-for="(config, index) in tableColumn "
        :key="index"
        :width="config.width"
        :type="config.type? 'index': ''"
        :prop="config.field"
        :label="config.title"
      />
      <template slot="empty">
        <img :src="TableInfo" alt="">
      </template>
    </el-table>
  </div>
</template>

<script>
const TableInfo = require('@/assets/image/tableInfo.png')

export default {
  props: {
    listData: {
      type: Array,
      default: () => []
    },
    tableColumn: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      update: true,
      TableInfo: TableInfo
    }
  },
  methods: {
    exportDataEvent() {
      this.$refs.xTable.exportData({ type: 'csv' })
    },
    rushTable() {
      // 更改tableColumn，需要强制刷新vxe-table
      this.update = false
      this.$nextTick(() => {
        this.update = true
      })
    }
  }
}
</script>

<style>

</style>
