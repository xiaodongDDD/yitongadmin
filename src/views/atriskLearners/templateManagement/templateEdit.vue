<template>
  <div class="center-content template-edit">
    <p class="position">编辑评价模板</p>

    <div class="edit-form">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="模板名称：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="评价维度：">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item>
          <router-link to="/accountList"><el-button>取消</el-button></router-link>
          <el-button @click="saveUser()">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'templateEdit',
    data() {
      return {
        form: {
          name: '2018年第一学期语文所有学生补差',
          schoolName: '武宁路小学',
          userName: 'shixiuan',
          type: '成绩',
          telephone: '13535790897',
          email: '134752398@348.cn',
          status: 0
        }
      }
    },
    methods: {
      saveUser() {
        this.$router.push({ path: '/accountList' })
      }
    }
  }
</script>

<style scoped>

</style>
