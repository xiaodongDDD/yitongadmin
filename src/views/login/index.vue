<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">登录评价管理后台</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
          placeholder="请输入密码"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
           登 录  测试版本号: v1.0.2
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import { setToken } from '@/utils/auth'
import { getLogin, getUserAuth } from '@/api/eduAdmin'

export default {
  name: 'login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePass = (rule, value, callback) => {
    //   if (value.length < 5) {
    //     callback(new Error('密码不能小于5位'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      // loginRules: {
      //   username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      //   password: [{ required: true, trigger: 'blur', validator: validatePass }]
      // },
      loading: false,
      pwdType: 'password',
      powers: ''
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    getPower(obj) {
      getUserAuth(obj).then(res => {
        console.log(res)
        if (res.hasOwnProperty('response')) {
          this.powers = parseInt(res.response.auth_id[0])
        }
      })
    },
    handleLogin() {
      const obj = this.loginForm
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.loading = true
          getLogin(obj).then((res) => {
            // console.log(res)
            if (res.hasOwnProperty('response')) {
              // this.loading = false
              setToken(res.response.token)
              localStorage.setItem('TOKEN', res.response.token)
              localStorage.setItem('teacher_id', res.response.teacher_info.teacher_id)
              localStorage.setItem('teacher_name', res.response.teacher_info.teacher_name)
              const obj1 = {}
              obj1.token = res.response.token
              getUserAuth(obj1).then(result => {
                if (result.hasOwnProperty('response')) {
                  const powers = parseInt(result.response.auth_id[0])
                  if (powers === 1) {
                    this.$router.push({ path: '/userList' })
                  } else if (powers === 2) {
                    this.$router.push({ path: '/accountList' })
                  } else if (powers === 3) {
                    this.$router.push({ path: '/powerList' })
                  } else if (powers === 4) {
                    this.$router.push({ path: '/itemList' })
                  } else if (powers === 5) {
                    this.$router.push({ path: '/officialList' })
                  } else if (powers === 6) {
                    this.$router.push({ path: '/transactorList' })
                  } else if (powers === 7) {
                    this.$router.push({ path: '/objectList' })
                  } else if (powers === 8) {
                    this.$router.push({ path: '/templateList' })
                  } else if (powers === 9) {
                    this.$router.push({ path: '/gainList' })
                  } else if (powers === 10) {
                    this.$router.push({ path: '/logList' })
                  }
                }
              })
            } else {
              this.$alert(res.error_response.msg, '提示', {
                confirmButtonText: '确定'
              })
            }
          }).catch(() => {
            // this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted() {
    console.log(process.env)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
