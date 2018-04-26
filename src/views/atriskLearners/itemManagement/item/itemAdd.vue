<template>
  <div class="center-content item-Add">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">新增评价项目</p>
        <div class="add-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="项目名称：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="项目说明：">
            <el-input type="textarea" :rows="10" v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="项目状态：">
            <el-dropdown v-if="form.status === 0" trigger="click">
              <el-button>
                启用<i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>停用</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown v-else trigger="click">
              <el-button>
                停用<i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>启用</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item>
            <router-link to="/itmeList"><el-button>取消</el-button></router-link>
            <el-button @click="saveUser()">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import myHeader from '../../myHeader/myHeader'
  export default {
    name: 'itemAdd',
    data() {
      return {
        form: {
          name: '石选晓',
          schoolName: '武宁路小学',
          userName: 'shixiuan',
          type: '0',
          telephone: '13535790897',
          email: '134752398@348.cn',
          status: 0
        },
        msg: {
          title1: '评价项目管理',
          title2: '新增评价项目管理',
          flag: 1,
          path: '/itemList'
        },
      }
    },
     components: {
      myHeader
    },    
    methods: {
      saveUser() {
        this.$router.push({ path: '/itmeList' })
      }
    }
  }
</script>

<style scoped>

</style>

