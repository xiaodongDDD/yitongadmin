<template>
  <div class="user-add center-content">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">新增学校用户</p>
      <div class="edit-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="学校名称：">
            <el-dropdown @command="changeSubject" trigger="click">
                <span class="el-dropdown-link">
                  <el-input v-model="form.school_name"></el-input>
                </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in schoolData" :command="item">{{ item.school_name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
            <router-link to="userList"><el-button>取消</el-button></router-link>
            <el-button @click="saveUser">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  import { checkSchoolList, addSchoolUser } from '@/api/eduAdmin'
  export default {
    name: 'userAdd',
    data() {
      return {
        form: {
          school_name: '',
          teacher_name: '',
          enabled_status: '0',
          phone: ''
        },
        msg: {
          title1: '学校用户管理',
          title2: '新增学校用户',
          flag: 1,
          path: '/userList'
        },
        schoolData: []
      }
    },
    components: {
      myHeader
    },
    watch: {
      'form.school_name': function(value, ovalue) {
        if (value === '') {
          this.form.phone = ''
          this.form.school_id = ''
          this.form.teacher_id = ''
          this.form.teacher_name = ''
          this.form.school_name = ''
        } else {
          this.getSchool(value)
        }
      }
    },
    methods: {
      saveUser() {
        this.form.token = localStorage.getItem('TOKEN')
        addSchoolUser(this.form).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.$message('添加成功')
            this.$router.push({ path: '/userList' })
          } else {
            this.$alert(res.error_response.msg, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      },
      getSchool(name) {
        const obj = {}
        obj.screen_word = name
        obj.token = localStorage.getItem('TOKEN')
        checkSchoolList(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.schoolData = res.response.list
            if (this.schoolData.length === 0) {
              this.form.teacher_name = ''
              this.form.phone = ''
              this.form.school_id = ''
              this.form.teacher_id = ''
            }
          }
        })
      },
      changeSubject(item) {
        this.form.phone = item.phone
        this.form.school_id = item.school_id
        this.form.teacher_id = item.teacher_id
        this.form.teacher_name = item.teacher_name
        this.form.school_name = item.school_name
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-dropdown{

    .el-input{
      width: 260px!important;
    }
  }
  .el-dropdown-menu{
    max-height: 300px;
    overflow-y: auto;
  }
</style>
