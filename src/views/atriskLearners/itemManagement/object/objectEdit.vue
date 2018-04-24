<template>
  <div class="center-content transactor-edit">
    <p class="position">编辑权限管理</p>

    <div class="edit-form">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="项目名称：">
          <span>{{form.name}}</span>
        </el-form-item>
        <el-form-item label="项目说明：">
          <span v-if="form.type == 0">学校</span>
          <span v-else>运营</span>
        </el-form-item>
        <el-form-item label="执行人：">
          <span>{{form.schoolName}}</span>
        </el-form-item>
        <el-form-item label="执行学科：">
          <span>{{form.telephone}}</span>
        </el-form-item>
        <el-form-item label="执行班级：">
          <span>{{form.telephone}}</span>
        </el-form-item>
       <el-form-item label="项目评语：">
          <el-input type="textarea" :rows="5" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <router-link to="/powerList"><el-button>取消</el-button></router-link>
          <el-button @click="saveUser()">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'transactorEdit',
    data() {
      return {
        form: {
          name: '石选晓',
          type: 0,
          schoolName: '石选晓可代发集齐啊小花',
          status: 'on',
          telephone: '13535790897',
          powerlist: ['学校用户管理']
        }
      }
    },
    methods: {
      saveUser() {
        this.$router.push({ path: '/objectList' })
      }
    }
  }
</script>

<style scoped>

</style>
