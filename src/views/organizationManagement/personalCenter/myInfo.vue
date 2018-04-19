<template>
  <div class="myInfo">
    <el-form ref="form" :model="form" label-width="100px" class="formMyInfo">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="英文名">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.resource">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="员工编号">
        <span>12345</span>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="座机">
        <el-input v-model="form.telphone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
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
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
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
