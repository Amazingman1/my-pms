<!--
 * @Author: wangxuan
 * @Date: 2020-12-24 16:58:33
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-28 15:08:45
 * @FilePath: /vue-misb/src/views/houseStaus/components/service.vue
-->
<!--
 * @Author: wangxuan
 * @Date: 2020-12-24 16:49:34
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-24 16:54:59
 * @FilePath: /vue-misb/src/views/houseStaus/components/roomInfo.vue
-->
<template>
  <div style="padding:10px">
    <div class="info">
      <div class="info_labe">房间号：</div>
      <div class="info_value">{{ houseData.room_no }}</div>
    </div>
    <div class="info">
      <div class="info_labe">开始时间：</div>
      <div class="info_value">{{ houseData.OO_room_status.start_time }}</div>
    </div>
    <div class="info">
      <div class="info_labe">结束时间：</div>
      <div class="info_value">{{ houseData.OO_room_status.end_time }}</div>
    </div>
    <div class="info">
      <div class="info_labe">维修原因：</div>
      <div class="info_value">{{ houseData.OO_room_status.room_state_change_reason_desc }}</div>
    </div>
    <div class="info">
      <div class="info_labe">备注：</div>
      <div class="info_value">{{ houseData.OO_room_status.remark }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    houseData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .info{
    padding: 4px;
    display: flex;
    .info_labe{
      width: 70px;
      color:#606266;
      text-align: right;
    }
    .info_value{
      color: #000;
      flex: 1;
    }
  }
</style>
