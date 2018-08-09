<template>
  <div class="article-list content">

  	<div class="condition">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="文章标题">
          <el-input v-model="formInline.user" placeholder="文章标题"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="formInline.user" placeholder="标签"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="formInline.user" placeholder="创建人"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
		    v-model="value7"
		    type="daterange"
		    align="right"
		    unlink-panels
		    range-separator="至"
		    start-placeholder="开始日期"
		    end-placeholder="结束日期"
		    :picker-options="pickerOptions2">
		  </el-date-picker>
        </el-form-item>
        <el-form-item label="栏目">
          <el-input v-model="formInline.user" placeholder="所属栏目"></el-input>
        </el-form-item>
        <el-form-item label="文章状态">
          <el-select v-model="formInline.region" placeholder="全部">
            <el-option label="待发布" value="beijing"></el-option>
            <el-option label="已发布" value="beijing"></el-option>
            <el-option label="已下架" value="beijing"></el-option>
          </el-select>
          <el-select v-model="formInline.region" placeholder="全部">
            <el-option label="已置顶" value="shanghai"></el-option>
            <el-option label="未置顶" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
  	</div>

    <div class="label-add list-add">
      <el-button @click="isAdd=true;signDialogVisible=true">新增</el-button>
    </div>

  	<div class="article-container list-container">
  	  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
	    <el-tab-pane label="全部（123）" name="first"></el-tab-pane>
	    <el-tab-pane label="育儿好文（30）" name="second"></el-tab-pane>
	    <el-tab-pane label="精品专栏（40）" name="third"></el-tab-pane>
	    <el-tab-pane label="知晓天下（20）" name="fourth"></el-tab-pane>
	    <el-tab-pane label="每周好书（50）" name="fifth"></el-tab-pane>
	    <el-tab-pane label="晓周刊（60）" name="sixth"></el-tab-pane>
	  </el-tabs>

	
	  <div class="tableDiv">
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
          label="标签"
          width="">
        </el-table-column>
        <el-table-column
          prop="city"
          label="创建时间"
          width="">
        </el-table-column>
        <el-table-column
          prop="address"
          label="创建人"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="引用栏目"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="所属目录"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="是否置顶"
          width="">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="发布时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="发布状态"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
	  </div>
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
    name: 'articleList',
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value6: '',
        value7: '',
        activeName2: 'first',
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
      handleClick() {},
      editClick(row) {
      	console.log(row)
      },
      deleteClick(row) {
      	console.log(row)
      	this.$confirm('删除之后栏目将不再显示此篇文章，可能对app端展示造成影响，请确认是否删除该文章？', '提示', {
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
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .tableDiv{
  	margin-top: -15px;

  }
</style>
