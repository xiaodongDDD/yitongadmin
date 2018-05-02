<template>
  <div class="education-container">
    <div class="sidebar-container">
     <scroll-bar>
      <el-menu
        :default-active="$route.name+$route.path"
        @select= "changeindex"
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
        <router-link to="/itemList">
          <el-submenu index="评价项目管理/itemList">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>评价项目管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/officialList"><el-menu-item index="负责人管理/officialList">负责人管理</el-menu-item></router-link>
              <router-link to="/transactorList"><el-menu-item index="执行人管理/transactorList">执行人管理</el-menu-item></router-link>
              <router-link to="/objectList"><el-menu-item index="评价对象管理/objectList">评价对象管理</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
        </router-link>
        <router-link to="/templateList">
          <el-menu-item index="评价模板管理/templateList">
            <i class="el-icon-menu"></i>
            <span slot="title">评价模板管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/gainList">
          <el-menu-item index="评价成果/gainList">
            <i class="el-icon-menu"></i>
            <span slot="title">评价成果</span>
          </el-menu-item>
        </router-link>
        <router-link to="/logList">
          <el-menu-item index="操作日志/logList">
            <i class="el-icon-menu"></i>
            <span slot="title">操作日志</span>
          </el-menu-item>
        </router-link>
      </el-menu>
     </scroll-bar>
    </div>

    <div class="main-container">
      <div class="main-content">
        <router-view>
        </router-view>
      </div>

    </div>
  </div>
</template>

<script>
  import ScrollBar from '@/components/ScrollBar'
  import myHeader from './myHeader/myHeader'
  export default {
    name: 'index',
    data() {
      return {
        index: '',
        msg: {
          title1: '',
          title2: '',
          path: ''
        },
        flag: 0
      }
    },
    mounted() {
      console.log(this.$router.history.current.fullPath)
      this.index = this.$router.history.current.fullPath
      this.msg.title1 = this.$route.name
    },
    components: {
      myHeader,
      ScrollBar
    },
    methods: {
      changeindex(index, indexPath) {
        console.log(index)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .sidebar-container{
    background: #304156;
  }

  .main-content{
    padding:5px 0px 20px 0px;
    .edit-form{
      margin-top: 30px;
      /*width: 50%;*/
      span{
        color: #606266;
        font-size: 14px;
      }

      .el-input{
        width: 43%;
      }
    }
    .content-detail{
      padding:10px 20px;
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
      margin-top: 20px;
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

  .function-btns{
    text-align: right;

    .el-button--text{
      color: #666;
      margin-left: 15px;
      font-size: 16px;
    }
  }
  .big-label{
    /*min-width: 100px;*/
    text-indent: 30px;
  }
</style>
