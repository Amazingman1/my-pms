<template>
  <div class="">
    <div ref="pie_dv" :style="{width: '100%', height: '240px'}" />
  </div>
</template>

<script>
import { checkArry } from '@/utils/index'
import resize from './mixins'

const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legendScroll')
require('echarts/lib/component/toolbox')

export default {
  name: 'Pie',
  mixins: [resize],
  props: {
    pieData: {
      type: Array,
      default: () => []
    },
    legendData: {
      type: String,
      default: 'name'
    }
  },
  watch: {
    pieData: function() {
      this.$nextTick(() => {
        this.drawPie()
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawPie()
    })
  },
  methods: {
    drawPie() {
      const myChart = echarts.init(this.$refs.pie_dv)
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 65,
          bottom: 20,
          data: checkArry(this.pieData, this.legendData)
        },
        series: [
          {
            name: '房态',
            type: 'pie',
            radius: '55%',
            center: ['35%', '50%'],
            label: {
              show: true
            },
            data: this.pieData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            textStyle: {
              color: '#333'
            }
          }
        ]
      })
    }
  }
}
</script>
