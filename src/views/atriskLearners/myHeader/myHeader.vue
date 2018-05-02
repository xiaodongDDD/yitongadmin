<template>
  <el-menu class="navbar" mode="horizontal">
    <!--<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>-->
    <div class="icon-div">
      <span></span><span></span><span></span>
    </div>
    <el-breadcrumb v-if='msg.flag == 1' class="header-bread" separator="/">
      <el-breadcrumb-item class="link-item" :to="{ path: msg.path }">{{ msg.title1 }}</el-breadcrumb-item>
      <el-breadcrumb-item class="step-item">{{ msg.title2 }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb v-if='msg.flag == 0' class="header-bread" separator="/">
      <el-breadcrumb-item class="link-item">{{ msg.title1 }}</el-breadcrumb-item>
    </el-breadcrumb>
     <el-breadcrumb v-if='msg.flag == 2' class="header-bread" separator="/">
      <el-breadcrumb-item class="link-item" :to="{ path: msg.path1 }">{{ msg.title1 }}</el-breadcrumb-item>
      <el-breadcrumb-item class="step-item" :to="{ path: msg.path2 }">{{ msg.title2 }}</el-breadcrumb-item>
      <el-breadcrumb-item class="step-item">{{ msg.title3 }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand" class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="../../../assets/images/64451924_p3.jpg">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item command='a'>首页</el-dropdown-item>
        <el-dropdown-item command='b'>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import { removeToken } from '@/utils/auth.js'
  import Hamburger from '@/components/Hamburger'
  export default {
    name: 'myHeader',
    props: ['msg'],
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    components: {
      Breadcrumb,
      Hamburger
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      },
      handleCommand(command) {
        if (command === 'b') {
          removeToken()
          this.$router.push({ path: '/login' })
        } else if (command === 'a') {
          this.$router.push({ path: '/' })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 40px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .header-bread{
    display: inline-block;
    margin-left:15px;
  }
  .navbar .avatar-container .avatar-wrapper .el-icon-caret-bottom{
    top: 16px;
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .icon-div{
    float: left;
    margin-left: 17px;
    line-height: 57px;
    height: 50px;

    span{
      display: inline-block;
      width: 3px;
      height: 24px;
      background: #303133;
      margin-left: 3px;
    }
  }
</style>
