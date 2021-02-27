<!--
 * @Author: wangxuan
 * @Date: 2020-12-24 16:49:34
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-28 15:18:54
 * @FilePath: /vue-misb/src/views/houseStaus/components/roomInfo.vue
-->
<template>
  <div>
    <div style="background:#f5f7fa;padding:6px">
      <div class="info">
        <div class="info_labe" style="width:75px">{{ houseData.room_no }}</div>
        <div class="info_value">{{ houseData.room_guest }}</div>
      </div>
    </div>
    <div class="info">
      <div class="info_labe">入住时间:</div>
      <div class="info_value">{{ houseData.master_base.arr_time || '无' }}</div>
    </div>
    <div class="info">
      <div class="info_labe">离店时间:</div>
      <div class="info_value">{{ houseData.master_base.leave_time || '无' }}</div>
    </div>
    <div class="info">
      <div class="info_labe">当日房价:</div>
      <div class="info_value"> ¥ {{ houseData.master_base.price || '0.00' }}</div>
    </div>
    <div class="info">
      <div class="info_labe">消费金额:</div>
      <div class="info_value"> ¥ {{ houseData.account_base.total_consumption || '0.00' }}</div>
    </div>
    <div class="info">
      <div class="info_labe">付款金额:</div>
      <div class="info_value"> ¥ {{ houseData.account_base.pay_amount || '0.00' }}</div>
    </div>
    <div class="info">
      <div class="info_labe">应收金额:</div>
      <div class="info_value"> ¥ <span style="color:red">{{ houseData.account_base.general_consumption || '0.00' }}</span></div>
    </div>
    <div class="info">
      <div class="info_labe">备注:</div>
      <div class="info_value" style="text-align: left"> {{ houseData.master_base.remark }}</div>
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
    max-width: 250px;
    .info_labe{
      width: 85px;
      color:#606266;
      text-align: right;
    }
    .info_value{
      padding: 0 10px;
      text-align: left;
      color: #000;
      flex: 1;
    }
  }
</style>
