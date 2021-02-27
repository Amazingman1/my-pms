<!--
 * @Author: wangxuan
 * @Date: 2020-10-12 13:50:27
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-11-03 16:15:55
 * @FilePath: /vue-misb/src/components/checkin/components/checkDetile/teamIn.vue
-->
<template>
  <el-dialog title="团队列表" :visible.sync="dialogFormVisible" width="40%" :append-to-body="true">
    <el-form :model="formInline" size="mini">
      <el-form-item label="组团单位：">
        <el-select
          v-model="formInline.team_base"
          filterable
          remote
          placeholder="请选择"
          :remote-method="searchTeam"
          @change="allList"
        >
          <el-option label="全部" value="all" />
          <el-option v-for="p in teamData" :key="p.id" :label="p.name" :value="p.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-table
      :data="teamData"
      stripe
      style="width: 100%"
      height="200"
    >
      <el-table-column
        type="index"
      />
      <el-table-column
        prop="name"
        label="团队名称"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="enterTeamFn(scope.row)">入 团</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="dialogFormVisible = false">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { teamListApi } from '@/api/book'
import { enterTeam } from '@/api/checkin'

export default {
  inject: ['banseInfo'],
  data() {
    return {
      dialogFormVisible: false,
      teamData: [],
      formInline: {
        team_base: 'all'
      }
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
    show() {
      this.getTeamList()
      this.dialogFormVisible = true
      this.formInline = {
        team_base: ''
      }
    },
    allList() {
      if (this.formInline.team_base === 'all') {
        this.getTeamList()
      }
    },
    // 团队搜索
    searchTeam(key) {
      if (key !== 'all') { this.getTeamList(key) }
    },
    getTeamList(key = null) {
      teamListApi({ name__icontains: key, page_size: 1000 }).then(res => {
        const { data } = res
        this.teamData = data
      })
    },
    enterTeamFn({ id }) {
      const data = {
        master_id: this.propsData.id,
        main_master_id: id
      }
      console.log(data, '参数')
      enterTeam(data).then(res => {
        console.log(res, '入团结果')
        this.$emit('rush')
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style lang='scss' scopde>
  .demo-drawer__footer{
    display: flex;
     button {
      flex: 1;
    }
  }
</style>
