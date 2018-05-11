<template>
  <div class="center-content student-list">
      <my-header :msg='msg'></my-header>
      <div class="content-detail">
        <div class="title"><span class="officialMan">学困生辅导执行人管理</span><span class="goback">返回</span></div>
      <div class="smallTitle">
        <span class='manName'>管理员 {{ manName }}&nbsp&nbsp</span>
        <span class="manNum">负责人 {{ manNum }}</span>
      </div>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="teacher_name"
            label="执行人"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="subject_name"
            label="执行学科"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="class_names"
            label="执行班级">
          </el-table-column>
          <el-table-column
            align="center"
            prop="project_name"
            label="评价项目"
            width="200">
          </el-table-column>
          <el-table-column
            align="center"
            label="评价对象"
            prop="count"
            width="100">
          </el-table-column>
          <el-table-column
            align="center" label="操作" width="">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row.school_id, scope.row.project_id, scope.row.teacher_id,scope.row.subject_id, scope.row.executor_id, scope.row.class_list, scope.row.template_id, scope.row.grade_id)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.project_id, scope.row.subject_id, scope.row.teacher_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="list-add">      
          <el-button icon="el-icon-plus" @click="add()">新增</el-button>
        <el-pagination
          style='display:inline-block;margin-left:30%;' 
          @current-change="handleCurrentChange" 
          background
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="dialogContent">
          <p>请确认是否要删除</p>
          <p>{{ userName }}执行人</p>
          <p>删除后，该执行人及其执行范围讲彻底删除</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmDelete">确 定</el-button>
        </span>
      </el-dialog>
    </div>  
  </div>
</template>

<script>
  import myHeader from '../../myHeader/myHeader'
  import { leaderExecutorList, deleteExecutor, getExecutor } from '@/api/eduAdmin'
  export default {
    name: 'poorStudent',
    data() {
      return {
        centerDialogVisible: false,
        userName: '',
        total: 0,
        current_page: 1,
        form: {
          name: ''
        },
        manName: 'ray',
        manNum: '111',
        current_project_id: '',
        current_subject_id: '',
        current_teacher_id: '',
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
      // this.leader_id = this.$route.query.teacher_id
      this.getData(1)
    },
    methods: {
      getData(pages) {
        const obj = {
          page: pages,
          project_id: 1,
          teacher_id: 10220,
          token: localStorage.getItem('TOKEN')
        }
        leaderExecutorList(obj)
          .then(res => {
            console.log(res)
            if (res.hasOwnProperty('response')) {
              this.tableData = res.response.list
              this.total = res.response.total_page
            }
          })
      },
      handleEdit(val1, val2, val3, val4, val5, val6, val7, val8) {
        console.log(val1, val2, val3, val4, val5, val6, val7)
        const datas = {
          school_id: val1,
          project_id: val2,
          leader_id: val3,
          subject_id: val4,
          executor_id: val5,
          class_list: val6,
          template_id: val7,
          grade_id: val8
        }
        const obj = {
          school_id: val1,
          project_id: val2,
          leader_id: val3,
          subject_id: val4,
          executor_id: val5,
          token: localStorage.getItem('TOKEN')
        }
        getExecutor(obj)
          .then(res => {
            if (res.hasOwnProperty('response')) {
              this.$router.push({ path: '/exectorEdit', query: datas })
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      handleDelete(val1, val2, val3) {
        this.current_project_id = val1
        this.current_subject_id = val2
        this.current_executor_id = val3
        this.centerDialogVisible = true
      },
      add() {
        const datas = {
        }
        this.$router.push({ path: '/exectorAdd', query: datas })
      },
      handleCurrentChange(val) {
        this.current_page = val
        this.getData(val)
        console.log(`当前页: ${val}`)
      },
      confirmDelete() {
        const obj = {
          project_id: this.current_project_id,
          subject_id: this.current_subject_id,
          executor_id: this.current_executor_id,
          token: localStorage.getItem('TOKEN')
        }
        deleteExecutor(obj)
          .then(res => {
            console.log(res)
            if (res.hasOwnProperty('response')) {
              this.centerDialogVisible = false
              console.log(res)
              this.getData(this.current_page)
            } else {
              console.log(res.error_response.msg)
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
.title {
  width: 100%;
  height: 30px;
  overflow: hidden;
  margin-bottom: 30px;
  margin-top: 20px;
}
.officialMan {
   float: left;
   height: 30px;
   line-height: 30px;
   display: inline-block;
}
.goback {
  float: right;
  height: 30px;
  line-height: 30px;
  display: inline-block;
}
.smallTitle {
  margin-bottom: 10px;
}
.manName {
  font-size: 14px;
}
.manNum {
    font-size: 14px;
}
</style>
