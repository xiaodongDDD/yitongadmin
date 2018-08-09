<template>
  <div class="comment-list content">
    
    <div class="condition">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formInline.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-select v-model="formInline.sort" placeholder="请选择">
            <el-option label="新增时间倒序" value="1"></el-option>
            <el-option label="文章总数" value="2"></el-option>
            <el-option label="被引用文章数" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="label-add list-add">
      <el-button @click="addArtist()">新增</el-button>
    </div>
  
    <div class="tableDiv list-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="author_id"
          label="编号"
          width="80">
        </el-table-column>
        <el-table-column
          label="头像"
          width="">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="width:80px;">
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="">
        </el-table-column>
        <el-table-column
          prop="ename"
          label="英文名"
          width="">
        </el-table-column>
        <el-table-column
          prop="introduction"
          label="简介"
          width="">
        </el-table-column>
        <el-table-column
          prop="article_sum"
          label="文章总数"
          width="">
        </el-table-column>
        <el-table-column
          prop="article_used"
          label="被引用文章数"
          width="">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="list-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageData.allSum">
      </el-pagination>
    </div>

    <el-dialog
      :title="isAdd === true ? '作者新增' : '作者编辑'"
      :visible.sync="pageDialogVisible"
      width="30%">
      <div class="edit-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="作者头像" prop="img">
            <!-- <el-input v-model="ruleForm.img"></el-input> -->
            <div class="userheader">
              <img :src="ruleForm.img" alt="" width="80px" height="80px">
            </div>
          </el-form-item>
          <el-form-item label="作者姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="最多输入40个汉字"></el-input>
          </el-form-item>
          <el-form-item label="英文名" prop="ename">
            <el-input v-model="ruleForm.ename" placeholder="最多输入50个字符"></el-input>
          </el-form-item>
          <el-form-item label="作者简介" prop="introduction">
            <el-input type="textarea" v-model="ruleForm.introduction" placeholder="最多输入300个汉字"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveArtist()">保 存</el-button>
        <el-button @click="pageDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getAuthor, handleAuthor } from '@/api/schoolH5'
  import defaultHead from '../../../assets/imgs/add-stu.png'
  export default {
    name: 'artistList',
    data() {
      return {
        isAdd: true,
        pageDialogVisible: false,
        formInline: {
          name: '',
          sort: ''
        },
        value6: '',
        value7: '',
        activeName2: 'first',
        tableData: [],
        ruleForm: {},
        ruleFormr: {
          author_id: '',
          name: '',
          ename: '',
          introduction: '',
          img: defaultHead
        },
        rules: {
          name: [
            { required: true, message: '请输入作者名称', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '请选择图片', trigger: 'blur' }
          ],
          introduction: [
            { required: true, message: '请输入作者简介', trigger: 'blur' }
          ]
        },
        pageData: {
          allSum: 0
        }
      }
    },
    methods: {
      initData(page, name, sort) {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          page: page,
          name: name,
          sort: sort
        }
        getAuthor(obj).then( res => {
          console.log(res)
          if (res.hasOwnProperty('response')) {
            const data = res.response
            this.tableData = data.author_list
            this.pageData.allSum = data.author_sum
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
      },
      addArtist() {
        this.isAdd=true
        this.pageDialogVisible=true
        this.ruleForm = this.ruleFormr
      },
      onSubmit() {
        console.log(this.formInline)
        this.initData(1, this.formInline.name, this.formInline.sort)
      },
      editClick(row) {
        console.log(row)
        this.isAdd = false
        this.pageDialogVisible = true

        this.ruleForm = row
      },
      saveArtist() {
        // console.log(this.ruleForm)
        this.ruleForm.token = localStorage.getItem('TOKEN')
        this.ruleForm.introduce = this.ruleForm.introduction
        handleAuthor(this.ruleForm).then( res => {
          console.log(res)
          if (res.hasOwnProperty('response')) {
            const data = res.response
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.pageDialogVisible = false
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
      }
    },
    mounted() {
      this.initData(1)
    }
  }
</script>

<style scoped>
  .userheader{
    width: 80px;
    height: 80px;
    overflow: hidden;
    border: 1px solid #999;
    border-radius: 80px;
  }
</style>
