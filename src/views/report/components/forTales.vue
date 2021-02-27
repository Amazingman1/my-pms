<!--
 * @Author: wangxuan
 * @Date: 2020-05-11 17:22:30
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-29 15:47:19
 * @FilePath: /vue-misb/src/views/report/components/forTales.vue
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
        :label="config.title"
        :show-overflow-tooltip="config.overflow"
      >
        <template slot-scope="{row, $index}">
          <span v-show="config.type">{{ $index+1 }}</span>
          <span v-show="!config.type">{{ downgradeArr(row,config.field )| pric }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  filters: {
    pric(val) {
      if (val || val === 0) {
        return val
      } else {
        return '-'
      }
    }
  },
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
    // 解决多层关系
    downgradeArr(obj, row) {
      if (Object.keys(obj).length === 0) return
      const str = row.split('.')
      if (str.length > 1) {
        return obj[str[0]] ? obj[str[0]][str[1]] : null
      } else {
        return obj[str[0]] ? obj[str[0]] : null
      }
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
