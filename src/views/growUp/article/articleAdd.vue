<template>
  <div class="article-add content">
<!--   	<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
	  <el-radio-button label="0">文章编辑</el-radio-button>
	  <el-radio-button label="1">作者摘要及标签</el-radio-button>
	</el-radio-group> -->
  <h3>文章编辑</h3>
	  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	    <el-form-item label="文章标题" prop="name">
	      <el-input v-model="ruleForm.name"></el-input>
	    </el-form-item>
	    <el-form-item label="短标题" prop="desc">
	      <el-input v-model="ruleForm.desc"></el-input>
	    </el-form-item>
	    <el-form-item label="音频" prop="desc">
	      <upAudio ref="upLoadFile" :urls="urls" v-if='isAlive'></upAudio>
	    </el-form-item>
	    <el-form-item label="文章内容" prop="desc">
	      <div>
          <UE :defaultMsg="defaultMsg" :config="config" :id="ue1" ref="ue"></UE>
        </div>
	    </el-form-item>
	  </el-form>
  <h3 style="margin-top:50px;">作者摘要及标签</h3>
	  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	    <h4>作者管理</h4>
	    <el-form-item label="选择作者" prop="name">
	      <el-input v-model="ruleForm.name"></el-input>
	    </el-form-item>
	    <h4>展示图片</h4>
	    <el-form-item label="短标题" prop="desc">
	      <el-input v-model="ruleForm.desc"></el-input>
	    </el-form-item>
	    <h4>文章摘要</h4>
	    <el-form-item label="摘要内容" prop="desc">
	      <el-input v-model="ruleForm.desc"></el-input>
	    </el-form-item>
	    <h4>文章标签</h4>
	    <el-form-item label="文章标签" prop="desc">
	      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
	    </el-form-item>
	    <h4>文章预览</h4>
	    <el-form-item label="预览地址" prop="desc">
	      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
	    </el-form-item>
	    <el-form-item>
	      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
	      <el-button @click="resetForm('ruleForm')">取消</el-button>
	    </el-form-item>
	  </el-form>
  </div>
</template>

<script>
  import upAudio from '../upAudio/upAudio'
  import UE from '../../ue/ue.vue'
  import { articleManage } from '@/api/schoolH5'
  export default {
    name: 'articleAdd',
    data() {
      return {
        tabPosition: '0',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        defaultMsg: '',
        ue1: 'ue1',
        isAlive: true,
        article_id: '',
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
        urls: {
          url: ''
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
      UE,
      upAudio
    },
    mounted() {
      if (this.$route.query.hasOwnProperty('article_id')) {
        this.article_id = this.$route.query.article_id
        this.getData()
      }
    },
    methods: {
     getData() {
        
      },
      reload() {
        this.isAlive = false
        this.$nextTick(function() {
          this.isAlive = true
        })
        console.log(1111)
      },
      submitForm() {
        console.log(1111)
      },
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
  .demo-ruleForm h4{
    text-indent: 10px;
  }
</style>
