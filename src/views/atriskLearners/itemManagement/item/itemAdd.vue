<template>
  <div class="center-content item-Add">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">新增评价项目</p>
        <div class="add-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="项目名称：" id='project-name'>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="项目说明：" id='project-remark'>
            <el-input type="textarea" :rows="10" v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item label="项目状态：">
            <el-dropdown @command="handleCommand" v-if="form.status === 0" trigger="click">
              <el-button>
                启用<i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='a'>停用</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown v-else trigger="click" @command="handleCommand">
              <el-button>
                停用<i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='b'>启用</el-dropdown-item>
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
 import { saveProject } from '@/api/eduAdmin'
 export default {
   name: 'itemAdd',
   data() {
     return {
       form: {
         name: '',
         remark: '',
         status: 1
       },
       msg: {
         title1: '评价项目管理',
         title2: '新增评价项目管理',
         flag: 1,
         path: '/itemList'
       }
     }
   },
   components: {
     myHeader
   },
   methods: {
     handleCommand(command) {
       if (command === 'b') {
         this.form.status = 0
       } else if (command === 'a') {
         this.form.status = 1
       }
     },
     saveUser() {
       const obj = {
         project_name: this.form.name,
         project_remark: this.form.remark,
         school_id: localStorage.getItem('school_id'),
         project_status: this.form.status,
         token: localStorage.getItem('TOKEN')
       }
       saveProject(obj)
         .then(res => {
           console.log(res)
           if (res.hasOwnProperty('response')) {
             this.$router.push({ path: '/itemList' })
           } else {
             this.$message.error(res.error_response.msg)
           }
         })
         .catch(err => {
           console.log(err)
         })
     }
   }
 }
</script>

<style scoped>

</style>
<style type="text/css">
.main-content #project-name .el-input {
  width: 457px;
}
.main-content #project-remark .el-textarea {
  width: 457px;
}
</style>

