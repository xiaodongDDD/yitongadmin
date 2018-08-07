<template>
  <div class="journal-list content">

  	<div class="journal-container list-container">
  	  <div class="form1">
  	    <h3>周刊信息</h3>
  	    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="  demo-ruleForm">
	      <el-form-item label="周刊期数" prop="name">
	        <el-input v-model="ruleForm.name" placeholder=""></el-input>
	      </el-form-item>
	      <el-form-item label="周刊主题" prop="theme">
	        <el-input v-model="ruleForm.theme" placeholder="最多输入50个汉字"></el-input>
	      </el-form-item>
	      <el-form-item label="周刊封面" prop="img">
	        <el-input v-model="ruleForm.img" placeholder="最多输入50个汉字"></el-input>
	      </el-form-item>
	    </el-form>
	  </div>
	
	  <div class="form2">
  	    <h3>分享设置</h3>
  	    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="  demo-ruleForm">
	      <el-form-item label="微信分享标题" prop="name">
	        <el-input v-model="ruleForm.name" placeholder=""></el-input>
	      </el-form-item>
	      <el-form-item label="微信分享描述" prop="theme">
	        <el-input v-model="ruleForm.theme" placeholder="最多输入50个汉字"></el-input>
	      </el-form-item>
	      <el-form-item label="微信分享图片" prop="img">
	        <el-input v-model="ruleForm.img" placeholder="最多输入50个汉字"></el-input>
	      </el-form-item>
	      <el-form-item>
	        <el-button type="primary" @click="submitForm()">保存</el-button>
	        <el-button @click="cancelForm()">取消</el-button>
	      </el-form-item>
	    </el-form>
	  </div>

	</div>
  </div>
</template>

<script>
  export default {
    name: 'journalAdd',
    data() {
      return {
        ruleForm: {
          name: '',
          theme: '',
          img: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入周刊期数', trigger: 'blur' }
          ],
          theme: [
            { required: true, message: '请输入周刊主题', trigger: 'blur' },
            { min: 1, max: 50, message: '最多输入50个汉字', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '请选择周刊封面', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      submitForm() {},
      cancelForm() {}
    }
  }
</script>

<style scoped>

</style>
