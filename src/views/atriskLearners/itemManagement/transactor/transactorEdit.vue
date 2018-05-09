<template>
  <div class="center-content transactor-edit">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">编辑权限管理</p>
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
  </div>
</template>

<script>
  import myHeader from '../../myHeader/myHeader'
  import { showExecutorManager } from '@/api/eduAdmin'
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
          title1: '项目评价管理',
          title2: '执行人管理',
          title3: '编辑执行人管理',
          flag: 2,
          path1: '/itemList',
          path2: '/officialList'
        }
      }
    },
    components: {
      myHeader
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        const obj = {
          project_id: 1,
          teacher_id: 10220,
          token: localStorage.getItem('TOKEN')
        }
        showExecutorManager(obj)
          .then(res => {
            console.log(res)
            this.form = res.response.info
          })
          .catch(err => {
            console.log(err)
          })
      },
      saveUser() {
        this.$router.push({ path: '/userList' })
      }
    }
  }
</script>

<style scoped>
.title {
  margin-bottom: 30px;
}
</style>
