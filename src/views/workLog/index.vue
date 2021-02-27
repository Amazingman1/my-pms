<template>
  <div class="app-container" style="overflow:hidden">
    <div class="content-right">
      <div class="btn">查询</div>
      <div class="btn" style="margin-top:10px">打印</div>
      <div class="btn" style="margin-top:10px">导出EXCEL</div>
    </div>
    <div id="sidebar">
      <div style="padding:10px">
        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="员工姓名：">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="时间筛选：">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="日期"
              size="mini"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>

        <el-table
          :data="tableData"
          stripe
          height="780"
          style="width: 100%"
        >
          <el-table-column
            prop="date"
            label="员工"
          />
          <el-table-column
            prop="name"
            label="时间"
          />
          <el-table-column
            prop="address"
            label="操作"
          />
        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tabPosition: 'top',
      value1: [],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市'
      }]
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #sidebar {
    border: 1px solid #4488E9;
    margin-right: 120px;
    border: 1px solid #4488E9;
  }
  #content {
    float: left;
    width: 340px;
    border: 1px solid #4488E9;

  }
  .content-right {
    float: right;
    width: 110px;
    border: 1px solid #EEEEEE;
    height: 780px;
    padding: 10px 10px;
    .btn{
      height: 40px;
      background:#4488E9;
      text-align: center;
      line-height: 40px;
      color: #fff;
      cursor: pointer;
        &:hover{
          background:rgba(124, 168, 243, 0.5);
          border: 1px solid rgba(210, 229, 235, 0.5);
        }
    }
  }
</style>

