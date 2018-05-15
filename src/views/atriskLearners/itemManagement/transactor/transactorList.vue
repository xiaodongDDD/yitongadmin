<template>
  <div class="center-content transactor-list">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
    	<p class="position">执行人管理</p>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="project_name"
            label="项目名称"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="project_remark"
            label="项目说明"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="teacher_name"
            label="负责人"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="subject_name"
            label="负责学科">
          </el-table-column>
          <el-table-column
            align="center"
            prop="grade_name"
            label="负责年级">
          </el-table-column>
          <el-table-column
            align="center"
            prop="telephone"
            label="评语"
            width="110">
          </el-table-column>
          <el-table-column
            align="center"
            label="执行人">
             <template slot-scope="scope">
              <span v-if='scope.row.count != 0' @click='go(scope.row.teacher_id, scope.row.school_id, scope.row.project_id, scope.row.subject_id)' style='cursor: pointer;'>{{ scope.row.count }}</span>
              <span @click='go(scope.row.teacher_id, scope.row.school_id, scope.row.project_id, scope.row.subject_id)' v-if='scope.row.count == 0' style='cursor: pointer;'><i class="el-icon-edit-outline"></i></span>
            </template>
          </el-table-column>

          <el-table-column
            align="center" label="操作" width="">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row.teacher_id, scope.row.project_id)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

       <el-pagination
          style='display:inline-block;margin-left:37%;margin-top:20px;' 
          @current-change="handleCurrentChange" 
          background
          layout="prev, pager, next"
          :page-count="total"
          :pageSize='10'>
        </el-pagination>

      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="dialogContent">
          <p>请确认是否要删除</p>
          <p>{{ userName }}账户</p>
          <p>删除后，该账户将无法登录</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div> 
  </div>
</template>

<script>
 import myHeader from '../../myHeader/myHeader'
 import { projectExecutorList } from '@/api/eduAdmin'
 export default {
   name: 'officialList',
   data() {
     return {
       centerDialogVisible: false,
       userName: '',
       total: 0,
       form: {
         name: ''
       },
       msg: {
         title1: '项目评价管理',
         title2: '执行人管理',
         flag: 1,
         path: '/itemList'
       },
       tableData: []
     }
   },
   components: {
     myHeader
   },
   mounted() {
     this.getData(1)
   },
   methods: {
     getData(pages) {
       const obj = {
         page: pages,
         token: localStorage.getItem('TOKEN')
       }
       projectExecutorList(obj)
         .then(res => {
           if (res.hasOwnProperty('response')) {
             console.log(res)
             this.tableData = res.response.list
             this.total = res.response.total_page 
           } else {
             this.$message.error(res.error_response.msg)
           }
         })
         .catch(err => {
           console.log(err)
         })
     },
     handleEdit(val1, val2) {
       console.log(val1, val2)
       this.$router.push({ path: '/transactorEdit', query: { teacher_id: val1, project_id: val2 }})
     },
     handleDelete(index, row) {
       console.log(index, row)
       this.centerDialogVisible = true
     },
     go(val1, val2, val3, val4) {
       console.log(val1, val2, val3, val4)
       const datas = {
         teacher_id: val1,
         school_id: val2,
         project_id: val3,
         subject_id: val4
       }
       this.$router.push({ path: '/poorStudentEdit', query: datas })
     },
     handleCurrentChange(val) {
       console.log(`当前页: ${val}`)
       this.getData(val)
     }
   }
}
</script>

<style scoped>
.title{
  margin-bottom: 30px;
}
</style>
