<template>
  <div class="center-content student-list">
      <my-header :msg='msg'></my-header>
      <div class="content-detail">
        <div class="title"><span class="officialMan">学困生辅导执行人管理</span><span @click='goback' class="goback">返回</span></div>
      <div class="smallTitle">
        <span class='manName'>负责人 {{ manName }}&nbsp&nbsp</span>
        <span class="manNum">执行人 {{ manNum }}人</span>
      </div>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="executor_name"
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
                @click="handleEdit(scope.row.school_id, scope.row.project_id, scope.row.teacher_id,scope.row.subject_id, scope.row.executor_id, scope.row.class_list, scope.row.template_id, scope.row.grade_id, scope.row.executor_name)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.project_id, scope.row.subject_id, scope.row.executor_id, scope.row.executor_name, scope.row.teacher_id)">删除</el-button>
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
          <p>{{ current_executor_name }}执行人</p>
          <p>删除后，该执行人及其执行范围将彻底删除</p>
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
        current_executor_name: '',
        leader_id: '',
        school_id: '',
        project_id: '',
        subject_id: '',
        grade_id: '',
        form: {
          name: ''
        },
        manName: '',
        manNum: 0,
        current_project_id: '',
        current_subject_id: '',
        current_teacher_id: '',
        msg: {
          title1: '评价项目管理',
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
      this.leader_id = this.$route.query.teacher_id
      this.school_id = this.$route.query.school_id
      this.project_id = this.$route.query.project_id
      this.subject_id = this.$route.query.subject_id
      this.grade_id = this.$route.query.grade_id
      this.getData(1)
    },
    methods: {
      getData(pages) {
        const obj = {
          page: pages,
          project_id: this.project_id,
          teacher_id: this.leader_id,
          token: localStorage.getItem('TOKEN')
        }
        leaderExecutorList(obj)
          .then(res => {
            console.log(res)
            if (res.hasOwnProperty('response')) {
              this.tableData = res.response.list
              this.total = res.response.total_page
              this.manName = res.response.leader_name
              this.manNum = res.response.teacher_count
            }
          })
      },
      handleEdit(val1, val2, val3, val4, val5, val6, val7, val8, val9) {
        console.log(val1, val2, val3, val4, val5, val6, val7)
        const datas = {
          school_id: val1,
          project_id: val2,
          leader_id: val3,
          subject_id: val4,
          executor_id: val5,
          class_list: val6,
          template_id: val7,
          grade_id: val8,
          executor_name: val9
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
      handleDelete(val1, val2, val3, val4, val5) {
        this.current_project_id = val1
        this.current_subject_id = val2
        this.current_executor_id = val3
        this.current_teacher_id = val5
        this.centerDialogVisible = true
        this.current_executor_name = val4
      },
      add() {
        const datas = {
          school_id: this.school_id,
          project_id: this.project_id,
          leader_id: this.leader_id,
          subject_id: this.subject_id,
          grade_id: this.grade_id
        }
        this.$router.push({ path: '/exectorAdd', query: datas })
      },
      goback() {
        this.$router.push({ path: '/transactorList' })
      },
      handleCurrentChange(val) {
        this.current_page = val
        this.getData(val)
        console.log(`当前页: ${val}`)
      },
      confirmDelete() {
        this.centerDialogVisible = false
        const obj = {
          project_id: this.current_project_id,
          subject_id: this.current_subject_id,
          executor_id: this.current_executor_id,
          leader_id: this.current_teacher_id,
          token: localStorage.getItem('TOKEN')
        }
        deleteExecutor(obj)
          .then(res => {
            console.log(res)
            if (res.hasOwnProperty('response')) {
              console.log(res)
              this.getData(this.current_page)
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
.title {
  width: 100%;
  height: 30px;
  margin-bottom: 30px;
  margin-top: 20px;
  color: #333;
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
  line-height: 26px;
  font-size: 15px;
  display: inline-block;
  cursor: pointer;
  padding: 3px;
  background-color: #f4f4f4;
  border-radius: 5px;
}
.smallTitle {
  margin-bottom: 10px;
}
.manName {
  font-size: 14px;
  color: #333;
}
.manNum {
  font-size: 14px;
  color: #333;
}
</style>
