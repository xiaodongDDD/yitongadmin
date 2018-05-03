<template>
  <div class="myInfo">
    <el-form ref="form" :model="form" label-width="100px" class="formMyInfo" :rules="rules">
      <el-form-item label="头像">
        <img src="../../../assets/404_images/404_cloud.png" height="100" class="imgStyle" width="100"/>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" ></el-input>
      </el-form-item>
      <el-form-item label="英文名" prop="nameEn">
        <el-input v-model="form.phone" ></el-input>
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
      <el-form-item label="手机"  prop="phone">
        <div>
          <el-input v-model="form.phoneNUm" style="width: 20%"></el-input>
          <el-input v-model="form.phone" style="width: 79%"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="座机"  prop="telphone">
        <el-input v-model="form.telphone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"  prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="公司">
        <span>12345</span>
      </el-form-item>
      <el-form-item label="部门">
        <span>12345</span>
      </el-form-item>
      <el-form-item label="分管辖区">
        <span>12345</span>
      </el-form-item>
      <el-form-item label="入离日期">
        <span>12345</span>
      </el-form-item>
      <el-form-item label="职务">
        <span>12345</span>
      </el-form-item>
      <el-form-item label="职级">
        <span>12345</span>
      </el-form-item>
      <el-form-item label="上级">
        <span>12345</span>
      </el-form-item>
      <el-form-item label="下级">
        <span>12345</span>
      </el-form-item>
      <el-form-item label="专属邀请码">
        <span>12345</span>
      </el-form-item>
      <el-form-item>
        <el-button>取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
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
          email: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { max: 28, message: '姓名长度请在在 28 个字符之内', trigger: 'blur' }
          ],
          nameEn: [
            { max: 55, message: '英文名长度在 55 个字符之内', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { max: 11, message: '英文名长度在 11 个字符之内', trigger: 'blur' }
          ],
          telphone: [
            { max: 20, message: '座机长度在 20 个字符之内', trigger: 'blur' }
          ],
          email: [
            { max: 30, message: '英文名长度在 30 个字符之内', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]
        }
      }
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
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .myInfo{
    margin: 20px 30px;
    .formMyInfo{
      width: 75%;
    }
  }
</style>
