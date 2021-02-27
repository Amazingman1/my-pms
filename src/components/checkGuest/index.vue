<template>
  <el-dialog
    :title="title === 'haveCard'? '有证核验':'无证核验'"
    :visible.sync="dialogVisible"
    width="50%"
    :append-to-body="true"
  >
    <div class="coment">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="境内" name="first">
          <idcard v-if="title ==='noCard'" :form-inline="formInline" :get-base64="base64" />
          <territory v-else :form-inline="formInline" />
        </el-tab-pane>
        <el-tab-pane v-if="title === 'haveCard'" label="境外" name="second">
          <abroad ref="abroad" :form-outline.sync="formOutline" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      <el-button v-show="!formInline.profile_photo" type="primary" size="mini" @click="readId">读 证</el-button>
      <!-- <el-button v-show="formInline.profile_photo && activeName === 'first'" type="primary" size="mini" @click="foto">拍 照</el-button> -->
      <el-button v-show="activeName === 'first'" type="primary" size="mini" @click="foto">拍 照</el-button>
      <el-button size="mini" :disabled="btn" type="primary" @click="activeName === 'first' ? onSubmit(): checkinAbroad()">确 定</el-button>
    </span>
    <takePhoto ref="idread" @getPhotoBasce64="getImg" @base64="getBase64" />
  </el-dialog>
</template>

<script>
import abroad from './components/abroad'
import territory from './components/territory'
import idcard from './components/idcard'
import { readIdCardApi } from '@/api/card'
import takePhoto from '@/components/takePhoto/index'
import { uploadPhoto } from '@/utils/index'
import { getToken } from '@/utils/auth'
import { upnatePolice } from '@/api/pmsb'
import { mapGetters } from 'vuex'
import g_localStorage from '@/utils/saveLogal'
// import { addMasterGuestApi } from '@/api/checkin'

import axios from 'axios'
export default {
  components: { abroad, territory, idcard, takePhoto },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      activeName: 'first',
      formInline: {
        user_name: '',
        sex: '',
        birthday: '',
        card_number: '',
        nation: '',
        card_type: '',
        permanent_address: '',
        profile_photo: ``,
        room_number: ''
      },
      formOutline: {
        name: '',
        sex: '',
        birth: '',
        id_no: '',
        phone: '',
        room_no: '',
        nationality: '', // 国籍
        entry_date: '', // 入境日期
        entry_port: '', // 入境口岸
        leave_time: '', // 离境日期
        visa_no: '', // 签证号
        visa_type: '', // 签证类型
        id_type: '', // 证件类型
        is_domestic: 'false',
        operator_name: '田泽英'
      },
      base64: ``,
      btn: false
    }
  },
  computed: {
    ...mapGetters([
      'checkinInfo',
      'guestlist'
    ])
  },
  methods: {
    // 读取身份证信息
    readId() {
      readIdCardApi().then(res => {
        const { data } = res
        console.log(data, '2323')
        this.readIdInfo(data.url)
      })
    },
    foto() {
      this.$refs.idread.show()
    },
    readIdInfo(url) {
      url = url.replace('angular.callbacks._0', 'userHandler') // 替换
      this.$http.jsonp(url, {
        jsonpCallback: 'userHandler'
      }).then(res => {
        const { Data } = res.body
        console.log(Data, '请求结果')

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
    },
    // 获取拍照的banse64 图片
    getBase64(val) {
      console.log(val, '拍照获取的Base64')
      this.base64 = val
    },
    getImg(val) {
      // this.validPhoto(val)
    },
    validPhoto(val) {
      console.log(val, '证件照上传结果')
      console.log(this.formInline.profile_photo, 'formInline')
      uploadPhoto(this.formInline.profile_photo).then(res => {
        console.log(res, '证件照上传结果')
        this.formInline.profile_photo = res.complete
        this.formInline.photo = val
        const data = {
          image_url1: val,
          image_url2: res.complete
        }
        // 人脸比对
        const url = `https://sms.eloadspider.com/v1/authentication/ht/rf/auth_one_to_one/`
        console.log(getToken(), 'token')
        axios.defaults.headers['authorization'] = getToken()
        axios.post(url, data).then(res => {
          console.log(res, '校验结果')
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
      console.log(this.checkinInfo, '在住单详情')
      const data = {
        room_no: this.checkinInfo.room_number,
        name: this.formInline.user_name,
        sex: this.formInline.sex,
        ethnicity: '汉族',
        id_no: this.formInline.card_number,
        birth: this.formInline.birthday,
        pic_photo: `https://ispider-oss.oss-cn-hangzhou.aliyuncs.com/icon/d5d0bd42.png`,
        pic_now: `https://ispider-oss.oss-cn-hangzhou.aliyuncs.com/icon/75c22184.png`,
        bill_no: this.checkinInfo.order_no,
        hotel_id: g_localStorage.getItem('hotel_id'),
        checkin_type: this.checkinInfo.master_type,
        checkout_time: this.checkinInfo.leave_time,
        operator_name: '田泽英',
        home: this.formInline.permanent_address,
        pic_photo64: this.formInline.profile_photo,
        pic_now64: this.base64,
        is_domestic: 'true'
      }
      upnatePolice(data).then(res => {
        this.dialogVisible = false
        // 上传成功刷新列表
        this.$emit('rushList')
      })
    },
    // 境外入住
    checkinAbroad() {
      const data = {
        checkin_type: this.checkinInfo.master_type,
        hotel_id: g_localStorage.getItem('hotel_id'),
        bill_no: this.checkinInfo.order_no,
        checkout_time: this.checkinInfo.leave_time,
        room_no: this.checkinInfo.room_number
      }
      console.log({ ...data, ...this.formOutline }, '境外入住')
      upnatePolice({ ...data, ...this.formOutline }).then(res => {
        this.dialogVisible = false
        // 上传成功刷新列表
        this.$emit('rushList')
      })
    },
    handleClick(tab, event) {
      if (tab.label === '境外') {
        this.formOutline.room_no = this.checkinInfo.room_number
      } else {
        this.formInline.room_number = this.checkinInfo.room_number
      }
    },
    show() {
      this.dialogVisible = true
      this.formInline.room_number = this.checkinInfo.room_number
    }
  }
}
</script>

<style>

</style>
