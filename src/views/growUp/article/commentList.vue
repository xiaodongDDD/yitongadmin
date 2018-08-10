<template>
  <div class="comment-list content">
    
    <div class="condition">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="编号">
          <el-input v-model="formInline.user" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="文章标题">
          <el-input v-model="formInline.user" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="文章状态">
          <el-select v-model="formInline.region" placeholder="全部">
            <el-option label="待发布" value="beijing"></el-option>
            <el-option label="已发布" value="beijing"></el-option>
            <el-option label="已下架" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-select v-model="formInline.region" placeholder="全部">
            <el-option label="点赞数" value="beijing"></el-option>
            <el-option label="评论数" value="beijing"></el-option>
            <el-option label="创建时间倒序" value="beijing"></el-option>
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
          prop="date"
          label="编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="文章标题"
          width="">
        </el-table-column>
        <el-table-column
          prop="province"
          label="文章状态"
          width="">
        </el-table-column>
        <el-table-column
          prop="city"
          label="评论状态"
          width="">
        </el-table-column>
        <el-table-column
          prop="address"
          label="总点赞数"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="总评论数"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="待审核数"
          width="">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="deleteClick(scope.row)" type="text" size="small">关闭评论</el-button>
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
  export default {
    name: 'commentList',
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        pageData: {
          allSum: 0
        },
        tableData: [{
          date: '201',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    methods: {
      onSubmit() {},
      addArtist() {},
      editClick(row) {},
      deleteClick(row) {}
    }
  }
</script>

<style scoped>

</style>
