<template>
  <div class="center-content account-edit">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">编辑账户信息</p>
      <div class="edit-form">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="类型：">
            <el-col :span="7" v-if="form.type != 0">
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
            <el-col :span="17" v-if="form.type != 0">
              <el-form-item prop="date2">
                <el-input v-model="form.schoolName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="17" v-else>
              <el-form-item>
                <span>{{form.schoolName}}</span>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="form.telephone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="form.email"></el-input>
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
  export default {
    name: 'accountEdit',
    data() {
      return {
        form: {
          name: '石选晓',
          schoolName: '武宁路小学',
          userName: 'shixiuan',
          type: '0',
          telephone: '13535790897',
          email: '134752398@348.cn',
          status: '停用'
        },
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
        this.$router.push({ path: '/accountList' })
      }
    }
  }
</script>

<style scoped>

</style>
