<template>
  <div class="comment-list content">
    
    <div class="condition">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="编号">
          <el-input v-model="formInline.num" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="文章标题">
          <el-input v-model="formInline.title" placeholder=""></el-input>
        </el-form-item>
        </el-form-item>
        <el-form-item label="排序">
          <el-select v-model="formInline.sort" placeholder="全部">
            <el-option label="点赞数" value="1"></el-option>
            <el-option label="评论数" value="2"></el-option>
            <el-option label="创建时间倒序" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
  	</div>
    <div class="tableDiv list-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="article_id"
          label="编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="title"
          label="文章标题"
          width="">
        </el-table-column>
        <el-table-column
          label="评论状态"
          width="">
          <template slot-scope="scope">
          <span v-if="scope.row.comment_on === '1'">开启</span>
          <span v-if="scope.row.comment_on === '0'">关闭</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="agrees"
          label="总点赞数"
          width="">
        </el-table-column>
        <el-table-column
          prop="comments"
          label="总评论数"
          width="">
        </el-table-column>
        <el-table-column
          prop="comments_check"
          label="待审核数"
          width="">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="changeClick(scope.row)" v-if="scope.row.comment_on === '1'" type="text" size="small">关闭评论</el-button>
            <el-button @click="changeClick(scope.row)" v-if="scope.row.comment_on === '0'" type="text" size="small">开启评论</el-button>
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
    
  </div>
</template>

<script>
  import { getGrowCommnet, changeCommnetStatus } from '@/api/schoolH5'
  export default {
    name: 'commentList',
    data() {
      return {
        formInline: {
          num: '',
          title: '',
          sort: ''
        },
        currentPage: 1,
        pageData: {
          allSum: 1
        },
        tableData: [{
          article_id: '',
          title: '',
          agrees: '',
          comments_check: '',
          comments: '',
          comment_on: '0'
        }]
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          article_id: this.formInline.num,
          title: this.formInline.title,
          sort: this.formInline.sort,
          page: this.currentPage
        }
        getGrowCommnet(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.tableData = res.response.article_list
              this.$message.success(res.response.msg)
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      onSubmit() {
        this.currentPage = 1
        this.initData()
      },
      editClick(row) {
        this.$router.push({ path: '/article/commentInfo', query: { article_id: row.article_id }})
      },
      changeClick(row) {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          article_id: row.article_id,
          status: row.comment_on
        }
        changeCommnetStatus(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.$message.success(res.response.msg)
              this.initData()
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>

</style>
