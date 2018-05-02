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
            prop="onOff"
            label="账户状态"
            width="100">
            <template slot-scope="scope">
              <el-select size="mini" v-model="scope.row.onOff" placeholder="请选择">
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
        <router-link to="/accountAdd">
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
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
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
  export default {
    name: 'accountList',
    data() {
      return {
        centerDialogVisible: false,
        userName: '',
        form: {
          name: '',
          options: [{ value: '1', label: '启用' }, { value: '0', label: '停用' }]
        },
        msg: {
          title1: '账户管理',
          title2: '',
          flag: 0,
          path: '/accountList'
        },
        tableData: [{
          onOff: '启用',
          name: '都龙族',
          userName: 'doulongzu',
          type: '学校',
          schoolName: '武宁路育才',
          email: '16783949@163.com',
          telephone: '13533790697'
        }, {
          onOff: '启用',
          name: '都龙族',
          userName: 'doulongzu',
          type: '运营',
          schoolName: '',
          email: '16783949@163.com',
          telephone: '13533790697'
        }, {
          onOff: '启用',
          name: '都龙族',
          userName: 'doulongzu',
          type: '学校',
          schoolName: '武宁路育才',
          email: '16783949@163.com',
          telephone: '13533790697'
        }]
      }
    },
    components: {
      myHeader
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row)
        this.$router.push({ path: '/accountEdit' })
      },
      handleDelete(index, row) {
        console.log(index, row)
        this.centerDialogVisible = true
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style scoped>

</style>
