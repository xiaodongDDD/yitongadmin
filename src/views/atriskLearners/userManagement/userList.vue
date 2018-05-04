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
              <el-select size="mini" v-model="scope.row.onOff" @change="statusProject(scope.row.project_id, scope.row.project_status)" placeholder="请选择">
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
  import { statusProject } from '@/api/eduAdmin'
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
        tableData: [{
          onOff: '启用',
          name: '上海育才小学',
          official: '诗小轩',
          telephone: '13533790697'
        }, {
          onOff: '停用',
          name: '上海育才小学',
          official: '诗小轩',
          telephone: '13533790697'
        }, {
          onOff: '停用',
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
      statusProject(id, status) {
        const obj = {}
        obj.project_id = id
        obj.project_status = status
        statusProject(obj).then(res => {
          console.log(res)
        })
      },
      handleEdit(index, row) {
        this.$router.push({ path: '/userEdit' })
      },
      handleDelete(index, row) {
        this.centerDialogVisible = true
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
