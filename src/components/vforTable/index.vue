<template>
  <div>
    <vxe-table
      v-if="update"
      ref="xTable"
      v-loading="loading"
      border="inner"
      highlight-hover-row
      highlight-current-row
      show-overflow
      :align="allAlign"
      :data="listData"
      width="100%"
      :row-class-name="addClasName"
      @cell-click="selectVip"
    >
      <vxe-table-column v-for="(config, index) in tableColumn" :key="index" v-bind="config" />
    </vxe-table>
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
      update: true,
      allAlign: null,
      sexList: [
        {
          label: '女',
          value: '0'
        },
        {
          label: '男',
          value: '1'
        }
      ]
    }
  },
  methods: {
    selectVip({ row }) {
      this.$emit('selectRow', row)
    },
    exportDataEvent() {
      this.$refs.xTable.exportData({ type: 'csv' })
    },
    formatterSex({ cellValue }) {
      const item = this.sexList.find(item => item.value === cellValue)
      return item ? item.label : cellValue
    },
    rushTable() {
      // 更改tableColumn，需要强制刷新vxe-table
      this.update = false
      this.$nextTick(() => {
        this.update = true
      })
    },
    addClasName({ row }) {
      if (row.subject === 'pay') {
        return 'warning-row'
      } else if (row.subject === 'consume' || row.subject === 'refund') {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>

<style>

</style>
