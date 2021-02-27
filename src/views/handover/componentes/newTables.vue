<!--
 * @Author: wangxuan
 * @Date: 2020-05-11 17:22:30
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-29 11:10:25
 * @FilePath: /vue-misb/src/views/handover/componentes/newTables.vue
-->
<template>
  <div>
    <el-table
      v-if="update"
      v-loading="loading"
      :data="listData"
      stripe
      border
      size="mini"
      style="width: 100%"
    >
      <el-table-column
        v-for="(config, index) in tableColumn "
        :key="index"
        :width="config.width"
        :type="config.type ? 'index': ''"
        :prop="config.field ? config.field : '-'"
        :label="config.title"
      >
        <template slot-scope="{row, $index}">
          <span v-show="config.type">{{ $index+1 }}</span>
          <span v-show="!config.type">{{ row[config.field] || '-' }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

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
      update: true
    }
  },
  methods: {
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
