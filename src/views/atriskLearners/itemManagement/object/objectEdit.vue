<template>
  <div class="center-content transactor-edit">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">编辑评价对象管理</p>
      <div class="edit-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="项目名称：">
            <span>{{form.project_name}}</span>
          </el-form-item>
          <el-form-item label="项目说明：">
            <span>{{form.project_remark}}</span>
          </el-form-item>
          <el-form-item label="执行人：">
            <span>{{form.teacher_name}}</span>
          </el-form-item>
          <el-form-item label="执行学科：">
            <span>{{form.subject_name}}</span>
          </el-form-item>
          <el-form-item label="执行班级：">
            <span>{{form.g_c_name}}</span>
          </el-form-item>
         <el-form-item label="项目评语：">
            <el-input type="textarea" placeholder='最多输入200个字' :rows="5" v-model="form.project_comment"></el-input>
          </el-form-item>
          <el-form-item>
            <router-link to="/objectList"><el-button>取消</el-button></router-link>
            <el-button @click="saveUser()">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
 import myHeader from '../../myHeader/myHeader'
 import { getObjectDetail, resultsave } from '@/api/eduAdmin'
 export default {
   name: 'transactorEdit',
   data() {
     return {
       form: {
         project_name: '',
         teacher_name: '石选晓',
         project_remark: '0',
         schoolName: '石选晓可代发集齐啊小花',
         g_c_name: '',
         subject_name: '13535790897',
         project_comment: ''
       },
       msg: {
         title1: '评价项目管理',
         title2: '评价对象管理',
         title3: '编辑评价对象管理',
         flag: 2,
         path1: '/itemList',
         path2: '/objectList'
       }
     }
   },
   components: {
     myHeader
   },
   mounted() {
     this.teacher_id = this.$route.query.teacher_id
     this.subject_id = this.$route.query.subject_id
     this.getData()
   },
   methods: {
     getData() {
       const obj = {
         teacher_id: this.teacher_id,
         subject_id: this.subject_id,
         token: localStorage.getItem('TOKEN')
       }
       getObjectDetail(obj)
         .then(res => {
           if (res.hasOwnProperty('response')) {
             console.log(res)
             this.form = res.response.msg
           } else {
             console.log(res.error_response.msg)
           }
         })
         .catch(err => {
           console.log(err)
         })
     },
     saveUser() {
       const obj = {
         teacher_id: this.teacher_id,
         subject_id: this.subject_id,
         project_comment: this.form.project_comment,
         token: localStorage.getItem('TOKEN')
       }
       if (obj.project_comment.length > 200) {
         this.$message.error('字数超过限制')
         return false
       } else {
         resultsave(obj)
           .then(res => {
             if (res.hasOwnProperty('response')) {
               this.$message.success('保存成功')
               this.$router.push({ path: '/objectList' })
             } else {
               this.$message.error(res.error_response.msg)
             }
           })
       }
     }
   }
 }
</script>

<style scoped>

</style>
