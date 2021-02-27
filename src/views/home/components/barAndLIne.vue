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
require('echarts/lib/chart/line')
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
    maxObj: {
      type: Object,
      default: () => {}
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
        color: ['#159688', '#fd334a'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        legend: {
          data: ['总房价', '总数量']
        },
        xAxis: [
          {
            type: 'category',
            data: checkArry(this.barData, this.titleSting)
          }
        ],
        yAxis: [
          {
            name: '房价(元)',
            max: this.maxObj.market_max_room_price,
            min: 0,
            splitNumber: 5,
            interval: (this.maxObj.market_max_room_price - 0) / 5,
            splitLine: {
              show: true
            },
            axisTick: {
              // y轴刻度线
              show: false
            },
            boundaryGap: [0.2, 0.2]
          },
          {
            type: 'value',
            name: '房间数(间)',
            max: this.maxObj.market_max_room_number,
            splitNumber: 5,
            min: 0,
            interval: (this.maxObj.market_max_room_number - 0) / 5,
            splitLine: {
              show: true
            },
            axisTick: {
              // y轴刻度线
              show: false
            }

          }
        ],
        series: [
          {
            name: '总房价',
            type: 'line',
            data: checkArry(this.barData, 'room_price'),
            symbol: 'none'
            // itemStyle: {
            //   normal: {
            //     lineStyle: {
            //       color: '#fd334a'
            //     }
            //   }
            // }
          }, {
            name: '总数量',
            type: 'bar',
            yAxisIndex: 1,
            data: checkArry(this.barData, this.numSting),
            symbol: 'none'
          }
        ],
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
