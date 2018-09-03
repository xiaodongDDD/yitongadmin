<template>
  <div class="data-list content">
  	<div class="condition">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="期刊数">
          <el-input v-model="term_num" type='number' placeholder="期刊数"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="label-add list-add">
      <el-button @click="outData">导出</el-button>
    </div>
  	<div class="data-container list-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="page_sort"
          label="编号"
          width="">
        </el-table-column>
        <el-table-column
          fixed
          prop="vid"
          label="周刊期数"
          width="80">
        </el-table-column>
        <el-table-column
          prop="title"
          label="主题"
          width="">
        </el-table-column>
        <el-table-column
          prop="eye_num"
          label="晓眼睛"
          width="">
        </el-table-column>
        <el-table-column
          prop="pv_all"
          label="pv"
          width="">
        </el-table-column>
        <el-table-column
          prop="uv_all"
          label="uv"
          width="">
        </el-table-column>
        <el-table-column
          prop="uv_xhb"
          label="晓黑板uv"
          width="">
        </el-table-column>
        <el-table-column
          prop="pv_xhb"
          label="晓黑板pv"
          width="">
        </el-table-column>
        <el-table-column
          prop="uv_share"
          label="uv（非晓黑板）"
          width="">
        </el-table-column>
        <el-table-column
          prop="pv_share"
          label="pv（非晓黑板）"
          width="">
        </el-table-column>
        <el-table-column
          prop="comments_all"
          label="评论数"
          width="">
        </el-table-column>
        <el-table-column
          prop="agree_num"
          label="点赞数"
          width="">
        </el-table-column>
      </el-table>
    </div>

    <div class="list-pagination">
	  <el-pagination
	  	background
	  	layout="prev, pager, next"
	  	:total="totals">
	  </el-pagination>
	</div>
  </div>
</template>

<script>
  import { termStatistics, exportUrl } from '@/api/schoolH5'
  export default {
    name: 'dataLists',
    data() {
      return {
        tableData: [],
        term_num: '',
        totals: 0
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          term_num: this.term_num
        }
        termStatistics(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.tableData = res.response.term_list
              this.totals = res.response.page_sum
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      onSubmit() {
        this.initData()
      },
      outData() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          term_num: this.term_num
        }
        exportUrl(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              console.log(res.response.exportUrl + '&token=' + obj.token)
              window.location.href = res.response.exportUrl + '&token=' + obj.token
              this.$message.success(res.response.msg)
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
