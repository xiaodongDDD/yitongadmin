<template>
  <div class="article-list content">

  	<div class="condition">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="文章标题">
          <el-input v-model="formInline.title" placeholder="文章标题"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="formInline.label" placeholder="标签"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="formInline.creator" placeholder="创建人"></el-input>
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
          <el-input v-model="formInline.special_column" placeholder="所属栏目"></el-input>
        </el-form-item>
        <el-form-item label="文章状态">
          <el-select v-model="formInline.status" placeholder="全部">
            <el-option label="待发布" value="beijing"></el-option>
            <el-option label="已发布" value="beijing"></el-option>
            <el-option label="已下架" value="beijing"></el-option>
          </el-select>
          <el-select v-model="formInline.stick" placeholder="全部">
            <el-option label="全部" value="shanghai"></el-option>
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
	    <el-tab-pane v-for="(item, index) in article_sum" :label="item.type + '('+item.article_num+')'" :name="item.name"></el-tab-pane>
	    <!-- <el-tab-pane label="育儿好文（30）" name="second"></el-tab-pane>
	    <el-tab-pane label="精品专栏（40）" name="third"></el-tab-pane>
	    <el-tab-pane label="知晓天下（20）" name="fourth"></el-tab-pane>
	    <el-tab-pane label="每周好书（50）" name="fifth"></el-tab-pane>
	    <el-tab-pane label="晓周刊（60）" name="sixth"></el-tab-pane> -->
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
          prop="title"
          label="文章标题"
          width="">
        </el-table-column>
        <el-table-column
          prop="label"
          label="标签"
          width="">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人"
          width="">
        </el-table-column>
        <el-table-column
          prop="lm_name"
          label="引用栏目"
          width="">
        </el-table-column>
        <el-table-column
          prop="ml_name"
          label="所属目录"
          width="">
        </el-table-column>
        <el-table-column
          label="是否置顶"
          width="">
          <span>是</span>
          <span>否</span>
        </el-table-column>
        <el-table-column
          prop="publish_time"
          label="发布时间"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="发布状态"
          width="120">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text" size="small">已发布</el-button>
            <el-button @click="deleteClick(scope.row)" type="text" size="small">下架</el-button>
          </template>
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
  import { getArticle } from '@/api/schoolH5'
  import { parseTime } from '@/utils/index'
  export default {
    name: 'articleList',
    data() {
      return {
        formInline: {
          title: '',
          label: '',
          creator: '',
          start_time: '',
          end_time: '',
          special_column: '',
          status: '',
          stick: '',
          type: '',
          page: ''
        },
        article_sum: [],
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
        value7: [],
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
    mounted() {
      this.initData()
    },
    methods: {
      initData() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          title: this.formInline.title,
          label: this.formInline.label,
          creator: this.formInline.creator,
          start_time: this.formInline.start_time,
          end_time: this.formInline.end_time,
          special_column: this.formInline.special_column,
          status: this.formInline.status,
          stick: this.formInline.stick,
          type: '',
          page: 1
        }
        getArticle(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.article_sum = res.response.article_sum
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      onSubmit() {
        if (this.value7 === null) {
          this.formInline.start_time = ''
          this.formInline.end_time = ''
          console.log(this.formInline.start_time, this.formInline.end_time)
        } else {
          console.log(this.value7)
          const start = this.value7[0]
          const end = this.value7[1]
          this.formInline.start_time = parseTime(start, '{y}-{m}-{d}') === '0-0-0' ? '' :   parseTime(start, '{y}-{m}-{d}')
          this.formInline.end_time = parseTime(end, '{y}-{m}-{d}') === '0-0-0' ? '' : parseTime(  end, '{y}-{m}-{d}')
          console.log(this.formInline.start_time, this.formInline.end_time)
        }
        this.initData()
      },
      handleClick() {},
      editClick(row) {},
      deleteClick(row) {}
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .tableDiv{
  	margin-top: -15px;

  }
</style>
