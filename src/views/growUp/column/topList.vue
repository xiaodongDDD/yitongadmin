<template>
  <div class="top-list content">
    <div class="top-container list-container">
      <div class="column1 column">
        <h4>{{ topData[0].name }}</h4>
        <ul class="children-list">
          <li @click='changeChild(item, 0)' v-for="(item, index) in topData[0].details">
            <div class="child" v-if="item.cover === ''">
              <div class="imgd">
                <img :src="defaultHead" alt="" />
              </div>
              <p>{{ item.short_title }}</p>
            </div>
            <div class="child" v-else>
              <div class="imgd">
                <img :src="item.cover" alt="" />
              </div>
              <p>{{ item.short_title }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="column2 column">
        <h4>{{ topData[1].name }}</h4>
        <ul class="children-list">
          <li v-for="(item, index) in topData[1].details" @click="changeChild(item, 1)">
            <div class="child" v-if="item.cover === ''">
              <img :src="defaultHead" alt="" />
              <p>{{ item.short_title }}</p>
            </div>
            <div class="child" v-else>
              <div class="imgd">
                <img :src="item.cover" alt="" />
              </div>
              <p>{{ item.short_title }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="column3 column">
        <h4>{{ topData[2].name }}</h4>
        <ul class="children-list">
          <li v-for="(item, index) in topData[2].details" @click="changeChild(item, 2)">
            <span class="clickt" v-if="item.short_title === '' ">请点击选择</span>
            <span class="" v-else>{{ item.short_title }}</span>
          </li>
        </ul>
      </div>
      
      <div class="column4 column">
        <h4>{{ topData[3].name }}</h4>
        <ul class="children-list">
          <li v-for="(item, index) in topData[3].details" @click="changeChild(item, 3)">
            <div class="child" v-if="item.cover === ''">
              <img :src="defaultHead1" alt="" />
              <p>{{ item.short_title }}</p>
            </div>
            <div class="child" v-else>
              <div class="imgd1">
                <img :src="item.cover" alt="" />
              </div>
              <p>{{ item.short_title }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <el-dialog
      :title="child1.column"
      :visible.sync="childDialogVisible"
      width="30%">
      <div class="edit-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="选择图片" prop="cover" v-show='child1.topType == 0'>
            <div v-show="child1.type === 0">
              <upImage1 ref="upLoadFile1" :urls="urls1" v-if='isAlive1'></upImage1>
              <p style="line-height: 20px;">说明：请上传大小为330*180像素，格式为JPEG或者PNG的图片</p>
            </div>
            <div v-show="child1.type === 1">
              <upImage2 ref="upLoadFile2" :urls="urls2" v-if='isAlive2'></upImage2>
              <p style="line-height: 20px;">说明：请上传大小为330*200像素，格式为JPEG或者PNG的图片</p>
            </div>
            <div v-show="child1.type === 3">
              <upImage3 ref="upLoadFile3" :urls="urls3" v-if='isAlive3'></upImage3>
              <p style="line-height: 20px;">说明：请上传大小为208*280像素，格式为JPEG或者PNG的图片</p>
            </div>
          </el-form-item>
          <el-form-item label="选择文章" prop="title">
            <el-select v-model="value" filterable ref="selectValue" id="selectValue" placeholder="请输入搜索" @keyup.enter.native="searchArtist" @change="choosea">
              <el-option
                v-for="item in options"
                :key="item.article_id"
                :label="item.title"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span class="activeTxt" v-show="ruleForm.title !== ''">{{ ruleForm.title }}<i class="el-icon-close el-icon--right" @click="deleteCho"></i></span>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="topSaves">保 存</el-button>
        <el-button @click="childDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { topList, topInfo, topSave, columnArticles } from '@/api/schoolH5'
  import upImage1 from '../upImg/topImg1'
  import upImage2 from '../upImg/topImg2'
  import upImage3 from '../upImg/topImg3'
  import defaultHead from '../../../assets/imgs/add-stu.png'
  import defaultHead1 from '../../../assets/imgs/add-stu_1.png'
  export default {
    name: 'topList',
    data() {
      return {
        defaultHead: defaultHead,
        defaultHead1: defaultHead1,
        childDialogVisible: false,
        pageDialogVisible: false,
        seeDialogVisible: false,
        bookDialogVisible: false,
        options: [],
        value: '',
        isAlive1: true,
        urls1: {
          url: '',
          type: ''
        },
        isAlive2: true,
        urls2: {
          url: '',
          type: ''
        },
        isAlive3: true,
        urls3: {
          url: '',
          type: ''
        },
        topData: [{
          column_id: '',
          name: '育儿好文',
          details: [
            {
              title: '',
              short_title: '',
              cover: ''
            },
            {
              title: '',
              short_title: '',
              cover: ''
            },
            {
              title: '',
              short_title: '',
              cover: ''
            },
            {
              title: '',
              short_title: '',
              cover: ''
            }
          ]
        },
        {
          column_id: '',
          name: '精品专栏',
          details:[
            {
              title: '',
              short_title: '',
              cover: ''
            },
            {
              title: '',
              short_title: '',
              cover: ''
            }
          ]
        },
        {
          column_id: '',
          name: '家庭晓电台',
          details: [
            {
              title: '',
              short_title: '',
              cover: ''
            },
            {
              title: '',
              short_title: '',
              cover: ''
            },
            {
              title: '',
              short_title: '',
              cover: ''
            },
            {
              title: '',
              short_title: '',
              cover: ''
            }
          ]
        },
        {
          column_id: '',
          name: '听见好书',
          details: [
            {
              title: '',
              short_title: '',
              cover: ''
            }
          ]
        }],
        child1: {
          column_id: '',
          sort: '',
          type: 0,
          token: localStorage.getItem('TOKEN'),
          column: '育儿好文',
          topType: 0
        },
        ruleForm: {
          cover: '',
          title: '',
          column: ''
        },
        rules: {
          title: [
            { required: true, message: '请选择文章', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      'childDialogVisible': function(news, olds) {
        if (news === false) {
          this.reload()
          this.cform = this.cformr
          this.urls1.url = this.defaultHead
          this.urls2.url = this.defaultHead
          this.urls3.url = this.defaultHead
          this.options = []
          this.ruleForm.title = ''
          this.value = ''
        }
      }
    },
    mounted() {
      this.initData()
    },
    components: {
      upImage1,
      upImage2,
      upImage3
    },
    methods: {
      reload() {
        if (this.child1.type === 0) {
          this.isAlive1 = false
          this.$nextTick(function() {
            this.isAlive1 = true
          })
        } else if (this.child1.type === 1) {
          this.isAlive2 = false
          this.$nextTick(function() {
            this.isAlive2 = true
          })
        } else if (this.child1.type === 3) {
          this.isAlive3 = false
          this.$nextTick(function() {
            this.isAlive3 = true
          })
        }
      },
      initData() {
        const obj = {
          token: localStorage.getItem('TOKEN')
        }
        topList(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            const data = res.response
            this.topData = data.data
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
      },
      searchArtist() {
        const obj = {
          column_id: this.topData[this.child1.type].column_id,
          title: this.$refs.selectValue.query,
          token: localStorage.getItem('TOKEN')
        }
        columnArticles(obj).then(res => {
          // console.log(obj)
          if (res.hasOwnProperty('response')) {
            const data = res.response
            this.options = data.data
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
      },
      choosea(item) {
        this.ruleForm.title = item.title
        this.ruleForm.article_id = item.article_id
      },
      deleteCho() {
        this.ruleForm.title = ''
        this.ruleForm.article_id = ''
        this.value = ''
      },
      changeChild(item, type) {
        this.child1.column_id = this.topData[type].column_id
        this.child1.sort = item.sort
        this.child1.type = type
        this.child1.column = this.topData[type].name
        if (type === 2) {
          this.child1.topType = 1
        } else {
          this.child1.topType = 0
        }
        topInfo(this.child1).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            const data = res.response
            this.ruleForm = data.data
            if (type === 0) {
              this.urls1.url = data.data.cover
            } else if (type === 1) {
              this.urls2.url = data.data.cover
            } else if (type === 3) {
              this.urls3.url = data.data.cover
            }
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
        this.childDialogVisible = true
      },
      topSaves() {
        if (this.child1.type === 0) {
          this.ruleForm.cover = this.$refs.upLoadFile1.getUrl() !== '' ? this.$refs.upLoadFile1.getUrl() : this.ruleForm.cover
        } else if (this.child1.type === 1) {
          this.ruleForm.cover = this.$refs.upLoadFile2.getUrl() !== '' ? this.$refs.upLoadFile2.getUrl() : this.ruleForm.cover
        } else if (this.child1.type === 2) {
          this.ruleForm.cover = ''
        } else if (this.child1.type === 3) {
          this.ruleForm.cover = this.$refs.upLoadFile3.getUrl() !== '' ? this.$refs.upLoadFile3.getUrl() : this.ruleForm.cover
        }
        
        this.ruleForm.token = localStorage.getItem('TOKEN')
        console.log(this.ruleForm)
        // return false
        topSave(this.ruleForm).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            this.childDialogVisible = false
            this.initData()
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .column{
    margin-bottom: 40px;
  }
  .children-list{
    list-style: none;
    overflow: hidden;
    width: 700px;
    margin-top: 0;
    padding: 0;

    li{
      // width: 200px;
      text-align: center;
      float: left;
      margin-right: 20px;
      margin-bottom: 20px;
      cursor: pointer;
    }

    .child{
      position: relative;
      width: 150px;
      height: 120px;
      .imgd{
        width: 150px;
        height: 82px;
      }
      .imgd1{
        width: 100px;
        height: 135px;
      }
      span {
        position: absolute;
        left: 116px;
        top: 130px;
        color: #999;
      }
      img{
        width: 150px;
        height: 82px;
      }
    }
  }
  .column2{
    .child img{
      width: 150px;
      height: 91px;
    }
  }
  .column3{
    h4{

      span{
        font-size: 14px;
        color: #333;
        font-weight: normal;
      }
    }
    li{
      text-align: left;
    }
    .clickt{
      color: blue;
    }
  }
  .column4{
    .child{
      width: 100px;
      height: 190px;
    }
     .child img{
      width: 100px;
      height: 135px;
     }
  }
  .activeTxt{
    border: 1px solid #ddd;
    display: inline-block;
    padding: 0px 15px;

    i{
      font-size: 18px;
      color: red;
      vertical-align: middle;
    }
  }
</style>
