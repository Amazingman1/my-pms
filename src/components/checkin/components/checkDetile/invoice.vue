<template>
  <el-dialog
    title="发票维护"
    :visible.sync="dialogVisible"
    append-to-body
    width="60%"
  >
    <el-link style="margin: 10px 0" icon="el-icon-plus" type="primary" :underline="false" @click="addInvoice">新增发票记录</el-link>
    <el-table :data="gridData">
      <el-table-column property="invoice_type_desc" label="发票类型" />
      <el-table-column property="invoice_title" label="发票抬头" />
      <el-table-column property="client_type_desc" label="主体" />
      <el-table-column property="tax_no" label="纳税识别号" />
      <el-table-column property="amount" label="发票金额" />
      <el-table-column property="invoice_number" label="发票号" />
      <el-table-column property="issued_date" label="开票时间" />
    </el-table>
    <Pagination
      v-show="total>0"
      :total="total"
      :page.sync="formSearch.page"
      :limit.sync="formSearch.page_size"
      @pagination="getInvoiceList"
    />
    <el-dialog
      title="新增开票记录"
      :visible.sync="innerVisible"
      append-to-body
      width="35%"
    >
      <el-form :model="form" :label-width="formLabelWidth">
        <el-form-item label="发票类型:">
          <el-radio-group v-model="form.invoice_type">
            <el-radio :label="1">普通发票</el-radio>
            <el-radio :label="0">增值税专票</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发票主体:">
          <el-radio-group v-model="form.client_type">
            <el-radio :label="0">公 司</el-radio>
            <el-radio :label="1">个 人</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开票金额:">
          {{ accountPric }}
        </el-form-item>
        <el-form-item label="发票金额:">
          <el-input v-model="form.amount" autocomplete="off">
            <i slot="prefix" class="el-input__icon">¥</i>
          </el-input>
        </el-form-item>
        <el-form-item label="发票号:">
          <el-input v-model="form.invoice_number" autocomplete="off" placeholder="请输入发票号" />
        </el-form-item>
        <el-form-item label="发票抬头:">
          <el-select
            v-model="form.invoice_title"
            style="width: 100%;"
            filterable
            remote
            reserve-keyword
            placeholder="请输入发票抬头"
            :remote-method="getInvoiceTitle"
            @change="handleSelect"
          >
            <el-option
              v-for="item in restaurants"
              :key="item.id"
              :label="item.company_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="纳税识别号:">
          <el-input v-model="formBank.tax_no" autocomplete="off" placeholder="请输入纳税识别号" />
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="formBank.address" autocomplete="off" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="formBank.phone" autocomplete="off" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="开户行:">
          <el-input v-model="formBank.bank_name" autocomplete="off" placeholder="请输入开户行" />
        </el-form-item>
        <el-form-item label="开户行账号:">
          <el-input v-model="formBank.bank_account" autocomplete="off" placeholder="请输入开户行账号" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="canselAddInvoice">取 消</el-button>
        <el-button size="mini" type="primary" @click="addInvoiceSave">确 定</el-button>
      </span>
    </el-dialog>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      <!-- <el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button> -->
    </span>
  </el-dialog>
</template>

<script>
import { getInvoiceListApi, getInvoiceTitleListApi, addInvoiceApi } from '@/api/checkin'
import { parseTime } from '@/utils/index'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  inject: ['banseInfo'],

  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      total: 0,
      formSearch: {
        page: 1,
        page_size: 10
      },
      restaurants: [],
      form: {
        invoice_type: 0,
        client_type: 0,
        invoice_number: '',
        company_name: '',
        invoice_title: '',
        amount: ''
      },
      formBank: {},
      gridData: [],
      accountPric: '',
      formLabelWidth: '120px'
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
    show() {
      this.dialogVisible = true
      this.getInvoiceList()
    },
    addInvoice() {
      this.innerVisible = true
      this.formBank = {}

      this.form = {
        company_name: '',
        invoice_number: '',
        invoice_title: '',
        invoice_type: 0,
        client_type: 0,
        amount: this.propsData.account.can_invoice
      }
      this.accountPric = this.propsData.account.can_invoice
    },
    canselAddInvoice() {
      this.innerVisible = false
    },
    // 新增发票保存
    addInvoiceSave() {
      const data = {
        ...this.form,
        ...this.formBank,
        account: this.propsData.account.id,
        issued_date: parseTime(new Date(), '{y}-{m}-{d}')
      }
      addInvoiceApi(data).then(res => {
        this.getInvoiceList()
        this.innerVisible = false
      })
    },
    getInvoiceList() {
      getInvoiceListApi({ account: this.propsData.account.id, ...this.formSearch }).then(res => {
        const { data } = res
        this.gridData = data.results
        this.total = data.count
      })
    },
    // 获取发票抬头
    getInvoiceTitle(val) {
      getInvoiceTitleListApi({ company_name__icontains: val }).then(res => {
        const { data } = res
        this.restaurants = data.results
      })
    },
    handleSelect(item) {
      const arr = this.restaurants.filter(p => {
        return item === p.id
      })
      this.formBank = {
        ...arr[0]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-form-item {
    margin-bottom: 5px;
}
/deep/ .el-input__inner{
  height: 30px;
  line-height: 30px;
}
</style>
