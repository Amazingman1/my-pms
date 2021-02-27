<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span slot="footer" class="dialog-footer">
        <div id="qrcode" />
      </span>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.makeCode()
  },
  methods: {
    // 支付码码转为二维码
    makeCode(url) {
      new QRCode(document.getElementById('qrcode'), {
        text: url,
        width: 128,
        height: 128,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    }
  }
}
</script>

<style>

</style>
