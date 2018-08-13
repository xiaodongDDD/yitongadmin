<template>
  <div class="article-add content">
  	<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
	  <el-radio-button label="0">文章编辑</el-radio-button>
	  <el-radio-button label="1">作者摘要及标签</el-radio-button>
	</el-radio-group>

	<div class="article" v-show="tabPosition === '0'">
	  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	    <el-form-item label="文章标题" prop="name">
	      <el-input v-model="ruleForm.name"></el-input>
	    </el-form-item>
	    <el-form-item label="短标题" prop="desc">
	      <el-input v-model="ruleForm.desc"></el-input>
	    </el-form-item>
	    <el-form-item label="音频" prop="desc">
	      <el-input v-model="ruleForm.desc"></el-input>
	      <p>请上传mp3格式的音频</p>
	    </el-form-item>
	    <el-form-item label="文章内容" prop="desc">
	      <div>
          <UE :defaultMsg="defaultMsg" :config="config" :id="ue1" ref="ue"></UE>
        </div>
	    </el-form-item>
	    <el-form-item>
	      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
	      <el-button @click="resetForm('ruleForm')">取消</el-button>
	    </el-form-item>
	  </el-form>
	</div>

	<div class="teacher" v-show="tabPosition === '1'">
	  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	    <h4>作者管理</h4>
	    <el-form-item label="文章标题" prop="name">
	      <el-input v-model="ruleForm.name"></el-input>
	    </el-form-item>
	    <h4>展示图片</h4>
	    <el-form-item label="短标题" prop="desc">
	      <el-input v-model="ruleForm.desc"></el-input>
	    </el-form-item>
	    <h4>文章摘要</h4>
	    <el-form-item label="音频" prop="desc">
	      <el-input v-model="ruleForm.desc"></el-input>
	      <p>请上传mp3格式的音频</p>
	    </el-form-item>
	    <h4>文章标签</h4>
	    <el-form-item label="文章内容" prop="desc">
	      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
	    </el-form-item>
	    <h4>文章预览</h4>
	    <el-form-item label="文章内容" prop="desc">
	      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
	    </el-form-item>
	    <el-form-item>
	      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
	      <el-button @click="resetForm('ruleForm')">取消</el-button>
	    </el-form-item>
	  </el-form>
	</div>
  </div>
</template>

<script>
  import UE from '../../ue/ue.vue';
  export default {
    name: 'articleAdd',
    data() {
      return {
        tabPosition: '1',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        defaultMsg: '',
        ue1:'ue1',
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      UE
    },
    methods: {
      submitForm() {},
      resetForm() {}
    }
  }
</script>

<style scoped>

</style>
<style type="text/css">
  div.edui-editor-toolbarboxinner.edui-default {
    line-height: 20px;
  }
</style>
