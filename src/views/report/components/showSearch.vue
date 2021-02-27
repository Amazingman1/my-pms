<!--
 * @Author: wangxuan
 * @Date: 2020-12-02 15:43:58
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-02 15:45:12
 * @FilePath: /vue-misb/src/views/report/components/showSearch.vue
-->
<template>
  <div v-show="!ISSEARCH()" style="display: inline-block;margin-left: 10px;">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    statusCode: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      statusList: [
        29, 25
      ]
    }
  },
  methods: {
    ISSEARCH() {
      // console.log(this.statusCode, 1010101)
      return this.statusList.includes(this.statusCode)
    }

  }
}
</script>

<style>

</style>
