<template>
  <div class="journal-list content">

    <div class="label-add list-add">
      <el-button @click='addTerm'>新增</el-button>
    </div>

    <div class="journal-container list-container">
      <el-table
	    :data="tableData"
	    border
	    style="width: 100%">
	    <el-table-column
	      prop="page_sort"
	      label="编号"
	      width="100">
	    </el-table-column>
	    <el-table-column
	      prop="vid"
	      label="周刊期数"
	      width="100">
	    </el-table-column>
	    <el-table-column
	      prop="name"
	      label="主题">
	    </el-table-column>
	    <el-table-column
	      prop="create_time"
	      label="创建时间">
	    </el-table-column>
	    <el-table-column
	      prop="update_time"
	      label="发布时间">
	    </el-table-column>
	    <el-table-column
	      label="期刊状态">
	      <template slot-scope="scope">
          <span v-if="scope.row.status === '1'">已发布</span>
	      <span v-else>待发布</span>
        </template>
	    </el-table-column>
	    <el-table-column
	      label="操作"
	      width="160">
	      <template slot-scope="scope">
	        <el-button type="text" @click="editBanner(scope.row)" size="small">修改</el-button>
	        <el-button type="text" v-if="scope.row.status === '0'" @click="publish(scope.row)" size="small">发布</el-button>
	        <el-button type="text" v-if="scope.row.status !== '0'" disabled size="small">发布</el-button>
	        <el-button type="text" size="small" @click="deleteBanner(scope.row)">删除</el-button>
	      </template>
	    </el-table-column>
      </el-table>
    </div>
	 
	<el-dialog
	  title="提示"
	  :visible.sync="centerDialogVisible"
	  width="30%"
	  center>
	  <span>发布后将在app端展示，请确认是否发布？</span>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="centerDialogVisible = false">取 消</el-button>
	    <el-button type="primary" @click="confirmPublish">确 定</el-button>
	  </span>
	</el-dialog>

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
  import { termIndex, termDelete, termPublish } from '@/api/schoolH5'
  export default {
    name: 'journalList',
    data() {
      return {
        tableData: [],
        totals: 0,
        centerDialogVisible: false,
        currentScid: ''
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData() {
        const obj = {
          token: localStorage.getItem('TOKEN')
        }
        termIndex(obj)
          .then(res => {
          	if (res.hasOwnProperty('response')) {
              this.tableData = res.response.version_list
              this.totals = res.response.version_sum
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
          	console.log(err)
          })
      },
      deleteBanner(val) {
        this.$confirm('此操作将删除该期刊, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          const obj = {
	        token: localStorage.getItem('TOKEN'),
	        scid: val.scid
          }
          termDelete(obj)
            .then(res => {
            	if (res.hasOwnProperty('response')) {
                this.initData()
              } else {
                this.$message.error(res.error_response.msg)
              }
            })
            .catch(err => {
            	console.log(err)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      editBanner(val) {
        this.$router.push({ path: '/journal/journalAdd', query: { scid: val.scid }})
	  },
	  addTerm() {
	    this.$router.push({ path: '/journal/journalAdd' })
	  },
	  publish(val) {
        this.centerDialogVisible = true
        this.currentScid = val.scid
	  },
	  confirmPublish() {
        const obj = {
          token: localStorage.getItem('TOKEN'),
          scid: this.currentScid
        }
        console.log(obj)
        termPublish(obj)
          .then(res => {
          	if (res.hasOwnProperty('response')) {
          	  this.centerDialogVisible = false
              this.initData()
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
          	console.log(err)
          })
	  }
    },
    
  }
</script>

<style scoped>

</style>
