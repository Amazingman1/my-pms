<template>
  <div>
    <el-dialog
      :title="isTransType"
      :visible.sync="dialogVisible"
      width="50%"
      :append-to-body="true"
    >
      <el-form :model="formLine" :inline="true" size="mini" style="margin-top:10px">
        <el-form-item v-if="isTransType=== '转账'" label="房间号">
          <el-input v-model="formLine.room_number__icontains" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="isTransType=== '挂帐'" label="名称">
          <el-input v-model="formLine.name__icontains" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePageEvn">查询</el-button>
          <el-button type="primary" @click="cancle">取消</el-button>
        </el-form-item>
      </el-form>
      <el-form :model="form" :inline="true" size="mini">
        <el-form-item label="收银点">
          <el-select v-model="form.submit_cashier" placeholder="请选择收银点">
            <el-option
              v-for="item in cashAList"
              :key="item.id"
              :label="item.desc"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.desc" autocomplete="off" />
        </el-form-item>
      </el-form>
      <el-table
        v-if="isTransType === '转账'"
        v-loading="arLoading"
        :data="tableData"
        stripe
        height="350px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="room_number"
          label="房间号"
        />

        <el-table-column
          prop="room_type_desc"
          label="房间型"
        />
        <el-table-column
          prop="master_guest_list"
          label="姓名"
        />
        <el-table-column
          prop="balance"
          label="余额"
        />
      </el-table>
      <el-table
        v-else
        v-loading="arLoading"
        :data="list"
        stripe
        height="400px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="name"
          label="名称"
        />

        <el-table-column
          prop="ar_status_desc"
          label="状态"
        />
      </el-table>
      <Pagination
        v-show="pageObjList.totoal>0"
        :total="pageObjList.totoal"
        :page.sync="pageObjList.page"
        :limit.sync="pageObjList.page_size"
        @pagination="changePageEvn"
      />
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelQ">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitQ">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { transferApi, ARListApi } from '@/api/accounts'
import Pagination from '@/components/Pagination'
import { getMasterList } from '@/api/home'
import { checkArry, filterParams } from '@/utils/index'
import { mapGetters } from 'vuex'
export default {
  inject: ['transType'],
  components: { Pagination },
  props: {
    multipleSelection: {
      type: Array,
      default: () => []
    },
    accuntId: {
      type: Number,
      default: null
    }

  },
  data() {
    return {
      dialogVisible: false,
      selecedLsit: [],
      chargeDetailList: [],
      arLoading: false,
      tableData: [],
      form: { },
      formLine: {},
      pageObjList: {
        totoal: 0,
        page: 1,
        page_size: 10
      },
      list: []
    }
  },
  computed: {
    isTransType() { return this.transType() },
    ...mapGetters([
      'cashAList'
    ])
  },
  methods: {
    // 判断团队
    cancelQ() {
      this.dialogVisible = false
      this.formLine = {}
    },
    // 分页
    changePageEvn() {
      if (this.isTransType === '转账') {
        this.getBaseList()
      } else {
        this.getARList()
      }
    },
    // 取消
    cancle() {
      this.formLine = {}
      this.changePageEvn()
    },
    show() {
      this.pageObjList = {
        totoal: 0,
        page: 1,
        page_size: 10
      }
      this.dialogVisible = true
      this.getCashList()
      this.changePageEvn()
    },
    handleSelectionChange(val) {
      this.selecedLsit = val
    },
    // 获取收银点
    getCashList() {
      this.$store.dispatch('checkin/getCashInfo')
    },
    // 获取AR账户
    getARList() {
      console.log(this.pageObjList)
      this.arLoading = true
      ARListApi(
        filterParams({ page: this.pageObjList.page,
          page_size: this.pageObjList.page_size,
          ...filterParams(this.formLine)
        })
      ).then(res => {
        const { data } = res
        this.chargeDetailList = checkArry(this.multipleSelection, 'id')
        this.arLoading = false
        this.pageObjList.totoal = data.count
        this.list = data.results
      })
    },
    async getBaseList(val) {
      this.arLoading = true
      await getMasterList({ page: this.pageObjList.page, page_size: this.pageObjList.page_size, ...filterParams(this.formLine) }).then(res => {
        const { data } = res
        this.arLoading = false
        const arr = checkArry(this.multipleSelection, 'room_num')
        console.log(arr, '选中的房讲好')
        this.chargeDetailList = checkArry(this.multipleSelection, 'id')
        // const newArr = []
        this.pageObjList.totoal = data.count
        // data.results.map(p => {
        //   if (!arr.includes(p.room_number)) {
        //     newArr.push(p)
        //   }
        // })
        this.tableData = data.results
      })
    },
    // 转帐
    submitQ() {
      if (this.selecedLsit.length > 1) {
        this.$message.warning('只能选择一间房转账!')
        return
      } else if (this.selecedLsit.length === 0) {
        this.$message.warning('请选择转账房间!')
        return
      }
      this.form.is_ar_account = this.isTransType === '挂帐'
      this.form.from_account = Number(this.accuntId)
      this.form.to_account = this.selecedLsit[0].account.id
      this.form.charge_detail = this.chargeDetailList
      transferApi(this.form).then(res => {
        this.$message.success('转账成功!')
        this.$emit('accuntSuccess')
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style>

</style>
