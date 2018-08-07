<template>
  <div class="journal-list content">

    <div class="label-add list-add">
      <el-button>新增</el-button>
    </div>

    <div class="journal-container list-container">
      <el-table
	    :data="table1"
	    border
	    style="width: 100%">
	    <el-table-column
	      type="index"
	      label="编号"
	      width="100">
	    </el-table-column>
	    <el-table-column
	      prop="img"
	      label="周刊期数"
	      width="100">
	    </el-table-column>
	    <el-table-column
	      prop="title"
	      label="主题">
	    </el-table-column>
	    <el-table-column
	      prop="title"
	      label="创建时间">
	    </el-table-column>
	    <el-table-column
	      prop="title"
	      label="预计发布时间">
	    </el-table-column>
	    <el-table-column
	      prop="title"
	      label="实际发布时间">
	    </el-table-column>
	    <el-table-column
	      prop="title"
	      label="期刊状态">
	    </el-table-column>
	    <el-table-column
	      label="操作"
	      width="120">
	      <template slot-scope="scope">
	        <el-button type="text" @click="editBanner(scope)" size="small">修改</el-button>
	        <el-button type="text" size="small" @click="deleteBanner(scope)">删除</el-button>
	      </template>
	    </el-table-column>
      </el-table>
    </div>
	
	<div class="list-pagination">
	  <el-pagination
	  	background
	  	layout="prev, pager, next"
	  	:total="1000">
	  </el-pagination>
	</div>
  	
  </div>
</template>

<script>
  export default {
    name: 'journalList',
    data() {
      return {
        table1: [
          {
            bannerId: '101',
            img: '',
            title: '不知如何教育孩子家长怎么办',
            showTitle: true,
            href: 'www.hao123.com'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
