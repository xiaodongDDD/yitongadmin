<template>
  <el-menu class="navbar" mode="horizontal">
    <!--<hamburger class="hamburger-container"></hamburger>-->

    <el-breadcrumb class="header-bread" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">学校用户管理</el-breadcrumb-item>
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
  export default {
    name: 'myHeader',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      },
      handleCommand(command) {
        console.log(1111)
        console.log(command)
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
  }
  .navbar .avatar-container .avatar-wrapper .el-icon-caret-bottom{
    top: 16px;
  }
</style>
