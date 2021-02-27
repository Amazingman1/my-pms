<!--
 * @Author: wangxuan
 * @Date: 2020-09-21 14:46:15
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-11 14:43:30
 * @FilePath: /vue-misb/src/components/checkin/components/bookingDetile/orderInfo.vue
-->
<template>
  <div class="content">
    <div class="info-base">
      <div class="info">
        <div class="info_labe">预定人：</div>
        <div class="info_value">{{ formInline.name || '-' }}</div>
      </div>
      <div class="info">
        <div class="info_labe">联系方式：</div>
        <div class="info_value">{{ formInline.mobile || '-' }}</div>
      </div>
      <div class="info">
        <div class="info_labe">入住时间：</div>
        <div class="info_value">{{ formInline.arr_time }}</div>
      </div>
      <div class="info">
        <div class="info_labe">离店时间：</div>
        <div class="info_value">{{ formInline.leave_time }}</div>
      </div>
    </div>
    <div class="info-base">
      <div class="info">
        <div class="info_labe">天数：</div>
        <div class="info_value">{{ formInline.days }}</div>
      </div>
      <div class="info">
        <div class="info_labe">市场码：</div>
        <div class="info_value">{{ formInline.code_market_desc }}</div>
      </div>
      <div class="info">
        <div class="info_labe">来源码：</div>
        <div class="info_value">{{ formInline.code_src_desc }}</div>
      </div>
      <div class="info">
        <div class="info_labe">房价码：</div>
        <div class="info_value">{{ formInline.rate_code }}</div>
      </div>
    </div>
    <div class="info-base">
      <div class="info">
        <div class="info_labe">房价：</div>
        <div class="info_value">
          ￥{{ formInline.room_price }}
        </div>
      </div>
      <div class="info">
        <div class="info_labe">房价类型：</div>
        <div class="info_value">{{ formInline.master_type|| '-' }}</div>
      </div>
      <div class="info">
        <div class="info_labe">团｜会｜协：</div>
        <div class="info_value">{{ formInline.from_name| teamFilter }}</div>
      </div>
      <div class="info">
        <div class="info_labe">支付类型：</div>
        <div class="info_value">{{ '-' }}</div>
      </div>
    </div>
    <div class="info-base">
      <div class="info">
        <div class="info_labe">早餐类型：</div>
        <div class="info_value">{{ '-' }}</div>
      </div>
      <div class="info">
        <div class="info_labe">预定单号：</div>
        <div class="info_value">{{ formInline.order_no }}</div>
      </div>
      <div class="info">
        <div class="info_labe">备注：</div>
        <div class="info_value">{{ formInline.remark || '-' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    teamFilter(val) {
      if (val === undefined) { return }
      const arrStr = val.split('|')

      if (arrStr[0] === '' && arrStr[1] === '' && arrStr[2] === '') {
        return '-'
      } else {
        return val
      }
    }
  },
  props: {
    formInline: {
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
  .info-base{
    width: 25%;
    padding:0 10px;
    .info_labe{
      width: 85px;
      text-align: right;
    }
    .info{
      margin-top: 5px;
      display: flex;
      .info_value{
        color: #000;
        flex: 1;
      }
    }
  }

}
</style>
