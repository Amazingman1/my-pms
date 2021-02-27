<template>
  <div class="title">
    <span>{{ format(dateNow, '{y}-{m}-{d}') }}</span>
    <span>{{ format(dateNow, '{a}') }}</span>
    <!-- <span>早班</span> -->
    <span>{{ format(dateNow, '{h}:{i}') }}</span>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'

export default {
  data() {
    return {
      dateNow: new Date(),
      timeName: null
    }
  },
  created() {
    this.getTime()
  },
  beforeDestroy() {
    clearInterval(this.timeName)
    this.timeName = null
  },
  methods: {
    format(time, config) {
      return parseTime(time, config)
    },
    getTime() {
      this.timeName = setInterval(() => {
        this.dateNow = new Date()
      }, 60000)
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  font-size: 14px;
  color: #333333;
}
</style>
