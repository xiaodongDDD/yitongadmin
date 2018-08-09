<template>
  <div class="article-list content">

  	<div class="condition">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="文章标题">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="栏目">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="文章状态">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="全部" value="shanghai"></el-option>
            <el-option label="待发布" value="beijing"></el-option>
            <el-option label="已发布" value="beijing"></el-option>
            <el-option label="已下架" value="beijing"></el-option>
          </el-select>
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="全部" value="shanghai"></el-option>
            <el-option label="已置顶" value="shanghai"></el-option>
            <el-option label="未置顶" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
  	</div>
  	
  </div>
</template>

<script>
  export default {
    name: 'articleList',
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
