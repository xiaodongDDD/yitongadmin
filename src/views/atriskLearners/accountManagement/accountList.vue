<template>
  <div class="center-content account-list">
    <!--<div class="search-contaier">-->
      <!--<el-form ref="form" :inline="true" :model="form" label-width="80px">-->
        <!--<el-form-item>-->
          <!--<el-input v-model="form.name" placeholder="请搜索姓名/学校名称"></el-input>-->
          <!--<i class="el-icon-search search-icon"></i>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="清除搜索"></el-form-item>-->
      <!--</el-form>-->
    <!--</div>-->
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
      <p class="position">账户管理</p>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            label="账户状态"
            width="110">
            <template slot-scope="scope">
              <el-select size="mini" @focus="form.id = scope.row.teacher_id" v-model="scope.row.status" @change="accountSet" placeholder="请选择">
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
            prop="teacher_name"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="username"
            label="用户名"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            label="类型"
            width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.teacher_type != '3'">学校</span>
              <span v-else>运营</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="school_name"
            label="学校名称">
          </el-table-column>
          <el-table-column
            align="center"
            prop="telephone"
            label="手机号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="e_mail"
            label="邮箱">
          </el-table-column>

          <el-table-column
            align="center" label="操作" width="">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row.teacher_id)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(accountDel.index = scope.$index, accountDel.teacher_id = scope.row.teacher_id, accountDel.userName = scope.row.teacher_name)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="list-add">
        <router-link to="/accountAdd" v-show="userInfo.teacher_type == 3">
          <el-button icon="el-icon-plus">新增</el-button>
        </router-link>
        <el-pagination
          style='display:inline-block;margin-left:30%;'
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :page-count	="pageData.allPage">
        </el-pagination>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="dialogContent">
          <p>请确认是否要删除</p>
          <p>{{ accountDel.userName }} 账户</p>

          <p>删除后，该账户将无法登录</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="accountDelete">确 定</el-button>
        </span>
      </el-dialog>

      <div class="view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../myHeader/myHeader'
  import { accountList, accountDelete, accountSet, getAccountType } from '@/api/eduAdmin'
  export default {
    name: 'accountList',
    data() {
      return {
        centerDialogVisible: false,
        accountDel: {
          index: '',
          userName: '',
          teacher_id: '',
          token: localStorage.getItem('TOKEN')
        },
        form: {
          name: '',
          id: '',
          options: [{ value: '1', label: '启用' }, { value: '0', label: '停用' }]
        },
        userInfo: {
          teacher_type: '1',
          school_id: '10008',
          school_name: '上海市普陀区武宁路小学'
        },
        msg: {
          title1: '账户管理',
          title2: '',
          flag: 0,
          path: '/accountList'
        },
        tableData: [],
        pageData: {
          page: '',
          allPage: 1
        }
      }
    },
    components: {
      myHeader
    },
    methods: {
      getType() {
        const obj = {}
        obj.token = localStorage.getItem('TOKEN')
        getAccountType(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.userInfo = res.response
          }
        })
      },
      getList(page) {
        const obj = {}
        obj.page = page
        obj.token = localStorage.getItem('TOKEN')
        this.pageData.page = page
        accountList(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            const data = res.response
            for (let i = 0; i < data.list.length; i++) {
              if (data.list[i].enabled_status === true) {
                data.list[i].status = '启用'
              } else {
                data.list[i].status = '停用'
              }
            }
            this.tableData = data.list
            this.pageData.allPage = data.allPage
          } else {
            this.$alert('系统出错！', '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      },
      handleEdit(index, id) {
        this.$router.push({ path: '/accountEdit', query: { teacher_id: id }})
      },
      handleDelete() {
        this.centerDialogVisible = true
      },
      accountSet(val) {
        const obj = {}
        obj.teacher_id = this.form.id
        obj.status = val
        obj.token = localStorage.getItem('TOKEN')
        accountSet(obj).then(res => {
          // console.log(res)
          if (res.hasOwnProperty('response')) {
            this.$message('修改成功！')
          } else {
            this.$alert(res.error_response.msg, '提示', {
              confirmButtonText: '确定'
            })
            this.getList(this.pageData.page)
          }
        })
      },
      accountDelete() {
        accountDelete(this.accountDel).then(res => {
          if (res.hasOwnProperty('response')) {
            this.$message('删除成功！')
            this.getList(this.pageData.page)
            this.centerDialogVisible = false
          } else {
            this.$alert(res.error_response.msg, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      },
      handleCurrentChange(val) {
        this.getList(val)
      }
    },
    mounted() {
      this.getType()
      this.getList(1)
    }
  }
</script>

<style scoped>

</style>
