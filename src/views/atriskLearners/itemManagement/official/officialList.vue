<template>
  <div class="center-content official-list">
    <my-header :msg='msg'></my-header>
    <div class="content-detail">
    	<div class="title"><span class="officialMan">负责人管理</span><span class="goback">返回</span></div>
      <div class="smallTitle">
        <span class='manName'>管理员{{}}</span>
        <span class="num">负责人{{}}</span>
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
        <router-link to="/officialAdd">
          <el-button icon="el-icon-plus">新增</el-button>
        </router-link>
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
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
     </div> 
  </div>
</template>

<script>
   import myHeader from '../../myHeader/myHeader'
  export default {
    name: 'officialList',
    data() {
    	return {
        centerDialogVisible: false,
        userName: '',
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
    components: {
      myHeader
    },   
    methods: {
      handleEdit(index, row) {
        console.log(index, row)
        this.$router.push({ path: '/officialEdit' })
      },
      handleDelete(index, row) {
        console.log(index, row)
        this.centerDialogVisible = true
      }
    }
  }
</script>

<style scoped>
.title {
  width: 100%;
  height: 30px;
  overflow: hidden;
  margin-bottom: 30px;
  margin-top: 20px;
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
}
.manName {
  font-size: 14px;
}
.num {
    font-size: 14px;
}
.dialogContent span {
  display:block;
}
</style>
