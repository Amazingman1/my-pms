<!--
 * @Author: wangxuan
 * @Date: 2020-06-29 16:22:52
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-21 19:09:16
 * @FilePath: /vue-misb/src/views/home/index.vue
-->
<template>
  <div class="app-container">
    <chart />
    <div class="container">
      <!-- <Tab /> -->
      <Future />
    </div>
  </div>
</template>

<script>
import Chart from './components/charts'
import Future from '@/components/future'
export default {
  components: {
    Chart, Future
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .container{
    padding: 10px;
    margin-top:10px;border:1px solid #8957A1;
    height: 20%;
  }
</style>
