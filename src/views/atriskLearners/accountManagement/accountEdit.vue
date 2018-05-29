<template>
  <div class="center-content account-edit">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">编辑账户信息</p>
      <div class="edit-form">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-form-item label="类型：">
            <el-col v-if="form.teacher_type == 3">
              <!--<el-form-item prop="date1">-->
                <!--<el-select v-model="form.type" placeholder="请选择">-->
                  <!--<el-option label="学校" value="0"></el-option>-->
                  <!--<el-option label="运营" value="1"></el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
              <span>运营</span>
            </el-col>
            <el-col v-else>
              <el-form-item>
                <span>学校   {{form.school_name}}</span>
              </el-form-item>
            </el-col>
            <!--<el-col :span="17" v-if="form.teacher_type == 3">-->
              <!--<el-form-item prop="date2">-->
                <!--<el-dropdown @command="handleCommand" trigger="click">-->
                  <!--<span class="el-dropdown-link">-->
                    <!--<el-input v-model="form.school_name" @change="checkSchool"></el-input>-->
                  <!--</span>-->
                  <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item v-for="item in schoolList" :command="item">{{ item.school_name}}</el-dropdown-item>-->
                  <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="17" v-else>-->
              <!--<el-form-item>-->
                <!--<span>{{form.school_name}}</span>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          </el-form-item>
          <el-form-item label="姓名：" prop="teacher_name">
            <el-input v-model="form.teacher_name" max-length="28"></el-input>
          </el-form-item>
          <el-form-item label="用户名：" prop="username">
            <el-input v-model="form.username" max-length="28"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="telephone">
            <el-input v-model="form.telephone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="e_mail">
            <el-input v-model="form.e_mail"></el-input>
          </el-form-item>
          <el-form-item label="账户状态：">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <router-link to="/accountList"><el-button>取消</el-button></router-link>
            <el-button @click="saveUser()">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  import { accountDetail, accountSave, getSchoolList } from '@/api/eduAdmin'
  export default {
    name: 'accountEdit',
    data() {
      const checkPwd = (rule, value, callback) => {
        const reg = /^[0-9a-zA-Z]+$/
        if (!(reg.test(value))) {
          return callback(new Error('包含非法字符'))
        } else if (value.length > 28) {
          return callback(new Error('用户名过长'))
        }
      }
      const checkEmail = (rule, value, callback) => {
        if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))) {
          return callback(new Error('邮箱格式不正确'))
        }
      }
      const checkTel = (rule, value, callback) => {
        if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(value))) {
          return callback(new Error('请输入正确的手机号'))
        }
      }
      return {
        form: {
          teacher_type: 1,
          school_name: '',
          teacher_name: '',
          username: '',
          e_mail: '',
          status: '',
          telephone: ''
        },
        schoolList: [],
        rules: {
          teacher_name: [
            { max: 28, message: '姓名不能超过28个字符', trigger: 'blur' }
          ],
          username: [
            { validator: checkPwd, trigger: 'blur' }
          ],
          telephone: [
            { validator: checkTel, trigger: 'blur' }
          ],
          e_mail: [
            { validator: checkEmail, trigger: 'blur' }
          ]
        },
        options: [{ value: '1', label: '启用' }, { value: '0', label: '停用' }],
        msg: {
          title1: '账户管理',
          title2: '编辑账户信息',
          flag: 1,
          path: '/accountList'
        }
      }
    },
    watch: {
      'form.school_name': function(val, oldval) {
        this.checkSchool()
      }
    },
    components: {
      myHeader
    },
    methods: {
      checkSchool() {
        const obj = {}
        obj.search_school = this.form.school_name
        obj.token = localStorage.getItem('TOKEN')
        getSchoolList(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.schoolList = res.response.list
          }
        })
      },
      handleCommand(index) {
        // console.log(index)
        this.form.school_id = index.school_id
        this.form.school_name = index.school_name
      },
      saveUser() {
        this.form.token = localStorage.getItem('TOKEN')
        this.form.enabled_status = this.form.status
        if (this.form.teacher_name.length <= 28) {
          accountSave(this.form).then(res => {
            // console.log(res)
            if (res.hasOwnProperty('response')) {
              this.$message('修改成功！')
              this.$router.push({ path: '/accountList' })
            } else {
              this.$alert(res.error_response.msg, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
        }
      },
      getDetail() {
        const obj = {}
        obj.teacher_id = this.$route.query.teacher_id
        obj.token = localStorage.getItem('TOKEN')
        accountDetail(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            const data = res.response
            if (data.info.enabled_status === true) {
              data.info.status = '启用'
              data.info.enabled_status = 1
            } else {
              data.info.status = '停用'
              data.info.enabled_status = 0
            }
            this.form = data.info
            // this.form.teacher_type = data.teacher_type
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
  .el-dropdown-link .el-input{
    width: 100% !important;
  }
  .teacher-type .el-input{
    width: 100%!important;
  }
</style>
