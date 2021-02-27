<template>
  <el-dialog
    title="证件登记"
    direction="ltr"
    :visible.sync="innerDrawer"
    width="35%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    :show-close="false"
  >
    <el-form :model="formInline" :disabled="true" size="mini" class="demo-form-inline" label-width="80px">
      <el-form-item label="证件照">
        <img :src="formInline.profile_photo" alt="" style="height:100px;width:80px">
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="formInline.user_name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房间号">
            <el-input v-model="formInline.room_number" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="性别">
            <el-input v-model="formInline.sex" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期">
            <el-input v-model="formInline.birthday" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="证件类型">
            <el-input v-model="formInline.card_type" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码">
            <el-input v-model="formInline.card_number" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="民族">
            <el-input v-model="formInline.nation" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="户籍地址">
            <el-input v-model="formInline.permanent_address" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="cansleDlo">取 消</el-button>
      <el-button v-show="!formInline.profile_photo" type="primary" size="mini" @click="readId">读 证</el-button>
      <el-button v-show="formInline.profile_photo" type="primary" size="mini" @click="foto">拍 照</el-button>
      <el-button size="mini" type="primary" :disabled="btn" @click="onSubmit">确 定</el-button>
    </span>
    <takePhoto ref="idread" @getPhotoBasce64="getImg" />
  </el-dialog>
</template>
<script>
import axios from 'axios'
import { readIdCardApi } from '@/api/card'
import takePhoto from '@/components/takePhoto/index'
import { uploadPhoto } from '@/utils/index'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import { addMasterGuestApi } from '@/api/checkin'

export default {
  components: { takePhoto },
  data() {
    return {
      formInline: {},
      innerDrawer: false,
      guList: [],
      btn: true
    }
  },
  computed: {
    ...mapGetters([
      'checkinInfo',
      'guestlist'
    ])
  },
  methods: {
    show() {
      this.innerDrawer = true
      this.formInline = {}
    },
    foto() {
      this.$refs.idread.show()
    },
    getImg(val) {
      this.validPhoto(val)
    },
    cansleDlo() {
      this.innerDrawer = false
      this.formInline = {}
    },
    // 字段替换
    replaceStr(form) {
      console.log(form, '字段转换')
      const _form = {
        name: form.user_name,
        id_code: form.card_type,
        id_no: form.card_number,
        sex: form.sex,
        birth: form.birthday,
        address: form.permanent_address,
        pic_photo: form.profile_photo,
        pic_now: form.photo,
        card_type: form.card_type === '01' ? '身份证' : ''
      }
      return _form
    },
    // 上传公安之前 先入pms
    upDataGuestToPms() {
      const params = [
        {
          master_base: this.checkinInfo.id,
          room_number: this.checkinInfo.room_number,
          ...this.replaceStr(this.formInline)
        }
      ]
      addMasterGuestApi(params).then(res => {
        this.$message.success('宾客信息已入PMS！')
      })
    },
    validPhoto(val) {
      uploadPhoto(this.formInline.profile_photo).then(res => {
        this.formInline.profile_photo = res.complete
        this.formInline.photo = val
        const data = {
          image_url1: val,
          image_url2: res.complete
        }
        // 人脸比对
        const url = `https://sms.eloadspider.com/v1/authentication/ht/rf/auth_one_to_one/`
        axios.defaults.headers.common['authorization'] = getToken()
        axios.post(url, data).then(res => {
          console.log(res.data.data.detail, '校验结果')
          const compareResults = res.data.data.detail
          if (compareResults.split('%')[0] > 60) {
            this.formInline.similarity_degree = compareResults
            this.btn = false
            this.$refs.idread.disableImg() // 对比结果上传成功关闭拍照框
          } else {
            this.$message.warning('人脸比对失败！请重新拍照上传')
            this.btn = true
          }
        })
      })
    },
    onSubmit() {
      this.innerDrawer = false
      this.upDataGuestToPms()
      this.guList.unshift(this.formInline)
      this.$store.dispatch('user/setGuestList', this.guList)
    },
    // 读取身份证信息
    readId() {
      readIdCardApi().then(res => {
        const { data } = res
        this.readIdInfo(data.url)
      })
    },
    readIdInfo(url) {
      url = url.replace('angular.callbacks._0', 'userHandler') // 替换
      this.$http.jsonp(url, {
        jsonpCallback: 'userHandler'
      }).then(res => {
        const { Data } = res.body
        if (res.body.Result === true) {
          this.$message.success(Data.Msg)
          const info = {
            user_name: Data.Name,
            sex: Data.Sex,
            birthday: Data.Birthday,
            card_number: Data.Code,
            nation: Data.Nation,
            card_type: '身份证',
            permanent_address: Data.Address,
            profile_photo: 'data:image/png;base64,' + Data.Photo,
            room_number: this.checkinInfo.room_number
          }
          this.formInline = { ...info }
        } else {
          this.$message.warning(res.body.Msg)
        }
      }).catch(() => {
        this.$message.error('本地硬件服务未打开！')
      })
    }
  }
}

</script>
<style lang="scss" scoped>

</style>
