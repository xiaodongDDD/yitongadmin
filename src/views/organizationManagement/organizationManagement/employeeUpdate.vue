<template>
  <div class="myInfo">
    <el-form ref="form" :model="form" label-width="180px" class="formMyInfo" :rules="rules">
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
        <el-col :span="2">
          <el-input v-model="form.phoneNUm" style="width: 100%"></el-input>
        </el-col>
        <el-col :span="1" class="line">-
        </el-col>
        <el-col :span="21">
          <el-input v-model="form.phone" style="width: 100%"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="座机"  prop="telphone">
        <el-input v-model="form.telphone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"  prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="公司" prop="gongsi">
        <el-input v-model="form.gongsi" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="bumen">
        <el-input v-model="form.bumen" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="分管辖区">
        <el-input v-model="form.quyu" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="入离日期" prop="valueDate1">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.valueDate1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.valueDate2" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="职务" prop="zhiwu">
        <el-select v-model="form.zhiwu" placeholder="请选择职务" style="width: 100%">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职级" prop="zhiji">
        <el-select v-model="form.zhiji" placeholder="请选择职级" style="width: 100%">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上级" prop="shangji">
        <el-input v-model="form.shangji" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="下级" prop="xiaji">
        <el-input v-model="form.xiaji" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="是否开通一统账户" prop="sex">
        <el-radio-group v-model="form.sex" >
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否生成邀请码" prop="sex">
        <el-radio-group v-model="form.sex" >
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="专属邀请码">
        <span>12345</span>
      </el-form-item>
      <el-form-item label="角色">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="超级管理员" name="type"></el-checkbox>
          <el-checkbox label="管理员" name="type"></el-checkbox>
          <el-checkbox label="培训管理员" name="type"></el-checkbox>
          <el-checkbox label="培训专员" name="type"></el-checkbox>
          <el-checkbox label="人事管理员" name="type"></el-checkbox>
          <el-checkbox label="人事专员" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="line">
        <el-button>取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      var validatebumen = (rule, value, callback) => {
        if (this.form.gongsi === '') {
          callback(new Error('请先选择公司'))
        }
        if (value === '') {
          callback(new Error('请选择所属部门'))
        }
      }
      var validatexia = (rule, value, callback) => {
        if (this.form.bumen === '') {
          callback(new Error('请先选择部门'))
        }
        if (value === '') {
          callback(new Error('请选择下级'))
        }
      }
      var validateshang = (rule, value, callback) => {
        if (this.form.bumen === '') {
          callback(new Error('请先选择部门'))
        }
        if (value === '') {
          callback(new Error('请选择上级'))
        }
      }
      return {
        form: {
          name: '',
          nameEn: '',
          sex: '男',
          phoneNUm: '+86',
          phone: '',
          telphone: '',
          email: '',
          gongsi: '',
          bumen: '',
          quyu: '',
          valueDate1: '',
          valueDate2: '',
          zhiwu: '',
          zhiji: '',
          shangji: '',
          xiaji: '',
          yitong: '',
          yaoqing: '',
          yaoqingma: '',
          type: ''
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
          ],
          gongsi: [
            { required: true, message: '请选择所属公司', trigger: 'blur' }
          ],
          bumen: [
            { validator: validatebumen, trigger: 'blur', required: true }
          ],
          valueDate1: [
            { required: true, message: '请选择入职日期', trigger: 'blur' }
          ],
          zhiwu: [
            { required: true, message: '请选择职务', trigger: 'blur' }
          ],
          zhiji: [
            { required: true, message: '请选择职级', trigger: 'blur' }
          ],
          shangji: [
            { validator: validateshang, trigger: 'blur', required: true }
          ],
          xiaji: [
            { validator: validatexia, trigger: 'blur', required: true }
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
    .line{
      text-align: center;
    }
  }
</style>
