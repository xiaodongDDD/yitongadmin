<template>
  <div class="center-content official-list">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
    	<div class="title"><span class="officialMan">负责人管理</span><span @click='goback' class="goback">返回</span></div>
      <div class="smallTitle">
        <span class='manName'>管理员 {{ manName }}&nbsp&nbsp</span>
        <span class="manNum">负责人 {{ manNum }}人</span>
      </div>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="teacher_name"
            label="负责人"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="subject_name"
            label="负责学科"
            width="150">
          </el-table-column>
          <el-table-column
            align="center"
            prop="grade_name"
            label="负责年级"
            width="150">
          </el-table-column>
          <el-table-column
            align="center"
            prop="count"
            label="执行人"
            width="100">
          </el-table-column>
          <el-table-column
            prop="project_comment"
            label="项目评语"
            min-width="300">
          </el-table-column>
          <el-table-column
            align="center" label="操作" min-width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row.school_id, scope.row.project_id, scope.row.teacher_name, scope.row.teacher_id, scope.row.subject_id, scope.row.grade_id)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.teacher_id, scope.row.project_id, scope.row.teacher_name)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="list-add">
          <el-button icon="el-icon-plus" @click='addItem'>新增</el-button>
         <el-pagination
          style='display:inline-block;margin-left:30%;'
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :page-count="total"
          :pageSize='10'>
        </el-pagination>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="dialogContent">
          <span>请确认是否要删除</span>
          <span>{{ current_teacher_name }}账户</span>
          <span>删除后，该负责人及其负责范围将彻底 删除</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmeDelete">确 定</el-button>
        </span>
      </el-dialog>
     </div>
  </div>
</template>

<script>
  import myHeader from '../../myHeader/myHeader'
  import { projectLeaderList, deleteLeader } from '@/api/eduAdmin'
  export default {
    name: 'officialList',
    data() {
      return {
        centerDialogVisible: false,
        userName: '',
        manName: '',
        manNum: 0,
        total: 0,
        current_page: 0,
        current_teacher_name: '',
        form: {
          name: ''
        },
        msg: {
          title1: '评价项目管理',
          title2: '负责人管理',
          flag: 1,
          path: '/itemList'
        },
        tableData: [],
        current_teacher_id: 0,
        current_project_id: 0,
        project_id: '',
        projectId: ''
      }
    },
    components: {
      myHeader
    },
    mounted() {
      // 获取数据
      // console.log(this.$route.query.hasOwnProperty('project_id'))
      if (this.$route.query.hasOwnProperty('project_id')) {
        this.project_id = this.$route.query.project_id
      } else {
        this.project_id = ''
      }
      this.getData(1)
    },
    methods: {
      getData(pages) {
        const obj = {
          project_id: this.project_id,
          page: pages,
          pagesize: 10,
          token: localStorage.getItem('TOKEN')
        }
        console.log(obj)
        projectLeaderList(obj)
          .then(res => {
            console.log(res)
            if (res.hasOwnProperty('response')) {
              this.manName = res.response.school_admin
              this.manNum = res.response.teacher_count
              this.total = res.response.total_page
              this.tableData = res.response.info
              this.projectId = res.response.project_id
            }
          })
      },
      addItem() {
        this.$router.push({ path: '/officialAdd', query: { project_id: this.projectId }})
      },
      goback() {
        this.$router.push({ path: '/itemList' })
      },
      // 编辑负责人
      handleEdit(val1, val2, val3, val4, val5, val6) {
        console.log(val1, val2, val3, val4, val5, val6)
        const datas = {
          school_id: val1,
          project_id: val2,
          teacher_name: val3,
          teacher_id: val4,
          subject_id: val5,
          grade_id: val6
        }
        this.$router.push({ path: '/officialEdit', query: datas })
      },
      // 删除负责人
      handleDelete(index, row, teacherName) {
        console.log(index, row)
        this.current_teacher_id = index
        this.current_project_id = row
        this.centerDialogVisible = true
        this.current_teacher_name = teacherName
      },
      // 确认删除
      confirmeDelete() {
        this.centerDialogVisible = false
        const obj = {
          project_id: this.current_project_id,
          teacher_id: this.current_teacher_id,
          token: localStorage.getItem('TOKEN')
        }
        deleteLeader(obj)
          .then(res => {
            console.log(res)
            if (res.hasOwnProperty('response')) {
              this.getData(this.current_page)
              this.$message.success('删除成功')
            } else {
              this.$message.error(res.error_response.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 分页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.current_page = val
        this.getData(val)
      }
    }
  }
</script>

<style scoped>
.title {
  width: 100%;
  height: 30px;
  overflow: hidden;
  margin-bottom: 20px;
  margin-top: 20px;
  color: #333;
  /*font-size: 18px;*/
  padding: 0px 1px;
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
  padding: 0px 1px;
}
.manName {
  font-size: 14px;
  color: #333;
}
.manNum {
    font-size: 14px;
    color: #333;
}
.dialogContent span {
  display:block;
}
</style>
