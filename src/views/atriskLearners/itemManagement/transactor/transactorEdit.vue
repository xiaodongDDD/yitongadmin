<template>
  <div class="center-content transactor-edit">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">编辑执行人管理</p>
      <div class="edit-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="项目名称：">
            <span>{{form.project_name}}</span>
          </el-form-item>
          <el-form-item label="项目说明：">
            <span>{{ form.project_remark }}</span>
          </el-form-item>
          <el-form-item label="负责人：">
            <span>{{form.teacher_name}}</span>
          </el-form-item>
          <el-form-item label="负责学科：">
            <span>{{form.subject_name}}</span>
          </el-form-item>
          <el-form-item label="负责年级：">
            <span>{{form.grade_name}}</span>
          </el-form-item>
         <el-form-item label="项目评语：" id='project-comment'>
            <el-input type="textarea" :rows="5" v-model="form.project_comment"></el-input>
          </el-form-item>
          <el-form-item>
            <router-link to="/transactorList"><el-button>取消</el-button></router-link>
            <el-button @click="saveUser()">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../../myHeader/myHeader'
  import { showExecutorManager, saveExecutorManager } from '@/api/eduAdmin'
  export default {
    name: 'transactorEdit',
    data() {
      return {
        form: {
          project_name: '',
          teacher_name: '石选晓',
          schoolName: '石选晓可代发集齐啊小花',
          subject_name: '',
          grade_name: '13535790897',
          project_comment: ''
        },
        msg: {
          title1: '评价项目管理',
          title2: '执行人管理',
          title3: '编辑执行人管理',
          flag: 2,
          path1: '/itemList',
          path2: '/transactorList'
        }
      }
    },
    components: {
      myHeader
    },
    mounted() {
      this.project_id = this.$route.query.project_id
      this.teacher_id = this.$route.query.teacher_id
      this.getData()
    },
    methods: {
      getData() {
        const obj = {
          project_id: this.project_id,
          teacher_id: this.teacher_id,
          token: localStorage.getItem('TOKEN')
        }
        showExecutorManager(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.form = res.response.info
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      saveUser() {
        const obj = {
          project_id: this.project_id,
          leader_id: this.teacher_id,
          project_comment: this.form.project_comment,
          token: localStorage.getItem('TOKEN')
        }
        if (obj.project_comment.length > 200) {
          this.$message.error('项目评语超过200字')
          return false
        }
        saveExecutorManager(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.$router.push({ path: '/transactorList' })
              this.$message.success('保存成功')
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
.title {
  margin-bottom: 30px;
}
</style>
<style type="text/css">
.main-content #project-comment .el-textarea {
  width: 457px;
}
.el-form-item{
  width: 100%;
}
</style>
