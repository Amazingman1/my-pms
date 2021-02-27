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
      <el-form-item label="状态筛选">
        <el-date-picker
          v-model="formInline.region"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getSweepList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="el-icon-plus" type="primary" @click="dialogFormVisible = true">添加打扫任务</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="room_no"
        label="房间号"
      />
      <el-table-column
        prop="sweep_time"
        label="时间"
      />
      <el-table-column
        prop="status"
        label="状态"
      >
        <template slot-scope="scope">
          {{ scope.row.status|statusRowFilter }}
        </template>
      </el-table-column>
      <el-table-column
        prop="sweep_type"
        label="打扫来源"
      >
        <template slot-scope="scope">
          {{ scope.row.sweep_type|statusFilter }}
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="打扫人员"
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
          <el-button type="text" size="minil" @click="deleteRow(scope.row)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="total>0"
      style="height:50px"
      :total="total"
      :page.sync="pageStion.page"
      :limit.sync="pageStion.page_size"
      @pagination="getSweepList"
    />
    <el-dialog title="新增访客" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" label-width="100px" size="mini">
        <el-form-item label="房间">
          <el-select v-model="form.room_no" style="width:70%" placeholder="请选择查房房间" @change="changeRoomNo" @focus="getMaster">
            <el-option v-for="(p, inx) in roomList" :key="inx" :label="p.room_number" :value="p.room_number" />
          </el-select>
        </el-form-item>
        <el-form-item label="打扫来源">
          <el-select v-model="form.sweep_type" style="width:70%" placeholder="请选择查房房间">
            <el-option label="微信" :value="0" />
            <el-option label="前台" :value="10" />
            <el-option label="其他" :value="20" />
          </el-select>
        </el-form-item>
        <el-form-item label="预定打扫时间">
          <el-date-picker
            v-model="form.sweep_time"
            style="width:70%"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" autocomplete="off" style="width:70%" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addSweepList">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getSweepListApi, addSweepListApi, getMasterList, removeSweepListApi } from '@/api/roomSeting'

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '微信',
        5: '前台',
        10: '其他'
      }
      return statusMap[status]
    },
    statusRowFilter(status) {
      const statusMap = {
        0: '待分配',
        5: '待完成',
        30: '完成',
        40: '删除'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      formInline: {},
      pageStion: {
        page: 1,
        page_size: 10
      },
      total: 0,
      form: {},
      dialogFormVisible: false,
      tableData: [],
      roomList: [],
      loading: false
    }
  },
  mounted() {
    this.getSweepList()
  },
  methods: {
    getSweepList() {
      this.loading = true
      getSweepListApi({ ...this.pageStion }).then(res => {
        const { data } = res
        this.tableData = res.data.results
        this.total = data.count
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 新增打扫任务
    addSweepList() {
      addSweepListApi({ ...this.form }).then(res => {
        this.dialogFormVisible = false
        this.getSweepList()
      })
    },
    // 获取在住单列表
    getMaster() {
      getMasterList({ page: 1, page_size: 1000 }).then(res => {
        const { data } = res
        this.roomList = data.results
      })
    },
    changeRoomNo() {
      const arrRoom = this.roomList.filter(p => {
        return p.room_number === this.form.room_no
      })
      if (arrRoom.length > 0) {
        this.form.master_id = arrRoom[0].id
      }
    },
    deleteRow(row) {
      removeSweepListApi(row.id).then(res => {
        this.$message.success('删除成功')
        this.getSweepList()
      })
    }
  }
}
</script>

<style>

</style>
