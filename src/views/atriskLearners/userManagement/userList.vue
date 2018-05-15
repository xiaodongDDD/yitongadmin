<template>
  <div class="user-list center-content">

    <!--<div class="search-contaier">-->
      <!--<el-form ref="form" :inline="true" :model="form" label-width="80px">-->
        <!--<el-form-item>-->
          <!--<el-input v-model="form.name" placeholder="请搜索学校名称"></el-input>-->
          <!--<i class="el-icon-search search-icon"></i>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="清除搜索"></el-form-item>-->
      <!--</el-form>-->
    <!--</div>-->
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position"></p>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="enabled_status"
            label="产品状态"
            width="100">
            <template slot-scope="scope">
              <el-select size="mini" v-model="scope.row.enabled_status" @change="changeStatus(scope.row.school_id, scope.row.enabled_status)" placeholder="请选择">
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
            prop="school_name"
            label="学校名称"
            width="">
          </el-table-column>
          <el-table-column
            align="center"
            prop="teacher_name"
            label="管理员">
          </el-table-column>
          <el-table-column
            align="center"
            prop="phone"
            label="手机号">
          </el-table-column>

          <el-table-column
            align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>


      <div class="list-add">
        <router-link to="/userAdd">
          <el-button icon="el-icon-plus">新增</el-button>
        </router-link>
        <el-pagination
          style='display:inline-block;margin-left:30%;'
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :page-count="pageData.allPage">
        </el-pagination>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="dialogContent">
          <p>请确认是否要删除</p>
          <p>{{ deleteInfo.school_name }}学校账户</p>

          <p>删除后，该学校所有账户将无法登录</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteUser">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  import { changeUserStatus, getUserList, deleteUser } from '@/api/eduAdmin'
  export default {
    name: 'userList',
    data() {
      return {
        centerDialogVisible: false,
        schoolName: '',
        form: {
          name: '',
          options: [{ value: '1', label: '启用' }, { value: '0', label: '停用' }]
        },
        msg: {
          title1: '学校用户管理',
          title2: '',
          flag: 0,
          path: '/userList'
        },
        tableData: [],
        pageData: {
          page: '',
          allPage: 1
        },
        deleteInfo: {}
      }
    },
    components: {
      myHeader
    },
    methods: {
      changeStatus(id, status) {
        const obj = {}
        obj.school_id = id
        obj.project_status = status
        obj.token = localStorage.getItem('TOKEN')
        // console.log(status)
        changeUserStatus(obj).then(res => {
          console.log(res)
          if (res.hasOwnProperty('response')) {
            this.$message('修改成功')
          } else {
            this.$alert(res.error_response.msg, '提示', {
              confirmButtonText: '确定'
            })
            this.getList(this.pageData.page)
          }
        })
      },
      handleEdit(index, row) {
        this.$router.push({ path: '/userEdit', query: { 'school_id': row.school_id }})
      },
      handleDelete(row) {
        this.token = localStorage.getItem('TOKEN')
        this.deleteInfo.school_name = row.school_name
        this.deleteInfo.school_id = row.school_id
        // console.log(this.deleteInfo)
        this.centerDialogVisible = true
      },
      deleteUser() {
        this.deleteInfo.token = localStorage.getItem('TOKEN')
        deleteUser(this.deleteInfo).then(res => {
          if (res.hasOwnProperty('response')) {
            this.$message('删除成功')
            this.centerDialogVisible = false
            this.getList(this.pageData.page)
          } else {
            this.$alert(res.error_response.msg, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      },
      handleCurrentChange(val) {
        this.getList(val)
      },
      getList(page) {
        const obj = {}
        obj.token = localStorage.getItem('TOKEN')
        obj.page = page
        // obj.pagesize = 1
        this.pageData.page = page
        getUserList(obj).then(res => {
          if (res.hasOwnProperty('response')) {
            this.tableData = res.response.list
            this.pageData.allPage = res.response.total_page
          }
        })
      }
    },
    mounted() {
      this.getList(1)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
