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
            prop="onOff"
            label="执行人"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="执行学科"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="userName"
            label="执行班级"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="type"
            label="评价项目"
            width="200">
          </el-table-column>
          <el-table-column
            align="center"
            label="评价对象"
            prop="comment">
          </el-table-column>
          <el-table-column
            align="center" label="操作" width="">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.project_id, scope.row.subject_id, scope.row.teacher_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="list-add">
        <router-link to="/exectorAdd">
          <el-button icon="el-icon-plus">新增</el-button>
        </router-link>
        <el-pagination
          style='display:inline-block;margin-left:30%;' 
          @current-change="handleCurrentChange" 
          background
          layout="prev, pager, next"
          :total="1000">
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
  import { leaderExecutorList, deleteExecutor } from '@/api/eduAdmin'
  export default {
    name: 'poorStudent',
    data() {
      return {
        centerDialogVisible: false,
        userName: '',
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
        tableData: [{
          onOff: 0,
          name: '都龙族',
          userName: 'doulongzu',
          type: '学校',
          comment: '武宁路育才'
        }, {
          onOff: 1,
          name: '都龙族',
          userName: 'doulongzu',
          type: '运营',
          comment: ''
        }, {
          onOff: 0,
          name: '都龙族',
          userName: 'doulongzu',
          type: '学校'
        }]
      }
    },
    components: {
      myHeader
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        const obj = {
          project_id: 1,
          teacher_id: 10220,
          token: localStorage.getItem('TOKEN')
        }
        leaderExecutorList(obj)
          .then(res => {
            console.log(res)
          })
      },
      handleEdit(index, row) {
        console.log(index, row)
        this.$router.push({ path: '/exectorEdit' })
      },
      handleDelete(val1, val2, val3) {
        this.current_project_id = val1
        this.current_subject_id = val2
        this.current_teacher_id = val3
        this.centerDialogVisible = true
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      confirmDelete() {
        const obj = {
          project_id: this.current_project_id,
          subject_id: this.current_subject_id,
          teacher_id: this.current_teacher_id
        }
        deleteExecutor(obj)
          .then(res => {
            console.log(res)
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
