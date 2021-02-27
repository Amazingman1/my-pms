<template>
  <div>
    <el-form :inline="true" :model="formInline" size="mini">
      <el-form-item label="时间筛选">
        <el-date-picker
          v-model="formInline.create_datetime__gte"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="状态筛选">
        <el-select v-model="formInline.status" placeholder="请选择状态">
          <el-option label="全部" :value="null" />
          <el-option label="初始" :value="0" />
          <el-option label="待完成" :value="5" />
          <el-option label="完成" :value="10" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getSweepist">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="el-icon-plus" type="primary" @click="dialogFormVisible = true">添加离店查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="room_no"
        label="房间"
      />
      <el-table-column
        prop="check_detail"
        label="打扫内容"
      />
      <el-table-column
        prop="status"
        label="状态"
        width="60px"
      >
        <template slot-scope="scope">
          {{ scope.row.status| statusFilter }}
        </template>
      </el-table-column>
      <el-table-column
        prop="create_datetime"
        label="创建时间"
      />
      <el-table-column
        prop="create_user"
        label="创建人"
      />
      <el-table-column
        prop=""
        label="打扫人"
      />
      <el-table-column
        prop="remark"
        label="备注"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="160px"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="deleteRow(scope.row)">删 除</el-button>
          <!-- <el-button type="primary" size="mini" @click="overRoomCheck(scope.row)">完 成</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="total>0"
      style="height:50px"
      :total="total"
      :page.sync="pageStion.page"
      :limit.sync="pageStion.page_size"
      @pagination="getSweepist"
    />
    <el-dialog title="添加离店查询" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" label-width="100px" size="mini">
        <el-form-item label="房间号">
          <el-select v-model="form.room_no" placeholder="请选择查房房间" style="width:100%" @change="changeRoomNo" @focus="getMaster">
            <el-option v-for="(p, inx) in roomList" :key="inx" :label="p.room_number" :value="p.room_number" />
          </el-select>
        </el-form-item>
        <el-form-item label="检查内容">
          <el-input v-model="form.check_detail" autocomplete="off" style="width:100%" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" autocomplete="off" style="width:100%" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addCheckRoom">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getSweepistApi, addCheckRoomApi, getMasterList, deletRoomCheckApi, overRoomCheckApi } from '@/api/roomSeting'

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '初始',
        5: '待完成',
        10: '完成'
      }
      return statusMap[status]
    }
  },
  props: {
    title: {
      type: String,
      default: '离店查房记录表'

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
      loading: false,
      checkType: 'CO'
    }
  },
  watch: {
    title: function() {
      console.log('title', this.title)
      this.check_type = this.title === '离店查房记录表' ? 'CO' : 'CK'
      this.getSweepist()
    }
  },
  mounted() {
    this.getSweepist()
  },
  methods: {
    addCheckRoom() {
      addCheckRoomApi({ check_type: this.check_type, ...this.form }).then(res => {
        console.log(res, '新增查房结果')
        this.dialogFormVisible = false
        this.$message.success('新增成功')
        this.getSweepist()
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
    // 获取在住单列表
    getMaster() {
      getMasterList({ page: 1, page_size: 1000 }).then(res => {
        const { data } = res
        this.roomList = data.results
      })
    },
    getSweepist() {
      this.loading = true
      getSweepistApi({ check_type: this.check_type, ...this.pageStion, ...this.formInline }).then(res => {
        console.log('res', res)
        const { data } = res
        this.tableData = data.results
        this.total = data.count
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 主动完成打扫
    overRoomCheck(row) {
      overRoomCheckApi().then(res => {
        console.log(res, '完成打扫')
      })
    },
    deleteRow(row) {
      deletRoomCheckApi(row.id).then(res => {
        console.log('删除结果', res)
        this.$message.success('删除成功')
        this.getSweepist()
      })
    }
  }
}
</script>

<style>

</style>
