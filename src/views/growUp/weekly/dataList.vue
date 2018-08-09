<template>
  <div class="data-list content">
  	
  	<div class="data-container list-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="编号"
          width="">
        </el-table-column>
        <el-table-column
          fixed
          prop="date"
          label="周刊期数"
          width="80">
        </el-table-column>
        <el-table-column
          prop="province"
          label="主题"
          width="">
        </el-table-column>
        <el-table-column
          prop="city"
          label="晓眼睛"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="pv"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="uv"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="晓黑板uv"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="晓黑板pv"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="uv（非晓黑板）"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="pv（非晓黑板）"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="评论数"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="点赞数"
          width="">
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
    name: 'dataList',
    data() {
      return {
        tableData: [{
          date: '201',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    }
  }
</script>

<style scoped>

</style>
