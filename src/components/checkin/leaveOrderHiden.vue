<!--
 * @Author: wangxuan
 * @Date: 2020-11-20 09:37:20
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-30 10:15:59
 * @FilePath: /vue-misb/src/components/checkin/leaveOrderHiden.vue
-->
<template>
  <div v-show="!ISSTATUS()" style="display: inline-block;margin-left: 10px;">
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
    // master_status_lable
    // (0, "在住"),
    //  (1, "退房"),
    //  (2, "帐未平离店"),
    //  (3, "正在办理"),
    //  (4, "已取消"),
    //  (5, "民宿临时单"),
    //  (-1, "异常单"),
    //  (-2, "PMS已退-ispider未退")
      statusList: [
        1, 2, 3, 4, -1, -2
      ]
    }
  },
  methods: {
    ISSTATUS() {
      return this.statusList.includes(this.statusCode)
    }

  }
}
</script>

<style>

</style>
