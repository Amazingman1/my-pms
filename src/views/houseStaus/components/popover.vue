<!--
 * @Author: wangxuan
 * @Date: 2020-03-26 10:38:09
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-28 16:38:22
 * @FilePath: /vue-misb/src/views/houseStaus/components/popover.vue
-->
<template>
  <el-popover
    ref="popover"
    placement="right"
    width="100%"
    trigger="click"
    :open-delay="100"
    :close-delay="100"
  >
    <slot slot="reference" />
    <slot name="DOM" />
    <slot name="ROOMINFO" />

  </el-popover>

</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    hide() {
      console.log(this.$refs.popover)
      // this.$refs.popover._self.doClose()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
