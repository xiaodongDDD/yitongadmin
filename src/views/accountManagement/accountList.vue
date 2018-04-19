<template>
  <div class="center-content account-list">
    <div class="search-contaier">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item>
          <el-input v-model="form.name" placeholder="请搜索姓名/学校名称"></el-input>
          <i class="el-icon-search search-icon"></i>
        </el-form-item>
        <el-form-item label="清除搜索"></el-form-item>
      </el-form>
    </div>

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
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <div class="list-add">
      <el-button icon="el-icon-plus">新增</el-button>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>请确认是否要删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'accountList',
    data() {
      return {
        centerDialogVisible: false,
        form: {
          name: ''
        },
        tableData: [{
          onOff: 0,
          name: '都龙族',
          userName: 'doulongzu',
          type: '学校',
          schoolName: '武宁路育才',
          email: '16783949@163.com',
          telephone: '13533790697'
        }, {
          onOff: 1,
          name: '都龙族',
          userName: 'doulongzu',
          type: '运营',
          schoolName: '',
          email: '16783949@163.com',
          telephone: '13533790697'
        }, {
          onOff: 0,
          name: '都龙族',
          userName: 'doulongzu',
          type: '学校',
          schoolName: '武宁路育才',
          email: '16783949@163.com',
          telephone: '13533790697'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row)
      },
      handleDelete(index, row) {
        console.log(index, row)
        this.centerDialogVisible = true
      }
    }
  }
</script>

<style scoped>

</style>
