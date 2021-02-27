<template>
  <el-dialog
    title="拍照"
    direction="ltr"
    :visible.sync="innerDrawer"
    width="23%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    append-to-body
    @opened="showQRcode"
  >
    <div class="camera_outer">
      <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay />
      <canvas id="canvasCamera" ref="canvasCamera" style="display:none;" :width="videoWidth" :height="videoHeight" />
      <div v-if="imgSrc" class="img_bg_camera">
        <img :src="imgSrc" alt="" class="tx_img">
      </div>
      <div class="btn_camera">
        <el-button size="mini" type="warning" @click="setImage">拍 照</el-button>
        <el-button size="mini" type="warning" @click="disableImg">取 消</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { uploadPhoto } from '@/utils/index'

export default {
  data() {
    return {
      videoWidth: 410,
      videoHeight: 410,
      imgSrc: '',
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      innerDrawer: false
    }
  },
  methods: {
    show() {
      this.innerDrawer = true
      this.imgSrc = ''
    },
    showQRcode() {
      this.imgSrc = ''
      this.getCompetence()
    },
    disableImg() {
      this.innerDrawer = false
      this.imgSrc = ''
      this.stopNavigator()
    },
    /*
     *@function  调用权限
     *****************************************/
    getCompetence() {
      var _this = this
      this.thisCancas = this.$refs.canvasCamera
      this.thisContext = this.thisCancas.getContext('2d')
      this.thisVideo = document.getElementById('videoCamera')
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      var constraints = { audio: false, video: { width: this.videoWidth, height: this.videoHeight, transform: 'scaleX(-1)' }}
      navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        // 旧的浏览器可能没有srcObject
        if ('srcObject' in _this.thisVideo) {
          _this.thisVideo.srcObject = stream
        } else {
          // 避免在新的浏览器中使用它，因为它正在被弃用。
          _this.thisVideo.src = window.URL.createObjectURL(stream)
        }
        _this.thisVideo.onloadedmetadata = function(e) {
          _this.thisVideo.play()
        }
      })
    },
    // 绘制图片
    setImage() {
      var _this = this
      // 点击，canvas画图
      _this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight)
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL('image/png')
      _this.imgSrc = image
      this.stopNavigator()
      this.$emit('base64', _this.imgSrc)
      uploadPhoto(_this.imgSrc).then(res => {
        this.$emit('getPhotoBasce64', res.complete)
        this.disableImg()
      })
    },
    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop()
    }
  }
}

</script>
<style lang="scss" scoped>
.camera_outer{
  position: relative;
  overflow: hidden;
  background-size: 100%;
  video,canvas,.tx_img{
    -moz-transform:scaleX(-1);
    -webkit-transform:scaleX(-1);
    -o-transform:scaleX(-1);
    transform:scaleX(-1);
  }
  .btn_camera{
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    height: 50px;
    background-color: rgba(0,0,0,0.3);
    line-height: 50px;
    text-align: center;
    color: #ffffff;
  }
  .bg_r_img{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }
  .img_bg_camera{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    img{
      width: 100%;
      height: 100%;
    }
    .img_btn_camera{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: rgba(0,0,0,0.3);
      color: #ffffff;
      .loding_img{
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>
