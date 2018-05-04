<template>
  <div class="center-content official-list">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
    	<div class="title"><span class="officialMan">负责人管理</span><span class="goback">返回</span></div>
      <div class="smallTitle">
        <span class='manName'>管理员{{ manName }}&nbsp&nbsp</span>
        <span class="manNum">负责人{{ manNum }}</span>
      </div>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="leader"
            label="负责人"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="project"
            label="负责学科"
            width="150">
          </el-table-column>
          <el-table-column
            align="center"
            prop="grade"
            label="负责年级"
            width="150">
          </el-table-column>
          <el-table-column
            align="center"
            prop="type"
            label="执行人"
            width="100">
          </el-table-column>
          <el-table-column
            prop="projectComment"
            label="项目评语"
            min-width="300">
          </el-table-column>
          <el-table-column
            align="center" label="操作" min-width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.teacher_id, scope.row.project_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="list-add">
        <router-link to="/officialAdd">
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
          <span>请确认是否要删除</span>
          <span>{{ userName }}账户</span>
          <span>删除后，该账户将无法登录</span>
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
        manName: 'ray',
        manNum: 100,
        form: {
          name: ''
        },
        msg: {
          title1: '项目评价管理',
          title2: '负责人管理',
          flag: 1,
          path: '/itemList'
        },
        tableData: [{
          project_id: 1,
          teacher_id: 1,
          leader: 'rag',
          project: '都龙族',
          grade: 'doulongzu',
          type: '学校',
          projectComment: '武宁路育才'
        }, {
          project_id: 2,
          leader: 'haha',
          teacher_id: 2,
          project: '都龙族',
          grade: 'doulongzu',
          type: '运营',
          projectComment: ''
        }, {
          project_id: 3,
          teacher_id: 3,
          leader: 'lei',
          project: '都龙族',
          grade: 'doulongzu',
          type: '学校',
          projectComment: '武宁路育才'
        }],
        current_teacher_id: 0,
        current_project_id: 0
      }
    },
    components: {
      myHeader
    },
    mounted() {
      //获取数据
      this.getData()
    },
    methods: {
      getData() {
        const obj = {
          project_id: 1,
          page: 1,
          pagesize: 10,
          token: localStorage.getItem('TOKEN')
        }
        projectLeaderList(obj)
          .then(res => {
            console.log(res)
          })
      },
      //编辑负责人
      handleEdit(index, row) {
        console.log(index, row)
        this.$router.push({ path: '/officialEdit' })
      },
      //删除负责人
      handleDelete(index, row) {
        console.log(index, row)
        this.current_teacher_id = index
        this.current_project_id = row
        this.centerDialogVisible = true
      },
      //确认删除
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
          })
      },
      //分页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
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
  padding: 0px 20px;
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
  padding: 0px 20px;
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
