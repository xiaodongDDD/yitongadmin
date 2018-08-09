<template>
  <div class="banner-list content">

    <div class="banner-switch">
      <el-button @click="toMajor" v-bind:class="{'active': isMajor}">主banner</el-button>
      <el-button @click="notMajor" v-bind:class="{'active': !isMajor}">广告位banner</el-button>
    </div>

    <div class="banner-add list-add">
      <el-button @click="editDialogVisible=true;isAdd=true">新增</el-button>
    </div>

    <div class="banner-container list-container">
      <div class="major-banner">
        <el-table
          :data="table"
          border
          style="width: 100%">
          <el-table-column
            prop="sort"
            label="排序"
            width="100">
          </el-table-column>
          <el-table-column
            label="图片"
            width="180">
            <template slot-scope="scope">
              <img :src="scope.row.img_url" style="width:140px;">
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="link"
            label="链接">
          </el-table-column>
          <el-table-column
            label="编辑"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="editBanner(scope.row)" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="deleteBanner(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog
      :title="isAdd === true ? '新增banner' : '修改banner'"
      :visible.sync="editDialogVisible"
      id='infos'
      width="30%">
      <div class="edit-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="编号" v-show="!isAdd">
            <span>{{ruleForm.sort}}</span>
          </el-form-item>
          <el-form-item label="标题" prop='title'>
            <el-input v-model="ruleForm.title" placeholder="最多输入20个汉字"></el-input>
          </el-form-item>
          <el-form-item label="标题是否展示">
            <el-radio-group v-model="ruleForm.title_show">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="展示排序" prop="sort">
            <el-input v-model="ruleForm.sort"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop='urls'>
            <upImage ref="upLoadFile" :urls="urls"></upImage>
          </el-form-item>
          <el-form-item label="链接" prop="link">
            <el-input v-model="ruleForm.link"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click='saveInfo'>保存</el-button>
            <el-button @click='cancelInfo'>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

 <!--    <el-dialog
      title="是否展示标题"
      :visible.sync="titleDialogVisible"
      width="30%">
      <span>标题开启/关闭后app端展示如下图所示，请确认是否开启/关闭？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="titleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="titleDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
 -->
  </div>
</template>

<script>
  import upImage from '../upImg/upImage'
  import { getGrowBanner, handleGrowBanner } from '@/api/schoolH5'
  export default {
    name: 'bannerList',
    data() {
      return {
        isMajor: true,
        isAdd: true,
        table: [],
        ruleForm: {
          banner_id: '',
          title: '',
          title_show: '',
          img_url: '',
          link: '',
          type: '0',
          sort: ''
        },
        urls: '',
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          showTitle: [
            { required: true, message: '请选择是否展示标题', trigger: 'change' }
          ],
          sort: [
            { required: true, message: '请输入展示排序', trigger: 'blur' }
          ],
          link: [
            { required: true, message: '请输入链接', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '请选择图片', trigger: 'blur' }
          ]
        },
        table1: [
          {
            bannerId: '101',
            img: '',
            title: '不知如何教育孩子家长怎么办',
            showTitle: true,
            href: 'www.hao123.com'
          }
        ],
        table2: [
          {
            bannerId: '102',
            img: '',
            title: '学霸就是这么任性',
            showTitle: false,
            href: 'www.hao123.com'
          }
        ],
        editDialogVisible: false,
        titleData: {
          bannerId: '',
          showTitle: ''
        }
      }
    },
    mounted() {
      this.table = this.table1
      this.initData(1)
    },
    components: {
      upImage
    },
    methods: {
      // 切换banner列表
      toMajor() {
        this.isMajor = true
        this.table = this.table1
        this.initData(1)
      },
      notMajor() {
        this.isMajor = false
        this.table = this.table2
        this.initData(2)
      },
      // 初始化数据
      initData(val) {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          type: val
        }
        getGrowBanner(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.table = res.response.banner_list
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 获取标题信息
      getTitle(scope) {
        const row = scope.row
        this.titleData.bannerId = row.bannerId
        this.titleData.showTitle = row.showTitle
        this.titleDialogVisible = true
      },
      // 编辑
      editBanner(scope) {
        console.log(scope)
        this.isAdd = false
        this.ruleForm.banner_id = scope.banner_id
        this.ruleForm.title = scope.title
        this.ruleForm.title_show = scope.title_show
        this.ruleForm.img_url = scope.img_url
        this.urls = scope.img_url
        this.ruleForm.link = scope.link
        this.ruleForm.type = scope.type
        this.ruleForm.sort = scope.sort
        this.editDialogVisible = true
      },
      saveInfo() {
        this.ruleForm.img_url = this.$refs.upLoadFile.getUrl() !== '' ? this.$refs.upLoadFile.getUrl() : this.ruleForm.img_url
        const obj = {
          token: localStorage.getItem('TOKEN'),
          banner_id: this.ruleForm.banner_id,
          title: this.ruleForm.title,
          title_show: this.ruleForm.title_show,
          img_url: this.ruleForm.img_url,
          link: this.ruleForm.link,
          type: this.ruleForm.type,
          sort: this.ruleForm.sort
        }
        handleGrowBanner(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.editDialogVisible = false
              this.$message.success(res.response.msg)
              this.initData(obj.type)
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      cancelInfo() {
        this.editDialogVisible = false
      },
      // 删除
      deleteBanner(scope) {
        console.log(scope)
        this.$confirm('此操作将永久删除该banner, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    watch: {
      'editDialogVisible': function(news, olds) {
        if (news === false) {
          this.ruleForm.banner_id = ''
          this.ruleForm.title = ''
          this.ruleForm.title_show = '0'
          this.ruleForm.img_url = ''
          this.urls = ''
          this.ruleForm.link = ''
          this.ruleForm.type = ''
          this.ruleForm.sort = ''
        }
      }
    }
  }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  .el-button.active{
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
</style>
<style type="text/css">
  #infos .el-dialog__headerbtn .el-dialog__close {
    display:  none;
  }
</style>
