<template>
  <div class="user-add center-content">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">新增学校用户</p>
      <div class="edit-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="学校名称：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="管理员：">
            <span>{{form.official}}</span>
          </el-form-item>
          <el-form-item label="手机号：">
            <span>{{form.telephone}}</span>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option label="启用" value="on"></el-option>
              <el-option label="停用" value="off"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <router-link to="userList"><el-button>取消</el-button></router-link>
            <el-button @click="saveUser">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  export default {
    name: 'userAdd',
    data() {
      return {
        form: {
          name: '',
          official: '石选晓',
          status: 'off',
          telephone: '13535790897'
        },
        msg: {
          title1: '学校用户管理',
          title2: '新增学校用户',
          flag: 1,
          path: '/userList'
        },
      }
    },
    components: {
      myHeader
    },  
    methods: {
      saveUser() {
        this.$router.push({ path: '/userList' })
      }
    }
  }
</script>

<style scoped>

</style>
