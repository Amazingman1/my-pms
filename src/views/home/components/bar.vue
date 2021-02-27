<template>
  <div class="">
    <div ref="bar_dv" :style="{width: '100%', height: '240px'}" />
  </div>
</template>

<script>
import { checkArry } from '@/utils/index'
import resize from './mixins'

const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/dataZoom')
require('echarts/lib/component/toolbox')

export default {
  name: 'Bar',
  mixins: [resize],

  props: {
    barData: {
      type: Array,
      default: () => []
    },
    titleSting: {
      type: String,
      default: 'title'
    },
    numSting: {
      type: String,
      default: 'num'
    }
  },
  watch: {
    barData: function() {
      this.$nextTick(() => {
        this.drawBar()
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawBar()
    })
  },

  methods: {
    drawBar() {
      const myChart = echarts.init(this.$refs.bar_dv)
      myChart.setOption({
        color: ['#159688'],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: checkArry(this.barData, this.titleSting)
        },
        yAxis: {},
        series: [{
          name: '预订单',
          type: 'bar',
          data: checkArry(this.barData, this.numSting)
        }],
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100
          }
        ]
      })
    }
  }
}
</script>
