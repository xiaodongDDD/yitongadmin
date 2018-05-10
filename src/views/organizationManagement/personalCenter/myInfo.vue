<template>
  <div class="myInfo">
    <el-form ref="form" :model="form" label-width="100px" class="formMyInfo" :rules="rules">
      <el-form-item label="头像">
        <img :src="form.avatar" height="100" class="imgStyle" width="100"/>
      </el-form-item>
      <el-form-item label="姓名" prop="user_name">
        <el-input v-model="form.user_name" ></el-input>
      </el-form-item>
      <el-form-item label="英文名" prop="english_name">
        <el-input v-model="form.english_name" ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex" >
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="员工编号">
        <span>12345</span>
      </el-form-item>
      <el-form-item label="手机"  prop="mobile_phone">
        <div>
          <el-input v-model="form.phoneNUm" style="width: 20%"></el-input>
          <el-input v-model="form.mobile_phone" style="width: 79%"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="座机"  prop="special_plane">
        <el-input v-model="form.special_plane"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"  prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="公司">
        <span class="fontClass">{{form.company_info.name}}</span>
      </el-form-item>
      <el-form-item label="部门">
        <span class="fontClass">{{form.department_info.name}}</span>
      </el-form-item>
      <el-form-item label="分管辖区">
        <span class="fontClass">{{form.province_city | arrayFilter}}</span>
      </el-form-item>
      <el-form-item label="入离日期">
        <span class="fontClass">{{form.entry_time}}--{{form.leave_time}}</span>
      </el-form-item>
      <el-form-item label="职务">
        <span class="fontClass">{{form.position_info.work_position}}</span>
      </el-form-item>
      <el-form-item label="职级">
        <span class="fontClass">{{form.position_info.work_level}}</span>/
      </el-form-item>
      <el-form-item label="上级">
        <span class="fontClass">{{form.parent_info | userNameFilter}}</span>
      </el-form-item>
      <el-form-item label="下级">
        <span class="fontClass">{{form.subordinate_info | userNameFilter}}</span>
      </el-form-item>
      <el-form-item label="专属邀请码">
        <span class="fontClass">{{form.invited_code}}</span>
      </el-form-item>
      <el-form-item class="text-center">
        <el-button>取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { userDetail } from '@/api/organizationManagement'

  export default {
    data() {
      return {
        form: {
          name: '',
          nameEn: '',
          sex: '男',
          phoneNUm: '+86',
          phone: '',
          telphone: '',
          email: '',
          subordinate_info: [],
          parent_info: [],
          position_info: {},
          province_city: [],
          company_info: {},
          department_info: {}
        },
        rules: {
          user_name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { max: 28, message: '姓名长度请在在 28 个字符之内', trigger: 'blur' }
          ],
          english_name: [
            { max: 55, message: '英文名长度在 55 个字符之内', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur' }
          ],
          mobile_phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { max: 11, message: '英文名长度在 11 个字符之内', trigger: 'blur' }
          ],
          special_plane: [
            { max: 20, message: '座机长度在 20 个字符之内', trigger: 'blur' }
          ],
          email: [
            { max: 30, message: '英文名长度在 30 个字符之内', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ]
        },
        module_id: 19
      }
    },
    created() {
      const obj = {
        // 'u_id': 1,
        'module_id': this.module_id,
        'type': 1
      }
      userDetail(obj).then(response => {
        if (!response.hasOwnProperty('error_response')) {
          this.form = response.response.info
          this.form.phoneNUm = '+86'
        } else {
          this.$message({
            message: response.error_response.msg,
            type: 'error'
          })
        }
      })
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    filters: {
      arrayFilter(arr) {
        return arr.join('，')
      },
      userNameFilter(arr) {
        const data = []
        for (let i = 0; i < arr.length; i++) {
          data.push(arr[i].user_name)
        }
        return data.join('，')
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .myInfo{
    margin: 20px 30px;
    .formMyInfo{
      width: 75%;
    }
    .fontClass{
      padding-left: 20px;
    }
    .text-center{
      text-align: center;
    }
  }
</style>
