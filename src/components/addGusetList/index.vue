<template>
  <el-dialog
    title="证件登记"
    direction="ltr"
    :visible.sync="innerDrawer"
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <!-- <el-table-column
        type="index"
        label="序号"
      />
      <el-table-column
        prop="user_name"
        label="姓名"
      />
      <el-table-column
        prop="sex"
        label="性别"
      /> -->
      <el-table-column
        type="index"
        label="序号"
      />
      <el-table-column
        prop="uploaded_time"
        label="上传时间"
      />
      <el-table-column
        prop="name"
        width="70"
        label="姓名"
      />
      <el-table-column
        prop="gender"
        width="50"
        label="性别"
      />
      <el-table-column
        prop="id_no"
        label="证件号"
      />
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="checkOutPolice(scope.row)">退 房</el-button>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="cansleDlo">取 消</el-button>
      <!-- <el-button v-show="addBtn && judgAddBtn()" size="mini" type="primary" @click="foto">增 加</el-button>foto -->
      <el-button v-show="addBtn && judgAddBtn()" size="mini" type="primary" @click="hasCard('haveCard')">有证核验</el-button>
      <el-button v-show="addBtn && judgAddBtn()" size="mini" type="primary" @click="hasCard('noCard')">无证核验</el-button>
      <!-- <el-button v-show="addBtn && judgAddBtn()" size="mini" type="primary" @click="foto">无证核验</el-button> -->
      <!-- <el-button size="mini" type="primary" @click="uploadPolice">上传公安</el-button> -->
    </span>
    <idRead ref="idread" />
    <checkGuest ref="checkGuest" :title="title" @rushList="getUploadRec" />
  </el-dialog>
</template>
<script>
import idRead from '@/components/idRead/index'
import checkGuest from '@/components/checkGuest'
import { mapGetters } from 'vuex'
import axios from 'axios'
import g_localStorage from '@/utils/saveLogal'
import { getToken } from '@/utils/auth'
import { checkOutPoliceApi, getUploadRecApi } from '@/api/pmsb'

export default {
  components: { idRead, checkGuest },
  props: {
    upType: {
      type: String,
      default: 'list'
    }
  },
  data() {
    return {
      title: '',
      tableData: [],
      innerDrawer: false,
      addBtn: false,
      compareResults: '', // 人脸比对结果
      Police_Devices_Code: '', // 设备号
      hotleId: g_localStorage.getItem('hotel_id')
    }
  },
  computed: {
    ...mapGetters([
      'guestlist',
      'psonInfo',
      'checkinInfo'
    ])
  },
  destroyed() {
    this.$store.dispatch('user/setGuestList', [])
  },
  methods: {
    // 2020-8-31 pmsb 退房
    checkOutPolice(row) {
      const data = {
        uploaded_time: row.uploaded_time,
        is_domestic: row.visa_no ? 'true' : 'false',
        id_no: row.id_no,
        hotel_id: this.hotleId,
        room_no: row.room_no
      }
      checkOutPoliceApi(data).then(res => {
        console.log('pmsb退房', res)
        this.$message.success('退房成功！')
        this.getUploadRec()
      })
    },
    // 2020-8-31 pmsb 上传记录
    getUploadRec() {
      getUploadRecApi({ hotel_id: this.hotleId, value_type: 3, value: this.checkinInfo.room_number }).then(res => {
        console.log('上传记录', res)
        this.tableData = res.data.items
      })
    },
    // 判断添加人数
    judgAddBtn() {
      if (this.upType === 'list' && this.guestlist.length <= 1) { // 只能添加一人
        return true
      } else if (this.upType === 'one' && this.guestlist.length <= 1) {
        return true
      } else {
        return false
      }
    },
    hasCard(val) {
      this.title = val
      this.$refs.checkGuest.show()
    },
    show() {
      this.innerDrawer = true
      if (this.tableData.length <= 0) {
        this.addBtn = true
      }
    },
    foto() {
      this.$refs.idread.show()
    },
    cansleDlo() {
      this.innerDrawer = false
      this.formInline = {}
    },
    deleteRow(val, index) {
      this.guestlist.splice(index, 1)
      this.$store.dispatch('user/setGuestList', this.guestlist)
    },
    // 字段替换
    replaceStr(arr) {
      const _arr = []
      arr.map(p => {
        const obj = {
          name: p.user_name,
          id_code: p.card_type,
          id_no: p.card_number,
          sex: p.sex,
          birth: p.birthday,
          address: p.permanent_address,
          card_type: p.card_type === '01' ? '身份证' : ''
        }
        _arr.push(obj)
      })
      return _arr
    },
    // 上传公安
    uploadPolice() {
      // 先获取酒店设备号
      this.getDeviceCode()
    },
    // 上传信息 val:: 上传公安设备号
    updataInfo(val) {
      const url = `https://organ.crowncrystalhotel.com/v1/organization/ht/public_security/submit_check_in_with_list/`
      const data = {
        is_device: false, // pms系统调用公安接口参数
        device_code: val, // 设备号
        guest_array: this.guestlist
      }
      axios.defaults.headers.common['authorization'] = getToken()
      axios.post(url, data).then(res => {
        this.innerDrawer = false
      })
    },
    // 获取酒店设备码
    getDeviceCode() {
      const ur = `http://machine.crowncrystalhotel.com/v1/manager_front/get_hotel_settings_list/`
      const params = {
        param_type__in: 10,
        page_size: 200,
        param_id_str: 'Police_Devices_Code'
      }
      axios.defaults.headers.common['authorization'] = getToken()
      axios.get(ur, { params }).then(res => {
        const arr = res.data.data.results
        this.Police_Devices_Code = arr[0].param_value
        if (this.psonInfo.id_no) {
          this.addLiveWithUpPolice(this.Police_Devices_Code)
        } else {
          this.updataInfo(this.Police_Devices_Code)
        }
      })
    },
    // 添加同住人上传公安
    addLiveWithUpPolice(val) {
      const url = `https://organ.crowncrystalhotel.com/v1/organization/ht/public_security/factory_submit_check_add/`
      axios.defaults.headers.common['authorization'] = getToken()
      const obj = {
        original_card_type: this.psonInfo.id_code,
        original_card_number: this.psonInfo.id_no
      }
      const data = {
        is_device: false, // pms系统调用公安接口参数
        device_code: val, // 设备号
        ...obj,
        ...this.guestlist[0]
      }
      axios.post(url, data).then(res => {
        if (res.message === 'success') {
          this.innerDrawer = false
        }
      })
    }

  }
}

</script>
<style lang="scss" scoped>

</style>
