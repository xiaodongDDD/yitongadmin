<template>
  <div class="article-add content">
<!--   	<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
	  <el-radio-button label="0">文章编辑</el-radio-button>
	  <el-radio-button label="1">作者摘要及标签</el-radio-button>
	</el-radio-group> -->
  <h3>文章编辑</h3>
	  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	    <el-form-item label="文章标题" prop="name">
	      <el-input v-model="ruleForm.title"></el-input>
	    </el-form-item>
	    <el-form-item label="短标题" prop="desc">
	      <el-input v-model="ruleForm.short_title"></el-input>
	    </el-form-item>
	    <el-form-item label="音频" prop="desc">
	      <upAudio ref="upLoadAudio" :urls="urls1" v-if='isAlive'></upAudio>
	    </el-form-item>
	    <el-form-item label="文章内容" prop="desc">
	      <div>
          <UE :defaultMsg="defaultMsg" :config="config" :id="ue1" ref="ue"></UE>
        </div>
	    </el-form-item>
	  </el-form>
  <h3 style="margin-top:50px;">作者摘要及标签</h3>
	  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	    <h4>作者管理</h4>
	    <el-form-item label="选择作者" prop="name">
	      <el-select v-model="ruleForm.author_id" filterable ref='searchArtist' placeholder="请选择或搜索" @keyup.enter.native="searchArtist">
          <el-option
            v-for="item in options1"
            :key="item.author_id"
            :label="item.name"
            :value="item.author_id">
          </el-option>
        </el-select>
	    </el-form-item>
	    <h4>展示图片</h4>
	    <el-form-item label="图片" prop="desc">
      <div>
        <p>正方形</p>
        <upImage ref="upLoadFile" :urls="urls2" v-if='isAlive'></upImage>
      </div>
      <div>
        <p>竖版</p>
        <upImages ref="upLoadFiles" :urls="urls3" v-if='isAlive'></upImages>
      </div>
      <p>正方形：请上传大小为160*160像素，格式为jpeg或png格式的图片</p>
      <p>竖版：请上传大小为208*280像素，格式为jpeg或png格式的图片</p>
	    </el-form-item>
	    <h4>文章摘要</h4>
	    <el-form-item label="摘要内容" prop="desc">
	      <el-input v-model="ruleForm.description"></el-input>
	    </el-form-item>


	    <h4>文章标签</h4>
	    <el-form-item label="文章标签" prop="desc">
         <div style="margin-bottom:20px;">
            <el-select v-model="value8" filterable placeholder="请选择或搜索" ref="selectValue" @keyup.enter.native="searchLabel">
              <el-option
                v-for="item in options"
                :key="item.label_id"
                :label="item.name"
                :value="item.label_id">
              </el-option>
            </el-select>
        </div>
        <div id="haha">
            <el-select v-model="value9" multiple placeholder="" id='noCss'>
              <el-option
                v-for="item in options"
                :key="item.label_id"
                :label="item.name"
                :value="item.label_id">
              </el-option>
            </el-select>
        </div>
	    </el-form-item>

	    <h4>文章预览</h4>
	    <el-form-item label="预览地址" prop="desc">
	      <el-input type="text" placeholder="请输入您的手机号" v-model="ruleForm.address"></el-input>
	    </el-form-item>
	    <el-form-item>
        <el-button @click="preview">预览</el-button>
	      <el-button type="primary" @click="submitForm">保存</el-button>
	      <el-button @click="resetForm('ruleForm')">取消</el-button>
	    </el-form-item>
	  </el-form>
  </div>
</template>

<script>
  import upAudio from '../upAudio/upAudio'
  import UE from '../../ue/ue.vue'
  import upImage from '../upImg/articleUpImage'
  import upImages from '../upImg/longUpImage'
  import { articleManage, articleDetail, labelSearch, authorSearch } from '@/api/schoolH5'
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
        radio: '1',
        isAlive: true,
        article_id: '',
        ruleForm: {
          title: '',
          short_title: '',
          audio: '',
          content: '',
          author_id: '',
          name: '',
          cover_square: '',
          cover_stand: '',
          description: '',
          address: ''
        },
        options: [],
        value9: [],
        value8: '',
        options1: [{
          author_id: '',
          name: ''
        }],
        value7: '',
        urls1: {
          url: ''
        },
        urls2: {
          url: ''
        },
        urls3: {
          url: ''
        },
        // rules: {
        //   name: [
        //     { required: true, message: '请输入活动名称', trigger: 'blur' },
        //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        //   ],
        //   region: [
        //     { required: true, message: '请选择活动区域', trigger: 'change' }
        //   ],
        //   date1: [
        //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        //   ],
        //   date2: [
        //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        //   ],
        //   type: [
        //     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        //   ],
        //   resource: [
        //     { required: true, message: '请选择活动资源', trigger: 'change' }
        //   ],
        //   description: [
        //     { required: true, message: '请填写活动形式', trigger: 'blur' }
        //   ]
        // }
      }
    },
    components: {
      UE,
      upAudio,
      upImage,
      upImages
    },
    mounted() {
      console.log(this.urls)
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
              this.options = res.response.label_info
              this.options1[0].author_id = res.response.article_detail[0].author_id
              this.options1[0].name = res.response.article_detail[0].name
              this.ruleForm = res.response.article_detail[0]
              this.urls1.url = res.response.article_detail[0].audio
              this.urls2.url = res.response.article_detail[0].cover_square
              this.urls3.url = res.response.article_detail[0].cover_stand
              this.defaultMsg = res.response.article_detail[0].content
              this.value9 = res.response.label_ids
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
          title: this.ruleForm.title,
          short_title: this.ruleForm.short_title,
          audio: this.$refs.upLoadAudio.getUrl(),
          content: this.$refs.ue.getUEContent(),
          author_id: this.ruleForm.author_id,
          cover_square: this.$refs.upLoadFile.getUrl() === '' ? this.ruleForm.cover_square : this.$refs.upLoadFile.getUrl(),
          cover_stand: this.$refs.upLoadFiles.getUrl() === '' ? this.ruleForm.cover_stand : this.$refs.upLoadFiles.getUrl(),
          article_id: this.article_id,
          description: this.ruleForm.description,
          label_ids: this.value9.join(","),
          type: '2'
        }
        articleManage(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.$message.success(res.response.msg)
              this.$router.go(-1)
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      preview() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          title: this.ruleForm.author_id,
          short_title: this.ruleForm.author_id,
          audio: this.$refs.upLoadAudio.getUrl(),
          content: this.$refs.ue.getUEContent(),
          author_id: this.ruleForm.author_id,
          cover: this.$refs.upLoadFile.getUrl() === '' ? this.ruleForm.cover : this.$refs.upLoadFile.getUrl(),
          article_id: this.article_id,
          description: this.ruleForm.description,
          label_ids: this.value9.join(","),
          phonenum: this.ruleForm.address,
          type: '1'
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
        var val1 = this.value9
        console.log(val1)
        console.log(val)
        if (val1.indexOf(val) === -1) {
          console.log(1111)
          for (var i = 0; i < this.options.length; i++) {
            if (this.options[i].label_id === val) {
              val1.push(this.options[i].label_id)
              this.value9 = val1
            }
          }
          console.log(this.value9, this.values)
          this.value8 = ''
        } else {
          console.log(2222)
          for (var j = 0; j < this.options.length; j++) {
            if (this.options[j].label_id === val) {
              val1.splice(val1.indexOf(this.options[j].label_id), 1)
              this.value9 = val1
            }
          }
          this.value8 = ''
          console.log(this.value9)
        }
      },
      searchLabel() {
        console.log(this.$refs.selectValue.query)
        const obj = {
          token: localStorage.getItem('TOKEN'),
          name: this.$refs.selectValue.query
        }
        labelSearch(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.options = res.response.label_list
              this.$message.success(res.response.msg)
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      searchArtist() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          name: this.$refs.searchArtist.query
        }
        authorSearch(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.options1 = res.response.author_list
              this.$message.success(res.response.msg)
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      resetForm() {}
    },
    watch: {
      'value8': function(news, old) {
        if (news !== '') {
          this.haha(news)
        }
      },
      'radio': function(news, old) {
        this.urls2.type = news
        console.log(this.urls2.type)
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
