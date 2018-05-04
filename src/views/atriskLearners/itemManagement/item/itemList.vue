<template>
  <div class="center-content item-list">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
    	<div class="schoolName"><span class='schools'>上海市普陀区武宁路小学</span><span class='change' @click='change'>切换</span></div>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="onOff"
            label="账户状态"
            width="100">
            <template slot-scope="scope">
              <el-select size="mini" v-model="scope.row.onOff" @change='changeStatus(scope.row.project_id, scope.row.project_status)' placeholder="请选择">
                <el-option
                  v-for="item in form.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="userName"
            label="用户名"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="type"
            label="类型"
            width="60">
          </el-table-column>
          <el-table-column
            prop="schoolName"
            label="学校名称">
          </el-table-column>
          <el-table-column
            align="center"
            prop="telephone"
            label="手机号"
            width="110">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱">
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
                @click="handleDelete(scope.$index, userName = scope.row.name)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="list-add">
        <router-link to="/itemAdd">
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
          <p>{{ userName }}账户</p>

          <p>删除后，该账户将无法登录</p>
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
import { getProjectList, deleteProject, statusProject } from '@/api/eduAdmin'
export default {
  name: 'itemList',
  data() {
    return {
      centerDialogVisible: false,
      userName: '',
      form: {
        name: '',
        options: [{ value: '1', label: '启用' }, { value: '0', label: '停用' }]
      },
      msg: {
        title1: '项目评价管理',
        title2: '',
        flag: 0,
        path: '/itemList'
      },
      // options: [{
      //   value: '选项1',
      //   label: '启用'
      // }, {
      //   value: '选项2',
      //   label: '停用'
      // }],
      // value: '选项1',
      tableData: [{
        onOff: '停用',
        project_status: 0,
        name: '都龙族',
        userName: 'doulongzu',
        type: '学校',
        schoolName: '武宁路育才',
        email: '16783949@163.com',
        project_id: 1,
        telephone: '13533790697'
      }, {
        onOff: '启用',
        project_status: 1,
        name: '都龙族',
        userName: 'doulongzu',
        type: '运营',
        project_id: 2,
        schoolName: '',
        email: '16783949@163.com',
        telephone: '13533790697'
      }, {
        onOff: '停用',
        project_status: 0,
        name: '都龙族',
        project_id: 3,
        userName: 'doulongzu',
        type: '学校',
        schoolName: '武宁路育才',
        email: '16783949@163.com',
        telephone: '13533790697'
      }, {
        onOff: '启用',
        project_status: 1,
        name: '都龙族',
        project_id: 4,
        userName: 'doulongzu',
        type: '运营',
        schoolName: '武宁路育才11',
        email: '1623123783949@163.com',
        telephone: '13533790697'
      }]
    }
  },
  components: {
    myHeader
  },
  mounted() {
  },
  methods: {
    getData() {
      const obj = {
        school_id: 1,
        page: 1,
        pagesize: 10,
        token: localStorage.getItem('TOKEN')
      }
      getProjectList(obj)
        .then(res => {
          console.log(res)
        })
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.$router.push({ path: '/itemEdit' })
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.centerDialogVisible = true
    },
    handleCommand(indexx) {
      // console.log(command)
      console.log(indexx)
    },
    change() {
      console.log('change')
    },
    changeStatus(id, status) {
      console.log(id, status)
      let afterStatus = status
      if (status === 0) {
        afterStatus = 1
      } else {
        afterStatus = 0
      }
      console.log(afterStatus)
      const obj = {
        project_id: id,
        project_status: afterStatus,
        token: localStorage.getItem('TOKEN')
      }
      statusProject(obj)
        .then(res => {
          console.log(res)
          this.getData()
        })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    confirmDelete() {
      const obj = {
        project_id: 1,
        token: localStorage.getItem('TOKEN')
      }
      deleteProject(obj)
        .then(res => {
          console.log(res)
        })
      this.centerDialogVisible = false
    }
  }
}
</script>

<style scoped>
.schoolName {
  margin-bottom: 30px;
  margin-top: 20px;
}
.schools {
  display: inline-block;
  margin-right: 30px;
}
.change {
  display: inline-block;
  width: 40px;
  text-align: center;
  line-height: 22px;
  border-radius: 5px;
  font-size: 14px;
  height: 25px;
  border: 1px solid #f4f4f4;
  padding: 2px;
  background-color: #f4f4f4;
  cursor: pointer;

}
</style>
