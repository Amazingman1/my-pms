<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="40%" :append-to-body="true">
    <div class="content">
      <div v-for="(p, index) in guestList" :key="index" class="man-info">
        <el-form :model="formInline" label-width="60px" size="mini">
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="姓名">
                <el-input v-model="p.name" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号">
                <el-input v-model="p.telephone" maxlength="11" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button type="danger" size="mini" @click="readIdFn(index)">证件导入</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="性别">
                <el-select v-model="p.sex" placeholder="性别">
                  <el-option label="男" value="男" />
                  <el-option label="女" value="女" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="生日">
                <el-date-picker
                  v-model="p.birth"
                  style="width:100%"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  default-value="1991-01-01"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button v-if="guestList.length > 1" size="mini" @click="delteRowGuest(index)">删 除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="证件类型" label-width="80px">
                <el-select v-model="p.id_code" placeholder="证件类型">
                  <el-option label="身份证" value="01" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件号">
                <el-input v-model="p.id_no" maxlength="18" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <el-button type="text" class="el-icon-plus" @click="addWith">添加</el-button>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="submint">确认添加</el-button>
    </div>
    <ReadIdCard ref="ReadIdCard" @IdInfo="getIdInfo" />
  </el-dialog>
</template>

<script>
import { addMasterGuestApi } from '@/api/checkin'
import ReadIdCard from '@/components/ReadIdCard'

export default {
  components: { ReadIdCard },
  props: {
    title: {
      type: String,
      default: '新增同住人'
    },
    mastBase: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      formInline: {},
      isIndex: null,
      guestList: [
        {
          name: ''
        }
      ]
    }
  },
  methods: {
    // 读取身份证
    readIdFn(index) {
      this.isIndex = index
      this.$refs.ReadIdCard.ReadIdCard()
    },
    getIdInfo(val) {
      this.$set(this.guestList[this.isIndex], 'name', val.name)
      this.$set(this.guestList[this.isIndex], 'sex', val.sex)
      this.$set(this.guestList[this.isIndex], 'birth', val.birthday)
      this.$set(this.guestList[this.isIndex], 'nation', val.nation)
      this.$set(this.guestList[this.isIndex], 'id_no', val.idcardno)
      this.$set(this.guestList[this.isIndex], 'id_code', '01')
    },
    show() {
      this.dialogFormVisible = true
      this.guestList = [
        { name: '' }
      ]
    },
    // 确定添加同住人
    submint() {
      const params = [
        {
          master_base: this.mastBase.id,
          room_number: this.mastBase.room_number,
          ...this.guestList[0]
        }
      ]
      addMasterGuestApi(params).then(res => {
        this.$message.success('添加成功！')
        this.dialogFormVisible = false
        this.$emit('rush')
      })
    },
    //  删除一行
    delteRowGuest(index) {
      this.guestList.splice(index, 1)
    },
    addWith() {
      const data = {
        name: ''
      }
      this.guestList.unshift(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.man-info{
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 5px;
}
.content{
  padding: 10px;
  height: 400px;
  overflow: auto;
}
</style>
