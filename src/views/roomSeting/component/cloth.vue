<template>
  <div>
    <el-form :inline="true" :model="formInline" size="mini">
      <el-form-item>
        <el-button class="el-icon-setting" type="primary" @click="setCloth = true">布草设置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="el-icon-plus" type="primary" @click="dialogFormVisible = true">添加客房布草</el-button>
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
      <el-form :model="form" label-width="50px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="房型">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房号">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="布草">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数量">
              <el-input v-model="form.name" autocomplete="off" width="60%" />
            </el-form-item>
            <span class="el-icon-minus" />
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item>
              <el-button size="mini" @click="dialogFormVisible = false">删 除</el-button>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="布草设置" :visible.sync="setCloth" width="50%">
      <el-form :inline="true" :model="form" size="mini">
        <el-form-item label="名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="添加图片">
          <div
            v-if="form.portrait === ''"
            style="width:60px;height:60px;background:rgb(245 245 245);text-align: center;
              line-height: 60px;"
            class="el-icon-camera"
            size="mini"
            @click="foto"
          >拍照</div>
          <el-image v-else :src="form.portrait" style="width:60px;height:60px" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" @click="setCloth = false">添 加</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="setCloth = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="setCloth = false">确 定</el-button>
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
      form: {
        portrait: ''
      },
      setCloth: false,
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
    checkoutNoClosed() {},
    foto() {}
  }
}
</script>

<style>

</style>
