<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="form-style"
    >
      <el-form-item>
        <el-button class="el-icon-plus" size="mini" type="primary" @click="addVistor">新增访客</el-button>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="formInline.visitor_type" @change="getVisitor">
          <el-radio :label="''">全 部</el-radio>
          <el-radio :label="1">临时访客</el-radio>
          <el-radio :label="2">长期访客</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="visitor_type"
        label="访客类型"
      >
        <template slot-scope="scope">{{ scope.row.visitor_type === 1 ? '临时访客': '长期访客' }}</template>
      </el-table-column>
      <el-table-column
        prop="company"
        label="访客所属公司"
      />
      <el-table-column
        prop="visit_room_num"
        label="被访房间"
      />
      <el-table-column
        prop="visitee_name"
        label="被访人姓名"
      />
      <el-table-column
        prop="name"
        label="访客姓名"
      />
      <el-table-column
        prop="phone"
        label="访客电话"
      />
      <el-table-column
        prop="head_img_id"
        label="访客头像"
      />
      <el-table-column
        prop="in_time"
        label="进店时间"
      />
      <el-table-column
        prop="out_time"
        label="离店时间"
      />
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="minil" @click="deleteRow(scope.row)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="totals>0"
      :total="totals"
      :page.sync="page"
      :limit.sync="page_size"
      @pagination="getVisitor"
    />
    <el-dialog title="新增访客" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" label-width="130px" size="mini">
        <el-form-item label="访客类型">
          <el-radio-group v-model="form.visitor_type">
            <el-radio :label="1">临时访客</el-radio>
            <el-radio :label="2">长期访客</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.visitor_type === 2" label="长期访客所属公司">
          <el-input v-model="form.company" autocomplete="no" style="width:80%" />
        </el-form-item>
        <el-form-item label="被访人房间号">
          <el-select v-model="form.visit_room_num" placeholder="请选择活动区域" style="width:80%">
            <el-option v-for="(p, index) in roomNoList" :key="index" :label="p.room_no" :value="p.room_no" />
          </el-select>
        </el-form-item>
        <el-form-item label="被访人姓名">
          <el-input v-model="form.visitee_name" autocomplete="no" style="width:80%" />
        </el-form-item>
        <el-form-item label="访客姓名">
          <el-input v-model="form.name" autocomplete="no" style="width:80%" />
        </el-form-item>
        <el-form-item label="访客电话">
          <el-input v-model="form.phone" autocomplete="no" style="width:80%" />
        </el-form-item>
        <el-form-item label="进店时间">
          <el-date-picker
            v-model="form.in_time"
            type="datetime"
            style="width:80%"
            placeholder="选择时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="预离时间">
          <el-date-picker
            v-model="form.out_time"
            type="datetime"
            style="width:80%"
            placeholder="选择时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="访问时长">
          <el-input v-model="form.estimate_stay_hours" autocomplete="no" style="width:80%" />
        </el-form-item>
        <el-form-item label="访问头像">
          <el-input v-model="form.head_img_id" autocomplete="no" style="width:80%" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" autocomplete="no" style="width:80%" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addVisitor">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getVisitorApi, addVisitorApi, deleteVisitorApi } from '@/api/vistory'
import { roomSatuslistApi } from '@/api/housStatus'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      formInline: {
        visitor_type: ''
      },
      form: {
        visitor_type: 1
      },
      page: 1,
      page_size: 10,
      totals: 0,
      dialogFormVisible: false,
      tableData: [],
      roomNoList: []
    }
  },
  mounted() {
    this.getVisitor()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    addVistor() {
      this.form = {
        visitor_type: 1
      }
      this.roomSatuslist()
      this.dialogFormVisible = true
    },
    // 确定添加
    addVisitor() {
      addVisitorApi({ ...this.form }).then(res => {
        console.log(res, '新增访客')
        this.dialogFormVisible = false
        this.getVisitor()
      })
    },
    // 删除访客记录
    deleteRow(row) {
      deleteVisitorApi(row.id).then(res => {
        this.getVisitor()
      })
    },
    // 获取在住房间号
    roomSatuslist() {
      roomSatuslistApi({ room_state__in: 'OC,OD' }).then(res => {
        console.log(res, '房')
        this.roomNoList = res.data.results
      })
    },
    getVisitor() {
      getVisitorApi({ page: this.page, page_size: this.page_size, ...this.formInline }).then(res => {
        console.log(res, '获取')
        const { data } = res
        this.tableData = data.list
        this.totals = data.total_count
      })
    }
  }
}
</script>

<style>

</style>
