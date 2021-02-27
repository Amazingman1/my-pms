<template>
  <div class="login">
    <div class="input">
      <div style="">
        <span class="img_logo" />
        <span style="font-size:28px;float: left;">｜ 商务版PMS</span>
      </div>
      <div class="conten">
        <div class="img">
          <img style="width:100%;height:100%" src="https://ispider-oss.oss-cn-hangzhou.aliyuncs.com/group_logo/%E5%9B%BE%E5%B1%82%202%402x%202.png" alt="">
        </div>
        <div class="form">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            size="mini"
            style="background: #fff;padding: 29px;"
          >
            <h5>用户登录</h5>
            <el-form-item>
              <el-input
                ref="code"
                v-model="loginForm.code"
                prefix-icon="el-icon-s-cooperation"
                placeholder="请输入集团码"
                type="text"
                tabindex="1"
              />
            </el-form-item>
            <el-form-item prop="username">
              <el-input
                ref="username"
                v-model="loginForm.username"
                prefix-icon="el-icon-s-custom"
                placeholder="请输入用户名"
                type="text"
                tabindex="1"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                placeholder="请输密码"
                show-password
                :type="passwordType"
                tabindex="2"
                @keyup.enter.native="handleLogin"
              >
                <svg-icon slot="prefix" icon-class="password" />
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width: 100%;"
                :loading="loading"
                @click.native.prevent="handleLogin"
              >登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style="font-size:14px;text-align:center;margin-top:68px;color:rgba(51,51,51,1);">
        <span>云闪住科技开发（上海）有限公司</span>
        <span style="padding:0 10px">|</span>
        <span>关注我们</span>
      </div>
    </div>
  </div>
</template>

<script>
import crypto from 'crypto'
import { getStorage, setStorage } from '@/utils/authCopy'

const logo = require('@/assets/image/颐陆智住logo.png')
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('请输入不少于3位数密码！'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: process.env.NODE_ENV === 'development' ? 'zpj' : '',
        password: process.env.NODE_ENV === 'development' ? '123456' : '',
        code: process.env.NODE_ENV === 'development' ? '515' : (getStorage('hotelCode') ? getStorage('hotelCode') : '')
      },
      logo: logo,
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名！' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    getmd5(pwd) {
      var md5 = crypto.createHash('md5')
      md5.update(pwd)
      var password = md5.digest('hex')
      return password
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', {
            code: this.loginForm.code.toUpperCase(),
            user_name: this.loginForm.username,
            password: this.getmd5(this.loginForm.password)
          }).then(() => {
            // 登陆跳转至首页
            this.$router.push({ path: '/' })
            this.loading = false
            setStorage('hotelCode', this.loginForm.code.toUpperCase())
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  position: relative;
  background-color: #fff;
  .input{
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translateX(-50%) translateY(30%);
   .img_logo{
     background-image: url('../../assets/image/颐陆智住logo.png');
      display: block;
      height: 30px;
      background-size: contain;
      background-repeat: no-repeat;
      float: left;
      width: 100px;
   }
  }
  .conten{
    overflow: hidden;
    margin-top:40px;
    width: 732px;
    .form{
      width: 366px;
      float:right;
      padding:20px;
      background: #f8f8f8;
      h5{
        font-size:18px;
      }
    }
    .img{
      float: left;
      width: 366px;
      height: 366px;
    }
  }
}

</style>
