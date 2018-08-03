<template>
  <div class="global-container">

    <div class="sidebar-container">
      <scroll-bar>
        <el-menu
          :default-active="$route.name+$route.path"
          class="el-menu-vertical-demo"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#ffd04b">
          <router-link to="/userList">
            <el-menu-item index="学校用户管理/userList">
              <i class="el-icon-menu"></i>
              <span slot="title">学校用户管理</span>
            </el-menu-item>
          </router-link>
          <router-link to="/accountList">
            <el-menu-item index="账户管理/accountList">
              <i class="el-icon-menu"></i>
              <span slot="title">账户管理</span>
            </el-menu-item>
          </router-link>
          <router-link to="/powerList">
            <el-menu-item index="权限管理/powerList">
              <i class="el-icon-menu"></i>
              <span slot="title">权限管理</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </scroll-bar>
    </div>

    <div class="main-container">
      <div class="main-content">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script>
  import ScrollBar from '@/components/ScrollBar'
  export default {
    components: {
      ScrollBar
    },
    name: 'index'
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .sidebar-container{
    background: #304156;
  }
  .list-add{
    margin-top: 20px;
    text-align: right;
  }
  .list-container{
    margin-top: 20px;
  }
  .main-content{
    padding:20px;
  }
</style>
