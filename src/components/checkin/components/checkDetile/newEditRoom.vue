<template>
  <el-dialog title="编辑联房" :visible.sync="dialogTableVisible" append-to-body width="50%">
    <div class="select-box">
      <span>已选房间：</span>
      <el-tag
        v-for="tag in tags"
        :key="tag.id"
        closable
        size="small"
        style="margin-left:4px;"
        @close="handleClose(tag)"
      >
        {{ tag.room_number }}
      </el-tag>
    </div>
    <el-form :inline="true" :model="formInline" size="mini" style="margin-top:10px">
      <el-form-item label="快速搜索">
        <el-input v-model="formInline.fuzzy_query" clearable placeholder="宾客姓名或者房间号" @clear="getEditRoomLfet" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getEditRoomLfet">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="height:300px;overflow-y: auto">
      <div>
        <div
          v-for="(p, index) in leftDataList"
          :key="index"
        >
          <div style="background:#e4f0fe;padding: 5px;">{{ p.room_type }}</div>
          <div class="transfer_class">
            <div
              v-for="(v, inx) in p.room_list"
              :key="inx"
              :class=" v.select ? 'transfer_box bgc' : 'transfer_box'"
              @click="selectRoom(v,inx)"
            >
              <span>{{ v.name_list? v.name_list.join(','):'' }}</span>
              <span>{{ v.room_number }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogTableVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="updataupdataCombine">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editRoomApi, getCombineListApi, setNewCombinApi, addCombinApi } from '@/api/checkin'
import { checkArry, filterParams } from '@/utils/index'

export default {
  inject: ['banseInfo'],

  data() {
    return {
      formInline: {},
      dialogTableVisible: false,
      leftDataList: [],
      rightDataList: [],
      copyRightDataList: [],
      newMaster: [],
      tags: []
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
    // 已有联房新增
    addCombin() {
      const arrId = checkArry(this.tags, 'id')
      let main_master_base
      let add_master_base_list
      if (arrId.length > 0) {
        const masterId = this.copyRightDataList.room_list.filter(p => {
          return p.is_master === 1
        })
        console.log(masterId, '抓')
        if (masterId.length > 0) {
          main_master_base = masterId[0].id
        }
        add_master_base_list = [...new Set(arrId)]
      } else {
        this.$message.warning('未选择房间')
        return
      }
      const data = {
        main_master_base,
        add_master_base_list
      }
      console.log(data, '联房参数')
      addCombinApi(data).then(res => {
        this.$message.success('添加成功')
        this.dialogTableVisible = false
        this.$emit('rush')
      })
    },
    // 未联房新增联房
    setNewCombin() {
      const arrId = checkArry(this.tags, 'id')
      let main_master_base
      let slave_master_base_list
      if (arrId.length > 0) {
        main_master_base = this.propsData.id
        slave_master_base_list = [...new Set(arrId)]
      } else {
        this.$message.warning('未选择房间')
        return
      }
      const data = {
        main_master_base,
        slave_master_base_list
      }
      setNewCombinApi(data).then(res => {
        console.log(res, '23423')
        this.$message.success('添加成功')
        this.dialogTableVisible = false
        this.$emit('rush')
      })
    },
    // 取消选中
    handleClose(tag) {
      console.log(tag)
      this.tags.splice(this.tags.indexOf(tag), 1)
      this.leftDataList.forEach(p => {
        p.room_list.forEach(v => {
          if (tag.id === v.id) {
            this.$set(v, 'select', false)
          }
        })
      })
    },
    // 选中发房间
    selectRoom(val, index) {
      console.log(val, index)
      this.tags.push(val)
      // 去重，排除同一房间多次选择
      this.tags = [...new Set(this.tags)]
      this.leftDataList.forEach(p => {
        p.room_list.forEach(v => {
          if (val.id === v.id) {
            this.$set(v, 'select', true)
          }
        })
      })
    },
    show() {
      this.dialogTableVisible = true
      this.formInline = {}
      this.tags = []
      this.getEditRoomLfet()
      this.getRightDataList()
    },
    getEditRoomLfet() {
      editRoomApi({ ...filterParams(this.formInline) }).then(res => {
        const { data } = res
        this.leftDataList = data.can_combine_room
        console.log(res, '可编辑联房列表')
      })
    },
    getRightDataList() {
      getCombineListApi(this.propsData.id).then(res => {
        const { data } = res
        this.copyRightDataList = data
        console.log(this.copyRightDataList, 99129192)
      })
    },
    updataupdataCombine() {
      console.log(this.propsData.union_type)
      if (this.propsData.union_type === 0) {
        this.setNewCombin()
      } else {
        this.addCombin()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.transfer_class{
  display: flex;
  flex-wrap: wrap;
  // height: 400px;
  margin-top: 10px;
  span{
    display: block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .transfer_box{
    width: 100px;
    height: 50px;
    text-align: center;
    margin: 5px 5px;
    padding-top:5px;
    border: 1px solid #ccc;
    // padding: 10px;
    &:hover{
      cursor: pointer;
      background-color: #e4f0fe;
      border: 1px solid #e4f0fe;
      box-shadow:0 2px 12px 0 rgba(0, 0, 0, 0.1);
      color: #76b1f9;
      border: 0px solid #ccc;

    }
    &.bgc{
      background-color: #e4f0fe;
      border: 1px solid #e4f0fe;
      box-shadow:0 2px 12px 0 rgba(0, 0, 0, 0.1);
      color: #76b1f9;
      border: 0px solid #ccc;
    }
  }
}
.select-box {
  // height: 40px;
  border: 1px solid #e4f0fe;
  line-height: 40px;
  padding: 0 10px;
  // background:#e4f0fe;
}
</style>
