<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="50%" :append-to-body="true">
    <div class="content">
      <div v-for="(p, index) in guestList" :key="index" class="man-info">
        <el-form :model="formInline" label-width="60px" size="mini">
          <el-row :gutter="10">
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
              <el-form-item label="性别">
                <el-select v-model="p.sex" placeholder="请选性别">
                  <el-option label="男" value="男" />
                  <el-option label="女" value="女" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="证件类型" label-width="80px">
                <el-select v-model="p.id_code" placeholder="请选择证件类型">
                  <el-option label="身份证" value="01" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号">
                <el-input v-model="p.id_no" maxlength="18" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="民族">
                <el-input v-model="p.nation" maxlength="18" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
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
            <el-col :span="12">
              <el-form-item>
                <el-button v-if="guestList.length > 1" size="mini" @click="delteRowGuest(index)">删 除</el-button>
              </el-form-item>
            </el-col>

          </el-row>

        </el-form>
      </div>
    </div>
    <el-button type="text" class="el-icon-plus" size="mini" @click="addWith">添加</el-button>
    <div slot="footer" class="dialog-footer">
      <!-- <div style="float:left">
        <el-button type="danger" size="mini" @click="dialogFormVisible = false">读取证件</el-button>
      </div> -->
      <el-button type="primary" size="mini" @click="addGuest">确认添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addGuestApi } from '@/api/book'

export default {
  inject: ['banseInfo'],

  props: {
    title: {
      type: String,
      default: '新增宾客'
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
      guestList: [
        {
          name: ''
        }
      ]
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
    show() {
      this.dialogFormVisible = true
      this.guestList = [
        {
          name: ''
        }
      ]
    },

    addGuest() {
      console.log(this.propsData, 9999)
      // return
      const params = {
        reserve_base: this.propsData.id,
        ...this.guestList[0]
      }
      addGuestApi(params).then(res => {
        this.dialogFormVisible = false
        this.$emit('rush')
        this.$message.success('添加成功!')
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
