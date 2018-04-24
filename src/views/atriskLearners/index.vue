<template>
  <div class="education-container">
    <div class="sidebar-container">

      <el-menu
        :default-active="index"
        @select= "changeindex"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#ffd04b">
        <router-link to="/userList">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">学校用户管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/accountList">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">账户管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/powerList">
          <el-menu-item index="3" disabled>
            <i class="el-icon-menu"></i>
            <span slot="title">权限管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/itemList">
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>评价项目管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/officialList"><el-menu-item index="4-1-1">负责人管理</el-menu-item></router-link>
              <router-link to="/transactorList"><el-menu-item index="4-1-2">执行人管理</el-menu-item></router-link>
              <router-link to="/objectList"><el-menu-item index="4-1-3">评价对象管理</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
        </router-link>
        <router-link to="/templateList">
          <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">评价模板管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/gainList">
          <el-menu-item index="6">
            <i class="el-icon-menu"></i>
            <span slot="title">评价成果</span>
          </el-menu-item>
        </router-link>
        <router-link to="/logList">
          <el-menu-item index="7">
            <i class="el-icon-menu"></i>
            <span slot="title">操作日志</span>
          </el-menu-item>
        </router-link>
      </el-menu>

    </div>

    <div class="main-container">
      <my-header></my-header>
      <div class="main-content">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script>
  import myHeader from './myHeader/myHeader'
  export default {
    name: 'index',
    data() {
      return {
        index: ''
      }
    },
    components: {
      myHeader
    },
    mounted() {
      let routerIndex = localStorage.getItem("routerIndex")
      console.log(routerIndex)
      this.index = routerIndex
    },
    methods: {
      changeindex(index) {
        console.log(index)
        localStorage.removeItem("routerIndex")
        localStorage.setItem("routerIndex", index)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .sidebar-container{
    background: #304156;
  }

  .main-content{
    padding: 20px 30px;

    .edit-form{
      margin-top: 30px;
      width: 50%;

      span{
        color: #606266;
      }
    }
  }

  .search-contaier{
    text-align: right;

    .search-icon{
      position: absolute;
      top: 11px;
      right: 10px;
      color: #dcdfe6;
      font-size: 16px;
    }
  }

  .list-add{
    margin-top: 20px;
  }

  .center-content{

    .position{
      color: #333;
      text-indent: 18px;
    }
  }

  .el-form-item__label, .el-menu-item-group__title{
    padding: 0;
  }
  .dialogContent{
    text-align: center;
  }
  .el-checkbox+.el-checkbox{
    display: block;
    margin-left: 0;
  }
</style>
