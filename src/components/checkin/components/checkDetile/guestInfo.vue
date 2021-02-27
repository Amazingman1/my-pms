<!--
 * @Author: wangxuan
 * @Date: 2020-09-21 14:58:46
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-11-04 10:13:35
 * @FilePath: /vue-misb/src/components/checkin/components/checkDetile/guestInfo.vue
-->
<template>
  <div class="content">
    <div>
      <div class="info">
        <div class="info_labe">姓名：</div>
        <div class="info_value">{{ itemValue.name || '-' }}</div>
      </div>
      <div class="info">
        <div class="info_labe">证件类型：</div>
        <div class="info_value">{{ itemValue.id_code_desc || '-' }}</div>
      </div>
      <div class="info">
        <div class="info_labe">入住时间：</div>
        <div class="info_value">{{ itemValue.create_datetime || '-' }}</div>
      </div>
    </div>
    <div>
      <div class="info">
        <div class="info_labe">性别：</div>
        <div class="info_value">{{ itemValue.sex || '-' }}</div>
      </div>
      <div class="info">
        <div class="info_labe">证件号码：</div>
        <div class="info_value">{{ itemValue.id_no || '-' }}</div>
      </div>
      <div class="info">
        <div class="info_labe">民族：</div>
        <div class="info_value">{{ itemValue.nation || '-' }}</div>
      </div>
    </div>
    <div>
      <div class="info">
        <div class="info_labe">联系方式：</div>
        <div class="info_value">{{ itemValue.telephone|| '-' }}</div>
      </div>
      <div class="info">
        <div class="info_labe">出生日期：</div>
        <div class="info_value">{{ itemValue.birth || '-' }}</div>
      </div>
      <div class="info">
        <div class="info_labe">会员等级：</div>
        <div class="info_value">{{ itemValue.order_no || '-' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemValue: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  display:flex;
  justify-content: space-around;
  border: 1px solid #ccc;
  padding: 10px 0;
  .info{
    margin-top: 5px;
    display: flex;
    .info_value{
      color: #000;
    }
  }
}
</style>
