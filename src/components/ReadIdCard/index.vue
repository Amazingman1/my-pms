<!--
 * @Author: wangxuan
 * @Date: 2020-11-11 14:49:59
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-11-11 17:22:48
 * @FilePath: /vue-misb/src/components/ReadIdCard/index.vue
-->
<template>
  <div />
</template>

<script>
import { readIdApi } from '@/api/readId'
import axios from 'axios'
import { readIdCardApi } from '@/api/card'

export default {
  methods: {
    ReadIdCard(params) {
      readIdApi().then(res => {
        const { data } = res
        if (res.message === 'success') {
          if (data.type === 1 && data.url) {
            axios.get(data.url).then(response => {
              const { data } = response
              this.$emit('IdInfo', data.data)
            })
          } else if (data.type === 0 && data.url) {
            this.readId()
          }
        } else {
          this.$message.error(res.message)
        }
      })
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
            name: Data.Name,
            sex: Data.Sex,
            birthday: Data.Birthday,
            idcardno: Data.Code,
            nation: Data.Nation,
            permanent_address: Data.Address,
            photo: 'data:image/png;base64,' + Data.Photo
          }
          this.$emit('IdInfo', info)
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

