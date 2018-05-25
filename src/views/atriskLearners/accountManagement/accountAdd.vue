<template>
  <div class="center-content account-add">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">新增账户</p>
      <div class="edit-form">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-form-item label="类型：">
            <span>运营</span>
            <!--<span v-if="userInfo.teacher_type != 3"> 学校   {{userInfo.school_name}}</span>-->
            <!--<div class="acadd-selcect">-->
              <!--<el-select v-model="form.teacher_type" placeholder="请选择">-->
                <!--<el-option-->
                  <!--v-for="item in form.options"-->
                  <!--:key="item.value"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
              <!--<el-input v-model="form.school_name"></el-input>-->
            <!--</div>-->
          </el-form-item>

          <el-form-item label="姓名：" prop="teacher_name">
            <el-input v-model="form.teacher_name"></el-input>
          </el-form-item>
          <el-form-item label="用户名：" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="telephone">
            <el-input v-model="form.telephone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="">
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
            <el-button @click="saveUser">保存,去设置权限</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  import { accountSave, getAccountType } from '@/api/eduAdmin'
  export default {
    name: 'accountAdd',
    data() {
      const checkName = (rule, value, callback) => {
        if (value !== '') {
          const reg = /^[0-9a-zA-Z]+$/
          if (!(reg.test(value))) {
            return callback(new Error('包含非法字符'))
          } else if (value.length > 28) {
            return callback(new Error('用户名过长'))
          }
        }
      }
      const checkEmail = (rule, value, callback) => {
        if (value !== '') {
          if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))) {
            return callback(new Error('邮箱格式不正确'))
          }
        }
      }
      const checkTel = (rule, value, callback) => {
        if (value !== '') {
          if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(value))) {
            return callback(new Error('请输入正确的手机号'))
          }
        }
      }
      return {
        form: {
          school_id: '',
          teacher_type: '3',
          school_name: '',
          teacher_name: '',
          username: '',
          e_mail: '',
          status: '停用',
          telephone: '',
          options: [{ value: '1', label: '学校' }, { value: '3', label: '运营' }]
        },
        rules: {
          teacher_name: [
            { max: 28, message: '姓名不能超过28个字符', trigger: 'blur' }
          ],
          username: [
            { validator: checkName, trigger: 'blur' }
          ],
          telephone: [
            { validator: checkTel, trigger: 'blur' }
          ],
          e_mail: [
            { validator: checkEmail, trigger: 'blur' }
          ]
        },
        userInfo: {},
        msg: {
          title1: '账户管理',
          title2: '新增账户',
          flag: 1,
          path: '/accountList'
        },
        options: [{ value: '1', label: '启用' }, { value: '0', label: '停用' }]
      }
    },
    components: {
      myHeader
    },
    methods: {
      getType() {
        const obj = {}
        obj.token = localStorage.getItem('TOKEN')
        getAccountType(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.userInfo = res.response
            this.form.school_name = res.response.school_name
            this.form.school_id = res.response.school_id
          }
        })
      },
      saveUser() {
        if (this.form.status === '停用') {
          this.form.enabled_status = 0
        } else {
          this.form.enabled_status = 1
        }
        this.form.token = localStorage.getItem('TOKEN')
        if (this.form.teacher_name.length <= 28) {
          accountSave(this.form).then(res => {
            // console.log(res)
            if (res.hasOwnProperty('response')) {
              this.$message('添加成功！')
              this.$router.push({ path: '/powerEdit', query: { teacher_id: res.response.teacher_id }})
            } else {
              this.$alert(res.error_response.msg, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
        }
      }
    },
    mounted() {
      this.getType()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .acadd-selcect{
    width: 43%;
    .el-select .el-input{
      width: 120px!important;
    }
  }
</style>
