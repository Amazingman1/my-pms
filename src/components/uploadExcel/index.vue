<template>
  <div>
    <input ref="excel-upload-input" class="excel-upload-input" type="file" name="param" accept=".xlsx, .xls" @change="handleClick">
    <el-button :loading="loading" size="mini" type="primary" icon="el-icon-upload2" @click="handleUpload">
      导入
    </el-button>
  </div>
</template>

<script>

export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onUploadFile: Function, // eslint-disable-line
    uploadLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      excelData: {
        header: null,
        results: null
      }
    }
  },
  computed: {
    loading: {
      get() {
        return this.uploadLoading
      },
      set(val) {
        this.$emit('update:uploadLoading', val)
      }
    }
  },
  methods: {
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel

      if (!this.beforeUpload) {
        this.uploadFile(rawFile)
        return
      }
      const before = this.beforeUpload()
      if (before) {
        this.uploadFile(rawFile)
      }
    },
    uploadFile(rawFile) {
      this.onUploadFile(rawFile)
    }
  }
}
</script>

<style scoped>
.excel-upload-input{
  display: none;
  z-index: -9999;
}
.drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
