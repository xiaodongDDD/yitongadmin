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
            prop="onOff"
            label="产品状态"
            width="100">
            <template slot-scope="scope">
              <el-dropdown v-if="scope.row.onOff === 0" trigger="click">
                <el-button size="mini">
                  启用<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>停用</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown v-else trigger="click">
                <el-button size="mini">
                  停用<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>启用</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="学校名称"
            width="">
          </el-table-column>
          <el-table-column
            align="center"
            prop="official"
            label="管理员">
          </el-table-column>
          <el-table-column
            align="center"
            prop="telephone"
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
                @click="handleDelete(scope.$index, schoolName = scope.row.name)">删除</el-button>
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
          <p>{{ schoolName }}学校账户</p>

          <p>删除后，该学校所有账户将无法登录</p>
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
  import myHeader from '../myHeader/myHeader'
  export default {
    name: 'userList',
    data() {
      return {
        centerDialogVisible: false,
        schoolName: '',
        form: {
          name: ''
        },
        msg: {
          title1: '学校用户管理',
          title2: '',
          flag: 0,
          path: '/userList'
        },
        tableData: [{
          onOff: 0,
          name: '上海育才小学',
          official: '诗小轩',
          telephone: '13533790697'
        }, {
          onOff: 1,
          name: '上海育才小学',
          official: '诗小轩',
          telephone: '13533790697'
        }, {
          onOff: 0,
          name: '上海育才小学',
          official: '诗小轩',
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
        this.$router.push({ path: '/userEdit' })
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

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
