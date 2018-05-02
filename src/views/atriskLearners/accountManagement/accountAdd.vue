<template>
  <div class="center-content account-add">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">新增账户</p>
      <div class="edit-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="类型：">
            <!--<el-input v-model="form.type"></el-input>-->
            <span v-if="form.type == 0"> 学校   {{form.schoolName}}</span>
            <span v-else>运营</span>
          </el-form-item>

          <el-form-item label="姓名：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="form.telephone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="账户状态：">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option label="启用" value="on"></el-option>
              <el-option label="停用" value="off"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <router-link to="/accountList"><el-button>取消</el-button></router-link>
            <el-button @click="saveUser">保存,去设置权限</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  export default {
    name: 'accountAdd',
    data() {
      return {
        form: {
          type: 0,
          schoolName: '无盈利瑟瑟发抖小学',
          name: '石选晓',
          userName: 'shixuanxiao',
          email: 'lfdlfejdfkaj@190.com',
          status: 'off',
          telephone: '13535790897'
        },
        msg: {
          title1: '账户管理',
          title2: '新增账户',
          flag: 1,
          path: '/accountList'
        }
      }
    },
    components: {
      myHeader
    },
    methods: {
      saveUser() {
        this.$router.push({ path: '/powerEdit' })
      }
    }
  }
</script>

<style scoped>

</style>
