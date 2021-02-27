<template>
  <div>
    <el-form :inline="true" :model="searchForm" size="mini">
      <el-form-item>
        <el-button class="el-icon-plus" type="primary" @click="addBtn">新增从业人员</el-button>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input
          v-model="searchForm.name"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="geManList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="姓名"
      />
      <el-table-column
        prop="id_no"
        label="身份证号"
      />
      <el-table-column
        prop="gender"
        label="性别"
      />

      <el-table-column
        prop="job_start_date"
        label="入职日期"
      />
      <el-table-column
        prop="phone_no"
        label="电话"
      />
      <el-table-column
        prop="occupation"
        label="职位"
      />
      <el-table-column
        prop="home_addr"
        label="户籍地址"
      />
      <el-table-column
        prop="remark"
        label="备注"
      />
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="minil" @click="getStaffInfo(scope.row)">绑 定</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="totals>0"
      :total="totals"
      :page.sync="pageObj.page"
      :limit.sync="pageObj.page_size"
      @pagination="geManList"
    />
    <el-dialog title="新增从业人员" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="14">
            <el-form-item label="身份证号">
              <el-input v-model="form.id_no" autocomplete="off" />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="form.gender" placeholder="请选择活动区域" style="width:100%">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
            <el-form-item label="民族">
              <el-select v-model="form.ethnicity" placeholder="请选择活动区域" style="width:100%">
                <el-option v-for="(p, inx) in nationList" :key="inx" :label="p.lable" :value="p.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-date-picker
                v-model="form.birthday"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                default-value="1991-01-01"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="详细地址">
              <el-input v-model="form.mail_addr" autocomplete="off" />
            </el-form-item>
            <el-form-item label="入职日期">
              <el-date-picker
                v-model="form.job_start_date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="form.phone_no" autocomplete="off" />
            </el-form-item>
            <el-form-item label="岗位">
              <el-input v-model="form.occupation" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="现居住地址">
          <el-input v-model="form.home_addr" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="员工" :visible.sync="dialogTableVisible">
      <el-table :data="staffList" height="300" border @row-click="rowClickSelecetName">
        <el-table-column width="60">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.$index+1">&emsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column property="id" label="ID" width="150" />
        <el-table-column property="real_name" label="姓名" />
        <el-table-column property="gender" label="性别" />
        <el-table-column property="user_name" label="呢称" />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogTableVisible = false, radio = ''">取 消</el-button>
        <el-button size="mini" type="primary" @click="submint">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { gongAnApi, addApi, getNationList, editApi } from '@/api/pmsb'
import Pagination from '@/components/Pagination'
import { getUserList } from '@/api/login'

export default {
  components: { Pagination },
  inject: ['hotel_id'],
  data() {
    return {
      radio: '',
      dialogTableVisible: false,
      staffList: [],
      formInline: {
        user: '',
        region: 3
      },
      searchForm: {},
      form: {
        portrait: '',
        id_no: null,
        name: '',
        gender: '',
        ethnicity: '',
        birthday: '',
        mail_addr: '',
        job_start_date: '',
        phone_no: '',
        occupation: '',
        home_addr: '',
        remark: ''
      },
      dialogFormVisible: false,
      tableData: [],
      totals: 0,
      loading: false,
      nationList: [],
      employeeObj: {},
      pageObj: {
        page: 1,
        page_size: 10
      }
    }
  },
  created() {
    this.getNation()
  },
  mounted() {
    this.geManList()
  },
  methods: {
    // 选中人员
    rowClickSelecetName(val) {
      console.log(val, '选中')
      this.employeeObj.new_val = val.id
      this.employeeObj.changing_vt = 'iSpider_id'
    },
    // 确定绑定
    submint() {
      editApi({ ...this.employeeObj }).then(res => {
        console.log(res, '绑定结果')
        this.dialogTableVisible = false
        this.radio = ''
        this.$message.success('绑定成功!')
        this.geManList()
      })
    },
    getStaffInfo(val) {
      console.log(val, 888)
      this.employeeObj.employee_id = val.employee_id
      getUserList({ is_deleted: 0, is_device: 0 }).then(res => {
        const { data } = res
        this.staffList = data.results
        this.dialogTableVisible = true
      })
    },
    // 新增按钮
    addBtn() {
      this.dialogFormVisible = true
      this.form = {
        portrait: '',
        id_no: null,
        name: '',
        gender: '',
        ethnicity: '',
        birthday: '',
        mail_addr: '',
        job_start_date: '',
        phone_no: '',
        occupation: '',
        home_addr: '',
        remark: ''
      }
    },
    // 获取民族列表
    getNation() {
      this.nationList = getNationList()
    },
    add() {
      const data = {
        hotel_id: this.hotel_id,
        ...this.form
      }
      addApi(data).then(res => {
        this.dialogFormVisible = false
        this.geManList()
        this.$message.success('新增成功!')
      })
    },
    geManList() {
      this.loading = true
      const params = {
        hotel_id: this.hotel_id,
        value_type: '3',
        ...this.pageObj,
        ...this.searchForm
      }
      gongAnApi(params).then(res => {
        this.totals = res.data.count
        this.tableData = res.data.items
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>
