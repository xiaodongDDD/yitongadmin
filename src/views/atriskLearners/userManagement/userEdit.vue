<template>
  <div class="user-edit center-content">
     <my-header :msg='msg'></my-header>
    <div class="content-detail">
        <p class="position">编辑学校用户</p>
        <div class="edit-form">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="学校名称：">
              <!--<el-input v-model="form.name"></el-input>-->
              <span>{{form.school_name}}</span>
            </el-form-item>
            <el-form-item label="管理员：">
              <span>{{form.teacher_name}}</span>
            </el-form-item>
            <el-form-item label="手机号：">
              <span>{{form.phone}}</span>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select v-model="form.enabled_status" placeholder="请选择">
                <el-option label="启用" value="1"></el-option>
                <el-option label="停用" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <router-link to="/userList"><el-button>取消</el-button></router-link>
              <el-button @click="saveUser()">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  import { getUserDetail, changeUserStatus } from '@/api/eduAdmin'
  export default {
    name: 'userEdit',
    data() {
      return {
        form: {},
        msg: {
          title1: '学校用户管理',
          title2: '编辑学校用户',
          flag: 1,
          path: '/userList'
        }
      }
    },
    components: {
      myHeader
    },
    methods: {
      saveUser() {
        // console.log(this.form)
        this.form.token = localStorage.getItem('TOKEN')
        changeUserStatus(this.form).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.$message('修改成功')
            this.$router.push({ path: '/userList' })
          } else {
            this.$alert(res.error_response.msg, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      },
      getDetail() {
        const obj = {}
        obj.school_id = this.$route.query.school_id
        obj.token = localStorage.getItem('TOKEN')
        getUserDetail(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.form = res.response.info
          }
        })
      }
    },
    mounted() {
      this.getDetail()
    }
  }
</script>

<style scoped>

</style>
