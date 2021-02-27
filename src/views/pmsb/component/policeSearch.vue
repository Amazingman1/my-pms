<template>
  <div>
    <el-form :inline="true" :model="formInline" size="mini">
      <el-form-item>
        <el-button class="el-icon-plus" type="primary" @click="dialogFormVisible = true">新增民警巡查</el-button>
      </el-form-item>
      <el-form-item label="检查时间">
        <el-date-picker
          v-model="form.value2"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
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
        label="访客类型"
      />
      <el-table-column
        prop="name"
        label="访客所属公司"
      />
      <el-table-column
        prop="province"
        label="被访房间"
      />
      <el-table-column
        prop="被访人姓名"
        label="性别"
      />
      <el-table-column
        prop="访客电话"
        label="地址"
      />
      <el-table-column
        prop="zip"
        label="访客头像"
      />
      <el-table-column
        prop="zip"
        label="创建者"
      />
      <el-table-column
        prop="zip"
        label="创建时间"
      />
      <el-table-column
        prop="zip"
        label="修改时间"
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
    <el-dialog title="新增民警巡查" :visible.sync="dialogFormVisible" width="60%">
      <el-form :model="form" label-width="110px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="检查部门">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查事项">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <fieldset style="border: 1px solid #cccc">
          <legend style="padding: 0 10px;color:red">检查事项及其事项</legend>
          <el-row>
            <el-col :span="8">
              <el-form-item label="计算机状况">
                <el-input v-model="form.name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="二代证读卡器">
                <el-input v-model="form.name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="信息如实登陆">
                <el-input v-model="form.name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="从业人员登记">
                <el-input v-model="form.name" autocomplete="off" />
              </el-form-item></el-col>
            <el-col :span="8">
              <el-form-item label="系统状况">
                <el-input v-model="form.name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="摄像头状况">
                <el-input v-model="form.name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="信息及时上传">
                <el-input v-model="form.name" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="网络状况">
                <el-input v-model="form.name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="验证登陆">
                <el-input v-model="form.name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="及时登陆">
                <el-input v-model="form.name" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
        <el-form-item style="margin-top:10px" label="其他情况">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="整改意见/要求">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="证件类型">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号码">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: 3
      },
      form: {
        resource: '1'
      },
      dialogFormVisible: false,
      tableData: []
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    delete() {}
  }
}
</script>

<style>

</style>
