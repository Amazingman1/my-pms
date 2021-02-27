<template>
  <div>
    <el-form :inline="true" :model="formInline" size="mini">
      <el-form-item label="时间筛选">
        <el-date-picker
          v-model="formInline.region"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="房号筛选">
        <el-date-picker
          v-model="formInline.region"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="时间"
      />
      <el-table-column
        prop="name"
        label="房间"
      />
      <el-table-column
        prop="province"
        label="姓名"
      />
      <el-table-column
        prop="city"
        label="性别"
      />
      <el-table-column
        prop="证件类型"
        label="地址"
      />
      <el-table-column
        prop="zip"
        label="证件号码"
      />
      <el-table-column
        prop="zip"
        label="出生日期"
      />
      <el-table-column
        prop="zip"
        label="户籍地址"
      />
      <el-table-column
        prop="zip"
        label="证件照"
      />
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="minil" @click="delete(scope.row)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="total>0"
      style="height:50px"
      :total="total"
      :page.sync="pageStion.page"
      :limit.sync="pageStion.page_size"
      @pagination="checkoutNoClosed"
    />
    <el-dialog title="新增访客" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" label-width="100px" size="mini">
        <el-form-item label="访客类型">
          <el-radio-group v-model="form.resource">
            <el-radio label="1">临时访客</el-radio>
            <el-radio label="2">长期访客</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="被访人房间号">
          <el-select v-model="form.region" placeholder="请选择活动区域" style="width:50%">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="被访人姓名">
          <el-input v-model="form.name" autocomplete="off" style="width:50%" />
        </el-form-item>
        <el-form-item label="访客姓名">
          <el-input v-model="form.name" autocomplete="off" style="width:50%" />
        </el-form-item>
        <el-form-item label="访客电话">
          <el-input v-model="form.name" autocomplete="off" style="width:50%" />
        </el-form-item>
        <el-form-item label="进店时间">
          <el-input v-model="form.name" autocomplete="off" style="width:50%" />
        </el-form-item>
        <el-form-item label="预离时间">
          <el-input v-model="form.name" autocomplete="off" style="width:50%" />
        </el-form-item>
        <el-form-item label="访问时长">
          <el-input v-model="form.name" autocomplete="off" style="width:50%" />
        </el-form-item>
        <el-form-item label="访问头像">
          <el-input v-model="form.name" autocomplete="off" style="width:50%" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.name" autocomplete="off" style="width:50%" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },

  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      pageStion: {
        page: 1,
        page_size: 10
      },
      total: 1,
      form: {},
      dialogFormVisible: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    delete() {},
    checkoutNoClosed() {}
  }
}
</script>

<style>

</style>
