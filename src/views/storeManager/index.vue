<template>
  <div>
    <el-button size="mini" type="primary" @click="go">跳 转</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      opts: {
        origin: 'http://localhost:8080',
        login_path: '/login.html',
        path: '/'
      }
    }
  },
  methods: {
    go() {
      window.location.href = `http://www.eloadspider.com/erp/#/roomSetting?index=4`
    }
  }
}
</script>

<style>

</style>
