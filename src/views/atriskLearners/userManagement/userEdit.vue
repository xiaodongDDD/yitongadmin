<template>
  <div class="user-edit center-content">
    <p class="position">编辑学校用户</p>

    <div class="edit-form">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="学校名称：">
          <!--<el-input v-model="form.name"></el-input>-->
          <span>{{form.name}}</span>
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
          <router-link to="/userList"><el-button>取消</el-button></router-link>
          <el-button @click="saveUser()">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'userEdit',
    data() {
      return {
        form: {
          name: '武宁路小学',
          official: '石选晓',
          status: 'on',
          telephone: '13535790897'
        }
      }
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
