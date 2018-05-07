<template>
  <div class="center-content account-edit">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">编辑账户信息</p>
      <div class="edit-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="类型：">
            <el-col :span="7" v-if="form.teacher_type != 1">
              <el-form-item prop="date1">
                <el-select v-model="form.type" placeholder="请选择">
                  <el-option label="学校" value="0"></el-option>
                  <el-option label="运营" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3" v-else>
              <el-form-item>
                <span>学校</span>
              </el-form-item>
            </el-col>
            <el-col :span="17" v-if="form.teacher_type != 1">
              <el-form-item prop="date2">
                <el-input v-model="form.schoolName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="17" v-else>
              <el-form-item>
                <span>{{form.school_name}}</span>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="form.teacher_name"></el-input>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="form.telephone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
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
  import { accountDetail, accountEdit } from '@/api/eduAdmin'
  export default {
    name: 'accountEdit',
    data() {
      return {
        form: {},
        options: [{ value: '1', label: '启用' }, { value: '0', label: '停用' }],
        msg: {
          title1: '账户管理',
          title2: '编辑账户管理',
          flag: 1,
          path: '/accountList'
        }
      }
    },
    components: {
      myHeader
    },
    methods: {
      saveUser() {
        this.form.token = localStorage.getItem('TOKEN')
        accountEdit(this.form).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.$message('修改成功！')
            this.$router.push({ path: '/accountList' })
          }
        })
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
            } else {
              data.info.status = '停用'
            }
            this.form = data.info
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
