<template>
  <div class="center-content power=edit">
    <div  class="title">编辑权限管理</div>

    <div class="edit-form">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="姓名：">
          <span>{{form.name}}</span>
        </el-form-item>
        <el-form-item label="类型：">
          <span v-if="form.type == 0">学校</span>
          <span v-else>运营</span>
        </el-form-item>
        <el-form-item label="学校：">
          <span>{{form.schoolName}}</span>
        </el-form-item>
        <el-form-item label="手机号：">
          <span>{{form.telephone}}</span>
        </el-form-item>

        <el-form-item label="菜单：" prop="powerlist">
          <el-checkbox-group v-model="form.powerlist">
            <el-checkbox label="学校用户管理" name="powerlist"></el-checkbox>
            <el-checkbox label="账户管理" name="powerlist"></el-checkbox>
            <el-checkbox label="权限管理" name="powerlist"></el-checkbox>
            <el-checkbox label="评价项目管理" name="powerlist"></el-checkbox>
            <el-checkbox label="评价模板管理" name="powerlist"></el-checkbox>
            <el-checkbox label="评价成果" name="powerlist"></el-checkbox>
            <el-checkbox label="操作日志" name="powerlist"></el-checkbox>
          </el-checkbox-group>
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
    name: 'powerEdit',
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
        this.$router.push({ path: '/userList' })
        console.log(this.form.powerlist)
      }
    }
  }
</script>

<style scoped>
.title {
  margin-bottom: 30px;
}
</style>
