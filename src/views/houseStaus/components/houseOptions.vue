<!--
 * @Author: wangxuan
 * @Date: 2020-12-23 09:44:42
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-28 10:33:37
 * @FilePath: /vue-misb/src/views/houseStaus/components/houseOptions.vue
-->
<template>
  <div>
    <!-- <el-collapse-transition> -->
    <div
      v-show="flag"
      ref="card"
      class="box"
      :style="{'left':leftSet+'px', 'top':topSet+'px', width: !trigger? '300px' : width+ 'px'}"
    >
      <slot name="DOM" />
      <slot name="ROOMINFO" />
    </div>
    <!-- </el-collapse-transition> -->
  </div>
</template>

<script>
export default {
  props: {
    leftSet: {
      type: Number,
      default: null
    },
    topSet: {
      type: Number,
      default: null
    },
    width: {
      type: Number,
      default: 120
    },
    trigger: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      flag: false
    }
  },
  methods: {
    show() {
      this.flag = true
      this.$nextTick(() => {
      // console.log(document.)
      })
    },
    hiden() {
      this.flag = false
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  background: #fff;
  position: absolute;
  z-index: 4;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
   box-shadow: 1px 9px 12px 2px rgba(0, 0, 0, 0.1)
}
</style>
