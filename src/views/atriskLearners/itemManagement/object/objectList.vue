<template>
  <div class="center-content object-list">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">评价对象管理</p>
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
            label="项目说明">
          </el-table-column>
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
            prop="g_c_name"
            label="执行班级">
          </el-table-column>
          <el-table-column
            align="center"
            prop="project_comment"
            label="评语">
          </el-table-column>
          <el-table-column
            align="center"
            label="评价对象"
            width='100'>
             <template slot-scope="scope">
              <span v-if='scope.row.num != 0'  @click='go(scope.row.executor_id, scope.row.subject_id)' style='cursor: pointer;'>{{ scope.row.num }}</span>
              <span @click='go(scope.row.executor_id, scope.row.subject_id)' v-if='scope.row.num == 0' style='cursor: pointer;'><i class="el-icon-edit-outline"></i></span>
            </template>
          </el-table-column>

          <el-table-column
            align="center" label="操作" width="">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row.executor_id, scope.row.subject_id)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-pagination
          style='display:inline-block;margin-left:37%;margin-top:20px;'
          @current-change="handleCurrentChange"  
          background
          layout="prev, pager, next"
          :page-count="total">
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
import { getObjectList } from '@/api/eduAdmin'
export default {
  name: 'objectList',
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
        title2: '评价对象管理',
        flag: 1,
        path: '/itemList'
      },
      tableData: [{
        project_name: '1212',
        project_remark: '2hahashdasdh',
        teacher_name: '112sdasdas',
        subject_name: '1212sdas',
        g_c_name: 'dadasd',
        project_comment: 'uyasyasd',
        num: 12
      }]
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
      getObjectList(obj)
        .then(res => {
          if (res.hasOwnProperty('response')) {
            console.log(res)
            this.tableData = res.response.list
            this.total = res.response.allPage
          } else {
            console.log(res)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleEdit(val1, val2) {
      console.log(val1, val2)
      this.$router.push({ path: '/objectEdit', query: { teacher_id: val1, subject_id: val2 }})
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.centerDialogVisible = true
    },
    go(val1, val2) {
      console.log(val1, val2)
      this.$router.push({ path: '/objectMan', query: { teacher_id: val1, subject_id: val2 }})
    },
    handleCurrentChange(val) {
      this.getData(val)
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>
.title {
  margin-bottom: 30px;
}
.position {
   margin-bottom: 30px;
   text-indent: 0px;
}
</style>
