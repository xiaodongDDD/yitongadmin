<template>
  <div class="center-content item-list">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
    	<div class="schoolName"><span class='schools'>{{ schoolName }}</span>
          <el-dropdown @command="handleCommand"  trigger="click" v-if='chooseShow'>
          <span class="el-dropdown-link change">
            切换
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, value) in schools" :key='value' :command="item.school_id">{{ item.school_name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="status"
            label="项目状态"
            width="100">
            <template slot-scope="scope">
              <el-select size="mini" v-model="scope.row.project_status" @change='changeStatus(scope.row.project_id, scope.row.project_status)' placeholder="请选择">
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
            prop="project_name"
            label="项目名称"
            width="150">
          </el-table-column>
          <el-table-column
            align="left"
            prop="project_remark"
            label="项目说明"
            max-width="400">
          </el-table-column>
          <el-table-column
            align="center"
            label="负责人"
            width="100">
            <template slot-scope="scope">
              <span v-if='scope.row.leader_cnt != 0' @click='go(scope.row.project_id)' style='cursor: pointer;'>{{ scope.row.leader_cnt }}</span>
              <span @click='go(scope.row.project_id)' v-if='scope.row.leader_cnt == 0' style='cursor: pointer;'><i class="el-icon-edit-outline"></i></span>
            </template>
          </el-table-column>
          <el-table-column
            align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row.project_id, scope.row.school_id)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.project_id)">删除</el-button>
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
import { getProjectList, deleteProject, statusProject, showSchools, isOperate } from '@/api/eduAdmin'
export default {
  name: 'itemList',
  data() {
    return {
      centerDialogVisible: false,
      userName: '',
      total: 0,
      current_page: 1,
      chooseShow: false,
      form: {
        name: '',
        options: [{ value: '0', label: '启用' }, { value: '1', label: '停用' }]
      },
      msg: {
        title1: '项目评价管理',
        title2: '',
        flag: 0,
        path: '/itemList'
      },
      schools: [],
      schoolId: '',
      schoolName: '',
      // options: [{
      //   value: '选项1',
      //   label: '启用'
      // }, {
      //   value: '选项2',
      //   label: '停用'
      // }],
      // value: '选项1',
      tableData: [],
      current_proID: ''
    }
  },
  components: {
    myHeader
  },
  mounted() {
    this.getData(1, this.schoolId)
    this.getSchoolList()
    this.checkId()
  },
  methods: {
    getData(pages, schoolId) {
      const obj = {
        school_id: schoolId,
        page: pages,
        pagesize: 10,
        token: localStorage.getItem('TOKEN')
      }
      console.log(obj)
      getProjectList(obj)
        .then(res => {
          console.log(res)
          if (res.hasOwnProperty('response')) {
            this.tableData = res.response.list
            this.total = res.response.total_page
            this.schoolName = res.response.list[0].school_name
            // for (let i = 0; i < res.response.list.length; i++) {
            //   if (res.response.list[i].project_status === "0") {
            //     res.response.list[i].status = '启用'
            //   } else {
            //     res.response.list[i].status = '停用'
            //   }
            // }
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkId() {
      const obj = {
        token: localStorage.getItem('TOKEN')
      }
      isOperate(obj)
        .then(res => {
          if (res.hasOwnProperty('response')) {
            if (res.response.is_operate) {
              this.chooseShow = true
            } else {
              this.chooseShow = false
            }
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleEdit(val, val2) {
      console.log(val)
      this.$router.push({ path: '/itemEdit', query: { project_id: val, school_id: val2 }})
    },
    handleDelete(val) {
      console.log(val)
      this.current_proID = val
      this.centerDialogVisible = true
    },
    handleCommand(index) {
      // console.log(command)
      console.log(index)
      this.schoolId = index
      this.getData(1, this.schoolId)
    },
    change() {
      console.log('change')
    },
    addItem() {
      const val = this.schoolId
      this.$router.push({ path: '/itemAdd', query: { school_id: val }})
    },
    getSchoolList() {
      const obj = {
        token: localStorage.getItem('TOKEN')
      }
      showSchools(obj)
        .then(res => {
          console.log(res)
          if (res.hasOwnProperty('response')) {
            this.schools = res.response.schools
          }
        })
    },
    go(val) {
      this.$router.push({ path: '/officialList', query: { project_id: val }})
    },
    changeStatus(id, status) {
      // console.log('first', status)
      // let afterStatus = status
      // if (status === "0") {
      //   afterStatus = "1"
      // } else if (status === "1") {
      //   afterStatus = "0"
      // }
      // console.log('second',afterStatus)
      const obj = {
        project_id: id,
        project_status: status,
        token: localStorage.getItem('TOKEN')
      }
      statusProject(obj)
        .then(res => {
          console.log(res)
          this.getData(this.current_page, this.schoolId)
        })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.current_page = val
      this.getData(val, this.schoolId)
    },
    confirmDelete() {
      this.centerDialogVisible = false
      const obj = {
        project_id: this.current_proID,
        token: localStorage.getItem('TOKEN')
      }
      deleteProject(obj)
        .then(res => {
          console.log(res)
          if (res.hasOwnProperty('response')) {
            this.getData(this.current_page, this.schoolId)
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.error_response.msg)
          }
        })
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
