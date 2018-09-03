<template>
  <div class="journal-list content">

  	<div class="journal-container list-container">
  	  <div class="form1">
  	    <h3>周刊信息</h3>
  	    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="  demo-ruleForm">
	      <el-form-item label="周刊期数" prop="vid">
	        <el-input v-model="ruleForm.vid" type='number' placeholder="请输入阿拉伯数字"></el-input>
	      </el-form-item>
	      <el-form-item label="周刊主题" prop="name">
	        <el-input v-model="ruleForm.name" placeholder="最多输入50个汉字"></el-input>
	      </el-form-item>
	      <el-form-item label="周刊封面" prop="img">
	        <!-- <el-input v-model="ruleForm.img" placeholder="最多输入50个汉字"></el-input> -->
        <upImage ref="upLoadFile" :urls="urls1" v-if='isAlive'></upImage>
	      </el-form-item>
	    </el-form>
	  </div>
	
	  <div class="form2">
  	    <h3>分享设置</h3>
  	    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="  demo-ruleForm">
	      <el-form-item label="微信分享标题" prop="wx_sharetitle">
	        <el-input v-model="ruleForm.wx_sharetitle" placeholder=""></el-input>
	      </el-form-item>
	      <el-form-item label="微信分享描述" prop="wx_sharedesc">
	        <el-input v-model="ruleForm.wx_sharedesc" placeholder="最多输入50个汉字"></el-input>
	      </el-form-item>
	      <el-form-item label="微信分享图片" prop="img">
	        <!-- <el-input v-model="ruleForm.img" placeholder="最多输入50个汉字"></el-input> -->
        <upImages ref="upLoadFiles" :urls="urls2" v-if='isAlive2'></upImages>
	      </el-form-item>
	      <el-form-item>
	        <el-button type="primary" @click="saveInfo">保存</el-button>
	        <el-button @click="cancelForm()">取消</el-button>
	      </el-form-item>
	    </el-form>
	  </div>

	</div>
  </div>
</template>

<script>
  import upImage from '../upImg/termImage'
  import upImages from '../upImg/termShareImage'
  import { termDetail, termManage } from '@/api/schoolH5'
  export default {
    name: 'journalAdd',
    data() {
      return {
        ruleForm: {
          vid: '',
          name: '',
          wx_sharetitle: '',
          wx_sharedesc: '',
          img: '',
          wx_shareimg: ''
        },
        rules: {
          vid: [
            { required: true, message: '请输入周刊期数', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入周刊主题', trigger: 'blur' },
            { min: 1, max: 50, message: '最多输入50个汉字', trigger: 'blur' }
          ],
          wx_sharetitle: [
            { required: true, message: '请输入微信分享标题', trigger: 'blur' },
            { min: 1, max: 50, message: '最多输入50个汉字', trigger: 'blur' }
          ],
          wx_sharedesc: [
            { required: true, message: '请输入微信分享描述', trigger: 'blur' },
            { min: 1, max: 50, message: '最多输入50个汉字', trigger: 'blur' }
          ]
        },
        scid: '',
        isAlive: true,
        isAlive2: true,
        urls1: {
          url: ''
        },
        urls2: {
          url: ''
        },
      }
    },
    mounted() {
      if (this.$route.query.hasOwnProperty('scid')) {
        this.scid = this.$route.query.scid
        this.getData()
      }
    },
    methods: {
      getData() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          scid: this.scid
        }
        console.log(obj)
        termDetail(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.ruleForm = res.response.term_info
              this.urls1.url = res.response.term_info.img
              this.urls2.url = res.response.term_info.wx_shareimg
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      reload1() {
        this.isAlive = false
        this.$nextTick(function() {
          this.isAlive = true
        })
        console.log(1111)
      },
      reload2() {
        this.isAlive2 = false
        this.$nextTick(function() {
          this.isAlive2 = true
        })
        console.log(1111)
      },
      saveInfo() {
        console.log(1111)
        console.log(this.$refs)
        const obj = {
          token: localStorage.getItem('TOKEN'),
          scid: this.scid,
          vid: parseInt(this.ruleForm.vid),
          title: this.ruleForm.name,
          cover: this.$refs.upLoadFile.getUrl() === '' ? this.ruleForm.img : this.$refs.upLoadFile.getUrl(),
          share_title: this.ruleForm.wx_sharetitle,
          share_description: this.ruleForm.wx_sharedesc,
          share_cover: this.$refs.upLoadFiles.getUrl() === '' ? this.ruleForm.wx_shareimg : this.$refs.upLoadFiles.getUrl()
        }
        console.log(obj)
        termManage(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
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
      cancelForm() {}
    },
    components: {
      upImage,
      upImages
    }
  }
</script>

<style scoped>

</style>
