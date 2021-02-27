<template>
  <el-dialog
    :title="vipTirle"
    :visible.sync="dialogVip"
    width="66%"
    append-to-body
  >
    <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
      <el-form-item v-if="listType === 'vip'" label="姓名">
        <el-input v-model="formInline.card_name__icontains" clearable placeholder="姓名" />
      </el-form-item>
      <el-form-item v-if="listType ==='agre'" label="单位名称">
        <el-input v-model="formInline.name__icontains" clearable placeholder="单位名称" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.phone__icontains" maxlength="11" clearable placeholder="手机号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="pageEnv">查询</el-button>
        <!-- <el-button type="primary" @click="cancle">取消</el-button> -->
      </el-form-item>
    </el-form>
    <vipTable v-if="listType === 'vip'" :table-data="vipList" @selectRow="selectVip" />
    <companyTable v-else :table-data="agreeList" @selectRow="selectVip" />
    <Pagination
      v-show="total>0"
      :total="total"
      :page.sync="formSearch.page"
      :limit.sync="formSearch.page_size"
      @pagination="pageEnv"
    />
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="hidden">关 闭</el-button>
    </span>
  </el-dialog>

</template>

<script>
import { getVipListApi, getAgreementListApi } from '@/api/checkin'
import Pagination from '@/components/Pagination'
import companyTable from './cpmpany'
import vipTable from './vip'
import { filterParams } from '@/utils'
export default {
  components: { vipTable, Pagination, companyTable },
  props: {
    listType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formInline: {},
      vipList: [],
      agreeList: [],
      total: 0,
      vipTirle: '',
      formSearch: {
        page: 1,
        page_size: 10
      },
      dialogVip: false
    }
  },
  watch: {
    listType: function(params) {
      this.formSearch = {
        page: 1,
        page_size: 10
      }
      if (this.listType === 'vip') {
        this.getVipListMeoth()
        this.vipTirle = '会员列表'
      } else {
        this.getAgreement()
        this.vipTirle = '协议单位列表'
      }
    }
  },
  methods: {
    show() {
      this.dialogVip = true
      if (this.listType === 'vip') {
        this.getVipListMeoth()
        this.vipTirle = '会员列表'
      } else {
        this.getAgreement()
        this.vipTirle = '协议单位列表'
      }
    },
    hidden() {
      this.dialogVip = false
      this.formInline = {}
    },
    // 查询
    cancle() {
      this.formInline = {}
      this.pageEnv()
    },
    // 分页
    pageEnv() {
      if (this.listType === 'vip') {
        this.getVipListMeoth()
      } else {
        this.getAgreement()
      }
    },
    selectVip(val) {
      this.dialogVip = false
      this.$emit('selectRow', val)
    },
    // 获取会员列表
    getVipListMeoth() {
      getVipListApi({ ...this.formSearch, ...filterParams(this.formInline) }).then(res => {
        const { data } = res
        this.vipList = data.results
        this.total = data.count
      })
    },
    getAgreement() {
      getAgreementListApi({ ...this.formSearch, ...filterParams(this.formInline) }).then(res => {
        const { data } = res
        this.agreeList = data.results
        this.total = data.count
      })
    }
  }
}
</script>

<style>

</style>
