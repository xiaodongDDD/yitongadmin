<template>
  <div class="center-content student-list">
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
          label="执行人"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="执行学科"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="userName"
          label="执行班级"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="type"
          label="评价项目"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          label="评价对象"
          prop="comment">
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
      <router-link to="/exectorAdd">
        <el-button icon="el-icon-plus">新增</el-button>
      </router-link>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div class="dialogContent">
        <p>请确认是否要删除</p>
        <p>{{ userName }}执行人</p>
        <p>删除后，该执行人及其执行范围讲彻底删除</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
  export default {
    name: 'poorStudent',
    data() {
    	 return {
        centerDialogVisible: false,
        userName: '',
        form: {
          name: ''
        },
        tableData: [{
          onOff: 0,
          name: '都龙族',
          userName: 'doulongzu',
          type: '学校',
          comment: '武宁路育才'
        }, {
          onOff: 1,
          name: '都龙族',
          userName: 'doulongzu',
          type: '运营',
          comment: ''
        }, {
          onOff: 0,
          name: '都龙族',
          userName: 'doulongzu',
          type: '学校'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row)
        this.$router.push({ path: '/exectorEdit' })
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
  margin-bottom: 50px;
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
</style>
