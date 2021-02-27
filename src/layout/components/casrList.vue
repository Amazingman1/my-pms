<!--
 * @Author: wangxuan
 * @Date: 2020-10-23 14:24:15
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-11-17 13:42:26
 * @FilePath: /vue-misb/src/layout/components/casrList.vue
-->
<template>
  <el-dialog
    title="请选择收银点"
    :visible.sync="dialogRateCode"
    width="60%"
    append-to-body
    :show-close="false"
  >
    <div class="box-fater">
      <div v-for="(p, index) in roomPriceCodeList" :key="index" @click="selectCash(p)">
        <div class="box">{{ p.desc }}</div>
      </div>
    </div>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogRateCode = false">取 消</el-button>
    </span> -->
  </el-dialog>
</template>

<script>
import { cashApi } from '@/api/checkin'
import g_localStorage from '@/utils/saveLogal'
export default {
  data() {
    return {
      dialogRateCode: false,
      roomPriceCodeList: [],
      seschForm: {
        page: 1,
        page_size: 10
      }
    }
  },
  mounted() {
    const cash_id = g_localStorage.getItem('cashId')
    if (!cash_id) {
      this.$router.push({ path: 'login' })
    }
  },
  methods: {
    show() {
      this.getCash()
      this.dialogRateCode = true
    },
    getCash() {
      cashApi({ page_size: 1000 }).then(res => {
        this.roomPriceCodeList = res.data.results
      })
    },
    selectCash({ id }) {
      g_localStorage.setItem('cashId', id)
      this.dialogRateCode = false
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-fater{
  display: flex;
  justify-content: flex-start;
  height: 300px;
  .box{
    padding: 20px;
    border: 1px solid #ccc;
    height: 60px;
    margin-left: 5px;
    &:hover{
      cursor: pointer;
      background-color: #e4f0fe;
      border: 1px solid #e4f0fe;
      box-shadow:0 2px 12px 0 rgba(0, 0, 0, 0.1);
      color: #76b1f9;
    }
  }
}

</style>
