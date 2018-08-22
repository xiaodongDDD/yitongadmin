<template>
  <div class="article-add content">
<!--   	<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
	  <el-radio-button label="0">文章编辑</el-radio-button>
	  <el-radio-button label="1">作者摘要及标签</el-radio-button>
	</el-radio-group> -->
  <h3>文章编辑</h3>
	  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	    <el-form-item label="文章标题" prop="name">
	      <el-input v-model="ruleForm.title"></el-input>
	    </el-form-item>
	    <el-form-item label="短标题" prop="desc">
	      <el-input v-model="ruleForm.short_title"></el-input>
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
	    <el-form-item label="图片" prop="desc">
	      <el-input v-model="ruleForm.cover"></el-input>
	    </el-form-item>
	    <h4>文章摘要</h4>
	    <el-form-item label="摘要内容" prop="desc">
	      <el-input v-model="ruleForm.description"></el-input>
	    </el-form-item>


	    <h4>文章标签</h4>
	    <el-form-item label="文章标签" prop="desc">
         <div style="margin-bottom:20px;">
            <el-select v-model="value8" filterable placeholder="请选择" @keyup.enter.native="handleLogin">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
        <div id="haha">
            <el-select v-model="value9" multiple placeholder="" id='noCss'>
              
            </el-select>
        </div>
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
  import { articleManage, articleDetail } from '@/api/schoolH5'
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
          title: '',
          short_title: '',
          audio: '',
          content: '',
          author_id: '',
          name: '',
          cover: '',
          description: ''
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value9: [],
        value8: '',
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
        const obj = {
          token: localStorage.getItem('TOKEN'),
          article_id: this.article_id
        }
        articleDetail(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.ruleForm = res.response.article_detail[0]
              this.urls.url = res.response.article_detail[0].audio
              this.defaultMsg = res.response.article_detail[0].content
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
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
        const obj = {
          token: localStorage.getItem('TOKEN'),
          title: this.ruleForm.author_id,
          short_title: this.ruleForm.author_id,
          audio: this.$refs.upLoadFile.getUrl(),
          content: this.$refs.ue.getUEContent(),
          author_id: this.ruleForm.author_id,
          cover: this.ruleForm.cover,
          article_id: this.article_id,
          description: this.ruleForm.description,
          label_ids: '1,2,3'
        }
        articleManage(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.$message.success(res.response.msg)
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      haha(val) {
        const val1 = this.value9
        console.log(val1)
        console.log(val)
        if (val1.indexOf(val) === -1) {
          val1.push(val)
          this.value9 = val1
          this.value8 = ''
        } else {
          val1.splice(val1.indexOf(val), 1)
          this.value9 = val1
          this.value8 = ''
        }
      },
      resetForm() {}
    },
    watch: {
      'value8': function(news, old) {
        console.log(news)
        if (news !== '') {
           this.haha(news)
        }
      }
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
  input#noCss.el-input__inner {
  border: none;
  width: 500px;
  }
  #haha span.el-input__suffix{
    display: none;
  }
  div.el-select-dropdown.el-popper.is-multiple{
    display: none;
  }
</style>
