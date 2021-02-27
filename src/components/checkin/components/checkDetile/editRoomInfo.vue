<!--
 * @Author: wangxuan
 * @Date: 2020-10-18 14:41:34
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-11-17 14:45:23
 * @FilePath: /vue-misb/src/components/checkin/components/checkDetile/editRoomInfo.vue
-->
<template>
  <el-dialog title="修改房间信息" :visible.sync="addVisible" width="30%" :append-to-body="true">
    <div class="content">
      <el-form ref="formName" :model="roomInfo" label-width="70px" size="mini" :rules="rules">
        <el-form-item label="市场码" prop="code_market">
          <el-select v-model="roomInfo.code_market" style="width:100%" placeholder="请选择市场码" @focus="marktCode" @change="srcCode">
            <el-option v-for="p in marketList" :key="p.id" :label="p.descript" :value="p.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="来源码" prop="code_src">
          <el-select v-model="roomInfo.code_src" style="width:100%" placeholder="请选择来源码" @focus="srcCode">
            <el-option v-for="p in srcList" :key="p.id" :label="p.descript" :value="p.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="结账提醒">
          <el-input v-model="roomInfo.remark2" type="textarea" maxlength="50" placeholder="结账提醒" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="roomInfo.remark" type="textarea" maxlength="150" placeholder="备注" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="addVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="changeOrdeInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editOrdApi } from '@/api/checkin'
import { getMarktCode, getSrcCode } from '@/api/home'

export default {
  inject: ['banseInfo'],
  data() {
    return {
      dialogTableVisible: false,
      addVisible: false,
      roomInfo: {},
      marketList: [],
      srcList: [],
      rules: {
        code_market: [
          { required: true, message: '市场码为必填不可为空', trigger: ['blur', 'change'] }
        ],
        code_src: [
          { required: true, message: '来源码必填不可为空', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {
    propsData() { return this.banseInfo() }
  },
  methods: {
    show() {
      this.addVisible = true
      this.roomInfo = this.propsData
      this.marketList = [
        { 'descript': this.roomInfo.code_market_desc, code: this.roomInfo.code_market }
      ]
      this.srcList = [
        { 'descript': this.roomInfo.code_src_desc, code: this.roomInfo.code_src }
      ]
    },
    // 市场码
    marktCode() {
      getMarktCode().then(res => {
        const { data } = res
        this.marketList = data.results
      })
    },
    // 来源码
    srcCode() {
      this.propsData.code_src = ''
      getSrcCode({ code_category: this.propsData.code_market }).then(res => {
        const { data } = res
        this.srcList = data.results
      })
    },
    // 入住单修改入住信息
    changeOrdeInfo() {
      this.$refs.formName.validate(valid => {
        if (valid) {
          const params = {
            code_market: this.roomInfo.code_market,
            code_src: this.roomInfo.code_src,
            remark: this.roomInfo.remark,
            remark2: this.roomInfo.remark2
          }
          editOrdApi(params, this.roomInfo.id).then(res => {
            this.$message.success('基本信息修改成功!')
            this.addVisible = false
            this.$emit('rush')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content{
    padding: 10px;
  }
</style>
